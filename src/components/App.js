import React, { useState, useEffect } from "react";

import Header from "./Header";
import ToyForm from "./ToyForm";
import ToyContainer from "./ToyContainer";
import { v4 as uuidv4 } from 'uuid';


const BASE_URL = "http://localhost:3001/toys"

function App() {
  const [showForm, setShowForm] = useState(false);
  const [parentToy, setParentToy] = useState([])
  const [formData, setFormData] = useState({
    name: '',
    image: '',
    likes: 0,
    id: ''
  })

  useEffect(() => {
    fetch(BASE_URL)
      .then(r => r.json())
      .then(setParentToy)
  }, [])

  function handleClick() {
    setShowForm((showForm) => !showForm);
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const newToy = {
      name: formData.name,
      image: formData.image,
      likes: 0,
      id: uuidv4()
    }

    fetch(BASE_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newToy)
    })
      .then(r => r.json())
      .then(toy => {
        setParentToy([...parentToy, toy])
      })
    setFormData({
      name: '',
      image: '',
      likes: 0,
      id: ''
    })
  }

  const handleChange = (e) => {
    const { value, name } = e.target
    setFormData({ ...formData, [name]: value })
  }

  return (
    <>
      <Header />
      {showForm ? <ToyForm handleChange={handleChange} handleSubmit={handleSubmit} formData={formData} /> : null}
      <div className="buttonContainer">
        <button onClick={handleClick}>Add a Toy</button>
      </div>
      <ToyContainer toys={parentToy} setParentToy={setParentToy} />
      {<h1>HELLO</h1>}
    </>
  );
}

export default App;
