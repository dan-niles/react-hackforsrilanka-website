import { useState } from "react";

import GroupForm from "./GroupForm";
import AreaForm from "./AreaForm";

import { ToggleButtonGroup, ToggleButton } from "@mui/material";

const ScheduleForm = (props) => {
  const [toggle, setToggle] = useState("groupToggle");
  const [showAreaForm, setShowAreaForm] = useState(false);

  const handleToggleChange = (event, newVal) => {
    if (newVal !== null) {
      setToggle(newVal);
    }
    if (newVal === "groupToggle") {
      setShowAreaForm(false);
    } else if (newVal === "areaToggle") {
      setShowAreaForm(true);
    }
  };

  return (
    <header
      className="header-center py-5"
      // style={{
      // 	background: `url("${require("../../../assets/img/bulb-bg.webp")}")`,
      // }}
    >
      <div className="container px-3 px-md-5">
        <div className="text-center mb-5">
          <h1 className="fw-bolder">Select your group or area below.</h1>
        </div>
        <div className="row align-items-center justify-content-center">
          <div className="col-12 col-md-6 text-center">
            <ToggleButtonGroup
              value={toggle}
              exclusive
              onChange={handleToggleChange}
              color="warning"
            >
              <ToggleButton value="groupToggle">Search by Group</ToggleButton>
              <ToggleButton value="areaToggle">Search by Location</ToggleButton>
            </ToggleButtonGroup>
          </div>
        </div>
        <div className="row align-items-center justify-content-center">
          <div className="col-12 col-md-6">
            <div className="card p-md-5 p-4">
              {!showAreaForm && <GroupForm groupName={props.groupName} />}
              {showAreaForm && <AreaForm />}
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default ScheduleForm;