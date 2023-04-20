import React, { useEffect } from "react";
import PublicNavBar from "../../navbar/PublicNavbar";
import PublicSearchBar from "../../searchbar/PublicSearchbar";
import SearchScreen from "../search/SearchScreen";
import FollowingPeopleList from "../../followingList/FollowingPeopleList";
import FollowingCourtList from "../../followingList/FollowingCourtList";
import {
	Grid,
	Typography,
	Avatar,
	Button,
	List,
	ListItem,
	ListItemText,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import posterImage from "../../images/main-poster.jpeg";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { findAllUsersThunk } from "../../services/users/users-thunk";
import CourtsScreen from "../court/CourtsScreen";

const PublicHomeComponent = () => {
	const navigate = useNavigate();
	const { currentUser, users } = useSelector((state) => state.users);
	const dispatch = useDispatch();
	useEffect(() => {
		if (currentUser) {
			// setFollowingList(currentUser.followingPeople);
			// console.log(currentUser);
		}
		dispatch(findAllUsersThunk());
	}, [currentUser]);
	return (
		<>
			{currentUser && (
				<Grid
					container
					alignItems="center"
					justifyContent="center"
					spacing={2}
				>
					<Grid item xs={7}>
						<Typography sx={{ my: 2 }} variant="h4">
							Welcome back {currentUser.name}
						</Typography>
					</Grid>
					<Grid item xs={7}>
						<FollowingPeopleList />
					</Grid>
					<Grid item xs={7}>
						<Typography sx={{ my: 2 }} variant="h5">
							Your following Courts
						</Typography>
						<CourtsScreen />
					</Grid>
				</Grid>
			)}
			{!currentUser && (
				<Grid container alignItems="center" justifyContent="center">
					<Grid item xs={12} sm={8}>
						<div style={{ position: "relative" }}>
							<img
								src={posterImage}
								alt="Poster Image"
								style={{ width: "100%" }}
							/>
							<Grid
								container
								justifyContent="center"
								alignItems="center"
								style={{
									position: "absolute",
									top: 0,
									bottom: 0,
									left: 0,
									right: 0,
								}}
							>
								<Grid item>
									<Typography
										variant="h4"
										gutterBottom
										color="secondary"
										sx={{
											textAlign: "center",
											fontWeight: "bold",
										}}
									>
										Find Tennis Players Near You and Play
										Today!
									</Typography>
									<Grid
										item
										style={{
											textAlign: "center",
											marginTop: "2rem",
										}}
									>
										<Button
											variant="contained"
											color="secondary"
											style={{
												color: "black",
											}}
											onClick={() => {
												navigate("/search");
											}}
										>
											Get Started
										</Button>
									</Grid>
								</Grid>
							</Grid>
						</div>
					</Grid>
				</Grid>
			)}
		</>
	);
};

export default PublicHomeComponent;
