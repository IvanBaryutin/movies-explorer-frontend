import React, { useState, useEffect } from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import { useHistory } from "react-router";
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
// import ProtectedRoute from "./ProtectedRoute.js"; // импортируем HOC
import * as Auth from "../../utils/auth";
import mainApi from "../../utils/MainApi";

function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState({});
  const [formErrorText, setFormErrorText] = React.useState("");
  const history = useHistory();

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
            console.log(res);
            // авторизуем пользователя
            setCurrentUser(res);
            console.log(currentUser);
            setLoggedIn(true);
            history.push("/");
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
    Auth.register(name, email, password)
      .then((res) => {
        history.push("/signin");
      })
      .catch((err) => {
        setFormErrorText(err.message);
        console.log(`Ошибка ${err}`);
      });
  }

  // Авторизация
  function handleLogin(email, password) {
    if (email === "" || password === "") {
      return;
    }
    Auth.authorize(email, password)
      .then((data) => {
        if (data.token) {
          //console.log(data.token);
          localStorage.setItem("jwt", data.token);
          //handleLogin(email);
          history.push("/");
        }
      })
      .catch((err) => {
        //console.log(`Ошибка ${err}`)
        if (err.message) {
          setFormErrorText(err.message);
          //setSubmitResult({ status: 'error', message: err.message })
        }
      });
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div>
        <div className="page">
          <Switch>
            <Route exact path="/profile">
              <Header logged={loggedIn} />
              <Profile />
            </Route>
            <Route exact path="/">
              <Header logged={loggedIn} />
              <Main />
              <Footer />
            </Route>
            <Route exact path="/saved-movies">
              <Header logged={loggedIn} />
              <SavedMovies />
              <Footer />
            </Route>
            <Route exact path="/movies">
              <Header logged={loggedIn} />
              <Movies />
              <Footer />
            </Route>
            <Route exact path="/signup">
              <Register onRegister={handleRegister} errorText={formErrorText} />
            </Route>
            <Route exact path="/signin">
              <Login onLogin={handleLogin} errorText={formErrorText} />
            </Route>
            <Route path="*">
              <ErrorPage />
            </Route>
          </Switch>
        </div>
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
