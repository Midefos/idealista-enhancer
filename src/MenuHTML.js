import ConfigurationHTML from "./ConfigurationHTML.js";

export default class MenuHTML {

    static CONTAINER_CLASS_NAME = 'midefos-idealista-menu';
    static get CONTAINER_SELECTOR() {
        return `.${this.CONTAINER_CLASS_NAME}`;
    }

    static RELOAD_INFORMATION_CLASS_NAME = 'reload-information';
    static get RELOAD_INFORMATION_SELECTOR() {
        return `.${this.RELOAD_INFORMATION_CLASS_NAME}`;
    }

    static create() {
        return `
        <div class='${this.CONTAINER_CLASS_NAME}'>
            <button class='${ConfigurationHTML.OPEN_CONFIG_CLASS_NAME}' title='Abrir configuración'>⚙</button>
            <button class='${this.RELOAD_INFORMATION_CLASS_NAME}' title='Cargar información'>⟳</button>
        </div>`;
    }

}