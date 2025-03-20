"use client";
import React, { useEffect } from "react";

const SchemaPage = ({ examData }) => {
  useEffect(() => {
    // Dynamically inject the FAQ schema into the document head
    if (examData?.exam_faqs?.length > 0) {
      const faqSchema = {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        mainEntity: examData?.exam_faqs?.map((faq) => ({
          "@type": "Question",
          name: faq.faq_q,
          acceptedAnswer: {
            "@type": "Answer",
            text: faq.faq_a,
          },
        })),
      };

      const scriptTag = document.createElement("script");
      scriptTag.type = "application/ld+json";
      scriptTag.text = JSON.stringify(faqSchema);
      document.head.appendChild(scriptTag);

      // Cleanup: Remove the script when the component unmounts or data changes
      return () => {
        document.head.removeChild(scriptTag);
      };
    }
  }, [examData?.exam_faqs]);

  useEffect(() => {
    // Dynamically inject the Product schema into the document head
    if (examData?.exam_title) {
      const productSchema = {
        "@context": "https://schema.org/",
        "@type": "Product",
        name: examData?.exam_title,
        description: `Prepsaway is a premium provider of Real and Valid Exam Question and Answers of ${examData?.exam_title} IT certification Exams. Pass your certification exam easily with pdf and test engine dumps in 2025.`,
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
          reviewCount: Math.floor(Math.random() * (999 - 700 + 1)) + 700,
        },
        // offers: {
        //   "@type": "Offer", // Use a valid type for offers, "Offer" is a more appropriate type
        //   offerCount: examData?.exam_prices?.length, // Ensure that the offerCount defaults to 0 if no prices are available
        //   lowPrice: 14.99, // This seems static as per your requirement
        //   highPrice: examData?.exam_prices?.[0]?.full_price, // Safely accessing the price and defaulting to 0 if not available
        //   discountOff: examData?.exam_prices?.[0]?.off, // Default to 0 if no discount is available
        //   priceCurrency: "USD", // Assuming the currency is USD
        // },
      };

      const scriptTag = document.createElement("script");
      scriptTag.type = "application/ld+json";
      scriptTag.text = JSON.stringify(productSchema);
      document.head.appendChild(scriptTag);

      // Cleanup: Remove the script when the component unmounts or data changes
      return () => {
        document.head.removeChild(scriptTag);
      };
    }
  }, [examData?.exam_title]);

  return <div>{/* Render other UI components here if needed */}</div>;
};

export default SchemaPage;
