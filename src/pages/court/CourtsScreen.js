import React from "react";
import { useState, useEffect } from "react";
import {
	Container,
	Grid,
	Card,
	CardMedia,
	CardContent,
	Typography,
} from "@mui/material";
import { useNavigate } from "react-router";
import { useSelector } from "react-redux";
import { getPlaceDetails } from "../../services/google/google-service";

const CourtsScreen = () => {
	const navigate = useNavigate();
	const apiKey = process.env.REACT_APP_API_KEY;
	const [courts, setCourts] = useState([]);
	const { currentUser } = useSelector((state) => state.users);
	const cardMediaStyle = {
		cursor: "pointer",
	};

	const handleCourtClick = (placeId) => {
		console.log(placeId);
		navigate(`/court/${placeId}`);
	};

	useEffect(() => {
		const getFollowingCourts = async () => {
			const courtIds = currentUser.followingCourts;
			const courtNamePromises = courtIds.map(getPlaceDetails);
			const responses = await Promise.all(courtNamePromises);
			const courts = responses;
			setCourts(courts);
		};
		getFollowingCourts();
	}, [currentUser]);

	return (
		<div>
			<Container sx={{ mt: 4 }}>
				<Grid container spacing={2}>
					{courts.map((court) => (
						<Grid item xs={12} sm={6} md={4} key={court?.place_id}>
							<Card
								onClick={() => handleCourtClick(court.place_id)}
								sx={{
									maxWidth: 345,
									height: "100%",
									backgroundColor: "#dbdbc8",
								}}
							>
								<CardMedia
									style={cardMediaStyle}
									sx={{
										width: 345,
										height: 140,
									}}
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
		</div>
	);
};

export default CourtsScreen;
