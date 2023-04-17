import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { registerThunk } from "../../services/users/users-thunk";
import { Button } from "@mui/material";
// import { toBase64 } from "file-base64";
import ReactFileReader from "react-file-reader";

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

	const dispatch = useDispatch();
	const navigate = useNavigate();

	const handleFiles = (files) => {
		// console.log(files.base64);
		setProfileImage(files.base64);

		console.log(profileImage);
	};
	const register = () => {
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
	};
	return (
		<div>
			<h1>Register</h1>
			<div className="form-group">
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
			</div>
			<div className="form-group">
				<label>Username</label>
				<input
					type="text"
					className="form-control"
					value={username}
					onChange={(e) => {
						setUsername(e.target.value);
					}}
				/>
			</div>
			<div className="form-group">
				<label>Password</label>
				<input
					type="password"
					className="form-control"
					value={password}
					onChange={(e) => {
						setPassword(e.target.value);
					}}
				/>
			</div>
			<div className="form-group">
				<label>name</label>
				<input
					type="text"
					className="form-control"
					value={name}
					onChange={(e) => {
						setName(e.target.value);
					}}
				/>
			</div>

			<div className="form-group">
				<label>Role</label>
				<select
					className="form-control"
					value={role}
					onChange={(e) => {
						setRole(e.target.value);
					}}
				>
					<option value="player">Player</option>
					<option value="admin">Admin</option>
					<option value="organization">Organization</option>
					<option value="coach">Coach</option>
				</select>
			</div>

			<div className="form-group">
				<label>Email</label>
				<input
					type="text"
					className="form-control"
					value={email}
					onChange={(e) => {
						setEmail(e.target.value);
					}}
				/>
			</div>
			<div className="form-group">
				<label>Phone</label>
				<input
					type="text"
					className="form-control"
					value={phoneNumber}
					onChange={(e) => {
						setPhoneNumber(e.target.value);
					}}
				/>
			</div>
			<div className="form-group">
				<label>City</label>
				<input
					type="text"
					className="form-control"
					value={city}
					onChange={(e) => {
						setCity(e.target.value);
					}}
				/>
			</div>
			<div className="form-group">
				<label>Skill Level (NTRP Rating)</label>
				<input
					type="text"
					className="form-control"
					value={skillLevel}
					onChange={(e) => {
						setSkillLevel(e.target.value);
					}}
				/>
			</div>

			<Button onClick={register} variant="contained" color="secondary">
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
			{/* <div>
				{currentUser && (
					<div>
						<h2>{currentUser.username}</h2>
						<h2>{currentUser.password}</h2>
					</div>
				)}
			// </div> */}
		</div>
	);
};

export default RegisterScreen;
