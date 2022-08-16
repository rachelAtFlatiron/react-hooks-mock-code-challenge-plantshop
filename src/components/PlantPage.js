import React, { useEffect, useState } from "react";
import NewPlantForm from "./NewPlantForm";
import PlantList from "./PlantList";
import Search from "./Search";

function PlantPage() {
  //note setting the initial state to empty array NOT null
  const [plants, setPlants] = useState([])
  const [formPlant, setFormPlant] = useState({name: '', image: '', price: ''})
  const [search, setSearch] = useState('')
  const url = "http://localhost:6001/plants"
  
  //get all plants from db
  const getPlants = async function(){
    let res = await fetch(url);
    let data = await res.json();
    setPlants(data)
  }

  //add plant to db on form submit
  const addPlant = async function(e){
    e.preventDefault()
    let options = {
      method: 'POST',
      body: JSON.stringify(formPlant),
      headers: {
        'Content-Type': 'application/json'
      }
    }
    let res = await fetch(url, options)
    let data = await res.json()
    //reset form
    setFormPlant({name: '', image: '', price: ''})
    setPlants(plants => [...plants, data])
  }

  //update new plant state on form change
  const updateNewPlant = function(e){
    let temp = {...formPlant} //NOTE THE DECONSTRUCTION
    temp[e.target.name] = e.target.value
    setFormPlant(temp);
  }

  //update search and found/displayed plants
  const updateSearch = function(e){
    setSearch(e.target.value)
  }

  useEffect(() => getPlants(), [])
  const displayedPlants = plants.filter(el => el.name.toLowerCase().includes(search.toLowerCase()))

  return (
    <main>
      <NewPlantForm formPlant={formPlant} handleChange={updateNewPlant} handleSubmit={addPlant} />
      <Search handleChange={updateSearch} search={search} />
      <PlantList allPlants={displayedPlants}/>
    </main>
  );
}

export default PlantPage;
