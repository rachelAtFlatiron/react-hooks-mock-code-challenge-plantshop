import React from "react";

function PlantCard() {
  return (
    <li className="card">
      <img src={"https://via.placeholder.com/400"} alt={"plant name"} />
      <h4>{"plant name"}</h4>
      <p>Price: {"plant price"}</p>
      <input type="number" step="0.01" name="price" placeholder="new price" />
      {true ? (
        <button className="primary">In Stock</button>
      ) : (
        <button>Out of Stock</button>
      )}
      <button style={{background: "red", color: "white"}}>Delete Plant</button>
    </li>
  );
}

export default PlantCard;
