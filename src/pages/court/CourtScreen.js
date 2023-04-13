import React from "react";
import { useParams } from "react-router";

const CourtScreen = () => {
	const { courtId } = useParams();
	console.log(courtId);
	return <div>Court Screen</div>;
};
export default CourtScreen;
