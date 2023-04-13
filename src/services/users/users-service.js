import axios from "axios";
const USERS_API_URL = "http://localhost:4000/api/users";

const api = axios.create({
	withCredentials: true,
});

export const findAllUsers = async () => {
	const response = await axios.get(USERS_API_URL);
	return response.data;
};

export const findUserByUsername = async (username) => {
	return await axios
		.get(`${USERS_API_URL}/${username}`)
		.then((response) => response.data);
};

export const createUser = async (user) => {
	return await axios.post(USERS_API_URL, user);
};

export const updateUser = async (newUser) => {
	return await axios.put(`${USERS_API_URL}/${newUser.id}`, newUser);
};

export const deleteUser = async (username) => {
	return await axios.delete(`${USERS_API_URL}/${username}`);
};

export const login = async ({ username, password }) => {
	const response = await api.post(`${USERS_API_URL}/login`, {
		username,
		password,
	});
	const user = response.data;
	return user;
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
