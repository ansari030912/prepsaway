/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @next/next/no-img-element */
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
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { X_API_Key } from "../../URL's/Api_X_Key";
import { Base_URL } from "../../URL's/Base_URL";
import axios from "axios";

const PROMO_SUFFIX = "-30";

const CartCard = () => {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [promoCode, setPromoCode] = useState(`MEGASALE${PROMO_SUFFIX}`);
  const [apiPromoCode, setApiPromoCode] = useState(`MEGASALE${PROMO_SUFFIX}`);
  console.log("🚀 ~ CartCard ~ promoCode:", promoCode);
  const [errors, setErrors] = useState({});
  const [cartResponse, setCartResponse] = useState([]);
  console.log("🚀 ~ CartCard ~ cartResponse:", cartResponse);
  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [redirectingMessage, setRedirectingMessage] = useState("");
  const [ipAddress, setIpAddress] = useState("");
  const [acceptedTerms, setAcceptedTerms] = useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarBgColor, setSnackbarBgColor] = useState("");
  const searchParams = useSearchParams();
  const queryEmail = searchParams.get("referralCode");

  useEffect(() => {
    async function fetchIp() {
      const response = await fetch("/api/get-client-ip");
      const data = await response.json();
      setIpAddress(data.ip);
    }
    fetchIp();
  }, []);

  const validate = () => {
    let tempErrors = {};
    tempErrors.fullName = fullName ? "" : "This field is required";
    tempErrors.email = email ? "" : "This field is required";
    setErrors(tempErrors);
    if (!fullName || !email || !acceptedTerms) {
      let message;
      if (!fullName) {
        message = "Name is required";
      } else if (!email) {
        message = "Email is required";
      } else {
        message = "You must accept the terms";
      }
      setSnackbarMessage(message);
      setSnackbarBgColor("red");
      setSnackbarOpen(true);
      return false;
    }
    return true;
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
      case "promoCode":
        setPromoCode(`${value}${PROMO_SUFFIX}`);
        break;
      default:
        break;
    }
  };

  const handlePromoSubmit = (event) => {
    event.preventDefault();
    if (cartResponse.length > 0) {
      axios
        .post(
          `${Base_URL}/v1/update-cart`,
          {
            coupon: promoCode,
            cart_items: cartResponse.map((item) => item.cart),
          },
          {
            headers: {
              "x-api-key": X_API_Key,
            },
          }
        )
        .then((response) => {
          if (
            response.data &&
            response.data.length > 0 &&
            response.data[0].exam_code
          ) {
            setCartResponse(response.data);
            setApiPromoCode(promoCode);
            setSnackbarMessage("Coupon Applied!");
            setSnackbarBgColor("green");
            setSnackbarOpen(true);
            setErrorMessage("");
          } else {
            setErrorMessage("Coupon not found");
          }
        })
        .catch((error) => {
          console.error("Error updating cart with promo code:", error);
          setErrorMessage("Invalid Promo Code");
          setSnackbarMessage("Invalid Coupon Code.");
          setSnackbarBgColor("red");
          setSnackbarOpen(true);
        });
    }
  };

  const handleCheckout = async () => {
    if (!validate()) return;
    setLoading(true);
    setRedirectingMessage(
      "We are redirecting to you on Prepwise for payment..."
    );
    setSnackbarMessage("We are redirecting to you on Prepwise for payment...");
    setSnackbarBgColor("green");
    setSnackbarOpen(true);
    setTimeout(async () => {
      try {
        const response = await axios.post(
          `${Base_URL}/v1/payment`,
          {
            name: fullName,
            email: email,
            ip: ipAddress,
            coupon: apiPromoCode,
            IsInvoice: false,
            invoice_perma: "",
            cart_items: cartResponse.map((item) => item.cart),
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
          setErrorMessage("Payment processing failed. Please try again.");
          setSnackbarMessage("Payment processing failed. Please try again.");
          setSnackbarBgColor("red");
          setSnackbarOpen(true);
          setLoading(false);
        }
      } catch (error) {
        console.error("Error during checkout:", error);
        setErrorMessage("An error occurred. Please try again.");
        setSnackbarMessage("An error occurred. Please try again.");
        setSnackbarBgColor("red");
        setSnackbarOpen(true);
        setLoading(false);
      }
    }, 2000); // 2 seconds delay
  };

  // Calculating subtotal, discount, and final total amount
  const calculateTotals = () => {
    const subtotal = cartResponse.reduce(
      (acc, item) => acc + parseFloat(item.full_price),
      0
    );
    const discount = cartResponse.reduce(
      (acc, item) =>
        acc + (parseFloat(item.full_price) - parseFloat(item.price)),
      0
    );
    const total = cartResponse.reduce(
      (acc, item) => acc + parseFloat(item.price),
      0
    );
    return { subtotal, discount, total };
  };

  const totals = calculateTotals();
  useEffect(() => {
    const fetchAndUpdateCart = async () => {
      if (typeof localStorage !== "undefined") {
        const storedCartResponse = localStorage.getItem("CartProducts");
        console.log("🚀 ~ useEffect ~ storedCartResponse:", storedCartResponse);
        if (storedCartResponse) {
          const cartProducts = JSON.parse(storedCartResponse);
          console.log("🚀 ~ useEffect ~ cartProducts:", cartProducts);
          setCartResponse(cartProducts);

          // Call API to update cart if saveExam is true
          const saveExamItems = cartProducts.filter((item) => item.saveExam);
          console.log("🚀 ~ useEffect ~ saveExamItems:", saveExamItems);

          if (saveExamItems.length > 0) {
            try {
              const response = await axios.post(
                `${Base_URL}/v1/update-cart`,
                {
                  coupon: promoCode,
                  cart_items: saveExamItems.map((item) => item.cart),
                },
                {
                  headers: {
                    "x-api-key": X_API_Key,
                  },
                }
              );
              console.log("🚀 ~ response:", response);
              setCartResponse(response.data);
            } catch (error) {
              console.error("Error updating cart:", error);
            }
          }
        }
      }
    };

    fetchAndUpdateCart();
  }, []); // Dependency array remains empty to run only once

  const handleRemoveData = () => {
    localStorage.removeItem("CartProducts");
    window.location.reload();
  };

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  const handleRemoveItem = (itemToRemove) => {
    // Extract the prefix (first two points) of the itemToRemove cart string
    const itemPrefix = itemToRemove.cart.split("_").slice(0, 5).join("_") + "_";

    // Filter out the item to be removed from the cartResponse state based on the prefix
    const updatedCartResponse = cartResponse.filter(
      (item) => !item.cart.startsWith(itemPrefix)
    );

    // Update the cartResponse state
    setCartResponse(updatedCartResponse);

    // Update the CartProducts in local storage
    if (typeof localStorage !== "undefined") {
      const storedCartResponse = localStorage.getItem("CartProducts");
      if (storedCartResponse) {
        const cartProducts = JSON.parse(storedCartResponse);

        // Filter out the matching cart item from local storage based on the prefix
        const updatedCartProducts = cartProducts.filter(
          (item) => !item.cart.startsWith(itemPrefix)
        );

        // Update the local storage with the new array
        localStorage.setItem(
          "CartProducts",
          JSON.stringify(updatedCartProducts)
        );
      }
    }
  };

  return (
    <section className="pt-9 pb-16 bg-white" style={{ borderRadius: "12px" }}>
      <div className="container mx-auto px-4">
        {cartResponse.length > 0 ? (
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
                <div className="flex flex-wrap items=center">
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
                  <div className="pb-6 border-b border-dashed">
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
                        {cartResponse.map((item, i) => (
                          <div key={i} className="flex -m-2 border-b-2 mb-4">
                            <div className="w-auto hidden lg:inline-flex p-2">
                              <img
                                className="rounded-lg"
                                src="/package-small-min_optimized.png"
                                alt=""
                                width={"160px"}
                              />
                            </div>
                            <div className="p-2 pl-5 lg:pl-0 w-full flex flex-col justify-center">
                              <div>
                                <div className="flex justify-between">
                                  <div>
                                    <p className="mb-1.5 font-semibold text-gray-600 text-lg">
                                      {item.exam_code}
                                    </p>
                                    <p className="mb-1.5 font-semibold text-blue-500 text-base">
                                      {item.exam_title}
                                    </p>
                                    <p className="mb-1.5 text-sm text-green-600">
                                      {item.exam_title === item.title
                                        ? ""
                                        : item.title}
                                    </p>
                                  </div>
                                  {cartResponse.length > 1 && (
                                    <button
                                      onClick={() => handleRemoveItem(item)}
                                      className="flex flex-col justify-center"
                                    >
                                      <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        width="1.5em"
                                        height="1.5em"
                                        viewBox="0 0 24 24"
                                      >
                                        <path
                                          fill="red"
                                          d="M19 6.41L17.59 5L12 10.59L6.41 5L5 6.41L10.59 12L5 17.59L6.41 19L12 13.41L17.59 19L19 17.59L13.41 12z"
                                        />
                                      </svg>
                                    </button>
                                  )}
                                </div>
                                <div className="flex justify-between">
                                  <p className="text-base">x1</p>
                                  <span className="text-xl font-bold text-green-500">
                                    ${item.price} /{" "}
                                    <span className="text-gray-500 text-sm line-through">
                                      ${item.full_price}
                                    </span>{" "}
                                  </span>
                                </div>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                    <button
                      onClick={handleRemoveData}
                      className="py-3 px-7 mt-6 w-full text-sm text-white font-semibold bg-red-500 hover:bg-red-600 focus:bg-red-500 rounded-5xl focus:ring-4 focus:ring-gray-200 transition duration-300"
                    >
                      Clear Cart
                    </button>
                  </div>
                  <div className="py-6 border-b border-dashed">
                    <h6 className="mb-4 text-lg font-semibold">
                      Enter Your Detail
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
                      </Grid>
                      <Grid item xs={12} md={6}>
                        <input
                          type="text"
                          name="email"
                          className="py-3 px-4 w-full text-sm placeholder-gray-500 bg-gray-50 outline-none focus:ring focus:ring-gray-100 border-gray-100 rounded-lg transition duration-200"
                          placeholder="Email"
                          value={email}
                          onChange={handleChange}
                        />
                      </Grid>
                    </Grid>
                    <h6 className="mb-4 text-lg font-semibold">
                      Discount Code
                    </h6>
                    <form onSubmit={handlePromoSubmit}>
                      <div className="flex flex-wrap items-center -m-2 mb-0.5">
                        <div className="w-full lg:flex-1 p-2">
                          <input
                            type="text"
                            name="voucher"
                            className="py-3 px-4 w-full text-sm placeholder-gray-500 bg-gray-50 outline-none focus:ring focus:ring-gray-100 border-gray-100 rounded-lg transition duration-200"
                            placeholder="Enter your voucher"
                            value={promoCode.replace(PROMO_SUFFIX, "")}
                            onChange={(e) =>
                              setPromoCode(`${e.target.value}${PROMO_SUFFIX}`)
                            }
                          />
                        </div>
                        <div className="w-full lg:w-auto p-2">
                          <button
                            type="submit"
                            className="py-3 px-7 w-full text-sm text-white font-semibold bg-gray-900 hover:bg-gray-800 focus:bg-gray-900 rounded-5xl focus:ring-4 focus:ring-gray-200 transition duration-300"
                          >
                            Apply
                          </button>
                        </div>
                      </div>
                    </form>
                    <p className="text-sm font-semibold text-green-600">
                      Coupon{" "}
                      <span className="text-red-500 font-bold">
                        &apos;{apiPromoCode.slice(0, -3)}&apos;
                      </span>{" "}
                      is Applied Successfully.
                    </p>
                  </div>
                  <div className="py-5 border-b border-dashed">
                    <div className="flex flex-wrap justify-between -m-2">
                      <div className="w-auto p-2">
                        <span className="text-sm text-gray-500">Subtotal</span>
                      </div>
                      <div className="w-auto p-2">
                        <span className="font-semibold text-xl text-red-500">
                          ${totals.subtotal.toFixed(2)}
                        </span>
                      </div>
                    </div>
                    <div className="flex flex-wrap justify-between -m-2">
                      <div className="w-auto p-2">
                        <span className="text-sm text-gray-500">Off</span>
                      </div>
                      <div className="w-auto p-2">
                        <span className="font-semibold text-green-500 text-xl">
                          {cartResponse[0]?.off}%
                        </span>
                      </div>
                    </div>
                    <div className="flex flex-wrap justify-between -m-2">
                      <div className="w-auto p-2">
                        <span className="text-sm text-gray-500">Discount</span>
                      </div>
                      <div className="w-auto p-2">
                        <span className="font-semibold text-green-500 text-xl">
                          ${totals.discount.toFixed(2)}
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="pt-6">
                    <div className="flex flex-wrap items=center justify-between -m-2">
                      <div className="w-auto p-2">
                        <p className="font-semibold text-2xl">Total Price</p>
                      </div>
                      <div className="w-auto p-2">
                        <p className="text-2xl font-semibold text-green-500">
                          ${totals.total.toFixed(2)}
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
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={handleSnackbarClose}
      >
        <SnackbarContent
          style={{
            backgroundColor:
              snackbarBgColor === "green" ? "#4caf50" : "#f44336",
          }}
          message={snackbarMessage}
        />
      </Snackbar>
    </section>
  );
};

export default CartCard;
