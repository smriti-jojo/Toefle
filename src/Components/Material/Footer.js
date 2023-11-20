import React, { useContext, useEffect, useRef, useState } from "react";
import AudioPlayer from "react-h5-audio-player";
import PauseIcon from "@mui/icons-material/Pause";
import "react-h5-audio-player/lib/styles.css";
import { useDispatch, useSelector } from "react-redux";
// import { AudioContext } from "../Pages/Playlist";
import { AudioContext } from "../../App";
import { audioActions, setaudioActions } from "../../Redux/Features/audioSlice";
import "../../Components/footer.css";
import PlayCircleIcon from "@mui/icons-material/PlayCircle";
import { BsPlayCircleFill, BsPlay } from "react-icons/bs";
import { Tooltip } from "@mui/material";
import PlayCircleOutlineIcon from "@mui/icons-material/PlayCircleOutline";
import {
  changing_true_Func,
  changing_false_Func,
  changing2_true_Func,
  changing2_false_Func,
} from "../../Redux/changeIconState/changeIconApiCall";
import PauseCircleFilledIcon from "@mui/icons-material/PauseCircleFilled";

const Footer = ({ changePlay }) => {
  const dispatch = useDispatch();

  const selector = useSelector((state) => state.audio.currentAudio);
  console.log("SELECTOR1", selector);
  // const selectorId =useSelector((state)=> state.audio.currentAudioId)
  const AllAudios = useSelector((state) => state.audio.audios);
  console.log("AllAudios", AllAudios);
  // const [url, setUrl] = useState(selector[0].fileUrl)

  // const [index, setIndex] =useState(0)
  const [current, setCurrent] = useState(selector[0]);
  const [playButton, setplayButton] = useState(false);

  const sendAudio = (id) => {
    console.log("SELECTOR", selector);
    console.log("ALLAUDIOS", AllAudios);
    const i = AllAudios.find((song) => id == song.id);
    dispatch(audioActions(i));
  };

  const previousSong = () => {
    const previousSong = AllAudios.find(
      (audio) => Number(audio.id) === Number(selector[0].id) - 1
    );
    sendAudio(previousSong.id);
  };

  const ended = () => {
    // setIndex(index + 1)
    const nextAudio = AllAudios.find(
      (audio) => Number(audio.id) === Number(selector[0].id) + 1
    );
    sendAudio(nextAudio.id);
  };

  const onPlayFunc = (idofplay) => {
    console.log("IDURL", idofplay);
    dispatch(changing_true_Func());
    dispatch(changing2_true_Func());
    dispatch(changing2_true_Func());

    changePlay(true);
    // setplayButton(true);
    // dispatch(audioActions(idofplay));
  };
  const onPauseFunc = (idofpause) => {
    dispatch(changing_false_Func());
    dispatch(changing_false_Func());
    dispatch(changing2_false_Func());

    changePlay(false);
    setplayButton(false);
    // dispatch(audioActions( idofpause));
  };

  // const [playState, setplaystate] = useState(false);

  // togglePlaystate function
  const togglePlaystate = () => {};

  // const audio = useContext(AudioContext);

  const playAll = (id) => {
    // const playallBtnAudio = AllAudios.find(
    //   (audio) => Number(audio.id) === Number(selector[0].id) +1
    // );
    // sendAudio(playallBtnAudio.id);
    if (id) {
      setplayButton(true);
    }

    const i = AllAudios.find((song) => id == song.id);
    dispatch(setaudioActions(i));
  };

  const plyFromPlaylist = useSelector((state) => state.icns.plyFromPlaylist);
  const ply_value = useSelector((state) => state.icns.ply);

  const playerRef = useRef();

  const playButtonAction = () => {
    playerRef.current.audio.current.pause();
    setplayButton(false);
  };

  useEffect(() => {
    console.log(plyFromPlaylist, ply_value);
    if (plyFromPlaylist == true && ply_value == false) {
      playerRef.current.audio.current.play();
    } else if (plyFromPlaylist == false && ply_value == true) {
      playerRef.current.audio.current.pause();
    }
  }, [plyFromPlaylist]);

  return (
    <>
      {/* play all icons */}
      <Tooltip title="Play All">
        {playButton ? (
          <div className="playallBtn rounded-full fixed right-[50px] sm:right-[350px] w-[50px] h-[50px] bg-white bottom-[152px] z-50  ">
            <PauseCircleFilledIcon
              sx={{ fontSize: "52px" }}
              className="text-[#0069FF] fixed  circle cursor-pointer w-[50px] h-[50px] bottom-[152px] right-[50px] sm:right-[350px]"
              onClick={playButtonAction}
            ></PauseCircleFilledIcon>
          </div>
        ) : (
          <div className="playallBtn rounded-full fixed right-[50px] sm:right-[350px] w-[50px] h-[50px] bg-white bottom-[152px] z-50  ">
            <BsPlayCircleFill
              className="text-[#0069FF] fixed  circle cursor-pointer w-[50px] h-[50px] bottom-[152px] right-[50px] sm:right-[350px]"
              onClick={(e) => {
                playAll(1);
              }}
            ></BsPlayCircleFill>
          </div>
        )}
      </Tooltip>
      {/* play all icons */}

      <div className=" h-[12vh] absolute bottom-0 w-full footermain  ">
        <div className="h-[12vh] lg:h-[12vh] lg:relative footer  relative z-30  md:relative songs">
          <div className="playlist">
            <AudioPlayer
              ref={playerRef}
              style={{ padding: "0px 15px", height: "12vh" }}
              src={selector[0].Url}
              onPlay={(e) => {
                onPlayFunc(selector[0].id);
                togglePlaystate();
              }}
              // onPause={() => (onPauseFunc(selector[0].id ) ; func2();}}
              onEnded={ended}
              onPause={() => {
                onPauseFunc(selector[0].id);
                togglePlaystate();
              }}
              showSkipControls={true}
              onClickPrevious={previousSong}
              onClickNext={ended}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default Footer;
