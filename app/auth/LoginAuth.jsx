/* eslint-disable react-hooks/exhaustive-deps */
"use client";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function loginAuth(Component) {
  return function AuthenticatedComponent(props) {
    const router = useRouter();
    let loginResponse;

    if (typeof window !== "undefined") {
      loginResponse = JSON.parse(localStorage.getItem("loginResponse"));
    }

    useEffect(() => {
      if (loginResponse?.is_logged_in) {
        router.push("/profile/products");
      }
    }, [loginResponse, router]);

    if (!loginResponse?.is_logged_in) {
      return <Component {...props} />;
    }

    return null; 
  };
}
