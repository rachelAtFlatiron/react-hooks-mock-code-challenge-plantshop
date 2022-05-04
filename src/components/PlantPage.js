import React, { useState, useEffect } from "react";
import NewPlantForm from "./NewPlantForm";
import PlantList from "./PlantList";
import Search from "./Search";

function PlantPage({ plants, addPlant, deletePlant }) {
  const [filter, setFilter] = useState("")
  //state to save what plants to be displayed
  //this is the list of plants affected by filter
  //we still want to save entire list of plants from fetch
  const [visiblePlants, setVisiblePlants] = useState(plants)

  useEffect(() => {
    let updatePlants = plants.filter((el) => {
      if(filter === ""){
        return true
      }
      return (el.name.toLowerCase() === filter)
    })
    setVisiblePlants(updatePlants);
  //when filter gets change we want to update visible plants
  /*if plants gets changed (i.e. when something is deleted or added)
    we want to update visible plants so we must call use effect
  */
  }, [filter, plants]) 

  //set search term...passed to Search.js
  function filterPlants(searchTerm) {
    setFilter(searchTerm);
  }
  
  return (
    <main>
      <NewPlantForm addPlant={addPlant} filter={filter} />
      <Search filterPlants={filterPlants} />
      <PlantList plants={plants} deletePlant={deletePlant} visiblePlants={visiblePlants} />
    </main>
  );
}

export default PlantPage;
