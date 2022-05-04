import React, { useState, useEffect } from "react";
import Header from "./Header";
import PlantPage from "./PlantPage";

/*
NOTE - 
"npm start" automatically starts on localhost:3000
"npm run server" automatically start on localhost:6001/table-name
DO NOT use json-server --watch
*/
function App() {

  const [plants, setPlants] = useState([])

  //on first page load populate plants state with fetch request
  useEffect(() => {
    fetch('http://localhost:6001/plants')
    .then(res => res.json())
    .then(data => setPlants(data))
    .catch(err => console.log(err))
  }, []) //empty dependency so useEffect runs ONLY ONCE on initial load

  //POST request...passed down to PlantPage > NewPlantForm
  function addPlant(plant) {
    fetch('http://localhost:6001/plants', {
      method: 'POST', 
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(plant)
    })
    .then(res => res.json())
    //setPlants with destructuring and adding response's data entry
    //affecting state instead of doing another GET request takes up less time
    //fetching from servers can potentially make your site slow
    .then(data => setPlants([...plants, data])) 
    .catch(err => console.log(err));
  }

  //DELETE request...passed down to PlantPage > PlantList > PlantCard
  function deletePlant(plant) {
    console.log(plant.id);
    fetch(`http://localhost:6001/plants/${plant.id}`, {
      method: 'DELETE', 
    })
    .then(res => res.json())
    //take the returned deleted item and filter out of plants state
    //affecting state instead of doing another GET request takes up less time
    //fetching from servers can potentially make your site slow
    .then(data => setPlants((plants) => {
      return plants.filter((el) => {
        return el.id !== plant.id
      })
    }))
    .catch(err => console.log(err));
  }

  return (
    <div className="app">
      <Header />
      <PlantPage deletePlant={deletePlant} addPlant={addPlant} plants={plants} />
    </div>
  );
}

export default App;
