import React, { useState } from "react";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";

import { Route } from "react-router-dom";
import "./MoviesCard.css";

function MoviesCard(props) {

  // Подписываемся на контекст CurrentUserContext
  const currentUser = React.useContext(CurrentUserContext);
  // Определяем, являемся ли мы владельцем текущей карточки
  //const isOwn = props.card.owner === currentUser._id;
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

  function handleMovieClick() {
    //props.onCardClick(props.card);
  }

  function handleLikeClick() {
    props.onCardLike(props.card);
  }

  function handleCardDelete() {
    props.onCardDelete(props.card);
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
          className={`movies-card__save-icon ${isLiked ? "movies-card__save-icon_active" : ""
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
        onClick={handleMovieClick}
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
