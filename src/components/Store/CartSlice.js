

import { configureStore, createSlice } from '@reduxjs/toolkit';

const cartInitialState = {
  isCartVisible: false,
  itemsInCart: [],
};

const CartSlice = createSlice({
  name: 'cart',
  initialState: cartInitialState,
  reducers: {
    cartToggle(state) {
      state.isCartVisible = !state.isCartVisible;
    },
    addToCart(state, action) {
      const payload = action.payload;

      const existingItem = state.itemsInCart.find((item) => item.products.id === payload.products.id);
      if (existingItem) {
        state.itemsInCart = state.itemsInCart.map((item) =>
          item.products.id === existingItem.products.id ? { ...item, qty: item.qty + 1 } : item
        );
      } else {
        state.itemsInCart.push({ ...payload, qty: 1 });
      }
    },
    incrementQty(state, action) {
      const itemId = action.payload;
      const existingItem = state.itemsInCart.find((item) => item.products.id === itemId);
      if (existingItem) {
        state.itemsInCart = state.itemsInCart.map((item) =>
          item.products.id === existingItem.products.id ? { ...item, qty: item.qty + 1 } : item
        );
      }
    },
    decrementQty(state, action) {
      const itemId = action.payload;
      const existingItem = state.itemsInCart.find((item) => item.products.id === itemId);
      if (existingItem && existingItem.qty > 1) {
        state.itemsInCart = state.itemsInCart.map((item) =>
          item.products.id === existingItem.products.id ? { ...item, qty: item.qty - 1 } : item
        );
      }
    },
  },
});

export const cartAction = CartSlice.actions;

const store = configureStore({ reducer: { cart: CartSlice.reducer } });
export default store;
