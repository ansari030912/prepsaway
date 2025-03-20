/* eslint-disable react-hooks/exhaustive-deps */
"use client";
import { Grid } from "@mui/material";
import { useEffect, useRef, useState } from "react";
import CountUp from "react-countup";

const ExamStats = ({ examData }) => {
  const [startCount, setStartCount] = useState(false);
  const [randomNumber, setRandomNumber] = useState(0);
  const [randomBuyedNumber, setRandomBuyedNumber] = useState(0);
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setStartCount(true);
            observer.disconnect();
          }
        });
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (observer && sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  useEffect(() => {
    function getRandomNumber() {
      const min = 100000;
      const max = 1200000;
      return Math.floor(Math.random() * (max - min + 1)) + min;
    }
    function getRandomBuyedNumber() {
      const min = 5000;
      const max = 35000;
      return Math.floor(Math.random() * (max - min + 1)) + min;
    }
    setRandomBuyedNumber(getRandomBuyedNumber());
    setRandomNumber(getRandomNumber());
  }, []);

  return (
    <>
      <section ref={sectionRef} className="pt-10 pb-6 bg-green-50">
        <div className="container px-4 mx-auto">
          <div className="flex flex-wrap lg:flex-nowrap bg-white shadow rounded">
            <div className="w-full md:w-1/2 lg:w-1/4 px-4 py-6 text-center border-2 border-spacing-1">
              <p className="text-md lg:text-base font-semibold text-gray-600">
                <span>Real Exam Comes</span>
                <span className="text-xs py-1 px-2 ml-1 font-semibold text-green-600 bg-green-100 rounded-full">
                  Weekly
                </span>
              </p>
              <p className="my-1 text-3xl lg:text-4xl font-bold font-heading">
                {startCount && (
                  <CountUp
                    start={0}
                    end={examData.exam_last_week_word_to_word}
                    duration={2}
                    suffix="%"
                  />
                )}
              </p>
              <span className="text-sm lg:text-base font-semibold text-gray-500">
                Word to Word
              </span>
            </div>
            <div className="w-full md:w-1/2 lg:w-1/4 px-4 py-6 text-center border-2">
              <p className="text-md lg:text-base font-semibold text-gray-600">
                <span>Customers Passed Exam</span>
                <span className="text-xs py-1 px-2 ml-1 font-semibold text-blue-600 bg-blue-100 rounded-full">
                  Monthly
                </span>
              </p>
              <p className="my-1 text-3xl lg:text-4xl font-bold font-heading">
                {startCount && (
                  <CountUp
                    start={0}
                    end={examData.exam_last_week_average_score}
                    duration={2}
                    suffix="%"
                  />
                )}
              </p>
              <span className="text-sm lg:text-base font-semibold text-gray-500">
                Average Score
              </span>
            </div>
            <div className="w-full md:w-1/2 lg:w-1/4 px-4 py-6 text-center  border-2">
              <p className="text-md lg:text-base font-semibold text-gray-600">
                <span>Exam Poupularity</span>
                <span className="text-xs py-1 px-2 ml-1 font-semibold text-purple-600 bg-purple-100 rounded-full">
                  Last 6 Month
                </span>
              </p>
              <p className="my-1 text-3xl lg:text-4xl font-bold font-heading">
                {startCount && (
                  <CountUp start={0} end={randomNumber} duration={2} />
                )}
              </p>
              <span className="text-sm lg:text-base font-semibold text-gray-500">
                Users Search for this Exam
              </span>
            </div>
            <div className="w-full md:w-1/2 lg:w-1/4 px-4 py-6 border-2 text-center">
              <p className="text-md lg:text-base font-semibold  text-gray-600">
                <span>Product Sales</span>
                <span className="text-xs py-1 px-2 ml-1 font-semibold text-yellow-600 bg-yellow-100 rounded-full">
                  Yearly
                </span>
              </p>
              <p className="my-1 text-3xl lg:text-4xl font-bold font-heading">
                {startCount && (
                  <CountUp
                    start={0}
                    end={randomBuyedNumber}
                    duration={2}
                    suffix=""
                  />
                )}
              </p>
              <span className="text-sm lg:text-base font-semibold text-gray-500">
                Total Users Buy Exams
              </span>
            </div>
          </div>
        </div>
      </section>
      <section className="pb-10 bg-green-50">
        <h3 className="text-center font-black text-2xl text-gray-700 mb-6">
          What is in Premium Bundle?
        </h3>
        <div className="container px-2 mx-auto">
          <Grid container spacing={3} className="rounded">
            {Array.isArray(examData?.question_types) &&
              examData?.question_types?.map((item, i) => (
                <Grid item xs={12} md={6} lg={3} key={i}>
                  <div className="px-4 py-4 lg:h-20 flex flex-col justify-center bg-white shadow border-2 border-spacing-1">
                    <p className="text-md flex justify-between lg:text-base font-semibold text-gray-600">
                      <span className="inline-flex font-bold flex-col justify-center">
                        <span>{item?.question_type}</span>
                      </span>
                      <span className="flex-col pl-2 inline-flex justify-center">
                        <span className="text-base py-1 px-2 ml-1 font-semibold text-green-600 bg-green-100 rounded-full">
                          {item?.question_type_count}
                        </span>
                      </span>
                    </p>
                  </div>
                </Grid>
              ))}
            {Array.isArray(examData?.exam_topics) &&
              examData?.exam_topics?.map((item, i) => (
                <Grid item xs={12} md={6} lg={3} key={i}>
                  <div className="px-4 py-4 lg:h-20 flex flex-col justify-center bg-white shadow border-2 border-spacing-1">
                    <p className="text-md flex justify-between lg:text-base font-semibold text-gray-600">
                      <span className="inline-flex font-bold flex-col justify-center">
                        <span>{item?.topic}</span>
                      </span>
                      <span className="flex-col pl-2 inline-flex justify-center">
                        <span className="text-base py-1 px-2 ml-1 font-semibold text-green-600 bg-green-100 rounded-full">
                          {item?.topic_questions}
                        </span>
                      </span>
                    </p>
                  </div>
                </Grid>
              ))}
          </Grid>
        </div>
      </section>
    </>
  );
};

export default ExamStats;
