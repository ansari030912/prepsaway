/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @next/next/no-img-element */
"use client";
import { Box, Grid } from "@mui/material";
import Link from "next/link";
import { useEffect, useState } from "react";

const AllVendorTableCard = ({ data }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [activeVendor, setActiveVendor] = useState(data[0]?.vendor_perma || "");

  useEffect(() => {
    if (data.length > 0 && !activeVendor) {
      setActiveVendor(data[0].vendor_perma);
    }
  }, [data]);

  const handleVendorClick = (vendorPerma) => {
    setActiveVendor(vendorPerma);
    setSearchTerm("");
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const getFilteredCourses = () => {
    const activeData = data.find(
      (vendor) => vendor.vendor_perma === activeVendor
    );
    return (
      activeData?.training_courses.filter((course) =>
        course.title.toLowerCase().includes(searchTerm.toLowerCase())
      ) || []
    );
  };

  const renderTabContent = () => {
    const filteredData = getFilteredCourses();
    return (
      <section>
        <div className="container mx-auto">
          <div className=" bg-white rounded-2xl">
            <div className="flex flex-wrap items-center mb-3 bg-gray-50 p-3 ">
              <div>
                <div className="flex items-center">
                  <h3 className="mr-2 text-xl text-gray-600 font-bold">
                    Training Course
                  </h3>
                  <span className="py-1 px-2 bg-green-500 text-xs text-white rounded-full">
                    {filteredData?.length} Vendors
                  </span>
                </div>
                <p className="text-sm text-gray-500">
                  Provided by IT Professionals
                </p>
              </div>
              <span className="md:ml-auto xs:w-80 flex items-center py-2 px-3 text-xs text-white rounded">
                <input
                  type="text"
                  id="table-search"
                  className="md:block w-105 pt-2 pb-2 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-white"
                  placeholder="Search..."
                  value={searchTerm}
                  onChange={handleSearchChange}
                />
              </span>
            </div>
            <hr style={{ bgcolor: "white", border: "1px solid white" }} />
            <div className="w-full lg:w-12/12 p-4">
              <Grid
                container
                style={{ height: "100%", marginTop: "20px" }}
                alignItems="center"
                justifyContent="center"
                spacing={3}
              >
                {filteredData?.map((item) => (
                  <Grid
                    item
                    key={item.vendor_title}
                    lg={4}
                    md={6}
                    xs={12}
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      justifyContent: "center",
                      height: "100%",
                    }}
                  >
                    <Link href={`/training-course/${item.perma}`}>
                      <span className="group hover:text-blue-600 text-blue-400 cursor-pointer">
                        <div className="flex justify-center">
                          <div
                            className="relative overflow-hidden rounded-xl mb-6"
                            style={{ height: "200px", width: "230px" }}
                          >
                            <img
                              className="rounded-xl w-full h-full transform group-hover:scale-105 transition duration-200"
                              src={`https://video.dumpsarena.com/img/${item.image}`}
                              alt=""
                            />
                            <div className="absolute top-2 left-2 right-2">
                              <div className="flex justify-between flex-wrap gap-2">
                                <div className="flex flex-wrap gap-2">
                                  <span className="inline-block bg-green-500 text-white rounded-full text-sm px-3 py-2 font-semibold">
                                    # {item.videos} Lectures
                                  </span>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                        <p className="text-sm  font-semibold text-center">
                          {item.title}
                        </p>
                        <h2 className="font-heading uppercase text-base mb-3 text-center"></h2>
                      </span>
                    </Link>
                  </Grid>
                ))}
              </Grid>
            </div>
          </div>
        </div>
      </section>
    );
  };

  return (
    <>
      <div className="m-auto container">
        <Box
          sx={{
            bgcolor: "white",
            padding: "20px",
          }}
        >
          <ul className="flex flex-wrap text-sm font-medium text-center text-gray-500 border-b border-gray-200">
            {data.map((vendor) => (
              <li key={vendor.vendor_perma} className="me-2 cursor-pointer">
                <span
                  onClick={() => handleVendorClick(vendor.vendor_perma)}
                  className={`inline-block p-3 rounded-t-lg ${
                    activeVendor === vendor.vendor_perma
                      ? "text-green-500 bg-green-50"
                      : "hover:text-gray-600 hover:bg-gray-50"
                  }`}
                >
                  {vendor.vendor_title}
                </span>
              </li>
            ))}
          </ul>
          <Box
            sx={{
              boxShadow:
                "8px 8px 8px rgba(0, 0, 0, 0.1), -8px 8px 8px rgba(0, 0, 0, 0.1), 4px 8px 8px rgba(0, 0, 0, 0.1)",
              borderRadius: "12px",
            }}
          >
            {renderTabContent()}
          </Box>
        </Box>
      </div>
    </>
  );
};

export default AllVendorTableCard;
