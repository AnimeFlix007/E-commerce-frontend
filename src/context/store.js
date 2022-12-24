import { combineReducers, configureStore } from "@reduxjs/toolkit"
import { cartSlice } from "./cartSlice"

const reducer = combineReducers({
    cart: cartSlice
})

export const store = configureStore({
    reducer: reducer
})