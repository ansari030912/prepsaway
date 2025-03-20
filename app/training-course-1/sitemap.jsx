import { X_API_Key } from "../URL's/Api_X_Key";
import { Base_URL } from "../URL's/Base_URL";

export default async function sitemap() {
  const response = await fetch(`${Base_URL}/v1/sitemap/courses`, {
    headers: {
      "x-api-key": X_API_Key,
    },
    cache: "no-store",
  });

  if (!response.ok) {
    throw new Error(`HTTP error! Status: ${response.status}`);
  }

  const data = await response.json();

  return data.map((item) => ({
    url: `https://prepsaway.com/training-course/${item.course_perma}`,
    lastModified: "2025-03-20",
    priority: 0.6,
  }));
}
