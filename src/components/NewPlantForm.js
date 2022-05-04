import React, {useState} from "react";

function NewPlantForm({addPlant}) {
  const [name, setName] = useState("");
  const [image, setImage] = useState("");
  const [price, setPrice] = useState(0);

  //use callback addPlant and pass in info as object
  function handleFormSubmit(e){
    e.preventDefault();
    console.log(name, image, price);
    addPlant({
      name,
      image,
      price
    })
    //reset state...this is the equivalent of form.reset()
    setName('');
    setImage('');
    setPrice(0);
  }

  return (
    <div className="new-plant-form">
      <h2>New Plant</h2>
      <form onSubmit={e => handleFormSubmit(e)}>
        <input type="text" name="name" value={name} onChange={e => setName(e.target.value)} placeholder="Plant name" />
        <input type="text" name="image" value={image} onChange={e => setImage(e.target.value)} placeholder="Image URL" />
        <input type="number" name="price" step="0.01" value={price} onChange={e => setPrice(e.target.value)} placeholder="Price" />
        <button type="submit">Add Plant</button>
      </form>
    </div>
  );
}

export default NewPlantForm;
