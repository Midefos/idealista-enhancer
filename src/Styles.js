import ConfigurationHTML from "./ConfigurationHTML.js";
import ItemHTML from "./ItemHTML.js";
import MenuHTML from "./MenuHTML.js";

export default class Styles {

    static APP_STYLES = `
        .${ItemHTML.CONTAINER_CLASS_NAME} {
            display: flex;
            align-items: center;
            justify-content: space-around;

            width: 100%;
            height: 55px;
            margin-top: 5px;		

            background-color: white;
            box-shadow: 0 3px 6px rgba(225, 245, 110, 0.16), 0 3px 6px rgba(225, 245, 110, 0.23);

        }
        .${MenuHTML.CONTAINER_CLASS_NAME} {
            display: flex;
            align-items: center;
            justify-content: space-around;

            width: 100%;
            height: 40px;

            background-color: white;
            box-shadow: 0 3px 6px rgba(225, 245, 110, 0.16), 0 3px 6px rgba(225, 245, 110, 0.23);
        }
        .${ConfigurationHTML.CONTAINER_CLASS_NAME} {
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

    static add(style = null) {
        if (!style) style = this.APP_STYLES;
        const styleNode = document.createElement('style');
        styleNode.textContent = style;
        document.head.appendChild(styleNode);
    }

}