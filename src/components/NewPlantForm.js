import { useState } from "react";

//1. form state
//2. align values with state
//3. onChange
function NewPlantForm({ addPlant }) {
	const [form, setForm] = useState({
		image: "",
		name: "",
		price: 0,
	});

	const handleChange = (e) => {
		setForm({
			...form, //destructure current state
			[e.target.name]: e.target.value,
		});
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		fetch("http://localhost:6001/plants", {
			method: "POST",
			headers: { "content-type": "application/json" },
			body: JSON.stringify({ ...form, price: parseInt(form.price) }),
		})
      .then(res => {
        if(res.ok){
          return res.json()
        } else {
          throw Error('post went wrong')
        }
      })
      .then(data => addPlant(data))
      .catch(err => console.log('couldnt reach server'))
	};

	return (
		<div className="new-plant-form">
			<h2>New Plant</h2>
			<form onSubmit={(e) => handleSubmit(e)}>
				<input
					onChange={(e) => handleChange(e)}
					value={form.name}
					type="text"
					name="name"
					placeholder="Plant name"
				/>
				<input
					onChange={(e) => handleChange(e)}
					value={form.image}
					type="text"
					name="image"
					placeholder="Image URL"
				/>
				<input
					onChange={(e) => handleChange(e)}
					value={form.price}
					type="number"
					name="price"
					step="0.01"
					placeholder="Price"
				/>
				<button type="submit">Add Plant</button>
			</form>
		</div>
	);
}

export default NewPlantForm;
