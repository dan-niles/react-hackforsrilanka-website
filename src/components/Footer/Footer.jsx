import FooterContainer from "./FooterContainer";
import FooterItem from "./FooterItem";

const Footer = () => {
	return (
		<FooterContainer>
			<FooterItem label="Privacy" href="#" />
			<FooterItem label="Terms" href="#" />
			<FooterItem label="Contact" href="contact" lastItem={true} />
		</FooterContainer>
	);
};

export default Footer;
