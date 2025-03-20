"use client";
import withAuth from "@/app/auth/RouterAuth";
/* eslint-disable react/no-unescaped-entities */
/* eslint-disable @next/next/no-img-element */
import { X_API_Key } from "@/app/URL's/Api_X_Key";
import { Base_URL } from "@/app/URL's/Base_URL";
import { Icon } from "@iconify/react";
import {
  Box,
  Card,
  IconButton,
  Snackbar,
  SnackbarContent,
  TextField,
  Typography,
} from "@mui/material";
import axios from "axios";
import Link from "next/link";
import { useEffect, useState } from "react";

const TeAccess = ({ params }) => {
  const [teAccess, setTeAccess] = useState({});
  const [copiedKeyIndex, setCopiedKeyIndex] = useState(-1);
  const [snackbarOpen, setSnackbarOpen] = useState(false);

  const handleCopyToClipboard = (key, index) => {
    navigator.clipboard.writeText(key);
    setCopiedKeyIndex(index);
    setSnackbarOpen(true);
  };

  const handleCloseSnackbar = () => {
    setSnackbarOpen(false);
  };
  useEffect(() => {
    const fetchData = async () => {
      if (typeof window !== "undefined") {
        const loginResponse = JSON.parse(localStorage.getItem("loginResponse"));

        if (loginResponse) {
          try {
            const response = await axios.get(
              `${Base_URL}/v1/account/te-access/${params.id_one}/${params.id_two}/${params.id_three}`,
              {
                headers: {
                  "x-api-key": X_API_Key,
                  Authorization: `Bearer ${loginResponse._token}`,
                },
              }
            );

            setTeAccess(response.data); // Assuming response.data contains the data you want to set
          } catch (error) {
            console.error("Error fetching data:", error);
          }
        }
      }
    };

    fetchData();
  }, [params.id_one, params.id_two, params.id_three]);

  return (
    <div className="container px-4 my-20 mx-auto">
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={3000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
      >
        <SnackbarContent
          sx={{
            backgroundColor: "green",
          }}
          message={
            <span style={{ display: "flex", alignItems: "center" }}>
              <Icon
                icon="gg:copy"
                width="1.6em"
                height="1.6em"
                style={{ color: "white", marginRight: "4px" }}
              />
              Key copied to clipboard!
            </span>
          }
        />
      </Snackbar>

      <Box
        className="container mx-auto"
        sx={{
          mt: "10px",
          py: "20px",
          // boxShadow: "inset 0px 0px 8px rgba(0, 0, 0, 0.5)",
          borderRadius: "4px",
        }}
      >
        <Typography
          lineHeight={"30px"}
          variant="h1"
          fontSize={30}
          className="text-blue-600"
          fontWeight={400}
        >
          <b>Test Engine Access</b>
        </Typography>
        <Typography
          lineHeight={"30px"}
          variant="h2"
          fontSize={20}
          className="text-gray-600"
          fontWeight={500}
        >
          <b className="text-green-500">
            {teAccess.exam_code} {teAccess.exam_vendor}{" "}
            <span className="text-gray-700 text-2xl">"</span>
          </b>
          <b>{teAccess.exam_name}</b>
          <span className="text-gray-700 text-2xl">"</span>
        </Typography>
      </Box>
      {teAccess.keys && teAccess.keys.length > 0 && (
        <Box
          className="container mx-auto"
          sx={{
            border: "0px",
            borderRadius: "0px",
            marginTop: "10px",
            // boxShadow: "0px 0px 8px rgba(0, 0, 0, 0.5)",
            // borderRadius: "12px",
            paddingY: "20px",
            bgcolor: "white",
          }}
        >
          {teAccess.keys.map((item, i) => (
            <>
              <Typography fontWeight={600}>
                Activation & Purchase Key {i + 1}
              </Typography>
              <Typography className="text-red-500">
                {item.activation_key_used ? "This key is already used!" : ""}
              </Typography>
              <TextField
                size="small"
                variant="outlined"
                // label={"Activation Keys"}
                value={`${item.purchase_key}|${item.activation_key}`}
                disabled={item.activation_key_used ? true : false}
                fullWidth
                InputProps={{
                  readOnly: true,
                  endAdornment: (
                    <IconButton
                      onClick={() =>
                        handleCopyToClipboard(
                          `${item.purchase_key}|${item.activation_key}`,
                          i
                        )
                      }
                    >
                      <Icon
                        icon="mingcute:copy-line"
                        width="1em"
                        height="1em"
                        style={{ color: "#545e6b" }}
                      />
                    </IconButton>
                  ),
                }}
                sx={{
                  marginBottom: "10px",
                  marginTop: "10px",
                  boxShadow: "inset 0px 0px 8px rgba(0, 0, 0, 0.2)",
                  color: "#0070",
                  fontWeight: "bold",
                }}
              />
            </>
          ))}
        </Box>
      )}
      {!teAccess.keys && (
        <Card
          className="container mx-auto"
          sx={{
            mt: "10px",
            p: "20px",
            boxShadow: "inset 0px 0px 8px rgba(0, 0, 0, 0.5)",
            bgcolor: "#FECACA",
          }}
        >
          <Typography variant="h5" fontWeight={600} textAlign={"center"}>
            No activation keys available.
          </Typography>
        </Card>
      )}

      <Box
        className="container mx-auto"
        sx={{
          mt: "10px",
          mb: "10px",
          display: "flex",
          justifyContent: "flex-end",
        }}
      >
        {teAccess.te_file && (
          <Link href={`https://certsgang.com${teAccess.te_file}`}>
            <button className="relative inline-flex items-center justify-center p-0.5 mb-2 me-2 overflow-hidden text-sm font-medium text-white rounded-lg group hover:bg-gradient-to-l bg-gradient-to-br from-green-500 to-green-500 group-hover:from-cyan-500 group-hover:to-green-500 hover:text-white">
              <span className="relative px-5 py-2.5 transition-all ease-in duration-75  rounded-md group-hover:bg-opacity-0 flex">
                <Icon
                  icon="uil:file-download-alt"
                  width="1.7em"
                  height="1.4em"
                />
                Download .prepsaway File
              </span>
            </button>
          </Link>
        )}
        {/* {teAccess.te_file_zip && (
          <Link href={`https://certsgang.com${teAccess.te_file_zip}`}>
            <button className="relative inline-flex items-center justify-center p-0.5 mb-2 me-2 overflow-hidden text-sm font-medium text-white rounded-lg group hover:bg-gradient-to-l bg-gradient-to-br from-green-500 to-green-500 group-hover:from-cyan-500 group-hover:to-green-500 hover:text-white">
              <span className="relative px-5 py-2.5 transition-all ease-in duration-75  rounded-md group-hover:bg-opacity-0 flex">
                <Icon
                  icon="tabler:file-type-zip"
                  width="1.7em"
                  height="1.5em"
                />
                Download .zip File
              </span>
            </button>
          </Link>
        )} */}
      </Box>
      <Box
        className="container mx-auto  bg-green-100"
        sx={{
          color: "white",
          padding: "15px",
          textAlign: "justify",
          boxShadow: "inset 0px 0px 8px rgba(0, 0, 0, 0.5)",
          borderRadius: "12px",
          // backgroundColor: "#C7DFE8",
        }}
      >
        <Typography variant="h4" className="text-gray-800" fontWeight={600}>
          How To Use?
        </Typography>
        <Typography className="text-gray-700" fontWeight={600}>
          Download the PrepsAway Test Engine Simulator and install it, then
          download the premium .prepsaway file using above yellow button and
          you will get .zip file, unzip it, and add it to PrepsAway Test Engine
          Simulator. Activate the premium .prepsaway file with above purchase
          and activation keys.
        </Typography>
      </Box>
    </div>
  );
};

export default withAuth(TeAccess);
