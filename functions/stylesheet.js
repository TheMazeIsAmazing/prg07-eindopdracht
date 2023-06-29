import {theme} from "./theme";
import {styles} from "../components/Styles";

export const stylesheet = {
    ... (theme === 'light' ? styles.lightMode : styles.darkMode),
};