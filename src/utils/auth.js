//export const BASE_URL = 'https://api.diploma.nomoredomains.rocks';
export const BASE_URL = 'http://localhost:3000';


const checkRequestResult = (res) => {
  if (res.ok) {
    console.log(res);
    return res.json();
  }
  return res.json().then(err => {throw err;});
}

export const register = (name, email, password) => {
  return fetch(`${BASE_URL}/signup`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
    },
    body: JSON.stringify({name, email, password})
  })
    .then((res) => checkRequestResult(res))
}

export const  authorize = (email, password) => {
  return fetch(`${BASE_URL}/signin`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({email, password})
  })
    .then((res) => checkRequestResult(res))
}

export const  getContent = (token) => {
  return fetch(`${BASE_URL}/users/me`, {
    method: 'GET',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    }
  })
    .then((res) => checkRequestResult(res))
}
