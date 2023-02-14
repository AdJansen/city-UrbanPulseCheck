import React from 'react';
import { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { CardActionArea, Grid } from '@mui/material';
import Icon from '@mui/material/Icon';
import Grid2 from '@mui/material/Unstable_Grid2/Grid2';




const AirQualityBar = ({ selectedUrbanArea }) => {
    const [airData, setAirData] = useState([]);
    const [weatherData, setWeatherData] = useState([]);
    const [AQInfo, setAQInfo] = useState([]);
    const [weatherInfo, setWeatherInfo] = useState();
    const city = selectedUrbanArea;
    const wuhwuh = "N/A";

    useEffect(() => {
        const fetchData = async () => {
            const response = await fetch(`https://api.waqi.info/feed/${city}/?token=f419ebf4321774d187a782c59307d9b30ee056b7`);
            const data = await response.json();
            //console.log("Air Quality Data")
            //console.log(data)    
            setAirData(data);

            const response2 = await fetch(`http://api.weatherapi.com/v1/current.json?key=02636dea6dac4e80bf3152610231302&q=${city}&aqi=no`);
            const data2 = await response2.json();
            setWeatherData(data2);
            //console.log("data2")
            //console.log(data2);

            const response3 = await fetch(`http://api.weatherapi.com/v1/search.json?key=02636dea6dac4e80bf3152610231302&q=${city}`);
            const data3 = await response3.json();
            //console.log("data3")
            //console.log(data3)

            let zone = data3 ? data3[0].url : "ottawa-ontario-canada";
            let id = data3 ? data3[0].id : "316187";

            setAQInfo(`https://aqicn.org/city/${city}/`);
            setWeatherInfo(`https://www.weatherapi.com/weather/q/${zone}-${id}`);

            // const AQInfo = `https://aqicn.org/city/${city}/`;
            // const weatherInfo = `https://www.weatherapi.com/weather/q/${zone}-${id}`;

        };
        if (city) {
            fetchData();
        }
    }, [selectedUrbanArea, city]);

    function airColor(aqiIn) {
        let aqi = parseInt(aqiIn)
        console.log(`aqi: ${aqi}`)
        
        if (aqi < 50) {
            return ["#00FF00", "Good"]; //green
        } else if (aqi < 100) {
            return ["#FFFF00", "Moderate"]; //yellow
        } else if (aqi < 150) {
            return ["#FFA500", "Unhealthy for Sensitive Groups"]; //orange
        } else if (aqi < 200) {
            return ["#FF0000", "Unhealthy"]; //red
        } else if (aqi < 300) {
            return ["#A020F0", "Very Unhealthy"]; //purple
        } else if (aqi > 300) {
            return ["#800000", "Hazardous"]; //maroon
        } else {
            return ["black", null]; //black
        }
    }

    let aqi = (airData.data && airData.status != "error") ? airData.data.aqi : wuhwuh
    return (
        <div className="air-quality-bar">
            <Grid2 container spacing={2}>
                <Grid2>
                    <h1>{selectedUrbanArea}</h1>
                </Grid2>

                <Grid2>
                    <Card className="air-quality-card" sx={{ minWidth: 250 }} color="green">

                        <CardActionArea href={AQInfo}>
                            <CardContent>
                                <Typography sx={{ fontSize: 35 }} gutterBottom>
                                    Air Quality
                                </Typography>
                                <Typography variant="h1" color={airColor(aqi)[0]} component="div">
                                    {aqi}
                                </Typography>
                                <Typography variant='h4'>
                                    {airColor(aqi)[1]}
                                </Typography>
                            </CardContent>
                        </CardActionArea>
                    </Card>
                </Grid2>

                <Grid2>
                    <Card className="weather-card" sx={{ minWidth: 250 }}>
                        <CardActionArea href={weatherInfo}>
                            <CardContent>
                                <Icon sx={{ fontSize: 64 }}>
                                    <img src={(weatherData.current && weatherData.error == null) ? weatherData.current.condition.icon : null} />
                                </Icon>
                                <Typography sx={{ fontSize: 35 }} color="text.primary" gutterBottom>
                                    Weather
                                </Typography>
                                <Typography variant="h1" component="div">
                                    {(weatherData.current && weatherData.error == null) ? weatherData.current.temp_c : wuhwuh}
                                    °C
                                </Typography>
                                <Typography variant='h4'>
                                    {(weatherData.current && weatherData.error == null) ? weatherData.current.condition.text : wuhwuh}
                                </Typography>
                            </CardContent>
                        </CardActionArea>
                    </Card>
                </Grid2>


            </Grid2>

            {/* <h2>Air Quality Index: {(airData.data && airData.status != "error" )? airData.data.aqi : wuhwuh}</h2> */}

        </div>
    );
};

export default AirQualityBar;