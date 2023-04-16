import React from "react";
import { useParams } from "react-router";
import { Button } from "@mui/material";
import { addFollowerToClub } from "../../services/court/court-service";
import { useSelector } from "react-redux";
import { getPlaceDetails } from "../../services/google/google-service";
import { useEffect, useState } from "react";

const CourtScreen = () => {
	const { courtId } = useParams();
	const { currentUser } = useSelector((state) => state.user);
	const [courtDetails, setCourtDetails] = useState({});
	useEffect(() => {
		// console.log(courtId);
		const getCourtDetails = async () => {
			const details = await getPlaceDetails(courtId);
			setCourtDetails(details);
		};
		getCourtDetails();
	}, [courtId]);
	console.log(courtDetails);

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
