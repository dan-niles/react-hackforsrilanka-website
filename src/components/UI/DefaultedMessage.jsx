import LangRoutes from "../../lang/LangRoutes";
import { FormattedMessage } from "react-intl";

const DefaultedMessage = (props) => {
	return (
		<FormattedMessage
			id={props.id}
			defaultMessage={LangRoutes.getDefaultedMessage(props.id)}
		/>
	);
};

export default DefaultedMessage;
