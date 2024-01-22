import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios'
import { Env } from '../enviornment/enviorment';

//For Dev Apis

// const baseUrl: any = 'https://xeccpcy808.execute-api.us-east-1.amazonaws.com/dev'

//For Prod Apis
const baseUrl: any = 'https://xeccpcy808.execute-api.us-east-1.amazonaws.com/prod'


export const getUserList = createAsyncThunk(
    "userList",
    async (query:any, thunkAPI:any) => {
        try {
            const response: any = await axios.get(`${Env.baseUrl}/list?page=${query.page}&limit=${query.limit}`)
            return response?.data;
        } catch (error) {
            return thunkAPI.rejectWithValue("Failed to fetch issues.");
        }
    }
);


interface IssuesState {
    list: Object[];
    loading: boolean;
    error: string | null;
}
const initialState: IssuesState = {
    list: [],
    loading: false,
    error: null,
};

export const userListSlice = createSlice({
    name: 'user_list',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getUserList.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getUserList.fulfilled, (state, action) => {
                state.loading = false;
                state.list = action.payload;
            })
            .addCase(getUserList.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message || 'Something went wrong';
            });
    },
});
export default userListSlice.reducer;
