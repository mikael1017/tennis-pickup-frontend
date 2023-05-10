import axios from "axios";
const MATCHES_API_URL =
	"https://tennis-pickup-backend.onrender.com/api/matches";
const api = axios.create({
	withCredentials: true,
});

export const createMatchRequest = async (matchRequest) => {
	return await api.post(MATCHES_API_URL, matchRequest);
};

export const deleteMatchRequest = async (matchRequestId) => {
	console.log(matchRequestId);
	return await api.delete(`${MATCHES_API_URL}/${matchRequestId}`);
};

export const getRequestedMatches = async (username) => {
	return await api.get(`${MATCHES_API_URL}/requester/${username}`);
};

export const getRequesteeMatches = async (username) => {
	return await api.get(`${MATCHES_API_URL}/requestee/${username}`);
};

export const confirmMatchRequest = async (match) => {
	console.log(match);
	return await api.post(`${MATCHES_API_URL}/confirmed`, match);
};

export const deleteConfirmedMatch = async (matchId) => {
	console.log(`${MATCHES_API_URL}/confirmed/${matchId}`);
	return await api.delete(`${MATCHES_API_URL}/confirmed/${matchId}`);
};

export const getConfirmedMatchesByRequestee = async (username) => {
	return await api.get(`${MATCHES_API_URL}/confirmed/requestee/${username}`);
};

export const getConfirmedMatchesByRequester = async (username) => {
	return await api.get(`${MATCHES_API_URL}/confirmed/requester/${username}`);
};
