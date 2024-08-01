import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query/react";
import { apiSlice } from "./api/apiSlice";
import { set } from "mongoose";
import { getFavoritesFromLocalStorage } from "../utils/localStorage";
import authReducer from './features/auth/authslice'
import favoritesReducer from './features/favorites/favoriteSlice'

const initialFavorites = getFavoritesFromLocalStorage() || []


const store = configureStore({
    reducer: {
       [apiSlice.reducerPath] : apiSlice.reducer,
       auth: authReducer,
       favorites: favoritesReducer,

    },

    preloadedState : {
        favorites: initialFavorites
    },

    middleware : (getDefaultMidddleware) => getDefaultMidddleware().concat(apiSlice.middleware),
    devTools : true,
})


setupListeners(store.dispatch)
export default store