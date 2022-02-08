import React from "react";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";

import { Route } from "react-router-dom";
import "./MoviesCard.css";

function MoviesCard(props) {
  // Подписываемся на контекст CurrentUserContext
  const currentUser = React.useContext(CurrentUserContext);
  // Определяем владелец ли карточки
  const isOwn = props.movie.owner === currentUser._id;
  // Определяем состояние иконки лайка
  const isLiked = props.allSavedMovies.some(
    (item) => item.movieId === props.movie.id.toString()
  );


  // Обработчик клика по картинке карточки фильма
  const handleMovieClick = () => {
    const win = window.open(props.movie.trailerLink, "_blank");
    win.focus();
  }

  // Обработчик клика по иконке лайка
  const handleLikeClick = () => {
    if (isLiked === true) {
      props.handleDeleteMovieCard(props.movie.id);
    } else {
      props.handleAddMovieCard(props.movie);
    }
  }

  // Обработчик клика по иконке удаления
  const handleDeleteClick = () => {
    if (isOwn) {
      props.handleDeleteMovieCard(props.movie.id);
    } else {
      console.log("Нельзя удалять чужие фильмы");
    }
  }

  // Функция форматирования продолжительности фильма
  const formatDuration = (duration) => {
    let h = Math.floor(duration / 60);
    let m = Math.floor(duration % 60);
    let timestamp = "";
    timestamp = (h > 0 ? h + "ч" : "") + (m > 0 ? " " + m + "м" : "");
    return timestamp;
  }

  return (
    <article className="movies-card">
      <p className="movies-card__title">{props.movie.nameRU}</p>
      <p className="movies-card__duration">
        {formatDuration(props.movie.duration)}
      </p>
      <Route exact path="/movies">
        <button
          className={`movies-card__save-icon ${
            isLiked ? "movies-card__save-icon_active" : ""
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
        src={`https://api.nomoreparties.co${props.movie.image.url}`}
        className="movies-card__image"
        alt="Обложка фильма"
        onClick={handleMovieClick}
      />
    </article>
  );
}

export default MoviesCard;
