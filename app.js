import Configuration from "./src/Configuration.js";
import Item from "./src/Item.js";
import $ from 'jquery';
import ItemHTML from "./src/ItemHTML.js";

// Idealista selectors.
const ITEM_SELECTOR = 'article.item';

// Own selectors.
const CONFIG_CLASS = 'midefos-idealista-config'

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


function init() {
    Configuration.init();
    addStyles();

    createMenu();
    createInformation();
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
            lift: configNode.querySelector('#lift').checked,
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
    for (const _item of items) {
        const item = new Item(_item);
        const currentInformation = _item.querySelector('.midefos-idealista-container');
        if (currentInformation) currentInformation.remove();
        _item.innerHTML += ItemHTML.createInformation(item);
    }
}

function createConfigHTML() {
    return `
	<div class='${CONFIG_CLASS}'>
		<h2>Midefos Idealista</h2>

		<h3>Configuración global:</h3>
		<label>
			<input type='checkbox' id='enabled' checked='${Configuration.get('enabled')}'>
			<span>Habilitado</span>
		</label>

		<h3>Busqueda:</h3>
		
		<label>
			<input type='checkbox' id='percentages' checked='${Configuration.get('percentages')}'>
			<span>Porcentajes</span>
		</label>
		<br>

		<label>
			<input type='checkbox' id='garage' checked='${Configuration.get('garage')}'>
			<span>Garaje</span>
		</label>
		<br>

		<label>
			<input type='checkbox' id='exterior' checked='${Configuration.get('exterior')}'>
			<span>Exterior</span>
		</label>
		<br>

		<label>
			<input type='checkbox' id='lift' checked='${Configuration.get('lift')}'>
			<span>Ascensor</span>
		</label>
		<br>

		<label>
			<span>Precio máximo: </span>
			<input type='number' id='max-price' value='${Configuration.get('max-price')}' placeholder='0'>
		</label>
		<br>

		<label>
			<span>Precio máximo por metro: </span>
			<input type='number' id='max-price-per-meter' value='${Configuration.get('max-price-per-meter')}' placeholder='0'>
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

init();

function addStyles() {
    const style = document.createElement('style');
    style.textContent = STYLES;
    document.head.appendChild(style);
}