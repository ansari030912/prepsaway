"use client";
import loginAuth from "../auth/LoginAuth";
import ResetForm from "../components/Forms/ResetForm";

const ResetPassword = () => {
  return <ResetForm />;
};

export default loginAuth(ResetPassword);
