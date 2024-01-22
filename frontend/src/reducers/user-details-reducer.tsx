import axios from 'axios';
import { Env } from '../enviornment/enviorment';







// Part 1
import { createSlice, PayloadAction } from "@reduxjs/toolkit"

// Part 2
export interface IssueInitialState {
    details: object
}
const initialState: IssueInitialState = {
    details: {}
}

// Part 3
export const userDetailsSlice = createSlice({
    name: 'userDetails',
    initialState,
    reducers: {
        userDetails: (state, action: PayloadAction<string>) => {
            state.details = { ...state.details, data: action.payload }
        }
    }
})

// Part 4
export const { userDetails } = userDetailsSlice.actions
export default userDetailsSlice.reducer
