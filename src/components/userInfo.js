export default class UserInfo {
    constructor(nameElement, aboutElement) {
        this._nameElem = nameElement;
        this._aboutElem = aboutElement;
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

    updateUserInfo = () => {
        this._nameElem.textContent = this._userName;
        this._aboutElem.textContent = this._about;
      }
}