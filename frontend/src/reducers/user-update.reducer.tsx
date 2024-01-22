import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { Env } from '../enviornment/enviorment';


export const userUpdate = createAsyncThunk(
    "userUpdate",
    async (payload: any, thunkAPI: any) => {
        try {
            const response: any = await axios.put(`${Env.baseUrl}/update/${payload.id}`, payload)
            console.log('response', response)
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

export const userUpdateSlice = createSlice({
    name: 'user_update',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(userUpdate.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(userUpdate.fulfilled, (state, action) => {
                state.loading = false;
                state.details = action.payload;
            })
            .addCase(userUpdate.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message || 'Something went wrong';
            });
    },
});
export default userUpdateSlice.reducer;
