import { createSlice } from "@reduxjs/toolkit";
import {
	findAllUsersThunk,
	updateUserThunk,
	createUserThunk,
	deleteUserThunk,
	findUserByUsernameThunk,
	loginThunk,
	logoutThunk,
	profileThunk,
	registerThunk,
} from "../services/users/users-thunk";

const initialState = {
	users: [],
	userName: "",
	loading: false,
	currentUser: null,
	profileImage: "",
};

const userSlice = createSlice({
	name: "users",
	initialState: initialState,
	reducers: {},
	extraReducers: {
		[updateUserThunk.fulfilled]: (state, action) => {
			state.users = state.users.map((user) =>
				user.id === action.payload.id ? action.payload : user
			);
			console.log(action.payload);
			state.currentUser = action.payload;
		},
		[createUserThunk.fulfilled]: (state, action) => {
			state.users.push(action.payload);
		},
		[deleteUserThunk.fulfilled]: (state, action) => {
			state.users = state.users.filter(
				(user) => user.id !== action.payload
			);
		},
		[findAllUsersThunk.pending]: (state, action) => {
			state.loading = true;
			state.users = [];
		},
		[findAllUsersThunk.fulfilled]: (state, action) => {
			state.loading = false;
			state.users = action.payload;
		},
		[findAllUsersThunk.rejected]: (state, action) => {
			state.loading = false;
			state.error = action.error.message;
		},
		[findUserByUsernameThunk.pending]: (state, action) => {
			state.loading = true;
		},
		[findUserByUsernameThunk.fulfilled]: (state, action) => {
			state.loading = false;
		},
		[loginThunk.fulfilled]: (state, action) => {
			state.currentUser = action.payload;
		},
		[logoutThunk.fulfilled]: (state, action) => {
			state.currentUser = null;
		},
		[profileThunk.fulfilled]: (state, action) => {
			state.currentUser = action.payload;
		},
		[registerThunk.fulfilled]: (state, action) => {
			state.currentUser = action.payload;
		},
	},
});

export default userSlice.reducer;
