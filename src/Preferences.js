import Log from "./Log.js";

export default class Preferences {

    static NAME = 'midefos-idealista';

    static _current;

    static init() {
        this._current = this._getConfig();
    }

    static get(key) {
        const config = this._getConfig();
        return config[key];
    }

    static save(config) {
        window.localStorage.setItem(this.NAME, JSON.stringify(config));
        this._current = config;
        Log.debug('Saved preferences')
    }

    static _getConfig() {
        const storageConfig = this._getFromLocalStorage();
        if (!storageConfig) return this._default();
        return storageConfig;
    }

    static _getFromLocalStorage() {
        const storageConfig = window.localStorage.getItem(this.NAME);
        if (!storageConfig) return null;
        return JSON.parse(storageConfig);
    }

    static _default() {
        return {
            enabled: true,
            percentages: true,
            garage: false,
            exterior: true,
            lift: true,
            'max-price': 120_000,
            'max-price-per-meter': 1_500
        }
    }

}