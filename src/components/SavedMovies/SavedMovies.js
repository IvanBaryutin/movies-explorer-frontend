import SearchForm from "../SearchForm/SearchForm";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import "./SavedMovies.css";

function SavedMovies(props) {
  return (
    <>
      <SearchForm
        onSearchMovies={props.onSearchMovies}
        textQuery={props.textQuery}
        setTextQuery={props.setTextQuery}
        filterCheckBox={props.filterCheckBox}
        setfilterCheckBox={props.setfilterCheckBox}
      />
      <MoviesCardList
        allSearchedMovies={props.allSearchedMovies}
        allSearchedSavedMovies={props.allSearchedSavedMovies}
        allSavedMovies={props.allSavedMovies}
        handleAddMovieCard={props.onAddMovieCard}
        handleDeleteMovieCard={props.onDeleteMovieCard}
        errorText={props.errorText}
      />
    </>
  );
}

export default SavedMovies;
