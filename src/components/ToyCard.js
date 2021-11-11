import React from "react";
const BASE_URL = "http://localhost:3001/toys"

function ToyCard({ toy, handleDelete, handleLikes }) {
  const { name, image, likes, id } = toy


  const handleLikeButton = () => {
    fetch(`${BASE_URL}/${id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        likes: likes + 1
      })
    })
      .then(r => r.json())
      .then(data => handleLikes(data.id, data.likes))
  }


  return (
    <div className="card">
      <h2>{name}</h2>
      <img
        src={image}
        alt={name}
        className="toy-avatar"
      />
      <p>{likes} Likes </p>
      <button className="like-btn" onClick={handleLikeButton}>Like {"<3"}</button>
      <button className="del-btn" onClick={() => handleDelete(toy)}>Donate to GoodWill</button>

    </div>
  );
}

export default ToyCard;
