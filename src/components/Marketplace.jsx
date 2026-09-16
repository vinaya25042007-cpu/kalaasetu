import React, { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { Search, SlidersHorizontal, MapPin, Star, Fingerprint, Play } from 'lucide-react';
import { PRODUCTS, CRAFTS } from '../../demoData.js';
import { useLanguage } from '../i18n/LanguageContext.jsx';

export default function Marketplace({ openPassport, onOpenStory, initialQuery = '' }) {
  const { t } = useLanguage();
  const [query, setQuery] = useState(initialQuery || '');
  const [craftFilter, setCraftFilter] = useState('All');

  const filtered = useMemo(() => {
    const q = query.toLowerCase().trim();
    return PRODUCTS.filter((p) => {
      const craftOk = craftFilter === 'All' || p.craft === craftFilter;
      if (!craftOk) return false;
      if (!q) return true;
      const haystack = [
        p.name,
        p.craft,
        p.artisan,
        p.district,
        p.state,
        p.material,
        p.desc,
        ...(p.tags || []),
      ]
        .join(' ')
        .toLowerCase();
      return haystack.includes(q);
    });
  }, [query, craftFilter]);

  return (
    <div className="max-w-7xl mx-auto px-4 py-10">
      <div className="text-center mb-8">
        <span className="inline-block px-4 py-1.5 rounded-full bg-terracotta/10 text-terracotta text-sm font-semibold mb-3">
          {t('marketplace.badge')}
        </span>
        <h2 className="font-display text-3xl md:text-4xl font-extrabold text-indigonight">
          {t('marketplace.title')}
        </h2>
        <p className="text-xs sm:text-sm text-indigonight/60 mt-1 max-w-xl mx-auto">
          {t('marketplace.subtitle')}
        </p>
      </div>

      <div className="flex flex-col md:flex-row gap-3 mb-6 sticky top-16 z-30 glass p-3 rounded-2xl border border-terracotta/15 shadow-sm">
        <div className="flex items-center gap-2 bg-white rounded-full px-4 py-2 flex-1 border border-terracotta/15">
          <Search size={16} className="text-terracotta" />
          <input
            value={query}
            onChange={e => setQuery(e.target.value)}
            placeholder={t('marketplace.searchPlaceholder')}
            className="bg-transparent outline-none text-sm flex-1"
          />
        </div>
        <div className="flex items-center gap-2 overflow-x-auto pb-1 md:pb-0">
          <SlidersHorizontal size={16} className="text-terracotta flex-shrink-0" />
          {['All', ...CRAFTS].map(c => (
            <button
              key={c}
              onClick={() => setCraftFilter(c)}
              className={`whitespace-nowrap px-3 py-1.5 rounded-full text-xs font-semibold flex-shrink-0 transition ${
                craftFilter === c
                  ? 'bg-terracotta text-white shadow-sm'
                  : 'bg-white text-indigonight/70 hover:bg-terracotta/10 border border-terracotta/15'
              }`}
            >
              {c === 'All' ? t('common.all') : c}
            </button>
          ))}
        </div>
      </div>

      <p className="text-xs sm:text-sm text-indigonight/50 mb-4 font-medium">
        {filtered.length} {t('marketplace.found')}
      </p>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filtered.map(p => (
          <motion.div
            key={p.id}
            whileHover={{ y: -6 }}
            className="bg-white rounded-2xl overflow-hidden shadow-sm border border-terracotta/10 hover:shadow-glow transition craft-card flex flex-col justify-between"
          >
            <div>
              <div className="h-52 bg-sand relative overflow-hidden group">
                <img
                  src={p.image}
                  alt={p.name}
                  loading="lazy"
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = "https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=800&q=80";
                  }}
                  className="w-full h-full object-cover object-center group-hover:scale-108 transition-transform duration-500"
                />
                
                {/* Gradient dark scrim at top for badge legibility */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-black/25 pointer-events-none" />

                <span className="absolute top-3 left-3 bg-white/95 backdrop-blur-md text-terracotta text-[10px] font-bold px-2.5 py-1 rounded-full shadow-sm">
                  {p.craft}
                </span>

                {/* Quick Watch Story overlay badge */}
                {onOpenStory && (
                  <button
                    onClick={() => onOpenStory(p)}
                    className="absolute top-3 right-3 bg-black/60 hover:bg-black/80 text-white text-[11px] font-semibold px-2.5 py-1 rounded-full flex items-center gap-1.5 backdrop-blur-md transition shadow-sm"
                    title={t('marketplace.watchStory')}
                  >
                    <Play size={10} className="fill-current text-turmeric" />
                    <span>Story</span>
                  </button>
                )}

                {/* Bottom Overlay: GI Certified badge & In Stock */}
                <div className="absolute bottom-2.5 left-3 right-3 flex items-center justify-between text-[10px] text-white/95 font-medium pointer-events-none">
                  <span className="bg-black/40 backdrop-blur-sm px-2 py-0.5 rounded-full">
                    🛡️ GI Certified
                  </span>
                  <span className="bg-white/20 backdrop-blur-sm px-2 py-0.5 rounded-full">
                    {p.stock} available
                  </span>
                </div>
              </div>

              <div className="p-4">
                <h3 className="font-display font-bold text-sm leading-snug text-indigonight">
                  {p.name}
                </h3>
                <p className="text-xs text-indigonight/50 mt-1 flex items-center gap-1">
                  <MapPin size={11} /> {p.district}, {p.state}
                </p>

                <div className="flex items-center justify-between mt-3">
                  <p className="font-display font-bold text-base text-terracotta">
                    ₹{p.price.toLocaleString()}
                  </p>
                  <div className="flex items-center gap-1 text-xs text-bronze font-semibold">
                    <Star size={12} fill="currentColor" /> 4.{6 + (p.id % 4)}
                  </div>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="p-4 pt-0 space-y-2">
              <div className="flex gap-2">
                <button
                  onClick={() => openPassport(p)}
                  className="flex-1 text-xs font-semibold border border-terracotta/30 text-terracotta rounded-full py-2 flex items-center justify-center gap-1 hover:bg-terracotta/5 transition"
                >
                  <Fingerprint size={13} /> {t('marketplace.meetArtisan')}
                </button>

                {onOpenStory && (
                  <button
                    onClick={() => onOpenStory(p)}
                    className="flex-1 text-xs font-semibold bg-terracotta/10 hover:bg-terracotta/15 text-terracotta border border-terracotta/20 rounded-full py-2 flex items-center justify-center gap-1 transition"
                  >
                    <Play size={11} className="fill-current" /> {t('marketplace.watchStory')}
                  </button>
                )}
              </div>

              <button className="w-full text-xs font-semibold bg-terracotta text-white rounded-full py-2 hover:bg-terracotta-dark transition shadow-sm">
                {t('marketplace.enquireBtn')}
              </button>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}