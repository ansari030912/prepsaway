/* eslint-disable @next/next/no-img-element */
"use client";
import { Box } from "@mui/material";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import HotExamCards from "./HotExamCards";

const AllVendorsTableCard = ({ vendorData, data }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const router = useRouter();
  const [activeTab, setActiveTab] = useState(vendorData ? "vendors" : "exams");

  const filteredData = vendorData?.filter((vendor) =>
    vendor.vendor_title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleTabClick = (tab) => {
    setActiveTab(tab);
    setSearchTerm("");
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case "vendors":
        return (
          <div
            className="relative overflow-x-auto shadow-md sm:rounded-lg"
            style={{ boxShadow: "inset 0px 0px 8px rgba(0, 0, 0, 0.3)" }}
          >
            <div className="pb-4 bg-white pl-3 pt-4">
              <div className="relative mt-1">
                <div className="absolute inset-y-0 rtl:inset-r-0 start-0 flex items-center ps-3 pointer-events-none">
                  <svg
                    className="w-4 h-4 text-gray-500 "
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 20 20"
                  >
                    <path
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                    />
                  </svg>
                </div>
                <input
                  type="text"
                  id="table-search"
                  className="block pt-2 pb-2 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg w-80 bg-gray-50 focus:ring-blue-500 focus:border-blue-500 "
                  placeholder="Search..."
                  value={searchTerm}
                  onChange={handleSearchChange}
                />
              </div>
            </div>

            <table className="w-full text-sm text-left rtl:text-right text-gray-500 ">
              <thead className="text-xs text-gray-700 uppercase bg-gray-50 ">
                <tr>
                  <th scope="col" className="px-6 py-3">
                    Vendors
                  </th>

                  <th scope="col" className="px-6 py-3 text-right">
                    Exams
                  </th>
                </tr>
              </thead>
              <tbody>
                {filteredData.map((item, index) => (
                  <tr
                    key={item.vendor_id}
                    className="bg-white border-b  hover:bg-gray-50 "
                  >
                    <th
                      scope="row"
                      className="px-6 py-4 font-lg text-blue-500 hover:underline whitespace-nowrap "
                    >
                      <Link href={`/exam-provider/${item.vendor_perma}`}>
                        {item.vendor_title}
                      </Link>
                    </th>
                    <td className="px-6 py-4 text-right">
                      <span className="hidden md:inline-block font-medium text-gray-600 ">
                        Total{" "}
                        <b className="text-green-500">
                          ( {item.vendor_exams} )
                        </b>{" "}
                        {item.vendor_exams === 1 ? "Exam" : "Exams"} are in{" "}
                        <b>{item.vendor_title}</b>
                      </span>
                      <span className="md:hidden font-medium text-gray-600 ">
                        <b className="text-green-500">
                          ( {item.vendor_exams} )
                        </b>{" "}
                        {item.vendor_exams === 1 ? "Exam" : "Exams"}
                      </span>
                      <br />
                      <span className="font-medium text-blue-600 hover:underline cursor-pointer">
                        <Link href={`/exam-provider/${item.vendor_perma}`}>
                          View
                        </Link>
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        );
      case "exams":
        return <HotExamCards data={data} />;
      default:
        return <p>Welcome to our site!</p>;
    }
  };

  return (
    <Box sx={{ bgcolor: "white", padding: "20px" }}>
      <ul className="flex flex-wrap text-sm font-medium text-center text-gray-500 border-b border-gray-200">
        <li className="me-2 cursor-pointer">
          <span
            onClick={() => handleTabClick("vendors")}
            className={`inline-block p-3 rounded-t-lg ${
              activeTab === "vendors"
                ? "text-blue-600 bg-gray-200"
                : "hover:text-gray-600 hover:bg-gray-50"
            }`}
          >
            Vendors & Certifications
          </span>
        </li>

        <li className="me-2 cursor-pointer">
          <span
            onClick={() => handleTabClick("exams")}
            className={`inline-block p-3 rounded-t-lg ${
              activeTab === "exams"
                ? "text-blue-600 bg-gray-200"
                : "hover:text-gray-600 hover:bg-gray-50"
            }`}
          >
            Hot Exams
          </span>
        </li>
      </ul>
      <Box>{renderTabContent()}</Box>
    </Box>
  );
};

export default AllVendorsTableCard;
