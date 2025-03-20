/* eslint-disable react-hooks/exhaustive-deps */
"use client";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export const AuthGuard = ({ children }) => {
  const router = useRouter();
  const tokenExpired = (expiryTime) => {
    let expiredTimer;
    const currentTime = Date.now();
    const timeLeft = expiryTime - currentTime;
    clearTimeout(expiredTimer);
    expiredTimer = setTimeout(() => {
      alert("Token expired Please login again!");
      localStorage.removeItem("loginResponse");
      window.location.reload();
      router.push("/login");
    }, timeLeft);
  };

  useEffect(() => {
    const isLogin = JSON.parse(localStorage.getItem("loginResponse"));
    if (isLogin?.is_logged_in) {
      tokenExpired(isLogin?.expiryTime);
    }
  }, []);
  return children;
};

/* eslint-disable react-hooks/exhaustive-deps */
// "use client";
// import { useRouter } from "next/navigation";
// import { useEffect } from "react";

// export const AuthGuard = ({ children }) => {
//   const router = useRouter();

//   const tokenExpired = (expiryTime) => {
//     const currentTime = Date.now();
//     const timeLeft = expiryTime - currentTime;

//     if (timeLeft <= 0) {
//       handleTokenExpiry();
//     } else {
//       const expiredTimer = setTimeout(() => {
//         handleTokenExpiry();
//       }, timeLeft);

//       return () => clearTimeout(expiredTimer);
//     }
//   };

//   const handleTokenExpiry = () => {
//     alert("Token expired. Please login again!");
//     localStorage.removeItem("loginResponse");
//     router.push("/login");
//   };

//   useEffect(() => {
//     const loginResponse = JSON.parse(localStorage.getItem("loginResponse"));
//     if (loginResponse?.is_logged_in) {
//       tokenExpired(loginResponse?.expiryTime);
//     } else {
//       router.push("/login"); // Redirect if not logged in
//     }
//   }, []);

//   return children;
// };
