import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import SportsTennisIcon from "@mui/icons-material/SportsTennis";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { logoutThunk } from "../services/users/users-thunk";
import { useDispatch } from "react-redux";
import { useState } from "react";

function PublicNavBar() {
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const { currentUser } = useSelector((state) => state.users);
	let pages = ["people", "search", "profile"];
	let settings = ["register", "login"];
	if (currentUser) {
		settings = ["logout"];
		pages = ["people", "search", "courts", "profile", "matches"];
	}
	const [anchorElNav, setAnchorElNav] = useState(null);
	const [anchorElUser, setAnchorElUser] = useState(null);

	const handleOpenNavMenu = (event) => {
		setAnchorElNav(event.currentTarget);
		// console.log("handleOpenNavMenu");
	};
	const handleOpenUserMenu = (event) => {
		setAnchorElUser(event.currentTarget);
		// console.log("handleOpenUserMenu");
	};

	const handleCloseNavMenu = () => {
		setAnchorElNav(null);

		// console.log("handleCloseNavMenu");
	};

	const handleCloseUserMenu = () => {
		setAnchorElUser(null);
		// console.log("handleCloseUserMenu");
	};

	const handleNavClick = async (page) => {
		handleCloseNavMenu();
		if (page === "logout") {
			navigate("/");
			await dispatch(logoutThunk());
		} else if (page === "profile") {
			if (currentUser) {
				navigate(`/profile/${currentUser.username}`);
			} else {
				navigate("/profile");
			}
		} else {
			navigate(page);
		}
	};
	return (
		<AppBar position="static" color="primary">
			<Container maxWidth="xl">
				<Toolbar disableGutters>
					<SportsTennisIcon
						sx={{ display: { xs: "none", md: "flex" }, mr: 1 }}
					/>
					<Typography
						variant="h6"
						noWrap
						component="a"
						href="/"
						sx={{
							mr: 2,
							display: { xs: "none", md: "flex" },
							fontFamily: "monospace",
							fontWeight: 700,
							letterSpacing: ".3rem",
							color: "inherit",
							textDecoration: "none",
						}}
					>
						HOME
					</Typography>

					<Box
						sx={{
							flexGrow: 1,
							display: { xs: "flex", md: "none" },
						}}
					>
						<IconButton
							size="large"
							aria-label="account of current user"
							aria-controls="menu-appbar"
							aria-haspopup="true"
							onClick={handleOpenNavMenu}
							color="inherit"
						>
							<MenuIcon />
						</IconButton>
						<Menu
							id="menu-appbar"
							anchorEl={anchorElNav}
							anchorOrigin={{
								vertical: "bottom",
								horizontal: "left",
							}}
							keepMounted
							transformOrigin={{
								vertical: "top",
								horizontal: "left",
							}}
							open={Boolean(anchorElNav)}
							onClose={handleCloseNavMenu}
							sx={{
								display: { xs: "block", md: "none" },
							}}
						>
							{pages.map((page) => (
								<MenuItem
									key={page}
									onClick={() => handleNavClick(page)}
								>
									<Typography textAlign="center">
										{page}
									</Typography>
								</MenuItem>
							))}
						</Menu>
					</Box>
					<SportsTennisIcon
						sx={{ display: { xs: "flex", md: "none" }, mr: 1 }}
					/>
					<Typography
						variant="h5"
						noWrap
						component="a"
						href="/"
						sx={{
							mr: 2,
							display: { xs: "flex", md: "none" },
							flexGrow: 1,
							fontFamily: "monospace",
							fontWeight: 700,
							letterSpacing: ".3rem",
							color: "inherit",
							textDecoration: "none",
						}}
					>
						HOME
					</Typography>
					<Box
						sx={{
							flexGrow: 1,
							display: { xs: "none", md: "flex" },
						}}
					>
						{pages.map((page) => (
							<Button
								key={page}
								onClick={() => handleNavClick(page)}
								sx={{
									fontWeight: "bold",
									my: 2,
									color: "black",
									display: "block",
								}}
							>
								{page}
							</Button>
						))}
					</Box>

					<Box
						sx={{
							flexGrow: 1,
							display: { xs: "flex" },
						}}
					>
						{settings.map((setting) => (
							<Button
								key={setting}
								onClick={() => handleNavClick(setting)}
								sx={{
									my: 2,
									fontWeight: "bold",
									color: "black",
									display: "block",
								}}
							>
								{setting}
							</Button>
						))}
					</Box>
				</Toolbar>
			</Container>
		</AppBar>
	);
}
export default PublicNavBar;
