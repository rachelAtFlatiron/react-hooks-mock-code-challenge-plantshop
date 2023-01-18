import React, { useState } from "react";

function NewPlantForm({ addNewPlant }) {

  const plantOutline = {
    name: '',
    image: '',
    price: 0
  }

  const [plantData, setPlantData] = useState(plantOutline)

  //passes new plant to plantPage
  const handleSubmit = (e) => {
    e.preventDefault()
    addNewPlant(plantData)
    setPlantData(plantOutline) //reset form
  }

  //controlled form 
  const handleChange = (e) => {
    setPlantData(prev => ({
      ...prev, [e.target.name]: e.target.value
    }))
  }

  return (
    <div className="new-plant-form">
      <h2>New Plant</h2>
      <form onSubmit={handleSubmit}>
        <input type="text" name="name" onChange={handleChange} value={plantData.name} placeholder="Plant name" />
        <input type="text" name="image" onChange={handleChange} value={plantData.image} placeholder="Image URL" />
        <input type="number" name="price" onChange={handleChange} step="0.01" value={plantData.price}  placeholder="Price" />
        <button type="submit">Add Plant</button>
      </form>
    </div>
  );
}

export default NewPlantForm;
