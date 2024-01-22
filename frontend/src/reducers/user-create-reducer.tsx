import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { Env } from '../enviornment/enviorment';


export const createUser = createAsyncThunk(
    "createUser",
    async ( payload:any,thunkAPI:any) => {
        try {
            console.log('payload',payload)
            const response: any = await axios.post(`${Env.baseUrl}/create-user`,payload)
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

export const createUserSlice = createSlice({
    name: 'create_user',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(createUser.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(createUser.fulfilled, (state, action) => {
                state.loading = false;
                state.details = action.payload;
            })
            .addCase(createUser.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message || 'Something went wrong';
            });
    },
});
export default createUserSlice.reducer;
