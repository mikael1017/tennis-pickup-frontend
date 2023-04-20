import { Grid, Paper, Avatar, Typography, Button } from "@mui/material";
import React from "react";
import { useState, useEffect } from "react";
import { findAllUsersThunk } from "../../services/users/users-thunk";
import { useNavigate } from "react-router";
import { useSelector } from "react-redux";
import StarIcon from "@mui/icons-material/Star";
import PeopleIcon from "@mui/icons-material/People";
import GroupAddIcon from "@mui/icons-material/GroupAdd";
import { updateUserThunk } from "../../services/users/users-thunk";
import { useDispatch } from "react-redux";
import { profileThunk } from "../../services/users/users-thunk";

const PeopleScreen = () => {
	// const [users, setUsers] = useState([]);
	const navigate = useNavigate();
	const { currentUser, users } = useSelector((state) => state.users);
	const [profile, setProfile] = useState(currentUser);
	const handleClickProfile = (username) => {
		navigate(`/profile/${username}`);
	};
	const [followingList, setFollowingList] = useState();
	const dispatch = useDispatch();
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

	const clickableStyle = {
		cursor: "pointer",
	};

	useEffect(() => {
		if (currentUser) {
			// setFollowingList(currentUser.followingPeople);
			console.log(currentUser);
			setProfile(currentUser);
			setFollowingList(currentUser.followingPeople);
		}
		dispatch(findAllUsersThunk());
	}, [currentUser]);

	// console.log(currentUser);
	// console.log(profile);
	return (
		<>
			{!currentUser && (
				<>
					<h1> You must be a member in order to see other people</h1>
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
				>
					{users.map((user) => (
						<Grid
							item
							xs={4}
							key={user._id}
							// alignItems="center"
							// justifyContent="center"
							// style={gridStyle}
							// onClick={() => {
							// 	handleClickProfile(user.username);
							// }}
						>
							<Paper
								sx={{
									my: 2,
									backgroundColor: "#dbdbc8",
									// backgroundColor: "#79f281",
									p: 5,
									// display: "flex",
									// justifyContent: "center",
									flexDirection: "column",
									// alignItems: "center",
								}}
							>
								<div
									sx={{
										display: "flex",
										justifyContent: "flex-end",
									}}
								>
									{currentUser.followingPeople.includes(
										user._id
									) && (
										<PeopleIcon
											style={clickableStyle}
											fontSize="large"
											sx={{ float: "right" }}
											color="secondary"
											onClick={(e) => {
												handleClickUnfollow(user._id);
											}}
										/>
									)}
									{!currentUser.followingPeople.includes(
										user._id
									) &&
										currentUser._id !== user._id && (
											<GroupAddIcon
												style={clickableStyle}
												key={user._id}
												fontSize="large"
												sx={{ float: "right" }}
												color="inherit"
												onClick={(e) => {
													handleClickFollow(user._id);
												}}
											/>
										)}
								</div>
								<Avatar
									alt={user.username}
									src={user.profileImage}
									sx={{ width: 64, height: 64, mb: 2 }}
								/>
								<Typography variant="h4" gutterBottom>
									{user.username}
								</Typography>
								<Typography variant="h5">
									{user.role}
								</Typography>
								<Typography
									variant="body1"
									color="text.secondary"
								>
									{user.email}
								</Typography>
								<Typography
									variant="body1"
									color="text.secondary"
								>
									{user.city}
								</Typography>
								<Typography
									variant="body1"
									color="text.secondary"
								>
									{user.skillLevel}
								</Typography>
								<br />
								<Button
									color="primary"
									variant="contained"
									onClick={() => {
										handleClickProfile(user.username);
									}}
								>
									{user.username === currentUser.username
										? "My Profile"
										: "Go to Profile"}
								</Button>
							</Paper>
						</Grid>
					))}
				</Grid>
			)}
		</>
	);
};

export default PeopleScreen;
