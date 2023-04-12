import axios from "axios";
const API_BASE = process.env.REACT_APP_API_BASE;
const GOOGLE_API_KEY = process.env.GOOGLE_API_KEY;

export const getLocationInfo = async (latitude, longitude) => {
	// this returns null
	// console.log(GOOGLE_API_KEY);
	const url = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=${GOOGLE_API_KEY}`;

	try {
		const response = await axios.get(url);
		const result = response.data.results[0];
		return result;
	} catch (error) {
		console.log(error);
	}
};
