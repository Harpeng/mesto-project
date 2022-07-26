export class Api {
  constructor(url, headers) {
    this._url = url;
    this._cardsUrl = `${this._url}/cards`;
    this._usersUrl = `${this._url}/users/me`;
    this._userAvatarUrl = `${this._usersUrl}/avatar`;
    this._headers = headers;
  }

  _getResponce(res) {
    return res.ok ? res.json() : Promise.reject('Сервер недоступен');
  }

  _getAllCards() {
    return fetch(this._cardsUrl, {
      method: "GET",
      headers: this._headers
    })
    .then(this._getResponce)
  }

  _getUserInfo() {
    return fetch(this._usersUrl, {
      method: "GET",
      headers: this._headers
    })
    .then(this._getResponce)
  }

  getAllInfo() {
    return Promise.all([this._getAllCards(), this._getUserInfo()])
  }

  addCards(data) {
    return fetch(this._cardsUrl, {
       method: "POST",
       headers: this._headers,
       body: JSON.stringify(data)
    })
    .then(this._getResponce)
  }

  editProfile(data) {
    return fetch(this._usersUrl, {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify(data)
    })
    .then(this._getResponce)
  }

  replaceUserAvatar(avatarLink) {
    return fetch(this._userAvatarUrl, {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify(avatarLink)
    })
    .then(this._getResponce)
  }

  deleteCard(cardId) {
    return fetch(`${this._cardsUrl}/${cardId}`, {
      method: "DELETE",
      headers: this._headers
    })
    .then(this._getResponce)
  }
  
  changeLikeCondition(cardId, isLike) {
    return fetch(`${this._cardsUrl}/likes/${cardId}`, {
      method: isLike ? "DELETE" : "PUT",
      headers: this._headers
    })
    .then(this._getResponce)
  }
}
