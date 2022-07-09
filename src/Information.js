import Item from './Item.js';
import Log from './Log.js';

export default class Information {
    
    static CLASS_NAME = 'midefos-idealista-container';
    static ITEM_SELECTOR = 'article.item';

    static create() {
        const items = document.querySelectorAll(this.ITEM_SELECTOR);
        Log.debug(`Creating information for ${items.length} items...`)
        for (const itemNode of items) {
            const item = new Item(itemNode);
            item.refreshData();
        }
    }

}