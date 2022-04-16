import NavbarContainer from "./NavbarContainer";
import Navbaritem from "./NavbarItem";

const Navbar = () => {
	return (
		<NavbarContainer>
			<Navbaritem label="Home" href="/" />
			<Navbaritem label="Schedule" href="schedule" />
			<Navbaritem label="About" href="about" />
			<Navbaritem label="Contact" href="contact" />
		</NavbarContainer>
	);
};

export default Navbar;
