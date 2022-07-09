import ItemHTML from './ItemHTML.js';

export default class Item {

    static NAME_SELECTOR = '.item-link';
    static PRICE_SELECTOR = '.item-price';
    static ROOM_SELECTOR = '.item-detail-char .item-detail:nth-child(1)';
    static METERS_SELECTOR = '.item-detail-char .item-detail:nth-child(2)';
    static ADDITIONAL_INFORMATION_SELECTOR = '.item-detail-char .item-detail:nth-child(3)';

    constructor(htmlNode) {
        this._node = htmlNode;

        this.name = this._extractName();
        this.price = this._extractPrice();
        this.meters = this._extractMeters();
        this.priceMeter = this._extractPriceMeter();

        this.additionalInfo = this._extractAdditionalInfo();
        this.hasLift = this._extractLift();
        this.isExterior = this._extractExterior();
    }

    get _data() {
        return this._node.nextElementSibling;
    }

    refreshData() {
        this.removeData();
        this.addData();
    }

    isDataRendered() {
        const nextElement = this._data; 
        return nextElement.className
            && nextElement.className.includes(ItemHTML.CONTAINER_CLASS_NAME);
    }

    removeData() {
        if (!this.isDataRendered()) return;
        this._data.remove();
    }

    addData() {
        this._node.outerHTML += ItemHTML.createInformation(this);
    }

    isFlat() {
        return this.name.includes('Piso');
    }

    isHouse() {
        return this.name.includes('Casa');
    }

    isGround() {
        return this.name.includes('Bajo');
    }

    _extractName() {
        return this._node.querySelector(Item.NAME_SELECTOR).textContent;;
    }

    _extractPrice() {
        const priceText = this._node.querySelector(Item.PRICE_SELECTOR).textContent;
        return Number(priceText.replace('€', '').replace('.', '').replace(',', ''));
    }

    _extractMeters() {
        let metersText = this._node.querySelector(Item.METERS_SELECTOR).textContent;
        if (!metersText.includes('m²')) {
            metersText = this._node.querySelector(Item.ROOM_SELECTOR).textContent;
        }
        return Number(metersText.replace('m²', ''));
    }

    _extractPriceMeter() {
        return Math.round(this.price / this.meters);
    }

    _extractAdditionalInfo() {
        const additionalInfo = this._node.querySelector(Item.ADDITIONAL_INFORMATION_SELECTOR);
        if (!additionalInfo) return null;
        return additionalInfo.textContent;
    }

    _extractLift() {
        if (!this.additionalInfo) return false;
        return this.additionalInfo.includes('con ascensor');
    }

    _extractExterior() {
        if (!this.additionalInfo) return false;
        return this.additionalInfo.includes('exterior');
    }

}