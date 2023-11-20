import { createSlice } from "@reduxjs/toolkit";

const changeIconSlice = createSlice({
    name: "changeIcon",
    initialState: {
        ply: false,
        plyFromPlaylist: false,
    },
    reducers: {
        changing_true: (state) => {
            state.ply = true;
        },
        changing_false: (state) => {
            state.ply = false;
        },
        changing2_true: (state) => {
            state.plyFromPlaylist = true;
        },
        changing2_false: (state) => {
            state.plyFromPlaylist = false;
        }
    },
});

export const {
    changing_false, changing_true, changing2_true, changing2_false
} = changeIconSlice.actions;
export default changeIconSlice.reducer;