import React, { useState, useEffect } from "react";
import { Route, Switch, useLocation } from "react-router-dom";
import { useHistory } from "react-router";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";

import ProtectedRoute from "../ProtectedRoute/ProtectedRoute.js"; // импортируем HOC

import Header from "../Header/Header";
import Main from "../Main/Main";
import Movies from "../Movies/Movies";
import SavedMovies from "../SavedMovies/SavedMovies";

import Register from "../Register/Register";
import Login from "../Login/Login";
import Profile from "../Profile/Profile";
import ErrorPage from "../ErrorPage/ErrorPage";
import Footer from "../Footer/Footer";

import mainApi from "../../utils/MainApi";
import moviesApi from "../../utils/MoviesApi";

import "./App.css";

function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [currentUser, setCurrentUser] = useState({});

  const [formErrorText, setFormErrorText] = useState("");
  const [filmsErrorText, setfilmsErrorText] = useState("");

  const [registerButtonText, setRegisterButtonText] =
    useState("Зарегистрироваться");
  const [loginButtonText, setLoginButtonText] = useState("Войти");
  const [profileButtonText, setprofileButtonText] = useState("Редактировать");

  const [allMovies, setAllMovies] = useState([]);
  const [allSearchedMovies, setAllSearchedMovies] = useState([]);
  const [allSavedMovies, setAllSavedMovies] = useState([]);

  const history = useHistory();
  const location = useLocation();

  useEffect(() => {
    // Загружаем первоначальную информация с сервера
    mainApi
      .getUserInfo()
      .then((res) => {
        if (res) {
          // авторизуем пользователя
          setCurrentUser(res);
          //setLoggedIn(true);
        }
      })
      .catch((err) => {
        // попадаем сюда, если один из промисов завершится ошибкой
        console.log(err);
      });
  }, [loggedIn]);

  // Проверяем токен
  useEffect(() => {
    // если у пользователя есть токен в localStorage, проверим валидность токена
    const jwt = localStorage.getItem("jwt");
    if (jwt) {
      // проверим токен
      mainApi
        .getUserInfo()
        .then((res) => {
          if (res) {
            // авторизуем пользователя
            setCurrentUser(res);
            setLoggedIn(true);
            history.push("/movies");
          }
        })
        .catch((err) => {
          // попадаем сюда, если один из промисов завершится ошибкой
          console.log(err);
        });
    }
  }, [history]);

  useEffect(() => {
    // Загружаем сохраненные в базу данных карточки
    mainApi
      .getAllSavedMovies()
      .then((res) => {
        // Фильтруем по id текущего пользователя
        const savedByUserMovies = res.filter(
          (item) => item.owner === currentUser._id
        );
        setAllSavedMovies(savedByUserMovies);
        // Сохраняем список сохраненных карточек в хранилище браузера
        localStorage.setItem(
          "allSavedMovies",
          JSON.stringify(savedByUserMovies)
        );
      })
      .catch((err) => {
        setfilmsErrorText(
          "Во время запроса произошла ошибка. Возможно, проблема с соединением или сервер недоступен. Подождите немного и попробуйте ещё раз"
        );
        console.log(`Ошибка ${err}`);
      });
  }, [loggedIn]);

  // Регистрация нового пользователя
  function handleRegister(name, email, password) {
    setRegisterButtonText("Загрузка...");
    mainApi
      .register(name, email, password)
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
    mainApi
      .authorize(email, password)
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
        }
      })
      .finally(() => {
        setLoginButtonText("Войти");
      });
  }

  // Выход
  function handleSignOut() {
    localStorage.removeItem("jwt");
    localStorage.removeItem("allMovies");
    localStorage.removeItem("allSearchedMovies");
    localStorage.removeItem("allSavedMovies");
    setLoggedIn(false);
    setCurrentUser({});
    setFormErrorText("");
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
  async function getAllMovies() {
    if (!localStorage.getItem("allMovies")) {
      setIsLoading(true);
      await moviesApi
        .getAllMovies()
        .then((res) => {
          setAllMovies(res);
          localStorage.setItem("allMovies", JSON.stringify(res));
          console.log(res);
        })
        .catch((err) => {
          setfilmsErrorText(
            "Во время запроса произошла ошибка. Возможно, проблема с соединением или сервер недоступен. Подождите немного и попробуйте ещё раз"
          );
          // console.log(`Ошибка ${err}`);
          setFormErrorText(err.message);
        })
        .finally(() => setIsLoading(false));
    }
  }

  function handleSearchMovies(queryData) {
    // updateWidth();
    if (queryData.query === "") {
      setfilmsErrorText("Нужно ввести ключевое слово");
      return;
    }

    getAllMovies()
      .then(() => {
        setfilmsErrorText("");
        const cachedMovies = JSON.parse(localStorage.getItem("allMovies"));
        setAllSearchedMovies(filterMovies(cachedMovies, queryData));
        console.log(allSearchedMovies);
      })
      .catch((err) => {
        setfilmsErrorText(
          "Во время запроса произошла ошибка. Возможно, проблема с соединением или сервер недоступен. Подождите немного и попробуйте ещё раз"
        );
        //console.log(`Ошибка ${err}`);
        setFormErrorText(err.message);
      });
  }

  function filterMovies(moviesArr, queryData) {
    const { query = "", shorts = false } = queryData;
    let filteredMovies;
    if (moviesArr) {
      filteredMovies = moviesArr.filter(function (movie) {
        if (movie.nameRU.toLowerCase().includes(query.toLowerCase())) {
          return true;
        }
      });
      if (shorts === true) {
        filteredMovies = filteredMovies.filter(function (movie) {
          if (movie.duration < 40) {
            return true;
          }
        });
      }
    }
    return filteredMovies.map(function (element) {
      element.movieId = element.id;
      return element;
    });
  }

  function handleAddMovieCard(movie) {
    movie.owner = currentUser._id;
    mainApi
      .addMovie(movie)
      .then((res) => {
        setAllSavedMovies([...allSavedMovies, res]);
        localStorage.setItem("allSavedMovies", JSON.stringify(allSavedMovies));
      })
      .catch((err) => {
        setfilmsErrorText(
          "Во время запроса произошла ошибка. Возможно, проблема с соединением или сервер недоступен. Подождите немного и попробуйте ещё раз"
        );
        // console.log(`Ошибка ${err}`);
        //setFormErrorText(err.message);
        console.log(err);
      });
  }

  function handleDeleteMovieCard(movie) {
    console.log(movie.owner);
    console.log(movie.id);
    // const currentMovieCard = allSavedMovies.find(item => item.movieId == movieId);
    /*
    mainApi
      .deleteMovie(currentMovieCard._id)
      .then((res) => {
        //console.log(allSavedMovies.filter(item => item._id !== currentMovieCard._id));
        setAllSavedMovies(
          allSavedMovies.filter((item) => item._id !== currentMovieCard._id)
        );
        localStorage.setItem("allSavedMovies", JSON.stringify(allSavedMovies));
      })
      .catch((err) => {
        setfilmsErrorText(
          "Во время запроса произошла ошибка. Возможно, проблема с соединением или сервер недоступен. Подождите немного и попробуйте ещё раз"
        );
        console.log(`Ошибка ${err}`);
        // console.log(err);
      });
      */
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div>
        <div className="page">
          <Header logged={loggedIn} />

          <Switch>
            <Route exact path="/signup">
              <Register
                onRegister={handleRegister}
                errorText={formErrorText}
                buttonText={registerButtonText}
              />
            </Route>

            <Route exact path="/signin">
              <Login
                onLogin={handleLogin}
                errorText={formErrorText}
                buttonText={loginButtonText}
              />
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
              isLoading={isLoading}
              onSearchMovies={handleSearchMovies}
              component={Movies}
              allSearchedMovies={allSearchedMovies}
              allSavedMovies={allSavedMovies}
              onAddMovieCard={handleAddMovieCard}
              onDeleteMovieCard={handleDeleteMovieCard}
              errorText={filmsErrorText}
            ></ProtectedRoute>

            <ProtectedRoute
              exact
              path="/saved-movies"
              loggedIn={loggedIn}
              component={SavedMovies}
              allSavedMovies={allSavedMovies}
              allSearchedMovies={allSearchedMovies}
              onDeleteMovieCard={handleDeleteMovieCard}
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
