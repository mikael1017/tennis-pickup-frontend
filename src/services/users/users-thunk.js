import * as userService from "./users-service";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const findAllUsersThunk = createAsyncThunk("users/findAll", async () => {
	const users = await userService.findAllUsers();
	return users;
});

export const findUserByUsernameThunk = createAsyncThunk(
	"users/findByUsername",
	async (username) => {
		const response = await userService.findUserByUsername(username);
		return response.data;
	}
);

export const createUserThunk = createAsyncThunk(
	"users/create",
	async (user) => {
		const response = await userService.createUser(user);
		return response.data;
	}
);

export const updateUserThunk = createAsyncThunk(
	"users/update",
	async (user) => {
		await userService.updateUser(user);
		return user;
	}
);

export const deleteUserThunk = createAsyncThunk(
	"users/delete",
	async (username) => {
		await userService.deleteUser(username);
		return username;
	}
);

export const loginThunk = createAsyncThunk(
	"users/login",
	async (credentials) => {
		const response = await userService.login(credentials);
		return response.data;
	}
);

export const logoutThunk = createAsyncThunk("users/logout", async () => {
	await userService.logout();
});

export const registerThunk = createAsyncThunk(
	"users/register",
	async (user) => {
		// console.log("hello from registerThunk");
		console.log(user);
		const response = await userService.register(user);
		return response.data;
	}
);

export const profileThunk = createAsyncThunk("users/profile", async () => {
	const response = await userService.profile();
	return response.data;
});
