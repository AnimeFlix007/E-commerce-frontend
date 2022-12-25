import { combineReducers, configureStore } from "@reduxjs/toolkit"
import cartSlice from "./cartSlice"


const reducers = combineReducers({
    cart: cartSlice
})

export const store = configureStore({
    reducer: reducers
})