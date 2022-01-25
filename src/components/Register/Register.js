import React from 'react';
import { Route, Link } from 'react-router-dom';
import logo from '../../images/logo.svg';
import "../Form/Form.css";


function Register() {
  return (
    <section className="form">
      <img className="form__logo" src={logo} alt="Логотип" />
      <div class="form__area">
        <p className='form__title'>Добро пожаловать!</p>
        <form className="form__inputs" >
            <label htmlFor='name' className="form__label">Имя</label>
              <input id="name" name="name" type="text" placeholder="" className="form__input" required></input>
            <label htmlFor='email' className="form__label">E-mail</label>
              <input id="email" name="email" type="email" placeholder="" className="form__input"  required></input>
              <label htmlFor='password' className="form__label">Пароль</label>
              <input id="password" name="password" type="password" placeholder="" className="form__input" required></input>
              <p className="form__error">Что-то пошло не так...</p>
              <button type="submit" className="submit__button">Зарегистрироваться</button>
          </form>
              <p className="form__footer">Уже зарегистрированы? <a href="/signin" className="form__footer-link"> Войти</a></p>
      </div>

    </section>
  )
}

export default Register;
