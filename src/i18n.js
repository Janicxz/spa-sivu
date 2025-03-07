import i18n from "i18next";
import { initReactI18next } from "react-i18next";

import translationEN from "./locales/en.json";
import translationFI from "./locales/fi.json";

const resources = {
    en: {
        translation: translationEN
    },
    fi: {
        translation: translationFI
    }
}

i18n.use(initReactI18next).init({
    resources,
    lng: 'en', // Set the default language
    keySeparator: false, // Allow for nested translations without using dots
    interpolation: {
      escapeValue: false,
    },
  });


export default i18n;