import React, { useState } from "react";
import axios from "axios";

import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import {
  Container,
  FormControl,
  Grid,
  InputAdornment,
  switchClasses,
} from "@mui/material";
import Swal from "sweetalert2";

import { baseURL } from "../../BaseApi";
import { useNavigate } from "react-router-dom";

const Unsubscribe = () => {
  const [mobileNum, setMobileNum] = useState();
  const [error, setError] = useState();
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const handleClose = () => {
    setOpen(true);
    navigate("/");
  };
  const getUnSubscribe = () => {
    if (mobileNum.toString().length !== 9) {
      setError("Please Enter a 9 digit valid number");
    } else {
      axios
        .post(
          baseURL + "/api/unsubscribe/",
          {
            mobile_number: mobileNum,
          },
          {
            headers: { Accept: "application/json" },
          }
        )
        .then((res) => {
          handleClose();
          Swal.fire({
            position: "top-center",
            icon: "success",
            title: "Unsubscribed successfully",
            showConfirmButton: true,
          });
          setMobileNum("");
        })
        .catch((errr) => {
          setError(errr.response.data.errors);
        });
    }
  };

  return (
    <Grid>
      <Container
        sx={{
          padding: 10,
        }}
      >
        <DialogTitle>Unsubscribe to Notifications </DialogTitle>
        <DialogContent>
          <DialogContentText>
            To unsubscribe from notifications, please enter your phone number
            here.
          </DialogContentText>
          <span className="text-danger"></span>
          <TextField
            autoFocus
            margin="dense"
            id="phone-number"
            label="Phone Number"
            type="tel"
            //   disabled={showOtpBox}
            value={mobileNum}
            onChange={(event) => {
              const regex = /^[0-9]*$/;
              if (event.target.value === "" || regex.test(event.target.value)) {
                setMobileNum(event.target.value);
              }
            }}
            fullWidth
            required
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">+94</InputAdornment>
              ),
            }}
            variant="standard"
            autoComplete="off"
            color="info"
          />
          <span className="text-danger">{error}</span>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="secondary">
            Cancel
          </Button>
          <Button onClick={getUnSubscribe} color="info">
            {/* onClick={props.handleClose} */}
            Unsubscribe
          </Button>
        </DialogActions>
      </Container>
    </Grid>
  );
};
export default Unsubscribe;
