import CertificationHomePageCard from "./components/Cards/CertificationHomePageCard";
import SiteOverView from "./components/Cards/SiteOverView";
import TestimonialCarousel from "./components/Cards/TestimonialCarousel";
import WhyChoseCard from "./components/Cards/WhyChoseCard";
import AboutCard from "./components/IndexPages/AboutCard";
import HotExams from "./components/IndexPages/HotExams";
import LandingPageHeroSection from "./components/IndexPages/LandingPageHeroSection";
import LogoBanner from "./components/IndexPages/LogoBanner";
import { RecentUpdatedExams } from "./components/IndexPages/RecentUpdatedExams";

export default function Home() {
  const randomReviewCount = Math.floor(Math.random() * (999 - 700 + 1)) + 700;
  // const randomRatingCount = (Math.random() * (5 - 4.1) + 4.1).toFixed(1);
  // console.log("🚀 ~ Home ~ randomRatingCount:", randomRatingCount)
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org/",
            "@type": "Product",
            name: "Preps Away",
            description: `Prepsaway is a premium provider of Real and Valid Exam Question and Answers of IT certification Exams. Pass your certification exam easily with pdf and test engine dumps in 2025.`,
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
      <LandingPageHeroSection />
      <LogoBanner />
      <RecentUpdatedExams />
      <SiteOverView />
      <AboutCard />
      <HotExams />
      <CertificationHomePageCard />
      <TestimonialCarousel />
      <WhyChoseCard />
    </>
  );
}
export async function generateMetadata() {
  return {
    title: `Updated Exam Questions and Answers by Tech Professionals`,
    description: `Prepsaway is a premium provider of Real and Valid Exam Question and Answers of IT certification Exams. Pass your certification exam easily with pdf and test engine dumps in 2025.`,
    robots: {
      index: true,
    },
    alternates: {
      canonical: "https://prepsaway.com",
    },
  };
}
