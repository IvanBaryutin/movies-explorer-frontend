import React, { useState } from 'react';
import { Route } from "react-router-dom";
import "./MoviesCard.css";
import image from '../../images/3bfd6b9af4141d2ee15e36a186b073a7.jpg';

function MoviesCard() {

  const [isLiked, setIsLiked] = useState(false);

  function handleSaveClick() {
    if (!isLiked) {
      setIsLiked(true)
    } else {
      setIsLiked(false)
    }
  }

  function handleDeleteClick() {
    if (!isLiked) {
      setIsLiked(true)
    } else {
      setIsLiked(false)
    }
  }

  return (
    <article className="movies-card">
      <p className="movies-card__title">33 слова о дизайне</p>
      <p className="movies-card__duration">1ч 47м</p>
      <Route exact path="/movies">
        <button className={`movies-card__save-icon ${isLiked ? "movies-card__save-icon_active" : ""}`} onClick={handleSaveClick} />
      </Route>
      <Route exact path="/saved-movies">
        <button className="movies-card__delete-icon" onClick={handleDeleteClick} />
      </Route>
      <img src={image} className="movies-card__image" alt="Обложка фильма"/>
    </article>
  )
}

export default MoviesCard;
