
import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";

import translationAR from "./language/ar.json";
import translationEN from "./language/en.json";

const resources ={
    ar: {
        translation: translationAR,
    },
    en: {
        translation: translationEN,
    },
};
i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: "en",
    interpolation: {
      escapeValue: false, 
    },
  });
  export default i18n;