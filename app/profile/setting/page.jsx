"use client";
import { X_API_Key } from "@/app/URL's/Api_X_Key";
import { Base_URL } from "@/app/URL's/Base_URL";
import { Alert, Box, Card, Snackbar, Typography } from "@mui/material";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const SettingChangeForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    password: "",
    confirmPassword: "",
  });
  const [errors, setErrors] = useState({});
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [apiResponse, setApiResponse] = useState({});
  const [user, setUser] = useState({});

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: "" });
  };

  useEffect(() => {
    const loginResponse = JSON.parse(localStorage.getItem("loginResponse"));
    setUser(loginResponse);
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setErrors({}); // Reset errors

    // Check for password length
    if (formData.password.length < 8) {
      setErrors({ password: "Password must be at least 8 characters long" });
      return;
    }

    // Check if password and confirm password match
    if (formData.password !== formData.confirmPassword) {
      setErrors({ confirmPassword: "Passwords do not match" });
      return;
    }

    try {
      const response = await axios.post(
        `${Base_URL}/v1/account/update-profile`,
        {
          name: user?.name,
          password: formData.password,
        },
        {
          headers: {
            "x-api-key": X_API_Key,
            Authorization: `Bearer ${user._token}`,
          },
        }
      );
      setApiResponse(response.data);
      // Reset form data
      setFormData({ name: user?.name, password: "", confirmPassword: "" });
      setOpenSnackbar(true);
    } catch (error) {
      console.error("Error:", error);
      alert("Something went wrong. Please try again later.");
    }
  };

  return (
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
              Setting - Update Password
            </h3>
            <p className="text-lg text-coolGray-500 font-medium">
              Ensure your account is secure
            </p>
          </div>
          <form onSubmit={handleSubmit}>
            <div className="mb-6">
              <label className="block mb-2 font-medium">Name*</label>
              <input
                className="appearance-none block w-full p-3 leading-5 border border-coolGray-200 rounded-lg shadow-md placeholder-coolGray-400 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50"
                type="name"
                placeholder="Name"
                name="name"
                disabled
                value={user?.name}
                onChange={handleChange}
              />
              {errors.name && (
                <span style={{ color: "red" }} className="text-sm">
                  {errors.name}
                </span>
              )}
            </div>
            <div className="mb-6">
              <label className="block mb-2 font-medium">Password*</label>
              <input
                className="appearance-none block w-full p-3 leading-5 border border-coolGray-200 rounded-lg shadow-md placeholder-coolGray-400 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50"
                type="password"
                placeholder="Password"
                name="password"
                value={formData.password}
                onChange={handleChange}
              />
              {errors.password && (
                <span style={{ color: "red" }} className="text-sm">
                  {errors.password}
                </span>
              )}
            </div>
            <div className="mb-6">
              <label className="block mb-2 font-medium">
                Confirm Password*
              </label>
              <input
                className="appearance-none block w-full p-3 leading-5 border border-coolGray-200 rounded-lg shadow-md placeholder-coolGray-400 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50"
                type="password"
                placeholder="Confirm Password"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
              />
              {errors.confirmPassword && (
                <span style={{ color: "red" }} className="text-sm">
                  {errors.confirmPassword}
                </span>
              )}
            </div>
            <button
              className="inline-block py-3 px-7 mb-4 w-full text-base text-green-50 font-medium text-center leading-6 bg-green-500 hover:bg-green-600 focus:ring-2 focus:ring-green-500 focus:ring-opacity-50 rounded-md shadow-sm"
              type="submit"
            >
              Update Password
            </button>
            {/* <p className="text-center">
              <span className="text-xs font-medium">Changed your mind?</span>{" "}
              <button
                className="inline-block text-xs font-medium text-green-500 hover:text-green-600 hover:underline"
                onClick={() => router.push("/")}
              >
                Go back
              </button>
            </p> */}
          </form>
        </div>
      </div>
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
          severity={apiResponse ? "success" : "error"}
          variant="filled"
          sx={{ width: "100%" }}
        >
          {apiResponse && "Password Update Successfuly!"}
        </Alert>
      </Snackbar>
    </section>
  );
};

export default SettingChangeForm;
