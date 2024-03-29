import i18n from 'i18next';
import detector from 'i18next-browser-languagedetector';
import backend from 'i18next-xhr-backend';
import { initReactI18next } from 'react-i18next';

if (!('XMLHttpRequest' in global)) {
  (global as any).XMLHTTPRequest = () => ({});
}

i18n
  .use(backend)
  .use(detector)
  .use(initReactI18next)
  .init({
    whitelist: ['en', 'cn'],
    preload: ['en', 'cn'],
    fallbackLng: 'en',
    react: {
      wait: true,
      useSuspense: false,
    },
  });

export default i18n;
