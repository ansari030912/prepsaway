/* eslint-disable @next/next/no-img-element */
"use client";
import { X_API_Key } from "@/app/URL's/Api_X_Key";
import { Base_URL } from "@/app/URL's/Base_URL";
import Link from "next/link";
import React, { useState, useEffect } from "react";

const BannerCard = () => {
  const [imageUrl, setImageUrl] = useState(null);

  useEffect(() => {
    const fetchBanner = async () => {
      try {
        const bannerResponse = await fetch(`${Base_URL}/v1/banner`, {
          headers: {
            "x-api-key": X_API_Key,
          },
          cache: "no-store",
        });
        const data = await bannerResponse.json();
        setImageUrl(data);
      } catch (error) {
        console.error("Error fetching banner:", error);
      }
    };

    fetchBanner();
  }, []);

  return (
    <div>
      <section className="pt-6 pb-6 px-6 bg-transparent">
        <Link
          href={imageUrl?.banner_link || "#"} // Fallback to "#" if banner_link is undefined
          className="flex justify-center mb-4"
        >
          <img
            src={imageUrl?.banner_src} // Fallback to a placeholder image
            alt={imageUrl?.banner_website} // Fallback alt text
          />
        </Link>
      </section>
    </div>
  );
};

export default BannerCard;
