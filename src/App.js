import Searchbar from './Components/Searchbar';
import CityCard from './Components/CityCard';
import './App.css';
import UrbanAreas from './Components/DropDown';

function App() {
  

  return (
    <div className="App">
      <Searchbar />
      <div className='mainWindow'>
        {/* <Grid2 container spacing={2} className="BrowseCards" >
          

        </Grid2> */}
        <UrbanAreas/>
      </div>

    </div>
  );
}

export default App;
