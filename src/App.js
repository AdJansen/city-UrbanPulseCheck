import Searchbar from './Components/Searchbar';
import { useState, useEffect } from 'react';
import './App.css';


function App() {

  const [selectedUrbanArea, setSelectedUrbanArea] = useState("");
  const [urbanDetails, setUrbanDetails] = useState([]);
  const [urbanScores, setUrbanScores] = useState([]);

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
        {urbanDetails.map((urbanDetail) => (
          <div className='urbanDetail'>
            <h1>{urbanDetail.label}</h1>
          </div>)
        )}
        
          
      </div>

    </div>
  );
}

export default App;
