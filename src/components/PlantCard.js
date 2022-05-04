import React, { useState } from "react";

function PlantCard({ plant, deletePlant }) {
  const [stock, setStock] = useState(true)

  function handleStockClick(e) {
    setStock((stock) => !stock)
  }

  return (
    <li className="card">
      <img src={plant.image} alt={plant.name} />
      <h4>{plant.name}</h4>
      <p>Price: {plant.price}</p>
      {stock ? (
        <button onClick={handleStockClick} className="primary">In Stock</button>
      ) : (
        <button onClick={handleStockClick}>Out of Stock</button>
      )}
      {/* I created a new button to use for delete */}
      <button onClick={() => deletePlant(plant)} className="secondary">Delete</button>
    </li>
  );
}

export default PlantCard;
