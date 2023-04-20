import React from "react";
import { useParams } from "react-router";
import { Button } from "@mui/material";
import { addFollowerToClub } from "../../services/court/court-service";
import { useSelector } from "react-redux";
import { getPlaceDetails } from "../../services/google/google-service";
import { useEffect, useState } from "react";
import { updateUserThunk } from "../../services/users/users-thunk";
import { useDispatch } from "react-redux";
import {
	Grid,
	Container,
	CardMedia,
	Card,
	CardContent,
	Typography,
} from "@mui/material";
import { getCourtFollowers } from "../../services/court/court-service";
import { findAllUsersThunk } from "../../services/users/users-thunk";
import ProfileListItem from "../../components/ProfileListItem";

const apiKey = process.env.REACT_APP_API_KEY;
const CourtScreen = () => {
	const dispatch = useDispatch();
	const { courtId } = useParams();
	const { currentUser, users } = useSelector((state) => state.users);
	const [courtDetails, setCourtDetails] = useState({});
	const [courtLocation, setCourtLocation] = useState();
	const [followingList, setFollowingList] = useState([]);
	useEffect(() => {
		// console.log(courtId);
		const getCourtDetails = async () => {
			const details = await getPlaceDetails(courtId);
			setCourtDetails(details);
			setCourtLocation(details.geometry.location);
			const courtInfo = await getCourtFollowers(courtId);
			// console.log(courtInfo[0].followers);
			setFollowingList(courtInfo[0].followers);
			// console.log(followingList);
		};
		getCourtDetails();
		dispatch(findAllUsersThunk());
	}, [courtId]);
	// console.log(courtDetails.geometry);

	const handleFollowClick = () => {
		addFollowerToClub(courtId, currentUser._id);
		if (!currentUser.followingCourts.includes(courtId)) {
			const newFollowingList = [...currentUser.followingCourts, courtId];
			const newProfile = {
				...currentUser,
				followingCourts: newFollowingList,
			};
			dispatch(updateUserThunk(newProfile));
		}
	};
	return (
		<>
			{courtDetails.geometry && (
				<Container maxWidth="md" sx={{ mt: 4 }}>
					<Grid container spacing={2}>
						<Grid item xs={12} sm={12} md={12} key={courtId}>
							<Card sx={{ maxWidth: "650px", height: "100%" }}>
								<CardMedia
									// style={cardMediaStyle}
									sx={{ width: 600, height: 400 }}
									image={`https://maps.googleapis.com/maps/api/streetview?size=600x400&location=${courtLocation.lat},${courtLocation.lng}&key=${apiKey}`}
									title="Tennis Court Image"
								/>
								<CardContent>
									<Typography
										gutterBottom
										variant="h5"
										component="h2"
									>
										{courtDetails.name}
									</Typography>
									<Typography
										variant="body2"
										color="textSecondary"
										component="p"
									>
										{courtDetails.formatted_address}
									</Typography>
								</CardContent>
							</Card>
						</Grid>
					</Grid>
				</Container>
			)}
			{currentUser && (
				<Button
					onClick={handleFollowClick}
					variant="contained"
					color="secondary"
				>
					Follow this club
				</Button>
			)}

			<h1>People following this court</h1>
			{currentUser && (
				<>
					{followingList &&
						users.map((user) => {
							// console.log(user);
							if (followingList.includes(user._id)) {
								return (
									<>
										<ProfileListItem user={user} />
									</>
								);
							}
						})}
				</>
			)}
			{!currentUser && <h2>You must log in to see other people!</h2>}
		</>
	);
};
export default CourtScreen;
