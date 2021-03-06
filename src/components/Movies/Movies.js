import SearchForm from "../SearchForm/SearchForm";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import Preloader from "../Preloader/Preloader";
import "./Movies.css";

function Movies(props) {
  return (
    <>
      <SearchForm
        onSearchMovies={props.onSearchMovies}
        textQuery={props.textQuery}
        setTextQuery={props.setTextQuery}
        filterCheckBox={props.filterCheckBox}
        setfilterCheckBox={props.setfilterCheckBox}
        showSearchedMovies={props.onChangeFilterCheckbox}
      />
      {props.isLoading ? (
        <Preloader />
      ) : (
        <MoviesCardList
          allSearchedMovies={props.allSearchedMovies}
          allSearchedSavedMovies={props.allSearchedSavedMovies}
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
