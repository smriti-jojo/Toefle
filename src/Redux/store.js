import { configureStore } from '@reduxjs/toolkit';
import audioReducer from "../Redux/Features/audioSlice";
import iconRedux from './changeIconState/changeIconRedux';

export default configureStore({
  reducer: {
    audio: audioReducer,
    icns: iconRedux
  },
});