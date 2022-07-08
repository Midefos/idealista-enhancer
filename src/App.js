import Preferences from './Preferences.js';
import Styles from './Styles.js';

import Menu from './Menu.js';
import Configuration from './Configuration.js';
import Information from './Information.js';


export default class App {

    static init() {
        Preferences.init();
        Styles.add();
    
        new Menu();
        new Configuration();
        Information.create();
    }

}