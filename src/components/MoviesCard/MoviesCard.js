import React, { useState } from "react";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";

import { Route } from "react-router-dom";
import "./MoviesCard.css";

function MoviesCard(props) {
  // Подписываемся на контекст CurrentUserContext
  const currentUser = React.useContext(CurrentUserContext);
  // Определяем, являемся ли мы владельцем текущей карточки
  //const isOwn = props.card.owner === currentUser._id;
  //const [isLiked, setIsLiked] = useState(false);



  // Создаём переменную, которую после зададим в `className` для кнопки лайка
  // const cardLikeButtonClassName = (isLiked) ? "element__like-icon element__like-icon_active" : "element__like-icon";

  //console.log('id: '+props.movie.id);

  //console.log("Определяем лайк");
  //console.log(typeof props.allSavedMovies)
  //console.log(props.allSavedMovies);
  const isLiked = props.allSavedMovies.some(item => item.movieId == props.movie.id);
  //const isLiked = props.allSavedMovies.some(isEqual);
  //console.log(isLiked);
  // const isLiked = props.allSavedMovies.some(i => i.id === currentUser._id);
  // console.log(isLiked);

  function handleMovieClick() {
    // props.onCardClick(props.card);
  }

  function handleLikeClick() {
    console.log(props.movie);
    if (isLiked === true) {
      props.handleDeleteMovieCard(props.movie.id);
      console.log("Delete");
    } else {
      props.handleAddMovieCard(props.movie);
      console.log("Add");
    }
  }

  function handleDeleteClick() {
    // props.onCardDelete(props.card);
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
          onClick={handleLikeClick}
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
