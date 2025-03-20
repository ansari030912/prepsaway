/* eslint-disable @next/next/no-img-element */
"use client";
import { Icon } from "@iconify/react";
import {
  Box,
  Card,
  CardContent,
  Grid,
  Snackbar,
  SnackbarContent,
  Typography,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  IconButton,
  Divider,
} from "@mui/material";
import Link from "next/link";
import { useEffect, useState } from "react";
import BackCountDown from "./BackCountDown";
import { Base_URL } from "@/app/URL's/Base_URL";
import axios from "axios";
import { X_API_Key } from "@/app/URL's/Api_X_Key";

const AddToCart = ({ examData }) => {
  const [price, setPrice] = useState("0");
  const [discountPrice, setDiscountPrice] = useState("0");
  const [off, setOff] = useState("0");
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [cartPlan, setCartPlan] = useState({});
  const [dialogOpen, setDialogOpen] = useState(false);
  const [email, setEmail] = useState("");
  const [showDownloadButtons, setShowDownloadButtons] = useState(false);
  const [emailError, setEmailError] = useState("");
  const [pdfDownloadLink, setPdfDownloadLink] = useState("");
  const [teDownloadLink, setTeDownloadLink] = useState("");

  const handleDialogClose = () => {
    setDialogOpen(false);
    setEmail("");
    setEmailError("");
    setShowDownloadButtons(false);
  };

  const handleGetDemoDownloads = async () => {
    if (!email) {
      setEmailError("Email is required");
      return;
    }

    // Basic email pattern matching
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(email)) {
      setEmailError("Please enter a valid email address");
      return;
    }

    try {
      const response = await axios.post(
        `${Base_URL}/v1/demo`,
        {
          email: email,
          exam_perma: examData?.exam_perma,
        },
        {
          headers: {
            "x-api-key": X_API_Key,
          },
        }
      );

      const demoLinks = response.data;

      const pdfLink = demoLinks.find((link) => link.type === "pdf")?.link;
      const teLink = demoLinks.find((link) => link.type === "te")?.link;

      setEmail("");
      setEmailError("");
      setShowDownloadButtons(true);
      setPdfDownloadLink(pdfLink);
      setTeDownloadLink(teLink);
    } catch (error) {
      console.error("Error fetching demo download links:", error);
    }
  };

  const handleBoxClick = (item) => {
    // Retrieve the existing cart data from local storage
    const existingCartData =
      JSON.parse(localStorage.getItem("CartProducts")) || [];

    // Check if the item is already in the cart
    const isItemInCart = existingCartData.some(
      (cartItem) => cartItem.cart === item.cart
    );

    if (!isItemInCart) {
      // If the item is not already in the cart, add it
      const cartData = {
        cart: item.cart,
        saveExam: true,
      };

      existingCartData.push(cartData);

      // Save the updated array back to local storage
      localStorage.setItem("CartProducts", JSON.stringify(existingCartData));

      // Open the snackbar to show a message to the user
      setSnackbarOpen(true);

      // Reload the page
      window.location.reload();
    } else {
      // Optionally, you could display a message that the item is already in the cart
      console.log("Item already in the cart");
    }
  };

  const handleCloseSnackbar = () => {
    setSnackbarOpen(false);
  };

  const handleDialogOpen = () => {
    setDialogOpen(true);
  };

  useEffect(() => {
    if (examData?.exam_prices?.length > 0) {
      setPrice(examData?.exam_prices[0].price);
      setDiscountPrice(examData?.exam_prices[0].full_price);
      setOff(examData?.exam_prices[0].off);
      setCartPlan(examData?.exam_prices[0]);
    }
  }, [examData]);

  const handleSetPrice = (plan) => {
    setCartPlan(plan);
    setPrice(plan?.price);
    setDiscountPrice(plan?.full_price);
    setOff(plan?.off);
  };

  return (
    <>
      <div className="w-full lg:w-12/12 p-4 ">
        <Grid container spacing={2}>
          {examData.exam_preorder ? (
            ""
          ) : (
            <>
              <Grid item xs={12} md={5}>
                <div className="lg:pr-5 pt-1 pb-7">
                  <Button
                    sx={{ bgcolor: "red" }}
                    onClick={handleDialogOpen}
                    className="rounded-full hover:bg-red-600 focus:ring-4 focus:ring-gray-200 text-white font-semibold h-10 w-full px-7 py-4 flex items-center justify-center gap-2 transition duration-200"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="2em"
                      height="2em"
                      viewBox="0 0 24 24"
                    >
                      <g
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                      >
                        <path
                          fill="none"
                          strokeDasharray="14"
                          strokeDashoffset="14"
                          d="M6 19h12"
                        >
                          <animate
                            fill="freeze"
                            attributeName="stroke-dashoffset"
                            dur="0.4s"
                            values="14;0"
                          />
                        </path>
                        <path
                          fill="currentColor"
                          d="M12 4 h2 v6 h2.5 L12 14.5M12 4 h-2 v6 h-2.5 L12 14.5"
                        >
                          <animate
                            attributeName="d"
                            calcMode="linear"
                            dur="1.5s"
                            keyTimes="0;0.7;1"
                            repeatCount="indefinite"
                            values="M12 4 h2 v6 h2.5 L12 14.5M12 4 h-2 v6 h-2.5 L12 14.5;M12 4 h2 v3 h2.5 L12 11.5M12 4 h-2 v3 h-2.5 L12 11.5;M12 4 h2 v6 h2.5 L12 14.5M12 4 h-2 v6 h-2.5 L12 14.5"
                          />
                        </path>
                      </g>
                    </svg>
                    <span style={{ fontSize: "16px" }}>Download Demo</span>
                  </Button>
                </div>
                <div className="lg:ml-2 lg:mr-8 mb-4 w-95 border-t-2"></div>

                <p className="text-xl font-bold text-gray-700 mb-4">
                  Select Product
                </p>
                <Grid
                  container
                  spacing={2}
                  justifyContent="center"
                  sx={{ width: "100%", mb: "14px" }}
                >
                  {examData?.exam_prices?.map((plan, index) => (
                    <Grid item key={index} xs={12} width={"100%"}>
                      <Box
                        sx={{
                          width: "100%",
                          bgcolor: "#F5F6FA",
                          border:
                            price === plan?.price ? "1px solid #f78585" : "",
                          borderRadius: "8px",
                          boxShadow:
                            price === plan?.price
                              ? "0px 0px 8px rgba(0, 0, 0, 0.5)"
                              : "",
                          padding: "0px",
                          margin: "0px",
                          cursor: "pointer",
                        }}
                        className="transition duration-300 ease-in-out transform hover:scale-105"
                        onClick={() => handleSetPrice(plan)}
                      >
                        <CardContent>
                          {plan?.off === "70" && (
                            <Typography
                              sx={{
                                backgroundColor: "purple",
                                color: "white",
                                fontWeight: "bold",
                                p: 1,
                                textAlign: "center",
                                display: "flex",
                                justifyContent: "space-between",
                                alignItems: "center",
                                borderRadius: "8px",
                              }}
                              fontSize={12}
                            >
                              <span>MOST POPULAR</span>
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="1.5em"
                                height="1.5em"
                                viewBox="0 0 512 512"
                              >
                                <path
                                  fill="#ffaf24"
                                  d="m252.5 381l-128 49c-5.9 2.2-12.1-2.3-11.8-8.6l7-136.9c.1-2.1-.6-4.2-1.9-5.9L31.6 172c-4-4.9-1.6-12.2 4.5-13.9l132.4-35.6c2.1-.6 3.9-1.9 5-3.7L248.3 4c3.4-5.3 11.2-5.3 14.6 0l74.8 114.9c1.2 1.8 3 3.1 5 3.7l132.4 35.6c6.1 1.6 8.5 9 4.5 13.9l-86.1 106.6c-1.3 1.7-2 3.8-1.9 5.9l7 136.9c.3 6.3-5.9 10.8-11.8 8.6l-128-49c-2.1-.8-4.3-.8-6.3-.1"
                                />
                                <path
                                  fill="#ffb700"
                                  d="m456.1 51.7l-41-41c-1.2-1.2-2.8-1.7-4.4-1.5c-1.6.2-3.1 1.2-3.9 2.6l-42.3 83.3c-1.2 2.1-.8 4.6.9 6.3c1 1 2.4 1.5 3.7 1.5c.9 0 1.8-.2 2.6-.7L454.9 60c1.4-.8 2.4-2.2 2.6-3.9c.3-1.6-.3-3.2-1.4-4.4m-307 43.5l-42.3-83.3c-.8-1.4-2.2-2.4-3.9-2.6c-1.6-.2-3.3.3-4.4 1.5l-41 41c-1.2 1.2-1.7 2.8-1.5 4.4c.2 1.6 1.2 3.1 2.6 3.9l83.3 42.3c.8.5 1.7.7 2.6.7c1.4 0 2.7-.5 3.7-1.5c1.7-1.8 2-4.4.9-6.4m140.7 410l-29-88.8c-.2-.9-.7-1.7-1.3-2.3c-1-1-2.3-1.5-3.7-1.5c-2.4 0-4.4 1.6-5.1 3.9l-29 88.8c-.4 1.6-.1 3.3.9 4.6c1 1.3 2.5 2.1 4.2 2.1h57.9c1.6 0 3.2-.8 4.2-2.1c1.1-1.4 1.4-3.1.9-4.7"
                                />
                              </svg>
                            </Typography>
                          )}
                          <div className="flex items-center justify-between h-full">
                            <div>
                              <Typography
                                gutterBottom
                                variant="h5"
                                component="div"
                                sx={{ mt: plan?.off === "70" ? 2 : 0 }}
                                fontSize={16}
                              >
                                <b className="text-blue-600">{plan?.title}</b>
                              </Typography>
                              <Typography
                                variant="body2"
                                color="text.secondary"
                                fontSize={14}
                              >
                                {plan?.title === "Full Premium Bundle" &&
                                  "PDF, Test Engine & Training Course Bundle"}
                                {plan?.title === "PDF & Test Engine Bundle" &&
                                  "Printable PDF & Test Engine Bundle"}
                                {plan?.title === "Training Course Only" &&
                                  "282 Lectures (23 Hours)"}
                                {plan?.title === "Test Engine Only" &&
                                  "Test Engine File for 3 devices"}
                                {plan?.title === "PDF Only" &&
                                  "Printable Premium PDF only"}
                              </Typography>
                            </div>
                            <div>
                              <Typography
                                variant="h6"
                                sx={{
                                  fontWeight: "bold",
                                  marginTop: plan?.off === "70" ? 2 : 0,
                                  color: "green",
                                }}
                              >
                                ${plan?.price}
                              </Typography>
                              <Typography
                                variant="body2"
                                color="text.primary"
                                sx={{ textAlign: "right" }}
                              >
                                <span
                                  style={{
                                    textDecoration: "line-through",
                                    color: "#ff7043",
                                    fontSize: "0.8rem",
                                    textAlign: "right",
                                  }}
                                >
                                  ${plan?.full_price}
                                </span>
                              </Typography>
                            </div>
                          </div>
                        </CardContent>
                      </Box>
                    </Grid>
                  ))}
                </Grid>
              </Grid>
            </>
          )}
          <Grid item xs={12} md={7}>
            {examData.exam_preorder ? (
              ""
            ) : examData?.exam_retired ? (
              <>
                <div className="hidden lg:inline-block">
                  <p className="text-xl mb-4 font-bold text-blue-600">
                    {examData?.exam_vendor_title}
                  </p>
                  <Grid container spacing={2} sx={{ mb: "10px" }}>
                    <Grid item lg={6}>
                      <h6 className="text-2xl text-gray-600 font-semibold">
                        Safe Files
                      </h6>
                      <ol className="list-disc pl-4 text-base mb-2 text-gray-500">
                        <li>Guaranteed To Have Actual PDF</li>
                      </ol>
                      <h6 className="text-2xl text-gray-600 font-semibold">
                        Material
                      </h6>
                      <ol className="list-disc pl-4 text-base mb-2 text-gray-500">
                        <li> Verified By IT Certified Experts</li>
                        <li>100% Accurate Answers</li>
                        <li>100% Money Back Guarantee</li>
                        <li>Instant Downloads</li>
                        <li>Free Fast Exam Updates</li>
                      </ol>
                    </Grid>
                    <Grid item lg={6}>
                      <h6 className="text-2xl text-gray-600 font-semibold">
                        Exam Questions
                      </h6>
                      <ol className="list-disc pl-4 text-sm mb-2 text-gray-500">
                        <li>Up-To-Date Exam Study Material</li>
                      </ol>
                      <h6 className="text-2xl text-gray-600 font-semibold">
                        PDF
                      </h6>
                      <ol className="list-disc pl-4 text-sm mb-2 text-gray-500">
                        <li>Best Value Available in Market</li>
                        <li>Try Demo Before You Buy</li>
                        <li>Secure Shopping Experience</li>
                        <li>Exam Questions And Answers</li>
                        <li>99.5% High Success Pass Rate</li>
                      </ol>
                    </Grid>
                  </Grid>
                </div>
                <hr style={{ border: "1px solid #F5F6FA" }} />
                <Box
                  sx={{
                    bgcolor: "#F8D7DA",
                    border: "1px solid red",
                    padding: "10px",
                    my: "10px",
                    boxShadow: "inset 0px 0px 8px rgba(0, 0, 0, 0.5)",
                  }}
                >
                  <Typography fontSize={18} fontWeight={600} color={"red"}>
                    <span
                      className="text-gray-600"
                      style={{ fontSize: "22px" }}
                    >
                      Note :{" "}
                    </span>
                    {examData?.exam_code} ({examData?.exam_title}) will not
                    receive any new updates.
                  </Typography>
                  <Typography
                    fontSize={16}
                    fontWeight={600}
                    className="text-gray-600"
                    sx={{ textAlign: "right" }}
                  >
                    New exam code :{" "}
                    <Link
                      href={`/exam-questions/${examData?.exam_vendor_perma}/${examData?.exam_alternate?.exam_alternate_perma}`}
                      // style={{ color: "blue" }}
                      className="hover:text-blue-700 text-blue-600 hover:underline"
                    >
                      {examData?.exam_alternate.exam_alternate_code}
                    </Link>
                  </Typography>
                </Box>
              </>
            ) : (
              <>
                <div className="hidden lg:inline-block">
                  <p className="text-xl mb-4 font-bold text-blue-600">
                    {examData?.exam_vendor_title}
                  </p>
                  <Grid container spacing={2} sx={{ mb: "10px" }}>
                    <Grid item lg={6}>
                      <h6 className="text-2xl text-gray-600 font-semibold">
                        Safe Files
                      </h6>
                      <ol className="list-disc pl-4 text-base mb-2 text-gray-500">
                        <li>Guaranteed To Have Actual PDF</li>
                      </ol>
                      <h6 className="text-2xl text-gray-600 font-semibold">
                        Material
                      </h6>
                      <ol className="list-disc pl-4 text-base mb-2 text-gray-500">
                        <li> Verified By IT Certified Experts</li>
                        <li>100% Accurate Answers</li>
                        <li>100% Money Back Guarantee</li>
                        <li>Instant Downloads</li>
                        <li>Free Fast Exam Updates</li>
                      </ol>
                    </Grid>
                    <Grid item lg={6}>
                      <h6 className="text-2xl text-gray-600 font-semibold">
                        Exam Questions
                      </h6>
                      <ol className="list-disc pl-4 text-sm mb-2 text-gray-500">
                        <li>Up-To-Date Exam Study Material</li>
                      </ol>
                      <h6 className="text-2xl text-gray-600 font-semibold">
                        PDF
                      </h6>
                      <ol className="list-disc pl-4 text-sm mb-2 text-gray-500">
                        <li>Best Value Available in Market</li>
                        <li>Try Demo Before You Buy</li>
                        <li>Secure Shopping Experience</li>
                        <li>Exam Questions And Answers</li>
                        <li>99.5% High Success Pass Rate</li>
                      </ol>
                    </Grid>
                  </Grid>
                </div>
                <hr style={{ border: "1px solid #F5F6FA" }} />
                <Card
                  className="hidden lg:inline-block w-full"
                  sx={{
                    bgcolor: "#c7dfe8",
                    p: "15px",
                    textAlign: "center",
                    mt: "10px",
                    boxShadow: "inset 0px 0px 8px rgba(0, 0, 0, 0.5)",
                    mb: "20px",
                  }}
                >
                  <Typography fontSize={20} fontWeight={700}>
                    <span style={{ color: "#856404" }}>
                      Limited Time Mega Sale!
                    </span>
                    <br />
                    <span style={{ color: "#DC3545" }}>(40-70% OFF)</span>
                  </Typography>
                  <Typography fontSize={14} fontWeight={600} color={"#856404"}>
                    Hurry up! offer ends in <BackCountDown />
                  </Typography>
                </Card>
              </>
            )}
            {examData.exam_preorder ? (
              " "
            ) : (
              <>
                <hr
                  style={{ border: "1px solid #F5F6FA", marginBottom: "20px" }}
                />
                <div>
                  <span className="font-heading text-lg my-4 pl-4 text-gray-600 font-semibold flex justify-between items-center">
                    Actual Amount :{" "}
                    <span
                      style={{
                        position: "relative",
                        display: "inline-block",
                        color: "red",
                      }}
                      className="text-xl"
                    >
                      ${discountPrice}
                      <span
                        style={{
                          position: "absolute",
                          height: "2px",
                          width: "100%",
                          backgroundColor: "red",
                          top: "60%",
                          left: "0",
                          transform: "rotate(-5deg)",
                          transformOrigin: "left center",
                        }}
                      />
                    </span>
                  </span>
                  <hr style={{ border: "1px solid #F5F6FA" }} />
                  <span className="font-heading text-lg my-4 pl-4 flex text-gray-600 font-semibold justify-between items-center">
                    <span>Discount :</span>
                    <span className="text-green-600">{off}%</span>
                  </span>
                  <hr style={{ border: "1px solid #F5F6FA" }} />
                  <span className="font-heading text-lg my-4 pl-4 flex text-gray-600 font-semibold justify-between items-center">
                    Total Amount :
                    <span className="text-green-600 text-2xl">${price}</span>
                  </span>
                  <hr
                    style={{
                      border: "1px solid #F5F6FA",
                      marginBottom: "12px",
                    }}
                  />
                  <button
                    onClick={() => handleBoxClick(cartPlan)}
                    className="bg-green-600 rounded-full hover:bg-green-700 text-white font-semibold h-10 w-full px-7 py-4 flex items-center justify-center gap-2 transition duration-200"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="25"
                      height="24"
                      viewBox="0 0 25 24"
                      fill="none"
                    >
                      <path
                        d="M21.6479 16H7.64795C7.38273 16 7.12838 15.8946 6.94084 15.7071C6.75331 15.5196 6.64795 15.2652 6.64795 15C6.64795 14.7348 6.75331 14.4804 6.94084 14.2929C7.12838 14.1054 7.38273 14 7.64795 14H18.0879C18.7566 14 19.4061 13.7767 19.9333 13.3654C20.4605 12.9542 20.8352 12.3786 20.9979 11.73L22.6479 5.24C22.6854 5.09241 22.6887 4.93821 22.6575 4.78917C22.6263 4.64013 22.5614 4.50018 22.4679 4.38C22.3707 4.25673 22.2458 4.1581 22.1033 4.09208C21.9609 4.02606 21.8049 3.99452 21.6479 4H7.40795C7.20164 3.41645 6.81988 2.911 6.31501 2.55294C5.81015 2.19488 5.20689 2.00174 4.58795 2H3.64795C3.38273 2 3.12838 2.10536 2.94084 2.29289C2.75331 2.48043 2.64795 2.73478 2.64795 3C2.64795 3.26522 2.75331 3.51957 2.94084 3.70711C3.12838 3.89464 3.38273 4 3.64795 4H4.58795C4.81638 3.99334 5.04021 4.06513 5.22215 4.20341C5.4041 4.34169 5.5332 4.53812 5.58795 4.76L5.64795 5.24L7.37795 12C6.5823 12.0358 5.83346 12.3862 5.29617 12.9741C4.75888 13.5621 4.47714 14.3394 4.51295 15.135C4.54875 15.9306 4.89916 16.6795 5.48709 17.2168C6.07501 17.7541 6.8523 18.0358 7.64795 18H7.82795C7.66348 18.4531 7.61064 18.9392 7.67388 19.4171C7.73712 19.895 7.9146 20.3506 8.19127 20.7454C8.46794 21.1401 8.83566 21.4624 9.2633 21.6849C9.69094 21.9074 10.1659 22.0235 10.6479 22.0235C11.13 22.0235 11.605 21.9074 12.0326 21.6849C12.4602 21.4624 12.828 21.1401 13.1046 20.7454C13.3813 20.3506 13.5588 19.895 13.622 19.4171C13.6853 18.9392 13.6324 18.4531 13.4679 18H15.8279C15.6635 18.4531 15.6106 18.9392 15.6739 19.4171C15.7371 19.895 15.9146 20.3506 16.1913 20.7454C16.4679 21.1401 16.8357 21.4624 17.2633 21.6849C17.6909 21.9074 18.1659 22.0235 18.6479 22.0235C19.13 22.0235 19.605 21.9074 20.0326 21.6849C20.4602 21.4624 20.828 21.1401 21.1046 20.7454C21.3813 20.3506 21.5588 19.895 21.622 19.4171C21.6853 18.9392 21.6324 18.4531 21.4679 18H21.6479C21.9132 18 22.1675 17.8946 22.3551 17.7071C22.5426 17.5196 22.6479 17.2652 22.6479 17C22.6479 16.7348 22.5426 16.4804 22.3551 16.2929C22.1675 16.1054 21.9132 16 21.6479 16ZM20.3679 6L19.0579 11.24C19.0032 11.4619 18.8741 11.6583 18.6922 11.7966C18.5102 11.9349 18.2864 12.0067 18.0579 12H9.42795L7.92795 6H20.3679ZM10.6479 20C10.4502 20 10.2568 19.9414 10.0924 19.8315C9.92793 19.7216 9.79976 19.5654 9.72407 19.3827C9.64838 19.2 9.62858 18.9989 9.66716 18.8049C9.70575 18.6109 9.80099 18.4327 9.94084 18.2929C10.0807 18.153 10.2589 18.0578 10.4529 18.0192C10.6468 17.9806 10.8479 18.0004 11.0306 18.0761C11.2134 18.1518 11.3695 18.28 11.4794 18.4444C11.5893 18.6089 11.6479 18.8022 11.6479 19C11.6479 19.2652 11.5426 19.5196 11.3551 19.7071C11.1675 19.8946 10.9132 20 10.6479 20ZM18.6479 20C18.4502 20 18.2568 19.9414 18.0924 19.8315C17.9279 19.7216 17.7998 19.5654 17.7241 19.3827C17.6484 19.2 17.6286 18.9989 17.6672 18.8049C17.7057 18.6109 17.801 18.4327 17.9408 18.2929C18.0807 18.153 18.2589 18.0578 18.4529 18.0192C18.6468 17.9806 18.8479 18.0004 19.0306 18.0761C19.2134 18.1518 19.3695 18.28 19.4794 18.4444C19.5893 18.6089 19.6479 18.8022 19.6479 19C19.6479 19.2652 19.5426 19.5196 19.3551 19.7071C19.1675 19.8946 18.9132 20 18.6479 20Z"
                        fill="#F0FDF4"
                      ></path>
                    </svg>
                    <span style={{ fontSize: "16px" }}>Add To Cart</span>
                  </button>
                </div>
              </>
            )}
          </Grid>
        </Grid>
      </div>

      {/* Dialog for Download PDF Demo */}
      <Dialog
        open={dialogOpen}
        onClose={handleDialogClose}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle>
          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
          >
            <Typography variant="h6" component="div" color="purple">
              First Try Then Buy!
            </Typography>
            <IconButton onClick={handleDialogClose}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="1em"
                height="1em"
                viewBox="0 0 32 32"
              >
                <path
                  fill="currentColor"
                  d="M16 2C8.2 2 2 8.2 2 16s6.2 14 14 14s14-6.2 14-14S23.8 2 16 2m0 26C9.4 28 4 22.6 4 16S9.4 4 16 4s12 5.4 12 12s-5.4 12-12 12"
                />
                <path
                  fill="currentColor"
                  d="M21.4 23L16 17.6L10.6 23L9 21.4l5.4-5.4L9 10.6L10.6 9l5.4 5.4L21.4 9l1.6 1.6l-5.4 5.4l5.4 5.4z"
                />
              </svg>
            </IconButton>
          </Box>
        </DialogTitle>
        <Divider />
        <DialogContent>
          <div className="lg:hidden flex justify-center">
            <img
              className="lg:hidden"
              src="/package-small-min_optimized.png" // Replace with actual image URL or import
              alt="Product"
              style={{ maxWidth: "170px", marginRight: "20px" }}
            />
          </div>
          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="flex-start"
          >
            <ul style={{ listStyleType: "none", padding: 0 }}>
              <li>✔ Complimentary Regular Updates</li>
              <li>✔ Validated by Certified IT Professionals</li>
              <li>✔ Immediate Access to Downloads</li>
              <li>✔ Current and Comprehensive Study Guides</li>
              <li>✔ 99.5% Proven Success Rate</li>
              <li>✔ Completely Accurate Answer Key</li>
            </ul>

            <img
              className="hidden lg:inline-flex"
              src="/package-small-min_optimized.png" // Replace with actual image URL or import
              alt="Product"
              style={{ maxWidth: "150px", marginRight: "20px" }}
            />
          </Box>
          {!showDownloadButtons ? (
            <TextField
              label="Enter Your Email"
              type="email"
              fullWidth
              variant="outlined"
              margin="normal"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              error={Boolean(emailError)}
              helperText={emailError}
            />
          ) : (
            <Typography
              variant="subtitle1"
              className="text-center mt-4"
              color="green"
            >
              Download PDF & Test Engine Demo
            </Typography>
          )}
        </DialogContent>
        <DialogActions className="flex flex-col px-8">
          {!showDownloadButtons ? (
            <Button
              onClick={handleGetDemoDownloads}
              className="bg-purple-600 rounded-full  hover:bg-purple-800 focus:ring-4 -mt-6 focus:ring-gray-200 text-white font-semibold h-10 w-full px-7 py-4 flex items-center justify-center gap-2 transition duration-200"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="1em"
                height="1em"
                viewBox="0 0 24 24"
              >
                <g
                  stroke="white"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                >
                  <path
                    fill="none"
                    strokeDasharray="14"
                    strokeDashoffset="14"
                    d="M6 19h12"
                  >
                    <animate
                      fill="freeze"
                      attributeName="stroke-dashoffset"
                      dur="0.4s"
                      values="14;0"
                    />
                  </path>
                  <path
                    fill="white"
                    d="M12 4 h2 v6 h2.5 L12 14.5M12 4 h-2 v6 h-2.5 L12 14.5"
                  >
                    <animate
                      attributeName="d"
                      calcMode="linear"
                      dur="1.5s"
                      keyTimes="0;0.7;1"
                      repeatCount="indefinite"
                      values="M12 4 h2 v6 h2.5 L12 14.5M12 4 h-2 v6 h-2.5 L12 14.5;M12 4 h2 v3 h2.5 L12 11.5M12 4 h-2 v3 h-2.5 L12 11.5;M12 4 h2 v6 h2.5 L12 14.5M12 4 h-2 v6 h-2.5 L12 14.5"
                    />
                  </path>
                </g>
              </svg>
              <span style={{ fontSize: "16px", color: "white" }}>
                Get Demo Downloads
              </span>
            </Button>
          ) : (
            <>
              <Link
                className="w-full"
                href={`https://certsgang.com${pdfDownloadLink}`}
              >
                <Button className="bg-purple-600 rounded-full hover:bg-purple-800 focus:ring-4 -mt-6 focus:ring-gray-200 text-white font-semibold h-10 w-full px-7 py-4 flex items-center justify-center gap-2 transition duration-200">
                  Download PDF
                </Button>
              </Link>
              <Link
                className="w-full"
                href={`https://certsgang.com${teDownloadLink}`}
              >
                <Button className="bg-purple-600 rounded-full hover:bg-purple-800 focus:ring-4 mt-4 mr-2 focus:ring-gray-200 text-white font-semibold h-10 w-full px-7 py-4 flex items-center justify-center gap-2 transition duration-200">
                  Download Test Engine
                </Button>
              </Link>
            </>
          )}
        </DialogActions>
        <Box paddingX={3} paddingBottom={2}>
          <Typography
            variant="caption"
            className="text-center text-base"
            color="error"
            display="block"
          >
            (We will send your demo download links to your email address)
          </Typography>
          <Typography
            variant="caption"
            className="text-center text-base mt-2"
            color="danger"
            display="block"
          >
            ** We value your privacy. We will not share your email address.
          </Typography>
        </Box>
      </Dialog>

      <Snackbar
        open={snackbarOpen}
        autoHideDuration={3000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
      >
        <SnackbarContent
          sx={{
            backgroundColor: "green",
          }}
          message={
            <span style={{ display: "flex", alignItems: "center" }}>
              <Icon
                icon="mdi:cart-outline"
                width="1.6em"
                height="1.4em"
                style={{ color: "white", marginRight: "2px" }}
              />
              Product added to cart!
            </span>
          }
        />
      </Snackbar>
    </>
  );
};

export default AddToCart;
