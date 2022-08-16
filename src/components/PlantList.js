import React from "react";
import PlantCard from "./PlantCard";

function PlantList({ allPlants }) {
  return (
    <ul className="cards">
      {
        allPlants.map(el => <PlantCard key={el.id} plant={el} />)
      }
    </ul>
  );
}

export default PlantList;
