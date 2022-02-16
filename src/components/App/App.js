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

import { SHORTFILMDURATION } from "../../constants/constants";

import "./App.css";

function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [currentUser, setCurrentUser] = useState({});

  const [formErrorText, setFormErrorText] = useState("");
  const [filmsErrorText, setFilmsErrorText] = useState("");

  const [registerButtonText, setRegisterButtonText] =
    useState("Зарегистрироваться");
  const [loginButtonText, setLoginButtonText] = useState("Войти");
  const [profileButtonText, setprofileButtonText] = useState("Редактировать");

  const [allMovies, setAllMovies] = useState([]);
  //const [allSearchedMovies, setAllSearchedMovies] = useState([]);
  const [allSearchedMovies, setAllSearchedMovies] = useState(
    JSON.parse(localStorage.getItem("allSearchedMovies")) || []
  );
  const [allSavedMovies, setAllSavedMovies] = useState([]);
  const [allSearchedSavedMovies, setAllSearchedSavedMovies] = useState([]);

  const [moviesTextQuery, setMoviesTextQuery] = useState(
    localStorage.getItem("moviesTextQuery")
      ? localStorage.getItem("moviesTextQuery")
      : ""
  );
  const [moviesFilterCheckBox, setMoviesFilterCheckBox] = useState(
    localStorage.getItem("moviesFilterCheckBox")
      ? localStorage.getItem("moviesFilterCheckBox")
      : ""
  );
  const [savedMoviesTextQuery, setSavedMoviesTextQuery] = useState(
    localStorage.getItem("savedMoviesTextQuery")
      ? localStorage.getItem("savedMoviesTextQuery")
      : ""
  );
  const [savedMoviesFilterCheckBox, setSavedMoviesFilterCheckBox] = useState(
    localStorage.getItem("savedMoviesFilterCheckBox")
      ? localStorage.getItem("savedMoviesFilterCheckBox")
      : ""
  );

  const history = useHistory();
  const location = useLocation();

  useEffect(() => {
    localStorage.setItem("moviesFilterCheckBox", moviesFilterCheckBox);
  }, [moviesFilterCheckBox]);

  useEffect(() => {
    localStorage.setItem("savedMoviesFilterCheckBox", savedMoviesFilterCheckBox);
  }, [savedMoviesFilterCheckBox]);

  useEffect(() => {
    setFormErrorText("");
    setFilmsErrorText("");
  }, [location]);

  useEffect(() => {
    // Загружаем первоначальную информация с сервера
    if (loggedIn) {
      mainApi
        .getUserInfo()
        .then((res) => {
          if (res) {
            // авторизуем пользователя
            setCurrentUser(res);
          }
        })
        .catch((err) => {
          // попадаем сюда, если один из промисов завершится ошибкой
          console.log(err);
        });
    }
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
            if (
              location.pathname === "/signup" ||
              location.pathname === "/signin"
            ) {
              history.push("/movies");
            } else {
              history.push(location.pathname);
            }
          }
        })
        .catch((err) => {
          // попадаем сюда, если один из промисов завершится ошибкой
          console.log(err);
        });
    }
  }, [history]);

  // Загружаем, сохраненные в базу данных, карточки
  useEffect(() => {
    if (loggedIn) {
      setFilmsErrorText("");
      mainApi
        .getAllSavedMovies()
        .then((res) => {
          // Фильтруем по id текущего пользователя
          const savedByUserMovies = res.filter(
            (item) => item.owner === currentUser._id
          );
          setAllSavedMovies(savedByUserMovies);
          setAllSearchedSavedMovies(savedByUserMovies);
          // Сохраняем список сохраненных карточек пользователя в хранилище браузера
          localStorage.setItem(
            "allSavedMovies",
            JSON.stringify(savedByUserMovies)
          );
          showSearchedSavedMovies({query: savedMoviesTextQuery, shorts: savedMoviesFilterCheckBox });
        })
        .catch((err) => {
          setFilmsErrorText(
            "При загрузке сохраненных фильмов произошла ошибка. Возможно, проблема с соединением или сервер недоступен. Подождите немного и попробуйте ещё раз"
          );
          //console.log(`Ошибка ${err}`);
          console.log(err);
        });
    }
  }, [loggedIn, currentUser]);

  function handleSearchMovies(queryData) {
    localStorage.setItem("moviesTextQuery", moviesTextQuery);
    localStorage.setItem("moviesFilterCheckBox", moviesFilterCheckBox);

    if (queryData.query === "") {
      setAllSearchedMovies([]);
      setFilmsErrorText("Нужно ввести ключевое слово");
      return;
    }
    if (!localStorage.getItem("allMovies")) {
      setIsLoading(true);
      moviesApi
        .getAllMovies()
        .then((res) => {
          localStorage.setItem("allMovies", JSON.stringify(res));
          setAllMovies(res);
          showSearchedMovies(queryData);
        })
        .catch((err) => {
          setFilmsErrorText(
            "Запрос всех карточек с сервиса: Во время запроса произошла ошибка. Возможно, проблема с соединением или сервер недоступен. Подождите немного и попробуйте ещё раз"
          );
          // console.log(`Ошибка ${err}`);
          setFormErrorText(err.message);
          console.log(err);
        })
        .finally(() => setIsLoading(false));
    } else {
      showSearchedMovies(queryData);
    }
  }

  function showSearchedMovies(queryData) {
    const cachedMovies = JSON.parse(localStorage.getItem("allMovies"));
    const searchedMovies = filterMovies(cachedMovies, queryData);
    setAllSearchedMovies(searchedMovies);
    localStorage.setItem("allSearchedMovies", JSON.stringify(searchedMovies));
  }

  function handleSearchSavedMovies(queryData) {
    if (queryData.query === "") {
      setFilmsErrorText("Нужно ввести ключевое слово");
      return;
    }

    showSearchedSavedMovies(queryData);
  }

  function showSearchedSavedMovies(queryData) {
    const cachedSavedMovies = JSON.parse(
      localStorage.getItem("allSavedMovies")
    );
    const searchedSavedMovies = filterMovies(cachedSavedMovies, queryData);
    setAllSearchedSavedMovies(searchedSavedMovies);
    localStorage.setItem(
      "allSearchedSavedMovies",
      JSON.stringify(searchedSavedMovies)
    );
  }

  function filterMovies(moviesArr, queryData) {
    const { query = "", shorts = "" } = queryData;
    let filteredMovies;
    if (moviesArr) {
      filteredMovies = moviesArr.filter(function (movie) {
        if (movie.nameRU.toLowerCase().includes(query.toLowerCase())) {
          return true;
        } else {
          return false;
        }
      });
      if (shorts === "checked") {
        filteredMovies = filteredMovies.filter(function (movie) {
          if (movie.duration < SHORTFILMDURATION) {
            return true;
          } else {
            return false;
          }
        });
      } else {
        filteredMovies = filteredMovies.filter(function (movie) {
          if (movie.duration >= SHORTFILMDURATION) {
            return true;
          } else {
            return false;
          }
        });
      }
    }
    const searchResultText = !filteredMovies.length ? "Ничего не найдено" : "";
    setFilmsErrorText(searchResultText);
    return filteredMovies;
  }

  function handleAddMovieCard(movie) {
    movie.owner = currentUser._id;
    mainApi
      .addMovie(movie)
      .then((res) => {
        setFilmsErrorText("");
        setAllSavedMovies([...allSavedMovies, res]);
        setAllSearchedSavedMovies([...allSearchedSavedMovies, res]);
        localStorage.setItem("allSavedMovies", JSON.stringify(allSavedMovies));
      })
      .catch((err) => {
        setFilmsErrorText(
          "Добавление фильма: Во время запроса произошла ошибка. Возможно, проблема с соединением или сервер недоступен. Подождите немного и попробуйте ещё раз"
        );
        console.log(err);
      });
  }

  function handleDeleteMovieCard(id) {
    mainApi
      .deleteMovie(id)
      .then((res) => {
        setFilmsErrorText("");
        setAllSavedMovies(allSavedMovies.filter((item) => item._id !== id));
        setAllSearchedSavedMovies(
          allSearchedSavedMovies.filter((item) => item._id !== id)
        );
        localStorage.setItem("allSavedMovies", JSON.stringify(allSavedMovies));
      })
      .catch((err) => {
        setFilmsErrorText(err.message);
        // console.log(`Ошибка ${err}`);
        console.log(err);
      });
  }

  // Регистрация нового пользователя
  function handleRegister(name, email, password) {
    setIsLoading(true);
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
      .finally(() => {
        setRegisterButtonText("Зарегистрироваться");
        setIsLoading(false);
      });
  }

  // Авторизация
  function handleLogin(email, password) {
    if (email === "" || password === "") {
      return;
    }
    setIsLoading(true);
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
        setIsLoading(false);
      });
  }

  // Выход
  function handleSignOut() {
    localStorage.removeItem("jwt");

    setAllMovies([]);
    localStorage.removeItem("allMovies");

    setAllSearchedMovies([]);
    localStorage.removeItem("allSearchedMovies");

    setAllSearchedSavedMovies([]);
    localStorage.removeItem("allSearchedSavedMovies");

    setAllSavedMovies([]);
    localStorage.removeItem("allSavedMovies");

    setMoviesTextQuery("");
    localStorage.removeItem("moviesTextQuery");
    setMoviesFilterCheckBox("");
    localStorage.removeItem("moviesFilterCheckBox");

    setLoggedIn(false);
    setCurrentUser({});
    setFormErrorText("");
    history.push("/");
  }

  // Обновление профиля
  function handleUpdate(name, email) {
    setIsLoading(true);
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
        setIsLoading(false);
      });
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div>
        <div className="page">
          <Header logged={loggedIn} />

          <Switch>
            <Route exact path="/">
              <Main />
            </Route>

            <Route exact path="/signup">
              <Register
                onRegister={handleRegister}
                errorText={formErrorText}
                buttonText={registerButtonText}
                isLoading={isLoading}
              />
            </Route>

            <Route exact path="/signin">
              <Login
                onLogin={handleLogin}
                errorText={formErrorText}
                buttonText={loginButtonText}
                isLoading={isLoading}
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
              isLoading={isLoading}
            ></ProtectedRoute>

            <ProtectedRoute
              exact
              path="/movies"
              loggedIn={loggedIn}
              isLoading={isLoading}
              component={Movies}
              onSearchMovies={handleSearchMovies} // Функция поиска по фильмам
              allSearchedMovies={allSearchedMovies} // Все найденные по запросу фильмы
              allSavedMovies={allSavedMovies} // Все сохраненные фильмы
              allSearchedSavedMovies={allSearchedSavedMovies} // Все найденные по запросу сохраненные фильмы
              onAddMovieCard={handleAddMovieCard}
              onDeleteMovieCard={handleDeleteMovieCard}
              errorText={filmsErrorText}
              textQuery={moviesTextQuery}
              setTextQuery={setMoviesTextQuery}
              filterCheckBox={moviesFilterCheckBox}
              setfilterCheckBox={setMoviesFilterCheckBox}
              onChangeFilterCheckbox={showSearchedMovies}
            ></ProtectedRoute>

            <ProtectedRoute
              exact
              path="/saved-movies"
              loggedIn={loggedIn}
              component={SavedMovies}
              onSearchMovies={handleSearchSavedMovies} // Функция поиска по сохраненным фильмам
              allSearchedMovies={allSearchedMovies} // Все найденные по запросу фильмы
              allSavedMovies={allSavedMovies} // Все сохраненные фильмы
              allSearchedSavedMovies={allSearchedSavedMovies} // Все найденные по запросу сохраненные фильмы
              onAddMovieCard={handleAddMovieCard}
              onDeleteMovieCard={handleDeleteMovieCard}
              errorText={filmsErrorText}
              textQuery={savedMoviesTextQuery}
              setTextQuery={setSavedMoviesTextQuery}
              filterCheckBox={savedMoviesFilterCheckBox}
              setfilterCheckBox={setSavedMoviesFilterCheckBox}
              onChangeFilterCheckbox={showSearchedSavedMovies}
            ></ProtectedRoute>

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
