import React, { createContext, useContext, useEffect, useState } from "react";
import PlayCircleOutlineIcon from "@mui/icons-material/PlayCircleOutline";
import IconButton from "@mui/material/IconButton";
import { BsPauseCircleFill, BsPlay } from "react-icons/bs";

import "./playlist.css";
import "./audio.css";
import { useDispatch, useSelector } from "react-redux";
import { audioActions, setAudioList } from "../Redux/Features/audioSlice";
// import PlayCircleIcon from '@mui/icons-material/PlayCircle';
import {
  changing2_true_Func,
  changing2_false_Func,
} from "../Redux/changeIconState/changeIconApiCall";
import Sidebar from "../Components/Material/Sidebar";
import { DataContext } from "../Context/DataProvider";
import Footer from "../Components/Material/Footer";
import Navbar from "../Components/Material/Navbar";
import localinstance from "../localinstance";
import Cookies from "js-cookie";
import { useParams } from "react-router-dom";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

// export const ContextIconsPlay = createContext();
// export const AudioContext = React.createContext();

const Playlist = ({ value }) => {
  //  context
  const [sidebarshow, setShowsidebar] = useState(false);
  const { iconss, setIconsToggle } = useContext(DataContext);
  const [play, setPlay] = useState(true);
  // const [toggleicons, settoggleIcons] = useState(iconss);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const matchedIcons = useSelector((state) => state.audio.currentAudio);

  // const matched = JSON.stringify(matchedIcons)

  const matched = JSON.parse(JSON.stringify(matchedIcons[0].id));

  const [songList, setSongsList] = useState([]);
  const [icons, setIcons] = useState(false);

  const sendAudio = (id) => {
    const i = songList.find((song) => song.id === id);
    // console.log(i);

    dispatch(audioActions(i));
    // dispatch(audioActions(songList));
  };

  // play and pause icons change
  // const playAndPauseIconSongs =(songsId,state)=>{
  //   dispatch(audioActions(songsId,state))
  // }

  // chnageIcons status
  const changePlay = (status) => {
    setPlay(status);
  };
  const changeStatus = () => {
    // settoggleIcons(!toggleicons)
    // const toggle = () => setIsOpen(!isOpen );
    setIconsToggle(!iconss);

    if (iconss == false) {
      dispatch(changing2_true_Func());
    } else if (iconss == true) {
      dispatch(changing2_false_Func());
    }
  };

  const toggle = (status) => {
    setShowsidebar(status);
  };
  const ply_value = useSelector((state) => state.icns.ply);
  // console.log("PLY_VALUE", ply_value);

  const [ply_state, set_ply_state] = useState(null);

  useEffect(() => {
    set_ply_state(ply_value);
  }, [ply_value]);
  useEffect(() => {
    fetch();
  }, []);

  let { id } = useParams();
  const fetch = async () => {
    const res = await localinstance({
      url: `audio/getAudiosByTest/${id}`,
      method: "GET",
      headers: {
        Authorization: "Bearer " + Cookies.get("token"),
      },
    }).catch((err) => {
      // console.log(err.response.status);
      if (err.response.status === 401) {
        Swal.fire({
          text: "Session Expired",
          icon: "error",
        });
        navigate("/");
      }
    });
    // console.log("RES", res.data.message);
    let audioList = [];

    res.data.message.map((item, index) => {
      audioList.push({
        Title: item.Title,
        Url: item.Url,
        TestId: item.TestId,
        createdAt: item.createdAt,
        updatedAt: item.updatedAt,
      });
    });

    audioList = audioList
      .slice()
      .sort(
        (a, b) => Number(a.Title.split(" ")[1]) - Number(b.Title.split(" ")[1])
      );
    audioList.map((item, index) => {
      item.id = index + 1;
    });
    // console.log(audioList);
    dispatch(setAudioList(audioList));

    setSongsList(audioList);
  };
  return (
    <>
      <div className="w-full relative  bg-[#f6f6f6] flex-col max-h-screen ">
        <Navbar status={"home"} />
        <div className="flex ">
          <div className=" mt-[1.5rem]">
            <div className="flex flex-col gap-3  overflow-auto h-[85vh] w-[80vw] sm:h-[73vh] mx-[2rem] sm:mx-0 ">
              {songList.map((songs, i) => {
                return (
                  <>
                    {/* <AudioContext.Provider value="saagagara"> */}
                    <div
                      key={i}
                      className=" w-full flex lg:px-5  cursor-pointer justify-center "
                      // onClick={() => { sendAudio(songs.id); playAndPauseIconSongs(songs.id);}}
                      onClick={() => {
                        sendAudio(songs.id);
                        changeStatus();
                      }}
                    >
                      <div className="w-[20vw] flex playlistw lg:w-[10vw] md:w-[10vw] playlist20vw  pr-[10px]  justify-center items-center center bg-[#8080802e]">
                        <IconButton
                          className=""
                          // className="circlePlaylist w-[30px] h-[30px]"
                          color="primary"
                          aria-label="add to shopping cart"
                        >
                          {/* {matched == songs.id ? (
                          <BsPauseCircleFill />
                        ) : (
                          <PlayCircleOutlineIcon />
                        )} */}
                          {ply_state && matched == songs.id ? (
                            <BsPauseCircleFill />
                          ) : (
                            <PlayCircleOutlineIcon />
                          )}
                        </IconButton>
                      </div>
                      {/*  */}
                      <div className="w-[70vw] playlist70vw relative lg:w-[70vw] bg-[#8080802e]">
                        <p className="font-bold text-[12px] lg:pl-[15px] lg:p-1">
                          {songs.Title}
                        </p>
                        {/* <p className="text-[10px] lg:p-1 lg:pl-[15px] ">
                          {songs.id}
                        </p> */}
                      </div>
                    </div>
                    {/* </AudioContext.Provider> */}
                  </>
                );
              })}
              {/* <div className="playallBtn fixed right-0 w-[110px] h-[60px] bottom-[125px]">
                    <PlayCircleIcon className="text-[#0069FF] cursor-pointer "></PlayCircleIcon>
                  </div> */}
            </div>
            {/* <div>
            <Footer changePlay={changePlay} />
          </div> */}
          </div>
          <div className="ml-[1.4rem]">
            <Sidebar state={sidebarshow} toggle={toggle} />
          </div>
        </div>
        <div>
          <Footer changePlay={changePlay} />
        </div>
      </div>
      {/* <Footer changePlay={changePlay} /> */}
    </>
  );
};

// export const { songList } = Playlist.SongList;
export default Playlist;
// export const { songList } = Playlist.SongList;

// export {AudioProvider}
