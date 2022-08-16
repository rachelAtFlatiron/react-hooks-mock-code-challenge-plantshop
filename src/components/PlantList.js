import React from "react";
import PlantCard from "./PlantCard";

function PlantList({ allPlants, handleDelete }) {
  return (
    <ul className="cards">
      {
        allPlants.map(el => <PlantCard handleDelete={handleDelete} key={el.id} plant={el} />)
      }
    </ul>
  );
}

export default PlantList;
