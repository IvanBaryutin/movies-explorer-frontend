//import React from 'react';
import './Header.css';

function Header() {
  return (
    <header className='header'>
      <nav>
        <ul className='header__main-menu'>
          <li><a href='#' className='header__logo-link'>Главная</a></li>
        </ul>
      </nav>
      <nav>
        <ul className='header__account-menu'>
          <li><a href='#' className='header__account-menu-link'>Регистрация</a></li>
          <li><button className='header__account-menu-button-link header__account-menu-button-link_style_black'>Войти</button></li>
        </ul>
      </nav>

    </header>
  );
}

export default Header;
