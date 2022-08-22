import FooterContainer from "./FooterContainer";
import FooterItem from "./FooterItem";

const Footer = () => {
	return (
		<FooterContainer>
			<FooterItem label="English" locale="en" />
			<FooterItem label="සිංහල" locale="si-LK" />
			<FooterItem label="தமிழ்" locale="ta-LK" lastItem={true} />
		</FooterContainer>
	);
};

export default Footer;
