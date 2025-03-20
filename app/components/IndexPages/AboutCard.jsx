/* eslint-disable @next/next/no-img-element */

import { Grid, Typography } from "@mui/material";
import Link from "next/link";
import CustomCaresolTestEngine from "../CustomCaresol/CustomCaresolTestEngine";

const AboutCard = () => {
  return (
    <section
      className=" py-12 bg-cover bg-fixed"
      style={{ backgroundImage: `url("/bg-img-1.jpg")` }}
    >
      <Typography
        variant="h2"
        fontSize={35}
        fontWeight={700}
        className="text-gray-800"
        sx={{ textAlign: "center" }}
      >
        HOW TO OPEN TEST ENGINE .prepsaway FILES
      </Typography>
      <Typography
        variant="body2"
        fontSize={24}
        className="text-gray-600"
        fontWeight={600}
        sx={{ textAlign: "center", marginTop: "12px" }}
      >
        Prepare, study, and ace your certification exam effortlessly with
        everything you need.
        <br /> Enjoy 90 days of free updates and ensure 100% success on your
        first attempt.
      </Typography>
      <div className="relative py-12 overflow-hidden">
        <div className="relative container mx-auto px-4">
          <Grid container spacing={3} className="flex justify-between -mx-4">
            <Grid item xs={12} lg={4.5} className=" px-4 mb-2 lg:mb-0">
              <div className="px-4 md:px-8 py-9 bg-white">
                <ul className="mb-5">
                  <li className="py-5 px-6 border-b">
                    <span className="flex items-center text-lg font-bold font-heading hover:text-green-400">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="mr-5"
                        width="34"
                        height="34"
                        viewBox="0 0 48 48"
                      >
                        <g
                          fill="none"
                          stroke="currentColor"
                          stroke-linejoin="round"
                          stroke-width="4"
                        >
                          <path d="M6 9.256L24.009 4L42 9.256v10.778A26.316 26.316 0 0 1 24.003 45A26.32 26.32 0 0 1 6 20.029z" />
                          <path stroke-linecap="round" d="m15 23l7 7l12-12" />
                        </g>
                      </svg>
                      <span className="text-base">
                        Authentic exam simulation
                      </span>
                    </span>
                  </li>
                  <li className="py-5 px-6 border-b">
                    <span className="flex items-center text-lg font-bold font-heading hover:text-green-400">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="mr-5"
                        width="34"
                        height="34"
                        viewBox="0 0 32 32"
                      >
                        <path
                          fill="currentColor"
                          d="M2 6h2v20H2zm4-2h2v24H6zm8 18h12v2H14zm0-6h12v2H14z"
                        />
                        <path
                          fill="currentColor"
                          d="m29.7 9.3l-7-7c-.2-.2-.4-.3-.7-.3H12c-1.1 0-2 .9-2 2v24c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V10c0-.3-.1-.5-.3-.7M22 4.4l5.6 5.6H22zM28 28H12V4h8v6c0 1.1.9 2 2 2h6z"
                        />
                      </svg>
                      <span className="text-base">
                        Multiple question provided
                      </span>
                    </span>
                  </li>
                  <li className="py-5 px-6 border-b">
                    <span className="flex items-center text-lg font-bold font-heading hover:text-green-400">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="mr-5"
                        width="34"
                        height="34"
                        viewBox="0 0 16 16"
                      >
                        <path
                          fill="currentColor"
                          d="M9.268 4.66c.3.299.788.299 1.089 0c.3-.298.3-.782 0-1.081a.774.774 0 0 0-1.09 0a.76.76 0 0 0 0 1.081M1.536 6.33a1.99 1.99 0 0 0 0 2.83l3.31 3.289a2.02 2.02 0 0 0 2.154.45v-1.177l-.019.02c-.393.39-1.03.39-1.423 0l-3.31-3.29a.996.996 0 0 1 0-1.415l4.76-4.73a1 1 0 0 1 .707-.293L10.979 2a1.003 1.003 0 0 1 1.01 1.008l-.014 2.03c.36.057.699.178 1.004.351l.017-2.374A2.007 2.007 0 0 0 10.975 1l-3.264.014a2.02 2.02 0 0 0-1.416.586zM9.5 8v1H9a1 1 0 0 0-1 1v4a1 1 0 0 0 1 1h5a1 1 0 0 0 1-1v-4a1 1 0 0 0-1-1h-.5V8a2 2 0 1 0-4 0m1 1V8a1 1 0 1 1 2 0v1zm1 2.25a.75.75 0 1 1 0 1.5a.75.75 0 0 1 0-1.5"
                        />
                      </svg>
                      <span className="text-base">
                        Personalized exam mode options
                      </span>
                    </span>
                  </li>
                  <li className="py-5 px-6 border-b">
                    <span className="flex items-center text-lg font-bold font-heading hover:text-green-400">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="mr-5"
                        width="34"
                        height="34"
                        viewBox="0 0 24 24"
                      >
                        <path
                          fill="currentColor"
                          d="M16.088 6.412a2.84 2.84 0 0 0-1.347-.955l-1.378-.448a.544.544 0 0 1 0-1.025l1.378-.448A2.84 2.84 0 0 0 16.5 1.774l.011-.034l.448-1.377a.544.544 0 0 1 1.027 0l.447 1.377a2.84 2.84 0 0 0 1.799 1.796l1.377.448l.028.007a.544.544 0 0 1 0 1.025l-1.378.448a2.84 2.84 0 0 0-1.798 1.796l-.448 1.377l-.013.034a.544.544 0 0 1-1.013-.034l-.448-1.377a2.8 2.8 0 0 0-.45-.848m7.695 3.801l-.766-.248a1.58 1.58 0 0 1-.998-.999l-.25-.764a.302.302 0 0 0-.57 0l-.248.764a1.58 1.58 0 0 1-.984.999l-.765.248a.302.302 0 0 0 0 .57l.765.249a1.58 1.58 0 0 1 1 1.002l.248.764a.302.302 0 0 0 .57 0l.249-.764a1.58 1.58 0 0 1 .999-.999l.765-.248a.302.302 0 0 0 0-.57zM9.909 3.7a3.87 3.87 0 0 1 2.818-.544a1.7 1.7 0 0 0-.447.413a1.6 1.6 0 0 0-.275 1.018a2.4 2.4 0 0 0-1.287.375L3.63 9.506l7.071 4.62c.79.515 1.809.515 2.598 0l4.75-3.103q.058.146.151.276c.155.221.376.389.63.48l.54.171l-.37.243v5.557a.75.75 0 0 1-.15.45l-.001.001l-.001.002l-.003.004l-.009.01l-.015.02l-.01.013l-.086.101a5 5 0 0 1-.317.33c-.277.267-.69.614-1.25.958C16.037 20.329 14.339 21 12 21s-4.036-.67-5.159-1.361a7.4 7.4 0 0 1-1.25-.957a5 5 0 0 1-.316-.33a3 3 0 0 1-.124-.15L5.15 18.2a.75.75 0 0 1-.15-.45v-5.557l-2-1.307v5.364a.75.75 0 0 1-1.5 0V9.5a.75.75 0 0 1 .358-.64zm4.21 11.681a3.88 3.88 0 0 1-4.238 0L6.5 13.172v4.297q.055.058.13.13c.211.203.54.481.997.762c.909.56 2.337 1.139 4.373 1.139s3.464-.58 4.373-1.139a6 6 0 0 0 1.127-.892v-4.297z"
                        />
                      </svg>
                      <span className="text-base">
                        Complete exams in a single file
                      </span>
                    </span>
                  </li>
                  <li className="py-5 px-6 border-b">
                    <span className="flex items-center text-lg font-bold font-heading hover:text-green-400">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="mr-5"
                        width="34"
                        height="34"
                        viewBox="0 0 24 24"
                      >
                        <path
                          fill="currentColor"
                          d="M3 12a3.5 3.5 0 0 1 3.5-3.5c1.204 0 2.02.434 2.7 1.113c.726.727 1.285 1.72 1.926 2.873l.034.06c.6 1.082 1.283 2.311 2.227 3.255c1.008 1.008 2.316 1.699 4.113 1.699a5.5 5.5 0 1 0-4.158-9.1a23.58 23.58 0 0 1 1.122 1.857A3.5 3.5 0 1 1 17.5 15.5c-1.203 0-2.02-.434-2.7-1.113c-.726-.727-1.285-1.72-1.926-2.873l-.034-.06c-.6-1.082-1.283-2.311-2.227-3.255C9.605 7.191 8.297 6.5 6.5 6.5a5.5 5.5 0 1 0 4.158 9.1a23.577 23.577 0 0 1-1.122-1.857A3.5 3.5 0 0 1 3 12"
                        />
                      </svg>
                      <span className="text-base">
                        Unlimited access to exam files
                      </span>
                    </span>
                  </li>
                </ul>
                <div className="mt-8 -pb-6">
                  <Link
                    href={
                      "https://releases.prepsaway.com/PrepsAwayTestEngine.zip"
                    }
                    type="button"
                    className="text-gray-700 flex justify-center border-2 hover:bg-gray-700 hover:text-white border-gray-700 font-medium  text-sm px-5 py-2.5 text-center me-2 mb-2"
                  >
                    <b style={{ textAlign: "center" }}>
                      Download for windows (.zip)
                    </b>
                  </Link>
                  <Link
                    type="button"
                    href={
                      "https://releases.prepsaway.com/PrepsAwayTestEngine.exe"
                    }
                    className="text-gray-700 flex justify-center border-2 hover:bg-gray-700 hover:text-white border-gray-700 font-medium  text-sm px-5 py-2.5 text-center me-2 mb-2"
                  >
                    <b>Download for windows (.exe)</b>
                  </Link>
                </div>{" "}
              </div>
            </Grid>
            <Grid item xs={12} lg={7.5} className=" px-2">
              <div className="flex flex-wrap h-full">
                <div className="w-full">
                  <CustomCaresolTestEngine />
                </div>
              </div>
            </Grid>
          </Grid>
        </div>
      </div>
    </section>
  );
};

export default AboutCard;
