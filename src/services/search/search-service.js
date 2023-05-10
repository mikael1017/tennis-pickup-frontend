import axios from "axios";

const API_BASE = "https://tennis-pickup-backend.onrender.com/api";
const COURTS_API = `${API_BASE}/courts`;

export const findCourtsByCity = async (city) => {
	const response = await axios.get(`${COURTS_API}/city/${city}`);
	const courts = response.data;
	return courts;
};

export const findCourtsByZip = async (zip) => {
	const response = await axios.get(`${COURTS_API}/zip/${zip}`);
	const courts = response.data;
	// console.log("courts results " + courts);
	return courts;
};

export const findCourtsByState = async (state) => {
	const response = await axios.get(`${COURTS_API}/state/${state}`);
	const courts = response.data;
	return courts;
};

export const addCourt = async (court) => {
	const response = await axios.post(COURTS_API, court);
	return response.data;
};
