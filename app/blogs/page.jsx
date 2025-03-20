import BannerCard from "../components/banner/BannerCard";
import AllBlogs from "../components/BlogPosts/AllBlogs";
import { X_API_Key } from "../URL's/Api_X_Key";
import { Base_URL } from "../URL's/Base_URL";

const page = async () => {
  const response = await fetch(`${Base_URL}/v1/blogs`, {
    headers: {
      "x-api-key": X_API_Key,
    },
    // Ensures fresh data is fetched
  });

  const data = await response.json();
  return (
    <>
      <BannerCard />
      <AllBlogs data={data} />
    </>
  );
};

export default page;
export async function generateMetadata() {
  return {
    title: `Preps Away delivers 100% accurate exam questions.`,
    description: ``,
    robots: {
      index: true,
    },
    alternates: {
      canonical: "https://prepsaway.com/blogs",
    },
  };
}
