import SearchForm from "../SearchForm/SearchForm";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import "./Movies.css";

function Movies(props) {
  // Загружаем все карточки фильмов
  // props.onLoad();

  return (
    <>
      <SearchForm onSearchMovies={props.onSearchMovies} />
      <MoviesCardList allMovies={props.allMovies} errorText={props.errorText} />
    </>
  );
}

export default Movies;
