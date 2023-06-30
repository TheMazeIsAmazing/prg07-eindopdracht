import * as Localization from 'expo-localization';
import { I18n } from "i18n-js";

import en from "./languages/en.json";
import nl from "./languages/nl.json";
import de from "./languages/de.json";
import jp from "./languages/jp.json";
import fr from "./languages/fr.json";

export const i18n = new I18n({
    ...en,
    ...nl,
    ...de,
    ...jp,
    ...fr
});

// export default i18n;