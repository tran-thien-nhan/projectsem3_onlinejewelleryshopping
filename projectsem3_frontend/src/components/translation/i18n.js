// i18n.js
import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import Backend from 'i18next-http-backend';

// Import translations
import translationsVN from "../locales/vi/vi.json";
import translationsEN from "../locales/en/en.json"; 

// the translations
const resources = {
  en: {
    translation: translationsEN,
  },
  vi: {
    translation: translationsVN,
  }
};

i18n
  .use(Backend)
  .use(initReactI18next)
  .init({
    resources,
    lng: "en",
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;
