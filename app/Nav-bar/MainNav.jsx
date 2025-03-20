"use client";
/* eslint-disable @next/next/no-img-element */
import { Avatar, Card, IconButton } from "@mui/material";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Base_URL } from "../URL's/Base_URL";
import { X_API_Key } from "../URL's/Api_X_Key";

const MainNav = () => {
  const router = useRouter();
  const [isNavVisible, setIsNavVisible] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [showVendors, setShowVendors] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [loginResponse, setLoginResponse] = useState(null);
  const [cartResponce, setCartResponce] = useState(null);
  const [searchData, setSearchData] = useState([]);
  const [vendorData, setVendorData] = useState([]);
  const [certificationData, setCertificationData] = useState([]);
  const [searchValue, setSearchValue] = useState("");

  const handleSignOut = () => {
    localStorage.removeItem("loginResponse");
    window.location.reload();
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${Base_URL}/v1/coupons`, {
          headers: {
            "x-api-key": X_API_Key,
          },
        });
        localStorage.setItem("coupons", JSON.stringify(response.data));
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    if (typeof localStorage !== "undefined") {
      const storedLoginResponse = localStorage.getItem("loginResponse");
      if (storedLoginResponse) {
        setLoginResponse(JSON.parse(storedLoginResponse));
      }
    }
    if (typeof localStorage !== "undefined") {
      const storedLoginResponse = localStorage.getItem("CartProducts");
      if (storedLoginResponse) {
        setCartResponce(JSON.parse(storedLoginResponse));
      }
    }
  }, []);

  const truncatedEmail =
    loginResponse?.email?.length > 10
      ? `${loginResponse?.email?.slice(0, 10)}...`
      : loginResponse?.email;
  const truncatedName =
    loginResponse?.name?.length > 12
      ? `${loginResponse?.name?.slice(0, 12)}...`
      : loginResponse?.name;

  const toggleNav = () => {
    setIsNavVisible(!isNavVisible);
  };

  const closeNav = () => {
    setIsNavVisible(false);
  };

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const normalizeSearchValue = (value) => {
    return value?.replace(/[^a-zA-Z0-9]/g, "").toLowerCase();
  };

  const handleSearch = (value) => {
    setSearchValue(value);
    router.push("#");
  };

  const filteredData = searchData
    .filter((item) => {
      const normalizedCode = normalizeSearchValue(item.code);
      const normalizedSearchValue = normalizeSearchValue(searchValue);
      return normalizedCode?.includes(normalizedSearchValue);
    })
    .slice(0, 30);

  const filteredVendors = vendorData
    .filter((item) => {
      const normalizedSlug = normalizeSearchValue(item.title);
      const normalizedSearchValue = normalizeSearchValue(searchValue);
      return normalizedSlug?.includes(normalizedSearchValue);
    })
    .slice(0, 10);

  const filteredCertifications = certificationData
    .filter((item) => {
      const normalizedSlug = normalizeSearchValue(item.name);
      const normalizedSearchValue = normalizeSearchValue(searchValue);
      return normalizedSlug?.includes(normalizedSearchValue);
    })
    .slice(0, 10);

  const handleExamPage = (exam) => {
    router.push(`/exam-questions/${exam.v_perma}/${exam.perma}`);
    setSearchValue("");
  };
  const handleVendorPage = (exam) => {
    router.push(`/exam-provider/${exam}`);
    setSearchValue("");
  };
  const handleCertificationPage = (exam) => {
    router.push(`/vendor-exam-questions/${exam.v_perma}/${exam.perma}`);
    setSearchValue("");
  };

  const fetchData = async () => {
    try {
      if (typeof window !== "undefined" && window.localStorage) {
        const storedExamData = localStorage.getItem("searchData");
        if (storedExamData) {
          setSearchData(JSON.parse(storedExamData));
        } else {
          const examResponse = await axios.get(`${Base_URL}/v1/search/exams`, {
            headers: {
              "x-api-key": X_API_Key, // Replace 'your-api-key-here' with your actual API key
            },
          });
          setSearchData(examResponse.data);
          localStorage.setItem("searchData", JSON.stringify(examResponse.data));
        }

        const storedVendorData = localStorage.getItem("vendorData");
        if (storedVendorData) {
          setVendorData(JSON.parse(storedVendorData));
        } else {
          const vendorResponse = await axios.get(
            `${Base_URL}/v1/search/vendors`,
            {
              headers: {
                "x-api-key": X_API_Key, // Replace 'your-api-key-here' with your actual API key
              },
            }
          );
          setVendorData(vendorResponse.data);
          localStorage.setItem(
            "vendorData",
            JSON.stringify(vendorResponse.data)
          );
        }

        const storedCertificationData =
          localStorage.getItem("certificationData");
        if (storedCertificationData) {
          setCertificationData(JSON.parse(storedCertificationData));
        } else {
          const certificationResponse = await axios.get(
            `${Base_URL}/v1/search/certifications`,
            {
              headers: {
                "x-api-key": X_API_Key, // Replace 'your-api-key-here' with your actual API key
              },
            }
          );
          setCertificationData(certificationResponse.data);
          localStorage.setItem(
            "certificationData",
            JSON.stringify(certificationResponse.data)
          );
        }
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <>
      <section className="overflow-hidden">
        <div>
          <div className="px-4 py-5 2xl:py-0 bg-white border-b border-gray-100">
            <div className="flex items-center justify-between -m-2 ">
              <div className="flex flex-wrap items-center w-auto p-2">
                <Link className="block max-w-max 2xl:mr-2" href="/">
                  <img
                    src="/img/prepsaway.png"
                    alt=""
                    className="h-7"
                  />
                </Link>
                <ul className="hidden 2xl:flex flex-nowrap">
                  <li className="mr-3">
                    <Link href={"/exam-providers"}>
                      <Link
                        className="flex flex-wrap items-center py-6 text-sm font-medium text-gray-700 hover:text-green-500 border-b-2 border-transparent hover:border-green-500"
                        href="/exam-providers"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="2em"
                          height="1.8em"
                          viewBox="0 0 24 24"
                        >
                          <g fill="none">
                            <path
                              fill="currentColor"
                              d="m15 22l-.555.832A1 1 0 0 0 16 22zm-3-2l.555-.832a1 1 0 0 0-1.11 0zm-3 2H8a1 1 0 0 0 1.555.832zM8.75 3.537l-.08.997zm1.685-.697l-.762-.648zM6.532 5.686l-.997.08zm2.154-2.154l.08-.997zM5.84 7.435l.648.761zm.697-1.684l.997-.08zm-.747 4.772l-.648.762zm0-3.046l-.648-.762zm.747 4.772l-.997-.08zm-.697-1.684l.648-.761zm2.846 3.903l.08.997zm-2.154-2.154l.997.08zm3.903 2.846l.761-.648zm-1.684-.697l-.08-.997zm4.772.747l.762.648zm-3.046 0l-.762.648zm4.772-.747l.08-.997zm-1.684.697l-.761-.648zm3.903-2.846l.997-.08zm-2.154 2.154l-.08.997zm2.846-3.903l.648.762zm-.697 1.684l-.997.08zm.747-4.772l.648-.762zm0 3.046l-.648-.761zm-.747-4.772l-.997-.08zm.697 1.684l-.648.761zm-2.846-3.903l-.08-.997zm2.154 2.154l.997.08zM13.565 2.84l.762-.648zm1.684.697l.08.997zm-1.726-.747l-.761.648zm-3.046 0l.761.648zM9 14.458l.044-.999zm6.555 6.71l-3-2l-1.11 1.664l3 2zm-4.11-2l-3 2l1.11 1.664l3-2zm1.317-15.73l.042.05l1.523-1.296l-.042-.05zm2.567 1.096l.065-.005l-.16-1.994l-.065.005zm1.142 1.072l-.005.065l1.994.16l.005-.065zm1.041 2.59l.05.042l1.296-1.523l-.05-.042zm.05 1.566l-.05.042l1.296 1.523l.05-.042zm-1.096 2.567l.005.065l1.994-.16l-.005-.065zm-1.072 1.142l-.065-.005l-.16 1.994l.065.005zm-2.59 1.041l-.042.05l1.523 1.296l.042-.05zm-1.566.05l-.042-.05l-1.523 1.296l.042.05zm-2.567-1.096l-.065.005l.16 1.994l.065-.005zm-1.142-1.072l.005-.065l-1.994-.16l-.005.065zm-1.041-2.59l-.05-.042l-1.296 1.523l.05.042zm-.05-1.566l.05-.042l-1.296-1.523l-.05.042zm1.096-2.567l-.005-.065l-1.994.16l.005.065zm1.072-1.142l.065.005l.16-1.994l-.065-.005zm2.59-1.041l.042-.05l-1.523-1.296l-.042.05zM8.671 4.534a3 3 0 0 0 2.525-1.046L9.673 2.192a1 1 0 0 1-.842.348zM7.529 5.606a1 1 0 0 1 1.077-1.077l.16-1.994a3 3 0 0 0-3.23 3.231zm-1.041 2.59a3 3 0 0 0 1.046-2.525l-1.994.16a1 1 0 0 1-.348.842zm-.05 1.566a1 1 0 0 1 0-1.524L5.142 6.715a3 3 0 0 0 0 4.57zm1.096 2.567a3 3 0 0 0-1.046-2.525l-1.296 1.523a1 1 0 0 1 .348.842zm1.072 1.142a1 1 0 0 1-1.077-1.077l-1.994-.16a3 3 0 0 0 3.231 3.23zm4.156 1.09a1 1 0 0 1-1.524 0l-1.523 1.297a3 3 0 0 0 4.57 0zm3.71-2.167a1 1 0 0 1-1.078 1.077l-.16 1.994a3 3 0 0 0 3.23-3.231zm1.04-2.59a3 3 0 0 0-1.046 2.525l1.994-.16a1 1 0 0 1 .348-.842zm.05-1.566a1 1 0 0 1 0 1.524l1.296 1.523a3 3 0 0 0 0-4.57zm-1.096-2.567a3 3 0 0 0 1.046 2.525l1.296-1.523a1 1 0 0 1-.348-.842zm-1.072-1.142a1 1 0 0 1 1.077 1.077l1.994.16a3 3 0 0 0-3.231-3.23zm-2.59-1.041a3 3 0 0 0 2.525 1.046l-.16-1.994a1 1 0 0 1-.842-.348zm1.48-1.346a3 3 0 0 0-4.569 0l1.523 1.296a1 1 0 0 1 1.524 0zm-3.088 12.37a3 3 0 0 0-2.152-1.053l-.088 1.998a1 1 0 0 1 .717.351zM9.044 13.46a3.011 3.011 0 0 0-.373.007l.16 1.994a1 1 0 0 1 .125-.003zM10 22v-7.542H8V22zm5.33-8.534a3.012 3.012 0 0 0-.374-.007l.088 1.998a1 1 0 0 1 .125.003zm-.374-.007a3 3 0 0 0-2.152 1.053l1.523 1.296a1 1 0 0 1 .717-.35zm-.956 1V22h2v-7.542z"
                            />
                            <path
                              stroke="currentColor"
                              stroke-linecap="round"
                              stroke-linejoin="round"
                              stroke-width="2"
                              d="m14 8l-3 3l-1-1"
                            />
                          </g>
                        </svg>
                        <p className="text-gray-600 font-bold">
                          Vendors & Certifications
                        </p>
                      </Link>
                    </Link>
                  </li>
                  <li className="relative group mr-3">
                    <Link href={"/video-courses"}>
                      <span className="flex items-center py-6 text-sm font-medium text-gray-700 hover:text-green-500 border-b-2 border-transparent hover:border-green-500 cursor-pointer">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="2em"
                          height="1.8em"
                          viewBox="0 0 24 24"
                          style={{ marginRight: "2px" }}
                        >
                          <path
                            fill="currentColor"
                            d="M19.173 21h-4.961q-.348 0-.588-.24q-.24-.239-.24-.587v-4.961q0-.348.24-.588t.588-.24h4.961q.348 0 .588.24q.239.24.239.588v1.654l1.654-1.654v4.961L20 18.519v1.654q0 .348-.24.588q-.239.239-.587.239m-7.2-11.5q-1.046 0-1.773.727T9.473 12q0 .796.416 1.408q.415.611 1.111.903v-1.134q-.238-.2-.383-.532T10.473 12q0-.625.438-1.062t1.062-.438t1.06.438t.434 1.062h1.006q0-1.046-.727-1.773T11.973 9.5M10.134 21l-.361-2.892q-.479-.145-1.035-.454q-.557-.31-.947-.664l-2.668 1.135l-1.865-3.25l2.306-1.739q-.045-.27-.073-.558q-.03-.288-.03-.559q0-.252.03-.53q.028-.278.073-.626L3.258 9.126l1.865-3.212L7.771 7.03q.448-.373.97-.673q.52-.3 1.013-.464L10.134 3h3.732l.361 2.912q.575.202 1.016.463t.909.654l2.725-1.115l1.865 3.211l-2.382 1.796q.082.31.092.569t.01.51h-1.039q-.006-.436-.056-.77t-.15-.697l2.227-1.683l-.994-1.7l-2.552 1.07q-.454-.499-1.193-.935q-.74-.435-1.4-.577L13 4h-1.994l-.312 2.689q-.756.161-1.39.52q-.633.358-1.26.985L5.55 7.15l-.994 1.7l2.169 1.62q-.125.336-.175.73t-.05.82q0 .38.05.755t.156.73l-2.15 1.645l.994 1.7l2.475-1.05q.6.606 1.36 1.002t1.615.579V21z"
                          />
                        </svg>
                        <p className="text-gray-600 font-bold">Video Course</p>
                      </span>
                    </Link>
                  </li>
                  <li className="relative group mr-3">
                    <Link href={"/unlimited-access"}>
                      <span className="flex items-center py-6 text-sm font-medium text-gray-700 hover:text-green-500 border-b-2 border-transparent hover:border-green-500 cursor-pointer">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="2em"
                          height="1.8em"
                          viewBox="0 0 48 48"
                          style={{ marginRight: "2px" }}
                        >
                          <path
                            fill="none"
                            stroke="currentColor"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            d="m24 18.011l7.041 7.04L24 32.092l-7.041-7.041z"
                          />
                          <path
                            fill="none"
                            stroke="currentColor"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            d="m21.898 9.452l15.599 15.599L24 38.548L10.503 25.051l7.034-7.033"
                          />
                          <path
                            fill="none"
                            stroke="currentColor"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            d="m21.898 3l22.051 22.051L24 45L4.051 25.051l7.034-7.033"
                          />
                        </svg>
                        <p className="text-gray-600 font-bold">
                          Unlimited Access
                        </p>
                      </span>
                    </Link>
                  </li>
                  <li className="relative group mr-3">
                    <Link href={"/test-engine-simulator"}>
                      <span className="flex items-center py-6 text-sm font-medium text-gray-700 hover:text-green-500 border-b-2 border-transparent hover:border-green-500 cursor-pointer">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="2em"
                          height="1.8em"
                          viewBox="0 0 32 32"
                          style={{ marginRight: "2px" }}
                        >
                          <path
                            fill="currentColor"
                            d="M31 22v-2h-2.1a5 5 0 0 0-.733-1.753l1.49-1.49l-1.414-1.414l-1.49 1.49A5 5 0 0 0 25 16.101V14h-2v2.101a5 5 0 0 0-1.753.732l-1.49-1.49l-1.414 1.414l1.49 1.49A5 5 0 0 0 19.1 20H17v2h2.1c.13.637.384 1.229.732 1.753l-1.49 1.49l1.414 1.414l1.49-1.49A5 5 0 0 0 23 25.9V28h2v-2.1a5 5 0 0 0 1.753-.732l1.49 1.49l1.414-1.414l-1.49-1.49A5 5 0 0 0 28.9 22zm-7 2a3 3 0 1 1 0-6a3 3 0 0 1 0 6"
                          />
                          <path
                            fill="currentColor"
                            d="M21 6c0-2.757-2.243-5-5-5c-1.78 0-3.439.958-4.33 2.5a5.2 5.2 0 0 0-.63 1.794A6.96 6.96 0 0 0 7 4c-3.86 0-7 3.14-7 7a7 7 0 0 0 3.779 6.208C2.7 18.126 2 19.476 2 21c0 2.757 2.243 5 5 5c.734 0 1.427-.168 2.055-.454C9.332 28.043 11.43 30 14 30a4.97 4.97 0 0 0 3.536-1.464l-1.415-1.415A2.98 2.98 0 0 1 14 28c-1.654 0-3-1.346-3-3s1.346-3 3-3v-2c-.735 0-1.427.169-2.055.454a5 5 0 0 0-1.722-3.246A7 7 0 0 0 14 11c0-.147-.014-.291-.023-.436c.62.276 1.302.436 2.023.436c2.757 0 5-2.243 5-5m-7.6-1.5A3.01 3.01 0 0 1 16 3c1.654 0 3 1.346 3 3s-1.346 3-3 3s-3-1.346-3-3h-.03c.036-.576.172-1.052.43-1.5M10 21c0 1.654-1.346 3-3 3s-3-1.346-3-3s1.346-3 3-3s3 1.346 3 3m-3-5c-2.757 0-5-2.243-5-5s2.243-5 5-5s5 2.243 5 5s-2.243 5-5 5"
                          />
                        </svg>
                        <p className="text-gray-600 font-bold">Test Engine</p>
                      </span>
                    </Link>
                  </li>
                  <li className="relative group">
                    <Link href={"/blogs"}>
                      <span className="flex items-center py-6 text-sm font-medium text-gray-700 hover:text-green-500 border-b-2 border-transparent hover:border-green-500 cursor-pointer">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="1.7em"
                          height="1.7em"
                          viewBox="0 0 24 24"
                          style={{ marginRight: "2px" }}
                        >
                          <path
                            fill="none"
                            stroke="currentColor"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            stroke-width="2"
                            d="M8 15h8M8 9h4m7 0q-1 0-1-1a6 6 0 0 0-6-6H8a6 6 0 0 0-6 6v8a6 6 0 0 0 6 6h8a6 6 0 0 0 6-6v-5a2 2 0 0 0-2-2Z"
                          />
                        </svg>
                        <p className="text-gray-600 font-bold pl-0.5">Blogs</p>
                      </span>
                    </Link>
                  </li>
                </ul>
              </div>
              <div className="w-auto p-2">
                <div className="hidden 2xl:flex flex-wrap items-center -m-3">
                  <div className="w-auto p-2 flex">
                    {searchOpen && (
                      <input
                        className="appearance-none px-6 py-3 w-full text-sm text-gray-700 font-bold bg-gray-50 placeholder-gray-300 outline-none border border-gray-100 focus:ring-1 focus:ring-gray-100 rounded-full"
                        id="formInput1-1"
                        type="text"
                        placeholder="Search..."
                        value={searchValue}
                        onChange={(e) => {
                          const { value } = e.target;
                          handleSearch(value);
                        }}
                      />
                    )}
                  </div>
                  <IconButton
                    className="px-2 ml-2"
                    onClick={() => {
                      setSearchOpen(!searchOpen);
                      setSearchValue("");
                    }}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="1em"
                      height="1em"
                      viewBox="0 0 24 24"
                    >
                      <path
                        fill="currentColor"
                        d="M15.5 14h-.79l-.28-.27A6.471 6.471 0 0 0 16 9.5A6.5 6.5 0 1 0 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5S14 7.01 14 9.5S11.99 14 9.5 14"
                      />
                    </svg>
                  </IconButton>
                  <div className="w-auto p-3">
                    <Link
                      className="flex items-center py-6 text-sm font-medium text-gray-700 hover:text-green-500 border-b-2 border-transparent hover:border-green-500 cursor-pointer"
                      href="/cart"
                    >
                      <div className="text-base  ">
                        <span
                          style={{
                            paddingLeft: "8px",
                            paddingRight: "8px",
                            paddingBottom: "2px",
                          }}
                          className="rounded-full bg-green-500 text-white"
                        >
                          {cartResponce ? cartResponce?.length : "0"}
                        </span>
                      </div>
                      <p className="text-lg ml-1 text-gray-600 font-medium">
                        Cart
                      </p>
                    </Link>
                  </div>

                  <div className="w-auto p-3">
                    {!loginResponse?.is_logged_in ? (
                      <>
                        <Link href={"/login"}>
                          <b
                            style={{
                              padding: "10px",
                            }}
                            className="hover:text-white  hover:border-gray-700 border-gray-700 border-2 text-gray-700 hover:bg-gray-700"
                          >
                            Log In
                          </b>
                        </Link>
                        <Link
                          href={"/register"}
                          style={{
                            padding: "10px",
                            marginLeft: "4px",
                          }}
                          className="hover:text-gray-700 bg-gray-700 border-gray-700 border-2 text-white hover:bg-white"
                        >
                          <b>Register Now</b>
                        </Link>
                      </>
                    ) : (
                      <div className="flex flex-wrap items-center -m-2">
                        <div className="w-auto p-2">
                          <div className="flex flex-wrap -m-2">
                            <div className="w-auto cursor-pointer p-2 -mr-1">
                              <img
                                src="/avatar.png"
                                height={"45px"}
                                width={"45px"}
                                alt=""
                                onClick={toggleDropdown}
                              />
                            </div>
                            <div className="w-auto p-2">
                              <h2 className="text-sm font-semibold text-gray-700">
                                {truncatedName}
                              </h2>
                              <p className="text-sm font-medium text-gray-500">
                                {truncatedEmail}
                              </p>
                            </div>
                          </div>
                        </div>
                        <div
                          className="w-auto p-2 cursor-pointer"
                          onClick={toggleDropdown}
                        >
                          <span className="block max-w-max text-gray-500 hover:text-gray-600">
                            <svg
                              width="24"
                              height="24"
                              viewBox="0 0 24 24"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                d="M17 9.17C16.8126 8.98375 16.5592 8.87921 16.295 8.87921C16.0308 8.87921 15.7774 8.98375 15.59 9.17L12 12.71L8.46001 9.17C8.27265 8.98375 8.0192 8.87921 7.75501 8.87921C7.49082 8.87921 7.23737 8.98375 7.05001 9.17C6.95628 9.26297 6.88189 9.37357 6.83112 9.49543C6.78035 9.61729 6.75421 9.74799 6.75421 9.88C6.75421 10.012 6.78035 10.1427 6.83112 10.2646C6.88189 10.3864 6.95628 10.497 7.05001 10.59L11.29 14.83C11.383 14.9237 11.4936 14.9981 11.6154 15.0489C11.7373 15.0997 11.868 15.1258 12 15.1258C12.132 15.1258 12.2627 15.0997 12.3846 15.0489C12.5064 14.9981 12.617 14.9237 12.71 14.83L17 10.59C17.0937 10.497 17.1681 10.3864 17.2189 10.2646C17.2697 10.1427 17.2958 10.012 17.2958 9.88C17.2958 9.74799 17.2697 9.61729 17.2189 9.49543C17.1681 9.37357 17.0937 9.26297 17 9.17Z"
                                fill="currentColor"
                              ></path>
                            </svg>
                          </span>
                        </div>
                      </div>
                    )}
                    {isOpen && (
                      <div
                        style={{ borderRadius: "4px", zIndex: 1000 }}
                        className="border absolute bg-white border-gray-300 w-85 mt-3 text-nowrap"
                      >
                        <div className="p-2">
                          <h2 className="text-sm font-semibold text-gray-700">
                            {loginResponse?.name}
                          </h2>
                          <p className="text-sm font-medium text-gray-500">
                            {loginResponse?.email}
                          </p>
                        </div>
                        <hr />
                        <ul className="m-2">
                          <Link href={"/profile/products"}>
                            <li className="px-1 py-2 font-semibold hover:bg-gray-100 hover:text-green-500 cursor-pointer">
                              Products
                            </li>
                          </Link>
                          <Link href={"/profile/invoices"}>
                            <li className="px-1 py-2 font-semibold hover:bg-gray-100 hover:text-green-500 cursor-pointer">
                              Invoice
                            </li>
                          </Link>
                          <Link href={"/profile/setting"}>
                            <li className="px-1 py-2 font-semibold hover:bg-gray-100 hover:text-green-500 cursor-pointer">
                              Setting
                            </li>
                          </Link>
                          <Link href={"/profile/download-history"}>
                            <li className="px-1 py-2 font-semibold hover:bg-gray-100 hover:text-green-500 cursor-pointer">
                              Download History
                            </li>
                          </Link>
                          <Link href={"/profile/login-history"}>
                            <li className="px-1 py-2 font-semibold hover:bg-gray-100 hover:text-green-500 cursor-pointer">
                              Login History
                            </li>
                          </Link>
                          <hr />
                          <li
                            onClick={handleSignOut}
                            className="px-1 py-2 font-semibold hover:bg-gray-100 hover:text-green-500 cursor-pointer"
                          >
                            Logout
                          </li>
                        </ul>
                      </div>
                    )}
                  </div>
                </div>
                {!isNavVisible && (
                  <>
                    <div className="flex">
                      <span className="2xl:hidden">
                        <IconButton
                          className="px-2 ml-2 2xl:hidden"
                          onClick={() => {
                            setSearchOpen(!searchOpen);
                            setSearchValue("");
                          }}
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="1em"
                            height="1em"
                            viewBox="0 0 24 24"
                          >
                            <path
                              fill="currentColor"
                              d="M15.5 14h-.79l-.28-.27A6.471 6.471 0 0 0 16 9.5A6.5 6.5 0 1 0 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5S14 7.01 14 9.5S11.99 14 9.5 14"
                            />
                          </svg>
                        </IconButton>
                      </span>
                      <button
                        onClick={toggleNav}
                        className="navbar-burger self-center ml-auto block 2xl:hidden"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="2em"
                          height="2em"
                          viewBox="0 0 24 24"
                        >
                          <path
                            fill="#4B5563"
                            d="M4 18h16c.55 0 1-.45 1-1s-.45-1-1-1H4c-.55 0-1 .45-1 1s.45 1 1 1m0-5h16c.55 0 1-.45 1-1s-.45-1-1-1H4c-.55 0-1 .45-1 1s.45 1 1 1M3 7c0 .55.45 1 1 1h16c.55 0 1-.45 1-1s-.45-1-1-1H4c-.55 0-1 .45-1 1"
                          />
                        </svg>
                      </button>
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>
          <div
            className={
              isNavVisible
                ? "navbar-menu z-50 fixed top-0 flex 2xl:hidden flex-col justify-between bg-white max-w-xs w-11/12 h-full overflow-y-auto custom-scrollbar"
                : "navbar-menu z-50 fixed top-0 hidden 2xl:hidden flex-col justify-between bg-white max-w-xs w-9/12 h-full overflow-y-auto custom-scrollbar"
            }
          >
            <div className="navbar-backdrop fixed 2xl:hidden inset-0 bg-white opacity-60"></div>
            <div className="relative bg-white flex-1 boLink-gray-700 border-b">
              <div className="fixed flex justify-between -left-1 p-4 pl-6 -my-4  max-w-xs w-11/12 z-50 bg-gray-50">
                <span className="block mt-5  max-w-max" href="#">
                  <img
                    src="/img/prepsaway.png"
                    alt=""
                    height={"170px"}
                    width={"170px"}
                  />
                </span>

                <div className="w-auto pr-3 pt-1 -mb-2">
                  <button
                    onClick={closeNav}
                    className="text-gray-500 hover:text-gray-600 -mr-4 mt-3"
                    href="#"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="1.6em"
                      height="1.6em"
                      viewBox="0 0 24 24"
                    >
                      <g fill="none" fill-rule="evenodd">
                        <path d="M24 0v24H0V0zM12.593 23.258l-.011.002l-.071.035l-.02.004l-.014-.004l-.071-.035c-.01-.004-.019-.001-.024.005l-.004.01l-.017.428l.005.02l.01.013l.104.074l.015.004l.012-.004l.104-.074l.012-.016l.004-.017l-.017-.427c-.002-.01-.009-.017-.017-.018m.265-.113l-.013.002l-.185.093l-.01.01l-.003.011l.018.43l.005.012l.008.007l.201.093c.012.004.023 0 .029-.008l.004-.014l-.034-.614c-.003-.012-.01-.02-.02-.022m-.715.002a.023.023 0 0 0-.027.006l-.006.014l-.034.614c0 .012.007.02.017.024l.015-.002l.201-.093l.01-.008l.004-.011l.017-.43l-.003-.012l-.01-.01z" />
                        <path
                          fill="#4B5563"
                          d="m12 14.122l5.303 5.303a1.5 1.5 0 0 0 2.122-2.122L14.12 12l5.304-5.303a1.5 1.5 0 1 0-2.122-2.121L12 9.879L6.697 4.576a1.5 1.5 0 1 0-2.122 2.12L9.88 12l-5.304 5.304a1.5 1.5 0 1 0 2.122 2.12z"
                        />
                      </g>
                    </svg>
                  </button>
                </div>
              </div>

              <div className="mt-20 custom-scrollbar">
                <p className="px-8 mb-2 text-xs font-medium text-gray-500 uppercase">
                  Main menu
                </p>
                <ul className="px-4 mb-8">
                  <li>
                    <span
                      className={
                        showVendors
                          ? "p-3 py-4 flex items-center justify-between text-green-500 bg-gray-100 rounded-md"
                          : "p-3 py-4 flex items-center justify-between text-gray-700 hover:text-green-500 hover:bg-gray-100 rounded-md"
                      }
                      onClick={() => setShowVendors(!showVendors)}
                    >
                      <div className="flex items-center">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="2em"
                          height="1.8em"
                          viewBox="0 0 24 24"
                        >
                          <g fill="none">
                            <path
                              fill="currentColor"
                              d="m15 22l-.555.832A1 1 0 0 0 16 22zm-3-2l.555-.832a1 1 0 0 0-1.11 0zm-3 2H8a1 1 0 0 0 1.555.832zM8.75 3.537l-.08.997zm1.685-.697l-.762-.648zM6.532 5.686l-.997.08zm2.154-2.154l.08-.997zM5.84 7.435l.648.761zm.697-1.684l.997-.08zm-.747 4.772l-.648.762zm0-3.046l-.648-.762zm.747 4.772l-.997-.08zm-.697-1.684l.648-.761zm2.846 3.903l.08.997zm-2.154-2.154l.997.08zm3.903 2.846l.761-.648zm-1.684-.697l-.08-.997zm4.772.747l.762.648zm-3.046 0l-.762.648zm4.772-.747l.08-.997zm-1.684.697l-.761-.648zm3.903-2.846l.997-.08zm-2.154 2.154l-.08.997zm2.846-3.903l.648.762zm-.697 1.684l-.997.08zm.747-4.772l.648-.762zm0 3.046l-.648-.761zm-.747-4.772l-.997-.08zm.697 1.684l-.648.761zm-2.846-3.903l-.08-.997zm2.154 2.154l.997.08zM13.565 2.84l.762-.648zm1.684.697l.08.997zm-1.726-.747l-.761.648zm-3.046 0l.761.648zM9 14.458l.044-.999zm6.555 6.71l-3-2l-1.11 1.664l3 2zm-4.11-2l-3 2l1.11 1.664l3-2zm1.317-15.73l.042.05l1.523-1.296l-.042-.05zm2.567 1.096l.065-.005l-.16-1.994l-.065.005zm1.142 1.072l-.005.065l1.994.16l.005-.065zm1.041 2.59l.05.042l1.296-1.523l-.05-.042zm.05 1.566l-.05.042l1.296 1.523l.05-.042zm-1.096 2.567l.005.065l1.994-.16l-.005-.065zm-1.072 1.142l-.065-.005l-.16 1.994l.065.005zm-2.59 1.041l-.042.05l1.523 1.296l.042-.05zm-1.566.05l-.042-.05l-1.523 1.296l.042.05zm-2.567-1.096l-.065.005l.16 1.994l.065-.005zm-1.142-1.072l.005-.065l-1.994-.16l-.005.065zm-1.041-2.59l-.05-.042l-1.296 1.523l.05.042zm-.05-1.566l.05-.042l-1.296-1.523l-.05.042zm1.096-2.567l-.005-.065l-1.994.16l.005.065zm1.072-1.142l.065.005l.16-1.994l-.065-.005zm2.59-1.041l.042-.05l-1.523-1.296l-.042.05zM8.671 4.534a3 3 0 0 0 2.525-1.046L9.673 2.192a1 1 0 0 1-.842.348zM7.529 5.606a1 1 0 0 1 1.077-1.077l.16-1.994a3 3 0 0 0-3.23 3.231zm-1.041 2.59a3 3 0 0 0 1.046-2.525l-1.994.16a1 1 0 0 1-.348.842zm-.05 1.566a1 1 0 0 1 0-1.524L5.142 6.715a3 3 0 0 0 0 4.57zm1.096 2.567a3 3 0 0 0-1.046-2.525l-1.296 1.523a1 1 0 0 1 .348.842zm1.072 1.142a1 1 0 0 1-1.077-1.077l-1.994-.16a3 3 0 0 0 3.231 3.23zm4.156 1.09a1 1 0 0 1-1.524 0l-1.523 1.297a3 3 0 0 0 4.57 0zm3.71-2.167a1 1 0 0 1-1.078 1.077l-.16 1.994a3 3 0 0 0 3.23-3.231zm1.04-2.59a3 3 0 0 0-1.046 2.525l1.994-.16a1 1 0 0 1 .348-.842zm.05-1.566a1 1 0 0 1 0 1.524l1.296 1.523a3 3 0 0 0 0-4.57zm-1.096-2.567a3 3 0 0 0 1.046 2.525l1.296-1.523a1 1 0 0 1-.348-.842zm-1.072-1.142a1 1 0 0 1 1.077 1.077l1.994.16a3 3 0 0 0-3.231-3.23zm-2.59-1.041a3 3 0 0 0 2.525 1.046l-.16-1.994a1 1 0 0 1-.842-.348zm1.48-1.346a3 3 0 0 0-4.569 0l1.523 1.296a1 1 0 0 1 1.524 0zm-3.088 12.37a3 3 0 0 0-2.152-1.053l-.088 1.998a1 1 0 0 1 .717.351zM9.044 13.46a3.011 3.011 0 0 0-.373.007l.16 1.994a1 1 0 0 1 .125-.003zM10 22v-7.542H8V22zm5.33-8.534a3.012 3.012 0 0 0-.374-.007l.088 1.998a1 1 0 0 1 .125.003zm-.374-.007a3 3 0 0 0-2.152 1.053l1.523 1.296a1 1 0 0 1 .717-.35zm-.956 1V22h2v-7.542z"
                            />
                            <path
                              stroke="currentColor"
                              stroke-linecap="round"
                              stroke-linejoin="round"
                              stroke-width="2"
                              d="m14 8l-3 3l-1-1"
                            />
                          </g>
                        </svg>
                        <p className="text-gray-700 font-medium text-base">
                          Vendors / Certifications
                        </p>
                      </div>
                      {showVendors ? (
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="1.5em"
                          height="1.5em"
                          viewBox="0 0 48 48"
                        >
                          <path
                            fill="none"
                            stroke="currentColor"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            stroke-width="4"
                            d="m13 30l12-12l12 12"
                          />
                        </svg>
                      ) : (
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="1.5em"
                          height="1.5em"
                          viewBox="0 0 48 48"
                        >
                          <path
                            fill="none"
                            stroke="currentColor"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            stroke-width="4"
                            d="M36 18L24 30L12 18"
                          />
                        </svg>
                      )}
                    </span>
                  </li>
                  {showVendors && (
                    <>
                      <li>
                        <Link href={"/exam-provider/cisco"} onClick={closeNav}>
                          <span className="p-3 pl-11 flex items-center justify-between">
                            <div className="flex items-center">
                              <p className="text-gray-700 font-medium text-base hover:text-green-500">
                                Cisco
                              </p>
                            </div>
                          </span>
                        </Link>
                      </li>
                      <li>
                        <Link
                          href={"/exam-provider/microsoft"}
                          onClick={closeNav}
                        >
                          <span className="p-3 pl-11 flex items-center justify-between">
                            <div className="flex items-center">
                              <p className="text-gray-700 font-medium text-base hover:text-green-500">
                                Microsoft
                              </p>
                            </div>
                          </span>
                        </Link>
                      </li>
                      <li>
                        <Link href={"/exam-provider/pmi"} onClick={closeNav}>
                          <span className="p-3 pl-11 flex items-center justify-between">
                            <div className="flex items-center">
                              <p className="text-gray-700 font-medium text-base hover:text-green-500">
                                Pmi
                              </p>
                            </div>
                          </span>
                        </Link>
                      </li>
                      <li>
                        <Link href={"/exam-provider/amazon"} onClick={closeNav}>
                          <span className="p-3 pl-11 flex items-center justify-between">
                            <div className="flex items-center">
                              <p className="text-gray-700 font-medium text-base hover:text-green-500">
                                Amazon
                              </p>
                            </div>
                          </span>
                        </Link>
                      </li>
                      <li>
                        <Link
                          href={"/exam-provider/comptia"}
                          onClick={closeNav}
                        >
                          <span className="p-3 pl-11 flex items-center justify-between">
                            <div className="flex items-center">
                              <p className="text-gray-700 font-medium text-base hover:text-green-500">
                                CompTIA
                              </p>
                            </div>
                          </span>
                        </Link>
                      </li>
                      <li>
                        <Link href={"/exam-provider/dell"} onClick={closeNav}>
                          <span className="p-3 pl-11 flex items-center justify-between">
                            <div className="flex items-center">
                              <p className="text-gray-700 font-medium text-base hover:text-green-500">
                                Dell
                              </p>
                            </div>
                          </span>
                        </Link>
                      </li>
                    </>
                  )}
                  <li>
                    <Link
                      className="p-3 py-4 flex items-center justify-between text-gray-700 hover:text-green-500 hover:bg-gray-100 rounded-md"
                      href="/video-courses"
                      onClick={closeNav}
                    >
                      <div className="flex items-center">
                        <svg
                          className="mr-2"
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M2.50003 8.86L11.5 14.06C11.6521 14.1478 11.8245 14.194 12 14.194C12.1756 14.194 12.348 14.1478 12.5 14.06L21.5 8.86C21.6512 8.77275 21.7768 8.64746 21.8646 8.49659C21.9523 8.34572 21.999 8.17452 22 8C22.0007 7.82379 21.9549 7.65053 21.8671 7.49775C21.7792 7.34497 21.6526 7.21811 21.5 7.13L12.5 1.94C12.348 1.85224 12.1756 1.80603 12 1.80603C11.8245 1.80603 11.6521 1.85224 11.5 1.94L2.50003 7.13C2.34743 7.21811 2.22081 7.34497 2.13301 7.49775C2.04521 7.65053 1.99933 7.82379 2.00003 8C2.00108 8.17452 2.04779 8.34572 2.13551 8.49659C2.22322 8.64746 2.34889 8.77275 2.50003 8.86ZM12 4L19 8L12 12L5.00003 8L12 4ZM20.5 11.17L12 16L3.50003 11.13C3.3859 11.0639 3.25981 11.021 3.12903 11.0038C2.99825 10.9866 2.86537 10.9955 2.73803 11.0299C2.61069 11.0643 2.49141 11.1235 2.38706 11.2042C2.28271 11.2849 2.19536 11.3854 2.13003 11.5C1.99966 11.7296 1.96539 12.0015 2.03471 12.2563C2.10403 12.5111 2.2713 12.7281 2.50003 12.86L11.5 18.06C11.6521 18.1478 11.8245 18.194 12 18.194C12.1756 18.194 12.348 18.1478 12.5 18.06L21.5 12.86C21.7288 12.7281 21.896 12.5111 21.9654 12.2563C22.0347 12.0015 22.0004 11.7296 21.87 11.5C21.8047 11.3854 21.7173 11.2849 21.613 11.2042C21.5087 11.1235 21.3894 11.0643 21.262 11.0299C21.1347 10.9955 21.0018 10.9866 20.871 11.0038C20.7402 11.021 20.6142 11.0639 20.5 11.13V11.17ZM20.5 15.17L12 20L3.50003 15.13C3.3859 15.0639 3.25981 15.021 3.12903 15.0038C2.99825 14.9866 2.86537 14.9955 2.73803 15.0299C2.61069 15.0643 2.49141 15.1235 2.38706 15.2042C2.28271 15.2849 2.19536 15.3854 2.13003 15.5C1.99966 15.7296 1.96539 16.0015 2.03471 16.2563C2.10403 16.5111 2.2713 16.7281 2.50003 16.86L11.5 22.06C11.6521 22.1478 11.8245 22.194 12 22.194C12.1756 22.194 12.348 22.1478 12.5 22.06L21.5 16.86C21.7288 16.7281 21.896 16.5111 21.9654 16.2563C22.0347 16.0015 22.0004 15.7296 21.87 15.5C21.8047 15.3854 21.7173 15.2849 21.613 15.2042C21.5087 15.1235 21.3894 15.0643 21.262 15.0299C21.1347 14.9955 21.0018 14.9866 20.871 15.0038C20.7402 15.021 20.6142 15.0639 20.5 15.13V15.17Z"
                            fill="currentColor"
                          ></path>
                        </svg>
                        <p className="text-gray-700 font-medium text-base">
                          Video Courses
                        </p>
                      </div>
                    </Link>
                  </li>

                  <li>
                    <Link
                      className="p-3 py-4 flex items-center justify-between text-gray-700 hover:text-green-500 hover:bg-gray-100 rounded-md"
                      href="/unlimited-access"
                      onClick={closeNav}
                    >
                      <div className="flex items-center">
                        <svg
                          className="mr-2"
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M19 5.49999H12.72L12.4 4.49999C12.1926 3.91322 11.8077 3.4055 11.2989 3.04715C10.7901 2.68881 10.1824 2.49759 9.56 2.49999H5C4.20435 2.49999 3.44129 2.81606 2.87868 3.37867C2.31607 3.94128 2 4.70434 2 5.49999V18.5C2 19.2956 2.31607 20.0587 2.87868 20.6213C3.44129 21.1839 4.20435 21.5 5 21.5H19C19.7956 21.5 20.5587 21.1839 21.1213 20.6213C21.6839 20.0587 22 19.2956 22 18.5V8.49999C22 7.70434 21.6839 6.94128 21.1213 6.37867C20.5587 5.81606 19.7956 5.49999 19 5.49999ZM20 18.5C20 18.7652 19.8946 19.0196 19.7071 19.2071C19.5196 19.3946 19.2652 19.5 19 19.5H5C4.73478 19.5 4.48043 19.3946 4.29289 19.2071C4.10536 19.0196 4 18.7652 4 18.5V5.49999C4 5.23478 4.10536 4.98042 4.29289 4.79289C4.48043 4.60535 4.73478 4.49999 5 4.49999H9.56C9.76964 4.49945 9.97416 4.56481 10.1446 4.68683C10.3151 4.80886 10.4429 4.98137 10.51 5.17999L11.05 6.81999C11.1171 7.01861 11.2449 7.19113 11.4154 7.31315C11.5858 7.43517 11.7904 7.50053 12 7.49999H19C19.2652 7.49999 19.5196 7.60535 19.7071 7.79289C19.8946 7.98042 20 8.23478 20 8.49999V18.5Z"
                            fill="currentColor"
                          ></path>
                        </svg>
                        <p className="text-gray-700 font-medium text-base">
                          Unlimited Access
                        </p>
                      </div>
                    </Link>
                  </li>
                  <li>
                    <Link
                      className="p-3 py-4 flex items-center justify-between text-gray-700 hover:text-green-500 hover:bg-gray-100 rounded-md"
                      href="/cart"
                      onClick={closeNav}
                    >
                      <div className="flex items-center">
                        <svg
                          className="mr-2"
                          xmlns="http://www.w3.org/2000/svg"
                          width="24"
                          height="24"
                          viewBox="0 0 576 512"
                        >
                          <path
                            fill="currentColor"
                            d="M504.717 320H211.572l6.545 32h268.418c15.401 0 26.816 14.301 23.403 29.319l-5.517 24.276C523.112 414.668 536 433.828 536 456c0 31.202-25.519 56.444-56.824 55.994c-29.823-.429-54.35-24.631-55.155-54.447c-.44-16.287 6.085-31.049 16.803-41.548H231.176C241.553 426.165 248 440.326 248 456c0 31.813-26.528 57.431-58.67 55.938c-28.54-1.325-51.751-24.385-53.251-52.917c-1.158-22.034 10.436-41.455 28.051-51.586L93.883 64H24C10.745 64 0 53.255 0 40V24C0 10.745 10.745 0 24 0h102.529c11.401 0 21.228 8.021 23.513 19.19L159.208 64H551.99c15.401 0 26.816 14.301 23.403 29.319l-47.273 208C525.637 312.246 515.923 320 504.717 320M408 168h-48v-40c0-8.837-7.163-16-16-16h-16c-8.837 0-16 7.163-16 16v40h-48c-8.837 0-16 7.163-16 16v16c0 8.837 7.163 16 16 16h48v40c0 8.837 7.163 16 16 16h16c8.837 0 16-7.163 16-16v-40h48c8.837 0 16-7.163 16-16v-16c0-8.837-7.163-16-16-16"
                          />
                        </svg>
                        <p className="text-gray-700 font-medium text-base">
                          Cart
                        </p>
                      </div>
                    </Link>
                  </li>
                </ul>
                <p className="px-8 mb-2 text-xs font-medium text-gray-500 uppercase">
                  Other Pages
                </p>
                <ul className="px-4 pb-8">
                  <li>
                    <Link
                      className="p-3 py-4 flex items-center justify-between text-gray-700 hover:text-green-500 hover:bg-gray-100 rounded-md"
                      href="/blogs"
                      onClick={closeNav}
                    >
                      <div className="flex items-center">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="1.4em"
                          height="1.4em"
                          viewBox="0 0 24 24"
                          style={{ marginRight: "8px", marginLeft: "2px" }}
                        >
                          <path
                            fill="none"
                            stroke="currentColor"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            stroke-width="2"
                            d="M8 15h8M8 9h4m7 0q-1 0-1-1a6 6 0 0 0-6-6H8a6 6 0 0 0-6 6v8a6 6 0 0 0 6 6h8a6 6 0 0 0 6-6v-5a2 2 0 0 0-2-2Z"
                          />
                        </svg>
                        <p className="text-gray-700 font-medium text-base">
                          Blogs
                        </p>
                      </div>
                    </Link>
                  </li>
                  <li>
                    <Link
                      className="p-3 py-4 flex items-center justify-between text-gray-700 hover:text-green-500 hover:bg-gray-100 rounded-md"
                      href="/refund-policy"
                      onClick={closeNav}
                    >
                      <div className="flex items-center">
                        <svg
                          className="mr-2"
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M12.3 12.22C12.8336 11.7581 13.2616 11.1869 13.5549 10.545C13.8482 9.90316 14 9.20571 14 8.5C14 7.17392 13.4732 5.90215 12.5355 4.96447C11.5979 4.02678 10.3261 3.5 9 3.5C7.67392 3.5 6.40215 4.02678 5.46447 4.96447C4.52678 5.90215 4 7.17392 4 8.5C3.99999 9.20571 4.1518 9.90316 4.44513 10.545C4.73845 11.1869 5.16642 11.7581 5.7 12.22C4.30014 12.8539 3.11247 13.8775 2.27898 15.1685C1.4455 16.4596 1.00147 17.9633 1 19.5C1 19.7652 1.10536 20.0196 1.29289 20.2071C1.48043 20.3946 1.73478 20.5 2 20.5C2.26522 20.5 2.51957 20.3946 2.70711 20.2071C2.89464 20.0196 3 19.7652 3 19.5C3 17.9087 3.63214 16.3826 4.75736 15.2574C5.88258 14.1321 7.4087 13.5 9 13.5C10.5913 13.5 12.1174 14.1321 13.2426 15.2574C14.3679 16.3826 15 17.9087 15 19.5C15 19.7652 15.1054 20.0196 15.2929 20.2071C15.4804 20.3946 15.7348 20.5 16 20.5C16.2652 20.5 16.5196 20.3946 16.7071 20.2071C16.8946 20.0196 17 19.7652 17 19.5C16.9985 17.9633 16.5545 16.4596 15.721 15.1685C14.8875 13.8775 13.6999 12.8539 12.3 12.22ZM9 11.5C8.40666 11.5 7.82664 11.3241 7.33329 10.9944C6.83994 10.6648 6.45542 10.1962 6.22836 9.64805C6.0013 9.09987 5.94189 8.49667 6.05764 7.91473C6.1734 7.33279 6.45912 6.79824 6.87868 6.37868C7.29824 5.95912 7.83279 5.6734 8.41473 5.55764C8.99667 5.44189 9.59987 5.5013 10.1481 5.72836C10.6962 5.95542 11.1648 6.33994 11.4944 6.83329C11.8241 7.32664 12 7.90666 12 8.5C12 9.29565 11.6839 10.0587 11.1213 10.6213C10.5587 11.1839 9.79565 11.5 9 11.5ZM18.74 11.82C19.38 11.0993 19.798 10.2091 19.9438 9.25634C20.0896 8.30362 19.9569 7.32907 19.5618 6.45C19.1666 5.57093 18.5258 4.8248 17.7165 4.30142C16.9071 3.77805 15.9638 3.49974 15 3.5C14.7348 3.5 14.4804 3.60536 14.2929 3.79289C14.1054 3.98043 14 4.23478 14 4.5C14 4.76522 14.1054 5.01957 14.2929 5.20711C14.4804 5.39464 14.7348 5.5 15 5.5C15.7956 5.5 16.5587 5.81607 17.1213 6.37868C17.6839 6.94129 18 7.70435 18 8.5C17.9986 9.02524 17.8593 9.5409 17.5961 9.99542C17.3328 10.4499 16.9549 10.8274 16.5 11.09C16.3517 11.1755 16.2279 11.2977 16.1404 11.4447C16.0528 11.5918 16.0045 11.7589 16 11.93C15.9958 12.0998 16.0349 12.2678 16.1137 12.4183C16.1924 12.5687 16.3081 12.6967 16.45 12.79L16.84 13.05L16.97 13.12C18.1754 13.6917 19.1923 14.596 19.901 15.7263C20.6096 16.8566 20.9805 18.1659 20.97 19.5C20.97 19.7652 21.0754 20.0196 21.2629 20.2071C21.4504 20.3946 21.7048 20.5 21.97 20.5C22.2352 20.5 22.4896 20.3946 22.6771 20.2071C22.8646 20.0196 22.97 19.7652 22.97 19.5C22.9782 17.9654 22.5938 16.4543 21.8535 15.1101C21.1131 13.7659 20.0413 12.6333 18.74 11.82Z"
                            fill="currentColor"
                          ></path>
                        </svg>
                        <p className="text-gray-700 font-medium text-base">
                          Privacy Policy
                        </p>
                      </div>
                    </Link>
                  </li>

                  <li>
                    <Link
                      className="p-3 py-4 flex items-center justify-between text-gray-700 hover:text-green-500 hover:bg-gray-100 rounded-md"
                      href="/refund-policy"
                      onClick={closeNav}
                    >
                      <div className="flex items-center">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="mr-2"
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                        >
                          <path
                            fill="currentColor"
                            d="M12.005 2c5.523 0 10 4.477 10 10s-4.477 10-10 10a9.96 9.96 0 0 1-6.383-2.302l-.244-.209l.901-1.902a8 8 0 1 0-2.27-5.837l-.004.25h2.5l-2.706 5.716A9.954 9.954 0 0 1 2.005 12c0-5.523 4.477-10 10-10m1 4v2h2.5v2h-5.5a.5.5 0 0 0-.09.992l.09.008h4a2.5 2.5 0 0 1 0 5h-1v2h-2v-2h-2.5v-2h5.5a.5.5 0 0 0 .09-.992l-.09-.008h-4a2.5 2.5 0 1 1 0-5h1V6z"
                          />
                        </svg>
                        <p className="text-gray-700 font-medium text-base">
                          Refund Policy
                        </p>
                      </div>
                    </Link>
                  </li>
                  <li>
                    <Link
                      className="p-3 py-4 flex items-center justify-between text-gray-700 hover:text-green-500 hover:bg-gray-100 rounded-md"
                      href="/about"
                      onClick={closeNav}
                    >
                      <div className="flex items-center">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="mr-2"
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                        >
                          <path
                            fill="currentColor"
                            d="M11 9h2V7h-2m1 13c-4.41 0-8-3.59-8-8s3.59-8 8-8s8 3.59 8 8s-3.59 8-8 8m0-18A10 10 0 0 0 2 12a10 10 0 0 0 10 10a10 10 0 0 0 10-10A10 10 0 0 0 12 2m-1 15h2v-6h-2z"
                          />
                        </svg>
                        <p className="text-gray-700 font-medium text-base">
                          About Us
                        </p>
                      </div>
                    </Link>
                  </li>
                  <li>
                    <Link
                      className="p-3 py-4 flex items-center justify-between text-gray-700 hover:text-green-500 hover:bg-gray-100 rounded-md"
                      href="/terms-and-conditions"
                      onClick={closeNav}
                    >
                      <div className="flex items-center">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="mr-2"
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                        >
                          <circle cx="7" cy="2" r="1" fill="currentColor" />
                          <circle cx="3" cy="6" r="1" fill="currentColor" />
                          <circle cx="12" cy="1" r="1" fill="currentColor" />
                          <circle cx="17" cy="2" r="1" fill="currentColor" />
                          <circle cx="21" cy="6" r="1" fill="currentColor" />
                          <path
                            fill="currentColor"
                            d="m17.5 24l-.119-.029A8.62 8.62 0 0 1 11 15.916v-4.218L17.5 9l6.5 2.698v4.218a8.62 8.62 0 0 1-6.381 8.055ZM13 12.865v3.15a6.4 6.4 0 0 0 4.5 5.96a6.4 6.4 0 0 0 4.5-5.96v-3.15l-4.5-1.793Zm10-.503"
                          />
                          <circle cx="12" cy="23" r="1" fill="currentColor" />
                          <path
                            fill="currentColor"
                            d="M10.4 10.4a.8.8 0 0 0 .8-.8V8h1.6a1.6 1.6 0 0 0 1.59-1.5a6 6 0 0 1 2.353 1.857L18 7.833l1.08.45a7.997 7.997 0 1 0-8.39 11.6a9.6 9.6 0 0 1-.59-2.201a5.96 5.96 0 0 1-3.995-6.777L9.6 14.4v.8a1.6 1.6 0 0 0 .4 1.045V12H8.8v-1.6Z"
                          />
                          <circle cx="3" cy="18" r="1" fill="currentColor" />
                          <circle cx="7" cy="22" r="1" fill="currentColor" />
                          <circle cx="1" cy="12" r="1" fill="currentColor" />
                        </svg>
                        <p className="text-gray-700 font-medium text-base">
                          Terms & Conditions
                        </p>
                      </div>
                    </Link>
                  </li>
                  <li>
                    <Link
                      className="p-3 py-4 flex items-center justify-between text-gray-700 hover:text-green-500 hover:bg-gray-100 rounded-md"
                      href="/faqs"
                      onClick={closeNav}
                    >
                      <div className="flex items-center">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="mr-2"
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                        >
                          <path
                            fill="currentColor"
                            d="M18 15H6l-4 4V3a1 1 0 0 1 1-1h15a1 1 0 0 1 1 1v11a1 1 0 0 1-1 1m5-6v14l-4-4H8a1 1 0 0 1-1-1v-1h14V8h1a1 1 0 0 1 1 1M8.19 4c-.87 0-1.57.2-2.11.59c-.52.41-.78.98-.77 1.77l.01.03h1.93c.01-.3.1-.53.28-.69a1 1 0 0 1 .66-.23c.31 0 .57.1.75.28c.18.19.26.45.26.75c0 .32-.07.59-.23.82c-.14.23-.35.43-.61.59c-.51.34-.86.64-1.05.91C7.11 9.08 7 9.5 7 10h2c0-.31.04-.56.13-.74s.26-.36.51-.52c.45-.24.82-.53 1.11-.93s.44-.81.44-1.31c0-.76-.27-1.37-.81-1.82C9.85 4.23 9.12 4 8.19 4M7 11v2h2v-2zm6 2h2v-2h-2zm0-9v6h2V4z"
                          />
                        </svg>
                        <p className="text-gray-700 font-medium text-base">
                          Frequently Asked Questions
                        </p>
                      </div>
                    </Link>
                  </li>
                </ul>

                <div>
                  {loginResponse?.is_logged_in === true && (
                    <>
                      <p className="px-8 mb-2 text-xs font-medium text-gray-500 uppercase">
                        Account
                      </p>
                      <ul className="px-4 pb-20">
                        <li>
                          <Link
                            className="p-3 py-4 flex items-center justify-between text-gray-700 hover:text-green-500 hover:bg-gray-100 rounded-md"
                            href="/profile/products"
                            onClick={closeNav}
                          >
                            <div className="flex items-center">
                              <svg
                                className="mr-2"
                                width="24"
                                height="24"
                                viewBox="0 0 24 24"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <path
                                  d="M21.32 9.55L19.43 8.92L20.32 7.14C20.4102 6.95369 20.4404 6.74397 20.4064 6.53978C20.3723 6.33558 20.2758 6.14699 20.13 6L18 3.87C17.8522 3.72209 17.6618 3.62421 17.4555 3.59013C17.2493 3.55605 17.0375 3.58748 16.85 3.68L15.07 4.57L14.44 2.68C14.3735 2.483 14.2472 2.31163 14.0787 2.18975C13.9102 2.06787 13.7079 2.00155 13.5 2H10.5C10.2904 1.99946 10.0858 2.06482 9.91537 2.18685C9.7449 2.30887 9.61709 2.48138 9.55 2.68L8.92 4.57L7.14 3.68C6.95369 3.58978 6.74397 3.55961 6.53978 3.59364C6.33558 3.62767 6.14699 3.72423 6 3.87L3.87 6C3.72209 6.14777 3.62421 6.33818 3.59013 6.54446C3.55605 6.75074 3.58748 6.96251 3.68 7.15L4.57 8.93L2.68 9.56C2.483 9.62654 2.31163 9.75283 2.18975 9.92131C2.06787 10.0898 2.00155 10.2921 2 10.5V13.5C1.99946 13.7096 2.06482 13.9142 2.18685 14.0846C2.30887 14.2551 2.48138 14.3829 2.68 14.45L4.57 15.08L3.68 16.86C3.58978 17.0463 3.55961 17.256 3.59364 17.4602C3.62767 17.6644 3.72423 17.853 3.87 18L6 20.13C6.14777 20.2779 6.33818 20.3758 6.54446 20.4099C6.75074 20.444 6.96251 20.4125 7.15 20.32L8.93 19.43L9.56 21.32C9.62709 21.5186 9.7549 21.6911 9.92537 21.8132C10.0958 21.9352 10.3004 22.0005 10.51 22H13.51C13.7196 22.0005 13.9242 21.9352 14.0946 21.8132C14.2651 21.6911 14.3929 21.5186 14.46 21.32L15.09 19.43L16.87 20.32C17.0551 20.4079 17.2628 20.4369 17.4649 20.4029C17.667 20.3689 17.8538 20.2737 18 20.13L20.13 18C20.2779 17.8522 20.3758 17.6618 20.4099 17.4555C20.444 17.2493 20.4125 17.0375 20.32 16.85L19.43 15.07L21.32 14.44C21.517 14.3735 21.6884 14.2472 21.8103 14.0787C21.9321 13.9102 21.9985 13.7079 22 13.5V10.5C22.0005 10.2904 21.9352 10.0858 21.8132 9.91537C21.6911 9.7449 21.5186 9.61709 21.32 9.55ZM20 12.78L18.8 13.18C18.5241 13.2695 18.2709 13.418 18.0581 13.6151C17.8452 13.8122 17.6778 14.0533 17.5675 14.3216C17.4571 14.5899 17.4064 14.879 17.419 15.1688C17.4315 15.4586 17.5069 15.7422 17.64 16L18.21 17.14L17.11 18.24L16 17.64C15.7436 17.5122 15.4627 17.4411 15.1763 17.4313C14.89 17.4215 14.6049 17.4734 14.3403 17.5834C14.0758 17.6934 13.8379 17.8589 13.6429 18.0688C13.4479 18.2787 13.3003 18.5281 13.21 18.8L12.81 20H11.22L10.82 18.8C10.7305 18.5241 10.582 18.2709 10.3849 18.0581C10.1878 17.8452 9.94671 17.6778 9.67842 17.5675C9.41014 17.4571 9.12105 17.4064 8.83123 17.419C8.5414 17.4315 8.25777 17.5069 8 17.64L6.86 18.21L5.76 17.11L6.36 16C6.4931 15.7422 6.56852 15.4586 6.58105 15.1688C6.59358 14.879 6.5429 14.5899 6.43254 14.3216C6.32218 14.0533 6.15478 13.8122 5.94195 13.6151C5.72912 13.418 5.47595 13.2695 5.2 13.18L4 12.78V11.22L5.2 10.82C5.47595 10.7305 5.72912 10.582 5.94195 10.3849C6.15478 10.1878 6.32218 9.94671 6.43254 9.67842C6.5429 9.41014 6.59358 9.12105 6.58105 8.83123C6.56852 8.5414 6.4931 8.25777 6.36 8L5.79 6.89L6.89 5.79L8 6.36C8.25777 6.4931 8.5414 6.56852 8.83123 6.58105C9.12105 6.59358 9.41014 6.5429 9.67842 6.43254C9.94671 6.32218 10.1878 6.15478 10.3849 5.94195C10.582 5.72912 10.7305 5.47595 10.82 5.2L11.22 4H12.78L13.18 5.2C13.2695 5.47595 13.418 5.72912 13.6151 5.94195C13.8122 6.15478 14.0533 6.32218 14.3216 6.43254C14.5899 6.5429 14.879 6.59358 15.1688 6.58105C15.4586 6.56852 15.7422 6.4931 16 6.36L17.14 5.79L18.24 6.89L17.64 8C17.5122 8.25645 17.4411 8.53735 17.4313 8.82369C17.4215 9.11003 17.4734 9.39513 17.5834 9.65969C17.6934 9.92424 17.8589 10.1621 18.0688 10.3571C18.2787 10.5521 18.5281 10.6997 18.8 10.79L20 11.19V12.78ZM12 8C11.2089 8 10.4355 8.2346 9.77772 8.67413C9.11993 9.11365 8.60724 9.73836 8.30448 10.4693C8.00173 11.2002 7.92252 12.0044 8.07686 12.7804C8.2312 13.5563 8.61217 14.269 9.17158 14.8284C9.73099 15.3878 10.4437 15.7688 11.2196 15.9231C11.9956 16.0775 12.7998 15.9983 13.5307 15.6955C14.2616 15.3928 14.8864 14.8801 15.3259 14.2223C15.7654 13.5645 16 12.7911 16 12C16 10.9391 15.5786 9.92172 14.8284 9.17158C14.0783 8.42143 13.0609 8 12 8ZM12 14C11.6044 14 11.2178 13.8827 10.8889 13.6629C10.56 13.4432 10.3036 13.1308 10.1522 12.7654C10.0009 12.3999 9.96126 11.9978 10.0384 11.6098C10.1156 11.2219 10.3061 10.8655 10.5858 10.5858C10.8655 10.3061 11.2219 10.1156 11.6098 10.0384C11.9978 9.96126 12.3999 10.0009 12.7654 10.1522C13.1308 10.3036 13.4432 10.56 13.6629 10.8889C13.8827 11.2178 14 11.6044 14 12C14 12.5304 13.7893 13.0391 13.4142 13.4142C13.0391 13.7893 12.5304 14 12 14Z"
                                  fill="currentColor"
                                ></path>
                              </svg>
                              <p className="text-gray-700 font-medium text-base">
                                Products
                              </p>
                            </div>
                          </Link>
                        </li>
                        <li>
                          <Link
                            className="p-3 py-4 flex items-center justify-between text-gray-700 hover:text-green-500 hover:bg-gray-100 rounded-md"
                            href="/profile/setting"
                            onClick={closeNav}
                          >
                            <div className="flex items-center">
                              <svg
                                className="mr-2"
                                width="24"
                                height="24"
                                viewBox="0 0 24 24"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <path
                                  d="M21.32 9.55L19.43 8.92L20.32 7.14C20.4102 6.95369 20.4404 6.74397 20.4064 6.53978C20.3723 6.33558 20.2758 6.14699 20.13 6L18 3.87C17.8522 3.72209 17.6618 3.62421 17.4555 3.59013C17.2493 3.55605 17.0375 3.58748 16.85 3.68L15.07 4.57L14.44 2.68C14.3735 2.483 14.2472 2.31163 14.0787 2.18975C13.9102 2.06787 13.7079 2.00155 13.5 2H10.5C10.2904 1.99946 10.0858 2.06482 9.91537 2.18685C9.7449 2.30887 9.61709 2.48138 9.55 2.68L8.92 4.57L7.14 3.68C6.95369 3.58978 6.74397 3.55961 6.53978 3.59364C6.33558 3.62767 6.14699 3.72423 6 3.87L3.87 6C3.72209 6.14777 3.62421 6.33818 3.59013 6.54446C3.55605 6.75074 3.58748 6.96251 3.68 7.15L4.57 8.93L2.68 9.56C2.483 9.62654 2.31163 9.75283 2.18975 9.92131C2.06787 10.0898 2.00155 10.2921 2 10.5V13.5C1.99946 13.7096 2.06482 13.9142 2.18685 14.0846C2.30887 14.2551 2.48138 14.3829 2.68 14.45L4.57 15.08L3.68 16.86C3.58978 17.0463 3.55961 17.256 3.59364 17.4602C3.62767 17.6644 3.72423 17.853 3.87 18L6 20.13C6.14777 20.2779 6.33818 20.3758 6.54446 20.4099C6.75074 20.444 6.96251 20.4125 7.15 20.32L8.93 19.43L9.56 21.32C9.62709 21.5186 9.7549 21.6911 9.92537 21.8132C10.0958 21.9352 10.3004 22.0005 10.51 22H13.51C13.7196 22.0005 13.9242 21.9352 14.0946 21.8132C14.2651 21.6911 14.3929 21.5186 14.46 21.32L15.09 19.43L16.87 20.32C17.0551 20.4079 17.2628 20.4369 17.4649 20.4029C17.667 20.3689 17.8538 20.2737 18 20.13L20.13 18C20.2779 17.8522 20.3758 17.6618 20.4099 17.4555C20.444 17.2493 20.4125 17.0375 20.32 16.85L19.43 15.07L21.32 14.44C21.517 14.3735 21.6884 14.2472 21.8103 14.0787C21.9321 13.9102 21.9985 13.7079 22 13.5V10.5C22.0005 10.2904 21.9352 10.0858 21.8132 9.91537C21.6911 9.7449 21.5186 9.61709 21.32 9.55ZM20 12.78L18.8 13.18C18.5241 13.2695 18.2709 13.418 18.0581 13.6151C17.8452 13.8122 17.6778 14.0533 17.5675 14.3216C17.4571 14.5899 17.4064 14.879 17.419 15.1688C17.4315 15.4586 17.5069 15.7422 17.64 16L18.21 17.14L17.11 18.24L16 17.64C15.7436 17.5122 15.4627 17.4411 15.1763 17.4313C14.89 17.4215 14.6049 17.4734 14.3403 17.5834C14.0758 17.6934 13.8379 17.8589 13.6429 18.0688C13.4479 18.2787 13.3003 18.5281 13.21 18.8L12.81 20H11.22L10.82 18.8C10.7305 18.5241 10.582 18.2709 10.3849 18.0581C10.1878 17.8452 9.94671 17.6778 9.67842 17.5675C9.41014 17.4571 9.12105 17.4064 8.83123 17.419C8.5414 17.4315 8.25777 17.5069 8 17.64L6.86 18.21L5.76 17.11L6.36 16C6.4931 15.7422 6.56852 15.4586 6.58105 15.1688C6.59358 14.879 6.5429 14.5899 6.43254 14.3216C6.32218 14.0533 6.15478 13.8122 5.94195 13.6151C5.72912 13.418 5.47595 13.2695 5.2 13.18L4 12.78V11.22L5.2 10.82C5.47595 10.7305 5.72912 10.582 5.94195 10.3849C6.15478 10.1878 6.32218 9.94671 6.43254 9.67842C6.5429 9.41014 6.59358 9.12105 6.58105 8.83123C6.56852 8.5414 6.4931 8.25777 6.36 8L5.79 6.89L6.89 5.79L8 6.36C8.25777 6.4931 8.5414 6.56852 8.83123 6.58105C9.12105 6.59358 9.41014 6.5429 9.67842 6.43254C9.94671 6.32218 10.1878 6.15478 10.3849 5.94195C10.582 5.72912 10.7305 5.47595 10.82 5.2L11.22 4H12.78L13.18 5.2C13.2695 5.47595 13.418 5.72912 13.6151 5.94195C13.8122 6.15478 14.0533 6.32218 14.3216 6.43254C14.5899 6.5429 14.879 6.59358 15.1688 6.58105C15.4586 6.56852 15.7422 6.4931 16 6.36L17.14 5.79L18.24 6.89L17.64 8C17.5122 8.25645 17.4411 8.53735 17.4313 8.82369C17.4215 9.11003 17.4734 9.39513 17.5834 9.65969C17.6934 9.92424 17.8589 10.1621 18.0688 10.3571C18.2787 10.5521 18.5281 10.6997 18.8 10.79L20 11.19V12.78ZM12 8C11.2089 8 10.4355 8.2346 9.77772 8.67413C9.11993 9.11365 8.60724 9.73836 8.30448 10.4693C8.00173 11.2002 7.92252 12.0044 8.07686 12.7804C8.2312 13.5563 8.61217 14.269 9.17158 14.8284C9.73099 15.3878 10.4437 15.7688 11.2196 15.9231C11.9956 16.0775 12.7998 15.9983 13.5307 15.6955C14.2616 15.3928 14.8864 14.8801 15.3259 14.2223C15.7654 13.5645 16 12.7911 16 12C16 10.9391 15.5786 9.92172 14.8284 9.17158C14.0783 8.42143 13.0609 8 12 8ZM12 14C11.6044 14 11.2178 13.8827 10.8889 13.6629C10.56 13.4432 10.3036 13.1308 10.1522 12.7654C10.0009 12.3999 9.96126 11.9978 10.0384 11.6098C10.1156 11.2219 10.3061 10.8655 10.5858 10.5858C10.8655 10.3061 11.2219 10.1156 11.6098 10.0384C11.9978 9.96126 12.3999 10.0009 12.7654 10.1522C13.1308 10.3036 13.4432 10.56 13.6629 10.8889C13.8827 11.2178 14 11.6044 14 12C14 12.5304 13.7893 13.0391 13.4142 13.4142C13.0391 13.7893 12.5304 14 12 14Z"
                                  fill="currentColor"
                                ></path>
                              </svg>
                              <p className="text-gray-700 font-medium text-base">
                                Settings
                              </p>
                            </div>
                          </Link>
                        </li>
                        <li>
                          <Link
                            className="p-3 py-4 flex items-center justify-between text-gray-700 hover:text-green-500 hover:bg-gray-100 rounded-md"
                            href="/profile/download-history"
                            onClick={closeNav}
                          >
                            <div className="flex items-center">
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="mr-2"
                                width="24"
                                height="24"
                                viewBox="0 0 100 100"
                              >
                                <path
                                  fill="currentColor"
                                  d="m89.91 78.264l-9.178.007l8.211 9.67l-77.875.053l8.22-9.682l-9.188.008L.832 89.234A3.5 3.5 0 0 0 3.502 95l93-.064a3.5 3.5 0 0 0 2.666-5.766zM41.34 5v20.705H24.637L50 51.174l25.363-25.469H58.66V5zm30.912 32.324c-2.317 2.328-4.632 4.658-6.951 6.985h5l18.64 21.957l-77.873.052l18.686-22.01H34.7c-2.317-2.328-4.637-4.65-6.955-6.978a3.5 3.5 0 0 0-2.28 1.213L.833 67.559a3.5 3.5 0 0 0 2.67 5.765l93-.064a3.5 3.5 0 0 0 2.666-5.766L74.59 38.543a3.5 3.5 0 0 0-2.338-1.219"
                                  color="currentColor"
                                />
                              </svg>
                              <p className="text-gray-700 font-medium text-base">
                                Download History
                              </p>
                            </div>
                          </Link>
                        </li>
                        <li>
                          <Link
                            className="p-3 py-4 flex items-center justify-between text-gray-700 hover:text-green-500 hover:bg-gray-100 rounded-md"
                            href="/profile/login-history"
                            onClick={closeNav}
                          >
                            <div className="flex items-center">
                              <svg
                                className="mr-2"
                                width="24"
                                height="24"
                                viewBox="0 0 24 24"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <path
                                  d="M14.81 12.28C15.443 11.6002 15.7996 10.7088 15.81 9.78C15.81 8.77748 15.4118 7.81602 14.7029 7.10714C13.994 6.39825 13.0325 6 12.03 6C11.0275 6 10.066 6.39825 9.35714 7.10714C8.64825 7.81602 8.25 8.77748 8.25 9.78C8.26044 10.7088 8.61702 11.6002 9.25 12.28C8.36865 12.7189 7.61022 13.3699 7.04292 14.1746C6.47561 14.9793 6.11723 15.9124 6 16.89C5.97083 17.1552 6.0482 17.4212 6.21511 17.6293C6.38202 17.8375 6.62478 17.9708 6.89 18C7.15522 18.0292 7.42116 17.9518 7.62932 17.7849C7.83749 17.618 7.97083 17.3752 8 17.11C8.11933 16.1411 8.58885 15.2494 9.32009 14.6027C10.0513 13.956 10.9938 13.599 11.97 13.599C12.9462 13.599 13.8887 13.956 14.6199 14.6027C15.3512 15.2494 15.8207 16.1411 15.94 17.11C15.9678 17.3664 16.0936 17.6022 16.2911 17.768C16.4887 17.9339 16.7426 18.017 17 18H17.11C17.3721 17.9698 17.6117 17.8373 17.7766 17.6313C17.9414 17.4252 18.0181 17.1624 17.99 16.9C17.8815 15.9276 17.5344 14.997 16.9796 14.191C16.4248 13.3851 15.6796 12.7286 14.81 12.28ZM12 11.56C11.6479 11.56 11.3038 11.4556 11.0111 11.26C10.7184 11.0644 10.4902 10.7864 10.3555 10.4612C10.2208 10.1359 10.1855 9.77803 10.2542 9.43274C10.3229 9.08745 10.4924 8.77029 10.7414 8.52135C10.9903 8.27241 11.3075 8.10288 11.6527 8.0342C11.998 7.96552 12.3559 8.00077 12.6812 8.13549C13.0064 8.27022 13.2844 8.49837 13.48 8.79109C13.6756 9.0838 13.78 9.42795 13.78 9.78C13.78 10.2521 13.5925 10.7048 13.2586 11.0387C12.9248 11.3725 12.4721 11.56 12 11.56ZM19 2H5C4.20435 2 3.44129 2.31607 2.87868 2.87868C2.31607 3.44129 2 4.20435 2 5V19C2 19.7956 2.31607 20.5587 2.87868 21.1213C3.44129 21.6839 4.20435 22 5 22H19C19.7956 22 20.5587 21.6839 21.1213 21.1213C21.6839 20.5587 22 19.7956 22 19V5C22 4.20435 21.6839 3.44129 21.1213 2.87868C20.5587 2.31607 19.7956 2 19 2ZM20 19C20 19.2652 19.8946 19.5196 19.7071 19.7071C19.5196 19.8946 19.2652 20 19 20H5C4.73478 20 4.48043 19.8946 4.29289 19.7071C4.10536 19.5196 4 19.2652 4 19V5C4 4.73478 4.10536 4.48043 4.29289 4.29289C4.48043 4.10536 4.73478 4 5 4H19C19.2652 4 19.5196 4.10536 19.7071 4.29289C19.8946 4.48043 20 4.73478 20 5V19Z"
                                  fill="currentColor"
                                ></path>
                              </svg>
                              <p className="text-gray-700 font-medium text-base">
                                Login History
                              </p>
                            </div>
                          </Link>
                        </li>

                        <li>
                          <span className="p-3 py-4 flex items-center justify-between text-gray-700 hover:text-green-500 hover:bg-gray-100 rounded-md">
                            <button
                              onClick={() => {
                                handleSignOut();
                                closeNav();
                              }}
                              className="flex items-center"
                            >
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="mr-2"
                                width="24"
                                height="24"
                                viewBox="0 0 24 24"
                              >
                                <g
                                  fill="none"
                                  stroke="currentColor"
                                  stroke-linecap="round"
                                  stroke-linejoin="round"
                                  stroke-width="2"
                                >
                                  <path d="M10 8V6a2 2 0 0 1 2-2h7a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2h-7a2 2 0 0 1-2-2v-2" />
                                  <path d="M15 12H3l3-3m0 6l-3-3" />
                                </g>
                              </svg>
                              <p className="text-gray-700 font-medium text-base">
                                Logout
                              </p>
                            </button>
                          </span>
                        </li>
                      </ul>
                    </>
                  )}
                  <div className="fixed bottom-0 -left-1 max-w-xs w-full -my-3 flex flex-wrap items-center p-6 pl-6 justify-between bg-gray-100">
                    <div className="w-auto">
                      {loginResponse?.is_logged_in === true ? (
                        <div className="flex flex-wrap -mx-3 -mb-1 -mt-4">
                          <div className="w-auto p-2">
                            <img src="/avatar.png" className="h-10" alt="" />
                          </div>
                          <div className="w-auto p-2">
                            <h2 className="text-sm font-bold text-gray-700">
                              {loginResponse.name}
                            </h2>
                            <p className="text-sm font-medium text-gray-500">
                              {loginResponse.email}
                            </p>
                          </div>
                        </div>
                      ) : (
                        <div className="flex flex-wrap -mx-3 -mb-1 -mt-4">
                          <div className="w-auto p-2">
                            <h2 className="text-base font-bold text-gray-500">
                              <Link
                                href={"/login"}
                                className="text-green-500 hover:text-green-600 hover:underline font-bold underline-offset-2"
                                onClick={closeNav}
                              >
                                Login Now
                              </Link>{" "}
                            </h2>
                            <p className="text-sm font-medium text-gray-500">
                              Do not have an account?{" "}
                              <Link
                                onClick={closeNav}
                                href={"/register"}
                                className="text-green-500 hover:text-green-600 hover:underline font-bold underline-offset-2"
                              >
                                Register
                              </Link>{" "}
                              Here.
                            </p>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {searchOpen && (
            <div
              className={`w-auto p-2 flex transition-all 2xl:hidden duration-1000 ease-out ${
                searchOpen
                  ? "opacity-100 translate-y-0 max-h-screen"
                  : "opacity-0 -translate-y-2 max-h-0"
              } overflow-hidden`}
              style={{
                transitionProperty: "opacity, transform, max-height",
              }}
            >
              <input
                className="appearance-none px-6 py-3 w-full text-sm text-gray-700 font-bold bg-gray-50 placeholder-gray-300 outline-none border border-gray-100 focus:ring-1 focus:ring-gray-100 rounded-full"
                id="formInput1-1"
                type="text"
                placeholder="Search..."
                value={searchValue}
                onChange={(e) => {
                  const { value } = e.target;
                  handleSearch(value);
                }}
              />
            </div>
          )}
        </div>
      </section>
      {searchValue && (
        <div>
          <ul
            style={{
              backgroundColor: "white",
              color: "gray",
              padding: "0",
              margin: "0",
              listStyle: "none",
              position: "absolute",
              left: 0,
              width: "100%",
              borderRadius: "0px",
              zIndex: 1000,
            }}
          >
            <Card
              sx={{ maxHeight: "500px", overflowY: "auto", padding: "10px" }}
            >
              <li
                style={{
                  padding: "10px",
                  border: "1px solid #22C55E",
                  textAlign: "center",
                }}
              >
                <b>See all search for &quot;{searchValue}&quot;</b>
              </li>
              <li
                className="bg-green-500 text-white font-bold text-xl text-center"
                style={{
                  padding: "10px",
                  borderTop: "1px solid #22C55E",
                  borderLeft: "1px solid #22C55E",
                  borderRight: "1px solid #22C55E",
                  borderBottom: "1px solid #22C55E",
                }}
              >
                Exams - {filteredData.length}
              </li>
              {filteredData.map((item, index) => (
                <div
                  key={item.code}
                  onClick={() => handleExamPage(item)}
                  style={{ cursor: "pointer" }}
                >
                  <li
                    style={{
                      padding: "10px",
                      borderTop: "1px solid #22C55E",
                      borderLeft: "1px solid #22C55E",
                      borderRight: "1px solid #22C55E",
                      borderBottom: "1px solid #22C55E",
                    }}
                    className="hover:bg-gray-200 flex"
                  >
                    <Avatar
                      alt="Remy Sharp"
                      src="/package-small-min_optimized.png"
                      className="mr-3 mt-1"
                      variant="rounded"
                    />
                    <div>
                      <div className="text-gray-700 font-bold">
                        {item.vendor} - ({item.code})
                      </div>
                      <div>{item.name}</div>
                    </div>
                  </li>
                </div>
              ))}
              <li
                className="bg-green-500 text-white font-bold text-xl text-center"
                style={{
                  padding: "10px",
                  borderTop: "1px solid #22C55E",
                  borderLeft: "1px solid #22C55E",
                  borderRight: "1px solid #22C55E",
                  borderBottom: "1px solid #22C55E",
                }}
              >
                Vendors - {filteredVendors.length}
              </li>
              {filteredVendors.map((item, index) => (
                <div
                  key={item.code}
                  onClick={() => handleVendorPage(item.perma)}
                  style={{ cursor: "pointer" }}
                >
                  <li
                    style={{
                      padding: "10px",
                      borderTop: "1px solid #22C55E",
                      borderLeft: "1px solid #22C55E",
                      borderRight: "1px solid #22C55E",
                      borderBottom: "1px solid #22C55E",
                    }}
                    className="hover:bg-gray-200 flex"
                  >
                   <Avatar
                      alt={item.title}
                      src={`/vendors/${item.perma}.png`}
                      className="mr-3 mt-1"
                      variant="rounded"
                    />
                    <div>
                      <div className="text-gray-700 font-bold">{item.title}</div>
                      {/* <div>{item.vendor}</div> */}
                    </div>
                  </li>
                </div>
              ))}
              <li
                className="bg-green-500 text-white font-bold text-xl text-center"
                style={{
                  padding: "10px",
                  borderTop: "1px solid #22C55E",
                  borderLeft: "1px solid #22C55E",
                  borderRight: "1px solid #22C55E",
                  borderBottom: "1px solid #22C55E",
                }}
              >
                Certifications - {filteredCertifications.length}
              </li>
              {filteredCertifications.map((item, index) => (
                <div
                  key={item.code}
                  onClick={() => handleCertificationPage(item)}
                  style={{ cursor: "pointer" }}
                >
                  <li
                    style={{
                      padding: "10px",
                      borderTop: "1px solid #22C55E",
                      borderLeft: "1px solid #22C55E",
                      borderRight: "1px solid #22C55E",
                      borderBottom: "1px solid #22C55E",
                    }}
                    className="hover:bg-gray-200 flex"
                  >
                    <Avatar
                      alt="Remy Sharp"
                      src="/package-small-min_optimized.png"
                      className="mr-3 mt-1"
                      variant="rounded"
                    />
                    <div>
                      <div className="text-gray-700 font-bold">{item.vendor}</div>
                      <div>{item.name}</div>
                    </div>
                  </li>
                </div>
              ))}
            </Card>
          </ul>
        </div>
      )}
    </>
  );
};

export default MainNav;
