/* eslint-disable @next/next/no-img-element */
"use client";
import { Icon } from "@iconify/react";
import { IconButton, Typography } from "@mui/material";
import { useEffect, useState } from "react";

const CustomCaresolTestEngine = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const slides = [
    "/test-engine/slide1_optimized.png",
    "/test-engine/slide2_optimized.png",
    "/test-engine/slide3_optimized.png",
    "/test-engine/slide4_optimized.png",
    "/test-engine/slide5_optimized.png",
  ];

  const prevSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? slides.length - 1 : prevIndex - 1
    );
  };

  const nextSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === slides.length - 1 ? 0 : prevIndex + 1
    );
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) =>
        prevIndex === slides.length - 1 ? 0 : prevIndex + 1
      );
    }, 4000);
    return () => clearInterval(interval);
  }, [slides.length]);

  return (
    <>
      <div className="relative">
        <div className="overflow-hidden">
          <div
            className="flex transition-transform duration-300 ease-in-out transform"
            style={{
              transform: `translateX(-${
                (currentIndex % slides.length) * (100 / 1)
              }%)`,
            }}
          >
            {slides.map((slide, index) => (
              <div key={index} className="w-full h-full flex-shrink-0">
                <img
                  src={slide}
                  alt={`Slide ${index + 1}`}
                  className="w-full h-full"
                  style={{ width: "100%", height: "100%" }}
                />
              </div>
            ))}
          </div>
        </div>
        <div className="absolute top-0 left-0 right-0 flex justify-between items-center h-full">
          <IconButton onClick={prevSlide}>
            <Icon
              icon="mingcute:left-line"
              width="1.2em"
              height="1.2em"
              style={{ color: "#415B83" }}
            />
          </IconButton>
          <IconButton onClick={nextSlide}>
            <Icon
              icon="mingcute:right-line"
              width="1.2em"
              height="1.2em"
              style={{ color: "#415B83" }}
            />
          </IconButton>
        </div>
      </div>

      <div className="text-center border border-gray-700 font-bold mt-2 p-3 bg-white">
        <Typography>
          <b>version 2.0.15</b>
        </Typography>
        <Typography>
          <b>(required Win 8, Win 8.1 or Win 10)</b>
        </Typography>
      </div>
    </>
  );
};

export default CustomCaresolTestEngine;
