import ConfigurationHTML from "./ConfigurationHTML.js";
import Event from "./Event.js";
import Information from "./Information.js";
import Log from "./Log.js";
import Preferences from "./Preferences.js";

export default class Configuration {

    constructor() {
        document.querySelector('#main-header').innerHTML += ConfigurationHTML.create();
        
        this._initEvents();
    }

    _initEvents() {
        Event.click(ConfigurationHTML.SAVE_CONFIG_SELECTOR, () => {
            Preferences.save(this._extractConfiguration());
            Information.create();
            Configuration.toggle();
        });
    }

    _extractConfiguration() {
        const container = document.querySelector(ConfigurationHTML.CONTAINER_SELECTOR);
        return {
            enabled: container.querySelector('#enabled').checked,
            percentages: container.querySelector('#percentages').checked,
            garage: container.querySelector('#garage').checked,
            exterior: container.querySelector('#exterior').checked,
            lift: container.querySelector('#lift').checked,
            'max-price': container.querySelector('#max-price').value,
            'max-price-per-meter': container.querySelector('#max-price-per-meter').value
        }
    }

    static toggle() {
        const container = document.querySelector(ConfigurationHTML.CONTAINER_SELECTOR);
        if (getComputedStyle(container).display === 'none') {
            container.style.display = 'block';
            Log.debug(`Opened configuration`);
        } else {
            container.style.display = 'none';
            Log.debug(`Closed configuration`);
        }
    }

}