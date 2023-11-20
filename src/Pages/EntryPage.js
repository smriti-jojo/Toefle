import React, { useLayoutEffect, useState } from "react";
import Cover from "../Components/assest/Login.png";
import eupheus from "../Components/assest/eupheus.png";
import Tabs from "../Components/Material/Tabs";

const Login = () => {
  const [tabvalue, setTabvalue] = useState("");
  useLayoutEffect(() => {});

  const handleTabValue = (e) => {
    setTabvalue(e);
  };

  return (
    <div className="flex !min-h-screen w-full">
      <div className="w-0 sm:w-[70%]">
        <img
          src={Cover}
          // className="h-0 w-0 sm:h-[712px] sm:w-[1500px] md:h-[712px] md:w-[2500px] lg:h-[712px] lg:w-[4800px]"
          className={`h-0 w-0 sm:!w-full sm:!h-full object-fill`}
        ></img>
      </div>

      <div className="!h-full !w-full sm:!w-[30%]">
        <form
          className="flex  flex-col !h-full   p-5 rounded-lg  "
          style={{ "box-shadow": "rgba(17, 12, 46, 0.15) 0px 48px 100px 0px" }}
        >
          <div className="flex justify-center mb-[3vh]">
            <img
              src={eupheus}
              className="!w-[150px] sm:!w-[280px]"
              alt="img"
            ></img>
          </div>

          <Tabs value={handleTabValue} />
        </form>
      </div>
    </div>
  );
};

export default Login;
