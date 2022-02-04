import React, { useState } from "react";
import { Route } from "react-router-dom";
import "./MoviesCard.css";

function MoviesCard(props) {
  const [isLiked, setIsLiked] = useState(false);

  function handleSaveClick() {
    if (!isLiked) {
      setIsLiked(true);
    } else {
      setIsLiked(false);
    }
  }

  function handleDeleteClick() {
    if (!isLiked) {
      setIsLiked(true);
    } else {
      setIsLiked(false);
    }
  }

  function formatDuration(duration) {
    let h = Math.floor(duration / 60);
    let m = Math.floor(duration % 60);
    let timestamp = "";
    timestamp = (h > 0 ? h + "ч" : "") + (m > 0 ? " " + m + "м" : "");
    return timestamp;
  }

  return (
    <article className="movies-card">
      <p className="movies-card__title">{props.movie.nameRU}</p>
      <p className="movies-card__duration">{formatDuration(props.movie.duration)}</p>
      <Route exact path="/movies">
        <button
          className={`movies-card__save-icon ${
            isLiked ? "movies-card__save-icon_active" : ""
          }`}
          onClick={handleSaveClick}
        />
      </Route>
      <Route exact path="/saved-movies">
        <button
          className="movies-card__delete-icon"
          onClick={handleDeleteClick}
        />
      </Route>
      <img
        src={props.movie.image.url}
        className="movies-card__image"
        alt="Обложка фильма"
      />
      <img
        src={`https://api.nomoreparties.co${props.movie.image.url}`}
        className="movies-card__image"
        alt="Обложка фильма"
      />
    </article>
  );
}

export default MoviesCard;
