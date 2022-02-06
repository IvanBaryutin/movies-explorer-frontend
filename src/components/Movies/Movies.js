import SearchForm from "../SearchForm/SearchForm";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import Preloader from "../Preloader/Preloader";
import "./Movies.css";

function Movies(props) {
  // console.log("В movies")
  // console.log(props.cardsQty)

  return (
    <>
      <SearchForm onSearchMovies={props.onSearchMovies} />
      {props.isLoading ? (<Preloader />) : (
        <MoviesCardList
          allSearchedMovies={props.allSearchedMovies}
          errorText={props.errorText}
          width={props.viewportWidth}
          cardsQty={props.cardsQty}
        />
      )}
    </>
  );
}

export default Movies;
