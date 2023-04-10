import axios from "axios";
const USERS_API_URL = "http://localhost:4000/api/users";

const api = axios.create({
	withCredentials: true,
});

export const findAllUsers = async () => {
	const response = await axios.get(USERS_API_URL);
	return response.data;
};

export const findUserByUsername = (username) => {
	return axios
		.get(`${USERS_API_URL}/${username}`)
		.then((response) => response.data);
};

export const createUser = (user) => {
	return axios.post(USERS_API_URL, user);
};

export const updateUser = (newUser) => {
	return axios.put(`${USERS_API_URL}/${newUser.id}`, newUser);
};

export const deleteUser = (username) => {
	return axios.delete(`${USERS_API_URL}/${username}`);
};

export const login = (user) => {
	return api.post(`${USERS_API_URL}/login`, user);
};

export const logout = () => {
	return api.post(`${USERS_API_URL}/logout`);
};

export const register = (user) => {
	return api.post(`${USERS_API_URL}/register`, user);
};

export const profile = () => {
	return api.get(`${USERS_API_URL}/profile`);
};
