import {configureStore, createSlice} from '@reduxjs/toolkit'

const cartInitialState ={
    isCartVisible:false
}

const CartSlice = createSlice({
    name:'cart',
    initialState:cartInitialState,
    reducers:{
        cartToggle(state){
            state.isCartVisible=!state.isCartVisible
        }
    }
})

export const cartAction = CartSlice.actions

const store = configureStore({reducer:{cart:CartSlice.reducer}})
export default store