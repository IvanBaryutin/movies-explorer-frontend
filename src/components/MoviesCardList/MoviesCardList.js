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
        <div className="movies-card-list__more">
          <button className="movies-card-list__more-button">Еще</button>
        </div>
      </section>
  );
}

export default MoviesCardList;
