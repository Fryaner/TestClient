import { createSlice } from "@reduxjs/toolkit";


const favoriteSlice = createSlice({
    name: 'favorite',
    initialState: {
        favoriteDeviceCount: 0,
    },
    reducers: {
        favoriteDeviceCountPlus(state, action) {
            state.favoriteDeviceCount += action.payload;
        },
        favoriteDeviceCountMinuse(state, action) {
            state.favoriteDeviceCount -= action.payload;
        },
    }
})

export const { 
    favoriteDeviceCountPlus,
    favoriteDeviceCountMinuse
} = favoriteSlice.actions;

export default favoriteSlice;