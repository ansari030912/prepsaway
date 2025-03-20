"use client";
/* eslint-disable @next/next/no-img-element */
import CountUp from "react-countup";
import { useInView } from "react-intersection-observer";

const SiteOverView = () => {
  const { ref, inView } = useInView({
    triggerOnce: true, // Trigger the animation only once
    threshold: 0.1, // Adjust this value as needed
  });

  return (
    <section
      ref={ref}
      className="py-8 mt-10 xl:pt-2  bg-cover"
      style={{
        backgroundImage: `url('/pattern-white.png')`,
      }}
    >
      <div className="container px-4 mx-auto ">
        <div className="text-center">
          <h3 className="mb-4 text-4xl md:text-4xl font-bold tracking-tighter">
            We believe in the power of Success
          </h3>
          <p className="mb-4 xl:mb-8 mx-auto text-lg md:text-xl font-medium max-w-4xl">
            Preps Away Provides you facility to pass your Exams easily with our
            available courses.
          </p>
          <div className="flex flex-wrap justify-center mb-10 -mx-4">
            <div className="w-full md:w-1/3 lg:w-1/4 px-4 mb-8 lg:mb-0">
              <h2
                className="mb-2 text-4xl md:text-4xl text-green-600 font-bold tracking-tighter"
                style={{ textShadow: "6px 6px 8px rgba(0, 0, 0, 0.1)" }}
              >
                {inView && <CountUp end={25000} duration={2} suffix="+" />}
              </h2>
              <p className="text-base md:text-lg font-semibold">
                Exams Available
              </p>
            </div>
            <div className="w-full md:w-1/3 lg:w-1/4 px-4 mb-8 lg:mb-0">
              <h2
                className="mb-2 text-4xl md:text-4xl text-green-600 font-bold tracking-tighter"
                style={{ textShadow: "6px 6px 8px rgba(0, 0, 0, 0.1)" }}
              >
                {inView && <CountUp end={1500} duration={2} suffix=" Hours+" />}
              </h2>
              <p className="text-base md:text-lg font-semibold">
                Video Courses
              </p>
            </div>
            <div className="w-full md:w-1/3 lg:w-1/4 px-4 mb-8 lg:mb-0">
              <h2
                className="mb-2 text-4xl md:text-4xl text-green-600 font-bold tracking-tighter"
                style={{ textShadow: "6px 6px 8px rgba(0, 0, 0, 0.1)" }}
              >
                {inView && (
                  <CountUp end={96} duration={2} suffix="% Students" />
                )}
              </h2>
              <p className="text-base md:text-lg font-semibold">
                Pass Exam Worldwide
              </p>
            </div>
            <div className="w-full md:w-1/3 lg:w-1/4 px-4">
              <h2
                className="mb-2 text-4xl md:text-4xl text-green-600 font-bold tracking-tighter"
                style={{ textShadow: "6px 6px 8px rgba(0, 0, 0, 0.1)" }}
              >
                {inView && <CountUp end={12000} suffix="+" duration={2} />}
              </h2>
              <p className="text-base md:text-lg font-semibold">
                Current Users
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SiteOverView;
