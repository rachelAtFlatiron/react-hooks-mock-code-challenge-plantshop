import React, { useEffect, useState } from "react";
import NewPlantForm from "./NewPlantForm";
import PlantList from "./PlantList";
import Search from "./Search";

function PlantPage() {
	const [plants, setPlants] = useState([]);
  const [search, setSearch] = useState('')

	useEffect(() => {
		fetch("http://localhost:6001/plants")
			.then((res) => {
				if (res.ok) {
					return res.json();
				} else {
					throw Error("get went wrong");
				}
			})
			.then((data) => setPlants(data))
			.catch((err) => console.error("couldnt reach server"));
	}, []);

  const addPlant = (newPlant) => {
    setPlants([...plants, newPlant])
  }

  const deletePlant = (id) => {
    setPlants(plants.filter(curPlant => curPlant.id !== id))
  }

  const updatePlant = (updatedPlant) => {
    setPlants(plants.map(curPlant => {
      if(curPlant.id === updatedPlant.id){
        return updatedPlant 
      } else {
        return curPlant
      }
    }))
  }

  const updateSearch = (newSearch) => {
    setSearch(newSearch)
  }

  const filteredPlants = plants.filter(curPlant => {
    return (curPlant.name.toLowerCase().includes(search.toLowerCase()))
  })

	return (
		<main>
			<NewPlantForm addPlant={addPlant} />
			<Search search={search} updateSearch={updateSearch} />
			<PlantList deletePlant={deletePlant} plants={filteredPlants} updatePlant={updatePlant} />
		</main>
	);
}

export default PlantPage;
