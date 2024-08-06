import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query/react";
import { apiSlice } from "./api/apiSlice";
import authReducer from './features/auth/authSlice.js'
import cartSliceReducer from './features/cart/cartSlice.js'





const store = configureStore({
    reducer: {
       [apiSlice.reducerPath] : apiSlice.reducer,
       auth: authReducer,
       cart: cartSliceReducer,

    },

    

    middleware : (getDefaultMidddleware) => getDefaultMidddleware().concat(apiSlice.middleware),
    devTools : true,
})


setupListeners(store.dispatch);
export default store;