import React, { useState } from "react";
import { Route } from "react-router-dom";
import MoviesCard from "../MoviesCard/MoviesCard";
import "./MoviesCardList.css";

function MoviesCardList(props) {
  const [cardsToShow, setCardsToShow] = useState(props.cardsQty.initial);

  function showMore() {
    setCardsToShow(cardsToShow + props.cardsQty.add);
  }

  return (
    <section className="movies-card-list">
      {props.errorText !== "" && (
          <p className="movies-card-list__result-error">{props.errorText}</p>
        )}
        <div className="movies-card-list__cards">
          {props.allSearchedMovies.slice(0, cardsToShow).map(movie => (
            <MoviesCard
              key={movie.id}
              movie={movie}
            />
          ))}
        </div>
        <Route exact path="/movies">
        {(props.allSearchedMovies.length > cardsToShow) && (
          <div className="movies-card-list__more">
            <button className="movies-card-list__more-button" onClick={showMore}>Еще</button>
          </div>
        )}
        </Route>
      </section>
  );
}

export default MoviesCardList;
