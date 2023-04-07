import React, { useState } from "react";
import { IconButton, TextField, Grid, InputAdornment } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";

const PublicSearchBar = () => {
	const [search, setSearch] = useState("");

	const handleKeyPress = (e) => {
		const zipCodeRegex = /^\d{5}$/; // matches 5-digit zip code
		const cityRegex = /^[A-Za-z\s-]+$/;
		if (e.key === "Enter") {
			const value = e.target.value;
			if (zipCodeRegex.test(value)) {
				// search by zip code
				console.log("search by zip code", value);
			} else if (cityRegex.test(value)) {
				// search by city
				console.log("search by city", value);
			} else {
				console.log("Invalid search input", value);
			}
		}
	};

	return (
		<Grid container spacing={2}>
			<Grid item xs={12}>
				<TextField
					id="search"
					label=""
					type="search"
					variant="outlined"
					size="medium"
					placeholder="Search for courts to play by zip code or city, state"
					fullWidth
					onChange={(e) => setSearch(e.target.value)}
					onKeyDown={handleKeyPress}
					InputProps={{
						startAdornment: (
							<InputAdornment position="start">
								<SearchIcon />
							</InputAdornment>
						),
					}}
				/>
			</Grid>
		</Grid>
	);
};

export default PublicSearchBar;
