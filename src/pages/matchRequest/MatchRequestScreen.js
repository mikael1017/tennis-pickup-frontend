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
	TextField,
} from "@mui/material";
import { DatePicker, TimePicker } from "@mui/x-date-pickers";
import { findUserByUsername } from "../../services/users/users-service";
import { getPlaceDetails } from "../../services/google/google-service";
import dayjs from "dayjs";
import { createMatchRequest } from "../../services/matches/matches-service";
import { useNavigate } from "react-router";

const MatchRequestScreen = () => {
	const { username } = useParams();
	const [date, setDate] = useState(dayjs("2023-05-25T15:30"));
	const [time, setTime] = useState(dayjs("2023-05-25T15:30"));
	const [matchType, setMatchType] = useState();
	const [skillLevel, setSkillLevel] = useState();
	const [court, setCourt] = useState();
	const [followingCourts, setFollowingCourts] = useState([]);
	const { currentUser } = useSelector((state) => state.users);
	const [lesson, setLesson] = useState("");
	const [requestee, setRequestee] = useState();
	const navigate = useNavigate();
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

	const handleDateChange = (date) => {
		console.log(date.$d.getDay());
		const day = date.$d.getDay();
		const month = date.$d.getMonth();
		const year = date.$d.getFullYear();
		setDate(month + "/" + day + "/" + year);
	};

	const handleTimeChange = (time) => {
		const hour = time.getHours();
		const minute = time.getMinutes();
		setTime(hour + ":" + minute);
	};

	const handleSubmit = () => {
		if (currentUser && requestee) {
			const newDate =
				date.$d.getMonth() +
				"/" +
				date.$d.getDay() +
				"/" +
				date.$d.getFullYear();
			const newTime = time.$d.getHours() + ":" + time.$d.getMinutes();
			if (requestee.role === "player") {
				createMatchRequest({
					requestedUsername: currentUser.username,
					requesteeUsername: requestee.username,
					date: newDate,
					time: newTime,
					matchType: matchType,
					skillLevel: skillLevel,
					court: court,
				});
			} else if (requestee.role === "coach") {
				createMatchRequest({
					requestedUsername: currentUser.username,
					requesteeUsername: requestee.username,
					date: newDate,
					time: newTime,
					skillLevel: skillLevel,
					court: court,
					lesson: lesson,
					isLesson: true,
				});
			}

			navigate("/matches");
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
							{requestee.role === "coach" ? "Lesson" : "Match"}{" "}
							Request to {requestee.name}
						</Typography>
						<FormControl key="date" sx={{ my: 2 }}>
							<DatePicker
								id="outlined-required"
								value={date}
								defaultValue={dayjs("2023-05-25T15:30")}
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
								defaultValue={dayjs("2023-05-25T15:30")}
								onChange={(newValue) => {
									setTime(newValue);
								}}
							/>
						</FormControl>
						{requestee.role === "player" && (
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
						)}

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
						<FormControl sx={{ my: 2 }}>
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
						{requestee.role === "coach" && (
							<FormControl sx={{ my: 2 }}>
								<TextField
									label="Reason for a lesson"
									value={lesson}
									onChange={(e) => setLesson(e.target.value)}
								/>
							</FormControl>
						)}
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
