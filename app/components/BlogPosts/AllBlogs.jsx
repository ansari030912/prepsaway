/* eslint-disable @next/next/no-img-element */
// "use client";

import moment from "moment";
import Link from "next/link";

const AllBlogs = ({ data }) => {
  return (
    <section className="relative py-2">
      <img
        className="hidden lg:block absolute top-12 left-0 mt-20"
        src="/blue-dot-left-bars.svg"
        alt=""
      />
      <img
        className="hidden lg:block absolute top-0 right-0 mt-52"
        src="/yellow-dot-right-shield.svg"
        alt=""
      />
      <div className="container px-4 mx-auto">
        <div className="flex flex-wrap gap-2 mb-8">
          <Link href="/" className="group">
            <div className="flex flex-wrap items-center">
              <span className="text-xs text-gray-500 group-hover:text-gray-900 transition duration-200">
                Home
              </span>
              <div className="text-gray-500 group-hover:text-gray-900 transition duration-200">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 20 20"
                  fill="none"
                >
                  <path
                    d="M12.9465 9.40832L8.22986 4.69999C8.15239 4.62188 8.06022 4.55989 7.95867 4.51758C7.85712 4.47527 7.7482 4.45349 7.63819 4.45349C7.52818 4.45349 7.41926 4.47527 7.31771 4.51758C7.21616 4.55989 7.124 4.62188 7.04653 4.69999C6.89132 4.85613 6.8042 5.06734 6.8042 5.28749C6.8042 5.50764 6.89132 5.71885 7.04653 5.87499L11.1715 10.0417L7.04653 14.1667C6.89132 14.3228 6.8042 14.534 6.8042 14.7542C6.8042 14.9743 6.89132 15.1855 7.04653 15.3417C7.12371 15.4204 7.21574 15.483 7.31731 15.526C7.41887 15.5689 7.52794 15.5912 7.63819 15.5917C7.74845 15.5912 7.85752 15.5689 7.95908 15.526C8.06064 15.483 8.15268 15.4204 8.22986 15.3417L12.9465 10.6333C13.0311 10.5553 13.0986 10.4606 13.1448 10.3552C13.191 10.2497 13.2148 10.1359 13.2148 10.0208C13.2148 9.90574 13.191 9.7919 13.1448 9.68648C13.0986 9.58107 13.0311 9.48636 12.9465 9.40832Z"
                    fill="currentColor"
                  ></path>
                </svg>
              </div>
            </div>
          </Link>
          <Link href="#" className="group">
            <div className="flex flex-wrap items=center">
              <span className="text-xs text-gray-500 group-hover:text-gray-900 transition duration-200">
                Blogs
              </span>
              <div className="text-gray-500 group-hover:text-gray-900 transition duration-200">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 20 20"
                  fill="none"
                >
                  <path
                    d="M12.9465 9.40832L8.22986 4.69999C8.15239 4.62188 8.06022 4.55989 7.95867 4.51758C7.85712 4.47527 7.7482 4.45349 7.63819 4.45349C7.52818 4.45349 7.41926 4.47527 7.31771 4.51758C7.21616 4.55989 7.124 4.62188 7.04653 4.69999C6.89132 4.85613 6.8042 5.06734 6.8042 5.28749C6.8042 5.50764 6.89132 5.71885 7.04653 5.87499L11.1715 10.0417L7.04653 14.1667C6.89132 14.3228 6.8042 14.534 6.8042 14.7542C6.8042 14.9743 6.89132 15.1855 7.04653 15.3417C7.12371 15.4204 7.21574 15.483 7.31731 15.526C7.41887 15.5689 7.52794 15.5912 7.63819 15.5917C7.74845 15.5912 7.85752 15.5689 7.95908 15.526C8.06064 15.483 8.15268 15.4204 8.22986 15.3417L12.9465 10.6333C13.0311 10.5553 13.0986 10.4606 13.1448 10.3552C13.191 10.2497 13.2148 10.1359 13.2148 10.0208C13.2148 9.90574 13.191 9.7919 13.1448 9.68648C13.0986 9.58107 13.0311 9.48636 12.9465 9.40832Z"
                    fill="currentColor"
                  ></path>
                </svg>
              </div>
            </div>
          </Link>
        </div>
        <div className="max-w-full mb-20 mx-auto text-left">
          <span className="text-lg text-blue-400 font-semibold">
            What&apos;s new at PrepsAway
          </span>
          <h2 className="mt-4 mb-10 text-xl z-50 md:text-2xl lg:text-3xl font-bold text-green-500 font-heading">
            Access up-to-date and valid materials to ensure you&apos;re studying
            the most current content.
          </h2>
        </div>
        <div className="flex flex-wrap -m-3 mb-16">
          {data.blogs.map((blog, index) => (
            <>
              <div key={index} className="w-full md:w-1/2 lg:w-1/3 p-3">
                <div className="p-6 border rounded-xl">
                  <div className="relative h-52 mb-6">
                    {/* <span className="absolute top-0 left-0 mt-4 ml-4 text-xs text-white px-2 py-1 font-semibold bg-green-600 bg-opacity-80 rounded-md uppercase">
      {blog.blog_vendors_list[0]?.vendor_title || "N/A"}
    </span> */}
                    <span className="absolute top-0 right-0 mt-4 mr-4 text-xs text-white px-2 py-1 font-semibold bg-red-600 bg-opacity-80 rounded-md uppercase">
                      <span className="flex">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          className="-ml-1"
                        >
                          <path
                            fill="currentColor"
                            d="m7.325 18.923l1.24-5.313l-4.123-3.572l5.431-.47L12 4.557l2.127 5.01l5.43.47l-4.123 3.572l1.241 5.313L12 16.102z"
                          />
                        </svg>{" "}
                        <span className="text-base">
                          {blog.blog_vendors_list[0]?.vendor_title || "N/A"}
                        </span>
                      </span>
                    </span>
                    <img
                      className="w-full h-full object-cover rounded-lg"
                      src={blog.blog_image}
                      alt=""
                    />
                  </div>
                  <span className="inline-block mb-4 text-base text-green-500">
                    {moment(blog.blog_publish_date).format("DD MMMM YYYY")}
                  </span>
                  <h2 className="mb-4 text-2xl font-semibold font-heading hover:text-green-500 hover:underline">
                    <Link href={`/blog/${blog.blog_perma}`}>
                      {blog.blog_title}
                    </Link>
                  </h2>
                  <p className="mb-4 text-gray-500 leading-relaxed">
                    {blog.blog_summary}
                  </p>
                  <div className="flex justify-between">
                    <Link
                      className="text-xl mt-1 font-medium text-red-500 underline hover:no-underline hover:text-green-500"
                      href={`/blog/${blog.blog_perma}`}
                    >
                      Read more
                    </Link>
                    <span className="mr-4 text-xs text-white px-2 py-1 font-semibold bg-green-600 bg-opacity-80 rounded-md uppercase">
                      <span className="flex">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="20"
                          height="20"
                          viewBox="0 0 32 32"
                          className="mt-0.5 mr-1"
                        >
                          <g
                            fill="none"
                            stroke="currentColor"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            stroke-width="2"
                          >
                            <circle cx="17" cy="15" r="1" />
                            <circle cx="16" cy="16" r="6" />
                            <path d="M2 16S7 6 16 6s14 10 14 10s-5 10-14 10S2 16 2 16" />
                          </g>
                        </svg>
                        <span className="text-base">
                          {blog.blog_views} Views
                        </span>
                      </span>
                    </span>
                  </div>
                </div>
              </div>
              <script
                key={index}
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                  __html: JSON.stringify({
                    "@context": "https://schema.org",
                    "@type": "Blogs",
                    mainEntityOfPage: {
                      "@type": "WebPage",
                      "@id": `https://prepsaway.com/blog/${blog.blog_perma}`,
                    },
                    headline: blog.blog_title,
                    description: blog.blog_summary,
                    image: blog.blog_image,
                    author: {
                      "@type": "Person",
                      name: "Fred Benson",
                    },
                    publisher: {
                      "@type": "Organization",
                      name: "Preps Away",
                      logo: {
                        "@type": "ImageObject",
                        url: "/img/prepsaway.png",
                      },
                    },
                    datePublished: moment(blog.blog_publish_date).toISOString(),
                    dateModified:
                      moment(blog.blog_last_updated).toISOString() ||
                      moment(blog.blog_publish_date).toISOString(),
                  }),
                }}
              />
            </>
          ))}
          {/* {showContent &&
              [...Array(3)].map((_, index) => (
                <div key={index} className="w-full md:w-1/2 lg:w-1/3 p-3">
                  <div className="p-6 border rounded-xl">
                    <div className="relative h-52 mb-6">
                      <span className="absolute top-0 right-0 mt-4 mr-4 text-xs text-white px-2 py-1 font-semibold bg-gray-600 bg-opacity-50 rounded-md uppercase">
                        Development
                      </span>
                      <img
                        className="w-full h-full object-cover rounded-lg"
                        src={`https://images.unsplash.com/photo-${
                          index + 6
                        }-some-id`}
                        alt=""
                      />
                    </div>
                    <span className="inline-block mb-4 text-xs text-gray-500">
                      10 Jun 2020 19:40
                    </span>
                    <h2 className="mb-4 text-2xl font-semibold font-heading">
                      Lorem ipsum dolor sit amet consectutar
                    </h2>
                    <p className="mb-4 text-gray-500 leading-relaxed">
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                      Pellentesque massa nibh, pulvinar vitae aliquet nec,
                      accumsan aliquet orci.
                    </p>
                    <a
                      className="text-lg font-medium text-red-500 underline hover:no-underline"
                      href="#"
                    >
                      Read more
                    </a>
                  </div>
                </div>
              ))} */}
        </div>
        {/* <div className="text-center">
            <button
              onClick={() => setShowContent(true)}
              className={`px-6 py-4 text-sm text-white font-semibold bg-red-400 hover:bg-red-300 rounded transition duration-200 ${
                showContent ? "hidden" : ""
              }`}
            >
              View More Articles
            </button>
          </div> */}
      </div>
    </section>
  );
};

export default AllBlogs;
