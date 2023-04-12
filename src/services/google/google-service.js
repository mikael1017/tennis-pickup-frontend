import axios from "axios";

export const getLocationInfo = async (latitude, longitude) => {
	// this returns null
	// console.log(GOOGLE_API_KEY);
	const API_BASE = process.env.REACT_APP_API_BASE;
	const apiKey = process.env.REACT_APP_API_KEY;
	const url = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=${apiKey}`;

	try {
		const response = await axios.get(url);
		const result = response.data.results[0];
		return result;
	} catch (error) {
		console.log(error);
	}
};

export const getPlaceDetails = async (placeId) => {
	const apiKey = process.env.REACT_APP_API_KEY;
	const url = `https://cors-anywhere.herokuapp.com/https://maps.googleapis.com/maps/api/place/details/json?place_id=${placeId}&fields=name,rating,formatted_phone_number,opening_hours,photos&key=${apiKey}`;
	try {
		const response = await axios.get(url);
		// console.log(response);
		const result = response.data.result;
		return result;
	} catch (error) {
		console.log(error);
	}
};

export const getPlacePhoto = async (latitude, longitude) => {
	const apiKey = process.env.REACT_APP_API_KEY;
	const url = `https://cors-anywhere.herokuapp.com/https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&&key=${apiKey}`;
	try {
		const response = await axios.get(url);
		console.log(response);
		const result = response.data.result;
		return result;
	} catch (error) {
		console.log(error);
	}
};
