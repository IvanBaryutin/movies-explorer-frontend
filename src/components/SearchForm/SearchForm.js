import "./SearchForm.css";

function SearchForm() {
  return (
    <section className="search-form">
      <form className="search-form__area">
        <input className="search-form__input" id="film" name="film" type="search" placeholder="Фильм"></input>
        <button className="search-form__button" type="submit"></button>
      </form>
      <div className="search-form__filter">
        <input type="checkbox" className="search-form__filter-checkbox" name="short-film"></input>
        <label htmlFor="short-film" className="search-form__label">Короткометражки</label>
      </div>
    </section>
  );
}

export default SearchForm;
