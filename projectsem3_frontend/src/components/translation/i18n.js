// i18n.js
import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import Backend from 'i18next-http-backend';

// Import translations
import translationsVN from "../locales/vi/vi.json";
import translationsEN from "../locales/en/en.json"; 
import translationsJAP from "../locales/jap/jap.json";
import translationsIND from "../locales/ind/ind.json";
import translationsKOR from "../locales/kor/kor.json";

// the translations
const resources = {
  en: {
    translation: translationsEN,
  },
  vi: {
    translation: translationsVN,
  },
  jap: {
    translation: translationsJAP,
  },
  ind: {
    translation: translationsIND,
  },
  kor: {
    translation: translationsKOR,
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
