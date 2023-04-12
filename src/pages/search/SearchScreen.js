import React, { useState, useEffect } from "react";
import PublicSearchBar from "../../searchbar/PublicSearchbar";
import { getLocationInfo } from "../../services/google/google-service";

// have to use google api to get court information from response

const SearchScreen = (courts) => {
	const [searchResults, setSearchResults] = useState([]);
	const handleSearchResults = (results) => {
		setSearchResults(results);
	};
	const [courtResults, setCourtResults] = useState([]);
	useEffect(() => {
		const getResponses = async () => {
			const newResponses = [];
			for (const result of searchResults) {
				if (result !== "error") {
					console.log(result);
					const response = await getLocationInfo(
						result.latitude,
						result.longitude
					);
					console.log(response);
					newResponses.push(response);
				} else {
					newResponses.push("error");
				}
			}
			setCourtResults(newResponses);
		};
		getResponses();
	}, [searchResults]);
	return (
		<>
			<PublicSearchBar handleSearchResults={handleSearchResults} />
			<div>
				{courtResults.map((court) => {
					console.log(court);
					if (court === "error") {
						return (
							<div>
								<h1>
									You didn't enter a zip code, please enter a
									zip code
								</h1>
							</div>
						);
					} else {
						return (
							<div>
								<h1>{court.formatted_address}</h1>
							</div>
						);
					}
				})}
			</div>
		</>
	);
};
export default SearchScreen;
