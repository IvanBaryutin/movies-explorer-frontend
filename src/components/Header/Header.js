import React, { useState } from "react";
import { Route, Link } from "react-router-dom";
import "./Header.css";
import burger from "../../images/burger-icon.svg";
import close from "../../images/close-icon.svg";

function Header(props) {
  const [isMobileMenuOpened, setMobileMenuOpened] = useState(false);

  function handleBurgerClick() {
    if (isMobileMenuOpened) {
      setMobileMenuOpened(false);
    } else {
      setMobileMenuOpened(true);
    }
  }

  function closeMobileMenu() {
    setMobileMenuOpened(false);
  }

  return (
    <Route exact path={["/movies", "/saved-movies", "/profile", "/"]}>
      <header className="header">
        <nav>
          <ul className="header__main-menu">
            <li>
              <Link to="/" className="header__logo-link">
                Главная
              </Link>
            </li>
            {props.logged === true ? (
              <>
                <li>
                  <Link
                    to="/movies"
                    className="header__main-menu-link header__main-menu-link_active"
                  >
                    Фильмы
                  </Link>
                </li>
                <li>
                  <Link to="/saved-movies" className="header__main-menu-link">
                    Сохранённые фильмы
                  </Link>
                </li>
              </>
            ) : (
              <></>
            )}
          </ul>
        </nav>
        <nav>
          <ul className="header__account-menu">
            {props.logged === true ? (
              <>
                <li>
                  <Link
                    to="/profile"
                    className="header__account-menu-button-link header__account-menu-button-link_style_gray"
                  >
                    Аккаунт
                  </Link>
                </li>
              </>
            ) : (
              <>
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
              </>
            )}
            <li>
              <img
                src={burger}
                className="header__mobile-menu-open-button"
                alt="иконка мобильного меню"
                onClick={handleBurgerClick}
              />
            </li>
          </ul>
        </nav>

        <div
          className={`header__popup ${
            isMobileMenuOpened ? "header__popup_opened" : ""
          }`}
        >
          <div className="header__popup-container">
            <img
              src={close}
              className="header__popup-close-button"
              alt="иконка-крестик"
              onClick={closeMobileMenu}
            />
            {props.logged === true ? (
              <>
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
                    <Link
                      to="/saved-movies"
                      className="header__mobile-menu-link"
                    >
                      Сохраненные фильмы
                    </Link>
                  </li>
                </ul>
                <Link
                  to="/profile"
                  className="header__mobile-menu-button-link header__popup-menu-button"
                >
                  Аккаунт
                </Link>
              </>
            ) : (
              <>
                <ul className="header__mobile-menu">
                  <li>
                    <Link to="/" className="header__mobile-menu-link">
                      Главная
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/signup"
                      className="header__mobile-menu-link header__mobile-menu-link_active"
                    >
                      Регистрация
                    </Link>
                  </li>
                  <li>
                    <Link to="/signin" className="header__mobile-menu-link">
                      Войти
                    </Link>
                  </li>
                </ul>
              </>
            )}
          </div>
        </div>
      </header>
    </Route>
  );
}

export default Header;
