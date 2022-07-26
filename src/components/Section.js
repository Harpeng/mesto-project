/** Отрисовка элементов на странице */

export class Section {
	constructor({items, renderer}, containerSelector){
		this._containerSelector = document.querySelector(containerSelector);
		this._items = items;
		this._renderer = renderer;
	}

	renderItem = () => {
		this._renderer(this._items);
	}

	renderItems = () => {
		this._items.reverse().forEach((item) => {
		this._renderer(item);
		})
	}

	addItem = (newCard) => {
		this._containerSelector.prepend(newCard)
	}
}
