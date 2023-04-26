import React from "react";
import {
	confirmMatchRequest,
	deleteMatchRequest,
	deleteConfirmedMatch,
} from "../services/matches/matches-service";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useState } from "react";
import { Grid, Paper, Typography, Button } from "@mui/material";

const MatchRequestsList = (props) => {
	// console.log(props);
	const { currentUser } = useSelector((state) => state.users);
	const [requests, setRequests] = useState(props.requests);
	const type = props.type;

	const handleCancel = async (request) => {
		await deleteMatchRequest(request._id);
		const newList = requests.filter((r) => r._id !== request._id);
		setRequests(newList);
	};

	const handleCancelMatch = async (request) => {
		await deleteConfirmedMatch(request._id);
		const newList = requests.filter((r) => r._id !== request._id);
		setRequests(newList);
	};

	const handleAccept = async (request) => {
		handleCancel(request);
		await confirmMatchRequest(request);
	};

	useEffect(() => {
		setRequests(props.requests);
		console.log(props);
	}, [props]);
	return (
		<Grid container spacing={2} alignItems="center" justifyContent="center">
			{requests &&
				requests.map((request) => (
					<Grid item xs={4} key={request._id}>
						<Paper
							sx={{
								my: 2,
								backgroundColor:
									type === "received"
										? "#d7dafc"
										: type === "pending"
										? "#f7fa9b"
										: type === "confirmed"
										? "#a5fa9b"
										: "#ededda",
								p: 7,
								flexDirection: "column",
							}}
						>
							<Typography variant="h4">
								{type === "received" &&
									"Id: " + request.requestedUsername}
								{type === "pending" &&
									"Id: " + request.requesteeUsername}
								{type === "confirmed" &&
									request.requestedUsername ===
										currentUser.username &&
									"Id: " + request.requesteeUsername}
								{type === "confirmed" &&
									request.requesteeUsername ===
										currentUser.username &&
									"Id: " + request.requestedUsername}
							</Typography>
							<Typography variant="h5">{request.date}</Typography>
							<Typography variant="h5">{request.time}</Typography>
							<Typography variant="body1" color="text.secondary">
								{request.matchType}
							</Typography>
							<Typography variant="body1" color="text.secondary">
								{request.skillLevel}
							</Typography>

							<br />
							{type === "received" && (
								<>
									<Button
										sx={{ mx: 1 }}
										color="primary"
										variant="contained"
										onClick={() => {
											handleAccept(request);
										}}
									>
										Accept
									</Button>
									<Button
										color="error"
										variant="contained"
										onClick={() => {
											handleCancel(request);
										}}
									>
										Decline
									</Button>
								</>
							)}
							{type === "pending" && (
								<Button
									sx={{ mx: 1 }}
									color="error"
									variant="contained"
									onClick={() => {
										handleCancel(request);
									}}
								>
									Cancel
								</Button>
							)}
							{type === "confirmed" && (
								<Button
									sx={{ mx: 1 }}
									color="error"
									variant="contained"
									onClick={() => {
										handleCancelMatch(request);
									}}
								>
									Cancel
								</Button>
							)}
							{/* {type === "confirmed" && (
                                <Button
                                    sx={{ mx: 2 }}
                                    color="error"
                            } */}
						</Paper>
					</Grid>
				))}
		</Grid>
	);
};
export default MatchRequestsList;
