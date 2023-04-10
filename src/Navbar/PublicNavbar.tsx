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
import AdbIcon from "@mui/icons-material/Adb";
import { useNavigate } from "react-router-dom";

const pages = ["People", "Search", "My Courts"];
const settings = ["Register", "Login"];

function PublicNavBar() {
	const navigate = useNavigate();
	const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(
		null
	);
	const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(
		null
	);

	const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
		setAnchorElNav(event.currentTarget);
		console.log("handleOpenNavMenu");
	};
	const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
		setAnchorElUser(event.currentTarget);
		console.log("handleOpenUserMenu");
	};

	const handleCloseNavMenu = () => {
		setAnchorElNav(null);

		console.log("handleCloseNavMenu");
	};

	const handleCloseUserMenu = () => {
		setAnchorElUser(null);
		console.log("handleCloseUserMenu");
	};

	const handleNavClick = (page: string) => {
		console.log("handleNavClick");
		console.log(page);
		navigate(page);
	};
	return (
		<AppBar position="static">
			<Container maxWidth="xl">
				<Toolbar disableGutters>
					<AdbIcon
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
					<AdbIcon
						sx={{ display: { xs: "flex", md: "none" }, mr: 1 }}
					/>
					<Typography
						variant="h5"
						noWrap
						component="a"
						href=""
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
								sx={{ my: 2, color: "white", display: "block" }}
							>
								{page}
							</Button>
						))}
					</Box>

					<Box
						sx={{
							flexGrow: 1,
							display: { xs: "none", md: "flex" },
						}}
					>
						{settings.map((setting) => (
							<Button
								key={setting}
								onClick={() => handleNavClick(setting)}
								sx={{ my: 2, color: "white", display: "block" }}
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
