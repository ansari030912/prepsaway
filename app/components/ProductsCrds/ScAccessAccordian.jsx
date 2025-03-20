"use client";
import { Icon } from "@iconify/react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
} from "@mui/material";
import Accordion from "@mui/material/Accordion";
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary";
import { useState } from "react";

const ScAccessAccordian = ({ data }) => {
  const [expandedIndex, setExpandedIndex] = useState(null);
  const [selectedLecture, setSelectedLecture] = useState(null);

  const [currentVideoIndex, setCurrentVideoIndex] = useState(0);

  const handleChange = (index) => {
    setExpandedIndex(index === expandedIndex ? null : index);
  };

  const handleLectureClick = (lecture) => {
    setSelectedLecture(lecture);
  };

  const handleVideoNext = () => {
    setCurrentVideoIndex((prevIndex) =>
      prevIndex === selectedLecture?.lecture_videos.length - 1
        ? 0
        : prevIndex + 1
    );
  };

  const handleVideoPrev = () => {
    setCurrentVideoIndex((prevIndex) =>
      prevIndex === 0
        ? selectedLecture?.lecture_videos.length - 1
        : prevIndex - 1
    );
  };

  const handleCloseDialog = () => {
    setSelectedLecture(null);
    setCurrentVideoIndex(0);
  };

  return (
    <div className="bg-gray-50 flex flex-col items-center justify-center relative overflow-hidden sm:p-4">
      {data?.sections.map((item, index) => {
        const { section_title, lectures } = item;
        return (
          <Accordion
            className="text-gray-600 "
            key={index}
            expanded={index === expandedIndex}
            onChange={() => handleChange(index)}
            sx={{ width: "100%", mb: "4px" }}
          >
            <AccordionSummary
              expandIcon={
                <Icon
                  icon="material-symbols:expand-more"
                  width="1.2em"
                  height="1.2em"
                  style={{ color: "#3D445A" }}
                />
              }
              aria-controls={`panel${index + 1}-content`}
              id={`panel${index + 1}-header`}
            >
              <div className="flex items-center gap-2">
                <Icon
                  icon="streamline:live-video-solid"
                  width="1.2em"
                  height="1.2em"
                  style={{ color: "#3D445A" }}
                />
                <h4 className="font-medium text-sm text-gray-700">
                  {section_title}
                </h4>
              </div>
            </AccordionSummary>
            <Divider color="#3D445A" />
            <AccordionDetails>
              <div className="w-full bg-white p-1 mt-2">
                <table className="min-w-full">
                  <thead>
                    <tr>
                      <th className="px-6 py-3 hidden lg:table-cell border-b-2 border-gray-300 text-left leading-4 text-gray-500 tracking-wider">
                        No
                      </th>
                      <th className="px-6 py-3 border-b-2 border-gray-300 text-left text-sm leading-4 text-gray-500 tracking-wider">
                        Lectures
                      </th>
                      <th className="px-6 py-3 border-b-2 border-gray-300  text-sm leading-4 text-gray-500 text-right tracking-wider">
                        Duration
                      </th>
                    </tr>
                  </thead>
                  {lectures.map((lecture, index) => {
                    const {
                      lecture_seq,
                      lecture_title,
                      lecture_duration,
                      lecture_videos,
                    } = lecture;
                    return (
                      <tbody key={index} className="bg-white">
                        <tr onClick={() => handleLectureClick(lecture)}>
                          <td className="px-6 py-2 hidden lg:table-cell whitespace-no-wrap border-b border-gray-500">
                            <div className="flex items-center">
                              <div>
                                <div className="text-md leading-5 text-gray-800">
                                  {lecture_seq}.
                                </div>
                              </div>
                            </div>
                          </td>
                          <td className="px-6 py-2  whitespace-no-wrap border-b border-gray-500 text-blue-900 text-md leading-5 cursor-pointer">
                            <span className="lg:hidden ">{lecture_seq}. </span>{lecture_title}
                          </td>
                          <td className="px-6 py-2 whitespace-no-wrap border-b text-blue-900 border-gray-500 text-md text-right leading-5">
                            <span className="relative inline-block px-3 py-1 font-semibold text-green-900 leading-tight">
                              <span
                                aria-hidden
                                className="absolute inset-0 bg-green-200 opacity-50 rounded-full"
                              ></span>
                              <span className="relative text-xs">
                                {lecture_duration}
                              </span>
                            </span>
                          </td>
                        </tr>
                      </tbody>
                    );
                  })}
                </table>
              </div>
            </AccordionDetails>
          </Accordion>
        );
      })}
      <Dialog
        sx={{ borderRadius: "100px" }}
        open={!!selectedLecture}
        onClose={handleCloseDialog}
      >
        <DialogTitle sx={{ borderRadius: "0px" }} className="text-gray-600 ">
          {selectedLecture?.lecture_title} - Video ({currentVideoIndex + 1} /{" "}
          {selectedLecture?.lecture_videos.length})
        </DialogTitle>
        <Divider />
        <DialogContent className="text-gray-600 ">
          <div
            id="default-carousel"
            className="relative w-full"
            data-carousel="slide"
          >
            <div className="relative overflow-hidden rounded-lg ">
              {selectedLecture?.lecture_videos.map((video, index) => (
                <div
                  key={index}
                  className={`${
                    index === currentVideoIndex ? "" : "hidden"
                  } duration-700 ease-in-out`}
                  data-carousel-item
                >
                  <video controls width="100%" height="auto">
                    <source src={video.source} type={`video/${video.type}`} />
                    Your browser does not support the video tag.
                  </video>
                </div>
              ))}
            </div>
          </div>
        </DialogContent>
        <Divider />
        <DialogActions className="text-gray-600 ">
          <div className="flex w-full">
            <button
              type="button"
              className="top-0 z-30 flex bg-blue-500 text-white rounded-xl py-2 items-center justify-center h-full px-4 cursor-pointer group focus:outline-none"
              data-carousel-prev
              onClick={handleVideoPrev}
            >
              Server 1
            </button>
            <button
              type="button"
              className="top-0 z-30 flex bg-blue-500 text-white rounded-xl py-2 ml-4 items-center justify-center h-full px-4 cursor-pointer group focus:outline-none"
              data-carousel-next
              onClick={handleVideoNext}
            >
              Server 2
            </button>
          </div>
          <Button
            variant="contained"
            className="bg-red-600 text-white hover:bg-red-600"
            onClick={handleCloseDialog}
          >
            <span>Close</span>
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default ScAccessAccordian;
