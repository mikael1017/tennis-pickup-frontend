import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { registerThunk } from "../../services/users/users-thunk";

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

	const dispatch = useDispatch();
	const navigate = useNavigate();
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
				})
			);
			navigate("/login");
		} catch (err) {
			console.log(err);
		}
	};
	return (
		<div>
			<h1>Register</h1>
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

			<button onClick={register} className="btn btn-primary">
				Register
			</button>
			{/* <div>
				{currentUser && (
					<div>
						<h2>{currentUser.username}</h2>
						<h2>{currentUser.password}</h2>
					</div>
				)}
			</div> */}
		</div>
	);
};

export default RegisterScreen;
