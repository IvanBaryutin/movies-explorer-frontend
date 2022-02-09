import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import "./SavedMovies.css";


function SavedMovies(props) {
  return (
    <>
      <SearchForm />
      <MoviesCardList
        allSearchedMovies={props.allSearchedMovies}
        allSavedMovies={props.allSavedMovies}
        handleAddMovieCard={props.onAddMovieCard}
        handleDeleteMovieCard={props.onDeleteMovieCard}
        errorText={props.errorText}
      />
    </>
  )
}

export default SavedMovies;
