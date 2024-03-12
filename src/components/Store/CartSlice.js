

import { combineSlices, configureStore, createSlice } from '@reduxjs/toolkit';
import { act } from '@testing-library/react';

const cartInitialState = {
  isCartVisible: false,
  notification : null,
  itemsInCart: [],
  cartChanged:false
};

const CartSlice = createSlice({
  name: 'cart',
  initialState: cartInitialState,
  reducers: {
    cartToggle(state) {
      state.isCartVisible = !state.isCartVisible;
      
    },
    setNotification(state,action){
      state.notification = {status:action.payload.status,title:action.payload.title,message:action.payload.message}
    },
    replaceCart(state,action){
    state.itemsInCart = action.payload.itemsInCart || [];
      
    },
    addToCart(state, action) {
      const payload = action.payload
      state.cartChanged = true
      const existingItem = state.itemsInCart.find((item) => item.id === payload.id);
      if (existingItem) {
        state.itemsInCart = state.itemsInCart.map((item) =>
          item.id === existingItem.id ? { ...item, qty: item.qty + 1 } : item
        );
      } else {
        state.itemsInCart.push({ ...payload, qty: 1 });
      }
    },

    incrementQty(state, action) {
      const itemId = action.payload;
      state.cartChanged = true
      const existingItem = state.itemsInCart.find((item) => item.id === itemId);
      if (existingItem) {
        state.itemsInCart = state.itemsInCart.map((item) =>
          item.id === existingItem.id ? { ...item, qty: item.qty + 1 } : item
        );
      }      
    },

decrementQty(state, action) {
  const itemId = action.payload;
  state.cartChanged = true
  const existingItem = state.itemsInCart.find((item) => item.id === itemId);

  if (existingItem && existingItem.qty <= 1) {
    state.itemsInCart = state.itemsInCart.filter((item) => item.id !== itemId);
    
  } 
  else if (existingItem && existingItem.qty >1) 
  {
    state.itemsInCart = state.itemsInCart.map((item) =>
      item.id === existingItem.id ? { ...item,qty: item.qty - 1 } : item
    )
  }
}}}

)

export const sendCartData = (cartData) => {
  return async (dispatch) => {
    try {
      dispatch(
        cartAction.setNotification({
          status: "pending",
          title: "sending..",
          message: "sending data...",
        })
      );

      const response = await fetch(
        "https://cart-ae90b-default-rtdb.firebaseio.com/cart.json",
        {
          method: "PUT",
          body: JSON.stringify(cartData),
        }
      );

      if (!response.ok) {
        throw new Error("Problem in sending data!");
      }

      dispatch(
        cartAction.setNotification({
          status: "success",
          title: "success",
          message: "Data sent successfully!",
        })
      );
    } catch (error) {
      dispatch(
        cartAction.setNotification({
          status: "error",
          title: "failed",
          message: "failed to send data!",
        })
      );
    }
  };
};

export const fetchCartData =()=>{
  return async(dispatch)=>{
       try{
      const fetchData = await fetch("https://cart-ae90b-default-rtdb.firebaseio.com/cart.json")
      if(!fetchData.ok){
        throw new Error('Problem in fetching data')
      }
      const response = await fetchData.json()
      dispatch(cartAction.replaceCart(response));
      }
    catch(error){
       dispatch(
        cartAction.setNotification({
          status: "error",
          title: "error..",
          message: error.message,
        })
      )
    }
 
}
}


export const cartAction = CartSlice.actions;

const store = configureStore({ reducer: { cart: CartSlice.reducer } });
export default store;
