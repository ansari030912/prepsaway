"use client";
import loginAuth from "../auth/LoginAuth";
import ForgotForm from "../components/Forms/ForgotForm";

const page = () => {
  return <ForgotForm />;
};

export default loginAuth(page);
