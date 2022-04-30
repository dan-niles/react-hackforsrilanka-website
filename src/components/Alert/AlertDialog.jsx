import React, { useState } from "react";
import axios from "axios";
import OtpInput from "react-otp-input";

import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

import { baseURL } from "../../BaseApi";

const AlertDialog = (props) => {
  const [name, setName] = useState();
  const [areaName, setAreaName] = useState("");
  const [phoneNum, setPhoneNum] = useState();
  const [groupName, setGroupName] = useState(props.groupName);
  const [otp, setOtp] = useState();
  const [otpErr, setOtpErr] = useState();
  const [showOtpBox, setShowOtpBox] = useState(false);
  const [secretKey, setSecretKey] = useState();

  const getSubscription = () => {
    return axios
      .post(
        baseURL + "/api/subscribe/",
        {
          mobile_number: phoneNum,
          name: name,
          group_name: groupName,
        },
        {
          headers: { Accept: "application/json" },
        }
      )
      .then((res) => {
        console.log("------response------", res);
        setShowOtpBox(true);
        setSecretKey(res.data.secret_key);
      })
      .catch((errr) => {
        console.log("--------error----", errr);
      });
  };

  const verifyOtp = () => {
    console.log("------verify otp");
    const data = { otp, name, areaName, groupName, phoneNum, secretKey };
    console.log("---------data----------", data);
    return axios
      .post(
        baseURL + "/api/verify-otp/",
        {
          otp: data.otp,
          secret_key: data.secretKey,
          mobile_number: data.phoneNum,
          name: data.name,
          group_name: data.groupName,
        },
        {
          headers: { Accept: "application/json" },
        }
      )
      .then((res) => {
        console.log("-------respose-------", res);
        props.handleClose();
      })
      .catch((errr) => {
        console.log("--------error-------", errr);
      });
  };

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
          label="Name"
          type="tel"
          value={name}
          onChange={(e) => setName(e.target.value)}
          fullWidth
          variant="standard"
          autoComplete="off"
          color="success"
        />
        <TextField
          autoFocus
          margin="dense"
          id="phone-number"
          label="Phone Number"
          type="tel"
          value={phoneNum}
          onChange={(e) => setPhoneNum(e.target.value)}
          fullWidth
          variant="standard"
          autoComplete="off"
          color="success"
        />
        {showOtpBox && (
          <div className="py-3">
            <OtpInput
              hasErrored="true"
              className="otp_value"
              name="otp"
              hasErrored={otpErr}
              value={otp}
              placeholder="______"
              onChange={(e) => setOtp(e)}
              numInputs={6}
              errorStyle={{
                width: "60px",
                height: "60px",
                margin: "0 1rem",
                fontSize: "2rem",
                borderRadius: 12,
                border: "2px solid red",
              }}
              inputStyle={{
                width: "60px",
                height: "60px",
                margin: "0 1rem",
                fontSize: "2rem",
                borderRadius: 12,
                border: "1px solid rgba(0,0,0,0.3)",
              }}
            />
          </div>
        )}
      </DialogContent>
      <DialogActions className="bg-dark">
        {showOtpBox && (
          <Button onClick={verifyOtp} color="secondary">
            Verify Otp
          </Button>
        )}
        <Button onClick={props.handleClose} color="secondary">
          Cancel
        </Button>
        {!showOtpBox && (
          <Button onClick={getSubscription} color="success">
            {/* onClick={props.handleClose} */}
            Subscribe
          </Button>
        )}
      </DialogActions>
    </Dialog>
  );
};

export default AlertDialog;
