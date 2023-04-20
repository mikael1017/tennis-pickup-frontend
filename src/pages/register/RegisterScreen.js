import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { registerThunk } from "../../services/users/users-thunk";
import { Button } from "@mui/material";
// import { toBase64 } from "file-base64";
import ReactFileReader from "react-file-reader";
import {
	Grid,
	FormControl,
	FormGroup,
	InputLabel,
	Select,
	TextField,
	MenuItem,
} from "@mui/material";

const RegisterScreen = () => {
	// const { currentUser } = useSelector((state) => state.users);
	const [username, setUsername] = useState("");
	const [name, setName] = useState("");
	const [password, setPassword] = useState("");
	const [role, setRole] = useState("player");
	const [email, setEmail] = useState("");
	const [phoneNumber, setPhoneNumber] = useState("");
	const [city, setCity] = useState("");
	const [skillLevel, setSkillLevel] = useState("");
	const [profileImage, setProfileImage] = useState("");
	const [coachLicense, setCoachLicense] = useState("");
	const [isAdmin, setIsAdmin] = useState(false);
	const [adminCode, setAdminCode] = useState("");

	const dispatch = useDispatch();
	const navigate = useNavigate();

	const handleFiles = (files) => {
		// console.log(files.base64);
		setProfileImage(files.base64);
	};
	const register = () => {
		const requiredFields = document.querySelectorAll("[required]");
		let formIsValid = true;

		requiredFields.forEach((field) => {
			if (!field.value) {
				formIsValid = false;
				field.classList.add("is-invalid");
			} else {
				field.classList.remove("is-invalid");
			}
		});
		if (formIsValid) {
			if (role === "player") {
				try {
					dispatch(
						registerThunk({
							username,
							password,
							name,
							role,
							email,
							phoneNumber,
							city,
							skillLevel,
							profileImage,
						})
					);
					navigate("/");
				} catch (err) {
					console.log(err);
				}
			} else if (role === "coach") {
				try {
					dispatch(
						registerThunk({
							username,
							password,
							name,
							role,
							email,
							phoneNumber,
							city,
							skillLevel,
							profileImage,
							coachLicense,
						})
					);
					navigate("/");
				} catch (err) {
					console.log(err);
				}
			} else if (role === "admin") {
				if (adminCode === "1234") {
					setIsAdmin(true);
					try {
						dispatch(
							registerThunk({
								username,
								password,
								name,
								role,
								email,
								phoneNumber,
								city,
								skillLevel,
								profileImage,
							})
						);
						navigate("/");
					} catch (err) {
						console.log(err);
					}
				} else {
					alert("Wrong admin code");
				}
			}
		} else {
			alert("Please fill all the required fields");
		}
	};
	return (
		<Grid container spacing={2} alignItems="center" justifyContent="center">
			<Grid item xs={8}>
				<h1>Register</h1>
				<FormGroup>
					<FormControl sx={{ mb: 1 }}>
						<ReactFileReader
							fileTypes={[".jpg", ".png", ".jpeg"]}
							base64={true}
							multipleFiles={false}
							handleFiles={handleFiles}
						>
							<Button variant="contained" color="primary">
								Upload profile picture
							</Button>
						</ReactFileReader>
					</FormControl>
					<FormControl sx={{ mb: 1 }}>
						<InputLabel>Username</InputLabel>
						<TextField
							value={username}
							onChange={(e) => {
								setUsername(e.target.value);
							}}
							required
						/>
					</FormControl>
					<FormControl sx={{ mb: 1 }}>
						<InputLabel>Password</InputLabel>
						<TextField
							value={password}
							onChange={(e) => {
								setPassword(e.target.value);
							}}
							required
						/>
					</FormControl>
					<FormControl sx={{ mb: 1 }}>
						<InputLabel>Name</InputLabel>
						<TextField
							value={name}
							onChange={(e) => {
								setName(e.target.value);
							}}
							required
						/>
					</FormControl>

					<FormControl sx={{ mb: 1 }}>
						<InputLabel>Role</InputLabel>
						<Select
							value={role}
							onChange={(e) => {
								setRole(e.target.value);
							}}
							required
						>
							<MenuItem value="player">Player</MenuItem>
							<MenuItem value="admin">Admin</MenuItem>
							<MenuItem value="coach">Coach</MenuItem>
						</Select>
					</FormControl>

					<FormControl sx={{ mb: 1 }}>
						<InputLabel>Email</InputLabel>
						<TextField
							value={email}
							onChange={(e) => {
								setEmail(e.target.value);
							}}
							required
						/>
					</FormControl>
					<FormControl sx={{ mb: 1 }}>
						<InputLabel>Phone</InputLabel>
						<TextField
							value={phoneNumber}
							onChange={(e) => {
								setPhoneNumber(e.target.value);
							}}
							required
						/>
					</FormControl>
					<FormControl sx={{ mb: 1 }}>
						<InputLabel>City</InputLabel>
						<TextField
							value={city}
							onChange={(e) => {
								setCity(e.target.value);
							}}
							required
						/>
					</FormControl>
					<FormControl sx={{ mb: 1 }}>
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
					{role === "coach" && (
						<FormControl sx={{ mb: 1 }}>
							<InputLabel>Coach Licnese</InputLabel>
							<Select
								value={coachLicense}
								onChange={(e) => {
									setCoachLicense(e.target.value);
								}}
							>
								<MenuItem value="USPTA">USPTA</MenuItem>
								<MenuItem value="USPTR">USPTR</MenuItem>
								<MenuItem value="N/A">N/A</MenuItem>
							</Select>
						</FormControl>
					)}
					{role === "admin" && (
						<FormControl sx={{ mb: 1 }}>
							<InputLabel>Enter admin code</InputLabel>
							<TextField
								value={adminCode}
								onChange={(e) => {
									setAdminCode(e.target.value);
								}}
								required
							></TextField>
						</FormControl>
					)}

					<Button
						onClick={register}
						variant="contained"
						color="success"
					>
						Register
					</Button>
					<Button
						onClick={() => {
							navigate("/");
						}}
						variant="contained"
						color="error"
					>
						Cancel
					</Button>
				</FormGroup>
			</Grid>
		</Grid>
	);
};

export default RegisterScreen;
