import axios from "axios";
const API_BASE = "https://tennis-pickup-backend.onrender.com/api";
const USERS_API_URL = `${API_BASE}/users`;

const api = axios.create({
	withCredentials: true,
});

export const findAllUsers = async () => {
	const response = await axios.get(USERS_API_URL);
	// console.log(response);
	// console.log("hello");
	return response.data;
};
export const findUserById = async (userId) => {
	return await api
		.get(`${USERS_API_URL}/${userId}`)
		.then((response) => response.data);
};

export const findUserByUsername = async (username) => {
	return await api
		.get(`${USERS_API_URL}/${username}`)
		.then((response) => response.data);
};

export const createUser = async (user) => {
	return await axios.post(USERS_API_URL, user);
};

export const updateUser = async (newUser) => {
	return await api.put(`${USERS_API_URL}/${newUser._id}`, newUser);
};

export const deleteUser = async (username) => {
	return await axios.delete(`${USERS_API_URL}/${username}`);
};

export const login = async ({ username, password }) => {
	const response = await api.post(`${USERS_API_URL}/login`, {
		username,
		password,
	});
	console.log(response);
	return response;
	// return await api.post(`${USERS_API_URL}/login`, user);
};

export const logout = async () => {
	return await api.post(`${USERS_API_URL}/logout`);
};

export const register = async (user) => {
	return await api.post(`${USERS_API_URL}/register`, user);
};

export const profile = async () => {
	return await api.get(`${USERS_API_URL}/profile`);
};
