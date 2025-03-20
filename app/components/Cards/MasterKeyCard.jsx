"use client";
import { X_API_Key } from "@/app/URL's/Api_X_Key";
import { Base_URL } from "@/app/URL's/Base_URL";
import { Button, TextField } from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import BannerCard from "../banner/BannerCard";

const MasterKeyCard = ({ params }) => {
  const [masterKey, setMasterKey] = useState(null);
  const [message, setMessage] = useState(null);
  const [ip, setIp] = useState(null);
  const [status, setStatus] = useState(null); // Track the status of the response

  useEffect(() => {
    const fetchIp = async () => {
      try {
        const response = await fetch("/api/get-client-ip");
        const data = await response.json();
        setIp(data.ip);
      } catch (error) {
        console.error("Error fetching IP:", error);
      }
    };

    fetchIp();
  }, []);

  const fetchMasterKey = async (ipAddress) => {
    try {
      const response = await axios.post(
        `${Base_URL}/v1/te-activate-master`,
        {
          key1: params.key_1,
          key2: params.key_2,
          ip: ipAddress,
        },
        {
          headers: {
            "x-api-key": X_API_Key,
          },
        }
      );

      const data = response.data;
      setStatus(data.status);
      if (data.status) {
        setMasterKey(data.master_key);
        setMessage(
          "Master key generated successfully. Please copy it and paste it into the Test Engine where the master key activation option is available."
        );
      } else {
        setMessage(
          data.message || "An error occurred while generating the master key."
        );
      }
    } catch (error) {
      console.error("Error fetching master key:", error);
      setStatus(false);
      setMessage("An error occurred while generating the master key.");
    }
  };

  const handleGenerateKey = () => {
    if (ip) {
      fetchMasterKey(ip);
    }
  };

  const handleCopy = () => {
    if (masterKey) {
      navigator.clipboard.writeText(masterKey).then(
        () => {
          setStatus(true);
          setMessage("Master key copied to clipboard!");
        },
        (err) => {
          console.error("Failed to copy text: ", err);
        }
      );
    }
  };

  return (
    <>
      <BannerCard />
      <section style={{ minHeight: "30vh" }} className="pb-20 h-full">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl text-gray-800 font-bold">
            Get Master Key to Activate Test Engine File.
          </h2>
          {status !== true && (
            <button
              className="mt-4 bg-green-500 text-white px-3 py-2 rounded-lg"
              onClick={handleGenerateKey}
            >
              Generate Master Key
            </button>
          )}
          {masterKey && (
            <div>
              <TextField
                label="Master Key"
                value={masterKey}
                variant="outlined"
                fullWidth
                InputProps={{
                  readOnly: true,
                }}
                margin="normal"
              />
              <Button variant="outlined" color="secondary" onClick={handleCopy}>
                Copy to Clipboard
              </Button>
            </div>
          )}

          {status !== null && (
            <div
              role="alert"
              className={`mt-4 ${
                status
                  ? "bg-green-500 text-white font-bold rounded-t px-4 py-2"
                  : "bg-red-500 text-white font-bold rounded-t px-4 py-2"
              }`}
            >
              {status ? (
                <div>
                  <div className="flex py-2">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="1.5em"
                      height="1.5em"
                      viewBox="0 0 48 48"
                      className="flex-shrink-0"
                    >
                      <path
                        fill="none"
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="4"
                        d="m4 24l5-5l10 10L39 9l5 5l-25 25z"
                      />
                    </svg>
                    <div className="bg-green-500 text-white flex flex-col justify-center font-bold rounded-t px-2">
                      Master Activation Key Generated
                    </div>
                  </div>
                  <div className="border border-t-0 border-green-400 rounded-b bg-green-100 px-4 py-3 text-green-700">
                    <p>{message}</p>
                  </div>
                </div>
              ) : (
                <div>
                  <div className="flex py-2">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="1.5em"
                      height="1.5em"
                      viewBox="0 0 16 16"
                      className="flex-shrink-0"
                    >
                      <path
                        fill="currentColor"
                        fillRule="evenodd"
                        d="m7.493.015l-.386.04c-1.873.187-3.76 1.153-5.036 2.579C.66 4.211-.057 6.168.009 8.253c.115 3.601 2.59 6.65 6.101 7.518a8.03 8.03 0 0 0 6.117-.98a8 8 0 0 0 3.544-4.904c.172-.701.212-1.058.212-1.887s-.04-1.186-.212-1.887C14.979 2.878 12.315.498 9 .064C8.716.027 7.683-.006 7.493.015m1.36 1.548a6.5 6.5 0 0 1 3.091 1.271c.329.246.976.893 1.222 1.222c.561.751.976 1.634 1.164 2.479a6.8 6.8 0 0 1 0 2.93c-.414 1.861-1.725 3.513-3.463 4.363a6.8 6.8 0 0 1-1.987.616c-.424.065-1.336.065-1.76 0c-1.948-.296-3.592-1.359-4.627-2.993a7.5 7.5 0 0 1-.634-1.332A6.2 6.2 0 0 1 1.514 8c0-1.039.201-1.925.646-2.84c.34-.698.686-1.18 1.253-1.747A6 6 0 0 1 5.16 2.16a6.45 6.45 0 0 1 3.693-.597M7.706 4.29c-.224.073-.351.201-.413.415c-.036.122-.04.401-.034 2.111c.008 1.97.008 1.971.066 2.08a.7.7 0 0 0 .346.308c.132.046.526.046.658 0a.7.7 0 0 0 .346-.308c.058-.109.058-.11.066-2.08c.008-2.152.008-2.154-.145-2.335c-.124-.148-.257-.197-.556-.205a1.7 1.7 0 0 0-.334.014m.08 6.24a.86.86 0 0 0-.467.402a.85.85 0 0 0-.025.563A.78.78 0 0 0 8 12c.303 0 .612-.22.706-.505a.85.85 0 0 0-.025-.563a.95.95 0 0 0-.348-.352c-.116-.06-.429-.089-.547-.05"
                      />
                    </svg>
                    <div className="bg-red-500 text-white flex flex-col justify-center font-bold rounded-t px-2">
                      Master Activation Key Error
                    </div>
                  </div>
                  <div className="border border-t-0 border-red-400 rounded-b bg-red-100 px-4 py-3 text-red-700">
                    <p>{message}</p>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </section>
    </>
  );
};

export default MasterKeyCard;
