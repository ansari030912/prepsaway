"use client";
import loginAuth from "../auth/LoginAuth";
import RegisterPage from "../components/IndexPages/RegisterPage";

const page = () => {
  return <RegisterPage />;
};

export default loginAuth(page);
