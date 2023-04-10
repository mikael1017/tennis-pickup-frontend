import axios from "axios";
const API_BASE = process.env.REACT_APP_API_BASE;
const GOOGLE_API_KEY = process.env.REACT_APP_GOOGLE_API_KEY;

function getLocationInfo(longitude, latitude) {
	const url = `https://maps.googleapis.com/maps/api/place/details/json?location=${latitude},${longitude}&fields=name,formatted_address,geometry&type=tennis_court&key=YOUR_API_KEY`;

	axios
		.get(url)
		.then((response) => {
			console.log(response.data);
		})
		.catch((error) => {
			console.log(error);
		});
}
