import React, { useLayoutEffect } from "react";
import Navbar from "../Components/Material/Navbar";
import { useNavigate, useParams } from "react-router-dom";
import Cookies from "js-cookie";
import localinstance from "../localinstance";
import { useState } from "react";
import { useEffect } from "react";
import Swal from "sweetalert2";

const Home = () => {
  const [disable, setdisable] = useState(false);

  useEffect(() => {
    fetch();
  }, []);
  const navigate = useNavigate();

  const handlePractice = () => {
    // navigate("/junior_playlist");
    navigate("/get_test/practice");
  };

  const fetch = async () => {
    const res = await localinstance({
      url: `school/getSchoolInfo`,
      method: "GET",
      headers: {
        Authorization: "Bearer " + Cookies.get("token"),
      },
    }).catch((err) => {
      console.log(err.response.status);
      if (err.response.status === 401) {
        Swal.fire({
          text: "Session Expired",
          icon: "error",
        });
        navigate("/");
      }
    });

    console.log(res.data.message);

    const expireDate1 = res.data.message.expireAt.split("T")[0];
    const currentDate1 = `${new Date().getFullYear()}-${
      new Date().getMonth() + 1
    }-${new Date().getDate()}`;
    const expireDate = new Date(expireDate1);
    const currentDate = new Date(currentDate1);
    console.log(expireDate >= currentDate);
    if (expireDate <= currentDate) {
      Swal.fire({
        text: "Login Expired",
        icon: "error",
      });
      setdisable(true);
    }
  };

  return (
    <>
      <div className=" w-full">
        <Navbar status={"home"} />
        <p className="text-3xl text-blue-400 italic ml-[5vw] mt-4">
          Listening Comprehension
        </p>
        <div className="flex flex-col sm:flex-row gap-[3rem] justify-center mt-[15vh]">
          <div
            className={`flex justify-center items-center rounded-md mx-[4.5rem] sm:mx-0 !w-[50%] !h-[200px] sm:!w-[30%] sm:!h-[300px] border-2 border-black text-xl  sm:text-3xl text-center font-bold shadow-md shadow-black bg-gradient-to-b from-sky-400 to-sky-200 ${
              disable ? "cursor-default" : "cursor-pointer"
            }`}
            onClick={disable ? "" : handlePractice}
            TestName="Practice"
          >
            {/* <img src={junior} alt="junior" /> */}
            Practice Test
          </div>
          <div
            className="flex justify-center items-center text-center rounded-md mx-[4.5rem] sm:mx-0 !w-[50%] !h-[200px] sm:!w-[30%] sm:!h-[300px] border-2 border-black  text-xl sm:text-3xl font-bold shadow-md shadow-black bg-gradient-to-r from-gray-200 via-gray-400 to-gray-600"
            // onClick={handleJunior}
            // onClick={handlePractice}
            TestName="Live"
          >
            {/* <img src={primary} alt="primary" /> */}
            Live Test
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
