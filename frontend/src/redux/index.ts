import { combineReducers, configureStore, createSlice } from "@reduxjs/toolkit";
import  toolKitSlice  from "./toolkitReducer";
import { useDispatch } from "react-redux";


const rootReducer = combineReducers({
    toolkit: toolKitSlice
})

export const store = configureStore({
    reducer: rootReducer,
})
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>();
export type RootState = ReturnType<typeof rootReducer>


