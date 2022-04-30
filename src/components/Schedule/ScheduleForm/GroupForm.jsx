import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

import { baseURL } from "../../../BaseApi";
import axios from "axios";

const GroupForm = (props) => {
  let navigate = useNavigate();

  // Fetch Group Names
  const [groups, setGroups] = useState([]);
  const [getSchedule, setGetSchedule] = useState();

  const fetchGroupNames = () => {
    return axios.get(baseURL + "/api/all-group/").then((res) => {
      console.log(res);
      setGroups(res.data.data);
    });
  };

  useEffect(() => {
    fetchGroupNames();
  }, []);

  const [groupSelect, setGroupSelect] = useState(props.groupName);
  const handleGroupSelectChange = (event) => {
    setGroupSelect(event.target.value);
  };

  const submitHandler = (e) => {
    e.preventDefault();
    navigate(
      {
        pathname: "/schedule",
        search: "?group=" + groupSelect,
      },
      { state: { data: getSchedule } }
    );
  };

  return (
    <form action="" method="get" onSubmit={submitHandler}>
      <div className="form-row">
        <div className="form-group col-12">
          <h3 className="fw-bolder mb-4">Search by Group</h3>
          <FormControl fullWidth>
            <InputLabel id="group-select">Select your group</InputLabel>
            <Select
              labelId="group-select-label"
              id="group-select"
              label="Select your group"
              value={groupSelect}
              onChange={handleGroupSelectChange}
              name="group"
              required
            >
              {groups?.map((item, index) => {
                return (
                  <MenuItem value={item} key={index}>
                    {item}
                  </MenuItem>
                );
              })}
            </Select>
          </FormControl>
        </div>
        <div className="form-group col-12 mt-4 text-center">
          {/* <Button color="warning" variant="contained">
        Search
    </Button> */}
          <button type="submit" className="btn btn-warning px-4 fw-bold">
            Search
          </button>
        </div>
      </div>
    </form>
  );
};

export default GroupForm;
