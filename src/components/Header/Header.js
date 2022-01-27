import React from "react";
import { Route, Link } from "react-router-dom";
import "./Header.css";
import burger from "../../images/burger-icon.svg";
import close from "../../images/close-icon.svg";

function Header() {
  return (
    <header className="header">
      <nav>
        <ul className="header__main-menu">
          <li>
            <Link to="/" className="header__logo-link">
              Главная
            </Link>
          </li>
          <Route exact path={["/profile", "/movies", "/saved-movies"]}>
            <li>
              <Link to="/movies" className="header__main-menu-link">
                Фильмы
              </Link>
            </li>
            <li>
              <Link to="/saved-movies" className="header__main-menu-link">
                Сохранённые фильмы
              </Link>
            </li>
          </Route>
        </ul>
      </nav>
      <nav>
        <ul className="header__account-menu">
          <Route exact path="/">
            <li>
              <Link to="/signup" className="header__account-menu-link">
                Регистрация
              </Link>
            </li>
            <li>
              <Link
                to="/signin"
                className="header__account-menu-button-link header__account-menu-button-link_style_black"
              >
                Войти
              </Link>
            </li>
          </Route>
          <Route exact path={["/profile", "/movies", "/saved-movies"]}>
            <li>
              <Link
                to="/profile"
                className="header__account-menu-button-link header__account-menu-button-link_style_gray"
              >
                Аккаунт
              </Link>
            </li>
            <li>
            <img
              src={burger}
              className="header__mobile-menu-open-button"
              alt="иконка мобильного меню"
            />
          </li>
          </Route>
        </ul>
      </nav>

      <div className="header__popup">
        <div className="header__popup-container">
          <img
            src={close}
            className="header__popup-close-button"
            alt="иконка-крестик"
          />
          <ul className="header__mobile-menu">
            <li>
              <Link to="/" className="header__mobile-menu-link">
                Главная
              </Link>
            </li>
            <li>
              <Link
                to="/movies"
                className="header__mobile-menu-link header__mobile-menu-link_active"
              >
                Фильмы
              </Link>
            </li>
            <li>
              <Link to="/saved-movies" className="header__mobile-menu-link">
                Сохраненные фильмы
              </Link>
            </li>
          </ul>
          <Link
            to="/profile"
            className="header__account-menu-button-link header__popup-menu-button"
          >
            Аккаунт
          </Link>
        </div>
      </div>
    </header>
  );
}

export default Header;
