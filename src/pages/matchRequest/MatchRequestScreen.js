import React from "react";
import { useParams } from "react-router";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import {
	FormControl,
	FormGroup,
	Button,
	MenuItem,
	Select,
	InputLabel,
	Typography,
	Grid,
} from "@mui/material";
import { DatePicker, TimePicker } from "@mui/x-date-pickers";
import { findUserByUsername } from "../../services/users/users-service";
import { getPlaceDetails } from "../../services/google/google-service";
import dayjs from "dayjs";
import { createMatchRequest } from "../../services/matches/matches-service";

const MatchRequestScreen = () => {
	const { username } = useParams();
	const [date, setDate] = useState(dayjs("2023-04-19T15:30"));
	const [time, setTime] = useState(dayjs("2023-04-19T15:30"));
	const [matchType, setMatchType] = useState();
	const [skillLevel, setSkillLevel] = useState();
	const [court, setCourt] = useState();
	const [followingCourts, setFollowingCourts] = useState([]);
	const { currentUser } = useSelector((state) => state.users);
	const [requestee, setRequestee] = useState();

	useEffect(() => {
		const getRequestee = async () => {
			const user = await findUserByUsername(username);
			setRequestee(user);
		};
		const getFollowingCourts = async () => {
			const courtIds = currentUser.followingCourts;
			const courtNamePromises = courtIds.map(getPlaceDetails);
			const responses = await Promise.all(courtNamePromises);
			const courtNames = responses.map(
				(response) => response.address_components[0].short_name
			);
			setFollowingCourts(courtNames);
		};
		getRequestee();
		if (currentUser) {
			console.log(currentUser.followingCourts);
			getFollowingCourts();
		}
	}, [currentUser]);

	const handleSubmit = () => {
		if (currentUser && requestee) {
			createMatchRequest({
				requestedUserName: currentUser.username,
				requesteeUserName: requestee.username,
				date: date,
				time: time,
				matchType: matchType,
				skillLevel: skillLevel,
				court: court,
			});
		}
		console.log("submitted");
	};

	return (
		<>
			{requestee && (
				<Grid
					container
					spacing={2}
					alignItems="center"
					justifyContent="center"
					sx={{ my: 2 }}
				>
					<FormGroup>
						<Typography variant="h4" sx={{ my: 2 }}>
							Match request to {requestee.name}
						</Typography>
						<FormControl key="date" sx={{ my: 2 }}>
							<DatePicker
								id="outlined-required"
								value={date}
								defaultValue={dayjs("2023-04-19T15:30")}
								label="Date"
								onChange={(newValue) => {
									setDate(newValue);
								}}
							/>
						</FormControl>
						<FormControl key="time" sx={{ my: 2 }}>
							<TimePicker
								id="outlined-required"
								value={time}
								label="Time"
								defaultValue={dayjs("2023-04-19T15:30")}
								onChange={(newValue) => {
									setTime(newValue);
								}}
							/>
						</FormControl>
						<FormControl key="matchtype" sx={{ my: 2 }}>
							<InputLabel>Match Type</InputLabel>
							<Select
								id="outlined-required"
								value={matchType}
								label="MatchType"
								onChange={(e) => {
									setMatchType(e.target.value);
								}}
							>
								<MenuItem value="Singles">Singles</MenuItem>
								<MenuItem value="Doubles">Doubles</MenuItem>
							</Select>
						</FormControl>
						<FormControl key="skilllevel" sx={{ my: 2 }}>
							<InputLabel>Skill Level</InputLabel>
							<Select
								id="outlined-required"
								value={skillLevel}
								label="Skill Level"
								onChange={(e) => {
									setSkillLevel(e.target.value);
								}}
							>
								<MenuItem value="2.5">2.5</MenuItem>
								<MenuItem value="3.0">3.0</MenuItem>
								<MenuItem value="3.5">3.5</MenuItem>
								<MenuItem value="4.0">4.0</MenuItem>
								<MenuItem value="4.5">4.5</MenuItem>
								<MenuItem value="5.0">5.0</MenuItem>
							</Select>
						</FormControl>
						<FormControl>
							<InputLabel>
								Choose the court from your courts
							</InputLabel>
							<Select
								id="outlined-required"
								value={court}
								label="court"
								onChange={(e) => {
									setCourt(e.target.value);
								}}
							>
								{followingCourts.map((court) => (
									<MenuItem value={court}>{court}</MenuItem>
								))}
							</Select>
						</FormControl>
						<Button
							variant="contained"
							color="success"
							sx={{ my: 2 }}
							onClick={handleSubmit}
						>
							Send the Request
						</Button>
					</FormGroup>
				</Grid>
			)}
		</>
	);
};

export default MatchRequestScreen;
