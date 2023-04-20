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
			console.log(field.value);
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
								isAdmin,
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
						<TextField
							label="Username"
							value={username}
							onChange={(e) => {
								setUsername(e.target.value);
							}}
							required
						/>
					</FormControl>
					<FormControl sx={{ mb: 1 }}>
						<TextField
							label="Password"
							value={password}
							onChange={(e) => {
								setPassword(e.target.value);
							}}
							required
						/>
					</FormControl>
					<FormControl sx={{ mb: 1 }}>
						<TextField
							label="Name"
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
							label="Role"
							value={role}
							onChange={(e) => {
								setRole(e.target.value);
							}}
						>
							<MenuItem value="player">Player</MenuItem>
							<MenuItem value="coach">Coach</MenuItem>
							<MenuItem value="admin">Admin</MenuItem>
						</Select>
					</FormControl>

					<FormControl sx={{ mb: 1 }}>
						<TextField
							label="E-mail"
							value={email}
							onChange={(e) => {
								setEmail(e.target.value);
							}}
						/>
					</FormControl>
					<FormControl sx={{ mb: 1 }}>
						<TextField
							label="Phone Number"
							value={phoneNumber}
							onChange={(e) => {
								setPhoneNumber(e.target.value);
							}}
						/>
					</FormControl>
					<FormControl sx={{ mb: 1 }}>
						<TextField
							label="City"
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
							<TextField
								label="Enter admin code"
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
