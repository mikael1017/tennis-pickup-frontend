import axios from "axios";
const MATCHES_API_URL = "http://localhost:4000/api/matches";
const api = axios.create({
	withCredentials: true,
});

export const createMatchRequest = async (matchRequest) => {
	return await api.post(MATCHES_API_URL, matchRequest);
};

export const deleteMatchRequest = async (matchRequestId) => {
	return await api.delete(`${MATCHES_API_URL}/${matchRequestId}`);
};
