import React, { useState, useEffect } from "react";
import { Route, Switch, useLocation } from "react-router-dom";
import { useHistory } from "react-router";
import ProtectedRoute from "../ProtectedRoute/ProtectedRoute.js"; // импортируем HOC
import "./App.css";
import Header from "../Header/Header";
import Main from "../Main/Main";
import Footer from "../Footer/Footer";
import SavedMovies from "../SavedMovies/SavedMovies";
import Register from "../Register/Register";
import Login from "../Login/Login";
import ErrorPage from "../ErrorPage/ErrorPage";
import Profile from "../Profile/Profile";
import Movies from "../Movies/Movies";

import { CurrentUserContext } from "../../contexts/CurrentUserContext";
import mainApi from "../../utils/MainApi";
import moviesApi from "../../utils/MoviesApi";

function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState({});

  const [formErrorText, setFormErrorText] = React.useState("");
  const [filmsErrorText, setfilmsErrorText] = React.useState("");
  const [registerButtonText, setRegisterButtonText] = React.useState("Зарегистрироваться");
  const [allMovies, setAllMovies] = React.useState([]);
  const [isMoviesActual, setIsMoviesActual] = React.useState(false);
  const [allSearchedMovies, setAllSearchedMovies] = React.useState([]);
  const [allSavedMovies, setAllSavedMovies] = React.useState([]);
  const history = useHistory();
  const location = useLocation();

  useEffect(() => {
    // если у пользователя есть токен в localStorage, проверим валидность токена
    const jwt = localStorage.getItem("jwt");
    if (jwt) {
      // проверим токен
      //Auth.getContent(jwt)
      mainApi
        .getUserInfo()
        .then((res) => {
          if (res) {
            //console.log(res);
            // авторизуем пользователя
            setCurrentUser(res);
            // console.log(currentUser);
            setLoggedIn(true);
            //history.push("/");
          }
        })
        .catch((err) => {
          // попадаем сюда, если один из промисов завершится ошибкой
          console.log(err);
        });
    }
  }, [loggedIn]);

  // Регистрация нового пользователя
  function handleRegister(name, email, password) {
    setRegisterButtonText("Загрузка...");
    mainApi.register(name, email, password)
      .then((res) => {
        handleLogin(email, password);
        console.log(location.pathname);
      })
      .catch((err) => {
        setFormErrorText(err.message);
        console.log(`Ошибка ${err}`);
      })
      .finally(() => setRegisterButtonText("Зарегистрироваться"));
  }

  // Авторизация
  function handleLogin(email, password) {
    if (email === "" || password === "") {
      return;
    }
    mainApi.authorize(email, password)
      .then((data) => {
        if (data.token) {
          console.log(data.token);
          localStorage.setItem("jwt", data.token);
          setLoggedIn(true);
          history.push("/movies");
        }
      })
      .catch((err) => {
        //console.log(`Ошибка ${err}`)
        if (err.message) {
          setFormErrorText(err.message);
          //setSubmitResult({ status: 'error', message: err.message })
        }
      })
      .finally(() => setFormErrorText(""));
  }

  // Выход
  function handleSignOut() {
    localStorage.removeItem("jwt");
    setLoggedIn(false);
    setCurrentUser({ name: "", email: "" });
    history.push("/");
  }

  // Обновление профиля
  function handleUpdate(name, email) {
    // console.log(name, email);
    mainApi
      .setUserInfo({ name: name, email: email })
      .then((res) => {
        setCurrentUser(res);
        setFormErrorText("Данные обновлены");
      })
      .catch((err) => {
        setFormErrorText(err.message);
      });
  }

    // Загрузка данных о карточках с сервиса
    function getAllMovies() {
        moviesApi
      .getAllMovies()
      .then((res) => {
        setAllMovies(res);
        localStorage.setItem("allMovies", res);
        setIsMoviesActual(true);
      })
      .catch((err) => {
        setfilmsErrorText("Во время запроса произошла ошибка. Возможно, проблема с соединением или сервер недоступен. Подождите немного и попробуйте ещё раз");
        console.log(`Ошибка ${err}`)
      });
    };

    function handleSearchMovies(queryData) {
      if (queryData.query === "") {
        setfilmsErrorText("Нужно ввести ключевое слово");
        return;
      }
      const cachedMovies = localStorage.getItem("allMovies");

      if (isMoviesActual === false || !cachedMovies) {
        getAllMovies();
      }
      setfilmsErrorText("");
      console.log(isMoviesActual);
      console.log(allMovies);
    }

  // Загрузка данных о сохраненных карточках
  /*
  useEffect(() => {
    mainApi
    .getAllSavedMovies()
    .then((res) => {
      setAllSavedMovies(res);
      //console.log(allSavedMovies);
    })
    .catch((err) => {
      console.log(`Ошибка ${err}`)
    });
  }, [loggedIn]);
  */

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div>
        <div className="page">
          <Header logged={loggedIn} />

          <Switch>
            <Route exact path="/signup">
              <Register onRegister={handleRegister} errorText={formErrorText} buttonText={registerButtonText} />
            </Route>

            <Route exact path="/signin">
              <Login onLogin={handleLogin} errorText={formErrorText} />
            </Route>

            <ProtectedRoute
              exact
              path="/profile"
              loggedIn={loggedIn}
              component={Profile}
              onSignOut={handleSignOut}
              onUpdateProfile={handleUpdate}
              errorText={formErrorText}
            ></ProtectedRoute>

            <ProtectedRoute
              exact
              path="/saved-movies"
              loggedIn={loggedIn}
              component={SavedMovies}
            ></ProtectedRoute>
            <ProtectedRoute
              exact
              path="/movies"
              loggedIn={loggedIn}
              onSearchMovies={handleSearchMovies}
              component={Movies}
              allMovies={allMovies}
              errorText={filmsErrorText}
            ></ProtectedRoute>

            <Route exact path="/">
              <Main />
            </Route>

            <Route path="*">
              <ErrorPage />
            </Route>
          </Switch>
          <Footer />
        </div>
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
