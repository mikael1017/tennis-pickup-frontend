import React from "react";
import { useDispatch } from "react-redux";
import { updateUserThunk } from "../../services/users/users-thunk";
import { findUserByUsername } from "../../services/users/users-service";
import { useNavigate } from "react-router";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { profileThunk, logoutThunk } from "../../services/users/users-thunk";
import { useParams } from "react-router-dom";

const ProfileScreen = () => {
	const { currentUser } = useSelector((state) => state.users);
	const [profile, setProfile] = useState(currentUser);
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
		// if (currentUser) {
		// 	navigate(`/profile/${currentUser.username}`);
		// }
		fetchProfile();
	}, [userId]);

	return (
		<div>
			<div>
				{currentUser && (
					<div>
						<h2>Welcome {currentUser.username}</h2>
					</div>
				)}
			</div>
			{currentUser && profile && (
				<div>
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
			{!currentUser && (
				<div>
					<h1>You are not logged in</h1>
				</div>
			)}
		</div>
	);
};
export default ProfileScreen;
