import React from "react";
import { useDispatch } from "react-redux";
import { updateUserThunk } from "../../services/users/users-thunk";
import { findUserByUsername } from "../../services/users/users-service";
import { useNavigate } from "react-router";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { profileThunk, logoutThunk } from "../../services/users/users-thunk";
import { useParams } from "react-router-dom";
import { Button } from "@mui/material";

const ProfileScreen = () => {
	const { currentUser } = useSelector((state) => state.users);
	const [profile, setProfile] = useState(currentUser);
	// const [profileImage, setProfileImage] = useState("");
	const { userId } = useParams();
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
		window.alert("Profile updated successfully");
	};
	const fetchProfile = async () => {
		if (userId) {
			const user = await findUserByUsername(userId);
			setProfile(user);
			return;
		}
		const response = await dispatch(profileThunk());
		setProfile(response.payload);
	};

	useEffect(() => {
		fetchProfile();
	}, [userId]);

	return (
		<div>
			<div>
				{!currentUser && (
					<>
						<h2>Please login to view the profile</h2>
						<Button
							onClick={() => {
								navigate("/register");
							}}
							variant="contained"
							color="secondary"
						>
							Click here to become a member
						</Button>
					</>
				)}
				{currentUser && (
					<div>
						<h2>Welcome {currentUser.username}</h2>
					</div>
				)}
			</div>
			{currentUser && profile && (
				<div>
					<div>
						{/* i have to make a style of this  */}
						<img alt="profile" src={profile.profileImage} />
					</div>
					{labels.map(({ name, value }) => (
						<div key={value}>
							<label>{name}</label>
							<input
								disabled={currentUser.username !== userId}
								type="text"
								value={profile[value]}
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
		</div>
	);
};
export default ProfileScreen;
