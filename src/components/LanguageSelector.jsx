import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Globe, Check, ChevronDown } from 'lucide-react';
import { useLanguage } from '../i18n/LanguageContext.jsx';

export default function LanguageSelector({ compact = false }) {
  const { lang, setLang, currentLangObj, languages } = useLanguage();
  const [open, setOpen] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    function handleClickOutside(event) {
      if (ref.current && !ref.current.contains(event.target)) {
        setOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="relative inline-block text-left" ref={ref}>
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className={`flex items-center gap-1.5 rounded-full border border-terracotta/35 transition-all shadow-sm ${
          compact
            ? 'px-2.5 py-1 text-xs bg-[#241710]/90 hover:bg-[#2c1d14] text-ivory font-medium'
            : 'px-3 py-1.5 text-xs md:text-sm bg-[#241710]/95 hover:bg-[#2c1d14] text-ivory font-semibold hover:border-terracotta shadow-sm'
        }`}
        aria-haspopup="true"
        aria-expanded={open}
        title="Select Language / भाषा चुनें"
      >
        <Globe size={14} className="text-turmeric flex-shrink-0" />
        <span className="truncate max-w-[90px] md:max-w-[120px] font-display">
          {currentLangObj.nativeName}
        </span>
        <ChevronDown
          size={12}
          className={`text-ivory/60 transition-transform ${open ? 'rotate-180' : ''}`}
        />
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 8, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 8, scale: 0.95 }}
            transition={{ duration: 0.18 }}
            className="absolute right-0 mt-2 w-72 sm:w-80 rounded-2xl bg-[#1C120B] shadow-2xl border border-terracotta/30 p-2.5 z-50 overflow-hidden"
          >
            <div className="px-2.5 py-2 border-b border-terracotta/20 flex items-center justify-between mb-1">
              <div className="flex items-center gap-1.5 text-xs font-bold text-turmeric-light">
                <Globe size={13} />
                <span>Choose Language / भाषा चुनें</span>
              </div>
              <span className="text-[10px] text-ivory/50 font-mono">12 Languages</span>
            </div>

            <div className="grid grid-cols-2 gap-1 max-h-72 overflow-y-auto p-1">
              {languages.map((item) => {
                const isActive = item.code === lang;
                return (
                  <button
                    key={item.code}
                    onClick={() => {
                      setLang(item.code);
                      setOpen(false);
                    }}
                    className={`flex items-center justify-between px-3 py-2 rounded-xl text-left transition-all ${
                      isActive
                        ? 'bg-terracotta text-white font-semibold shadow-sm'
                        : 'hover:bg-terracotta/20 text-ivory'
                    }`}
                  >
                    <div>
                      <div className="text-xs font-bold leading-tight">{item.nativeName}</div>
                      <div
                        className={`text-[10px] mt-0.5 ${
                          isActive ? 'text-white/80' : 'text-ivory/50'
                        }`}
                      >
                        {item.name}
                      </div>
                    </div>
                    {isActive && <Check size={13} className="text-white flex-shrink-0" />}
                  </button>
                );
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
