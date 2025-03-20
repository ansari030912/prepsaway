/* eslint-disable react-hooks/exhaustive-deps */
"use client";
import { useEffect, useState } from "react";

function BackCountDown() {
  const initialDuration = 16 * 60 * 60 * 1000;
  const [duration, setDuration] = useState(initialDuration);

  const isLocalStorageAvailable =
    typeof window !== "undefined" && window.localStorage;

  const startTime =
    isLocalStorageAvailable && localStorage.getItem("countdownStartTime")
      ? parseInt(localStorage.getItem("countdownStartTime"))
      : new Date().getTime();

  const calculateRemainingTime = () => {
    const currentTime = new Date().getTime();
    let remainingTime = duration - (currentTime - startTime);

    if (remainingTime <= 0) {
      remainingTime = initialDuration;
      setDuration(initialDuration);
      isLocalStorageAvailable &&
        localStorage.setItem("countdownStartTime", currentTime.toString());
    }

    return remainingTime;
  };

  const [remainingTime, setRemainingTime] = useState(calculateRemainingTime());

  useEffect(() => {
    const timer = setInterval(() => {
      setRemainingTime(calculateRemainingTime());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const hours = Math.floor(remainingTime / (1000 * 60 * 60));
  const minutes = Math.floor((remainingTime % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((remainingTime % (1000 * 60)) / 1000);

  return (
    <span className="text-red-500">
      {hours}h {minutes}m {seconds}s
    </span>
  );
}

export default BackCountDown;
