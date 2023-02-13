import React from 'react';
import { useState, useEffect } from 'react';

const AirQualityBar = ({selectedUrbanArea}) => {
    const [airData, setAirData] = useState([]);
    const city = selectedUrbanArea;

    useEffect(() => {
        const fetchData = async () => {
            const response = await fetch(`https://api.waqi.info/feed/${city}/?token=f419ebf4321774d187a782c59307d9b30ee056b7`);
            const data = await response.json();
            console.log("Air Quality Data")
            console.log(data)
        setAirData(data);
        };
        fetchData();
    }, [selectedUrbanArea]);


    return (
        <div className="air-quality-bar">
            <h1>{selectedUrbanArea}</h1>

            



        </div>
    );
};

export default AirQualityBar;