import React from "react";
import * as Auth from "../../utils/auth";
import { useHistory } from "react-router";
import { Link } from "react-router-dom";
import logo from "../../images/logo.svg";
import "../Form/Form.css";

function Login(props) {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const history = useHistory();

  function handleChangeEmail(evt) {
    setEmail(evt.target.value);
  }

  function handleChangePassword(evt) {
    setPassword(evt.target.value);
  }

  function handleSubmit() {
    props.onLogin(email, password);
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
            onChange={handleChangeEmail}
            required
          ></input>
          <label htmlFor="password" className="form__label">
            Пароль
          </label>
          <input
            id="password"
            name="password"
            type="password"
            placeholder=""
            className="form__input"
            onChange={handleChangePassword}
            required
          ></input>
          <p className="form__error">Что-то пошло не так...</p>
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
        >
          Войти
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
