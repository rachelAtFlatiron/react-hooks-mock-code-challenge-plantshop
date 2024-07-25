import { useState } from "react";
import PlantCard from "./PlantCard";

function PlantList({ plants, updatePlant, deletePlant }) {

  return (
    <ul className="cards">
      {
        plants.map(curPlant => {return <PlantCard key={curPlant.id} plant={curPlant} updatePlant={updatePlant} deletePlant={deletePlant} />})
      }
    </ul>
  );
}

export default PlantList;
