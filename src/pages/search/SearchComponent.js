import React from "react";
import PublicSearchBar from "../../searchbar/PublicSearchbar";

// have to use google api to get court information from response

const SearchScreen = (courts) => {
	return (
		<>
			<PublicSearchBar />
			<div>
				<h1> Search Results</h1>
			</div>
		</>
	);
};
export default SearchScreen;
