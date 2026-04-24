import i18n from "i18next";
import { initReactI18next } from "react-i18next";

import en from "./locales/en/translation.json";
import el from "./locales/el/translation.json";

i18n
  .use(initReactI18next)
  .init({
    resources: {
      en: { translation: en },
      el: { translation: el },
    },
    lng: localStorage.getItem("lang") || "el",
    fallbackLng: "el",
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;