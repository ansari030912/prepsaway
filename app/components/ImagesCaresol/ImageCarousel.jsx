"use client";
/* eslint-disable @next/next/no-img-element */
import React, { useState } from "react";
import { Box, Dialog, DialogContent, IconButton } from "@mui/material";

const ImageCarousel = ({ examData, initialIndex = 0 }) => {
  const [activeIndex, setActiveIndex] = useState(initialIndex);
  const [selectedImageIndex, setSelectedImageIndex] = useState(null);

  const formatImageUrl = (te_img_src) => {
    const firstLetter = te_img_src?.charAt(0).toLowerCase();
    return `https://img.prepsaway.com/${firstLetter}/${te_img_src}`;
  };

  const handlePrevClick = () => {
    setActiveIndex((prevIndex) => (prevIndex > 0 ? prevIndex - 1 : 0));
  };

  const handleNextClick = () => {
    setActiveIndex((prevIndex) =>
      prevIndex < examData?.te_images?.length - imagesPerView()
        ? prevIndex + 1
        : prevIndex
    );
  };

  const handleClose = () => {
    setSelectedImageIndex(null);
  };

  const handleImageClick = (index) => {
    setSelectedImageIndex(index);
  };

  const imagesPerView = () => {
    if (typeof window !== "undefined") {
      if (window.innerWidth >= 1024) {
        return 5; // lg and above
      } else if (window.innerWidth >= 768) {
        return 2; // md
      } else {
        return 1; // sm
      }
    }
    return 5; // default to 5 images if window is undefined
  };

  return (
    <div className="container mx-auto">
      <div className="relative overflow-hidden">
        <div
          className="flex px-3 transition-transform duration-500 ease-in-out"
          style={{
            transform: `translateX(-${activeIndex * (100 / imagesPerView())}%)`,
          }}
        >
          {examData?.te_images?.map((image, index) => (
            <div
              key={image.te_img_id}
              className="flex-shrink-0 p-2 w-full sm:w-full md:w-1/2 lg:w-1/5 cursor-pointer"
              onClick={() => handleImageClick(index)}
            >
              <img
                src={formatImageUrl(image.te_img_src)}
                alt={`img-${image.te_img_id}`}
                className="w-full"
              />
            </div>
          ))}
        </div>
        <div className="absolute inset-0 flex justify-between items-center px-4 pointer-events-none">
          <IconButton
            onClick={handlePrevClick}
            className="pointer-events-auto bg-white bg-opacity-50 rounded-full"
          >
            <svg width="24" height="24" viewBox="0 0 24 24">
              <path
                d="M15 19l-7-7 7-7"
                stroke="currentColor"
                strokeWidth="2"
                fill="none"
              />
            </svg>
          </IconButton>
          <IconButton
            onClick={handleNextClick}
            className="pointer-events-auto bg-white bg-opacity-50 rounded-full"
          >
            <svg width="24" height="24" viewBox="0 0 24 24">
              <path
                d="M9 5l7 7-7 7"
                stroke="currentColor"
                strokeWidth="2"
                fill="none"
              />
            </svg>
          </IconButton>
        </div>
      </div>

      <Dialog
        open={selectedImageIndex !== null}
        onClose={handleClose}
        maxWidth="xl"
        fullWidth
      >
        <DialogContent className="w-full">
          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
            className="w-full p-4"
            sx={{ overflow: "hidden" }}
          >
            <IconButton
              onClick={() =>
                setSelectedImageIndex(
                  selectedImageIndex > 0
                    ? selectedImageIndex - 1
                    : examData?.te_images?.length - 1
                )
              }
              className="bg-white bg-opacity-50 rounded-full"
            >
              <svg width="24" height="24" viewBox="0 0 24 24">
                <path
                  d="M15 19l-7-7 7-7"
                  stroke="currentColor"
                  strokeWidth="2"
                  fill="none"
                />
              </svg>
            </IconButton>

            {selectedImageIndex !== null && (
              <img
                src={formatImageUrl(
                  examData?.te_images[selectedImageIndex]?.te_img_src
                )}
                alt={`img-${examData?.te_images[selectedImageIndex]?.te_img_id}`}
                style={{
                  maxWidth: "80%",
                  maxHeight: "80vh",
                  objectFit: "contain",
                }}
              />
            )}

            <IconButton
              onClick={() =>
                setSelectedImageIndex(
                  selectedImageIndex < examData?.te_images?.length - 1
                    ? selectedImageIndex + 1
                    : 0
                )
              }
              className="bg-white bg-opacity-50 rounded-full"
            >
              <svg width="24" height="24" viewBox="0 0 24 24">
                <path
                  d="M9 5l7 7-7 7"
                  stroke="currentColor"
                  strokeWidth="2"
                  fill="none"
                />
              </svg>
            </IconButton>
          </Box>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ImageCarousel;
