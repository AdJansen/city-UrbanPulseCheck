import Searchbar from './Components/Searchbar';
import { useState, useEffect } from 'react';
import './App.css';
import Grid2 from '@mui/material/Unstable_Grid2/Grid2';
import Card from '@mui/material/Card';
import { CardHeader } from '@mui/material';


function App() {

  const [selectedUrbanArea, setSelectedUrbanArea] = useState("");
  const [urbanDetails, setUrbanDetails] = useState([]);
  const [urbanScores, setUrbanScores] = useState([]);

  const scoreNameIndex = {"Housing":0, "Cost of Living":1, "Startups":2, "Venture Capital":3, "Travel Connectivity":4, "Commute":5, "Business Freedom":6, "Safety":7, "Healthcare":8, "Education":9, "Environmental Quality":10, "Economy":11, "Taxation":12, "Internet Access":13, "Leisure & Culture":14, "Tolerance":15, "Outdoors":16};

  useEffect(() => {
    const fetchDetailData = async () => {
      const response = await fetch(`https://api.teleport.org/api/urban_areas/slug:${selectedUrbanArea.toLowerCase().replace(/[\s,]+/g, '-')}/details/`);
      const data = await response.json();
      console.log("Detail Data")
      console.log(data.categories)
      setUrbanDetails(data.categories);

    };
    const fetchScoreData = async () => {
      const response = await fetch(`https://api.teleport.org/api/urban_areas/slug:${selectedUrbanArea.toLowerCase().replace(/[\s,]+/g, '-')}/scores/`);
      const data = await response.json();
      console.log("Score Data")
      console.log(data.categories)
      setUrbanScores(data.categories);
    };
    fetchDetailData();
    fetchScoreData();
  }, [selectedUrbanArea]);



  return (
    <div className="App">
      <Searchbar
        selectedUrbanArea={selectedUrbanArea}
        setSelectedUrbanArea={setSelectedUrbanArea}
      />
      <div className='mainWindow'>
        <Grid2 container spacing={2} className="BrowseCards">
          {
            urbanDetails.map((urbanDetail) => (
              
              <Grid2 xs={12} sm={6} md={4} lg={3} key={urbanDetail.label}>
                <Card variant="outlined">
                  
                  <CardHeader title={urbanDetail.label} subheader={urbanScores[scoreNameIndex[urbanDetail.label]].name}/>
                </Card>
              </Grid2>
            ))
          }
        </Grid2>


      </div>

    </div>
  );
}

export default App;
