"use client";
import loginAuth from "../auth/LoginAuth";
import LoginPage from "../components/IndexPages/LoginPage";

const page = () => {
  return <LoginPage />;
};

export default loginAuth(page);
