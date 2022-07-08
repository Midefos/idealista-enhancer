import Preferences from "./Preferences.js";

export default class ConfigurationHTML {

    static CONTAINER_CLASS_NAME = 'midefos-idealista-config';
    static get CONTAINER_SELECTOR() {
        return `.${this.CONTAINER_CLASS_NAME}`;
    }

    static OPEN_CONFIG_CLASS_NAME = 'open-config';
    static get OPEN_CONFIG_SELECTOR() {
        return `.${this.OPEN_CONFIG_CLASS_NAME}`;
    }

    static SAVE_CONFIG_CLASS_NAME = 'save-config';
    static get SAVE_CONFIG_SELECTOR() {
        return `.${this.SAVE_CONFIG_CLASS_NAME}`;
    }

    static create() {
        return `
        <div class='${this.CONTAINER_CLASS_NAME}'>
            <h2>Midefos Idealista</h2>
    
            <h3>Configuración global:</h3>
            <label>
                <input type='checkbox' id='enabled' checked='${Preferences.get('enabled')}'>
                <span>Habilitado</span>
            </label>
    
            <h3>Busqueda:</h3>
            
            <label>
                <input type='checkbox' id='percentages' checked='${Preferences.get('percentages')}'>
                <span>Porcentajes</span>
            </label>
            <br>
    
            <label>
                <input type='checkbox' id='garage' checked='${Preferences.get('garage')}'>
                <span>Garaje</span>
            </label>
            <br>
    
            <label>
                <input type='checkbox' id='exterior' checked='${Preferences.get('exterior')}'>
                <span>Exterior</span>
            </label>
            <br>
    
            <label>
                <input type='checkbox' id='lift' checked='${Preferences.get('lift')}'>
                <span>Ascensor</span>
            </label>
            <br>
    
            <label>
                <span>Precio máximo: </span>
                <input type='number' id='max-price' value='${Preferences.get('max-price')}' placeholder='0'>
            </label>
            <br>
    
            <label>
                <span>Precio máximo por metro: </span>
                <input type='number' id='max-price-per-meter' value='${Preferences.get('max-price-per-meter')}' placeholder='0'>
            </label>
            <br>
            
            <button class='${this.SAVE_CONFIG_CLASS_NAME}'>Guardar</button>
            <button class='${this.OPEN_CONFIG_CLASS_NAME}'>Cerrar</button>
        </div>`
    }

}