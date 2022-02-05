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

  const [viewportWidth, setViewportWidth] = useState(window.innerWidth);
  const [cardsQty, setCardsQty] = useState({ add: 0, initial: 0 })
  console.log(cardsQty);

  const [formErrorText, setFormErrorText] = React.useState("");
  const [filmsErrorText, setfilmsErrorText] = React.useState("");

  const [registerButtonText, setRegisterButtonText] = React.useState("Зарегистрироваться");
  const [loginButtonText, setLoginButtonText] = React.useState("Войти");
  const [profileButtonText, setprofileButtonText] = React.useState("Редактировать");

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
            // авторизуем пользователя
            setCurrentUser(res);
            setLoggedIn(true);
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
        setFormErrorText("");
        handleLogin(email, password);
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
    setLoginButtonText("Загрузка...");
    mainApi.authorize(email, password)
      .then((data) => {
        if (data.token) {
          localStorage.setItem("jwt", data.token);
          setLoggedIn(true);
          setFormErrorText("");
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
      .finally(() => {
        setLoginButtonText("Войти");
      });
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
    setprofileButtonText("Загрузка...");
    mainApi
      .setUserInfo({ name: name, email: email })
      .then((res) => {
        setCurrentUser(res);
        setFormErrorText("Данные обновлены");
      })
      .catch((err) => {
        setFormErrorText(err.message);
      })
      .finally(() => {
        setprofileButtonText("Редактировать");
      });
  }

  // Загрузка данных о карточках с сервиса
  function getAllMovies() {
    moviesApi
      .getAllMovies()
      .then((res) => {
        setAllMovies(res);
        localStorage.setItem("allMovies", JSON.stringify(res));
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
    console.log(cachedMovies);

    if (isMoviesActual === false || !cachedMovies) {
      getAllMovies();
    }
    setfilmsErrorText("");
    console.log(allMovies);
    setAllSearchedMovies(filterMovies(allMovies, queryData));
    //console.log(allSearchedMovies);

    //console.log(isMoviesActual);
    //console.log(allMovies);
  }

  function filterMovies(moviesArr, queryData) {
    const { query = "", shorts = false } = queryData;
    let filteredMovies;
    if (moviesArr) {
      //console.log(moviesArr);
      filteredMovies = moviesArr.filter(function (movie) {
        //console.log(movie.nameRU);
        if (movie.nameRU.toLowerCase().includes(query.toLowerCase())) {
          return true;
        }
      });
      if (shorts === true) {
        filteredMovies = filteredMovies.filter(function (movie) {
          //console.log(movie.nameRU);
          if (movie.duration < 40) {
            return true;
          }
        });
      }
    }
    return filteredMovies;
  };

  // https://stackoverflow.com/questions/45644457/action-on-window-resize-in-react

  const updateWidth = () => {
    setViewportWidth(window.innerWidth);
    if (window.innerWidth >= 1280) {
      setCardsQty({ add: 3, initial: 12 });
    } else {
      if (window.innerWidth >= 765) {
        setCardsQty({ add: 2, initial: 8 });
      } else {
        setCardsQty({ add: 2, initial: 5 });
      }
    }
  };

  // Хук изменения ширины окна
  React.useEffect(() => {
    const timer = setTimeout(() =>
      window.addEventListener("resize", updateWidth), 1000);
    return () => {
      window.removeEventListener("resize", updateWidth);
      clearTimeout(timer);
    }
  });

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
              <Login onLogin={handleLogin} errorText={formErrorText} buttonText={loginButtonText} />
            </Route>

            <ProtectedRoute
              exact
              path="/profile"
              loggedIn={loggedIn}
              component={Profile}
              onSignOut={handleSignOut}
              onUpdateProfile={handleUpdate}
              errorText={formErrorText}
              buttonText={profileButtonText}
            ></ProtectedRoute>

            <ProtectedRoute
              exact
              path="/movies"
              loggedIn={loggedIn}
              onSearchMovies={handleSearchMovies}
              component={Movies}
              allMovies={allSearchedMovies}
              errorText={filmsErrorText}
            ></ProtectedRoute>

            <ProtectedRoute
              exact
              path="/saved-movies"
              loggedIn={loggedIn}
              component={SavedMovies}
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
