import Configuration from "./Configuration.js";
import ConfigurationHTML from "./ConfigurationHTML.js";
import Event from "./Event.js";
import Information from "./Information.js";
import MenuHTML from "./MenuHTML.js";

export default class Menu {

    constructor() {
        if (this._shouldNotLoad()) return;

        const mainContent = document.querySelector('#main-content');
        mainContent.innerHTML = MenuHTML.create() + mainContent.innerHTML;

        this._initEvents();
    }

    _initEvents() {
        Event.click(MenuHTML.RELOAD_INFORMATION_SELECTOR, () => {
            Information.create();
        })

        Event.click(ConfigurationHTML.OPEN_CONFIG_SELECTOR, () => {
            Configuration.toggle();
        });
    }

    _shouldNotLoad() {
        return window.location.href.includes('mapa-google');
    }

}