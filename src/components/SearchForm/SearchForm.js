import React from "react";
import "./SearchForm.css";

function SearchForm(props) {
  const [textQuery, setTextQuery] = React.useState("");
  const [filterCheckBox, setfilterCheckBox] = React.useState(false);

  function handleChangetextQuery(evt) {
    setTextQuery(evt.target.value);
  }

  function handleChangefilterCheckBox(evt) {
    setfilterCheckBox(evt.target.checked);
  }

  function handleSubmit(evt) {
    // props.onLogin(values.email, values.password);
    // Запрещаем браузеру переходить по адресу формы
    evt.preventDefault();
    props.onSearchMovies({query: textQuery, shorts: filterCheckBox});
    //console.log(999);
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
            value={textQuery}
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
            checked={filterCheckBox}
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
