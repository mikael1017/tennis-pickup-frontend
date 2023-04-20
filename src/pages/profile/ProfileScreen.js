import React from "react";
import { useDispatch } from "react-redux";
import { updateUserThunk } from "../../services/users/users-thunk";
import { findUserByUsername } from "../../services/users/users-service";
import { useNavigate } from "react-router";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { profileThunk, logoutThunk } from "../../services/users/users-thunk";
import { useParams } from "react-router-dom";
import { FormControl, FormGroup, TextField } from "@mui/material";
import {
	Button,
	Container,
	Grid,
	Card,
	CardMedia,
	CardContent,
	Typography,
} from "@mui/material";

const ProfileScreen = () => {
	const { currentUser } = useSelector((state) => state.users);
	const [profile, setProfile] = useState();
	// const [profileImage, setProfileImage] = useState("");
	const { userId } = useParams();
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const labels = [
		{ name: "Name", value: "name" },
		{ name: "Username", value: "username" },
		{ name: "Password", value: "password" },
		{ name: "Email", value: "email" },
		{ name: "City", value: "city" },
		{ name: "Phone Number", value: "phoneNumber" },
		{ name: "Skill Level", value: "skillLevel" },
	];
	const [followingList, setFollowingList] = useState([]);

	const handleClickFollow = (userId) => {
		const newFollowingList = [...followingList, userId];
		setFollowingList(newFollowingList);
		const newProfile = {
			...currentUser,
			followingPeople: newFollowingList,
		};
		dispatch(updateUserThunk(newProfile));
	};
	const handleClickUnfollow = (userId) => {
		const newFollowingList = followingList.filter((id) => id !== userId);
		setFollowingList(newFollowingList);
		const newProfile = {
			...currentUser,
			followingPeople: newFollowingList,
		};
		dispatch(updateUserThunk(newProfile));
	};
	const handleInputChange = (event, value) => {
		const newProfile = { ...profile, [value]: event.target.value };
		setProfile(newProfile);
	};
	const save = () => {
		dispatch(updateUserThunk(profile));
		window.alert("Profile updated successfully");
	};
	const fetchProfile = async () => {
		if (userId) {
			const user = await findUserByUsername(userId);
			setProfile(user);
			return;
		} else {
			const response = await dispatch(profileThunk());
			setProfile(response.payload);
		}
	};

	const handleMatchRequest = (username) => {
		// send a request to the userId
		// from currentUser
		//
		navigate(`/matchRequest/${username}`);
	};
	useEffect(() => {
		if (currentUser) {
			setFollowingList(currentUser.followingPeople);
		}

		fetchProfile();
	}, [userId]);

	return (
		<div>
			<div>
				{!currentUser && (
					<>
						<h2>Please login to view the profile</h2>
						<Button
							onClick={() => {
								navigate("/register");
							}}
							variant="contained"
							color="secondary"
						>
							Click here to become a member
						</Button>
					</>
				)}
				{currentUser && (
					<Grid
						container
						spacing={2}
						alignItems="center"
						justifyContent="center"
					></Grid>
				)}
			</div>
			{currentUser && currentUser.username === userId && profile && (
				<Grid
					container
					spacing={2}
					alignItems="center"
					justifyContent="center"
				>
					<FormGroup>
						<Grid sx={{ mt: 10 }}>
							{/* i have to make a style of this  */}
							<img
								alt="profile"
								src={profile.profileImage}
								style={{ width: "300px", height: "250px" }}
							/>
						</Grid>
						{labels.map(({ name, value }) => (
							<FormControl key={value} sx={{ my: 1 }}>
								<TextField
									id="outlined-required"
									disabled={value === "username"}
									value={profile[value]}
									label={name}
									onChange={(event) =>
										handleInputChange(event, value)
									}
								/>
							</FormControl>
						))}
						<Button
							variant="contained"
							color="success"
							onClick={save}
						>
							Save
						</Button>
						<Button
							variant="contained"
							color="error"
							onClick={() => {
								dispatch(logoutThunk());
								navigate("/");
							}}
						>
							Logout
						</Button>
					</FormGroup>
				</Grid>
			)}
			{currentUser && currentUser.username !== userId && profile && (
				<Container
					maxWidth="md"
					sx={{
						mt: 4,
						alignItem: "center",
						justifyContent: "center",
					}}
				>
					<Grid container spacing={2}>
						<Grid
							item
							xs={12}
							sm={12}
							md={12}
							key={profile.username}
						>
							<Card
								sx={{
									maxWidth: "600px",
									height: "100%",
									backgroundColor: "#dbdbc8",
								}}
							>
								<CardMedia
									// style={cardMediaStyle}
									sx={{
										width: 600,
										height: 400,
									}}
									image={profile.profileImage}
									title="Tennis Court Image"
								/>
								<CardContent
									sx={{
										display: "flex",
										flexDirection: "column",
										alignItems: "center",
									}}
								>
									<Typography
										gutterBottom
										variant="h5"
										component="h2"
									>
										{profile.name}
									</Typography>
									<Typography
										variant="body2"
										color="textSecondary"
										component="p"
									>
										{profile.role}
									</Typography>
									<Typography
										variant="body2"
										color="textSecondary"
										component="p"
									>
										{profile.city}
									</Typography>
									<Typography
										variant="body2"
										color="textSecondary"
										component="p"
									>
										{" NTRP rating - " + profile.skillLevel}
									</Typography>
									<br />
									{profile.role === "player" &&
										currentUser.followingPeople.includes(
											profile._id
										) && (
											<>
												<Button
													variant="contained"
													color="primary"
													onClick={() => {
														handleMatchRequest(
															profile.username
														);
													}}
												>
													Send a match request
												</Button>
												<Button
													variant="contained"
													color="error"
													onClick={() => {
														handleClickUnfollow(
															profile._id
														);
													}}
													sx={{ mt: 2 }}
												>
													Unfollow
												</Button>
											</>
										)}
									{profile.role === "player" &&
										!currentUser.followingPeople.includes(
											profile._id
										) && (
											<>
												<Button
													variant="contained"
													color="primary"
													onClick={() => {
														handleMatchRequest(
															profile.username
														);
													}}
													disabled
												>
													Follow to send a match
													request
												</Button>
												<Button
													variant="contained"
													color="success"
													onClick={() => {
														handleClickFollow(
															profile._id
														);
													}}
													sx={{ mt: 2 }}
												>
													Follow
												</Button>
											</>
										)}
									{profile.role === "coach" &&
										currentUser.followingPeople.includes(
											profile._id
										) && (
											<>
												<Button
													variant="contained"
													color="primary"
													onClick={() => {
														handleMatchRequest(
															profile.username
														);
													}}
												>
													Request for a lesson
												</Button>
												<Button
													variant="contained"
													color="error"
													onClick={() => {
														handleClickUnfollow(
															profile._id
														);
													}}
													sx={{ mt: 2 }}
												>
													Unfollow
												</Button>
											</>
										)}
									{profile.role === "coach" &&
										!currentUser.followingPeople.includes(
											profile._id
										) && (
											<>
												<Button
													variant="contained"
													color="primary"
													onClick={() => {
														handleMatchRequest(
															profile.username
														);
													}}
													disabled
												>
													Follow to request for a
													lesson
												</Button>
												<Button
													variant="contained"
													color="success"
													onClick={() => {
														handleClickFollow(
															profile._id
														);
													}}
													sx={{ mt: 2 }}
												>
													Follow
												</Button>
											</>
										)}
								</CardContent>
							</Card>
						</Grid>
					</Grid>
				</Container>
			)}
		</div>
	);
};
export default ProfileScreen;
