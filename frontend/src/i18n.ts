import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import Backend from "i18next-http-backend";
import LanguageDetector from "i18next-browser-languagedetector";
import { allNamespaces } from "../src/config/i18nNamespaces";

if (!i18n.isInitialized) {
  i18n
    .use(Backend)
    .use(LanguageDetector)
    .use(initReactI18next)
    .init({
      lng: "en", // Force language to 'en'
      fallbackLng: "en",
      debug: process.env.NODE_ENV === "development",

      // supportedLngs and nonExplicitSupportedLngs are not needed when lng is explicitly set
      // supportedLngs: ["en", "ko"],
      // nonExplicitSupportedLngs: true,

      ns: allNamespaces,
      defaultNS: "common",

      interpolation: {
        escapeValue: false,
      },

      nsSeparator: ".",

      backend: {
        loadPath: (languages: string[], namespaces: string[]) => {
          const lng = languages[0];
          const ns = namespaces[0];

          const parts = ns.split(".");
          const nsPrefix = parts.length > 1 ? parts[0] : "";
          const nsSuffix = parts.length > 1 ? parts.slice(1).join(".") : ns;

          if (nsPrefix) {
            return `/locales/${lng}/${nsPrefix}/${nsSuffix}.json`;
          } else {
            return `/locales/${lng}/${nsSuffix}.json`;
          }
        },
      },

      react: {
        useSuspense: false,
      },
    });
}

export default i18n;
