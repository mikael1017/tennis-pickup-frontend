import React, { useState, useEffect } from "react";
import {
	TextField,
	Grid,
	Container,
	CardMedia,
	Card,
	CardContent,
	Typography,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import { getLocationInfo } from "../../services/google/google-service";
import PublicSearchBar from "../../searchbar/PublicSearchbar";
import { Link } from "react-router-dom";

const SearchScreen = () => {
	const [searchResults, setSearchResults] = useState([]);
	const handleSearchResults = (results) => {
		setSearchResults(results);
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
					newResponses.push(response);
				} else {
					newResponses.push("error");
				}
			}
			setCourtResults(newResponses);
		};
		getResponses();
	}, [searchResults]);
	console.log(courtResults);

	return (
		<>
			<PublicSearchBar handleSearchResults={handleSearchResults} />
			<Container maxWidth="md" sx={{ mt: 4 }}>
				<Grid container spacing={2}>
					{courtResults.map((court) => (
						<Grid item xs={12} sm={6} md={4} key={court?.place_id}>
							<Card sx={{ maxWidth: 345, height: "100%" }}>
								<Link
									// Link to court club page
									// make it so that the link is only clickable if the court is not an error
									to={`/court/${court.place_id}`}
									target="_blank"
									rel="noopene"
								>
									<CardMedia
										sx={{ height: 140 }}
										image={court?.photos?.[0]?.getUrl()}
										title="Tennis Court Image"
									/>
								</Link>
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
