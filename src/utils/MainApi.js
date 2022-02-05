export class MainApi {
  constructor(options) {
    this._baseUrl = options.baseUrl;
    this._headers = options.headers;
  }

  _checkToken = (headers) => {
    const token = localStorage.getItem("jwt");
    if (token) {
      this._headers["authorization"] = `Bearer ${localStorage.getItem("jwt")}`;
    }
    return headers;
  };

  _checkRequestResult = (res) => {
    if (res.ok) {
      console.log(res);
      return res.json();
    }
    console.log(res);
    // если ошибка, отклоняем промис
    // return Promise.reject(`Ошибка: ${res.status}`);
    return res.json().then(err => { throw err; });
  };

  register = (name, email, password) => {
    return fetch(`${this._baseUrl}/signup`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({ name, email, password }),
    }).then((res) => this._checkRequestResult(res));
  };

  authorize = (email, password) => {
    return fetch(`${this._baseUrl}/signin`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ email, password })
    }).then((res) => this._checkRequestResult(res));
  }

  getUserInfo = () => {
    return fetch(`${this._baseUrl}/users/me`, {
      method: "GET",
      headers: this._checkToken(this._headers),
    }).then((res) => this._checkRequestResult(res));
  };

  setUserInfo = (user) => {
    this._headers["Content-Type"] = "application/json";
    return fetch(`${this._baseUrl}/users/me`, {
      method: "PATCH",
      headers: this._checkToken(this._headers),
      body: JSON.stringify({
        name: user.name,
        email: user.email,
      }),
    }).then((res) => this._checkRequestResult(res));
  };

  getAllSavedMovies() {
    return fetch(`${this._baseUrl}/movies`, {
      method: "GET",
      headers: this._checkToken(this._headers),
    }).then((res) => this._checkRequestResult(res));
  }

  addMovie = (movie) => {
    this._headers["Content-Type"] = "application/json";
    return fetch(`${this._baseUrl}/movies`, {
      method: "POST",
      headers: this._checkToken(this._headers),
      body: JSON.stringify({
        country: movie.country,
        director: movie.director,
        duration: movie.duration,
        year: movie.duration,
        description: movie.description,
        image: movie.image,
        trailer: movie.trailer,
        nameRU: movie.nameRU,
        nameEN: movie.nameEN,
        thumbnail: movie.thumbnail,
        movieId: movie.movieId,
      }),
    }).then((res) => this._checkRequestResult(res));
  };

  deleteMovie = (movieId) => {
    this._headers["Content-Type"] = "application/json";
    return fetch(`${this._baseUrl}/cards/${movieId}`, {
      method: "DELETE",
      headers: this._checkToken(this._headers),
    }).then((res) => this._checkRequestResult(res));
  };
}

const mainApi = new MainApi({
  // baseUrl: 'https://api.the-mesto.students.nomoredomains.rocks',
  baseUrl: "http://localhost:3000",
  headers: {
    // authorization: '1e5c33de-1f37-4db9-b61a-be6eb6c35223',
    "Access-Control-Allow-Origin": "origin-list",
  },
});

export default mainApi;
