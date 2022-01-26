import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../../images/logo.svg';
import "../Form/Form.css";


function Login() {
  return (
    <section className="form">
      <img className="form__logo" src={logo} alt="Логотип" />
      <div class="form__area">
        <p className='form__title'>Рады видеть!</p>
        <form className="form__inputs" >
          <label htmlFor='email' className="form__label">E-mail</label>
          <input id="email" name="email" type="email" placeholder="" className="form__input"  required></input>
          <label htmlFor='password' className="form__label">Пароль</label>
          <input id="password" name="password" type="password" placeholder="" className="form__input" required></input>
          <p className="form__error">Что-то пошло не так...</p>
        </form>
      </div>
      <div className="form__footer">
        <button type="submit" className="form__submit-button">Зарегистрироваться</button>
        <p className="form__footer-text">Уже зарегистрированы? <Link to="/signin" className="form__footer-link"> Войти</Link></p>
      </div>
    </section>
  )
}

export default Login;
