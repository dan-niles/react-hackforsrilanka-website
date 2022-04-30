import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import axios from "axios";
import { baseURL } from "../../../BaseApi";

const AreaForm = () => {
  let navigate = useNavigate();
  const [areaList, setAreaList] = useState();
  const [districtList, setDistrictList] = useState();
  const [districtSelect, setDistrictSelect] = useState("");
  const handleDistrictSelectChange = (event) => {
    setDistrictSelect(event.target.value);
  };

  const [areaSelect, setAreaSelect] = useState("");
  const handleAreaSelectChange = (event) => {
    setAreaSelect(event.target.value);
  };

  const submitHandler = (e) => {
    e.preventDefault();
    navigate({
      pathname: "/schedule",
      search: "?group=A",
    });
  };

  useEffect(() => {
    axios
      .get(baseURL + "/api/all-gcc/?gcc=")
      .then((res) => {
        console.log("-------district--------", res);
        setDistrictList(res.data.data);
      })
      .catch((errr) => {
        console.log("--------error-------", errr.response);
      });
  }, []);

  useEffect(() => {
    axios
      .get(baseURL + `/api/all-area/?gcc=${districtSelect}`)
      .then((res) => {
        console.log(res);
        setAreaList(res.data.data);
      })
      .catch((errr) => {
        console.log("--------error-------", errr.response);
      });
  }, [districtSelect]);

  return (
    <form action="" method="post" onSubmit={submitHandler}>
      <div className="form-row">
        <h3 className="fw-bolder mb-4">Search by Location</h3>
        <div className="form-group col-12">
          <FormControl fullWidth>
            <InputLabel id="district-select">Select your district</InputLabel>
            <Select
              labelId="district-select-label"
              id="district-select"
              label="Select District"
              value={districtSelect}
              onChange={handleDistrictSelectChange}
              name="district"
              required
            >
              {districtList?.map((item, index) => {
                console.log("------dist namesssss", item);
                return (
                  <MenuItem value={item} key={index}>
                    {item}
                  </MenuItem>
                );
              })}
            </Select>
          </FormControl>
        </div>
        <div className="form-group col-12 mt-3">
          <FormControl fullWidth>
            <InputLabel id="district-select">Select your area</InputLabel>
            <Select
              labelId="area-select-label"
              id="area-select"
              label="Select your area"
              value={areaSelect}
              onChange={handleAreaSelectChange}
              name="area"
              required
            >
              {areaList?.map((item, index) => {
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
          <button className="btn btn-warning px-4 fw-bold">Search</button>
        </div>
      </div>
    </form>
  );
};

export default AreaForm;
