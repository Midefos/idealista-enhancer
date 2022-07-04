// ==UserScript==
// @name                Idealista Enhancer
// @description         Just some information for idealista.com
// @version             0.1.0
// @author              Midefos
// @namespace           https://github.com/Midefos
// @match               https://www.idealista.com/*
// @require       		https://code.jquery.com/jquery-3.6.0.slim.min.js
// @license MIT
// ==/UserScript==

/* jshint esversion: 6 */
this.$ = this.jQuery = jQuery.noConflict(true);

// Idealista selectors.
const ITEM_SELECTOR = 'article.item';
const NAME_SELECTOR = '.item-link';
const PRICE_SELECTOR = '.item-price';
const ROOM_SELECTOR = '.item-detail-char .item-detail:nth-child(1)';
const METERS_SELECTOR = '.item-detail-char .item-detail:nth-child(2)';
const ADDITIONAL_INFORMATION_SELECTOR = '.item-detail-char .item-detail:nth-child(3)';

// Own selectors.
const CONFIG_CLASS = 'midefos-idealista-config'

const DEFAULT_CONFIG = {
    enabled: true,
    percentages: true,
    garage: false,
    exterior: true,
    lever: true,
    'max-price': 120_000,
    'max-price-per-meter': 1_500
}


const STYLES = `
	.midefos-idealista-container {
		display: flex;
		align-items: center;
		justify-content: space-around;

		width: 100%;
		height: 55px;
		margin-top: 5px;		

		background-color: white;
		box-shadow: 0 3px 6px rgba(225, 245, 110, 0.16), 0 3px 6px rgba(225, 245, 110, 0.23);

	}
	.midefos-idealista-menu {
		display: flex;
		align-items: center;
		justify-content: space-around;

		width: 100%;
		height: 40px;

		background-color: white;
		box-shadow: 0 3px 6px rgba(225, 245, 110, 0.16), 0 3px 6px rgba(225, 245, 110, 0.23);
	}
	.${CONFIG_CLASS} {
		display: none;
		position: fixed;
    z-index: 3;
    
		background-color: rgba(225, 245, 110, 0.90);  
		width: 95%;
    height: 95%;
		top: 2.5%;
    left: 2.5%;
		
		padding: 2rem;
	}

	.success {
		color: darkgreen;
	}
	.warning {
		color: darkorange;
	}
	.error {
		color: darkred;
	}
`;

let currentConfig;

function init() {
    currentConfig = getConfig()
    addStyles();

    createMenu();
    createInformation();
}

function getConfig() {
    const storageConfig = localStorage.getItem('midefos-idealista');
    if (!storageConfig) return DEFAULT_CONFIG;

    return JSON.parse(storageConfig);
}

function setConfig(config) {
    localStorage.setItem('midefos-idealista', JSON.stringify(config));
    currentConfig = config;
}

function createMenu() {
    if (window.location.href.includes('mapa-google')) return;


    $('body').on('click', '#reload-midefos-idealista', () => {
        createInformation();
    });

    $('body').on('click', '.config-open', () => {
        $(`.${CONFIG_CLASS}`).toggle();
    });

    $('body').on('click', '.config-save', () => {
        const $configNode = $(`.${CONFIG_CLASS}`);

        const configNode = $configNode[0];
        const newConfig = {
            enabled: configNode.querySelector('#enabled').checked,
            percentages: configNode.querySelector('#percentages').checked,
            garage: configNode.querySelector('#garage').checked,
            exterior: configNode.querySelector('#exterior').checked,
            lever: configNode.querySelector('#lever').checked,
            'max-price': configNode.querySelector('#max-price').value,
            'max-price-per-meter': configNode.querySelector('#max-price-per-meter').value
        }
        setConfig(newConfig);

        createInformation();
        $configNode.toggle();
    });

    document.querySelector('#main-header').innerHTML += createConfigHTML();


    const mainContent = document.querySelector('#main-content');
    mainContent.innerHTML = createMenuHTML() + mainContent.innerHTML;
}

function createInformation() {
    const items = document.querySelectorAll(ITEM_SELECTOR);
    for (const item of items) {
        const currentInformation = item.querySelector('.midefos-idealista-container');
        if (currentInformation) currentInformation.remove();
        item.innerHTML += createItemInformationHTML(item);
    }
}

