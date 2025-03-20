/* eslint-disable @next/next/no-img-element */
import BannerCard from "../components/banner/BannerCard";
import AllVideoCourses from "../components/Cards/AllVideoCourses";
import HotExams from "../components/IndexPages/HotExams";
import { X_API_Key } from "../URL's/Api_X_Key";
import { Base_URL } from "../URL's/Base_URL";

export async function generateMetadata() {
  return {
    title: `Updated Certificates Exam Question and Answers by Tech Professionals`,
    description: `PrepsAway is a premium provider of Real and Valid Exam Question and Answers of IT certification Exams. Pass your certification exam easily with pdf and test engine dumps in 2025.`,
    robots: {
      index: true,
    },
    icons: {
      other: [
        {
          rel: "canonical",
          url: `https://prepsaway.com/video-courses`,
        },
      ],
    },
  };
}

const page = async ({ searchParams }) => {
  const referral = searchParams?.ref || "";
  const randomReviewCount = Math?.floor(Math?.random() * (999 - 700 + 1)) + 700;
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org/",
            "@type": "Product",
            name: "Video Courses",
            description: `PrepsAway is a premium provider of Real and Valid Exam Question and Answers of IT certification Exams. Pass your certification exam easily with pdf and test engine dumps in 2025.`,
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
      <BannerCard />
      <AllVideoCourses referral={referral} />
      <HotExams />
    </>
  );
};

export default page;
