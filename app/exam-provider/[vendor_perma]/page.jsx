/* eslint-disable @next/next/no-img-element */
import { X_API_Key } from "@/app/URL's/Api_X_Key";
import { Base_URL } from "@/app/URL's/Base_URL";
import SingleVendorExamAndCertCard from "@/app/components/Cards/SingleVendorExamAndCertCard";
import BannerCard from "@/app/components/banner/BannerCard";

export async function generateMetadata({ params }) {
  const response = await fetch(`${Base_URL}/v1/vendor/${params.vendor_perma}`, {
    headers: {
      "x-api-key": X_API_Key,
    },
  });

  const metaDATA = await response.json();
  return {
    title: `Updated ${params.vendor_perma} Exam Questions and Answers by Tech Professionals`,
    description: `PrepsAway is a premium provider of Real and Valid Exam Question and Answers of ${params.vendor_perma} IT certification Exams. Pass your certification exam easily with pdf and test engine dumps in 2025.`,
    robots: {
      index: metaDATA?.index_tag,
    },
    icons: {
      other: [
        {
          rel: "canonical",
          url: `https://prepsaway.com/exam-provider/${params?.vendor_perma}`,
        },
      ],
    },
  };
}

const page = async ({ params }) => {
  const vendorResponce = await fetch(
    `${Base_URL}/v1/vendor/${params.vendor_perma}`,
    {
      headers: {
        "x-api-key": X_API_Key,
      },
      cache: "no-store",
    }
  );
  const randomReviewCount = Math.floor(Math.random() * (999 - 700 + 1)) + 700;
  const vendorData = await vendorResponce.json();

  const response = await fetch(`${Base_URL}/v1/hot_exams`, {
    headers: {
      "x-api-key": X_API_Key,
    },
  });

  const data = await response.json();
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org/",
            "@type": "Product",
            name: data?.vendor_title,
            description: `PrepsAway is a premium provider of Real and Valid Exam Question and Answers of ${data?.vendor_title} IT certification Exams. Pass your certification exam easily with pdf and test engine dumps in 2025.`,
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
      <div className="mx-auto container">
        <SingleVendorExamAndCertCard data={data} vendorData={vendorData} />
      </div>
    </>
  );
};

export default page;
