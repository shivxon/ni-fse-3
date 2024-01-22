import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { Env } from '../enviornment/enviorment';


export const getUserDetails = createAsyncThunk(
    "userDetails",
    async ( id:string,thunkAPI:any) => {
        try {
            const response: any = await axios.get(`${Env.baseUrl}/user-details/${id}`,)
            console.log('response',response)
            const data = response?.data;
            return data;
        } catch (error) {
            return thunkAPI.rejectWithValue("Failed to fetch issues.");
        }
    }
);

interface IssuesState {
    details: Object;
    loading: boolean;
    error: string | null;
}
const initialState: IssuesState = {
    details: {},
    loading: false,
    error: null,
};

export const userDetailsSlice = createSlice({
    name: 'user_details',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getUserDetails.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getUserDetails.fulfilled, (state, action) => {
                state.loading = false;
                state.details = action.payload;
            })
            .addCase(getUserDetails.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message || 'Something went wrong';
            });
    },
});
export default userDetailsSlice.reducer;
