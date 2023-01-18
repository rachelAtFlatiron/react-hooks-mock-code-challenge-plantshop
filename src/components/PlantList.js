import React from "react";
import PlantCard from "./PlantCard";

function PlantList({ plants, url, deletePlant }) {
  
  return (
    <ul className="cards">{
      plants.map(plant => <PlantCard url={url} deletePlant={deletePlant} key={plant.id} plant={plant} />)
    }</ul>
  );
}

export default PlantList;
