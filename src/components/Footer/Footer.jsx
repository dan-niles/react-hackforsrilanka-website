import FooterContainer from "./FooterContainer";
import FooterItem from "./FooterItem";

const Footer = () => {
	return (
		<FooterContainer>
			<FooterItem label="English" locale="en" href="#" />
			<FooterItem label="සිංහල" locale="si-LK" href="#" />
			<FooterItem label="தமிழ்" locale="ta-LK" href="#" lastItem={true} />
		</FooterContainer>
	);
};

export default Footer;
