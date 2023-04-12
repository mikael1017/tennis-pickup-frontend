import React from "react";
import PublicNavBar from "../../navbar/PublicNavbar";
import PublicSearchBar from "../../searchbar/PublicSearchbar";
import SearchScreen from "../search/SearchScreen";

const PublicHomeComponent = () => {
	return (
		<div>
			<PublicNavBar />
			<SearchScreen />

			{/* logged in content has to be different*/}
			{/*  */}
			<h1>Home</h1>
		</div>
	);
};
export default PublicHomeComponent;
