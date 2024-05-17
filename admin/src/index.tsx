import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { Provider as ReduxProvider } from 'react-redux'; // Rename react-redux Provider
import { store } from './redux/store';
import { BrowserRouter } from 'react-router-dom';
import global_en from '@/locales/en.json'
import global_ja from '@/locales/ja.json'
import global_es from '@/locales/es.json'
import i18next from 'i18next';
import { I18nextProvider, initReactI18next } from 'react-i18next';
import { AppProvider as PolarisProvider } from '@shopify/polaris'; // Rename @shopify/polaris Provider
import enTranslations from '@shopify/polaris/locales/en.json';
import '@shopify/polaris/build/esm/styles.css';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement,
);

i18next.use(initReactI18next)
  .init({
    interpolation: { escapeValue: false },
    lng: "en",
    debug: true,
    resources: {
      en: {
        translation: global_en
      },
      ja: {
        translation: global_ja
      },
      es: {
        translation: global_es
      },
    }

  })
root.render(
  <PolarisProvider i18n={enTranslations}>
  <React.StrictMode>
    <I18nextProvider i18n={i18next}>
      <ReduxProvider store={store}>
        <BrowserRouter basename="/">
          <App />
        </BrowserRouter>
      </ReduxProvider>
    </I18nextProvider>
  </React.StrictMode>
  </PolarisProvider>,
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
