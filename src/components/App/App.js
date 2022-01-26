import React from "react";
import { Route, Switch } from "react-router-dom";
import "./App.css";
import Header from "../Header/Header";
import Main from "../Main/Main";
import Footer from "../Footer/Footer";
import AboutMe from "../AboutMe/AboutMe";
import SavedMovies from "../SavedMovies/SavedMovies";
import Register from "../Register/Register";
import Login from "../Login/Login";
import ErrorPage from "../ErrorPage/ErrorPage";
import Profile from "../Profile/Profile";
import Movies from "../Movies/Movies";

function App() {
  return (
    <div>
      <div className="page">
        <Switch>
          <Route exact path="/profile">
            <Header />
            <Profile />
          </Route>
          <Route exact path="/">
            <Header />
            <Main />
            <Footer />
          </Route>
          <Route exact path="/saved-movies">
            <Header />
            <SavedMovies />
            <Footer />
          </Route>
          <Route exact path="/movies">
            <Header />
            <Movies />
            <Footer />
          </Route>
          <Route exact path="/signup">
            <Register />
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
