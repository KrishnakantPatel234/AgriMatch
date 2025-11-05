// src/context/LanguageContext.js
import React, { createContext, useState, useContext, useEffect } from 'react';

// Import language files
import en from '../locales/en.json';
import hi from '../locales/hi.json';
import mr from '../locales/mr.json';

const LanguageContext = createContext();

export const useLanguage = () => {
  return useContext(LanguageContext);
};

export const LanguageProvider = ({ children }) => {
  const [language, setLanguage] = useState('en');
  const [translations, setTranslations] = useState(en);

  // Available languages
  const languages = {
    en: { name: 'English', flag: '🇺🇸', translation: en },
    hi: { name: 'हिन्दी', flag: '🇮🇳', translation: hi },
    mr: { name: 'मराठी', flag: '🇮🇳', translation: mr }
  };

  useEffect(() => {
    // Load saved language from localStorage
    const savedLanguage = localStorage.getItem('agrimatch-language');
    if (savedLanguage && languages[savedLanguage]) {
      setLanguage(savedLanguage);
      setTranslations(languages[savedLanguage].translation);
    }
  }, []);

  const changeLanguage = (langCode) => {
    if (languages[langCode]) {
      setLanguage(langCode);
      setTranslations(languages[langCode].translation);
      localStorage.setItem('agrimatch-language', langCode);
      
      // Update HTML lang attribute for accessibility
      document.documentElement.lang = langCode;
    }
  };

  // Translation function
  const t = (key) => {
    const keys = key.split('.');
    let value = translations;
    
    for (const k of keys) {
      value = value[k];
      if (value === undefined) {
        console.warn(`Translation missing for key: ${key}`);
        return key;
      }
    }
    
    return value;
  };

  const value = {
    language,
    languages,
    changeLanguage,
    t
  };

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
};