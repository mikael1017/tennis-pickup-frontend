import React from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { PublicNavbar } from "../navbar/PublicNavbar";

const Navigation = () => {
	const { currentUser } = useSelector((state) => state.user);

	return (
		<div>
			<PublicNavbar />
		</div>
	);
};
export default Navigation;
