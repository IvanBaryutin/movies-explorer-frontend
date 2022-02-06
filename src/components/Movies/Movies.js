import SearchForm from "../SearchForm/SearchForm";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import "./Movies.css";

function Movies(props) {

  return (
    <>
      <SearchForm onSearchMovies={props.onSearchMovies} />
      <MoviesCardList
        allSearchedMovies={props.allSearchedMovies}
        errorText={props.errorText}
        cardsQty={props.cardsQty}
      />
    </>
  );
}

export default Movies;
