import Searchbar from './Components/Searchbar';
import { useState, useEffect } from 'react';
import './App.css';
import Grid2 from '@mui/material/Unstable_Grid2/Grid2';
import CityCard from './Components/CityCard';


function App() {

  const [selectedUrbanArea, setSelectedUrbanArea] = useState("");
  const [urbanDetails, setUrbanDetails] = useState([]);
  const [urbanScores, setUrbanScores] = useState([]);

  const scoreNameIndex = { "Housing": 0, "Cost of Living": 1, "Startups": 2, "Venture Capital": 3, "Travel Connectivity": 4, "Commute": 5, "Business Freedom": 6, "Safety": 7, "Healthcare": 8, "Education": 9, "Environmental Quality": 10, "Economy": 11, "Taxation": 12, "Internet Access": 13, "Leisure & Culture": 14, "Tolerance": 15, "Outdoors": 16 };


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
      console.log(data)
      setUrbanScores(data); // Note: urbanScores isn't structured like urbanDetails. To access the same structure, do urbanScores.categories
    };
    fetchDetailData();
    fetchScoreData();
  }, [selectedUrbanArea]);


  // urbanScore details are broken. Need to be able to access the data in the array
  return (
    <div className="App">
      <Searchbar
        selectedUrbanArea={selectedUrbanArea}
        setSelectedUrbanArea={setSelectedUrbanArea}
      />
      <div className='mainWindow'>
        <div dangerouslySetInnerHTML={{ __html: urbanScores.summary }} /* Displays the City Summary, might want to change*/ />

        <Grid2 container spacing={2} className="BrowseCards">
          {
            urbanDetails && urbanScores ? //This ternary operator is used to check if the data has been loaded before trying to render it
              urbanDetails.map((urbanDetail) => ( //This is the map function that iterates through the data and renders the cards, each card is passed on category of city data, and the corresponding score
                <Grid2 xs={12} sm={6} md={4} lg={3}> 
                  <CityCard 
                    urbanDetail={urbanDetail} 
                    urbanScore={urbanScores.categories ? urbanScores.categories[scoreNameIndex[urbanDetail.label]] : undefined} 
                    
                  />
                </Grid2>
              ))
              : null
          }
        </Grid2>


      </div>

    </div>
  );
}

export default App;
