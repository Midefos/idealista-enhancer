import Log from "./Log.js";

export default class Event {

    static click(selector, callback) {
        document.addEventListener('click', (event) => {
            if (!event.target.matches(selector)) return;
            Log.debug(`Click on: ${selector}`)
            callback(event.target);
        });
    }

}