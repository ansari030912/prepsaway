/* eslint-disable @next/next/no-img-element */
import BannerCard from "../components/banner/BannerCard";

const page = async () => {
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
                PrepsAway.com Frequently Asked Questions
              </div>
              <h2 className="mb-4 text-2xl md:text-3xl leading-tight text-gray-800 font-bold tracking-tighter">
                Frequently Asked Questions
              </h2>

              <p className="mb-8 md:mb-12 text-lg md:text-xl font-medium text-gray-500">
                Find answers to common questions about our products, updates,
                and services.
              </p>
              <div className="flex items-center -mx-2">
                <div className="w-auto px-2">
                  <h4 className="txl-base md:text-lg font-bold text-gray-700">
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
                    Products Classification
                  </span>
                </li>
                <li className="mb-2">
                  <span className="inline-block py-2 text-gray-600 hover:text-gray-700 font-bold">
                    Version & Update
                  </span>
                </li>
                <li className="mb-2">
                  <span className="inline-block py-2 text-gray-600 hover:text-gray-700 font-bold">
                    PDF Version
                  </span>
                </li>
                <li className="mb-2">
                  <span className="inline-block py-2 text-gray-600 hover:text-gray-700 font-bold">
                    Download Product
                  </span>
                </li>
                <li className="mb-2">
                  <span className="inline-block py-2 text-gray-600 hover:text-gray-700 font-bold">
                    Login Failed & Solutions
                  </span>
                </li>
              </ul>
            </div>
            <div className="w-full md:flex-1 px-4">
              <h3 className="mb-4 text-xl md:text-2xl font-bold text-gray-700">
                Products Classification
              </h3>
              <p className="pb-6 text-lg text-gray-500 border-gray-100">
                <strong>1. What products does PrepsAway.com offer?</strong>
                <br />
                PrepsAway.com provides a wide range of study materials,
                primarily in the form of Questions and Answers for exam
                preparation. These materials are available in PDF format, which
                can be downloaded to your computer. We recommend a two-week
                preparation time before taking your final exam. You can download
                a FREE demo for any Questions and Answers product from each
                product page.
              </p>

              <p className="pb-6 text-lg text-gray-500 border-gray-100">
                <strong>
                  2. Can I pass the exam with PrepsAway.com&apos;s Questions
                  and Answers product only?
                </strong>
                <br />
                Absolutely! Since all PrepsAway.com products are of the latest
                version, we are confident in their quality. Ensure that you
                study the relevant Questions and Answers product for two weeks
                before attempting the actual exam.
              </p>

              <p className="pb-6 text-lg text-gray-500 border-gray-100">
                <strong>3. How long is my PrepsAway.com product valid?</strong>
                <br />
                PrepsAway.com products are valid for 90 days from the date of
                purchase. This validity includes any updates to the products,
                ensuring you receive the latest exam preparation materials
                during those 90 days.
              </p>

              <p className="pb-6 text-lg text-gray-500 border-gray-100">
                <strong>4. Can I extend an expired product?</strong>
                <br />
                Yes, you can renew expired products with an additional discount
                after the 90-day validity period. This option is available in
                your Member&apos;s Area. Please note that you will not be able
                to use the product once it has expired unless it is renewed.
              </p>

              <h3 className="mb-4 text-xl md:text-2xl font-bold text-gray-700">
                Version & Update
              </h3>
              <p className="pb-6 text-lg text-gray-500 border-gray-100">
                <strong>
                  1. What is the latest version of my PrepsAway.com product?
                </strong>
                <br />
                PrepsAway.com products are regularly updated whenever questions
                change. This ensures that you always have the most current
                materials for your exam preparation.
              </p>

              <p className="pb-6 text-lg text-gray-500 border-gray-100">
                <strong>
                  2. How can I verify the version of my Questions and Answers
                  product?
                </strong>
                <br />
                We update our products regularly when questions change. You can
                double-check by logging into your PrepsAway.com Member&apos;s
                Area and downloading the latest product version.
              </p>

              <p className="pb-6 text-lg text-gray-500 border-gray-100">
                <strong>3. How often are your products updated?</strong>
                <br />
                There is no fixed date for exam updates. All PrepsAway.com
                products are reviewed weekly by our Product Manager, and updates
                are made whenever certification vendors change the exam
                questions.
              </p>

              <p className="pb-6 text-lg text-gray-500 border-gray-100">
                <strong>4. Are updates free?</strong>
                <br />
                We provide free updates during the 90-day validity from the date
                of purchase. If your product expires, you must extend the
                product access for another 90 days at a 30% discount to receive
                updates.
              </p>

              <p className="pb-6 text-lg text-gray-500 border-gray-100">
                <strong>
                  5. Why does my product show fewer questions than before?
                </strong>
                <br />
                To save your time, we remove outdated questions that are no
                longer part of the real exam during product updates. This may
                result in fewer questions but ensures you focus on the most
                relevant material.
              </p>

              <h3 className="mb-4 text-xl md:text-2xl font-bold text-gray-700">
                PDF Version
              </h3>
              <p className="pb-6 text-lg text-gray-500 border-gray-100">
                <strong>1. What is a PDF version?</strong>
                <br />
                The PDF version is a portable document format copy of your
                Questions and Answers product. This standard .pdf file contains
                all questions and answers and can be read using Adobe Acrobat or
                any other free PDF reader application.
              </p>

              <p className="pb-6 text-lg text-gray-500 border-gray-100">
                <strong>2. Will I receive updates for the PDF version?</strong>
                <br />
                Yes, PrepsAway.com provides updates for the PDF version along
                with the Questions and Answers product. Updated versions will be
                available in your Member&apos;s Area for download.
              </p>

              <h3 className="mb-4 text-xl md:text-2xl font-bold text-gray-700">
                Download Product
              </h3>
              <p className="pb-6 text-lg text-gray-500 border-gray-100">
                <strong>
                  1. I have paid for my product; when can I download it?
                </strong>
                <br />
                If your payment was successful and you received a confirmation
                email from PrepsAway.com, you can download the product
                immediately.
              </p>

              <p className="pb-6 text-lg text-gray-500 border-gray-100">
                <strong>2. Where can I download the product?</strong>
                <br />
                Log in to your account, and you will see your invoice number
                next to your product and a download button. You can then
                download the purchased product without delay.
              </p>

              <h3 className="mb-4 text-xl md:text-2xl font-bold text-gray-700">
                Login Failed & Solutions
              </h3>
              <p className="pb-6 text-lg text-gray-500 border-gray-100">
                <strong>
                  1. I placed an order, but I don&apos;t see any active products
                  for downloading; what is the problem?
                </strong>
                <br />
                Please ensure the transaction was successful and you are logging
                into the correct account. If the issue persists, contact our
                Support Team for assistance.
              </p>

              <p className="pb-6 text-lg text-gray-500 border-gray-100">
                <strong>
                  2. After logging in, I am taken back to the home page; how can
                  I access my member&apos;s area?
                </strong>
                <br />
                Ensure that you are entering the correct email and password. If
                the problem continues, try restarting your computer or changing
                your internet browser. If the issue persists, please email
                sales@PrepsAway.com for further assistance.
              </p>

              <p className="pb-6 text-lg text-gray-500 border-gray-100">
                <strong>
                  3. I forgot my password or the system isn&apos;t accepting it;
                  what should I do?
                </strong>
                <br />
                Use the &quot;Forgot Password&quot; page to receive a reset
                password link sent to your registered email. If you continue to
                have issues, contact our Support Team for help.
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default page;

export async function generateMetadata() {
  return {
    title: `PrepsAway FAQ's`,
    description: `Prepsaway is a premium provider of Real and Valid Exam Question and Answers of IT certification Exams. Pass your certification exam easily with pdf and test engine dumps in 2025.`,
    robots: {
      index: true,
    },
    alternates: {
      canonical: "https://prepsaway.com/faqs",
    },
  };
}
