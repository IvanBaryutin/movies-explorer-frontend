import React, { useState, useEffect } from "react";
import { Route } from "react-router-dom";
import MoviesCard from "../MoviesCard/MoviesCard";
import "./MoviesCardList.css";

function MoviesCardList(props) {
  const [viewportWidth, setViewportWidth] = useState(window.innerWidth);
  const [cardsToShow, setCardsToShow] = useState(12);
  const [cardsToAdd, setCardsToAdd] = useState(3);

  // https://www.pluralsight.com/guides/re-render-react-component-on-window-resize
  // https://stackoverflow.com/questions/45644457/action-on-window-resize-in-react

  // Хук изменения ширины окна
  useEffect(() => {
    const updateWidth = () => {
      setViewportWidth(window.innerWidth);
      setCardsToShow(window.innerWidth > 1270 ? 12 : viewportWidth > 550 ? 8 : 5);
      setCardsToAdd(window.innerWidth  > 1270? 3 : viewportWidth > 550 ? 2 : 1);
    };

    const timer = setTimeout(
      () => window.addEventListener("resize", updateWidth),
      1000
    );
    return () => {
      window.removeEventListener("resize", updateWidth);
      clearTimeout(timer);
    };
  });



  function showMore() {
    setCardsToShow(cardsToShow + cardsToAdd);
  }

  return (
    <section className="movies-card-list">
      {props.errorText !== "" && (
        <p className="movies-card-list__result-error">{props.errorText}</p>
      )}
      <Route exact path="/saved-movies">
        <div className="movies-card-list__cards">
          {props.allSearchedSavedMovies.map((movie) => (
            <MoviesCard
              key={movie.movieId}
              movie={movie}
              allSavedMovies={props.allSavedMovies}
              handleDeleteMovieCard={props.handleDeleteMovieCard}
            />
          ))}
        </div>
      </Route>
      <Route exact path="/movies">
        <div className="movies-card-list__cards">
          {props.allSearchedMovies.slice(0, cardsToShow).map((movie) => (
            <MoviesCard
              key={movie.movieId}
              movie={movie}
              allSavedMovies={props.allSavedMovies}
              handleAddMovieCard={props.handleAddMovieCard}
              handleDeleteMovieCard={props.handleDeleteMovieCard}
            />
          ))}
        </div>

        {props.allSearchedMovies.length > cardsToShow && (
          <div className="movies-card-list__more">
            <button
              className="movies-card-list__more-button"
              onClick={showMore}
            >
              Еще
            </button>
          </div>
        )}
      </Route>
    </section>
  );
}

export default MoviesCardList;
