"use client";
import { X_API_Key } from "@/app/URL's/Api_X_Key";
import { Base_URL } from "@/app/URL's/Base_URL";
/* eslint-disable react/no-unescaped-entities */
/* eslint-disable @next/next/no-img-element */
import { Alert, Snackbar } from "@mui/material";
import axios from "axios";
import Link from "next/link";
import { useEffect, useState } from "react";
const ForgotForm = () => {
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");
  const [ip, setIp] = useState("");
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [responseMessage, setResponseMessage] = useState("");

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

    if (!email) {
      setEmailError("Email is required");
      return;
    }

    try {
      const response = await axios.post(
        `${Base_URL}/v1/account/forgot-password`,
        {
          email,
          ip,
          reset_url: "/reset-password/",
        },
        {
          headers: {
            "x-api-key": X_API_Key,
          },
        }
      );
      setResponseMessage(response.data.message || "Request successful");
      setOpenSnackbar(true);
      // Optionally, navigate to another page like login
    } catch (error) {
      console.error("Error:", error);
      setResponseMessage("Something went wrong. Please try again later.");
      setOpenSnackbar(true);
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
          severity={
            responseMessage.includes("couple of minutes") ? "success" : "error"
          }
          variant="filled"
          sx={{ width: "100%" }}
        >
          {responseMessage}
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
                Forgot your account
              </h3>
              <p className="text-lg text-coolGray-500 font-medium">
                Enter your email to get a reset verification code.
              </p>
            </div>
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label className="block mb-2 font-medium">Email*</label>
                <input
                  className="appearance-none block w-full p-3 leading-5 border border-coolGray-200 rounded-lg shadow-md placeholder-coolGray-400 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50"
                  type="email"
                  placeholder="email@example.com"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    setEmailError("");
                  }}
                />
                {emailError && (
                  <span style={{ color: "red" }} className="text-sm">
                    {emailError}
                  </span>
                )}
              </div>
              <div className="border-t-2 mb-4"></div>
              <button
                className="inline-block py-3 px-7 mb-4 w-full text-base text-green-50 font-medium text-center leading-6 bg-green-500 hover:bg-green-600 focus:ring-2 focus:ring-green-500 focus:ring-opacity-50 rounded-md shadow-sm"
                type="submit"
              >
                Forgot Password
              </button>
              <p className="text-center">
                <span className="text-xs font-medium">
                  Already have an Account?
                </span>{" "}
                <Link
                  className="inline-block text-xs font-medium text-green-500 hover:text-green-600 hover:underline"
                  href="/login"
                >
                  Login
                </Link>
              </p>
              <p className="text-center">
                <span className="text-xs font-medium">
                  Don't have an Account?
                </span>{" "}
                <Link
                  className="inline-block text-xs font-medium text-green-500 hover:text-green-600 hover:underline"
                  href="/register"
                >
                  Register
                </Link>
              </p>
            </form>
          </div>
        </div>
      </section>
    </>
  );
};

export default ForgotForm;
