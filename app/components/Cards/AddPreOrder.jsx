"use client";
import { X_API_Key } from "@/app/URL's/Api_X_Key";
import { Base_URL } from "@/app/URL's/Base_URL";
import Alert from "@mui/material/Alert";
import Snackbar from "@mui/material/Snackbar";
import axios from "axios";
import { useState } from "react";

const AddPreOrder = () => {
  const [email, setEmail] = useState("");
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState("success"); // 'success' or 'error'
  const [messageBelow, setMessageBelow] = useState(""); // Message to display below the input field
  const [messageBelowType, setMessageBelowType] = useState("error"); // Default message type is 'error'

  const isValidEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // Simple email regex
    return emailRegex.test(email);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!isValidEmail(email)) {
      setMessageBelow("Please enter a valid email.");
      setMessageBelowType("error");
      return; // Exit without calling the API
    }

    setMessageBelow(""); // Clear the message if the email is valid

    try {
      const response = await axios.post(
        `${Base_URL}/v1/email-notification`,
        { email },
        {
          headers: {
            "x-api-key": X_API_Key,
          },
        }
      );

      if (response.data.email_sent) {
        setSnackbarMessage(
          "We'll update you when this exam will be available. Thank you!"
        );
        setSnackbarSeverity("success");
        setMessageBelow(
          "Your email has been successfully registered. We'll notify you soon!"
        );
        setMessageBelowType("success");
      } else {
        setSnackbarMessage("Please try again shortly.");
        setSnackbarSeverity("error");
        setMessageBelow("Error! Please try again shortly.");
        setMessageBelowType("error");
      }
    } catch (error) {
      setSnackbarMessage("Something went wrong. Please try again shortly.");
      setSnackbarSeverity("error");
      setMessageBelow("Error! Something went wrong. Please try again shortly.");
      setMessageBelowType("error");
    }

    setSnackbarOpen(true);
  };

  const handleCloseSnackbar = () => {
    setSnackbarOpen(false);
  };

  return (
    <form className="mt-2" onSubmit={handleSubmit}>
      <div className="flex flex-wrap items-center -m-2 mb-0.5">
        <div className="w-full lg:flex-1 p-2">
          <input
            type="text"
            name="voucher"
            className="py-3 px-4 w-full text-sm font-semibold placeholder-gray-500 bg-white outline-none focus:ring focus:ring-gray-50 border-gray-100 rounded-lg transition duration-200"
            placeholder="Enter your Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="w-full lg:w-auto p-2">
          <button
            type="submit"
            className="py-3 px-7 w-full text-sm text-white font-semibold bg-gray-900 hover:bg-gray-800 focus:bg-gray-900 rounded-5xl focus:ring-4 focus:ring-gray-200 transition duration-300"
            disabled={!email} // Disable only if the email field is empty
          >
            Apply for Pre Order
          </button>
        </div>
      </div>

      {/* Message Below the Input Field */}
      {messageBelow && (
        <div
          className={`mt-2 text-base font-bold ml-2 ${
            messageBelowType === "success" ? "text-green-600" : "text-red-600"
          }`}
        >
          {messageBelow}
        </div>
      )}

      {/* Snackbar for showing messages */}
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
      >
        <Alert
          onClose={handleCloseSnackbar}
          severity={snackbarSeverity}
          sx={{ width: "100%" }}
        >
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </form>
  );
};

export default AddPreOrder;
