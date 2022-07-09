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
            margin-top: -10px;
            margin-bottom: 10px;
            padding: 10px 0;	

            background-color: white;
            box-shadow: 0 3px 6px rgba(225, 245, 110, 0.16), 0 3px 6px rgba(225, 245, 110, 0.23);

        }
        .${MenuHTML.CONTAINER_CLASS_NAME} {
            display: flex;
            align-items: center;
            justify-content: space-around;

            width: 100%;
            padding: 10px 0;

            background-color: white;
            box-shadow: 0 3px 6px rgba(225, 245, 110, 0.16), 0 3px 6px rgba(225, 245, 110, 0.23);
        }
        .${ConfigurationHTML.CONTAINER_CLASS_NAME} {
            display: none;
            position: fixed;
            z-index: 3;
        
            width: 95%;
            height: 95%;
            top: 2.5%;
            left: 2.5%;
            
            padding: 2rem;

            background-color: rgba(255, 255, 255, 0.90);  
            border: 5px solid rgb(225, 245, 110);
            border-radius: 8px;
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