import {useState} from "react";

//toggle stock will change over time so we need state
function PlantCard({ plant, updatePlant, deletePlant }) {

  const [stock, setStock] = useState(true)
  const [price, setPrice] = useState(plant.price)

  const handleClick = () => {
    setStock(prev => !prev)
  }

  const handleChange = (e) => {
    setPrice(parseFloat(e.target.value))
    fetch(`http://localhost:6001/plants/${plant.id}`, {
      method: 'PATCH',
      headers: {'content-type': 'application/json'},
      body: JSON.stringify({
        price: parseFloat(e.target.value)
      })
    })
    .then(res => {
      if(res.ok){
        return res.json()
      } else {
        throw Error('patch went wrong')
      }
    })
    .then(data => {
      updatePlant(data)
    })
  }

  const handleDelete = () => {
    console.log('delete')
    fetch(`http://localhost:6001/plants/${plant.id}`, {
      method: 'DELETE'
    })
      .then(res => {
        if(res.ok){
          deletePlant(plant.id)
        } else {
          throw Error('delete went wrong')
        }
      })
      .catch(err => console.error('couldnt reach server'))
  }

  return (
    <li className="card">
      <img src={plant.image} alt={plant.name} />
      <h4>{plant.name}</h4>
      <input onChange={e => handleChange(e)} value={price} type="number" step="0.01" />
      {stock ? (
        <button onClick={handleClick} className="primary">In Stock</button>
      ) : (
        <button onClick={handleClick}>Out of Stock</button>
      )}
      <button onClick={handleDelete}>Delete</button>
    </li>
  );
}

export default PlantCard;
