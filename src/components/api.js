const config = {
    url: "https://mesto.nomoreparties.co/v1",
    groupId: `plus-cohort-13`,
    headers: {
        "Content-type": 'application/json',
        "Authorization": '0840f0ca-62bb-451b-9a78-75b4cfb3cc54'
    }
  }
  
  function onResponce(res){
    console.log(res);
    return res.ok ? res.json() : Promise.reject('Сервер не доступен')
  }
  
   function getAllCards() {
   return fetch(`${config.url}/${config.groupId}/cards`, {
      method: "GET",
      headers: config.headers
    })
    .then(onResponce)
  }

  function getUserInfo() {
    return fetch(`${config.url}/${config.groupId}/users/me`, {
        method: "GET",
        headers: config.headers
      })
      .then(onResponce)
  }
  
  function addCards(data) {
    return fetch(`${config.url}/${config.groupId}/cards`, {
       method: "POST",
       headers: config.headers,
       body: JSON.stringify(data)
     })
     .then(onResponce)
   }

   function editProfile(data) {
    return fetch(`${config.url}/${config.groupId}/users/me`, {
       method: "PATCH",
       headers: config.headers,
       body: JSON.stringify(data)
     })
     .then(onResponce)
   }

   function replaceUserAvatar(avatarLink) {
    return fetch(`${config.url}/${config.groupId}/users/me/avatar`, {
        method: "PATCH",
        headers: config.headers,
        body: JSON.stringify(avatarLink)
      })
      .then(onResponce)
    }
   

   function deleteCards(cardId) {
    return fetch(`${config.url}/${config.groupId}/cards/${cardId}`, {
       method: "DELETE",
       headers: config.headers,
     })
     .then(onResponce)
   }

   function changeLikeCondition(cardId, isLike) {
    return fetch(`${config.url}/${config.groupId}/cards/likes/${cardId}`, {
       method: isLike ? "DELETE" : "PUT",
       headers: config.headers
     })
     .then(onResponce)
   }

   function getAllInfo() {
    return Promise.all([getAllCards(), getUserInfo()])
   }




   export {changeLikeCondition, getUserInfo, getAllInfo, getAllCards, addCards, editProfile, deleteCards, replaceUserAvatar};

  