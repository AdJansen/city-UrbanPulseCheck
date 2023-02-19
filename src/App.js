import Grid from '@mui/material/Grid';
import { useState, useEffect } from 'react';
import CityCard from './Components/CityCard';
import AirQualityBar from './Components/AirQualityBar';
import Searchbar from './Components/Searchbar';
import './App.css';


function App() { 

  // Overall, at least 50% of the code in this project has been written by the team members. The rest of the code is either from MUI (taken and adapted from their public docs), or written with help from chatGPT/githubCopilot
  /* Installing the various MUI components is required to run this code, Testing is done witth Jest and React Testing Library,
     although some test pacakges were installed during the development process and are not required to run the code */
    

  // selectedUrbanArea is the city that the user selects from the searchbar
  const [selectedUrbanArea, setSelectedUrbanArea] = useState("");
  // urbanDetails is an array of objects that holds the data for the CityCard component
  const [urbanDetails, setUrbanDetails] = useState([]);
  // urbanScores is an array of objects that holds the data for the CityCard component - Note that it is structured differently than urbanDetails
  const [urbanScores, setUrbanScores] = useState([]);
  // scoreNameIndex is used to access the correct score from urbanScores, since urbanScores is not structured like urbanDetails
  const scoreNameIndex = { "Housing": 0, "Cost of Living": 1, "Startups": 2, "Venture Capital": 3, "Travel Connectivity": 4, "Commute": 5, "Business Freedom": 6, "Safety": 7, "Healthcare": 8, "Education": 9, "Environmental Quality": 10, "Economy": 11, "Taxation": 12, "Internet Access": 13, "Leisure & Culture": 14, "Tolerance": 15, "Outdoors": 16 };

  // Fetches data from the API when the selectedUrbanArea changes (when the user selects a city from the searchbar) and sets the urbanDetails and urbanScores states
  useEffect(() => {
    const fetchDetailData = async () => { // This function fetches the data from the API and sets the urbanDetails state
      const response = await fetch(`https://api.teleport.org/api/urban_areas/slug:${selectedUrbanArea.toLowerCase().replace(/[\s,]+/g, '-')}/details/`);
      const data = await response.json();
      console.log("Detail Data")
      console.log(data.categories)
      setUrbanDetails(data.categories);

    }; 
    const fetchScoreData = async () => { // This function fetches the data from the API and sets the urbanScores state
      const response = await fetch(`https://api.teleport.org/api/urban_areas/slug:${selectedUrbanArea.toLowerCase().replace(/[\s,]+/g, '-')}/scores/`);
      const data = await response.json();
      console.log("Score Data")
      console.log(data)
      setUrbanScores(data); // Note: urbanScores isn't structured like urbanDetails. To access the same structure, do urbanScores.categories
    };
    selectedUrbanArea ? fetchDetailData() : setUrbanDetails([]);
    selectedUrbanArea ? fetchScoreData() : setUrbanScores([]);
  }, [selectedUrbanArea]);


  
  return (
    <div className="App" data-testid="app-component">
      <Searchbar //This is the searchbar component that makes up the top banner of the screen
        selectedUrbanArea={selectedUrbanArea}
        setSelectedUrbanArea={setSelectedUrbanArea}
        TestId="searchbar-component"
      /> 
      <div className='mainWindow'>
      
        <AirQualityBar selectedUrbanArea={selectedUrbanArea} urbanScore={urbanScores}/>

        <div dangerouslySetInnerHTML={{ __html: urbanScores.summary }} /* Displays the City Summary, The InnerHTML is unfortunately required due to some emphasis tags coming from the API*/ />

        <Grid container spacing={1} className="BrowseCards">
          {
            urbanDetails && urbanScores ? //This ternary operator is used to check if the data has been loaded before trying to render it
              urbanDetails.map((urbanDetail) => ( //This is the map function that iterates through the data and renders the cards, each card is passed on category of city data, and the corresponding score
                <Grid item xs={12} sm={12} md={6} lg={4}> 
                  <CityCard 
                    urbanDetail={urbanDetail} 
                    urbanScore={urbanScores.categories ? urbanScores.categories[scoreNameIndex[urbanDetail.label]] : undefined} 
                    key={urbanDetail.label}
                    data-testid="citycard-component"
                  />
                </Grid>
              ))
              : null
          }
        </Grid>


      </div>

    </div>
  );
}

export default App;
