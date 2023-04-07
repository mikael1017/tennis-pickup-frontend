import axios from "axios";
import { Court } from "../models/Court";

const API_BASE = process.env.REACT_APP_API_BASE;
const COURTS_API = `${API_BASE}/courts`;

export const findCourtsByCity = async (city: String) => {
	const response = await axios.get(`${COURTS_API}/city/${city}`);
	const courts = response.data;
	return courts;
};

export const findCourtsByZip = async (zip: Number) => {
	const response = await axios.get(`${COURTS_API}/zip/${zip}`);
	const courts = response.data;
	return courts;
};

export const findCourtsByState = async (state: String) => {
	const response = await axios.get(`${COURTS_API}/state/${state}`);
	const courts = response.data;
	return courts;
};

export const addCourt = async (court: Court) => {
	const response = await axios.post(COURTS_API, court);
	return response.data;
};
