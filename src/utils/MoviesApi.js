export class MoviesApi {
  constructor(options) {
    this._baseUrl = options.baseUrl;
    this._headers = options.headers;
  }


  _checkRequestResult = (res) => {
    if (res.ok) {
      return res.json();
    }
    return res.json().then(err => {throw err;});
  };

  getAllMovies() {
    return fetch(`${this._baseUrl}/beatfilm-movies`, {
      method: "GET",
      headers: this._headers,
    }).then((res) => this._checkRequestResult(res));
  }
}

const moviesApi = new MoviesApi({
  baseUrl: "https://api.nomoreparties.co",
  headers: {
    "Accept": "application/json",
    "Content-Type": "application/json",
  },
});

export default moviesApi;
