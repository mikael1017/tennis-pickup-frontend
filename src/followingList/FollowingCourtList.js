import React from "react";
import { useSelector } from "react-redux";
import { List, ListItem, ListItemText } from "@mui/material";
import { useEffect, useState } from "react";

const FollowingCourtList = () => {
	const { currentUser } = useSelector((state) => state.users);
	const [courts, setCourts] = useState(currentUser.followingCourts);

	useEffect(() => {});

	return (
		<>
			<h2>Your following courts</h2>
			<List
				sx={{
					width: "100%",
					maxWidth: 360,
					bgcolor: "background.paper",
				}}
			>
				{courts.map((court) => (
					<>
						<ListItem key={court}>
							<ListItemText
								primary={court}
								secondary={court.email}
							/>
						</ListItem>
					</>
				))}
			</List>
		</>
	);
};
export default FollowingCourtList;
