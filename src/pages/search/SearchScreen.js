import React, { useState, useEffect } from "react";
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

const SearchScreen = () => {
	const apiKey = process.env.REACT_APP_API_KEY;
	const [searchResults, setSearchResults] = useState([]);
	const navigate = useNavigate();
	const handleSearchResults = (results) => {
		setSearchResults(results);
	};
	const handleCourtClick = (placeId) => {
		navigate(`/court/${placeId}`);
	};
	const [courtResults, setCourtResults] = useState([]);
	useEffect(() => {
		const getResponses = async () => {
			const newResponses = [];
			for (const result of searchResults) {
				if (result !== "error") {
					const response = await getLocationInfo(
						result.latitude,
						result.longitude
					);
					const details = await getPlaceDetails(response.place_id);

					// const photo = await getPlacePhoto(
					// 	result.latitude,
					// 	result.longitude
					// );
					// console.log(details);
					// console.log(photo);
					newResponses.push(response);
				} else {
					newResponses.push("error");
				}
			}
			setCourtResults(newResponses);
		};
		getResponses();
	}, [searchResults]);
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
