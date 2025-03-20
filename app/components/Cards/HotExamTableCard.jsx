/* eslint-disable @next/next/no-img-element */
"use client";
import { Box, Button, Grid } from "@mui/material";
import Link from "next/link";
import { useState } from "react";

const HotExamTableCard = ({ data }) => {
  const [selectedView, setSelectedView] = useState("month");

  const getRandomRating = () => {
    const ratings = [4.0, 4.1, 4.2, 4.3, 4.4, 4.5, 4.6, 4.7, 4.8, 4.9, 5.0];
    return ratings[Math.floor(Math.random() * ratings.length)];
  };

  const renderStarRating = (rating) => {
    const fullStars = Math.floor(rating);
    const partialStar = rating % 1;
    const emptyStars = 5 - fullStars - (partialStar > 0 ? 1 : 0);
    let stars = [];

    for (let i = 0; i < fullStars; i++) {
      stars.push(
        <span key={`full-${i}`} style={{ color: "gold" }}>
          ★
        </span>
      );
    }

    if (partialStar > 0) {
      stars.push(
        <span
          key={`partial-${fullStars}`}
          style={{
            color: "transparent",
            display: "inline-block",
            fontSize: "10px",
            lineHeight: "20px",
            WebkitTextStroke: "1px gold",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundColor: "transparent",
          }}
        ></span>
      );
    }

    for (let i = 0; i < emptyStars; i++) {
      stars.push(
        <span
          key={`empty-${i + fullStars + 1}`}
          style={{ color: "#ccc" }}
        ></span>
      );
    }

    return { stars: <>{stars}</>, numericalRating: rating };
  };

  const renderRows = (items) => {
    return (
      <div className="px-2 pt-5 pb-4 bg-white rounded-xl">
        <div className="overflow-x-auto custom-scrollbar">
          <div className="inline-block w-full min-w-max overflow-hidden ">
            <table className="table-auto w-full">
              <tbody>
                {items?.slice(0, 10)?.map((item, index) => (
                  <tr key={index} style={{ borderRadius: "4px" }}>
                    <td className="p-0">
                      <div
                        className={
                          index % 2 === 0
                            ? "flex items-center pl-4 pr-4 h-20 bg-blueGray-50 border-l border-t border-b border-gray-100 bg-gray-50 rounded-tl-2xl rounded-bl-2xl"
                            : "flex items-center pl-4 pr-4 h-20"
                        }
                      >
                        <div className="flex items-center">
                          <img
                            className="mr-4 h-8"
                            src={"https://dumpsarena.com/media/bacb.png"}
                            alt=""
                          />
                          <div className="flex-shrink-1">
                            <h4 className="font-heading text-wrap font-medium leading-4 text-blue-400 hover:text-blue-600">
                              <Link
                                href={`/exam-questions/${item.vendor_perma}/${item.exam_perma}`}
                                className="text-xs md:text-base text-gray-600"
                              >
                                <b>{item.exam_title}</b>
                              </Link>
                              <br />
                              <Link
                                href={`/exam-questions/${item.vendor_perma}/${item.exam_perma}`}
                                className="text-xs md:text-base"
                              >
                                {item.vendor_title}
                                <span className="md:hidden">
                                  {" "}
                                  - {
                                    renderStarRating(getRandomRating()).stars
                                  }{" "}
                                  {/* {
                                    renderStarRating(getRandomRating())
                                      .numericalRating
                                  } */}
                                </span>
                              </Link>
                            </h4>
                          </div>
                        </div>
                      </div>
                    </td>

                    <td className="p-0 hidden md:block">
                      <div
                        className={
                          index % 2 === 0
                            ? "flex items-center justify-center p-5 h-20 text-center bg-blueGray-50 border-t border-b border-r rounded-tr-xl rounded-br-xl border-gray-100 bg-gray-50"
                            : "flex items-center justify-center p-5 h-20 text-center"
                        }
                      >
                        <span className="py-2 pb-2 px-3 text-blue-600 font-medium  text-sm rounded-full">
                          <div
                            style={{
                              display: "flex",
                              gap: "2px",
                              flexDirection: "column",
                              justifyContent: "center",
                            }}
                          >
                            <span className="text-base">
                              {renderStarRating(getRandomRating()).stars}
                            </span>
                            {/* <span className="text-gray-500">{" / "}</span> */}
                            {/* (
                            {
                              renderStarRating(getRandomRating())
                                .numericalRating
                            }
                            ) */}
                          </div>
                        </span>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <hr />
        </div>
      </div>
    );
  };

  return (
    <>
      <Box className="text-white flex justify-between mb-3">
        <Grid container>
          <Grid item xs={12} md={6}></Grid>
          <Grid item xs={12} md={6}>
            <div className="md:flex justify-end">
              <Button
                className={`w-full md:w-48 text-nowrap text-white ${
                  selectedView === "month" ? "bg-gray-600" : "bg-blue-500"
                }`}
                variant="contained"
                onClick={() => setSelectedView("month")}
              >
                {selectedView === "month" ? <b>This Month</b> : "This Month"}
              </Button>
              <Button
                className={`w-full md:w-48 text-nowrap text-white md:ml-3 ${
                  selectedView === "week" ? "bg-gray-600" : "bg-blue-500"
                }`}
                variant="contained"
                onClick={() => setSelectedView("week")}
              >
                {selectedView === "week" ? <b>This Week</b> : "This Week"}
              </Button>
            </div>
          </Grid>
        </Grid>
      </Box>
      <hr style={{ border: "1px solid gray", marginTop: "4px" }} />
      <Box sx={{ width: "100%" }}>
        <section className="text-gray-600 body-font w-full">
          <div className="mx-auto flex flex-wrap w-full">
            <div className="py-2 w-full">
              <div className="w-full">
                {selectedView === "week" && renderRows(data?.week)}
                {selectedView === "month" && renderRows(data?.month)}
              </div>
            </div>
          </div>
        </section>
      </Box>
    </>
  );
};

export default HotExamTableCard;
