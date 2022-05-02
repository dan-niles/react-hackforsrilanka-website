import { motion } from "framer-motion";

const animations = {
	initial: { opacity: 0 },
	animate: { opacity: 100 },
	exit: { opacity: 0 },
};

const AnimatedPage = (props) => {
	return (
		<motion.div
			variants={animations}
			initial="initial"
			animate="animate"
			exit="exit"
			transition={{ duration: 2 }}
		>
			{props.children}
		</motion.div>
	);
};

export default AnimatedPage;