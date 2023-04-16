import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import {
	Grid,
	Container,
	CardMedia,
	Card,
	CardContent,
	Typography,
} from "@mui/material";
import {
	getLocationInfo,
	getPlaceDetails,
	// getPlacePhoto,
} from "../../services/google/google-service";
import PublicSearchBar from "../../searchbar/PublicSearchbar";
import { Link, useNavigate } from "react-router-dom";
import { findCourtsByZip } from "../../services/search/search-service";

const SearchScreen = () => {
	const apiKey = process.env.REACT_APP_API_KEY;
	const { zipCode } = useParams();
	const [searchResults, setSearchResults] = useState([]);
	const navigate = useNavigate();
	const [courtResults, setCourtResults] = useState([]);
	const [loading, setLoading] = useState(false);

	const handleSearchResults = (results) => {
		setSearchResults(results);
		navigate(`/search/${results}`);
	};
	const handleCourtClick = (placeId) => {
		navigate(`/court/${placeId}`);
	};

	useEffect(() => {
		const getResponses = async () => {
			// console.log(zipCode);

			const newResponses = [];
			setLoading(true);
			const courts = await findCourtsByZip(zipCode);
			// handleSearchResults(courts);

			for (const result of courts) {
				if (result !== "error") {
					const response = await getLocationInfo(
						result.latitude,
						result.longitude
					);
					newResponses.push(response);
				} else {
					newResponses.push("error");
				}
			}
			setSearchResults(courts);
			setLoading(false);
			setCourtResults(newResponses);
		};
		if (zipCode) {
			getResponses();
		}
	}, [zipCode]);
	// console.log(courtResults);
	const cardMediaStyle = {
		cursor: "pointer",
	};

	return (
		<>
			<PublicSearchBar handleSearchResults={handleSearchResults} />

			<Container maxWidth="md" sx={{ mt: 4 }}>
				<Grid container spacing={2}>
					{courtResults.map((court) => (
						<Grid item xs={12} sm={6} md={4} key={court?.place_id}>
							<Card sx={{ maxWidth: 345, height: "100%" }}>
								<CardMedia
									style={cardMediaStyle}
									onClick={() =>
										handleCourtClick(court.place_id)
									}
									sx={{ width: 345, height: 140 }}
									image={`https://maps.googleapis.com/maps/api/streetview?size=345x140&location=${court?.geometry.location.lat},${court?.geometry.location.lng}&key=${apiKey}`}
									title="Tennis Court Image"
								/>
								<CardContent>
									<Typography
										gutterBottom
										variant="h5"
										component="h2"
									>
										{court?.name}
									</Typography>
									<Typography
										variant="body2"
										color="textSecondary"
										component="p"
									>
										{court?.formatted_address}
									</Typography>
								</CardContent>
							</Card>
						</Grid>
					))}
				</Grid>
			</Container>
		</>
	);
};

export default SearchScreen;
