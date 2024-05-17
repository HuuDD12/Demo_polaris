import React, { createContext, useState, useContext } from 'react';
import en from '@/locales/en.json';
import ja from '@/locales/ja.json';
import es from '@/locales/es.json';


interface LanguageContextType {
  language: string;
  translations: any;
  handleChangeLanguage: (lang: string) => void;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState('en');
  const [translations, setTranslations] = useState<any>(en);

  const handleChangeLanguage = (lang: string) => {
    setLanguage(lang);
    if(lang ==='en'){
        setTranslations(en);
    }else if(lang === 'ja'){
        setTranslations(ja);
    }else if(lang ==='es'){
        setTranslations(es);
    }
  };

  return (
    <LanguageContext.Provider value={{ language, translations, handleChangeLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
};
