import React from "react";
import { useDispatch } from "react-redux";
import { updateUserThunk } from "../../services/users/users-thunk";
import { useNavigate } from "react-router";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { profileThunk, logoutThunk } from "../../services/users/users-thunk";

const ProfileScreen = () => {
	const { currentUser } = useSelector((state) => state.user);
	const [profile, setProfile] = useState(currentUser);
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const labels = [
		{ name: "Username", value: "username" },
		{ name: "Email", value: "email" },
		{ name: "Password", value: "password" },
		{ name: "City", value: "city" },
		{ name: "Phone Number", value: "phoneNumber" },
		{ name: "Skill Level", value: "skillLevel" },
	];
	const handleInputChange = (event, value) => {
		const newProfile = { ...profile, [value]: event.target.value };
		setProfile(newProfile);
	};
	const save = () => {
		dispatch(updateUserThunk(profile));
	};
	useEffect(() => {
		const payload = async () => {
			await dispatch(profileThunk());
		};
		setProfile(payload);
	}, []);

	// console.log(profile);
	return (
		<div>
			<h1>Profile Screen</h1>
			{currentUser && (
				<div>
					{labels.map(({ name, value }) => (
						<div key={value}>
							<label>{name}</label>
							<input
								type="text"
								value={currentUser[value]}
								onChange={(event) =>
									handleInputChange(event, value)
								}
							/>
						</div>
					))}
					<button onClick={save}>Save</button>
					<button
						onClick={() => {
							dispatch(logoutThunk());
							navigate("/");
						}}
					>
						Logout
					</button>
				</div>
			)}
			{!currentUser && (
				<div>
					<h1>You are not logged in</h1>
				</div>
			)}
		</div>
	);
};
export default ProfileScreen;
