import React, { useState, useMemo } from 'react';
import { LanguageContext } from './context.js';
import { LANGUAGES, TRANSLATIONS } from './translations.js';

export function LanguageProvider({ children }) {
  const [lang, setLangState] = useState(() => {
    try {
      return localStorage.getItem('kalaasetu_lang') || 'en';
    } catch {
      return 'en';
    }
  });

  const setLang = (newLang) => {
    if (TRANSLATIONS[newLang]) {
      setLangState(newLang);
      try {
        localStorage.setItem('kalaasetu_lang', newLang);
      } catch {
        // ignore storage errors
      }
    }
  };

  const currentLangObj = useMemo(() => {
    return LANGUAGES.find(l => l.code === lang) || LANGUAGES[0];
  }, [lang]);

  // Deep key lookup helper: t('landing.heroTitle1', 'India\'s Crafts...')
  const t = useMemo(() => {
    return (keyPath, fallback = '') => {
      const parts = keyPath.split('.');
      
      // Try selected language
      let curr = TRANSLATIONS[lang];
      for (const p of parts) {
        if (curr && typeof curr === 'object' && p in curr) {
          curr = curr[p];
        } else {
          curr = undefined;
          break;
        }
      }
      if (curr !== undefined && typeof curr === 'string') return curr;

      // Fallback to English
      let enVal = TRANSLATIONS.en;
      for (const p of parts) {
        if (enVal && typeof enVal === 'object' && p in enVal) {
          enVal = enVal[p];
        } else {
          enVal = undefined;
          break;
        }
      }
      if (enVal !== undefined && typeof enVal === 'string') return enVal;

      return fallback || keyPath;
    };
  }, [lang]);

  return (
    <LanguageContext.Provider value={{ lang, setLang, currentLangObj, languages: LANGUAGES, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export { LanguageContext } from './context.js';
export { useLanguage } from './useLanguage.js';
