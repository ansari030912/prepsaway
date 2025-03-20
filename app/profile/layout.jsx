"use client";
import withAuth from "../auth/RouterAuth";

const layout = ({ children }) => {
  return children;
};

export default withAuth(layout);
