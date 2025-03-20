/* eslint-disable @next/next/no-img-element */
import React from "react";

const Loading = () => {
  return (
    <div className="loader-container flex justify-center items-center h-screen w-screen">
      <div className="loader flex justify-center items-center">
        <img
          src="https://i.gifer.com/ZKZg.gif"
          className="h-48"
          alt="Loading..."
        />
      </div>
    </div>
  );
};

export default Loading;
