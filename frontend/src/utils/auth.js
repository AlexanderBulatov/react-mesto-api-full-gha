
const { BASE_URL } = require('../utils/config');

function answerHandle(serverAnswer){
  if (serverAnswer.ok) {
    return serverAnswer.json()
    .then((res) => res.data);
  }
  return Promise.reject(`Error: ${serverAnswer.status}`);
}

export const register = (password, email) => {
  return fetch(`${BASE_URL}/signup`, {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      password: password, 
      email: email})
  })
  .then(answerHandle);
}

export const authorize = (email, password) => {
  return fetch(`${BASE_URL}/signin`,
    {
      credentials: 'include',
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ email, password })
    })
    .then(answerHandle);
  
}; 

export const signOut = () => {
  return fetch(`${BASE_URL}/signout`,
    {
      credentials: 'include',
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
    })
    .then(answerHandle);

}; 

export const checkToken = () => {
  return fetch(`${BASE_URL}/users/me`, 
  {
    credentials: 'include',
    method: 'GET',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    }
  })
  .then((serverAnswer) => {
    if (serverAnswer.ok) {
      return serverAnswer.json()
      .then((res) => res.data);
    }
    return null;
  });
} 