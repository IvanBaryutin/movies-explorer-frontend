import SearchForm from "../SearchForm/SearchForm";
import MoviesCard from "../MoviesCard/MoviesCard";
import "./Movies.css";

function Movies() {
  return (
    <>
      <SearchForm />
      <section className="movies">
        <div className="movies__cards">
          <MoviesCard />
          <MoviesCard />
          <MoviesCard />
          <MoviesCard />
        </div>
        <div className="movies__more">
          <button className="saved-movies__more-button">Еще</button>
        </div>
      </section>
    </>
  );
}

export default Movies;
