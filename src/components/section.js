export default class Section{
    constructor({items, renderer}, containerSelector){
        this._containerSelector = containerSelector;
        this._items = items;
        this._renderer = renderer;
    }

    rendererItems = () => {
        this._items.reverse().forEach((data) => {
            return this.renderer(data);
        })
    }

    addItem = (newCard) => {
        this._containerSelector.prepend(newCard)
    }
}