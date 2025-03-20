/* eslint-disable @next/next/no-img-element */
import Link from "next/link";

const ArticleCard = ({ examData, decodedContent }) => {
  return (
    <>
      {examData.exam_preorder ? (
        ""
      ) : !examData.exam_article ? (
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
                  {examData.exam_vendor_title}
                </div>
                <div className="flex items-center">
                  <span className="mx-1 text-green-500">•</span>
                  <p className="inline-block text-green-500 font-medium">
                    21 May 2025
                  </p>
                </div>
                <h2 className="mb-4 text-2xl md:text-3xl  leading-tight text-gray-800 font-bold tracking-tighter">
                  Master the {examData.exam_title} Exam: Enhance Your Skills
                  with {examData.exam_vendor_title} Certification!
                </h2>
                <p className="mb-8 md:mb-12 text-lg md:text-xl font-medium text-gray-500">
                  Exams Questions Provided By IT Professional.
                </p>
                <div className="flex items-center -mx-2">
                  <div className="w-auto px-2">
                    <img src="flex-ui-assets/images/blog/avatar.png" alt="" />
                  </div>
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
                      Introduction
                    </span>
                  </li>
                  <li className="mb-2">
                    <span className="inline-block py-2 text-gray-600 hover:text-gray-700 font-bold">
                      Designed for Busy Professionals
                    </span>
                  </li>
                  <li className="mb-2">
                    <span className="inline-block py-2 text-gray-600 hover:text-gray-700 font-bold">
                      Understanding the {examData.exam_title} Exam Format
                    </span>
                  </li>
                  <li className="mb-2">
                    <span className="inline-block py-2 text-gray-600 hover:text-gray-700 font-bold">
                      Trustworthy and Up-to-Date Content
                    </span>
                  </li>
                  <li className="mb-2">
                    <span className="inline-block py-2 text-gray-600 hover:text-gray-700 font-bold">
                      Pass Your {examData.exam_title} Exam with Confidence
                    </span>
                  </li>
                </ul>
              </div>
              <div className="w-full md:flex-1 px-4">
                <p className="pb-6 text-lg  text-gray-500 border-gray-100">
                  Earning the prestigious {examData.exam_title} certification
                  from {examData.exam_vendor_title} significantly boosts your
                  marketability and opens doors to exciting opportunities.
                  Achieving this recognized credential expands your career
                  options and increases your earning potential. PrepsAway
                  practice tests provide the most efficient way to prepare for
                  and pass your {examData.exam_title} exam on the first try.
                </p>
                <p className="mb-8 pb-10 text-lg  text-gray-500 border-b border-gray-100">
                  To earn the {examData.exam_title} certification, you&apos;ll
                  need to pass the relevant exam offered by{" "}
                  {examData.exam_vendor_title}.
                </p>
                <h3 className="mb-4 text-xl md:text-2xl font-bold text-gray-700">
                  Designed for Busy Professionals
                </h3>
                <p className="mb-4 text-base md:text-lg text-gray-500">
                  Understanding the time constraints of professionals, Exam
                  Prince has developed comprehensive
                  <span className="mb-6 mt-6 p-6 block border-l-2 text-blue-400 border-green-500">
                    {examData?.exam_certs?.map((item, index) => (
                      <p
                        key={index}
                        className="mb-4 text-lg md:text-xl leading-tight font-medium text-blue-500 hover:text-blue-600"
                      >
                        <Link
                          href={`/vendor-exam-questions/${examData.exam_vendor_perma}/${item.cert_perma}`}
                        >
                          {item.cert_name}
                          <br />
                        </Link>
                      </p>
                    ))}
                  </span>
                  that fit your schedule and align with the{" "}
                  {examData.exam_title} exam objectives. These materials are
                  highly effective in boosting your professional skills and
                  expanding your knowledge within a short period. Preps Away
                  exam testing tools not only familiarize you with the actual
                  exam format but also provide insights into key areas of the{" "}
                  {examData.exam_title} syllabus. To pass the relevant exam
                  offered by {examData.exam_vendor_title}.
                </p>
                {/* <p className="mb-6 text-base md:text-lg text-gray-500">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec
                ullamcorper mattis lorem non. Ultrices praesent amet ipsum justo
                massa. Eu dolor aliquet risus gravida nunc at feugiat consequat
                purus. Non massa enim vitae duis mattis. Vel in ultricies vel
                fringilla.
              </p> */}
                <div className="mb-4 max-w-max overflow-hidden rounded-md">
                  <img
                    src="flex-ui-assets/images/blog-content/content-photo2.jpg"
                    alt=""
                  />
                </div>
                <h3 className="mb-4 text-xl md:text-2xl font-bold text-gray-700">
                  Understanding the {examData.exam_title} Exam Format
                </h3>
                <p className="mb-14 text-base md:text-lg text-gray-500">
                  Exam candidates are always interested in learning about the
                  structure and nature of exam questions. PrepsAway resources
                  address this by providing an overview of the format and types
                  of questions you can expect on the {examData.exam_title} exam.
                </p>
                <h3 className="mb-4 text-xl md:text-2xl font-bold text-gray-700">
                  Trustworthy and Up-to-Date Content
                </h3>
                <p className="mb-14 text-base md:text-lg text-gray-500">
                  PrepsAway{" "}
                  {examData?.exam_certs?.map((item, index) => (
                    <span
                      key={index}
                      className="mb-4 text-lg md:text-xl leading-tight font-medium text-blue-500 hover:text-blue-600"
                    >
                      <Link
                        href={`/vendor-exam-questions/${examData.exam_vendor_perma}/${item.cert_perma}`}
                      >
                        {item.cert_name},{" "}
                      </Link>
                    </span>
                  ))}{" "}
                  include a concise set of questions that provide reliable,
                  current, and relevant information on each syllabus topic that
                  might be covered in your specific {examData.exam_title} exam.
                  The questions are verified and confirmed by qualified
                  professionals. You can be confident that you&apos;re receiving
                  high-quality information and not wasting time on irrelevant or
                  outdated material. Customer feedback consistently ranks
                  PrepsAway{" "}
                  {examData?.exam_certs?.map((item, index) => {
                    {
                      item.cert_name;
                    }
                  })}{" "}
                  as the best available, empowering them to master{" "}
                  {examData.exam_title} exam content and achieve success.
                </p>
                <h3 className="mb-4 text-xl md:text-2xl font-bold text-gray-700">
                  Pass Your {examData.exam_title} Exam with Confidence
                </h3>
                <p className="mb-4 text-base md:text-lg text-gray-500">
                  With PrepsAway exceptional IT exam preparation materials, you
                  can be sure of your success in your chosen{" "}
                  {examData.exam_title} exam. We offer a 100% money-back
                  guarantee. Preps Away serves a vast network of customers with
                  state-of-the-art and exam-focused study materials that require
                  as little as two weeks to prepare for the complete{" "}
                  {examData.exam_title} exam syllabus.
                </p>
              </div>
            </div>
          </div>
        </section>
      ) : (
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
                  {examData.exam_vendor_title}
                </div>
                <div className="flex items-center">
                  <span className="mx-1 text-green-500">•</span>
                  <p className="inline-block text-green-500 font-medium">
                    21 May 2025
                  </p>
                </div>
                <h2 className="mb-4 text-2xl md:text-3xl  leading-tight text-gray-800 font-bold tracking-tighter">
                  Master the {examData.exam_title} Exam: Enhance Your Skills
                  with {examData.exam_vendor_title} Certification!
                </h2>
                <p className="mb-8 md:mb-12 text-lg md:text-xl font-medium text-gray-500">
                  Exams Questions Provided By IT Professional.
                </p>
                <div className="flex items-center -mx-2">
                  <div className="w-auto px-2">
                    <img src="flex-ui-assets/images/blog/avatar.png" alt="" />
                  </div>
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
              <div className="flex flex-wrap -mx-4">
                <div className="w-full md:flex-1 px-4">
                  {/* Render the decoded Blog Content */}
                  <div
                    className="mb-8 text-lg md:text-xl article font-medium text-gray-500"
                    dangerouslySetInnerHTML={{ __html: decodedContent }}
                  />
                </div>
              </div>
            </div>
          </div>
        </section>
      )}
    </>
  );
};

export default ArticleCard;
