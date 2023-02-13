import React from 'react';
import { useState, useEffect } from 'react';

const AirQualityBar = ({selectedUrbanArea}) => {
    const [airData, setAirData] = useState([]);
    const [weatherData, setWeatherData] = useState([]);
    const city = selectedUrbanArea;

    useEffect(() => {
        const fetchData = async () => {
            const response = await fetch(`https://api.waqi.info/feed/${city}/?token=f419ebf4321774d187a782c59307d9b30ee056b7`);
            const data = await response.json();
            console.log("Air Quality Data")
            console.log(data)    
            setAirData(data);
            const response2 = await fetch(`http://api.weatherapi.com/v1/current.json?key=02636dea6dac4e80bf3152610231302&q=${city}&aqi=no`);
            const data2 = await response2.json();
            setWeatherData(data2);
            console.log(data2);

        
        };
        fetchData();
    }, [selectedUrbanArea, city]);

    const wuhwuh = "N/A";

    return (
        <div className="air-quality-bar">
            <h1>{selectedUrbanArea}</h1>
            <h2>Air Quality Index: {(airData.data && airData.status != "error" )? airData.data.aqi : wuhwuh}</h2>
            <h2>Temperature: {(weatherData.current && weatherData.error == null) ? weatherData.current.temp_f : wuhwuh}</h2>
        </div>
    );
};

export default AirQualityBar;