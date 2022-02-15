import React from "react";
import "./SearchForm.css";

function SearchForm(props) {

  function handleChangetextQuery(evt) {
    props.setTextQuery(evt.target.value);
  }

  function handleChangefilterCheckBox(evt) {
    props.setfilterCheckBox(evt.target.checked ? "checked" : "");
    const filter = evt.target.checked ? "checked" : "";
    // props.onSearchMovies({query: props.textQuery, shorts: filter});
    props.showSearchedMovies({query: props.textQuery, shorts: filter});
  }

  function handleSubmit(evt) {
    // Запрещаем браузеру переходить по адресу формы
    evt.preventDefault();
    props.onSearchMovies({query: props.textQuery, shorts: props.filterCheckBox});
  }

  return (
    <section className="search-form">
      <div className="search-form__panel">
        <form className="search-form__area">
          <input
            className="search-form__input"
            id="film"
            name="film"
            type="search"
            placeholder="Фильм"
            value={props.textQuery}
            onChange={handleChangetextQuery}
            required
          ></input>
          <button className="search-form__button" onClick={handleSubmit}></button>
        </form>
        <div className="search-form__filter">
          <input
            type="checkbox"
            className="search-form__filter-checkbox"
            name="short-film"
            id="short-film"
            checked={props.filterCheckBox}
            onChange={handleChangefilterCheckBox}
          ></input>
          <label htmlFor="short-film" className="search-form__label">
            Короткометражки
          </label>
        </div>
      </div>
    </section>
  );
}

export default SearchForm;
