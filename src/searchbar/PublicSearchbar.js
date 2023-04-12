import React, { useState } from "react";
import { IconButton, TextField, Grid, InputAdornment } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

import {
	findCourtsByState,
	findCourtsByZip,
	findCourtsByCity,
} from "../services/courts/courts-service";

const PublicSearchBar = ({ handleSearchResults }) => {
	const [search, setSearch] = useState("");
	// const [result, setResult] = useState({});
	const navigate = useNavigate();

	const handleKeyPress = async (e) => {
		const zipCodeRegex = /^\d{5}$/; // matches 5-digit zip code
		let courts = {};
		if (e.key === "Enter") {
			const value = e.target.value;
			// check if search input meet the zip code format
			if (zipCodeRegex.test(value)) {
				try {
					courts = await findCourtsByZip(value);
				} catch (err) {
					console.log(err);
				}
				handleSearchResults(courts);
			} else {
				let error = ["error"];
				handleSearchResults(error);
				console.log("not a zip code");
			}
			navigate(`/search/${search}`);
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
					placeholder="Search for courts to play by zip code"
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
