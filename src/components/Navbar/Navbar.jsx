import { useState } from "react";
import { Link, NavLink } from "react-router-dom";

import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";

import MenuItem from "@mui/material/MenuItem";

const pages = [
	{ title: "Home", link: "/" },
	{ title: "Schedule", link: "schedule" },
	{ title: "About", link: "about" },
	{ title: "Contact", link: "contact" },
];

const Navbar = () => {
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
				backgroundColor: "#1b1b1b",
				boxShadow: "none",
				backgroundImage: "none",
				px: { xs: 0, md: "3rem" },
				mx: "auto",
				py: { xs: 1, md: "1rem" },
			}}
		>
			<Container maxWidth="xl">
				<Toolbar>
					<Link to="/">
						<img
							className="nav-logo"
							src={require("../../assets/img/logo.png")}
							alt="site logo"
						/>
					</Link>

					<Box
						sx={{
							flexGrow: 1,
							display: { xs: "flex", md: "none" },
							justifyContent: { xs: "end", md: "none" },
						}}
					>
						<IconButton
							size="large"
							onClick={handleOpenNavMenu}
							color="inherit"
						>
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
						</Menu>
					</Box>
					{/* Mobile NavBar				 */}
					<Box
						sx={{
							flexGrow: 1,
							display: { xs: "none", md: "flex" },
							justifyContent: { xs: "end", md: "none" },
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
									color: "white",
									display: "block",
									textTransform: "none",
									textAlign: "center",
								}}
								color="warning"
								className="nav-link"
							>
								{page.title}
							</Button>
						))}
					</Box>
				</Toolbar>
			</Container>
		</AppBar>
	);
};
export default Navbar;
