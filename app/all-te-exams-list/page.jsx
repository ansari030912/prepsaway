import AllTeExams from "../components/Cards/AllTeExams";

const page = () => {
  return <AllTeExams />;
};

export default page;
export async function generateMetadata() {
  return {
    title: `PrepsAway A Test Engine Exams`,
    description: `Prepsaway is a premium provider of Real and Valid Exam Question and Answers of IT certification Exams. Pass your certification exam easily with pdf and test engine dumps in 2025.`,
    robots: {
      index: true,
    },
    alternates: {
      canonical: "https://prepsaway.com/all-te-exams-list",
    },
  };
}
