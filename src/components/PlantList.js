import React from "react";
import PlantCard from "./PlantCard";

function PlantList({ plants, updatePlant, deletePlant }) {

  //can do this directly in JSX
  const plantMap = [...plants].map(el => {
    return <PlantCard plant={el} key={el.id} updatePlant={updatePlant} deletePlant={deletePlant} />
  })

  return (
    <ul className="cards">
      { plantMap }
    </ul>
  );
}

export default PlantList;
