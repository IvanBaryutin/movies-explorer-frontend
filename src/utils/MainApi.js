export class MainApi {
  constructor(options) {
    this._baseUrl = options.baseUrl;
    this._headers = options.headers;
  }

  _checkToken = (headers) => {
    const token = localStorage.getItem('jwt');
    if (token) {
      this._headers['authorization'] = `Bearer ${localStorage.getItem('jwt')}`;
    }
    return headers;
  }

  _checkRequestResult = (res) => {
    if (res.ok) {
      return res.json();
    }
    // если ошибка, отклоняем промис
    return Promise.reject(`Ошибка: ${res.status}`);
  }

  getUserInfo = () => {
    return fetch(`${this._baseUrl}/users/me`, {
      method: 'GET',
      headers: this._checkToken(this._headers),
    })
      .then((res) => this._checkRequestResult(res))
  }

  setUserInfo = (user) => {
    this._headers['Content-Type'] = 'application/json';
    return fetch(`${this._baseUrl}/users/me`, {
      method: 'PATCH',
      headers: this._checkToken(this._headers),
      body: JSON.stringify({
        name: user.name,
        about: user.about
      })
    })
      .then((res) => this._checkRequestResult(res))
  }

  getAllSavedMovies() {
    return fetch(`${this._baseUrl}/movies`, {
      method: 'GET',
      headers: this._checkToken(this._headers),
    })
      .then((res) => this._checkRequestResult(res))
  }

  addMovie = (movie) => {
    this._headers['Content-Type'] = 'application/json';
    return fetch(`${this._baseUrl}/movies`, {
      method: 'POST',
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
      })
    })
      .then((res) => this._checkRequestResult(res))
  }

  deleteMovie = (movieId) => {
    this._headers['Content-Type'] = 'application/json';
    return fetch(`${this._baseUrl}/cards/${movieId}`, {
      method: 'DELETE',
      headers: this._checkToken(this._headers),
    })
      .then((res) => this._checkRequestResult(res))
  }

  getUserInfo = () => {
    return fetch(`${this._baseUrl}/users/me`, {
      method: 'GET',
      headers: this._checkToken(this._headers),
    })
      .then((res) => this._checkRequestResult(res))
  }

}

const api = new Api({
  baseUrl: 'https://api.diploma.nomoredomains.rocks',
  headers: {
    // authorization: '1e5c33de-1f37-4db9-b61a-be6eb6c35223',
    'Access-Control-Allow-Origin': 'origin-list',
  }
});

export default MainApi;
