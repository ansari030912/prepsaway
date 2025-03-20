export default async function sitemap() {
  const response = await fetch("https://certsgang.com/v1/sitemap/vendors", {
    headers: {
      "x-api-key": "b46279cb-13bb-4445-a6f9-6f252b61ae79",
    },
  });

  if (!response.ok) {
    throw new Error(`HTTP error! Status: ${response.status}`);
  }

  const data = await response.json();
  

  return data.map((item) => ({
    url: `https://prepsaway.com/exam-provider/${item.vendor_perma}`,
    lastModified: "2025-03-20",
    priority: 0.6,
  }));
}
