import { Route } from "react-router-dom";
import MoviesCard from "../MoviesCard/MoviesCard";
import "./MoviesCardList.css";

function MoviesCardList(props) {
  return (
    <section className="movies-card-list">
      {props.errorText !== "" && (
          <p className="movies-card-list__result-error">{props.errorText}</p>
        )}
        <div className="movies-card-list__cards">
          {props.allMovies.map(movie => (
            <MoviesCard
              key={movie._id}
              movie={movie}
            />
          ))}
        </div>
        <Route exact path="/movies">
          <div className="movies-card-list__more">
            <button className="movies-card-list__more-button">Еще</button>
          </div>
        </Route>
      </section>
  );
}

export default MoviesCardList;
