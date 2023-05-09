import { useState } from "react";

/* CONTROLLED FORM
  1. create state for form
  2. set value of inputs to state
  3. onChange update state
*/

function NewPlantForm({ addPlant }) {
  const initialForm = {
    name: '',
    image: '',
    price: 0
  }

  const [form, setForm] = useState(initialForm)

  //check in inspect if relying on state instead of native DOM events 
  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    //POST
    fetch('http://localhost:6001/plants', {
      method: 'POST',
      body: JSON.stringify({...form}),
      headers: {
        'content-type': 'application/json'
      }
    })
    .then(res => res.json())
    .then(data => { //data will come back as new plant info
      addPlant(data)
      //clears form on successful submit
      setForm(initialForm)
    })
  }

  return (
    <div className="new-plant-form">
      <h2>New Plant</h2>
      <form onSubmit={e => handleSubmit(e)}>
        <input onChange={e => handleChange(e)} value={form.name} type="text" name="name" placeholder="Plant name" />
        <input onChange={e => handleChange(e)} value={form.image} type="text" name="image" placeholder="Image URL" />
        <input onChange={e => handleChange(e)} value={form.price} type="number" name="price" step="0.01" placeholder="Price" />
        <button type="submit">Add Plant</button>
      </form>
    </div>
  );
}

export default NewPlantForm;
