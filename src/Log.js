export default class Log  { 

    static debug(message) {
        console.log(`%c [DEBUG] ${message} `, 'background: blue; color: white; font-size: 13px;');
    }

}