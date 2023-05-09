import { useState } from "react";

function PlantCard({ plant, updatePlant, deletePlant }) {
  const [ priceForm, setPriceForm ] = useState(plant.price)
  const [ inStock, setInStock ] = useState(true)

  function toggleButton(){
    setInStock(prev => !prev)
  }

  const handleChange = (e) => {
    setPriceForm(e.target.value)
  }

  //PATCH
  const handleSubmit = (e) => {
    e.preventDefault()
    fetch(`http://localhost:6001/plants/${plant.id}`, {
      method: 'PATCH',
      body: JSON.stringify({price: parseInt(priceForm)}),
      headers: {
        'content-type': 'application/json'
      }
    })
    .then(res => res.json())
    .then(data => {
      //update plants alllll the way up in PlantPage.js
      updatePlant(data)
    })
  }

  //DELETE
  const handleDelete = () => {
    fetch(`http://localhost:6001/plants/${plant.id}`, {
      method: 'DELETE'
    })
    .then(res => res.json())
    .then(() => {
      deletePlant(plant.id)
    })
  }

  return (
    <li className="card">
      <img src={plant.image} alt={plant.name} />
      <h4>{plant.name}</h4>
      <p>Price: {plant.price}</p>

      {inStock ? (
        <button onClick={() => toggleButton()} className="primary">In Stock</button>
      ) : (
        <button onClick={() => toggleButton()}>Out of Stock</button>
      )}


      {/* extra deliverables */}
      <form onSubmit={e => handleSubmit(e)}>
        <input onChange={e => handleChange(e)} value={priceForm} type="number" step="0.01" name="price" placeholder="new price" />
        <input type="submit" value="Submit" />
      </form>
     
      <button onClick={() => handleDelete()} style={{background: "red", color: "white"}}>Delete Plant</button>
       {/* extra deliverables */}
    </li>
  );
}

export default PlantCard;
