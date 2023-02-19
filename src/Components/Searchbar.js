import React from "react";
import './Searchbar.css';
import DropDown from './DropDown';
import CityPulse from './CityPulse.png';

//This is the searchbar component, it contains the logo and the dropdown menu: ~100% self written
const Searchbar = ({selectedUrbanArea, setSelectedUrbanArea, testid}) => {
  return (
    <nav className="navbar" data-testid='searchbar-component'>
      <img src={CityPulse} alt="CityPulse" className="logo"/>
      <DropDown 
        selectedUrbanArea={selectedUrbanArea} 
        setSelectedUrbanArea={setSelectedUrbanArea}
        className="searchField"/>
    </nav>
  );
};

export default Searchbar;
