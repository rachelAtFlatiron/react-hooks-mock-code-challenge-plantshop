import React, { useState } from "react";

function PlantCard({ plant, url, deletePlant }) {


  const [inStock, setInStock] = useState(true)
  const [price, setPrice] = useState(plant.price)
  const [displayPrice, setDisplayPrice] = useState(plant.price)

  const handleClick = () => {
    //do not directly update state
    setInStock(prev => !prev)
  }

  const handleChange = (e) => {
    setPrice(e.target.value)
  }

  //pros of doing patch in top level: access to plant state, reusable in other components
    //organizational purposes 
  //cons of top level: lost in the sauce, passing info around more

  //pros of doing patch here: parent component is less crowded
  //cons of doing patch here: only available here -> can't affect plantpage's plant state

  const handleSubmit = (e) => {
    e.preventDefault()
    fetch(`${url}/${plant.id}`, {
      method: 'PATCH', 
      headers: {
        'content-type': 'application/json'
      }, 
      body: JSON.stringify({ price: `${e.target.price.value}` })
    })
    .then(res => res.json())
    .then(data => {
      setDisplayPrice(data.price)
    })
  }

  const handleDelete = () => {
    deletePlant(plant.id)
    console.log('delete')
  }

  return (
    <li className="card">
      <img src={plant.image} alt={plant.name} />
      <h4>{plant.name}</h4>
      <p>Price: {displayPrice}</p>
      <form onSubmit={handleSubmit}>
        <input onChange={handleChange} type="number" step="0.01" value={price} name="price" />
        <input type="submit" />
      </form>
      {inStock ? (
        <button onClick={handleClick} className="primary">In Stock</button>
      ) : (
        <button onClick={handleClick}>Out of Stock</button>
      )}
      <button onClick={handleDelete}>Delete</button>
    </li>
  );
}

export default PlantCard;
