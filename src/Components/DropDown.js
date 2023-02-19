import React, { useState, useEffect } from "react";
import MenuItem from '@mui/material/MenuItem';
import InputLabel from '@mui/material/InputLabel';
import Select from '@mui/material/Select';
import { FormControl } from "@mui/material";


//Written with some help from ChatGPT :) 
const DropDown = ({ selectedUrbanArea, setSelectedUrbanArea }) => {
  // This is the state that holds the list of cities
  const [urbanAreas, setUrbanAreas] = useState([]);

  const handleChange = (event) => { //Taken from MUI docs

    setSelectedUrbanArea(event.target.value);
  };
  //This useEffect is used to fetch the list of cities from the API, this could be improved by just doing it once and accessing the data via variables
  useEffect(() => { //This is the useEffect that fetches the list of cities from the API when the Select is expanded.
    const fetchData = async () => {
      const response = await fetch("https://api.teleport.org/api/urban_areas/");
      const data = await response.json();
      setUrbanAreas(data._links["ua:item"]);
    };
    console.log("UseEffect Urban");
    fetchData();
  }, []);

  return ( //This is the dropdown menu that allows the user to select a city
  //The style={{ width: "40%" }} is used to set the width of the dropdown menu to better fit the searchbar, higher values had trouble on mobile
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
