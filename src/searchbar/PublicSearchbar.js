import React, { useState } from "react";
import { IconButton, TextField, Grid, InputAdornment } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { useDispatch } from "react-redux";
import {
	findCourtsByState,
	findCourtsByZip,
	findCourtsByCity,
} from "../services/courts/courts-service";

const PublicSearchBar = () => {
	const [search, setSearch] = useState("");
	const [result, setResult] = useState({});

	const handleKeyPress = async (e) => {
		const zipCodeRegex = /^\d{5}$/; // matches 5-digit zip code
		const cityRegex = /^[A-Za-z\s-]+$/;
		let courts = {};
		if (e.key === "Enter") {
			const value = e.target.value;
			if (zipCodeRegex.test(value)) {
				// console.log("zip code", value);
				// search by zip code
				try {
					courts = findCourtsByZip(value);
				} catch (err) {
					console.log(err);
				}
			} else if (cityRegex.test(value)) {
				// search by city
				try {
					courts = findCourtsByCity(value);
				} catch (err) {
					console.log(err);
				}
			} else {
				console.log("Invalid search input", value);
			}
			setResult(courts);
		}
		console.log("result", result);
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
