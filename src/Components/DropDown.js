import React, { useState, useEffect } from "react";
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';


//Written with some help from ChatGPT :) 
const DropDown = ({selectedUrbanArea, setSelectedUrbanArea}) => {
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
    <Select 
      onChange={handleChange} 
      value={selectedUrbanArea} 
      label="City"
    >
      {urbanAreas.map((urbanArea) => (
        <MenuItem key={urbanArea.name} value={urbanArea.name}>
          {urbanArea.name}
        </MenuItem>
      ))}
    </Select>
  );
};

export default DropDown;
