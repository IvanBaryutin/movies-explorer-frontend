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
  const [currentUserData, setCurrentUserData] = useState({});
  const history = useHistory();

  useEffect(() => {
    // если у пользователя есть токен в localStorage, проверим валидность токена
    const jwt = localStorage.getItem("jwt");
    if (jwt) {
      // проверим токен
      Auth.getContent(jwt)
        .then((res) => {
          if (res) {
            //console.log(res);
            // авторизуем пользователя
            setCurrentUserData(res);
            setLoggedIn(true);
            history.push("/");
          }
        })
        .catch((err) => {
          // попадаем сюда, если один из промисов завершится ошибкой
          console.log(err);
        });
    }
  }, [history]);

  // Регистрация нового пользователя
  function handleRegister(name, email, password) {
    Auth.register(name, email, password)
      .then((res) => {
        history.push("/signin");
      })
      .catch((err) => {
        console.log(`Ошибка ${err}`);
        console.log(err);
      });
  }

  return (
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
            <Register onRegister={handleRegister}/>
          </Route>
          <Route exact path="/signin">
            <Login />
          </Route>
          <Route path="*">
            <ErrorPage />
          </Route>
        </Switch>
      </div>
    </div>
  );
}

export default App;
