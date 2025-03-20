/* eslint-disable @next/next/no-img-element */
"use client";
import { CardMedia, Grid } from "@mui/material";
import Link from "next/link";
import { useState } from "react";

const HotExamCards = ({ data }) => {
  const [toggle, setToggle] = useState(false);
  const [selectedView, setSelectedView] = useState("month");

  const renderRows = (items) => {
    return items?.slice(0, 10)?.map((item, index) => {
      const { vendor_title, exam_title, exam_perma, vendor_perma, exam_code } =
        item;
      return (
        <Grid
          item
          xs={12}
          sm={6}
          md={3}
          lg={2.4}
          xl={2.4}
          key={exam_perma}
          className="w-full px-2 mb-1"
        >
          <div
            className="bg-white"
            style={{
              minHeight: "310px",
              marginBottom: "1rem",
              padding: "1rem",
              boxShadow:
                "4px 4px 6px 1px rgba(0, 0, 0, 0.1), 0 2px 4px -2px rgba(0, 0, 0, 0.1)",
              borderRadius: "1rem",
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
              gap: "1rem",
            }}
          >
            <div style={{ flexGrow: 1 }}>
              <div>
                <p className="text-base flex justify-between text-gray-800 font-bold mb-2">
                  <span>{vendor_title}</span>
                  <span className="text-green-500 font-semibold">
                    {exam_code}
                  </span>
                </p>
                <hr className="mt-2" />
                <span className="block text-sm text-gray-600 font-bold mt-3 mb-6">
                  {exam_code} - {exam_title}
                </span>
              </div>
              <div className="flex justify-center mb-1">
                <CardMedia>
                  <img src="/img-1.png" width={"150px"} alt="" />
                </CardMedia>
              </div>
            </div>
            <div style={{ alignSelf: "stretch" }}>
              <hr className="mb-2" />
              <Link
                href={`/exam-questions/${item.vendor_perma}/${item.exam_perma}`}
                className="inline-flex group w-full -mb-1 py-2 px-2 items-center justify-center text-base font-medium text-green-500 hover:text-white border border-green-500 hover:bg-green-500 rounded-full transition duration-200"
              >
                <span className="mr-2">Buy Now</span>
                <span className="transform group-hover:translate-x-1 transition-transform duration-200">
                  <svg
                    width="16"
                    height="18"
                    viewBox="0 0 21 20"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M5.25 10H15.75"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    ></path>
                    <path
                      d="M10.5 4.75L15.75 10L10.5 15.25"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    ></path>
                  </svg>
                </span>
              </Link>
            </div>
          </div>
        </Grid>
      );
    });
  };

  return (
    <section
      style={{
        backgroundImage: `url('/bg-cut-4.png')`,
      }}
      className="py-8 lg:py-14 bg-cover "
    >
      <div className="container mx-auto px-4">
        <div className="max-w-2xl mx-auto text-center mb-8 md:mb-10">
          <h2 className="font-bold sm:text-4xl text-gray-700 mb-6">
            Hot Exams
          </h2>
          <p className="text-lg text-gray-700 opacity-80">
            Our pricing plans are simple and designed to cater to households and
            companies of various sizes. Choose a plan that suits your needs and
            budget.
          </p>
        </div>
        <div className="flex md:flex-row flex-col mb-12 items-center justify-center">
          <div>
            <div className="flex justify-center items-center">
              <span
                style={{
                  boxShadow: "0px 0px 8px rgba(0, 0, 0, 0.1)",
                }}
                className="inline-block mt-5 mr-5 md:mt-0 md:ml-6 px-4 py-2 text-lg leading-6 text-teal-800 font-medium bg-lime-50 rounded-full"
              >
                Monthly
              </span>
              <div className="relative flex h-5 mt-5 md:mt-0 px-0.5 items-center justify-between transition duration-200 ease-linear rounded-full bg-gray-200 shadow">
                <button
                  onClick={() => {
                    setToggle(!toggle);
                    setSelectedView(toggle ? "month" : "week");
                  }}
                  className={`inline-block w-4 h-4 ${
                    toggle ? "bg-transparent" : "bg-green-500"
                  } rounded-full`}
                ></button>
                <button
                  onClick={() => {
                    setToggle(!toggle);
                    setSelectedView(toggle ? "month" : "week");
                  }}
                  className={`inline-block w-4 h-4 ${
                    toggle ? "bg-green-500" : "bg-transparent"
                  } rounded-full`}
                ></button>
              </div>
              <span
                style={{
                  boxShadow: "0px 0px 8px rgba(0, 0, 0, 0.1)",
                }}
                className="inline-block ml-6 mt-5 md:mt-0 md:ml-6 px-4 py-2 text-lg leading-6 text-teal-800 font-medium bg-lime-50 rounded-full"
              >
                Weekly
              </span>
            </div>
          </div>
        </div>
        <div>
          <Grid container className="flex justify-center lg:justify-start">
            {selectedView === "week" && renderRows(data?.week)}
            {selectedView === "month" && renderRows(data?.month)}
          </Grid>
        </div>
      </div>
    </section>
  );
};

export default HotExamCards;
