export default class UserInfo {
	constructor(nameElement, aboutElement, avatarElement) {
		this._nameElem = nameElement;
		this._aboutElem = aboutElement;
		this._avatarElem = avatarElement;
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