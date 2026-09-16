import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Target, Search, Award, MapPin, ArrowRight } from 'lucide-react';
import { PRODUCTS } from '../../demoData.js';
import { useLanguage } from '../i18n/LanguageContext.jsx';

export default function BuyerMatching({ go }) {
  const { t } = useLanguage();
  const [query, setQuery] = useState('500 handmade gifts under ₹1,000');
  const [results, setResults] = useState(null);
  const [loading, setLoading] = useState(false);

  const runMatch = () => {
    setLoading(true);
    setResults(null);
    setTimeout(() => {
      const matched = PRODUCTS.filter(p => p.price <= 1000)
        .sort((a,b) => b.matchScore - a.matchScore)
        .slice(0, 6);
      setResults(matched.length ? matched : PRODUCTS.slice(0,6).sort((a,b)=>a.price-b.price));
      setLoading(false);
    }, 1600);
  };

  return (
    <div className="max-w-5xl mx-auto px-4 py-10">
      <div className="text-center mb-8">
        <span className="inline-block px-4 py-1.5 rounded-full bg-terracotta/10 text-terracotta text-sm font-semibold mb-3">
          {t('buyerMatching.badge')}
        </span>
        <h2 className="font-display text-3xl md:text-4xl font-extrabold text-indigonight">
          {t('buyerMatching.title')}
        </h2>
        <p className="text-xs sm:text-sm text-indigonight/60 mt-2">
          {t('buyerMatching.subtitle')}
        </p>
      </div>

      <div className="glass rounded-2xl p-4 border border-terracotta/20 flex gap-3 max-w-2xl mx-auto mb-8 shadow-sm">
        <div className="flex items-center gap-2 bg-white rounded-full px-4 py-2.5 flex-1 border border-terracotta/15">
          <Search size={16} className="text-terracotta" />
          <input
            value={query}
            onChange={e=>setQuery(e.target.value)}
            className="bg-transparent outline-none text-sm flex-1 text-indigonight"
          />
        </div>
        <button
          onClick={runMatch}
          className="px-5 py-2.5 rounded-full bg-terracotta text-white font-semibold text-sm hover:bg-terracotta-dark flex items-center gap-1 shadow-sm transition"
        >
          <Target size={15}/> {t('buyerMatching.matchBtn')}
        </button>
      </div>

      {loading && (
        <div className="text-center py-10">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ repeat: Infinity, duration: 1.2, ease: 'linear' }}
            className="w-10 h-10 border-4 border-terracotta/20 border-t-terracotta rounded-full mx-auto mb-3"
          />
          <p className="text-indigonight/50 text-sm">{t('buyerMatching.scanning')}</p>
        </div>
      )}

      {results && (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {results.map((p,i) => (
            <motion.div
              key={p.id}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.08 }}
              className="bg-white rounded-2xl p-4 shadow-sm border border-terracotta/10 relative hover:shadow-md transition craft-card"
            >
              <div className="absolute top-3 right-3 bg-gradient-to-br from-terracotta to-turmeric text-white text-xs font-bold px-2.5 py-1 rounded-full flex items-center gap-1 shadow-sm">
                <Award size={11}/> {p.matchScore}% {t('buyerMatching.matchBadge')}
              </div>
              <div className={`h-24 rounded-xl bg-gradient-to-br ${p.gradient} mb-3 flex items-center justify-center text-3xl`}>
                🧵
              </div>
              <h4 className="font-display font-bold text-sm text-indigonight">{p.name}</h4>
              <p className="text-xs text-indigonight/50 mt-1 flex items-center gap-1">
                <MapPin size={11}/> {p.artisan} · {p.district}
              </p>
              <div className="flex items-center justify-between mt-3">
                <p className="font-bold text-terracotta">₹{p.price.toLocaleString()}</p>
                <span className="text-[10px] bg-turmeric/20 text-bronze px-2 py-1 rounded-full font-semibold">
                  {p.craft}
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      )}

      {results && (
        <div className="text-center mt-8">
          <button
            onClick={() => go('map')}
            className="px-7 py-3 rounded-full bg-terracotta text-white font-semibold inline-flex items-center gap-2 shadow-glow hover:bg-terracotta-dark transition text-sm"
          >
            {t('buyerMatching.viewMap')} <ArrowRight size={16} />
          </button>
        </div>
      )}
    </div>
  );
}