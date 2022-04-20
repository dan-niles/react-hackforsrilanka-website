import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

const AlertDialog = (props) => {
	return (
		<Dialog open={props.open} onClose={props.handleClose}>
			<DialogTitle className="bg-dark">
				Subscribe to Group {props.groupName}
			</DialogTitle>
			<DialogContent className="bg-dark">
				<DialogContentText>
					To subscribe to this group, please enter your phone numbers here. We
					will send updates occasionally.
				</DialogContentText>
				<TextField
					autoFocus
					margin="dense"
					id="phone-number"
					label="Phone Number"
					type="tel"
					fullWidth
					variant="standard"
					autoComplete="off"
					color="success"
				/>
			</DialogContent>
			<DialogActions className="bg-dark">
				<Button onClick={props.handleClose} color="secondary">
					Cancel
				</Button>
				<Button onClick={props.handleClose} color="success">
					Subscribe
				</Button>
			</DialogActions>
		</Dialog>
	);
};

export default AlertDialog;
