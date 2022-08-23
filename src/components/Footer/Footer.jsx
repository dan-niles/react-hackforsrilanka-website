import FooterContainer from "./FooterContainer";
import FooterItem from "./FooterItem";
import LangRoutes from "../../lang/LangRoutes";

const Footer = () => {
	return (
		<FooterContainer>
			<FooterItem langRoute={LangRoutes.ENGLISH} />
			<FooterItem langRoute={LangRoutes.SINHALA} />
			<FooterItem langRoute={LangRoutes.TAMIL} lastItem={true} />
		</FooterContainer>
	);
};

export default Footer;
