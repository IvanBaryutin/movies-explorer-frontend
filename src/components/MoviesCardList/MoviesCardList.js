import { Route } from "react-router-dom";
import MoviesCard from "../MoviesCard/MoviesCard";
import "./MoviesCardList.css";

function MoviesCardList() {
  return (
    <section className="movies-card-list">
        <div className="movies-card-list__cards">
          <MoviesCard />
          <MoviesCard />
          <MoviesCard />
          <MoviesCard />
          <MoviesCard />
          <MoviesCard />
          <MoviesCard />
          <MoviesCard />
          <MoviesCard />
          <MoviesCard />
          <MoviesCard />
          <MoviesCard />
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
