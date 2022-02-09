import SearchForm from "../SearchForm/SearchForm";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import Preloader from "../Preloader/Preloader";
import "./Movies.css";

function Movies(props) {

  return (
    <>
      <SearchForm onSearchMovies={props.onSearchMovies} />
      {props.isLoading ? (<Preloader />) : (
        <MoviesCardList
          allSearchedMovies={props.allSearchedMovies}
          allSavedMovies={props.allSavedMovies}
          handleAddMovieCard={props.onAddMovieCard}
          handleDeleteMovieCard={props.onDeleteMovieCard}
          errorText={props.errorText}
        />
      )}
    </>
  );
}

export default Movies;
