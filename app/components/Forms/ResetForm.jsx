"use client";
/* eslint-disable @next/next/no-img-element */
import { X_API_Key } from "@/app/URL's/Api_X_Key";
import { Base_URL } from "@/app/URL's/Base_URL";
import { Icon } from "@iconify/react";
import { Alert, IconButton, Snackbar } from "@mui/material";
import axios from "axios";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";

const ResetForm = () => {
  const searchParams = useSearchParams();
  const searchEmail = searchParams.get("email");
  const token = searchParams.get("token");
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState("success");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordMatchError, setPasswordMatchError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const [formError, setFormError] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const passwordRegex =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

  const handleSubmit = async (event) => {
    event.preventDefault();

    // Check if any field is empty
    if (!password || !confirmPassword) {
      setFormError(true);
      return;
    }
    setFormError(false);

    // Check if passwords match
    if (password !== confirmPassword) {
      setPasswordMatchError(true);
      return;
    }
    setPasswordMatchError(false);

    // Check if password meets the minimum length requirement and complexity
    if (!passwordRegex.test(password)) {
      setPasswordError(true);
      return;
    }
    setPasswordError(false);

    // Proceed with form submission
    try {
      const response = await axios.post(
        `${Base_URL}/v1/account/reset-password`,
        {
          email: searchEmail,
          new_password: password,
          reset_token: token,
        },
        {
          headers: {
            "x-api-key": X_API_Key,
          },
        }
      );

      if (response.data === true) {
        setSnackbarMessage("Password reset successfully!");
        setSnackbarSeverity("success");
        setOpen(true);

        // Redirect to login after 3 seconds
        setTimeout(() => {
          router.push("/login");
        }, 3000);
      } else {
        setSnackbarMessage("Reset link has expired.");
        setSnackbarSeverity("error");
        setOpen(true);
      }
    } catch (error) {
      setSnackbarMessage("An error occurred. Please try again.");
      setSnackbarSeverity("error");
      setOpen(true);
      console.error("Error:", error);
    }
  };

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };

  return (
    <>
      <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
        <Alert
          onClose={handleClose}
          severity={snackbarSeverity}
          variant="filled"
          sx={{ width: "100%" }}
        >
          {snackbarMessage}
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
                Reset Password
              </h3>
              <p className="text-lg text-coolGray-500 font-medium">
                Reset your password and continue your journey with our product
              </p>
            </div>
            <form onSubmit={handleSubmit}>
              <div className="mb-6">
                <label className="block mb-2 font-medium" htmlFor="email">
                  Email*
                </label>
                <input
                  className="appearance-none block w-full p-3 leading-5 text-coolGray-900 border border-coolGray-200 rounded-lg shadow-md placeholder-coolGray-400 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50"
                  type="email"
                  value={searchEmail}
                  disabled
                />
              </div>
              <div className="mb-4">
                <label className="block mb-2 font-medium" htmlFor="password">
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
                <label
                  className="block mb-2 font-medium"
                  htmlFor="confirmPassword"
                >
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
              <div className="w-full p-2 -mt-2">
                {passwordError && (
                  <Snackbar
                    open={passwordError}
                    autoHideDuration={6000}
                    onClose={handleClose}
                    anchorOrigin={{ vertical: "top", horizontal: "left" }}
                    sx={{ marginTop: "10px", marginLeft: "16px" }}
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
                    All fields are required...
                  </span>
                )}
              </div>
              <button className="inline-block py-3 px-7 mb-4 w-full text-base text-green-50 font-medium text-center leading-6 bg-green-500 hover:bg-green-600 focus:ring-2 focus:ring-green-500 focus:ring-opacity-50 rounded-md shadow-sm">
                Update Password
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

export default ResetForm;
