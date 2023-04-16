import axios from "axios";

const API_BASE = process.env.REACT_APP_API_BASE;
const COURTS_API = `${API_BASE}/courts`;
const CLUBS_API = `${API_BASE}/court/followers`;

const api = axios.create({
	withCredentials: true,
});

export const addFollowerToClub = async (clubId, followerId) => {
	const follower = { followerId: followerId };
	const response = await api.post(`${CLUBS_API}/${clubId}`, follower);
	return response.data;
};

export const removeFollowerFromClub = async (clubId, followerId) => {
	const response = await api.delete(`${CLUBS_API}/${clubId}/${followerId}`);
	return response.data;
};
