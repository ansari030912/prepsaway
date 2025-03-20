import CustomInvoiceCart from "@/app/components/Cards/CustomInvoiceCart";

export async function generateMetadata({ params }) {
  return {
    title: `Updated Certificates Exam Question and Answers by Tech Professionals`,
    description: `PrepsAway is a premium provider of Real and Valid Exam Question and Answers of IT certification Exams. Pass your certification exam easily with pdf and test engine dumps in 2025.`,
    referrer: "no-referrer",
    robots: {
      index: false,
    },
    icons: {
      other: [
        {
          rel: "canonical",
          url: `https://prepsaway.com/custom-invoice/${params.invoice_perma}`,
        },
      ],
    },
  };
}

const page = ({ params }) => {
  return <CustomInvoiceCart params={params} />;
};

export default page;
