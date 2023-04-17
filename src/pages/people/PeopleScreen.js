import { Grid, Paper, Avatar, Typography, Button } from "@mui/material";
import React from "react";
import { useState, useEffect } from "react";
import { findAllUsers } from "../../services/users/users-service";
import { useNavigate } from "react-router";
import { useSelector } from "react-redux";

const PeopleScreen = () => {
	const [users, setUsers] = useState([]);
	const navigate = useNavigate();
	const { currentUser } = useSelector((state) => state.users);
	const handleClickProfile = (username) => {
		navigate(`/profile/${username}`);
	};
	const gridStyle = {
		cursor: "pointer",
	};

	useEffect(() => {
		const fetchUsers = async () => {
			const users = await findAllUsers();
			setUsers(users);
		};
		fetchUsers();
	}, []);
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
				<Grid container spacing={2}>
					{users.map((user) => (
						<Grid
							item
							xs={4}
							md={4}
							lg={4}
							key={user._id}
							style={gridStyle}
							onClick={() => {
								handleClickProfile(user.username);
							}}
						>
							<Paper sx={{ p: 5 }}>
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
							</Paper>
						</Grid>
					))}
				</Grid>
			)}
		</>
	);
};

export default PeopleScreen;
