/* eslint-disable @next/next/no-img-element */
/* eslint-disable react-hooks/exhaustive-deps */
"use client";
import { X_API_Key } from "@/app/URL's/Api_X_Key";
import { Base_URL } from "@/app/URL's/Base_URL";
import {
  Box,
  Button,
  Card,
  CircularProgress,
  Grid,
  Typography,
} from "@mui/material";
import axios from "axios";
import Link from "next/link";
import { useEffect, useState } from "react";
import BannerCard from "../banner/BannerCard";

const AllTeExams = () => {
  const [data, setData] = useState([]);
  const [selectedLetter, setSelectedLetter] = useState("A");
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(false);

  const itemsPerPage = 10; // Number of vendors per page

  const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");

  const fetchData = async (letter = "A") => {
    setLoading(true);
    try {
      const response = await axios.get(
        `${Base_URL}/v1/all-exam-codes/${letter}`,
        {
          headers: {
            "x-api-key": X_API_Key,
          },
        }
      );
      setData(response.data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching data:", error.message);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData(selectedLetter);
  }, [selectedLetter]);

  const handleLetterClick = (letter) => {
    setSelectedLetter(letter);
    setCurrentPage(1); // Reset to first page when selecting a new letter
    fetchData(letter);
  };

  const handleNextPage = () => {
    setCurrentPage((prevPage) => prevPage + 1);
  };

  const handlePreviousPage = () => {
    setCurrentPage((prevPage) => prevPage - 1);
  };

  const startIndex = (currentPage - 1) * itemsPerPage;
  const selectedVendors = data.slice(startIndex, startIndex + itemsPerPage);
  const totalPages = Math.ceil(data.length / itemsPerPage);

  return (
    <section className="bg-white min-h-screen py-8">
      <div className="container mx-auto px-4">
        <Box sx={{ padding: 3 }}>
          {loading && (
            <Box
              sx={{
                position: "fixed",
                top: 0,
                left: 0,
                width: "100vw",
                height: "100vh",
                // backgroundColor: "rgba(255, 255, 255, 0.7)",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                zIndex: 9999,
              }}
            >
              <CircularProgress />
            </Box>
          )}
          <BannerCard />
          <section className="px-6 bg-white">
            <div className="flex flex-wrap -m-4">
              <div className="w-full lg:w-4/12 p-12">
                <div className="flex items-end gap-6">
                  <span
                    style={{ display: "flex", justifyContent: "center" }}
                    className="group flex-1"
                  >
                    <div
                      className="relative overflow-hidden rounded-xl transition duration-200"
                      style={{
                        height: "270px",
                        width: "330px",
                      }}
                    >
                      <img
                        className="absolute inset-0 rounded-xl w-full h-full transform group-hover:scale-105 transition duration-200"
                        src="/package-small-min_optimized.png"
                        alt=""
                      />
                    </div>
                  </span>
                </div>
              </div>
              <div className="w-full lg:w-8/12 p-4">
                <div className="p-5 pt-20">
                  <h2 className="font-heading uppercase text-3xl mb-2 max-w-xl">
                    Test Engine All Exams
                  </h2>
                  <hr
                    className="mb-4"
                    style={{ border: "2px solid #F5F6FA" }}
                  />
                  <p className="text-gray-500 text-base mt-2 font-semibold max-w-xl">
                    When you buy Test Engine Unlimited Access you will get all
                    vendors exams access
                  </p>

                  {/* 
                  <p className="text-green-500 text-base mt-2 font-semibold max-w-xl">
                  Monthly Download Limit:
                  </p> */}

                  <p className="text-red-500 text-base mt-2 font-semibold mb-6 max-w-xl">
                    You can Easily Serach Vendors Exams by their Name First
                    Alphabet.
                  </p>
                  <p className="text-blue-500 text-base mt-2 font-semibold max-w-xl">
                    Currently Searched Vendors Exams with Letter :{" "}
                    <span className="text-green-500">{selectedLetter}</span>
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* Alphabet Pagination */}
          <Box
            display="flex"
            justifyContent="center"
            alignItems="center"
            flexWrap="wrap"
            mb={3}
          >
            {alphabet.map((letter) => (
              <Button
                key={letter}
                variant={selectedLetter === letter ? "contained" : "outlined"}
                onClick={() => handleLetterClick(letter)}
                sx={{
                  margin: "5px 5px",
                  padding: "5px 15px",
                  minWidth: "40px",
                  fontSize: "16px",
                  fontWeight: "bold",
                }}
              >
                {letter}
              </Button>
            ))}
          </Box>

          {/* Vendor List */}
          {selectedVendors.map((vendor, index) => (
            <Box key={index} mb={4}>
              <Typography
                variant="h6"
                sx={{ color: "blue", fontWeight: "bold", mb: 2, ml: 2 }}
              >
                {vendor.vendor_title}
              </Typography>
              <Card
                className="shadow-lg"
                sx={{
                  padding: 3,
                  //   backgroundColor: "#f9f9f9",
                  border: "1px solid #e0e0e0",
                  borderRadius: "10px",
                }}
              >
                {vendor.exams.map((exam, examIndex) => (
                  <Grid
                    container
                    key={examIndex}
                    spacing={2}
                    sx={{
                      paddingBottom:
                        examIndex !== vendor.exams.length - 1 ? 2 : 0,
                      borderBottom:
                        examIndex !== vendor.exams.length - 1
                          ? "1px solid #e0e0e0"
                          : "none",
                    }}
                  >
                    <Grid item xs={12} md={8}>
                      <Typography
                        variant="subtitle1"
                        sx={{ color: "#22C55E", fontWeight: "bold" }}
                      >
                        {exam.exam_code}
                      </Typography>
                      <Typography variant="body2" sx={{ color: "gray" }}>
                        {exam.exam_name}
                      </Typography>
                    </Grid>
                    <Grid
                      item
                      xs={12}
                      md={4}
                      display="flex"
                      justifyContent="flex-end"
                      alignItems="center"
                    >
                      <Typography
                        variant="body1"
                        sx={{ color: "red", fontWeight: "bold" }}
                      >
                        {exam.exam_questions} Questions
                      </Typography>
                    </Grid>
                  </Grid>
                ))}
              </Card>
            </Box>
          ))}

          {/* Pagination Controls */}
          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
            mt={4}
          >
            <Button
              variant="outlined"
              onClick={handlePreviousPage}
              disabled={currentPage === 1}
              sx={{ fontWeight: "bold" }}
            >
              Previous
            </Button>
            <Typography variant="body2" sx={{ fontWeight: "bold" }}>
              Page {currentPage} of {totalPages}
            </Typography>
            <Button
              variant="outlined"
              onClick={handleNextPage}
              disabled={currentPage === totalPages}
              sx={{ fontWeight: "bold" }}
            >
              Next
            </Button>
          </Box>
        </Box>
      </div>
    </section>
  );
};

export default AllTeExams;
