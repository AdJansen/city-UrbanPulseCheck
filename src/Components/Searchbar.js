import React, { Fragment } from "react";
import './Searchbar.css';
import { TextField } from '@mui/material';
import DropDown from './DropDown';

//We will take the first city to appear from the search
const Searchbar = ({selectedUrbanArea, setSelectedUrbanArea}) => {
  return (
    <nav className="navbar">
      <DropDown 
        selectedUrbanArea={selectedUrbanArea} 
        setSelectedUrbanArea={setSelectedUrbanArea}
        className="searchField"/>
    </nav>
  );
};

export default Searchbar;
