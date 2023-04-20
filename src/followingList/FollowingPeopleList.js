import React from "react";
import { useSelector } from "react-redux";
import { List, ListItem, ListItemText, Typography } from "@mui/material";
import ProfileListItem from "../components/ProfileListItem";

const FollowingPeopleList = () => {
	const { currentUser, users } = useSelector((state) => state.users);
	// console.log(props);
	return (
		<>
			<Typography variant="h5">Your following List</Typography>
			<List
				sx={{
					width: "100%",
					maxWidth: 360,
					bgcolor: "background.paper",
				}}
			>
				{users.map((user) => {
					if (currentUser.followingPeople.includes(user._id)) {
						return (
							<>
								<ProfileListItem user={user} />
							</>
						);
					}
				})}
			</List>
		</>
	);
};
export default FollowingPeopleList;
