/* eslint-disable react-hooks/exhaustive-deps */
"use client";
import { Container } from "@mui/material";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function NotFound() {
  const router = useRouter();

  useEffect(() => {
    const redirectHome = setTimeout(() => {
      router.replace("/");
    }, 0); // Redirect immediately

    return () => clearTimeout(redirectHome);
  }, []); // Run only once on component mount

  return (
    <Container
      sx={{
        display: "flex",
        justifyContent: "center",
        height: "100vh",
        alignItems: "center",
        backgroundImage: `url('/pattern-white.png')`,
      }}
    >
      <section className="py-24 md:py-32" style={{}}>
        <div className="container px-4 mx-auto">
          <div className="max-w-sm mx-auto">
            <div className="mb-6 text-center">
              <h3 className="mb-4 text-2xl md:text-3xl font-bold">
                PREPSAWAY.COM
              </h3>
              <p className="text-lg text-coolGray-500 font-medium">
                404 | Page Not Found
              </p>
            </div>
          </div>
        </div>
      </section>
    </Container>
  );
}
