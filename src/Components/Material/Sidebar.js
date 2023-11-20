import React, { useState } from "react";
import { Link } from "react-router-dom";
import { AiOutlineClose, AiOutlineMail } from "react-icons/ai";
import { IoCall } from "react-icons/io5";
import { HiMail } from "react-icons/hi";

import "../../Components/sidebar.css";
const Sidebar = ({ state, toggle }) => {
  const [hidden, setHidden] = useState(true);
  // const [hamburger, setHamnburger] = useState(window.screen > 768 ? true : false )

  const hideSide = () => {
    toggle(false);
  };

  return (
    <>
      <div
        className={`flex flex-col items-center absolute lg:relative md:relative z-20 md:!w-[18.5vw] ${
          state ? "sidebarwidth178" : "sidebarwidth80"
        }  h-[80vh] overflow-hidden text-gray-400 bg-gray-900 `}
      >
        {/* <div className="flex  w-full px-3 mt-[40px]" href="#">
          <img
            className="bg-white h-10 fill-current rounded lg:px-[20px] lg:py-[2px]"
            src="https://www.eupheus.in/static/media/logo.f9fd97ff89ac44ae2b1f.png"
          ></img>
          <AiOutlineClose
            style={{ marginLeft: "auto", top: "-31px" }}
            className="lg:hidden md:hidden relative text-[#c4c4c4]  font-[18px]"
            onClick={hideSide}
          />
        </div> */}
        <div className="w-full px-2">
          <div className="flex flex-col  w-full  border-gray-700">
            {/* <a className="flex items-center w-full h-12 px-3 mt-2 rounded hover:bg-gray-700 hover:text-gray-300" >
					<svg className="w-6 h-6 stroke-current" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
						<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
					</svg>
					<span className="search ml-2 text-sm lg:!block font-medium ">Search</span>
				</a> */}

            {/* <div className="sideData  ml-[10px] mt-[30px]">
              <span className="text-gray-50 text-[10px] lg:text-[12px] font-[600]">
                PROFICIENCY LEARNING <br />
                SOLUTIONS PRIVATE LIMITED
              </span>
            </div>
            <hr className="lg:mt-4 mt-2 " /> */}
            <div className="flex flex-col gap-1 mt-10 ml-[10px] ">
              <span className=" font-bold lg:text-[16px] text-[#F0DE36]">
                Terms &amp; Conditions:
              </span>
              <span className="text-gray-100 text-[10px] lg:text-[12px] font-[400]">
                You agree to share information <br /> entered on this page with{" "}
                <br />
                PROFICIENCY LEARNING SOLUTIONS <br /> PRIVATE LIMITED (owner of
                this page), <br /> adhering to applicable laws.
              </span>
            </div>

            <hr className="lg:mt-4 mt-2" />
            <div className="flex flex-col gap-1 mt-10">
              <span className="text-[#F0DE36] ml-[8px] font-bold lg:text-[16px] ">
                Contact Us:
              </span>
              <span className="text-gray-100 flex ">
                <HiMail className="MuiSvgIcon-root MuiSvgIcon-fontSizeMedium css-vubbuv w-[15%] mr-[5px] mt-1 text-[#c4c4c4]"></HiMail>{" "}
                <span className=" lg:text-[14px] text-[12px]">
                  care@eupheus.in
                </span>
              </span>
              <span className="text-gray-100 flex  ">
                <IoCall className="MuiSvgIcon-root MuiSvgIcon-fontSizeMedium css-vubbuv w-[15%] mr-[5px] mt-1 text-[#c4c4c4]"></IoCall>{" "}
                <span className="lg:text-[14px] text-[12px]">01161400200</span>
              </span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
