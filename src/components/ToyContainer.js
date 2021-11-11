import React, { useState, useEffect } from "react";
import ToyCard from "./ToyCard";

const BASE_URL = "http://localhost:3001/toys"


function ToyContainer({ toys, setParentToy }) {

  const handleDelete = (toy) => {
    console.log("deleting")
    fetch(`${BASE_URL}/${toy.id}`, {
      method: "DELETE"
    })
      .then(() => {
        const filteredBooks = toys.filter(oneToy => oneToy.id !== toy.id)
        setParentToy(filteredBooks)
      })
  }

  //need the toy id and likes
  //likes is already added by 1 when we stringify it
  function handleLikes(id, likes) {
    //looking for the toy that matched the passed in id
    const newToyLike = toys.map((toy) => {
      if (toy.id === id) {
        //when found let toy stay the same but likes of that toy will be the new amount 
        return { ...toy, likes }
      }

      return toy
    })
    setParentToy(newToyLike)
  }


  const everyToys = toys.map(toy => {
    return <ToyCard toy={toy} key={toy.id} handleDelete={handleDelete} handleLikes={handleLikes} />
  })



  return (
    <div id="toy-collection">{everyToys}</div>
  );
}

export default ToyContainer;
