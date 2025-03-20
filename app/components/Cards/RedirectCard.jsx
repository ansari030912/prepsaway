"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

const RedirectCard = ({ examData }) => {
  const router = useRouter();

  useEffect(() => {
    if (
      examData?.exam_title === "" ||
      examData?.exam_title === null ||
      examData?.exam_title === undefined
    ) {
      // Redirect if exam_title is invalid
      router.push("/");
    }
  }, [examData, router]);

  return null; // Render nothing if data is valid
};

export default RedirectCard;
