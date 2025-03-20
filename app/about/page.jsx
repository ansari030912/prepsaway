/* eslint-disable @next/next/no-img-element */

import BannerCard from "../components/banner/BannerCard";

const AboutUs = async () => {
  return (
    <>
      <BannerCard />
      <section
        className="py-16 md:py-24 bg-white"
        style={{
          backgroundImage: `url('/pattern-white.png')`,
        }}
      >
        <div className="container px-4 mx-auto">
          <div className="flex flex-wrap lg:items-center mb-12 -mx-4">
            <div className="w-full md:w-5/12 px-4 mb-8 md:mb-0">
              <div className="mx-auto md:ml-0 max-w-max overflow-hidden rounded-lg">
                <img src="/table-work-computer-study-reading.jpg" alt="" />
              </div>
            </div>
            <div className="w-full md:w-7/12 px-4">
              <div className="inline-block py-1 px-3 mb-6 text-xs leading-5 text-green-500 font-medium uppercase bg-green-100 rounded-full shadow-sm">
                About PrepsAway.com
              </div>
              <h2 className="mb-4 text-2xl md:text-3xl leading-tight text-gray-800 font-bold tracking-tighter">
                About - Committed to Your IT Certification Success
              </h2>

              <p className="mb-8 md:mb-12 text-lg md:text-xl font-medium text-gray-500">
                PrepsAway.com is dedicated to providing candidates with
                comprehensive study materials for all types of IT
                certifications. We guarantee that our resources not only help
                you pass your exams but also deepen your understanding of the
                respective subjects. While there are many companies in the
                certification industry, PrepsAway.com stands out for its unique
                approach and commitment to quality.
              </p>

              <div className="flex items-center -mx-2">
                <div className="w-auto px-2">
                  <h4 className="txl-base md:2ext-lg font-bold text-gray-700">
                    Tech Professionals
                  </h4>
                  <p className="text-base md:text-lg text-gray-500">
                    21 May 2025
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="flex flex-wrap -mx-4">
            <div className="w-full md:w-5/12 lg:w-4/12 xl:w-3/12 px-4 mb-8">
              <ul className="pb-6 mb-8 border-b border-gray-100">
                <li className="mb-2">
                  <span className="inline-block py-2 text-gray-600 hover:text-gray-700 font-bold">
                    Latest Study Materials
                  </span>
                </li>
                <li className="mb-2">
                  <span className="inline-block py-2 text-gray-600 hover:text-gray-700 font-bold">
                    Accurate and Up-to-Date
                  </span>
                </li>
                <li className="mb-2">
                  <span className="inline-block py-2 text-gray-600 hover:text-gray-700 font-bold">
                    Quality Over Quantity
                  </span>
                </li>
                <li className="mb-2">
                  <span className="inline-block py-2 text-gray-600 hover:text-gray-700 font-bold">
                    Comprehensive Coverage
                  </span>
                </li>
                <li className="mb-2">
                  <span className="inline-block py-2 text-gray-600 hover:text-gray-700 font-bold">
                    Continuous Updates
                  </span>
                </li>
              </ul>
            </div>
            <div className="w-full md:flex-1 px-4">
              <h3 className="mb-4 text-xl md:text-2xl font-bold text-gray-700">
                Latest Study Materials
              </h3>
              <p className="pb-6 text-lg text-gray-500 border-gray-100">
                At PrepsAway.com, you’ll find the latest and most accurate
                study materials for all kinds of IT certification exams. Whether
                you&apos;re pursuing certifications from IBM, Microsoft, Cisco
                (CCNA/CCDA/CCNP), VMware VCP510, Checkpoint CCSE, CompTIA
                A+/Network+, or others, we help you pass any IT exam on your
                first try.
              </p>

              <h3 className="mb-4 text-xl md:text-2xl font-bold text-gray-700">
                Accurate and Up-to-Date
              </h3>
              <p className="mb-8 pb-10 text-lg text-gray-500 border-b border-gray-100">
                Our focus is on accuracy and relevance. We offer fewer questions
                at a reasonable price because we prioritize quality over
                quantity. For example, while some companies might offer 800+
                questions for the CCNA exam, we provide only 300 questions,
                carefully curated to ensure you’re studying only the most
                relevant material. This saves you time and ensures you&apos;re
                well-prepared for the real exam.
              </p>

              <h3 className="mb-4 text-xl md:text-2xl font-bold text-gray-700">
                Quality Over Quantity
              </h3>
              <p className="mb-6 text-lg text-gray-500">
                Our study materials include high-quality questions, verified
                answers, and professional explanations that cover all the
                essential knowledge points. With an emphasis on the main topics
                and concise summaries, our materials cover at least 95% of the
                exam questions, giving you the best chance of success.
              </p>

              <h3 className="mb-4 text-xl md:text-2xl font-bold text-gray-700">
                Continuous Updates
              </h3>
              <p className="mb-14 text-base md:text-lg text-gray-500">
                We continuously monitor changes in the certification exams and
                update our products accordingly. Any changes made by the exam
                vendors are quickly reflected in our materials, ensuring that
                you always have access to the most current and effective study
                tools.
              </p>

              <h3 className="mb-4 text-xl md:text-2xl font-bold text-gray-700">
                Make an Informed Choice
              </h3>
              <p className="mb-8 text-lg md:text-xl font-medium text-gray-500">
                With these advantages, you can make an informed choice about
                your study materials. If you have any questions or need further
                information, feel free to contact us at sales@prepsaway.com.
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default AboutUs;

export async function generateMetadata() {
  return {
    title: `PrepsAway About`,
    description: `Prepsaway is a premium provider of Real and Valid Exam Question and Answers of IT certification Exams. Pass your certification exam easily with pdf and test engine dumps in 2025.`,
    robots: {
      index: true,
    },
    alternates: {
      canonical: "https://prepsaway.com/about",
    },
  };
}
