/* eslint-disable react/no-unescaped-entities */
/* eslint-disable @next/next/no-img-element */
import { X_API_Key } from "@/app/URL's/Api_X_Key";
import { Base_URL } from "@/app/URL's/Base_URL";
import CertificationMulitpleExams from "@/app/components/Cards/CertificationMulitpleExams";
import ExamDetailCard from "@/app/components/Cards/ExamDetailCard";
import HotExams from "@/app/components/IndexPages/HotExams";
import LogoBanner from "@/app/components/IndexPages/LogoBanner";
import BannerCard from "@/app/components/banner/BannerCard";
import Link from "next/link";

export async function generateMetadata({ params }) {
  const response = await fetch(
    `${Base_URL}/v1/certification/${params.cert_perma}?coupon=MEGASALE-30`,
    {
      headers: {
        "x-api-key": X_API_Key,
      },
    }
  );

  const data = await response.json();
  let shouldIndex = true;
  if (data?.cert_title === null) {
    shouldIndex = false;
  }

  return {
    title: `Updated ${data?.cert_title} Exam Questions and Answers by Tech Professionals`,
    description: `PrepsAway is a premium provider of Real and Valid Exam Questions and Answers of ${data?.cert_title} IT certification Exams. Pass your certification exam easily with pdf and test engine dumps in 2025 and become certified professional.`,
    robots: {
      index: shouldIndex,
    },
    icons: {
      other: [
        {
          rel: "canonical",
          url: `https://prepsaway.com/vendor-exam-questions/${params.vendor_perma}/${params.cert_perma}`,
        },
      ],
    },
  };
}

