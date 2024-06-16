import { createSlice } from "@reduxjs/toolkit";


const basketSlice = createSlice({
    name: 'basket',
    initialState: {
        totalAmountBasket: 0,
        basketDeviceCount: 0,
    },
    reducers: {
        totalAmountBasketPlus(state, action) {
            state.totalAmountBasket += action.payload;
        },
        totalAmountBasketMinus(state, action) {
            state.totalAmountBasket -= action.payload;
        },
        basketDeviceCountPlus(state, action) {
            state.basketDeviceCount += action.payload;
        },
        basketDeviceCountMinus(state, action) {
            state.basketDeviceCount -= action.payload;
        },
    }
})

export const { 
    totalAmountBasketPlus, 
    totalAmountBasketMinus,
    basketDeviceCountPlus,
    basketDeviceCountMinus
} = basketSlice.actions;
export default basketSlice;