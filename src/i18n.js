import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import translationEN from './locales/en.json';
import translationIT from './locales/it.json';
import translationES from './locales/es.json';
import translationFR from './locales/fr.json';
import translationDE from './locales/de.json';

i18n
  .use(initReactI18next)
  .init({
    lng: 'en', 
    fallbackLng: 'en', 
    debug: false, 
    interpolation: {
      escapeValue: false, 
    },
    resources: {
      en: { translation: translationEN },
      it: { translation: translationIT },
      es: { translation: translationES },
      fr: { translation: translationFR },
      de: { translation: translationDE },
    }
  });

export default i18n;
