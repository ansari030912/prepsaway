"use client";
/* eslint-disable @next/next/no-img-element */
import { X_API_Key } from "@/app/URL's/Api_X_Key";
import { Base_URL } from "@/app/URL's/Base_URL";
import { Alert, CircularProgress, Snackbar } from "@mui/material";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const LoginForm = () => {
  const router = useRouter();
  const [isLogin, setIsLogin] = useState({});
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [ip, setIp] = useState("");
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function fetchIp() {
      const response = await fetch("/api/get-client-ip");
      const data = await response.json();
      setIp(data.ip);
    }
    fetchIp();
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setEmailError("");
    setPasswordError("");

    if (!email) {
      setEmailError("Email is required");
    }

    if (!password) {
      setPasswordError("Password is required");
    }

    if (password.length < 8) {
      setPasswordError("Password must be at least 8 characters long");
      return;
    }
    if (emailError || passwordError) {
      return;
    }

    setLoading(true);

    try {
      const response = await axios.post(
        `${Base_URL}/v1/account/login`,
        {
          email,
          password,
          ip,
        },
        {
          headers: {
            "x-api-key": X_API_Key,
          },
        }
      );
      setIsLogin(response.data);
      setOpenSnackbar(true);

      if (response.data.is_logged_in) {
        const currentTime = Date.now();
        const twoHoursInMillis = 2 * 60 * 60 * 1000;
        const expiryTime = currentTime + twoHoursInMillis;

        if (typeof localStorage !== "undefined") {
          localStorage.setItem(
            "loginResponse",
            JSON.stringify({ ...response.data, expiryTime })
          );
        } else {
          console.error("localStorage is not available.");
        }
        window.location.reload();
      } else {
        router.push("/login");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Something went wrong. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Snackbar
        open={openSnackbar}
        autoHideDuration={6000}
        onClose={() => setOpenSnackbar(false)}
        anchorOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
      >
        <Alert
          onClose={() => setOpenSnackbar(false)}
          severity={isLogin?.is_logged_in ? "success" : "error"}
          variant="filled"
          sx={{ width: "100%" }}
        >
          {isLogin && isLogin?.message}
        </Alert>
      </Snackbar>
      <section
        className="py-24 md:py-32 bg-white"
        style={{
          backgroundImage: `url('/pattern-white.png')`,
        }}
      >
        <div className="container px-4 mx-auto">
          <div className="max-w-sm mx-auto">
            <div className="mb-6 text-center">
              <h3 className="mb-4 text-2xl md:text-3xl font-bold">
                Join to save progress
              </h3>
              <p className="text-lg text-coolGray-500 font-medium">
                Start your journey with our product
              </p>
            </div>
            <form onSubmit={handleSubmit}>
              <div className="mb-6">
                <label className="block mb-2  font-medium">Email*</label>
                <input
                  className="appearance-none block w-full p-3 leading-5 border border-coolGray-200 rounded-lg shadow-md placeholder-coolGray-400 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50"
                  type="name"
                  placeholder="email@example.com"
                  onChange={(e) => {
                    setEmail(e.target.value), setEmailError("");
                  }}
                />
                {emailError && (
                  <span style={{ color: "red" }} className="text-sm">
                    {emailError}
                  </span>
                )}
              </div>
              <div className="mb-4">
                <label className="block mb-2  font-medium">Password*</label>
                <input
                  className="appearance-none block w-full p-3 leading-5 border border-coolGray-200 rounded-lg shadow-md placeholder-coolGray-400 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50"
                  type="password"
                  placeholder="************"
                  onChange={(e) => {
                    setPassword(e.target.value), setPasswordError("");
                  }}
                />
                {passwordError && (
                  <span style={{ color: "red" }} className="text-sm -my-10">
                    {passwordError}
                  </span>
                )}
              </div>
              <div className="flex flex-wrap items-center justify-end mb-6">
                <div className="w-full md:w-auto mt-1">
                  <Link
                    className="inline-block text-xs font-medium text-green-500 hover:text-green-600"
                    href="/forgot-password"
                  >
                    Forgot your password?
                  </Link>
                </div>
              </div>
              <button
                className="inline-block py-3 px-7 mb-4 w-full text-base text-green-50 font-medium text-center leading-6 bg-green-500 hover:bg-green-600 focus:ring-2 focus:ring-green-500 focus:ring-opacity-50 rounded-md shadow-sm"
                type="submit"
                disabled={loading}
              >
                {loading ? <CircularProgress size={24} color="inherit" /> : "Log In"}
              </button>
              <p className="text-center">
                <span className="text-xs font-medium">
                  Not have an account?
                </span>{" "}
                <Link
                  className="inline-block text-xs font-medium text-green-500 hover:text-green-600 hover:underline"
                  href="/register"
                >
                  Register Now
                </Link>
              </p>
            </form>
          </div>
        </div>
      </section>
    </>
  );
};

export default LoginForm;
