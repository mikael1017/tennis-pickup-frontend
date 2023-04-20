import React from "react";
import { useSelector } from "react-redux";
import {
	List,
	ListItem,
	ListItemText,
	Avatar,
	ListItemAvatar,
	Typography,
	Divider,
} from "@mui/material";
import { useNavigate } from "react-router";

const ProfileListItem = (props) => {
	const user = props.user;
	const navigate = useNavigate();

	const handleProfileClick = (userId) => {
		navigate(`/profile/${userId}`);
	};
	const itemStyle = {
		cursor: "pointer",
	};
	return (
		<>
			<ListItem
				alignItems="flex-start"
				style={itemStyle}
				onClick={() => {
					handleProfileClick(user.username);
				}}
			>
				<ListItemAvatar>
					<Avatar alt="profile-pic" src={user.profileImage} />
				</ListItemAvatar>
				<ListItemText
					primary={user.username}
					secondary={
						<React.Fragment>
							{user.role}
							<br />
							<Typography
								sx={{ display: "inline" }}
								component="span"
								variant="body2"
								color="text.primary"
							>
								{user.city}
								{" " + user.skillLevel}
							</Typography>
							{/* {" — I'll be in your neighborhood doing errands this…"} */}
						</React.Fragment>
					}
				/>
			</ListItem>
			<Divider variant="inset" />
		</>
	);
};
export default ProfileListItem;
