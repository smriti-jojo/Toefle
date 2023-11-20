import { createSlice } from "@reduxjs/toolkit";

export const audioSlice = createSlice({
  name: "audio",
  initialState: {
    audios: [],
    currentAudio: [
      {
        id: "",
        Title: "",
        Url: "",
      },
    ],
    currentAudioId: [
      {
        id: "",
      },
    ],
  },
  reducers: {
    audioActions: (state, action) => {
      state.currentAudio = state.audios.filter(
        (singleaudio) => singleaudio.id == action.payload.id
      );
    },
    setAudioList: (state, action) => {
      console.log("STATE", state.audios);
      state.audios = action.payload;
      console.log("STATE", state.audios);
    },
    setaudioActions: (state, action) => {
      state.currentAudio = state.audios.filter(
        (singleaudio) => singleaudio.Title == action.payload.Title
      );
    },
  },
});

export const { audioActions, setAudioList, setaudioActions } =
  audioSlice.actions;

// this is for configureStore
export default audioSlice.reducer;
