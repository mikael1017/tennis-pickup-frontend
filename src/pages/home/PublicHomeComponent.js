import React from "react";
import PublicNavBar from "../../navbar/PublicNavbar";
import PublicSearchBar from "../../searchbar/PublicSearchbar";
import SearchScreen from "../search/SearchScreen";
import { Grid, Typography, Button } from "@mui/material";
import { styled } from "@mui/material/styles";
import posterImage from "../../images/main-poster.jpeg";
import { useNavigate } from "react-router-dom";

const PublicHomeComponent = () => {
	const navigate = useNavigate();
	return (
		<Grid container alignItems="center" justifyContent="center">
			<Grid item xs={12} sm={8}>
				<div style={{ position: "relative" }}>
					<img
						src={posterImage}
						alt="Poster Image"
						style={{ width: "100%" }}
					/>
					<Grid
						container
						justifyContent="center"
						alignItems="center"
						style={{
							position: "absolute",
							top: 0,
							bottom: 0,
							left: 0,
							right: 0,
						}}
					>
						<Grid item>
							<Typography
								variant="h4"
								gutterBottom
								style={{
									color: "lightgreen",
									textAlign: "center",
									fontWeight: "bold",
								}}
							>
								Find Tennis Players Near You and Play Today!
							</Typography>
							<Grid
								item
								style={{
									textAlign: "center",
									marginTop: "2rem",
								}}
							>
								<Button
									variant="contained"
									color="primary"
									style={{
										color: "#fff",
										backgroundColor: "#2E8B57",
									}}
									onClick={() => {
										navigate("/search");
									}}
								>
									Get Started
								</Button>
							</Grid>
						</Grid>
					</Grid>
				</div>
			</Grid>
		</Grid>
	);
};

export default PublicHomeComponent;
