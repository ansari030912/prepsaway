export default function robots() {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/profile"],
    },
    sitemap: "https://prepsaway.com/sitemap.xml",
    sitemap: "https://prepsaway.com/blogs-1/sitemap.xml",
  };
}