const CertificationExamPage = async ({ params }) => {
  const response = await fetch(
    `${Base_URL}/v1/certification/${params.cert_perma}?coupon=MEGASALE-30`,
    {
      headers: {
        "x-api-key": X_API_Key,
      },
      cache: "no-store",
    }
  );
  const data = await response.json();

  const randomReviewCount = Math.floor(Math.random() * (999 - 700 + 1)) + 700;
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: data?.cert_single_exam?.exam_faqs?.map((faq) => ({
              "@type": "Question",
              name: faq.faq_q,
              acceptedAnswer: {
                "@type": "Answer",
                text: faq.faq_a,
              },
            })),
          }),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org/",
            "@type": "Product",
            name: data?.cert_title,
            description: `PrepsAway is a premium provider of Real and Valid Exam Question and Answers of ${data?.cert_title} IT certification Exams. Pass your certification exam easily with pdf and test engine dumps in 2025.`,
            review: {
              "@type": "Review",
              reviewRating: {
                "@type": "Rating",
                ratingValue: 4,
                bestRating: 5,
              },
              author: {
                "@type": "Person",
                name: "Fred Benson",
              },
            },
            aggregateRating: {
              "@type": "AggregateRating",
              ratingValue: 4.4,
              reviewCount: randomReviewCount,
            },
          }),
        }}
      />
      {data?._has_multiple_exams && (
        <>
          <BannerCard />
          <ExamDetailCard />
          <section className="my-10 px-6 bg-white">
            <div className="container mx-auto">
              <div className="flex flex-wrap -m-4 mb-12">
                <div className="w-full lg:w-4/12 p-12">
                  <div className="flex items-end gap-2">
                    <span
                      style={{ display: "flex", justifyContent: "center" }}
                      className="group flex-1"
                    >
                      <div
                        className="relative xl:hidden overflow-hidden rounded-xl flex flex-col justify-center transition duration-200"
                        style={{
                          height: "300px",
                          width: "300px",
                        }}
                      >
                        <img
                          style={{ width: "300px", height: "300px" }}
                          className="absolute inset-0 rounded-xl transform group-hover:scale-105 transition duration-200"
                          src="/package-small-min_optimized.png"
                          alt=""
                        />
                      </div>
                      <div
                        className="relative hidden xl:inline-flex overflow-hidden rounded-xl flex-col justify-center transition duration-200"
                        style={{
                          height: "300px",
                          width: "420px",
                        }}
                      >
                        <img
                          style={{ width: "420px", height: "300px" }}
                          className="absolute inset-0 rounded-xl transform group-hover:scale-105 transition duration-200"
                          src="/package-small-min_optimized.png"
                          alt=""
                        />
                      </div>
                    </span>
                  </div>
                </div>
                <div className="w-full lg:w-8/12 p-4">
                  <div className="p-2 md:p-10">
                    <h2 className="font-heading font-bold text-gray-600 uppercase text-3xl mb-2 max-w-2xl">
                      {data?.cert_title} Certification Provided by IT
                      Professionals
                    </h2>
                    <hr
                      className="mb-4"
                      style={{ border: "2px solid #F5F6FA" }}
                    />

                    <p className="text-gray-500 text-base font-semibold  max-w-xl">
                      Reliable Study Materials & Testing Engine for{" "}
                      {data?.cert_full_name} Certification Success!
                    </p>
                    <p className="text-gray-500 text-base font-semibold  max-w-xl">
                      Exams Provider :{" "}
                      <Link
                        href={`/exam-provider/${data?.cert_multiple_exams[0].exam_vendor_perma}`}
                      >
                        <span
                          style={{
                            color: "#0da8e5",
                            cursor: "pointer",
                          }}
                          className="hover:underline"
                        >
                          {data?.cert_multiple_exams[0].exam_vendor_title}
                        </span>
                      </Link>
                    </p>
                    <p className="text-gray-500 text-base font-semibold mb-6 max-w-xl">
                      Certification Exam Name :{" "}
                      <span className="text-sky-500">
                        {data?.cert_full_name}
                      </span>
                    </p>
                    <div className="flex flex-wrap items-center gap-2 ">
                      <div className="flex gap-1">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          fill="none"
                        >
                          <path
                            d="M10.8586 4.71245C11.2178 3.60688 12.7819 3.60688 13.1412 4.71245L14.4246 8.66261C14.5853 9.15703 15.046 9.49179 15.5659 9.49179H19.7193C20.8818 9.49179 21.3651 10.9793 20.4247 11.6626L17.0645 14.1039C16.6439 14.4095 16.4679 14.9512 16.6286 15.4456L17.912 19.3957C18.2713 20.5013 17.0059 21.4207 16.0654 20.7374L12.7052 18.296C12.2846 17.9905 11.7151 17.9905 11.2945 18.296L7.93434 20.7374C6.99388 21.4207 5.72851 20.5013 6.08773 19.3957L7.37121 15.4456C7.53186 14.9512 7.35587 14.4095 6.93529 14.1039L3.57508 11.6626C2.63463 10.9793 3.11796 9.49179 4.28043 9.49179H8.43387C8.95374 9.49179 9.41448 9.15703 9.57513 8.66261L10.8586 4.71245Z"
                            fill="#FFB11A"
                          ></path>
                        </svg>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          fill="none"
                        >
                          <path
                            d="M10.8586 4.71245C11.2178 3.60688 12.7819 3.60688 13.1412 4.71245L14.4246 8.66261C14.5853 9.15703 15.046 9.49179 15.5659 9.49179H19.7193C20.8818 9.49179 21.3651 10.9793 20.4247 11.6626L17.0645 14.1039C16.6439 14.4095 16.4679 14.9512 16.6286 15.4456L17.912 19.3957C18.2713 20.5013 17.0059 21.4207 16.0654 20.7374L12.7052 18.296C12.2846 17.9905 11.7151 17.9905 11.2945 18.296L7.93434 20.7374C6.99388 21.4207 5.72851 20.5013 6.08773 19.3957L7.37121 15.4456C7.53186 14.9512 7.35587 14.4095 6.93529 14.1039L3.57508 11.6626C2.63463 10.9793 3.11796 9.49179 4.28043 9.49179H8.43387C8.95374 9.49179 9.41448 9.15703 9.57513 8.66261L10.8586 4.71245Z"
                            fill="#FFB11A"
                          ></path>
                        </svg>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          fill="none"
                        >
                          <path
                            d="M10.8586 4.71245C11.2178 3.60688 12.7819 3.60688 13.1412 4.71245L14.4246 8.66261C14.5853 9.15703 15.046 9.49179 15.5659 9.49179H19.7193C20.8818 9.49179 21.3651 10.9793 20.4247 11.6626L17.0645 14.1039C16.6439 14.4095 16.4679 14.9512 16.6286 15.4456L17.912 19.3957C18.2713 20.5013 17.0059 21.4207 16.0654 20.7374L12.7052 18.296C12.2846 17.9905 11.7151 17.9905 11.2945 18.296L7.93434 20.7374C6.99388 21.4207 5.72851 20.5013 6.08773 19.3957L7.37121 15.4456C7.53186 14.9512 7.35587 14.4095 6.93529 14.1039L3.57508 11.6626C2.63463 10.9793 3.11796 9.49179 4.28043 9.49179H8.43387C8.95374 9.49179 9.41448 9.15703 9.57513 8.66261L10.8586 4.71245Z"
                            fill="#FFB11A"
                          ></path>
                        </svg>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          fill="none"
                        >
                          <path
                            d="M10.8586 4.71245C11.2178 3.60688 12.7819 3.60688 13.1412 4.71245L14.4246 8.66261C14.5853 9.15703 15.046 9.49179 15.5659 9.49179H19.7193C20.8818 9.49179 21.3651 10.9793 20.4247 11.6626L17.0645 14.1039C16.6439 14.4095 16.4679 14.9512 16.6286 15.4456L17.912 19.3957C18.2713 20.5013 17.0059 21.4207 16.0654 20.7374L12.7052 18.296C12.2846 17.9905 11.7151 17.9905 11.2945 18.296L7.93434 20.7374C6.99388 21.4207 5.72851 20.5013 6.08773 19.3957L7.37121 15.4456C7.53186 14.9512 7.35587 14.4095 6.93529 14.1039L3.57508 11.6626C2.63463 10.9793 3.11796 9.49179 4.28043 9.49179H8.43387C8.95374 9.49179 9.41448 9.15703 9.57513 8.66261L10.8586 4.71245Z"
                            fill="#FFB11A"
                          ></path>
                        </svg>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          fill="none"
                        >
                          <path
                            d="M10.8586 4.71245C11.2178 3.60688 12.7819 3.60688 13.1412 4.71245L14.4246 8.66261C14.5853 9.15703 15.046 9.49179 15.5659 9.49179H19.7193C20.8818 9.49179 21.3651 10.9793 20.4247 11.6626L17.0645 14.1039C16.6439 14.4095 16.4679 14.9512 16.6286 15.4456L17.912 19.3957C18.2713 20.5013 17.0059 21.4207 16.0654 20.7374L12.7052 18.296C12.2846 17.9905 11.7151 17.9905 11.2945 18.296L7.93434 20.7374C6.99388 21.4207 5.72851 20.5013 6.08773 19.3957L7.37121 15.4456C7.53186 14.9512 7.35587 14.4095 6.93529 14.1039L3.57508 11.6626C2.63463 10.9793 3.11796 9.49179 4.28043 9.49179H8.43387C8.95374 9.49179 9.41448 9.15703 9.57513 8.66261L10.8586 4.71245Z"
                            fill="#FFB11A"
                          ></path>
                        </svg>
                      </div>
                      <span className="text-sm font-semibold">
                        5.0 ({data?.cert_id} reviews)
                      </span>
                    </div>
                  </div>
                </div>
              </div>
              <hr className="-mt-10" />
              <CertificationMulitpleExams data={data?.cert_multiple_exams} />
            </div>
          </section>
          <LogoBanner />
          <HotExams />
        </>
      )}
      {data?._has_multiple_exams === false && (
        <>
          <section className="pt-6 pb-6 px-6 bg-white">
            <div className="flex justify-center mb-4">
              <img src="/MEGASALE DA-min.png" alt="" />
            </div>
          </section>
          <section className="pt-6 px-6 bg-white">
            <div className="container mx-auto">
              <div className="flex flex-wrap -m-4 mb-12">
                <div className="w-full lg:w-4/12 p-12">
                  <div className="flex items-end gap-2">
                    <span
                      style={{ display: "flex", justifyContent: "center" }}
                      className="group flex-1"
                    >
                      <div
                        className="relative xl:hidden overflow-hidden rounded-xl flex flex-col justify-center transition duration-200"
                        style={{
                          height: "300px",
                          width: "300px",
                        }}
                      >
                        <img
                          style={{ width: "300px", height: "300px" }}
                          className="absolute inset-0 rounded-xl transform group-hover:scale-105 transition duration-200"
                          src="/package-small-min_optimized.png"
                          alt=""
                        />
                      </div>
                      <div
                        className="relative hidden xl:inline-flex overflow-hidden rounded-xl flex-col justify-center transition duration-200"
                        style={{
                          height: "300px",
                          width: "420px",
                        }}
                      >
                        <img
                          style={{ width: "420px", height: "300px" }}
                          className="absolute inset-0 rounded-xl transform group-hover:scale-105 transition duration-200"
                          src="/package-small-min_optimized.png"
                          alt=""
                        />
                      </div>
                    </span>
                  </div>
                </div>
                <div className="w-full lg:w-8/12 p-4">
                  <div className="p-5 md:p-10">
                    <h2 className="font-heading uppercase text-3xl mb-2 max-w-xl">
                      {data?.cert_title
                        ? `${data?.cert_title} Certification Provided by IT Professionals`
                        : "Exam Questions N/A"}
                    </h2>
                    <hr
                      className="mb-4"
                      style={{ border: "2px solid #F5F6FA" }}
                    />

                    <p className="text-gray-500 text-base font-semibold  max-w-xl">
                      Reliable Study Materials & Testing Engine for{" "}
                      {data?.cert_full_name} Certification Success!
                    </p>
                    <p className="text-gray-500 text-base font-semibold  max-w-xl">
                      Exams Provider :{" "}
                      <Link href={`/exam-provider/${data?.vendor_perma}`}>
                        <span
                          style={{
                            color: "#0da8e5",
                            cursor: "pointer",
                          }}
                          className="hover:underline"
                        >
                          {data?.vendor_title}
                        </span>
                      </Link>
                    </p>
                    <p className="text-gray-500 text-base font-semibold mb-6 max-w-xl">
                      Certification Exam Name :{" "}
                      <span className="text-sky-500">
                        {data?.cert_full_name}
                      </span>
                    </p>
                    <div className="flex flex-wrap items-center gap-2 ">
                      <div className="flex gap-1">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          fill="none"
                        >
                          <path
                            d="M10.8586 4.71245C11.2178 3.60688 12.7819 3.60688 13.1412 4.71245L14.4246 8.66261C14.5853 9.15703 15.046 9.49179 15.5659 9.49179H19.7193C20.8818 9.49179 21.3651 10.9793 20.4247 11.6626L17.0645 14.1039C16.6439 14.4095 16.4679 14.9512 16.6286 15.4456L17.912 19.3957C18.2713 20.5013 17.0059 21.4207 16.0654 20.7374L12.7052 18.296C12.2846 17.9905 11.7151 17.9905 11.2945 18.296L7.93434 20.7374C6.99388 21.4207 5.72851 20.5013 6.08773 19.3957L7.37121 15.4456C7.53186 14.9512 7.35587 14.4095 6.93529 14.1039L3.57508 11.6626C2.63463 10.9793 3.11796 9.49179 4.28043 9.49179H8.43387C8.95374 9.49179 9.41448 9.15703 9.57513 8.66261L10.8586 4.71245Z"
                            fill="#FFB11A"
                          ></path>
                        </svg>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          fill="none"
                        >
                          <path
                            d="M10.8586 4.71245C11.2178 3.60688 12.7819 3.60688 13.1412 4.71245L14.4246 8.66261C14.5853 9.15703 15.046 9.49179 15.5659 9.49179H19.7193C20.8818 9.49179 21.3651 10.9793 20.4247 11.6626L17.0645 14.1039C16.6439 14.4095 16.4679 14.9512 16.6286 15.4456L17.912 19.3957C18.2713 20.5013 17.0059 21.4207 16.0654 20.7374L12.7052 18.296C12.2846 17.9905 11.7151 17.9905 11.2945 18.296L7.93434 20.7374C6.99388 21.4207 5.72851 20.5013 6.08773 19.3957L7.37121 15.4456C7.53186 14.9512 7.35587 14.4095 6.93529 14.1039L3.57508 11.6626C2.63463 10.9793 3.11796 9.49179 4.28043 9.49179H8.43387C8.95374 9.49179 9.41448 9.15703 9.57513 8.66261L10.8586 4.71245Z"
                            fill="#FFB11A"
                          ></path>
                        </svg>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          fill="none"
                        >
                          <path
                            d="M10.8586 4.71245C11.2178 3.60688 12.7819 3.60688 13.1412 4.71245L14.4246 8.66261C14.5853 9.15703 15.046 9.49179 15.5659 9.49179H19.7193C20.8818 9.49179 21.3651 10.9793 20.4247 11.6626L17.0645 14.1039C16.6439 14.4095 16.4679 14.9512 16.6286 15.4456L17.912 19.3957C18.2713 20.5013 17.0059 21.4207 16.0654 20.7374L12.7052 18.296C12.2846 17.9905 11.7151 17.9905 11.2945 18.296L7.93434 20.7374C6.99388 21.4207 5.72851 20.5013 6.08773 19.3957L7.37121 15.4456C7.53186 14.9512 7.35587 14.4095 6.93529 14.1039L3.57508 11.6626C2.63463 10.9793 3.11796 9.49179 4.28043 9.49179H8.43387C8.95374 9.49179 9.41448 9.15703 9.57513 8.66261L10.8586 4.71245Z"
                            fill="#FFB11A"
                          ></path>
                        </svg>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          fill="none"
                        >
                          <path
                            d="M10.8586 4.71245C11.2178 3.60688 12.7819 3.60688 13.1412 4.71245L14.4246 8.66261C14.5853 9.15703 15.046 9.49179 15.5659 9.49179H19.7193C20.8818 9.49179 21.3651 10.9793 20.4247 11.6626L17.0645 14.1039C16.6439 14.4095 16.4679 14.9512 16.6286 15.4456L17.912 19.3957C18.2713 20.5013 17.0059 21.4207 16.0654 20.7374L12.7052 18.296C12.2846 17.9905 11.7151 17.9905 11.2945 18.296L7.93434 20.7374C6.99388 21.4207 5.72851 20.5013 6.08773 19.3957L7.37121 15.4456C7.53186 14.9512 7.35587 14.4095 6.93529 14.1039L3.57508 11.6626C2.63463 10.9793 3.11796 9.49179 4.28043 9.49179H8.43387C8.95374 9.49179 9.41448 9.15703 9.57513 8.66261L10.8586 4.71245Z"
                            fill="#FFB11A"
                          ></path>
                        </svg>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          fill="none"
                        >
                          <path
                            d="M10.8586 4.71245C11.2178 3.60688 12.7819 3.60688 13.1412 4.71245L14.4246 8.66261C14.5853 9.15703 15.046 9.49179 15.5659 9.49179H19.7193C20.8818 9.49179 21.3651 10.9793 20.4247 11.6626L17.0645 14.1039C16.6439 14.4095 16.4679 14.9512 16.6286 15.4456L17.912 19.3957C18.2713 20.5013 17.0059 21.4207 16.0654 20.7374L12.7052 18.296C12.2846 17.9905 11.7151 17.9905 11.2945 18.296L7.93434 20.7374C6.99388 21.4207 5.72851 20.5013 6.08773 19.3957L7.37121 15.4456C7.53186 14.9512 7.35587 14.4095 6.93529 14.1039L3.57508 11.6626C2.63463 10.9793 3.11796 9.49179 4.28043 9.49179H8.43387C8.95374 9.49179 9.41448 9.15703 9.57513 8.66261L10.8586 4.71245Z"
                            fill="#FFB11A"
                          ></path>
                        </svg>
                      </div>
                      <span className="text-sm font-semibold">
                        0 (0 reviews)
                      </span>
                    </div>
                  </div>
                </div>
              </div>
              <hr className="-mt-10" />
              <CertificationMulitpleExams data={data?.cert_multiple_exams} />
            </div>
          </section>
        </>
      )}
    </>
  );
};

export default CertificationExamPage;
