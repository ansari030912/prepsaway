/* eslint-disable @next/next/no-img-element */
import { Card, Grid, Typography } from "@mui/material";
import Link from "next/link";
import BackCountDown from "./BackCountDown";

const CertificationMulitpleExams = ({ data }) => {
  return (
    <div className="w-full lg:w-12/12 p-4 px-6">
      <Grid container spacing={2}>
        <Grid item xs={12} lg={7}>
          <div>
            <p className="text-xl text-blue-600">{data?.exam_vendor_title}</p>
            <Grid container spacing={2} sx={{ mb: "10px" }}>
              <Grid item xs={12} sm={6}>
                <h6 className="text-2xl text-gray-600 font-semibold text-center sm:text-left">
                  Material
                </h6>
                <ol className="sm:list-disc pl-4 text-sm mb-2 text-gray-500 text-center sm:text-left">
                  <li> Verified By IT Certified Experts</li>
                  <li>100% Accurate Answers</li>
                  <li>100% Money Back Guarantee</li>
                  <li>Instant Downloads</li>
                  <li>Free Fast Exam Updates</li>
                </ol>
                {/* <hr style={{ border: "1px solid #F5F6FA" }} /> */}
              </Grid>
              <Grid item xs={12} sm={6}>
                <h6 className="text-2xl text-gray-600 font-semibold text-center sm:text-left">
                  PDF
                </h6>
                <ol className="sm:list-disc pl-4 text-sm mb-2 text-gray-500 text-center sm:text-left">
                  <li>Best Value Available in Market</li>
                  <li>Try Demo Before You Buy</li>
                  <li>Secure Shopping Experience</li>
                  <li>Exam Questions And Answers</li>
                  <li>99.5% High Success Pass Rate</li>
                </ol>
                {/* <hr style={{ border: "1px solid #F5F6FA" }} /> */}
              </Grid>
            </Grid>
          </div>
        </Grid>
        <Grid item xs={12} lg={5}>
          <Grid container>
            <Grid item xs={12} sm={6}>
              <h6 className="text-2xl text-gray-600 font-semibold text-center sm:text-left">
                Exam Questions
              </h6>
              <ol className="sm:list-disc pl-4 text-sm mb-2 text-gray-500 text-center sm:text-left">
                <li>Up-To-Date Exam Study Material</li>
              </ol>
              {/* <hr style={{ border: "1px solid #F5F6FA" }} /> */}
            </Grid>
            <Grid item xs={12} sm={6}>
              <h6 className="text-2xl text-gray-600 font-semibold text-center sm:text-left">
                Safe Files
              </h6>
              <ol className="sm:list-disc pl-4 text-sm mb-2 text-gray-500 text-center sm:text-left">
                <li>Guaranteed To Have Actual PDF</li>
              </ol>
              {/* <hr style={{ border: "1px solid #F5F6FA" }} /> */}
            </Grid>
          </Grid>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              height: "100%",
            }}
          >
            {data?.is_disabled ? (
              ""
            ) : (
              <Card
                sx={{
                  bgcolor: "#c7dfe8",
                  p: "10px",
                  textAlign: "center",
                  mt: "-20px",
                  boxShadow: "inset 0px 0px 8px rgba(0, 0, 0, 0.5)",
                  mb: "20px",
                  width: "100%",
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
            )}
          </div>
        </Grid>
      </Grid>

      <Grid
        container
        xs={12}
        style={{ height: "100%", marginTop: "20px" }}
        alignItems="center"
        justifyContent="center"
        spacing={3}
      >
        <Grid item xs={12}>
          <hr style={{ border: "1px solid #F5F6FA" }} />
        </Grid>
        {data?.map((item, i) => (
          <Grid
            item
            key={i}
            lg={4}
            md={6}
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              height: "100%",
            }}
          >
            <Link
              href={`/exam-questions/${item?.exam_vendor_perma}/${item.exam_perma}`}
              className="group hover:text-blue-500 cursor-pointer"
            >
              <div className="flex justify-center">
                <div
                  className="relative overflow-hidden rounded-xl mb-6"
                  style={{
                    height: "270px",
                    width: "300px",
                  }}
                >
                  <span>
                    <img
                      className="rounded-xl w-full h-full transform group-hover:scale-105 transition duration-200"
                      src="/package-small-min_optimized.png"
                      alt=""
                    />
                  </span>
                  <div className="absolute top-4 left-4 right-4">
                    <div className="flex justify-between flex-wrap gap-4">
                      <div className="flex flex-wrap gap-2">
                        {item.exam_retired ? (
                          <span className="inline-block bg-red-500 text-white rounded-full text-base px-3 py-2 font-semibold">
                            Retired Exam
                          </span>
                        ) : (
                          <span className="inline-block bg-yellow-400 text-white rounded-full text-base px-3 py-2 font-semibold">
                            New arrival
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <p className="text-xl text-blue-500 font-semibold text-center">
                {item?.exam_vendor_title}
              </p>
              <h2 className="font-heading text-gray-500 font-semibold  uppercase text-base mb-3 text-center">
                {item?.exam_title}
              </h2>
            </Link>
          </Grid>
        ))}
      </Grid>
    </div>
  );
};

export default CertificationMulitpleExams;
