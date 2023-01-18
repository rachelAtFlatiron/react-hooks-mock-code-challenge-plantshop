import React, { useEffect, useState } from "react";
import NewPlantForm from "./NewPlantForm";
import PlantList from "./PlantList";
import Search from "./Search";

function PlantPage() {

  const url = "http://localhost:6001/plants"
  const [plants, setPlants] = useState([])
  const [filteredPlants, setFilteredPlants] = useState([])
  const [search, setSearch] = useState('')

  //GET: useEffect with [] as dependency array so we fetch once
  useEffect(() => {
    fetch(url)
    .then(res => res.json())
    .then(data => {
      setPlants(data)
      setFilteredPlants(data)
    })
  }, [])

  //manage search state
  const handleSetSearch = (newSearch) => {
    setSearch(newSearch)
    updatePlantsToDisplay()
  }

  //use search state to filter plants
  const updatePlantsToDisplay = () => {
    let plantsToShow = plants.filter(plant => {
      //return is implicit when { } are not used
      return plant.name.toLowerCase().includes(search.toLowerCase())
    })
    setFilteredPlants(plantsToShow)
  }

  //POST: takes in form data as new plant
  const addNewPlant = (newPlant) => {
    //post request here
    fetch(url, {
      method: 'POST', 
      headers: {
        'content-type': 'application/json'
      },
      body: JSON.stringify(newPlant)
    })
    .then(res => res.json())
    .then(data => {
      setPlants(previous => [...previous, data])
      setFilteredPlants(previous => [...previous, data])
    })
  }

  //DELETE: delete one plant 
  const deletePlant = (id) => {
    //delete request
    fetch(`${url}/${id}`, {
      method: 'DELETE'
    })
    .then(res => res.json())
    .then(data => {
      //filter creates new array, DOES NOT mutate 
      setPlants(prev => prev.filter(plant => plant.id !== id))
      setFilteredPlants(prev => prev.filter(plant => plant.id !== id))
    })
  }

  return (
    <main>
      <NewPlantForm addNewPlant={addNewPlant} />
      <Search updatePlantsToDisplay={updatePlantsToDisplay} search={search} handleSetSearch={handleSetSearch} />
      <PlantList url={url} plants={ filteredPlants } deletePlant={deletePlant}/>
    </main>
  );
}

export default PlantPage;
