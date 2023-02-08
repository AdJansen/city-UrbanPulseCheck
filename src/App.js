import Searchbar from './Components/Searchbar';
import { useState, useEffect } from 'react';
import './App.css';


function App() {

  const [selectedUrbanArea, setSelectedUrbanArea] = useState("");
  const [urbanDetails, setUrbanDetails] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(`https://api.teleport.org/api/urban_areas/slug:${selectedUrbanArea.toLocaleLowerCase()}/details/`);
      const data = await response.json();
      console.log(data.categories)
      setUrbanDetails(data.categories); 
    };
    console.log("UseEffect Urban");
    fetchData();
  }, [selectedUrbanArea]);
  return (
    <div className="App">
      <Searchbar
        selectedUrbanArea={selectedUrbanArea} 
        setSelectedUrbanArea={setSelectedUrbanArea}
      />
      <div className='mainWindow'>
        {selectedUrbanArea}
      </div>

    </div>
  );
}

export default App;
