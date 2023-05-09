import { useState, useEffect } from "react";
import NewPlantForm from "./NewPlantForm";
import PlantList from "./PlantList";
import Search from "./Search";

/*
DELIVERABLE #1:
1. make fetch request to get all plants (with useEffect)
2. save request data in state
3. pass state data down to PlantList
4. map over data in PlantList to create individual card for each plant
5. in PlantCard fill out fields with appropriate data
*/

/*
DELIVERABLE #2:
1. make form controlled
2. on form submit make post request
3. pass new form up to PlantPage
4. add new plant to PlantPage's plants state
*/

/*
DELIVERABLE #3:
1. create state to toggle between true/false
2. add onClick event TO BOTH BUTTONS
3. update ternary in JSX
*/

/*
DELIVERABLE #4: 
1. create search state in PlantPage.js
2. use inverse flow to update search state from Search.js
3. create filtered plant list in PlantPage.js
4. pass down filtered plant list to PlantList.js to be displayed
*/

/*
DELIVERABLE #5:
1. create controlled form in PlantCard (one per each plant)
2. onSubmit make PATCH request
3. pass PATCH data up to PlantPage
4. update plants state (in PlantPage) 
*/

/*
DELIVERABLE #6:
1. create onClick event in delete button
2. make DELETE request onClick
3. pass id up to PlantPage
4. filter out plant with corresponding id from state
*/

// event listener -> fetch request -> update state 

function PlantPage() {
  //TypeError: plants is not iterable, if initial state is not array
  const [plants, setPlants] = useState([])
  const [search, setSearch] = useState('')


  useEffect(() => {
    getPlants() 
  }, []) //[ ] will cause useEffect to run once on component mount 

  function getPlants() {
    fetch('http://localhost:6001/plants')
    .then(res => res.json())
    .then(data => setPlants(data))
  }

  function addPlant(plant){
    setPlants([...plants, plant])
  }

  function updatePlant(updatedPlant){
    //replacing something
    setPlants([...plants].map(curPlant => {
      //return curPlant.id === updatedPlant.id ? updatedPlant : curPlant

      if(updatedPlant.id === curPlant.id) {
        return {...curPlant, price: updatedPlant.price}
      } else {
        return curPlant
      }

    }))
  }

  function deletePlant(id) {
    //remove something
    setPlants([...plants].filter(curPlant => {
      //return curPlant.id !== id

      if(curPlant.id === id){
        return false //remove from array
      } else {
        return true
      }
    }))
  }

  //pass down to Search.js as onChange event
  function updateSearch(newSearch){
    setSearch(newSearch)
    //we don't set plant state here based on search
    //because we still need all plants available to us
  }

  const filteredPlants = [...plants].filter(el => {
    //.toLowerCase makes this not case specific
    return el.name.toLowerCase().includes(search.toLowerCase())
  })

  return (
    <main>
      <NewPlantForm addPlant={addPlant} />
      <Search updateSearch={updateSearch} search={search} />
      {/* pass down filtered plants to be displayed not all plants */}
      <PlantList plants={filteredPlants} updatePlant={updatePlant} deletePlant={deletePlant} />
    </main>
  );
}

export default PlantPage;
