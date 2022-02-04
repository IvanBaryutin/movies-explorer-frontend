import SearchForm from "../SearchForm/SearchForm";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import "./Movies.css";

function Movies(props) {
  // Загружаем все карточки фильмов
  // props.onLoad();

  return (
    <>
      <SearchForm />
      <MoviesCardList allMovies={props.allMovies} />
    </>
  );
}

export default Movies;
