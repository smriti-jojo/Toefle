import * as React from "react";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";
import Cookies from "js-cookie";

export default function Loader({ status }) {
  return (
    <>
      {/* {status ? (
        <Box className="flex justify-center items-center mt-[6rem] text-black">
          <CircularProgress />
        </Box>
      ) : (
      <Box className="flex text-black">
       <CircularProgress />
        </Box>
      )} */}
      {/* <Box className="flex justify-center items-center mt-[6rem] ">
        <CircularProgress />
      </Box> */}
      {/* {Cookies.get("token") ? (
        Cookies.get("role") === "Admin" ? ( */}
      <>
        <Box className="flex justify-center ">
          <CircularProgress size={"23px"} color="secondary" />
        </Box>
      </>
      {/* ) : (
          <>
            <Box className="flex justify-center items-center mt-[6rem]">
              <CircularProgress />
            </Box>
          </
        )
      ) : (
        <>
          <Box className="flex">
            <CircularProgress color="secondary" />
          </Box> */}

      {/* )} */}
    </>
  );
}
