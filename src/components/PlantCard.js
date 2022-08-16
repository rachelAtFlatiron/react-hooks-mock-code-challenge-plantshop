import React, { useState } from "react";

function PlantCard({ plant, handleDelete }) {
  const [ inStock, setInStock ] = useState(true)
  const [ formPrice, setFormPrice ] = useState(plant.price)
  const [ displayPrice, setDisplayPrice ] = useState(plant.price)
  const url = "http://localhost:6001/plants"

  //toggles 'in stock' and 'out of stock'
  const handleClick = function(){
    setInStock(inStock => !inStock)
  }

  const handlePriceChange = function(e){
    setFormPrice(e.target.value)
  }

  const handlePriceSubmit = async function(e){
    e.preventDefault();
    let options = {
      method: 'PATCH',
      body: JSON.stringify({ price: formPrice }),
      headers: { 'Content-Type': 'application/json '}
    }
    let res = await fetch(`${url}/${plant.id}`, options)
    let data = await res.json()
    setDisplayPrice(data.price)
  }

  return (
    <li className="card">
      <img src={plant.image} alt={plant.name} />
      <h4>{plant.name}</h4>
      <p>Price: {displayPrice}</p>
      <form onSubmit={handlePriceSubmit}>
        <input onChange={handlePriceChange} type="number" name="price" value={formPrice} />
        <button type="submit">Update Price</button>
      </form>
      {/* keep in mind you have to put onclick on both buttons */}
      {inStock ? (
        <button onClick={handleClick} className="primary">In Stock</button>
      ) : (
        <button onClick={handleClick} >Out of Stock</button>
      )}
      <button onClick={() => handleDelete(plant.id)} >Delete</button>
    </li>
  );
}

export default PlantCard;
