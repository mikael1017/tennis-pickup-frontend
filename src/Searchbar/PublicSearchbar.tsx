import React, { useState } from "react";
import { IconButton, TextField, Grid, InputAdornment } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";

const PublicSearchBar = () => {
	const [search, setSearch] = useState("");

	return (
		<Grid container spacing={2}>
			<Grid item xs={10}>
				<TextField
					id="search"
					label=""
					type="search"
					variant="outlined"
					size="medium"
					placeholder="Search for courts to play by zip code or city, state"
					fullWidth
					onChange={(e) => setSearch(e.target.value)}
					InputProps={{
						startAdornment: (
							<InputAdornment position="start">
								<SearchIcon />
							</InputAdornment>
						),
					}}
				/>
			</Grid>
			<Grid item xs={2}>
				<IconButton aria-label="search">
					<SearchIcon />
				</IconButton>
			</Grid>
		</Grid>
	);
};

export default PublicSearchBar;
