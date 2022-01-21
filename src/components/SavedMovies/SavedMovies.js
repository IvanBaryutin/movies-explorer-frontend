import SearchForm from '../SearchForm/SearchForm';
import MoviesCard from '../MoviesCard/MoviesCard';
import "./SavedMovies.css";


function SavedMovies() {
  return (
    <section className="saved-movies">
      <MoviesCard />
      <MoviesCard />
      <MoviesCard />
      <MoviesCard />
    </section>
  )
}

export default SavedMovies;
