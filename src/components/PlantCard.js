import React, { useState } from "react";

function PlantCard({ plant }) {
  const [ inStock, setInStock ] = useState(true)

  const handleClick = function(){
    setInStock(inStock => !inStock)
  }
  return (
    <li className="card">
      <img src={plant.image} alt={plant.name} />
      <h4>{plant.name}</h4>
      <p>Price: {plant.price}</p>
      {/* keep in mind you have to put onclick on both buttons */}
      {inStock ? (
        <button onClick={handleClick} className="primary">In Stock</button>
      ) : (
        <button onClick={handleClick} >Out of Stock</button>
      )}
    </li>
  );
}

export default PlantCard;
