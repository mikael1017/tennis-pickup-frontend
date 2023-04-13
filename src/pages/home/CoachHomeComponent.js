import React from "react";
import { Link } from "react-router-dom";

const CoachHome = () => {
	return (
		<div>
			<h1>Donator Home</h1>
			<h2>Search bar that's set to Organization</h2>
			<Link to="/profile">Profile</Link>
			<Link to="/search">Search</Link>
			<Link to="/details">Details</Link>
			<Link to="/login">Login</Link>
		</div>
	);
};
export default CoachHome;
