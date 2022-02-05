import React from "react";
import { Link } from "react-router-dom";
import { useFormWithValidation } from "../../utils/FormValidation";
import logo from "../../images/logo.svg";
import "../Form/Form.css";

function Register(props) {
  const { values, handleChange, resetForm, errors, isValid } =
    useFormWithValidation();

  function handleSubmit() {
    props.onRegister(values.name, values.email, values.password);
  }

  return (
    <section className="form" name="">
      <img className="form__logo" src={logo} alt="Логотип" />
      <div className="form__area">
        <p className="form__title">Добро пожаловать!</p>
        <form className="form__inputs">
          <label htmlFor="name" className="form__label">
            Имя
          </label>
          <input
            id="name"
            name="name"
            minLength="2"
            maxLength="30"
            type="text"
            pattern="^[а-яА-ЯёЁa-zA-Z -]+$"
            placeholder="Имя"
            className="form__input"
            value={values.name || ""}
            onChange={handleChange}
            required
          ></input>
          <p className="form__error">{errors.name || " "}</p>
          <label htmlFor="email" className="form__label">
            E-mail
          </label>
          <input
            id="email"
            name="email"
            type="email"
            placeholder="E-mail"
            className="form__input"
            value={values.email || ""}
            onChange={handleChange}
            required
          ></input>
          <p className="form__error">{errors.email || " "}</p>
          <label htmlFor="password" className="form__label">
            Пароль
          </label>
          <input
            id="password"
            name="password"
            minLength="6"
            maxLength="30"
            type="password"
            placeholder="Пароль"
            className="form__input"
            value={values.password || ""}
            onChange={handleChange}
            required
          ></input>
          <p className="form__error">{errors.password || " "}</p>
        </form>
      </div>
      <div className="form__footer">
        {props.errorText !== "" && (
          <p className="form__submit-result-error">{props.errorText}</p>
        )}
        <button
          type="submit"
          className="form__submit-button"
          onClick={handleSubmit}
          disabled= { !isValid ? "disabled" : ""}
        >
          {props.buttonText}
        </button>
        <p className="form__footer-text">
          Уже зарегистрированы?{" "}
          <Link to="/signin" className="form__footer-link">
            {" "}
            Войти
          </Link>
        </p>
      </div>
    </section>
  );
}

export default Register;