function createConfigHTML() {
    return `
	<div class='${CONFIG_CLASS}'>
		<h2>Midefos Idealista</h2>

		<h3>Configuración global:</h3>
		<label>
			<input type='checkbox' id='enabled' checked='${currentConfig.enabled}'>
			<span>Habilitado</span>
		</label>

		<h3>Busqueda:</h3>
		
		<label>
			<input type='checkbox' id='percentages' checked='${currentConfig.percentages}'>
			<span>Porcentajes</span>
		</label>
		<br>

		<label>
			<input type='checkbox' id='garage' checked='${currentConfig.garage}'>
			<span>Garaje</span>
		</label>
		<br>

		<label>
			<input type='checkbox' id='exterior' checked='${currentConfig.exterior}'>
			<span>Exterior</span>
		</label>
		<br>

		<label>
			<input type='checkbox' id='lever' checked='${currentConfig.lever}'>
			<span>Ascensor</span>
		</label>
		<br>

		<label>
			<span>Precio máximo: </span>
			<input type='number' id='max-price' value='${currentConfig['max-price']}' placeholder='0'>
		</label>
		<br>

		<label>
			<span>Precio máximo por metro: </span>
			<input type='number' id='max-price-per-meter' value='${currentConfig['max-price-per-meter']}' placeholder='0'>
		</label>
		<br>
		
		<button class='config-save'>Guardar</button>
		<button class='config-open'>Cerrar</button>
	</div>`
}

function createMenuHTML() {
    return `
	<div class='midefos-idealista-menu'>
		<button class='config-open' title='Abrir configuración'>⚙</button>
		<button id='reload-midefos-idealista' title='Cargar información'>⟳</button>
	</div>`;
}


function createItemInformationHTML(item) {

    return `
	<div class='midefos-idealista-container'>
		${createPercentagePriceHTML(item)}
		${createPriceHTML(item)}
		${createPriceMeterHTML(item)}
		${createLeverHTML(item)}
		${createInteriorHTML(item)}
	</div>`
}

function findPrice(item) {
    const priceText = item.querySelector(PRICE_SELECTOR).textContent;
    return Number(priceText.replace('€', '').replace('.', '').replace(',', ''));
}

function findMeters(item) {
    let metersText = item.querySelector(METERS_SELECTOR).textContent;
    if (!metersText.includes('m²')) metersText = item.querySelector(ROOM_SELECTOR).textContent;
    return Number(metersText.replace('m²', ''));
}

function findPriceMeter(item) {
    const meters = findMeters(item);
    const price = findPrice(item);
    return Math.round(price / meters);
}


function createPercentagePriceHTML(item) {
    if (!currentConfig.percentages) return ``;

    const price = findPrice(item);

    const twentyPercent = Math.round(price * 20 / 100);
    const thirtyPercent = Math.round(price * 30 / 100);
    return `
	<span>
		<strong>20%:</strong> ${twentyPercent}€ <br>
		<strong>30%:</strong> ${thirtyPercent}€
	</span>`;
}


function createPriceHTML(item) {
    const price = findPrice(item);

    const desiredPrice = currentConfig['max-price'];
    const desiredTwentyFivePercentMore = Math.round(desiredPrice * 1.25);

    if (price <= desiredPrice) {
        return `<span class='success'><strong>✓</strong> Precio</span>`;
    } else if (price <= desiredTwentyFivePercentMore) {
        return `<span class='warning'><strong>✓</strong> Precio</span>`;
    }
    return `<span class='error'><strong>X</strong> Precio</span>`;
}


function createPriceMeterHTML(item) {
    const priceMeter = findPriceMeter(item);

    const desiredPricePerMeter = currentConfig['max-price-per-meter'];
    const desiredTwentyFivePercentMore = Math.round(desiredPricePerMeter * 1.25);

    if (priceMeter <= desiredPricePerMeter) {
        return `<span class='success'><strong>m²:</strong> ${priceMeter}€</span>`;
    } else if (priceMeter <= desiredTwentyFivePercentMore) {
        return `<span class='warning'><strong>m²:</strong> ${priceMeter}€</span>`;
    }
    return `<span class='error'><strong>m²:</strong> ${priceMeter}€</span>`;
}

function createLeverHTML(item) {
    if (!currentConfig.lever) return ``;

    const additionalInfo = item.querySelector(ADDITIONAL_INFORMATION_SELECTOR);
    if (!additionalInfo) {
        if (!isFlat(item)) return ``;
        return `<span class='warning'><strong>?</strong> Ascensor</span>`
    }

    const leverText = additionalInfo.textContent;
    const hasLever = leverText.includes('con ascensor');
    if (hasLever) {
        return `<span class='success'><strong>✓</strong> Ascensor</span>`
    }
    return `<span class='error'><strong>X</strong> Ascensor</span>`;
}

function createInteriorHTML(item) {
    if (!currentConfig.exterior) return ``;

    const additionalInfo = item.querySelector(ADDITIONAL_INFORMATION_SELECTOR);
    if (!additionalInfo) {
        if (!isFlat(item)) return ``;
        return `<span class='warning'><strong>?</strong> Exterior</span>`
    }

    const interiorText = additionalInfo.textContent;
    const hasLever = interiorText.includes('exterior');
    if (hasLever) {
        return `<span class='success'><strong>✓</strong> Exterior</span>`
    }
    return `<span class='error'><strong>X</strong> Exterior</span>`;
}

function isFlat(item) {
    return item.querySelector(NAME_SELECTOR)
        .textContent.includes('Piso');
}

init();

function addStyles() {
    const style = document.createElement('style');
    style.textContent = STYLES;
    document.head.appendChild(style);
}