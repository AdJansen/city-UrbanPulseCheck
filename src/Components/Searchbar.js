import React, { Fragment } from "react";
import './Searchbar.css';
import { TextField } from '@mui/material';;

//We will take the first city to appear from the search
const Searchbar = () => {
  return (
    <nav className="navbar">
      <TextField fullWidth id="outlined-basic" label="City Search" variant="outlined" className="searchField"/>
    </nav>
  );
};

export default Searchbar;