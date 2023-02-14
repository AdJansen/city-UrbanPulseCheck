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
import { minHeight } from '@mui/system';
import Paper from '@mui/material/Paper';

const AirQualityBar = ({ selectedUrbanArea, urbanScore}) => {
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
            return ["#FFA500", "Unpleasant"]; //orange
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
    if (city) {
        return (
            <div className="air-quality-bar">
                
                
                <Grid className="air-bar" container sx={{ backgroundColor: 'white', alignItems: 'center', fontSize: '1.5rem', borderRadius: 3, display: "inline-flex", justifyContent: 'center' }} rowSpacing={0} columnSpacing={8} >
                    <Grid item sm={12} md={4} className="city-name" sx={{ color: 'black', padding: 0 }}>
                        <h1> {selectedUrbanArea}</h1>
                    </Grid>

                    <Grid item sm={12} md={4} sx={{ paddingTop: 0 }}>
                        <Card className="air-quality-card" sx={{ }}>

                            <CardActionArea href={AQInfo}>
                                <CardContent>
                                    <Grid container sx={{ justifyContent: "center" }}>
                                        <Grid container sx={{ alignItems: 'center', justifyContent: "center",padding: 0 }}>
                                            <Grid item sx={{ paddingRight: 3, justifyContent: "center"}}>
                                                <Typography sx={{ fontSize: "1.3rem" }} gutterBottom>
                                                    Air Quality
                                                </Typography>
                                                <Typography sx={{ fontSize: '1.5rem' }} color={airColor(aqi)[0]} component="div">
                                                    {aqi}
                                                </Typography>
                                            </Grid>
                                            <Grid item>
                                                <Typography sx={{ fontSize: '1.3rem' }}>
                                                    {airColor(aqi)[1]}
                                                </Typography>
                                            </Grid>


                                        </Grid>

                                    </Grid>

                                </CardContent>
                            </CardActionArea>
                        </Card>
                    </Grid>


                    <Grid item sm={12} md={4} className="weather-grid" >
                        <Card className="weather-card" sx={{ }}>
                            <CardActionArea href={weatherInfo}>
                                <CardContent>
                                    <Grid item className="inner-weather-grid" container sx={{ alignItems: 'center', justifyContent: "center" }}>

                                        <Grid container sx={{ alignItems: 'center', justifyContent: "center", padding: 0 }}>
                                            <Grid item sx={{ justifyContent: "center" }}>
                                                <Typography sx={{ fontSize: "1.2rem", margin: 0, paddingRight: 1 }} gutterBottom>
                                                    Weather
                                                </Typography>
                                            </Grid>
                                            <Grid item sx={{ justifyContent: "center" }}>
                                                <Typography sx={{ fontSize: "1.2rem" }} component="div">
                                                    {(weatherData.current && weatherData.error == null) ? weatherData.current.temp_c : wuhwuh}
                                                    °C
                                                </Typography>

                                            </Grid>

                                        </Grid>

                                        <Grid container sx={{ alignItems: 'center', justifyContent: "center" }}>
                                            <Grid item sx={{ justifyContent: "center" }}>
                                                <Icon sx={{ fontSize: 64 }}>
                                                    <img src={(weatherData.current && weatherData.error == null) ? weatherData.current.condition.icon : null} />
                                                </Icon>
                                            </Grid>

                                            <Grid item sx={{ justifyContent: "center" }}>
                                                <Typography sx={{ fontSize: "1.2rem" }}>
                                                    {(weatherData.current && weatherData.error == null) ? weatherData.current.condition.text : wuhwuh}
                                                </Typography>

                                            </Grid>
                                        </Grid>
                                    </Grid>



                                </CardContent>
                            </CardActionArea>
                        </Card>
                    </Grid>
                </Grid>
            </div>
        );
    } else {
        return <h1>Choose a city to see the air quality and weather</h1>;

    }
};

export default AirQualityBar;