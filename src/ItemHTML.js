import Configuration from "./Configuration.js";

export default class ItemHTML {


    static createInformation(item) {
        return `
        <div class='midefos-idealista-container'>
            ${this._createPercentagePriceHTML(item)}
            ${this._createPriceHTML(item)}
            ${this._createPriceMeterHTML(item)}
            ${this._createLiftHTML(item)}
            ${this._createInteriorHTML(item)}
        </div>`
    }
    
    static _createPercentagePriceHTML(item) {
        if (!Configuration.get('percentages')) return ``;
    
        const twentyPercent = Math.round(item.price * 20 / 100);
        const thirtyPercent = Math.round(item.price * 30 / 100);
        return `
        <span>
            <strong>20%:</strong> ${twentyPercent}€ <br>
            <strong>30%:</strong> ${thirtyPercent}€
        </span>`;
    }
    
    
    static _createPriceHTML(item) {
        const desiredPrice = Configuration.get('max-price');
        const desiredTwentyFivePercentMore = Math.round(desiredPrice * 1.25);
    
        if (item.price <= desiredPrice) {
            return `<span class='success'><strong>✓</strong> Precio</span>`;
        } else if (item.price <= desiredTwentyFivePercentMore) {
            return `<span class='warning'><strong>✓</strong> Precio</span>`;
        }
        return `<span class='error'><strong>X</strong> Precio</span>`;
    }
    
    
    static _createPriceMeterHTML(item) {
        const desiredPricePerMeter = Configuration.get('max-price-per-meter');
        const desiredTwentyFivePercentMore = Math.round(desiredPricePerMeter * 1.25);
    
        if (item.priceMeter <= desiredPricePerMeter) {
            return `<span class='success'><strong>m²:</strong> ${item.priceMeter}€</span>`;
        } else if (item.priceMeter <= desiredTwentyFivePercentMore) {
            return `<span class='warning'><strong>m²:</strong> ${item.priceMeter}€</span>`;
        }
        return `<span class='error'><strong>m²:</strong> ${item.priceMeter}€</span>`;
    }
    
    static _createLiftHTML(item) {
        if (!Configuration.get('lift')) return ``;
    
        if (!item.additionalInfo) {
            if (item.isFlat()) return ``;
            return this.__createIndividual('?', 'Ascensor', 'warning');
        }
    
        if (item.hasLift) {
            return this.__createIndividual('✓', 'Ascensor', 'warning');
        }
        return this.__createIndividual('X', 'Ascensor', 'error');
    }
    
    static _createInteriorHTML(item) {
        if (!Configuration.get('exterior')) return ``;
    
        if (!item.additionalInfo) {
            if (!item.isFlat()) return ``;
            return `<span class='warning'><strong>?</strong> Exterior</span>`
        }
    
        if (item.isExterior) {
            return `<span class='success'><strong>✓</strong> Exterior</span>`
        }
        return `<span class='error'><strong>X</strong> Exterior</span>`;
    }

    static __createIndividual(strongText, infoText, className = '') {
        return `<span class='${className}'><strong>${strongText}</strong> ${infoText}</span>`;
    }

}