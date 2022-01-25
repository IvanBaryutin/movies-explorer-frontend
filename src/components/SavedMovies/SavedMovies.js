import SearchForm from '../SearchForm/SearchForm';
import MoviesCard from '../MoviesCard/MoviesCard';
import "./SavedMovies.css";


function SavedMovies() {
  return (
    <>
      <SearchForm />
      <section className="saved-movies">
        <div className='saved-movies__cards'>
          <MoviesCard />
          <MoviesCard />
          <MoviesCard />
          <MoviesCard />
          <MoviesCard />
          <MoviesCard />
          <MoviesCard />
          <MoviesCard />
          <MoviesCard />
          <MoviesCard />
          <MoviesCard />
          <MoviesCard />
        </div>
        <div className='saved-movies__more'>
          <button className='saved-movies__more-button'>Еще</button>
        </div>
      </section>
    </>
  )
}

export default SavedMovies;
