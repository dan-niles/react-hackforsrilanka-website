import React, { useState } from "react";

import MobileStepper from "@mui/material/MobileStepper";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import Slide from "@mui/material/Slide";
import guideData from "./guideData";

const maxStepsSwipe = guideData.length;

const Transition = React.forwardRef(function Transition(props, ref) {
	return <Slide direction="up" ref={ref} {...props} />;
});

function HelpSlider(props) {
	const { openGuide, closeGuide } = props;
	const [activeStepSwipe, setActiveStepSwipe] = useState(0);

	const handleNextSwipe = () => {
		setActiveStepSwipe(activeStepSwipe + 1);
	};

	const handleBackSwipe = () => {
		setActiveStepSwipe(activeStepSwipe - 1);
	};
	const handleClose = () => {
		closeGuide();
		setTimeout(() => setActiveStepSwipe(0), 500);
	};

	return (
		<Dialog
			TransitionComponent={Transition}
			keepMounted
			open={openGuide}
			onClose={closeGuide}
			aria-labelledby="alert-dialog-title"
			aria-describedby="alert-dialog-description"
		>
			<DialogContent className="bg-dark">
				<div className="mb-2">
					<img
						className="w-100 guide-img"
						src={require(`../../assets/img/guide/guide${activeStepSwipe}.png`)}
					/>
				</div>
				<article>
					<Typography variant="h6" className="mt-3">
						{guideData[activeStepSwipe].title}
					</Typography>
					<Typography>{guideData[activeStepSwipe].label}</Typography>
				</article>
				<MobileStepper
					sx={{ maxWidth: 400, flexGrow: 1 }}
					className="bg-dark mt-3 text-center"
					variant="progress"
					steps={maxStepsSwipe}
					position="static"
					activeStep={activeStepSwipe}
					nextButton={
						activeStepSwipe === maxStepsSwipe - 1 ? (
							<Button size="small" color="secondary" onClick={handleClose}>
								Done
								<KeyboardArrowRightIcon />
							</Button>
						) : (
							<Button size="small" onClick={handleNextSwipe}>
								Next
								<KeyboardArrowRightIcon />
							</Button>
						)
					}
					backButton={
						<Button
							size="small"
							onClick={handleBackSwipe}
							disabled={activeStepSwipe === 0}
						>
							<KeyboardArrowLeftIcon />
							Back
						</Button>
					}
				/>
			</DialogContent>
		</Dialog>
	);
}

export default HelpSlider;
