import React from "react";
import {
	getConfirmedMatchesByRequestee,
	getConfirmedMatchesByRequester,
	getRequestedMatches,
	getRequesteeMatches,
} from "../../services/matches/matches-service";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useState } from "react";
import {
	Container,
	Grid,
	Paper,
	Avatar,
	Typography,
	Button,
} from "@mui/material";
import MatchRequestsList from "../../followingList/match-request-list";

const MatchesScreen = () => {
	const [requestedMatches, setRequestedMatches] = useState([]);
	const [requesteeMatches, setRequesteeMatches] = useState([]);
	const [confirmedMatches, setConfirmedMatches] = useState([]);
	const { currentUser } = useSelector((state) => state.users);

	useEffect(() => {
		const fetchRequestedMatches = async () => {
			const matches = await getRequestedMatches(currentUser.username);
			setRequestedMatches(matches.data);
		};
		const fetchRequesteeMatches = async () => {
			const matches = await getRequesteeMatches(currentUser.username);
			setRequesteeMatches(matches.data);
		};
		const fetchConfirmedMatches = async () => {
			const matches = await getConfirmedMatchesByRequester(
				currentUser.username
			);
			const matches2 = await getConfirmedMatchesByRequestee(
				currentUser.username
			);
			const result = matches.data.concat(matches2.data);
			console.log(result);
			setConfirmedMatches(result);
		};
		if (currentUser) {
			console.log(currentUser);
			fetchRequestedMatches();
			fetchRequesteeMatches();
			fetchConfirmedMatches();
		}
	}, [currentUser]);

	return (
		<Grid
			container
			alignItems="center"
			justifyContent="center"
			sx={{
				my: 2,
			}}
		>
			<Grid
				item
				xs={9}
				sx={{
					my: 2,
				}}
			>
				<Typography variant="h3">Pending Requests</Typography>
				{requestedMatches.length > 0 && (
					<MatchRequestsList
						requests={requestedMatches}
						type={"pending"}
					/>
				)}
				{requestedMatches.length === 0 && (
					<Typography variant="h4">0 pending requests</Typography>
				)}
			</Grid>
			<Grid
				item
				xs={9}
				sx={{
					my: 2,
				}}
			>
				<Typography variant="h3">Received Requests</Typography>
				{requesteeMatches.length > 0 && (
					<MatchRequestsList
						requests={requesteeMatches}
						type={"received"}
					/>
				)}
				{requesteeMatches.length === 0 && (
					<Typography variant="h4">0 received requests</Typography>
				)}
			</Grid>
			<Grid
				item
				xs={9}
				sx={{
					my: 2,
				}}
			>
				<Typography variant="h3">Confirmed Requests</Typography>
				{confirmedMatches.length > 0 && (
					<MatchRequestsList
						requests={confirmedMatches}
						type={"confirmed"}
					/>
				)}
				{confirmedMatches.length === 0 && (
					<Typography variant="h4">0 confirmed requests</Typography>
				)}
			</Grid>
		</Grid>
	);
};
export default MatchesScreen;
