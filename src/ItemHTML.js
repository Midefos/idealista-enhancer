import Preferences from "./Preferences.js";

export default class ItemHTML {

    static CONTAINER_CLASS_NAME = 'midefos-idealista-container';
    static get CONTAINER_SELECTOR() {
        return `.${this.CONTAINER_CLASS_NAME}`;
    }

    static createInformation(item) {
        return `
        <div class='${this.CONTAINER_CLASS_NAME}'>
            ${this._createPercentagePriceHTML(item)}
            ${this._createPriceHTML(item)}
            ${this._createPriceMeterHTML(item)}
            ${this._createLiftHTML(item)}
            ${this._createInteriorHTML(item)}
        </div>`
    }
    
    static _createPercentagePriceHTML(item) {
        if (!Preferences.get('percentages')) return ``;
    
        const twentyPercent = Math.round(item.price * 20 / 100);
        const thirtyPercent = Math.round(item.price * 30 / 100);
        return `
        <span>
            <strong>20%:</strong> ${twentyPercent}€ <br>
            <strong>30%:</strong> ${thirtyPercent}€
        </span>`;
    }
    
    
    static _createPriceHTML(item) {
        const desiredPrice = Preferences.get('max-price');
        const desiredTwentyFivePercentMore = Math.round(desiredPrice * 1.25);
    
        if (item.price <= desiredPrice) {
            return this._createSuccess('Precio');
        } else if (item.price <= desiredTwentyFivePercentMore) {
            return this._createWarning('Precio');
        }
        return this._createError('Precio');
    }
    
    
    static _createPriceMeterHTML(item) {
        const desiredPricePerMeter = Preferences.get('max-price-per-meter');
        const desiredTwentyFivePercentMore = Math.round(desiredPricePerMeter * 1.25);
    
        if (item.priceMeter <= desiredPricePerMeter) {
            return `<span class='success'><strong>m²:</strong> ${item.priceMeter}€</span>`;
        } else if (item.priceMeter <= desiredTwentyFivePercentMore) {
            return `<span class='warning'><strong>m²:</strong> ${item.priceMeter}€</span>`;
        }
        return `<span class='error'><strong>m²:</strong> ${item.priceMeter}€</span>`;
    }
    
    static _createLiftHTML(item) {
        if (!Preferences.get('lift')) return ``;
    
        if (!item.additionalInfo) {
            if (item.isFlat()) return ``;
            return this._createMissing('Ascensor');
        }
    
        if (item.hasLift) {
            return this._createSuccess('Ascensor',);
        }
        return this._createError('Ascensor');
    }
    
    static _createInteriorHTML(item) {
        if (!Preferences.get('exterior')) return ``;
    
        if (!item.additionalInfo) {
            if (!item.isFlat()) return ``;
            return this._createMissing('Exterior');
        }
    
        if (item.isExterior) {
            return this._createSuccess('Exterior');
        }
        return this._createError('Exterior');
    }

    static _createSuccess(infoText) {
        return this.__createIndividual('✓', infoText, 'success');
    }


    static _createWarning(infoText) {
        return this.__createIndividual('✓', infoText, 'warning');
    }

    static _createMissing(infoText) {
        return this.__createIndividual('?', infoText, 'warning');
    }

    static _createError(infoText) {
        return this.__createIndividual('✓', infoText, 'error');
    }

    static __createIndividual(strongText, infoText, className = '') {
        return `<span class='${className}'><strong>${strongText}</strong> ${infoText}</span>`;
    }

}