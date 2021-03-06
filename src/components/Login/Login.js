import React from "react";
import { Link } from "react-router-dom";
import { useFormWithValidation } from "../../utils/FormValidation";
import logo from "../../images/logo.svg";
import "../Form/Form.css";

function Login(props) {
  const { values, handleChange, errors, isValid } =
    useFormWithValidation();

  function handleSubmit() {
    props.onLogin(values.email, values.password);
  }

  return (
    <section className="form">
      <img className="form__logo" src={logo} alt="Логотип" />
      <div className="form__area">
        <p className="form__title">Рады видеть!</p>
        <form className="form__inputs">
          <label htmlFor="email" className="form__label">
            E-mail
          </label>
          <input
            id="email"
            name="email"
            type="email"
            placeholder=""
            className="form__input"
            onChange={handleChange}
            pattern="^[-\w.]+@([A-z0-9][-A-z0-9]+\.)+[A-z]{2,4}$"
            value={values.email || ""}
            disabled={props.isLoading ? "disabled" : ""}
            required
          ></input>
          <p className="form__error">{errors.email || " "}</p>
          <label htmlFor="password" className="form__label">
            Пароль
          </label>
          <input
            id="password"
            name="password"
            type="password"
            minLength="6"
            maxLength="30"
            placeholder=""
            className="form__input"
            onChange={handleChange}
            value={values.password || ""}
            disabled={props.isLoading ? "disabled" : ""}
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
          Ещё не зарегистрированы?{" "}
          <Link to="/signup" className="form__footer-link">
            Регистрация
          </Link>
        </p>
      </div>
    </section>
  );
}

export default Login;
