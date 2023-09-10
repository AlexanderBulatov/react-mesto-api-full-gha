const { BASE_URL } = require('../utils/config');

class Api {
  constructor(apiConfig){
    this._initUrlApi = apiConfig.initUrlApi;
    this._authorization = apiConfig.headers.authorization;
    this._contentType = apiConfig.headers['Content-Type'];
  }

_answerHandle(serverAnswer){
  if (serverAnswer.ok) {
    return serverAnswer.json()
    .then((res) => res.data);
  }
  return Promise.reject(`Error: ${serverAnswer.status}`);
}


  getInitialCards() {
    return fetch(`${this._initUrlApi}/cards`,
      {
        credentials: "include",
        headers: {
        }
      }
    )
    .then(this._answerHandle);
  }

  getUserInfo(){
    return fetch(`${this._initUrlApi}/users/me`, 
    {
      credentials: "include",  
      headers: {
        }
      }
    )
    .then(this._answerHandle);
  }

  setUserInfo(name, about){
    return fetch(`${this._initUrlApi}/users/me`, 
    {
      credentials: "include",  
      method: 'PATCH',
        headers: {
          'Content-Type': this._contentType
        },
        body: JSON.stringify({
          name: name,
          about: about
        })
      }
    )
    .then(this._answerHandle);
  }

  setLike(cardId){
    return fetch(`${this._initUrlApi}/cards/${cardId}/likes`, 
    {
      credentials: "include",  
      method: 'PUT',
        headers: {
          'Content-Type': this._contentType
        }
      }
    )
    .then(this._answerHandle);
  }

  deleteLike(cardId){
    return fetch(`${this._initUrlApi}/cards/${cardId}/likes`, 
    {
        credentials: "include",
        method: 'DELETE',
        headers: {
          'Content-Type': this._contentType
        }
      }
    )
    .then(this._answerHandle);
  }

  changeLikeCardStatus (cardId, isLiked) {
    return isLiked ? this.setLike(cardId) : this.deleteLike(cardId);
  }

//---------------------

  setCard(name, link){
    return fetch(`${this._initUrlApi}/cards`,
      {
        credentials: "include",
        method: 'POST',
        headers: {
          'Content-Type': this._contentType
        },
        body: JSON.stringify({
          name: name,
          link: link
          }
        )
      }
    )
    .then(this._answerHandle);
  }

  deleteCard(cardId){
    return fetch(`${this._initUrlApi}/cards/${cardId}`, 
    {
      credentials: "include",  
      method: 'DELETE',
        headers: {
          'Content-Type': this._contentType
        }
      }
    )
    .then(this._answerHandle);
  }


  setAvatar(link){
    return fetch(`${this._initUrlApi}/users/me/avatar`,
      {
        credentials: "include",
        method: 'PATCH',
        headers: {
          'Content-Type': this._contentType
        },
        body: JSON.stringify({
          avatar: link
          }
        )
      }
    )
    .then(this._answerHandle);
  }
}

export const api = new Api({
  initUrlApi: BASE_URL,
  headers: {
    'Content-Type': 'application/json'
  }
});


//---- for testing API
// getHarryPotter(){
//   return fetch(`https://hp-api.onrender.com/api/characters`,
//     {
//       headers: {
//       }
//     }
//   )
//   .then(res => {
//       if (res.ok) {
//         return res.json();
//       }
//       return Promise.reject(`Error: ${res.status}`);
//     }
//   )
// }
