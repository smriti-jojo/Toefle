import React from "react";
import Navbar from "../Components/Material/Navbar";
import junior from "../Components/assest/junior_logo.jpg";
import senior from "../Components/assest/senior-logo.png";
import primary from "../Components/assest/primary-logo.png";
import { useNavigate, useParams } from "react-router-dom";
import localinstance from "../localinstance";
import { useLayoutEffect } from "react";
import Cookies from "js-cookie";
import { useState } from "react";
import Swal from "sweetalert2";

const Category = () => {
  const [data, setData] = useState([]);
  const { category } = useParams();
  console.log(category);

  useLayoutEffect(() => {
    TestByCategory();
  }, []);

  const navigate = useNavigate();
  //   const handleJunior = () => {
  //     navigate("/junior_playlist");
  //   };
  const handlePlaylist = (id) => {
    console.log(id);

    navigate(`${id}`);
  };

  const TestByCategory = async () => {
    const res = await localinstance({
      url: `test/getTest/${category}`,
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
    setData(res.data.message);
    console.log(res.data.message[0].Title);
  };
  return (
    <>
      <div className=" w-full">
        <Navbar status={"home"} />
        <p className="text-3xl text-blue-400 italic ml-[5vw] mt-4">
          Listening Comprehension
        </p>
        <div className="flex flex-col sm:flex-row gap-[3rem] justify-center  mt-[15vh]">
          {data.map((item) => (
            <div
              className="flex justify-center items-center text-center rounded-md  mx-[4.5rem] sm:mx-0 !w-[50%] !h-[200px] sm:!w-[30%]  sm:!h-[300px] border-2 border-black cursor-pointer text-xl sm:text-3xl font-bold shadow-md shadow-black bg-gradient-to-b from-sky-400 to-sky-200"
              // onClick={handleJunior}
              onClick={() => handlePlaylist(item.id)}
            >
              <p className="w-fit ">{item.Title}</p>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Category;
