import React, { useState } from "react";
import { Route } from "react-router-dom";
import MoviesCard from "../MoviesCard/MoviesCard";
import "./MoviesCardList.css";

function MoviesCardList(props) {
  // https://www.pluralsight.com/guides/re-render-react-component-on-window-resize
  // console.log(props.width);

  const [cardsToShow, setCardsToShow] = useState(
    props.width > 770 ? 12 : props.width > 490 ? 8 : 5
  );
  const [cardsToAdd, setCardsToAdd] = useState(
    props.width > 770 ? 3 : props.width > 490 ? 2 : 1
  );

  // console.log(cardsToShow);
  // console.log(cardsToAdd);

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
          {props.allSavedMovies.map((movie) => (
            <MoviesCard
              key={movie.id}
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
              key={movie.id}
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
