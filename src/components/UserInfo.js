export class UserInfo {
	constructor(nameElementSelector, aboutElementSelector, avatarElementSelector) {
		this._nameElem = document.querySelector(nameElementSelector);
		this._aboutElem = document.querySelector(aboutElementSelector);
		this._avatarElem = document.querySelector(avatarElementSelector);
	}

	getUserAvatar = () => {
		return {
			avatar: this._avatar
		}
	}

	getUserInfo = () => {
		return {
			name: this._userName,
			about: this._about
		}
	}

	setUserInfo = (newName, newAbout) => {
		this._userName = newName;
		this._about = newAbout;
	}

	setUserAvatar = (newAvatar) => {
		this._avatar = newAvatar;
	}

	updateUserInfo = () => {
		this._nameElem.textContent = this._userName;
		this._aboutElem.textContent = this._about;		
	}
	
	updateUserAvatar = () => {
		this._avatarElem.src = this._avatar;
	}
}