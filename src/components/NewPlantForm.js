import React from "react";

function NewPlantForm({ handleChange, handleSubmit, formPlant }) {
  return (
    <div className="new-plant-form">
      <h2>New Plant</h2>
      {/* react prefers putting onChange on individual inputs */}
      <form onSubmit={handleSubmit}>
        <input onChange={handleChange} type="text" name="name" placeholder="Plant name" value={formPlant.name}/>
        <input onChange={handleChange} type="text" name="image" placeholder="Image URL" value={formPlant.image} />
        <input onChange={handleChange} type="number" name="price" step="0.01" placeholder="Price" value={formPlant.price} />
        <button type="submit">Add Plant</button>
      </form>
    </div>
  );
}

export default NewPlantForm;
