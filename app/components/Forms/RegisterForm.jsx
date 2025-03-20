"use client";
/* eslint-disable @next/next/no-img-element */
import { X_API_Key } from "@/app/URL's/Api_X_Key";
import { Base_URL } from "@/app/URL's/Base_URL";
import { Icon } from "@iconify/react";
import { Alert, IconButton, Snackbar } from "@mui/material";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const RegisterForm = () => {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [userRegiter, setUserRegiter] = useState("");
  const [ip, setIp] = useState("");
  const [passwordMatchError, setPasswordMatchError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const [emailError, setEmailError] = useState("");
  const [formError, setFormError] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

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
    // Check if any field is empty
    if (!name || !email || !password || !confirmPassword) {
      setFormError(true);
      return;
    }
    if (name || email || password || confirmPassword) {
      setFormError(false);
    }
    // Check if passwords match
    if (password !== confirmPassword) {
      setPasswordMatchError(true);
      return;
    }
    if (password === confirmPassword) {
      setPasswordMatchError(false);
    }
    // Check if password meets the minimum length requirement and complexity
    const passwordRegex =
      /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z\d\W]).{8,}$/;
    if (!passwordRegex.test(password)) {
      setPasswordError(true);
      return;
    }
    // Check if email format is correct
    if (!emailRegex.test(email)) {
      setEmailError("Invalid email format");
      return;
    }
    // Check if terms and conditions checkbox is checked
    // Proceed with form submission
    try {
      const response = await axios.post(
        `${Base_URL}/v1/account/register`,
        {
          name,
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
      setUserRegiter(response.data);
      setOpen(true);
      if (response.data.is_active === true) {
        setConfirmPassword("");
        setName("");
        setEmail("");
        setPassword("");
        setPasswordMatchError(false);
        setPasswordError("");
        setEmailError("");
        setFormError(false);
        router.push("/login");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
    setPasswordError(false);
  };
  return (
    <>
      <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
        <Alert
          onClose={handleClose}
          anchorOrigin={{
            vertical: "top",
            horizontal: "left",
          }}
          severity={
            userRegiter.message === "Email already exist." ? "error" : "success"
          }
          variant="filled"
          sx={{ width: "100%", marginTop: "10px", marginLeft: "16px" }}
        >
          {userRegiter?.message}
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
                <label className="block mb-2 font-medium" for="">
                  Name*
                </label>
                <input
                  className="appearance-none block w-full p-3 leading-5 text-coolGray-900 border border-coolGray-200 rounded-lg shadow-md placeholder-coolGray-400 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50"
                  type="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder=""
                />
              </div>
              <div className="mb-6">
                <label className="block mb-2 font-medium" for="">
                  Email*
                </label>
                <input
                  className="appearance-none block w-full p-3 leading-5 text-coolGray-900 border border-coolGray-200 rounded-lg shadow-md placeholder-coolGray-400 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50"
                  type="name"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="email@example.com"
                />
                {emailError && (
                  <span style={{ color: "red" }} className="text-sm">
                    {emailError}
                  </span>
                )}
              </div>
              <div className="mb-4">
                <label className="block mb-2 font-medium" for="">
                  Password*
                </label>
                <div style={{ display: "flex", alignItems: "center" }}>
                  <input
                    className="appearance-none block w-full p-3 leading-5 text-coolGray-900 border border-coolGray-200 rounded-lg shadow-md placeholder-coolGray-400 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50"
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="************"
                  />
                  <IconButton
                    sx={{ ml: "6px" }}
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? (
                      <Icon
                        icon="ep:view"
                        width="0.8em"
                        height="0.8em"
                        style={{ color: "black" }}
                      />
                    ) : (
                      <Icon
                        icon="ep:hide"
                        width="0.8em"
                        height="0.8em"
                        style={{ color: "black" }}
                      />
                    )}
                  </IconButton>
                </div>
              </div>
              <div className="mb-4">
                <label className="block mb-2 font-medium" for="">
                  Confirm Password*
                </label>
                <input
                  className="appearance-none block w-full p-3 leading-5 text-coolGray-900 border border-coolGray-200 rounded-lg shadow-md placeholder-coolGray-400 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50"
                  type={showPassword ? "text" : "password"}
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="************"
                />
                {passwordMatchError && (
                  <span style={{ color: "red" }} className="text-sm">
                    Passwords do not match...
                  </span>
                )}
              </div>
              <div className="flex flex-wrap items-center justify-end mb-2">
                {/* <div className="w-full md:w-auto mt-1">
                  <a
                    className="inline-block text-base font-medium text-green-500 hover:text-green-600"
                    href="#"
                  >
                    Forgot your password?
                  </a>
                </div> */}
              </div>
              <hr className="my-3" />
              <div className="w-full p-2 -mt-2">
                {passwordError && (
                  <Snackbar
                    open={passwordError}
                    autoHideDuration={6000}
                    onClose={handleClose}
                    anchorOrigin={{ vertical: "top", horizontal: "left" }} // Positioning the Snackbar to top-left
                    sx={{ marginTop: "10px", marginLeft: "16px" }} // Adjusting margins for positioning
                  >
                    <Alert
                      onClose={handleClose}
                      severity={"error"}
                      variant="filled"
                      sx={{ width: "100%" }}
                    >
                      Password must have 8 characters (1 uppercase, lowercase,
                      number, and one special character)
                    </Alert>
                  </Snackbar>
                )}
                {formError && (
                  <span style={{ color: "red" }} className="text-sm">
                    All field are required...
                  </span>
                )}
              </div>
              <button className="inline-block py-3 px-7 mb-4 w-full text-base text-green-50 font-medium text-center leading-6 bg-green-500 hover:bg-green-600 focus:ring-2 focus:ring-green-500 focus:ring-opacity-50 rounded-md shadow-sm">
                Sign Up
              </button>

              <p className="text-center">
                <span className="text-base font-medium">
                  Already have an account?
                </span>{" "}
                <Link
                  className="inline-block text-base font-medium text-green-500 hover:text-green-600 hover:underline"
                  href="/login"
                >
                  Login
                </Link>
              </p>
            </form>
          </div>
        </div>
      </section>
    </>
  );
};

export default RegisterForm;
