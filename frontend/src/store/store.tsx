import { configureStore } from "@reduxjs/toolkit";
import productsReducer from '../reducers/user-list-reducer'
import createUserReducer from '../reducers/user-create-reducer'
import { useDispatch } from "react-redux";
import userUpdateReducer from "../reducers/user-update.reducer";
import userDetailsReducer from "../reducers/user-details-reducer";


export const store = configureStore({
    reducer: {
        userList: productsReducer,
        createUser:createUserReducer,
        userUpdate:userUpdateReducer,
        getUserDetails:userDetailsReducer
    }
})
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
export const useAppDispatch = () => useDispatch<AppDispatch>()