import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../../images/logo.svg';
import "../Form/Form.css";
import * as Auth from '../../utils/auth';
import { useHistory } from "react-router";

function Register(props) {
  const [name, setName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [SubmitResult, setSubmitResult] = React.useState({ status: "empty", message: "" });
  const history = useHistory();

  function handleChangeName(evt) {
    setName(evt.target.value);
  }

  function handleChangeEmail(evt) {
    setEmail(evt.target.value);
  }

  function handleChangePassword(evt) {
    setPassword(evt.target.value);
  }

  function handleSubmit(e) {
    props.onRegister(name, email, password);
  }

  return (
    <section className="form" name="">
      <img className="form__logo" src={logo} alt="Логотип" />
      <div className="form__area">
        <p className='form__title'>Добро пожаловать!</p>
        <form className="form__inputs" >
          <label htmlFor="name" className="form__label">Имя</label>
          <input id="name" name="name" minLength="6" maxLength="30" type="text" placeholder="Имя" className="form__input" value={name} onChange={handleChangeName} required></input>
          <label htmlFor="email" className="form__label">E-mail</label>
          <input id="email" name="email" type="email" placeholder="E-mail" className="form__input" value={email} onChange={handleChangeEmail} required></input>
          <label htmlFor="password" className="form__label">Пароль</label>
          <input id="password" name="password" minLength="6" maxLength="30" type="password" placeholder="Пароль" className="form__input" value={password} onChange={handleChangePassword} required></input>
          <p className="form__error">Что-то пошло не так...</p>
        </form>
      </div>
      <div className="form__footer">
        <p className={`form__submit-result_status form__submit-result_status_${SubmitResult.status}`}>{SubmitResult.message}</p>
        <button type="submit" className="form__submit-button" onClick={handleSubmit}>Зарегистрироваться</button>
        <p className="form__footer-text">Уже зарегистрированы? <Link to="/signin" className="form__footer-link"> Войти</Link></p>
      </div>

    </section>
  )
}

export default Register;
