import React from "react";
import { useParams } from "react-router";
import { Button } from "@mui/material";
import { addFollowerToClub } from "../../services/court/court-service";
import { useSelector } from "react-redux";

const CourtScreen = () => {
	const { courtId } = useParams();
	const { currentUser } = useSelector((state) => state.user);

	const handleFollowClick = () => {
		addFollowerToClub(courtId, currentUser._id);
	};
	return (
		<>
			<Button
				onClick={handleFollowClick}
				variant="contained"
				color="secondary"
			>
				Follow this club
			</Button>
		</>
	);
};
export default CourtScreen;
