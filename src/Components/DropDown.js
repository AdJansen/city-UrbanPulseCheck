import React, { useState, useEffect } from "react";
import MenuItem from '@mui/material/MenuItem';
import InputLabel from '@mui/material/InputLabel';
import Select from '@mui/material/Select';
import { FormControl } from "@mui/material";


//Written with some help from ChatGPT :) 
const DropDown = ({ selectedUrbanArea, setSelectedUrbanArea }) => {
  const [urbanAreas, setUrbanAreas] = useState([]);

  const handleChange = (event) => {

    setSelectedUrbanArea(event.target.value);
  };

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch("https://api.teleport.org/api/urban_areas/");
      const data = await response.json();
      setUrbanAreas(data._links["ua:item"]);
    };
    console.log("UseEffect Urban");
    fetchData();
  }, []);

  return (
    <FormControl style={{ width: "40%" }}>
      <InputLabel id="select-label" style={{color: "black"}}>City</InputLabel>
      <Select 
        labelId="city-select"
        id="city-select"
        onChange={handleChange}
        value={selectedUrbanArea}
        style={{backgroundColor: "#f5f5f5"}}
      >
        {urbanAreas.map((urbanArea) => (
          <MenuItem key={urbanArea.name} value={urbanArea.name}>
            {urbanArea.name}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

export default DropDown;
