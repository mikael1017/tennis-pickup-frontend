import React, { useState } from "react";
import {
	IconButton,
	TextField,
	Grid,
	InputAdornment,
	Typography,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

import {
	findCourtsByState,
	findCourtsByZip,
	findCourtsByCity,
} from "../services/search/search-service";

const PublicSearchBar = ({ handleSearchResults }) => {
	const [search, setSearch] = useState("");
	const [error, setError] = useState(null);
	const [loading, setLoading] = useState(false);
	// const [result, setResult] = useState({});
	const navigate = useNavigate();

	const handleKeyPress = async (e) => {
		const zipCodeRegex = /^\d{5}$/; // matches 5-digit zip code
		let courts = {};
		if (e.key === "Enter") {
			const value = e.target.value;
			// check if search input meet the zip code format
			if (zipCodeRegex.test(value)) {
				setLoading(true);
				try {
					courts = await findCourtsByZip(value);
					handleSearchResults(courts);
					setError(null);
				} catch (err) {
					console.log(err);
				}
				setLoading(false);
			} else {
				setError("Please enter a valid zip code");
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
				{error && (
					<Typography variant="caption" color="error" fontSize={20}>
						{error}
					</Typography>
				)}
			</Grid>
		</Grid>
	);
};

export default PublicSearchBar;
