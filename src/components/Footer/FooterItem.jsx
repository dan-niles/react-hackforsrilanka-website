const FooterItem = (props) => {
	return (
		<>
			<a className="link-light small" href={props.href}>
				{props.label}
			</a>
			{props.lastItem == true ? (
				""
			) : (
				<span className="text-white mx-1">&middot;</span>
			)}
		</>
	);
};

export default FooterItem;
