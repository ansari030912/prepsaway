"use client";
import {
  Box,
  Checkbox,
  FormControlLabel,
  Grid,
  Snackbar,
  SnackbarContent,
  Typography,
} from "@mui/material";
import axios from "axios";
import Link from "next/link";
import { useEffect, useState } from "react";
import { X_API_Key } from "../../URL's/Api_X_Key";
import { Base_URL } from "../../URL's/Base_URL";

const CustomInvoiceCart = ({ params }) => {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [errors, setErrors] = useState({});
  const [errorMessage, setErrorMessage] = useState("");
  const [redirectingMessage, setRedirectingMessage] = useState("");
  const [ipAddress, setIpAddress] = useState("");
  const [acceptedTerms, setAcceptedTerms] = useState(false);

  useEffect(() => {
    async function fetchIp() {
      const response = await fetch("/api/get-client-ip");
      const data = await response.json();
      setIpAddress(data.ip);
    }
    fetchIp();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await axios.get(
          `${Base_URL}/v1/invoice/${params.invoice_perma}`,
          {
            headers: {
              "x-api-key": X_API_Key,
            },
          }
        );
        setData(response.data);
      } catch (error) {
        setError("Invoice Expired or Not Available At The Moment...");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [params.invoice_perma]);

  const validate = () => {
    let tempErrors = {};
    tempErrors.fullName = fullName ? "" : "This field is required";
    tempErrors.email = email ? "" : "This field is required";
    setErrors(tempErrors);
    return Object.values(tempErrors).every((x) => x === "");
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    switch (name) {
      case "fullName":
        setFullName(value);
        break;
      case "email":
        setEmail(value);
        break;
      default:
        break;
    }
  };

  const handleCheckout = async () => {
    if (!validate() || !acceptedTerms) {
      setErrorMessage("Please fill in all fields and accept the terms.");
      return;
    }
    setLoading(true);
    setRedirectingMessage("We are Redirecting you for Payment on PREPWISE...");
    setTimeout(async () => {
      try {
        const response = await axios.post(
          `${Base_URL}/v1/payment`,
          {
            name: fullName,
            email: email,
            ip: ipAddress,
            coupon: "",
            IsInvoice: true,
            invoice_perma: data.invoice_perma,
            cart_items: data.invoice_items.map((item) => item.cart),
          },
          {
            headers: {
              "x-api-key": X_API_Key,
            },
          }
        );

        if (response.data.success) {
          window.location.href = response.data.redirect_link;
        } else {
          setErrorMessage("Payment failed. Please try again.");
          setLoading(false);
        }
      } catch (error) {
        setErrorMessage("An error occurred. Please try again.");
        setLoading(false);
      }
    }, 2000);
  };

  return (
    <section className="pt-9 pb-16 bg-white" style={{ borderRadius: "12px" }}>
      <div className="container mx-auto px-4">
        {data && data.invoice_items && data.invoice_items.length > 0 ? (
          <>
            <div className="flex flex-wrap gap-2 mb-8">
              <Link href="/" className="group">
                <div className="flex flex-wrap items-center">
                  <span className="text-xs text-gray-500 group-hover:text-gray-900 transition duration-200">
                    Home
                  </span>
                  <div className="text-gray-500 group-hover:text-gray-900 transition duration-200">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="20"
                      height="20"
                      viewBox="0 0 20 20"
                      fill="none"
                    >
                      <path
                        d="M12.9465 9.40832L8.22986 4.69999C8.15239 4.62188 8.06022 4.55989 7.95867 4.51758C7.85712 4.47527 7.7482 4.45349 7.63819 4.45349C7.52818 4.45349 7.41926 4.47527 7.31771 4.51758C7.21616 4.55989 7.124 4.62188 7.04653 4.69999C6.89132 4.85613 6.8042 5.06734 6.8042 5.28749C6.8042 5.50764 6.89132 5.71885 7.04653 5.87499L11.1715 10.0417L7.04653 14.1667C6.89132 14.3228 6.8042 14.534 6.8042 14.7542C6.8042 14.9743 6.89132 15.1855 7.04653 15.3417C7.12371 15.4204 7.21574 15.483 7.31731 15.526C7.41887 15.5689 7.52794 15.5912 7.63819 15.5917C7.74845 15.5912 7.85752 15.5689 7.95908 15.526C8.06064 15.483 8.15268 15.4204 8.22986 15.3417L12.9465 10.6333C13.0311 10.5553 13.0986 10.4606 13.1448 10.3552C13.191 10.2497 13.2148 10.1359 13.2148 10.0208C13.2148 9.90574 13.191 9.7919 13.1448 9.68648C13.0986 9.58107 13.0311 9.48636 12.9465 9.40832Z"
                        fill="currentColor"
                      ></path>
                    </svg>
                  </div>
                </div>
              </Link>
              <Link href="#" className="group">
                <div className="flex flex-wrap items-center">
                  <span className="text-xs text-gray-500 group-hover:text-gray-900 transition duration-200">
                    Checkout
                  </span>
                  <div className="text-gray-500 group-hover:text-gray-900 transition duration-200">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="20"
                      height="20"
                      viewBox="0 0 20 20"
                      fill="none"
                    >
                      <path
                        d="M12.9465 9.40832L8.22986 4.69999C8.15239 4.62188 8.06022 4.55989 7.95867 4.51758C7.85712 4.47527 7.7482 4.45349 7.63819 4.45349C7.52818 4.45349 7.41926 4.47527 7.31771 4.51758C7.21616 4.55989 7.124 4.62188 7.04653 4.69999C6.89132 4.85613 6.8042 5.06734 6.8042 5.28749C6.8042 5.50764 6.89132 5.71885 7.04653 5.87499L11.1715 10.0417L7.04653 14.1667C6.89132 14.3228 6.8042 14.534 6.8042 14.7542C6.8042 14.9743 6.89132 15.1855 7.04653 15.3417C7.12371 15.4204 7.21574 15.483 7.31731 15.526C7.41887 15.5689 7.52794 15.5912 7.63819 15.5917C7.74845 15.5912 7.85752 15.5689 7.95908 15.526C8.06064 15.483 8.15268 15.4204 8.22986 15.3417L12.9465 10.6333C13.0311 10.5553 13.0986 10.4606 13.1448 10.3552C13.191 10.2497 13.2148 10.1359 13.2148 10.0208C13.2148 9.90574 13.191 9.7919 13.1448 9.68648C13.0986 9.58107 13.0311 9.48636 12.9465 9.40832Z"
                        fill="currentColor"
                      ></path>
                    </svg>
                  </div>
                </div>
              </Link>
            </div>
            <div className="flex flex-wrap -m-4 justify-center">
              <div className="w-full lg:w-8/12 p-4">
                <div className="px-4 py-6 border border-gray-200 rounded-2xl">
                  <h6 className="mb-4 text-2xl font-semibold text-center">
                    Your order
                  </h6>
                  {data.invoice_items.map((item, index) => (
                    <div key={index} className="pb-6 border-b border-dashed">
                      <div className="flex flex-wrap items-end -m-2">
                        <div className="w-full p-2">
                          <div className="w-full lg:hidden p-2 flex justify-center">
                            <img
                              className="rounded-lg"
                              src="/package-small-min_optimized.png"
                              alt=""
                              width={"200px"}
                            />
                          </div>
                          <div className="flex -m-2">
                            <div className="w-auto hidden lg:inline-flex p-2">
                              <img
                                className="rounded-lg"
                                src="/package-small-min_optimized.png"
                                alt=""
                                width={"200px"}
                              />
                            </div>
                            <div className="p-2 pl-5 lg:pl-0 w-full flex flex-col justify-center">
                              <div>
                                <p className="mb-1.5 font-semibold text-gray-600 text-lg">
                                  {item.type}
                                </p>
                                <p className="mb-1.5 font-semibold text-blue-500 text-base">
                                  {item.sub_title}
                                </p>
                                <div className="flex justify-between">
                                  <p className="text-base">x1</p>
                                  <span className="text-xl font-bold text-green-500">
                                    $ {item.price} /{" "}
                                    <span className="text-red-500 text-sm line-through">
                                      $ {item.full_price}
                                    </span>{" "}
                                  </span>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      {index < data.invoice_items.length - 1 && (
                        <hr className="my-6" />
                      )}
                    </div>
                  ))}
                  <div className="py-6 border-b border-dashed">
                    <h6 className="mb-4 text-lg font-semibold">
                      Enter Your Details
                    </h6>
                    <Grid container spacing={2} className="mb-4">
                      <Grid item xs={12} md={6}>
                        <input
                          type="text"
                          name="fullName"
                          className="py-3 px-4 w-full text-sm placeholder-gray-500 bg-gray-50 outline-none focus:ring focus:ring-gray-100 border-gray-100 rounded-lg transition duration-200"
                          placeholder="Full Name"
                          value={fullName}
                          onChange={handleChange}
                        />
                        {errors.fullName && (
                          <Typography color="error" variant="caption">
                            {errors.fullName}
                          </Typography>
                        )}
                      </Grid>
                      <Grid item xs={12} md={6}>
                        <input
                          type="email"
                          name="email"
                          className="py-3 px-4 w-full text-sm placeholder-gray-500 bg-gray-50 outline-none focus:ring focus:ring-gray-100 border-gray-100 rounded-lg transition duration-200"
                          placeholder="Email"
                          value={email}
                          onChange={handleChange}
                        />
                        {errors.email && (
                          <Typography color="error" variant="caption">
                            {errors.email}
                          </Typography>
                        )}
                      </Grid>
                    </Grid>
                  </div>
                  <div className="py-5 border-b border-dashed">
                    <div className="flex flex-wrap justify-between -m-2">
                      <div className="w-auto p-2">
                        <span className="text-sm text-gray-500">Subtotal</span>
                      </div>
                      <div className="w-auto p-2">
                        <span className="font-semibold text-xl text-red-500">
                          $ {data.invoice_sub_total}
                        </span>
                      </div>
                    </div>
                    <div className="flex flex-wrap justify-between -m-2">
                      <div className="w-auto p-2">
                        <span className="text-sm text-gray-500">Discount</span>
                      </div>
                      <div className="w-auto p-2">
                        <span className="font-semibold text-green-500 text-xl">
                          $ {data.invoice_discount}
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="pt-6">
                    <div className="flex flex-wrap items-center justify-between -m-2">
                      <div className="w-auto p-2">
                        <p className="font-semibold text-2xl">Total Price</p>
                      </div>
                      <div className="w-auto p-2">
                        <p className="text-2xl font-semibold text-green-500">
                          $ {data.invoice_total}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
                <FormControlLabel
                  sx={{ mt: "10px", mb: "-10px", pl: "10px" }}
                  control={
                    <Checkbox
                      checked={acceptedTerms}
                      onChange={(e) => setAcceptedTerms(e.target.checked)}
                    />
                  }
                  label={
                    <Typography>
                      I agree to the{" "}
                      <Link
                        className="text-blue-400"
                        href="/terms-and-conditions"
                      >
                        terms and conditions
                      </Link>
                    </Typography>
                  }
                />
                <button
                  onClick={handleCheckout}
                  className="py-3 px-7 mt-6 w-full text-sm text-white font-semibold bg-blue-500 hover:bg-blue-600 focus:bg-blue-500 rounded-5xl focus:ring-4 focus:ring-gray-200 transition duration-300"
                >
                  Check Out
                </button>
              </div>
            </div>
          </>
        ) : (
          <Box
            className="bg-gray-50 rounded-lg p-10"
            sx={{ padding: "20px", textAlign: "center" }}
          >
            <Typography className="text-gray-600 text-4xl" fontWeight={"bold"}>
              Cart is Empty
            </Typography>

            <Typography className="text-gray-500 text-2xl" fontWeight={"bold"}>
              Please Add Your Product First
            </Typography>
          </Box>
        )}
      </div>
      <Snackbar
        open={Boolean(errorMessage)}
        autoHideDuration={6000}
        onClose={() => setErrorMessage("")}
      >
        <SnackbarContent
          style={{
            backgroundColor: "#f44336",
          }}
          message={errorMessage}
        />
      </Snackbar>
      <Snackbar
        open={Boolean(redirectingMessage)}
        autoHideDuration={6000}
        onClose={() => setRedirectingMessage("")}
      >
        <SnackbarContent
          style={{
            backgroundColor: "#4caf50",
          }}
          message={redirectingMessage}
        />
      </Snackbar>
    </section>
  );
};

export default CustomInvoiceCart;
