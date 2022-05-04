import { useState, useContext } from "react";
import { Link, NavLink } from "react-router-dom";

import { useTheme } from "@mui/material/styles";

import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
import Brightness4Icon from "@mui/icons-material/Brightness4";
import Brightness7Icon from "@mui/icons-material/Brightness7";
import MenuItem from "@mui/material/MenuItem";

import ColorModeContext from "../../contexts/color-mode";

const pages = [
	{ title: "Home", link: "/" },
	{ title: "Schedule", link: "schedule" },
	{ title: "About", link: "about" },
	{ title: "Contact", link: "contact" },
];

const Navbar = () => {
	const appTheme = useTheme();
	const colorMode = useContext(ColorModeContext);

	const [anchorElNav, setAnchorElNav] = useState(null);

	const handleOpenNavMenu = (event) => {
		setAnchorElNav(event.currentTarget);
	};

	const handleCloseNavMenu = () => {
		setAnchorElNav(null);
	};

	return (
		<AppBar
			position="static"
			sx={{
				backgroundColor:
					appTheme.palette.mode === "dark" ? "#1b1b1b" : "#ffffff",
				boxShadow: "none",
				borderBottom:
					appTheme.palette.mode === "dark" ? "" : "1px solid #dadce0",
				backgroundImage: "none",
				px: { xs: 0, md: "3rem" },
				mx: "auto",
				py: { xs: 1, md: 0.5 },
			}}
		>
			<Container maxWidth="xl">
				<Toolbar>
					<Link to="/">
						<img
							className="nav-logo"
							src={
								appTheme.palette.mode === "dark"
									? require("../../assets/img/logo.png")
									: require("../../assets/img/logo-light.png")
							}
							alt="site logo"
						/>
					</Link>
					<Link to="/" style={{ textDecoration: "none" }}>
						<Typography
							variant="h5"
							component="div"
							sx={{
								flexGrow: 1,
								ml: 1,
								color: appTheme.palette.mode === "dark" ? "white" : "black",
								fontWeight: 600,
							}}
						>
							Ekata
						</Typography>
					</Link>
					<Box
						sx={{
							flexGrow: 1,
							display: { xs: "flex", md: "none" },
							justifyContent: { xs: "end", md: "none" },
						}}
					>
						<IconButton size="large" onClick={handleOpenNavMenu}>
							<MenuIcon />
						</IconButton>
						<Menu
							id="menu-appbar"
							anchorEl={anchorElNav}
							anchorOrigin={{
								vertical: "top",
								horizontal: "right",
							}}
							keepMounted
							transformOrigin={{
								vertical: "top",
								horizontal: "right",
							}}
							open={Boolean(anchorElNav)}
							onClose={handleCloseNavMenu}
							sx={{
								display: { xs: "block", md: "none" },
							}}
						>
							{pages.map((page) => (
								<MenuItem
									key={page.title}
									onClick={handleCloseNavMenu}
									component={NavLink}
									to={page.link}
									className="nav-link"
								>
									<Typography textAlign="center" textTransform="none">
										{page.title}
									</Typography>
								</MenuItem>
							))}
							{/* Dark/Light mode switcher */}
							<MenuItem onClick={colorMode.toggleColorMode}>
								<IconButton
									className="nav-link px-3"
									sx={{
										textAlign: "center",
										color: appTheme.palette.mode === "dark" ? "white" : "black",
									}}
								>
									{appTheme.palette.mode === "dark" ? (
										<Brightness7Icon />
									) : (
										<Brightness4Icon />
									)}
								</IconButton>
							</MenuItem>
						</Menu>
					</Box>
					{/* Desktop NavBar				 */}
					<Box
						sx={{
							flexGrow: 1,
							display: { xs: "none", md: "flex" },
							justifyContent: { xs: "end", md: "none" },
							alignItems: "center",
						}}
					>
						{pages.map((page) => (
							<Button
								component={NavLink}
								to={page.link}
								key={page.title}
								onClick={handleCloseNavMenu}
								sx={{
									my: 2,
									color: appTheme.palette.mode === "dark" ? "white" : "black",
									display: "block",
									textTransform: "none",
									textAlign: "center",
								}}
								color={appTheme.palette.mode === "dark" ? "warning" : "primary"}
								className="nav-link"
							>
								{page.title}
							</Button>
						))}
						{/* Dark/Light mode switcher */}
						<IconButton
							className="nav-link"
							sx={{
								ml: 2,
								color: appTheme.palette.mode === "dark" ? "white" : "black",
							}}
							onClick={colorMode.toggleColorMode}
						>
							{appTheme.palette.mode === "dark" ? (
								<Brightness7Icon />
							) : (
								<Brightness4Icon />
							)}
						</IconButton>
					</Box>
				</Toolbar>
			</Container>
		</AppBar>
	);
};
export default Navbar;
