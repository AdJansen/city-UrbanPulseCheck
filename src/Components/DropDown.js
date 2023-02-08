import React, { useState, useEffect } from "react";


//Written with some help from ChatGPT :) 
const UrbanAreas = () => {
  const [urbanAreas, setUrbanAreas] = useState([]);

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
    <select>
      {urbanAreas.map((urbanArea) => (
        <option key={urbanArea.name} value={urbanArea.name}>
          {urbanArea.name}
        </option>
      ))}
    </select>
  );
};

export default UrbanAreas;
