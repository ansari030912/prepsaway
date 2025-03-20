/* eslint-disable @next/next/no-img-element */
import moment from "moment";
import Link from "next/link";
import BannerCard from "../banner/BannerCard";

const SingleBlog = ({ data }) => {
  const formattedPublishDate = moment(data?.blog_publish_date).format(
    "DD MMMM YYYY"
  );

  return (
    <>
      <BannerCard />
      <section
        className="py-6 md:py-12 bg-white"
        style={{
          backgroundImage: `url('/pattern-white.png')`,
        }}
      >
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
            <Link href="/blogs" className="group">
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
            <Link href="#" className="group">
              <div className="flex flex-wrap items=center">
                <span className="text-xs text-gray-500 group-hover:text-gray-900 transition duration-200">
                  {data?.blog_vendors_list?.[0]?.vendor_title ||
                    "Vendor not available"}
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
          <div className="flex flex-wrap lg:items-center mb-12 -mx-4">
            <div className="w-full lg:w-5/12 px-4 mb-8 md:mb-0">
              <div className="mx-auto md:ml-0 max-w-max overflow-hidden rounded-lg">
                <img src={data?.blog_image} alt="" />
              </div>
            </div>
            <div className="w-full lg:w-7/12 px-4">
              <div className="inline-block py-1 px-3 mb-6 text-xs leading-5 text-green-500 font-medium uppercase bg-green-100 rounded-full shadow-sm">
                <Link
                  href={
                    data?.blog_vendors_list?.[0]?.vendor_title
                      ? `/exam-provider/${data?.blog_vendors_list?.[0]?.vendor_perma}`
                      : "#"
                  }
                >
                  {data?.blog_vendors_list?.[0]?.vendor_title || "N/A"}
                </Link>
              </div>
              <h1 className="mb-4 text-2xl md:text-3xl leading-tight text-gray-800 font-bold tracking-tighter">
                {data?.blog_title}
              </h1>
              <p
                className="mb-8 md:mb-12 text-lg md:text-xl font-medium text-gray-500"
                dangerouslySetInnerHTML={{ __html: data?.decodedSummary || "" }}
              ></p>
              <div className="flex items-center -mx-2">
                <div className="w-auto px-2">
                  <h4 className="text-base md:text-lg font-bold text-gray-700">
                    Tech Professionals
                  </h4>
                  <p className="text-base md:text-lg text-gray-500">
                    {formattedPublishDate}
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="flex flex-wrap -mx-4">
            <div className="w-full md:flex-1 px-4">
              {/* Render the decoded Blog Content */}
              <div
                className="mb-8 text-lg md:text-xl blog-content font-medium text-gray-500"
                dangerouslySetInnerHTML={{ __html: data?.decodedContent || "" }}
              />
            </div>
          </div>
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{
              __html: JSON.stringify({
                "@context": "https://schema.org",
                "@type": "BlogPosting",
                mainEntityOfPage: {
                  "@type": "WebPage",
                  "@id": `https://prepsaway.com/blog/${data?.blog_perma}`, // Dynamic URL
                },
                headline: data?.blog_title, // Dynamic blog title
                description: data?.blog_summary, // Dynamic blog description
                image: data?.blog_image, // Dynamic blog image URL
                author: {
                  "@type": "Person",
                  name: data?.author_name || "Fread Benson", // Fallback if no author name
                },
                publisher: {
                  "@type": "Organization",
                  name: "Preps Away", // Static publisher name
                  logo: {
                    "@type": "ImageObject",
                    url: "https://prepsaway.com/img/prepsaway.png", // Static logo URL
                  },
                },
                datePublished: data?.blog_publish_date
                  ? new Date(data.blog_publish_date).toISOString()
                  : null, // Convert date to ISO 8601 format
                dateModified: data?.blog_last_updated
                  ? new Date(data.blog_last_updated).toISOString()
                  : data?.blog_publish_date
                  ? new Date(data.blog_publish_date).toISOString()
                  : null, // Fallback to publish date if no last updated date
              }),
            }}
          />
        </div>
      </section>
    </>
  );
};

export default SingleBlog;
