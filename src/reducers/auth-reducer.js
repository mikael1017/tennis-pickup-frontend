import { createSlice } from "@reduxjs/toolkit";
import {
	loginThunk,
	logoutThunk,
	profileThunk,
	updateUserThunk,
	registerThunk,
} from "../services/users/users-thunk";

const authSlice = createSlice({
	name: "auth",
	initialState: {
		currentUser: null,
	},
	reducers: {},
	extraReducers: {},
});

export default authSlice.reducer;
