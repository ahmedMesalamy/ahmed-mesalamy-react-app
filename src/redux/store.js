import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "./cartSlice";

// Load cart from localStorage
const loadCartFromStorage = () => {
  try {
    const data = localStorage.getItem("cart");
    return data ? JSON.parse(data) : { items: [] };
  } catch {
    return { items: [] };
  }
};

const preloadedState = {
  cart: loadCartFromStorage(),
};

const store = configureStore({
  reducer: {
    cart: cartReducer,
  },
  preloadedState,
});

// Save cart to localStorage on every change
store.subscribe(() => {
  localStorage.setItem("cart", JSON.stringify(store.getState().cart));
});

export default store;
