import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query/react";
import { apiSlice } from "./api/apiSlice";
import { set } from "mongoose";
import authReducer from './features/auth/authslice'

const store = configureStore({
    reducer: {
       [apiSlice.reducerPath] : apiSlice.reducer,
       auth: authReducer,
    },

    middleware : (getDefaultMidddleware) => getDefaultMidddleware().concat(apiSlice.middleware),
    devTools : true,
})


setupListeners(store.dispatch)
export default store