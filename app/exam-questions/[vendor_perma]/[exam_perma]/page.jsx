/* eslint-disable @next/next/no-img-element */
import { X_API_Key } from "@/app/URL's/Api_X_Key";
import { Base_URL } from "@/app/URL's/Base_URL";
import ArticleCard from "@/app/components/Cards/ArticleCard";
import CommentCard from "@/app/components/Cards/CommentCard";
import ExamAddToCart from "@/app/components/Cards/ExamAddToCart";
import ExamDetailCard from "@/app/components/Cards/ExamDetailCard";
import ExamFaqCard from "@/app/components/Cards/ExamFaqCard";
import RedirectCard from "@/app/components/Cards/RedirectCard";
import HotExams from "@/app/components/IndexPages/HotExams";
import LogoBanner from "@/app/components/IndexPages/LogoBanner";
import SchemaPage from "@/app/components/SchemaPage";
import BannerCard from "@/app/components/banner/BannerCard";

const decodeHTML = (html) => {
  const decoded = html
    ?.replace(/&amp;/g, "&")
    ?.replace(/&lt;/g, "<")
    ?.replace(/&gt;/g, ">")
    ?.replace(/&quot;/g, '"')
    ?.replace(/&#039;/g, "'")
    ?.replace(/&nbsp;/g, " ");

  // Remove all inline styles
  return decoded?.replace(/style="[^"]*"/g, "");
};

const page = async ({ params, searchParams }) => {
  const referral = searchParams?.ref || "";

  const [relatedExamsRes, examResponse] = await Promise.all([
    fetch(`${Base_URL}/v1/related_exams/${params?.vendor_perma}`, {
      headers: { "x-api-key": X_API_Key },
      cache: "no-store",
    }),
    fetch(`${Base_URL}/v1/exam/${params?.exam_perma}?coupon=MEGASALE-30`, {
      headers: { "x-api-key": X_API_Key },
      cache: "no-store",
    }),
    fetch(`${Base_URL}/v1/hot_exams`, {
      headers: { "x-api-key": X_API_Key },
      cache: "no-store",
    }),
  ]);

  const examData = await examResponse.json();
  const decodedContent = decodeHTML(examData.exam_article);

  return (
    <>
      <BannerCard />
      <div className="md:block hidden">
        <ExamDetailCard />
      </div>
      <SchemaPage examData={examData} />
      <ExamAddToCart examData={examData} />
      <HotExams />
      <LogoBanner />
      {/* Pass sanitized decoded content */}
      <ArticleCard examData={examData} decodedContent={decodedContent} />
      {examData.exam_preorder ? (
        ""
      ) : (
        <>
          <ExamFaqCard examData={examData} />
          <CommentCard examData={examData} />
        </>
      )}
      <RedirectCard examData={examData} />
    </>
  );
};

export default page;

export async function generateMetadata({ params }) {
  const examResponse = await fetch(
    `${Base_URL}/v1/exam/${params.exam_perma}?coupon=MEGASALE-30`,
    {
      headers: {
        "x-api-key": X_API_Key,
      },
    }
  );

  if (!examResponse.ok) {
    console.error("Error fetching metadata");
    return {
      title: "Exam Question and Answers by Tech Professionals",
      description: "",
      robots: {
        index: false,
      },
    };
  }

  const examData = await examResponse.json();

  return {
    title: `Updated ${examData.exam_title} Exam Question and Answers by Tech Professionals`,
    description: `PrepsAway is a premium provider of Real and Valid Exam Question and Answers of ${examData.exam_title} IT certification Exams. Pass your certification exam easily with pdf and test engine dumps in 2025 and become certified professional.`,
    robots: {
      index: !examData.index_tag ? true : false,
    },
    icons: {
      other: [
        {
          rel: "canonical",
          url: `https://prepsaway.com/exam-questions/${params.vendor_perma}/${params.exam_perma}`,
        },
      ],
    },
  };
}
