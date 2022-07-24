export default class Section{
    constructor(containerSelector, {items, renderer}){
        this._containerSelector = containerSelector;
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