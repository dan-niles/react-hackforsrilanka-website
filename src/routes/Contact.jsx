import { useState, forwardRef } from "react";

import AnimatedPage from "../components/AnimatedPage/AnimatedPage";
import { useTheme } from "@mui/material/styles";
import Button from "@mui/material/Button";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";

import emailjs from "emailjs-com";
import { init } from "emailjs-com";
init("user_id");

const Alert = forwardRef(function Alert(props, ref) {
	return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const Contact = () => {
	const appTheme = useTheme();

	const [open, setOpen] = useState(false);

	const [name, setName] = useState("");
	const [email, setEmail] = useState("");
	const [userPhoneNumber, setUserPhoneNumber] = useState("");
	const [message, setMessage] = useState("");

	const [emailSent, setEmailSent] = useState(false);

	const submitHandler = (e) => {
		e.preventDefault();
		if (name && email && message) {
			const serviceId = "service_tizq51o";
			const templateId = "template_qo3mxit";
			const publicKey = "MINMFTdo3erEwqnFi";
			const templateParams = {
				name,
				email,
				message,
			};

			emailjs
				.send(serviceId, templateId, templateParams, publicKey)
				.then((response) => console.log(response))
				.then((error) => console.log(error));

			setName("");
			setEmail("");
			setUserPhoneNumber("");
			setMessage("");
			setEmailSent(true);
			setOpen(true);
		} else {
			alert("Please fill in all fields.");
		}
	};

	const handleClose = (event, reason) => {
		if (reason === "clickaway") {
			return;
		}

		setOpen(false);
	};

	return (
		<AnimatedPage>
			<Snackbar
				anchorOrigin={{ vertical: "top", horizontal: "center" }}
				open={open}
				autoHideDuration={6000}
				onClose={handleClose}
			>
				<Alert onClose={handleClose} severity="success" sx={{ width: "100%" }}>
					Thank you for your message, we will be in touch in no time!
				</Alert>
			</Snackbar>
			<section className="py-3 py-md-5">
				<div className="container px-3 px-md-5">
					{/* <!-- Contact form--> */}
					<div className="bg-light rounded-3 py-5 px-4 px-md-5 mb-5">
						<div className="text-center mb-5">
							<div
								className={`feature ${
									appTheme.palette.mode === "dark"
										? "bg-warning text-dark"
										: "bg-danger text-light"
								} rounded-3 mb-3`}
							>
								<i className="bi bi-envelope"></i>
							</div>
							<h1 className="fw-bolder">Get in touch</h1>
							<p className="lead fw-normal text-white-50 mb-0">
								We'd love to hear from you
							</p>
						</div>
						<div className="row justify-content-center">
							<div className="col-lg-8 col-xl-6">
								<form id="contactForm" onSubmit={submitHandler}>
									{/* <!-- Name input--> */}
									<div className="form-floating mb-3">
										<input
											className="form-control"
											id="name"
											type="text"
											placeholder="Enter your name..."
											required="required"
											value={name}
											onChange={(e) => setName(e.target.value)}
										/>
										<label htmlFor="name">Name</label>
										<div
											className="invalid-feedback"
											data-sb-feedback="name:required"
										>
											A name is required.
										</div>
									</div>
									{/* <!-- Email address input--> */}
									<div className="form-floating mb-3">
										<input
											className="form-control"
											id="email"
											type="email"
											placeholder="name@example.com"
											required="required"
											value={email}
											onChange={(e) => setEmail(e.target.value)}
										/>
										<label htmlFor="email">Email address</label>
										<div
											className="invalid-feedback"
											data-sb-feedback="email:required"
										>
											An email is required.
										</div>
										<div
											className="invalid-feedback"
											data-sb-feedback="email:email"
										>
											Email is not valid.
										</div>
									</div>
									{/* <!-- Phone number input--> */}
									{/* <div className="form-floating mb-3">
										<input
											className="form-control"
											id="phone"
											type="tel"
											placeholder="(123) 456-7890"
											value={userPhoneNumber}
											onChange={(e) => setUserPhoneNumber(e.target.value)}
										/>
										<label htmlFor="phone">Phone number</label>
										<div
											className="invalid-feedback"
											data-sb-feedback="phone:required"
										>
											A phone number is required.
										</div>
									</div> */}
									{/* <!-- Message input--> */}
									<div className="form-floating mb-3">
										<textarea
											className="form-control"
											id="message"
											type="text"
											placeholder="Enter your message here..."
											style={{ height: "10rem" }}
											required="required"
											value={message}
											onChange={(e) => setMessage(e.target.value)}
										/>
										<label htmlFor="message">Message</label>
										<div
											className="invalid-feedback"
											data-sb-feedback="message:required"
										>
											A message is required.
										</div>
									</div>
									{/* <!-- Submit success message-->
                            <!---->
                            <!-- This is what your users will see when the form-->
                            <!-- has successfully submitted--> */}
									<div className="d-none" id="submitSuccessMessage">
										<div className="text-center mb-3">
											<div className="fw-bolder">
												Form submission successful!
											</div>
											To activate this form, sign up at
											<br />
											<a href="https://startbootstrap.com/solution/contact-forms">
												https://startbootstrap.com/solution/contact-forms
											</a>
										</div>
									</div>
									{/* <!-- Submit error message-->
                            <!---->
                            <!-- This is what your users will see when there is-->
                            <!-- an error submitting the form--> */}
									{/* <div className={emailSent ? "d-block" : "d-none"}>
										<div className="text-center mb-3">
											Thank you for your message, we will be in touch in no
											time!
										</div>
									</div> */}
									{/* <!-- Submit Button--> */}
									<div className="d-grid">
										<button
											className={`btn ${
												appTheme.palette.mode === "dark"
													? "btn-warning"
													: "btn-danger"
											} btn-lg fs-6 fw-bold`}
											id="submitButton"
											type="submit"
										>
											Submit
										</button>
									</div>
								</form>
							</div>
						</div>
					</div>
					{/* <!-- Contact cards--> */}
					{/* <div className="form-group col-12 mt-4 text-center">
						<h1>Coming Soon...</h1>
					</div>
					<div className="row row-cols-2 row-cols-lg-4 py-5">
						<div className="col">
							<div
								className={`feature ${
									appTheme.palette.mode === "dark"
										? "bg-warning text-dark"
										: "bg-danger text-light"
								} rounded-3 mb-3`}
							>
								<i className="bi bi-chat-dots"></i>
							</div>
							<div className="h5 mb-2">Chat with us</div>
							<p className="text-white-50 mb-0">
								Chat live with one of our support specialists.
							</p>
						</div>
						<div className="col">
							<div
								className={`feature ${
									appTheme.palette.mode === "dark"
										? "bg-warning text-dark"
										: "bg-danger text-light"
								} rounded-3 mb-3`}
							>
								<i className="bi bi-people"></i>
							</div>
							<div className="h5">Ask the community</div>
							<p className="text-white-50 mb-0">
								Explore our community forums and communicate with other users.
							</p>
						</div>
						<div className="col">
							<div
								className={`feature ${
									appTheme.palette.mode === "dark"
										? "bg-warning text-dark"
										: "bg-danger text-light"
								} rounded-3 mb-3`}
							>
								<i className="bi bi-question-circle"></i>
							</div>
							<div className="h5">Support center</div>
							<p className="text-white-50 mb-0">
								Browse FAQ's and support articles to find solutions.
							</p>
						</div>
						<div className="col">
							<div
								className={`feature ${
									appTheme.palette.mode === "dark"
										? "bg-warning text-dark"
										: "bg-danger text-light"
								} rounded-3 mb-3`}
							>
								<i className="bi bi-telephone"></i>
							</div>
							<div className="h5">Call us</div>
							<p className="text-white-50 mb-0">
								Call us during normal business hours at (555) 892-9403.
							</p>
						</div>
					</div> */}
				</div>
			</section>
		</AnimatedPage>
	);
};

export default Contact;
