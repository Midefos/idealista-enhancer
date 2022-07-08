import Item from './Item.js';
import ItemHTML from './ItemHTML.js';
import Log from './Log.js';

export default class Information {
    
    static CLASS_NAME = 'midefos-idealista-container';
    static ITEM_SELECTOR = 'article.item';

    static create() {
        Log.debug(`Creating information...`)
        const items = document.querySelectorAll(this.ITEM_SELECTOR);
        for (const _item of items) {
            const item = new Item(_item);
            const currentInformation = _item.querySelector(`.${this.CLASS_NAME}`);
            if (currentInformation) currentInformation.remove();
            _item.innerHTML += ItemHTML.createInformation(item);
        }
    }

}