import { Grid, Paper, Avatar, Typography } from "@mui/material";
import React from "react";
import { useState, useEffect } from "react";
import { findAllUsers } from "../../services/users/users-service";
import { useNavigate } from "react-router";

const PeopleScreen = () => {
	const [users, setUsers] = useState([]);
	const navigate = useNavigate();

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
							src={user.photoURL}
							sx={{ width: 64, height: 64, mb: 2 }}
						/>
						<Typography variant="h4" gutterBottom>
							{user.username}
						</Typography>
						<Typography variant="h5">{user.role}</Typography>
						<Typography variant="body1" color="text.secondary">
							{user.email}
						</Typography>
						<Typography variant="body1" color="text.secondary">
							{user.city}
						</Typography>
						<Typography variant="body1" color="text.secondary">
							{user.skillLevel}
						</Typography>
					</Paper>
				</Grid>
			))}
		</Grid>
	);
};

export default PeopleScreen;
