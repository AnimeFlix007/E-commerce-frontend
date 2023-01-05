import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isCartOpen: false,
  cart: [],
  items: [],
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    setItems: (state, action) => {
      state.items = action.payload;
    },
    addToCart: (state, action) => {
      state.cart = [...state.cart, action.payload.item];
    },
    removeFromCart: (state, action) => {
      state.cart = state.cart.filter((item) => {
        return item._id !== action.payload.id;
      });
    },
    increaseCount: (state, action) => {
      state.cart = state.cart.map((item) => {
        if (item._id == action.payload.id) {
          item.count++;
        }
      });
    },
    decreaseCount: (state, action) => {
      console.log(action);
      state.cart = state.cart.map((item) => {
        if (item._id == action.payload.id && item.count > 1) {
          item.count--;
        }
      });
    },
    setIsCartOpen: (state, action) => {
      state.isCartOpen = !state.isCartOpen;
    },
  },
});

export const {
  setItems,
  addToCart,
  removeFromCart,
  increaseCount,
  decreaseCount,
  setIsCartOpen,
} = cartSlice.actions;

export default cartSlice.reducer;
