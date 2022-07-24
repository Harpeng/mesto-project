export default class Section{
    constructor(containerSelector, {items, renderer}){
        console.log('items', items);
        console.log(' renderer',  renderer);

        this._containerSelector = containerSelector;
        this._items = items;
        this._renderer = renderer;
    }

    renderItem(){ //object data
        this._renderer(this._items)
    }

    rendererItems = () => {
        this._items.reverse().forEach((item) => {
        this._renderer(item);
        })
    }

    addItem = (newCard) => {
        this._containerSelector.prepend(newCard)
    }
}