import React from "react";

import { Route } from "react-router-dom";
import "./MoviesCard.css";

function MoviesCard(props) {

  const isLiked = props.allSavedMovies.some(
    (savedMovie) => {
      // сохраненные карточки не проверяем
      if (!props.movie.id) {
        return false
      }

      // Поверяем есть ли фильм с таким ID в сохраненных фильмах
      if (savedMovie.movieId.toString() === props.movie.id.toString()) {
        // Сразу добавим _id из базы для удаления
        props.movie._id = savedMovie._id;
        return true;
      } else {
        return false;
      }
    }
  );

  // Обработчик клика по иконке лайка
  const handleLikeClick = () => {
    if (isLiked === true) {
      props.handleDeleteMovieCard(props.movie._id);
    } else {
      props.handleAddMovieCard(props.movie);
    }
  };

  // Обработчик клика по иконке удаления
  const handleDeleteClick = () => {
    props.handleDeleteMovieCard(props.movie._id);
  };

  // Функция форматирования продолжительности фильма
  const formatDuration = (duration) => {
    let h = Math.floor(duration / 60);
    let m = Math.floor(duration % 60);
    let timestamp = "";
    timestamp = (h > 0 ? h + "ч" : "") + (m > 0 ? " " + m + "м" : "");
    return timestamp;
  };

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
        <a
          href={props.movie.trailerLink}
          className="movies-card__trailer"
          target="_blank"
          rel="noreferrer"
        >
          <img
            src={`https://api.nomoreparties.co${props.movie.image.url}`}
            className="movies-card__poster"
            alt={`постер к фильму ${props.movie.nameRU}`}
          />
        </a>
      </Route>
      <Route exact path="/saved-movies">
        <button
          className="movies-card__delete-icon"
          onClick={handleDeleteClick}
        />
        <a
          href={props.movie.trailer}
          className="movies-card__trailer"
          target="_blank"
          rel="noreferrer"
        >
          <img
            src={props.movie.image}
            className="movies-card__poster"
            alt={`постер к фильму ${props.movie.nameRU}`}
          />
        </a>
      </Route>
    </article>
  );
}

export default MoviesCard;
