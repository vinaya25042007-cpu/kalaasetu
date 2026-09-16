import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Camera, Sparkles, LayoutGrid, ShoppingBag, TrendingUp,
  ArrowRight, Mic, Landmark, Target, Play, Search,
  Users, AlertTriangle, Lightbulb
} from 'lucide-react';
import { useLanguage } from '../i18n/LanguageContext.jsx';
import BrushStroke from './craft/BrushStroke.jsx';
import { 
  KolamMotif, JaaliDivider, WarliChain, PaisleyKalkaMotif, 
  MarigoldToran, DiyaLamp, MayurMotif, PurnaKalash, 
  RangoliCorner, TempleBell, AjrakhBand 
} from './craft/IndianPatterns.jsx';
import { PRODUCTS } from '../../demoData.js';
import { CRAFT_STORIES } from '../data/craftStories.js';

const CATEGORIES = [
  { id: 'pottery', labelKey: 'landing.catPottery', query: 'Pottery' },
  { id: 'toys', labelKey: 'landing.catToys', query: 'Channapatna' },
  { id: 'handloom', labelKey: 'landing.catHandloom', query: 'Silk' },
  { id: 'embroidery', labelKey: 'landing.catEmbroidery', query: 'Embroidery' },
  { id: 'bamboo', labelKey: 'landing.catBamboo', query: 'Bamboo' },
  { id: 'wood', labelKey: 'landing.catWood', query: 'Wooden' },
  { id: 'stone', labelKey: 'landing.catStone', query: 'Bidriware' },
  { id: 'metal', labelKey: 'landing.catMetal', query: 'Dhokra' },
  { id: 'jewellery', labelKey: 'landing.catJewellery', query: 'inlay' },
  { id: 'painting', labelKey: 'landing.catPainting', query: 'Painting' },
  { id: 'blockprint', labelKey: 'landing.catBlockprint', query: 'Kalamkari' },
];

export default function Landing({ go, onOpenStory, onSearch }) {
  const { t } = useLanguage();
  const [heroQuery, setHeroQuery] = useState('');

  const submitSearch = (value) => {
    const q = (value ?? heroQuery).trim();
    if (onSearch) onSearch(q);
    else go('marketplace');
  };

  const journey = [
    { num: '१', icon: Camera, label: 'Artisan Speaks', desc: 'Shows craft, speaks in mother tongue (0 typing)' },
    { num: '२', icon: Sparkles, label: 'AI Vision & Voice', desc: 'Identifies craft DNA, weave count & pricing' },
    { num: '३', icon: LayoutGrid, label: 'Global Catalog', desc: 'Auto-generates GI certified export listing' },
    { num: '४', icon: ShoppingBag, label: 'Boutique Match', desc: 'Matched with verified bulk buyers & exporters' },
    { num: '५', icon: TrendingUp, label: 'Direct Aadhaar DBT', desc: '100% fair payout to artisan bank account' },
  ];

  return (
    <div className="relative overflow-hidden w-full khadi-texture">
      {/* MAIN CONTAINER */}
      <div className="max-w-7xl mx-auto px-3 sm:px-6 relative z-10">
        {/* Auspicious Marigold Toran Garland Across Top */}
        <div className="pt-2 pb-1">
          <MarigoldToran count={19} />
        </div>

        {/* HERO SECTION */}
        <section className="pt-4 sm:pt-8 pb-8 relative">
          {/* Heritage Shloka / Motto Ribbon */}
          <div className="text-center mb-4">
            <span className="text-[11px] font-bold text-terracotta tracking-widest uppercase bg-terracotta/10 px-4 py-1.5 rounded-full border border-terracotta/20 shadow-xs inline-flex items-center gap-2">
              <span>॥ हस्तकला परमो धर्मः</span>
              <span className="text-turmeric">•</span>
              <span>सर्वं स्वदेशजं सुन्दरम् ॥</span>
            </span>
          </div>

          {/* MAIN HERO SHOWCASE CARD (Centered & Clean) */}
          <div className="max-w-4xl mx-auto flex flex-col justify-center text-center glass rounded-3xl p-6 sm:p-10 border-2 border-terracotta/30 shadow-xl overflow-hidden bg-gradient-to-b from-white/95 via-ivory/90 to-white/95 relative">
            {/* Traditional Rangoli Corner Accents */}
            <div className="absolute top-2 left-2 pointer-events-none">
              <RangoliCorner size={36} />
            </div>
            <div className="absolute top-2 right-2 pointer-events-none rotate-90">
              <RangoliCorner size={36} />
            </div>
            <div className="absolute bottom-2 left-2 pointer-events-none -rotate-90">
              <RangoliCorner size={36} />
            </div>
            <div className="absolute bottom-2 right-2 pointer-events-none rotate-180">
              <RangoliCorner size={36} />
            </div>

            {/* Ornate Indian Heritage Badge */}
            <div className="inline-flex items-center justify-center gap-2 px-4 py-1.5 rounded-full bg-gradient-to-r from-terracotta/15 via-turmeric/25 to-terracotta/15 text-indigonight text-xs font-bold mb-4 tracking-wide border border-terracotta/25 shadow-2xs mx-auto">
              <DiyaLamp size={18} />
              <span>🪷 Indian Craftsmanship meets Modern AI</span>
              <DiyaLamp size={18} />
            </div>

            <motion.h1
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="font-display text-3xl sm:text-4xl lg:text-[2.75rem] font-extrabold leading-[1.18] tracking-tight text-indigonight"
            >
              {t('landing.heroHeadline1')}
              <br />
              <BrushStroke color="terracotta">
                <span className="text-gradient">{t('landing.heroHeadline2')}</span>
              </BrushStroke>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="mt-3.5 text-sm sm:text-base text-indigonight/80 max-w-xl mx-auto leading-relaxed font-normal"
            >
              Empowering <b>15,000+ Indian Master Artisans</b> across 28 states. Zero typing. Zero English barriers. An artisan speaks in their native mother tongue — AI values the craft, certifies GI origin, and connects to global buyers.
            </motion.p>

            {/* Live Regional Voice Studio Teaser Chip */}
            <div className="mt-3.5 flex items-center justify-center">
              <button
                onClick={() => go('voice')}
                className="px-4 py-1.5 rounded-full bg-madder/10 hover:bg-madder/15 text-madder border border-madder/25 text-xs font-bold transition flex items-center gap-2 shadow-2xs cursor-pointer"
              >
                <Mic size={14} className="text-madder animate-pulse" />
                <span>🎙️ Live Regional Voice Studio: Speak in Tamil, Hindi, Bengali, Telugu...</span>
              </button>
            </div>

            {/* Search Bar */}
            <motion.form
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.25 }}
              className="mt-5 flex items-center gap-2 bg-white border border-terracotta/30 rounded-full px-4 py-2 shadow-sm max-w-lg mx-auto w-full"
              onSubmit={(e) => {
                e.preventDefault();
                submitSearch();
              }}
            >
              <Search size={18} className="text-terracotta flex-shrink-0" />
              <input
                value={heroQuery}
                onChange={(e) => setHeroQuery(e.target.value)}
                placeholder={t('landing.heroSearchPlaceholder')}
                className="bg-transparent outline-none text-xs sm:text-sm flex-1 text-indigonight placeholder:text-indigonight/45 text-left"
                aria-label={t('common.search')}
              />
              <button
                type="submit"
                className="px-4 sm:px-5 py-1.5 rounded-full bg-terracotta text-white text-xs font-bold hover:bg-terracotta-dark transition shadow-2xs cursor-pointer"
              >
                {t('common.search')}
              </button>
            </motion.form>

            {/* CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="mt-5 flex flex-wrap gap-2.5 items-center justify-center"
            >
              <button
                onClick={() => go('marketplace')}
                className="px-6 py-3 rounded-full bg-terracotta text-white font-bold shadow-glow hover:bg-terracotta-dark transition flex items-center gap-2 text-xs sm:text-sm cursor-pointer"
              >
                {t('landing.exploreArtisans')} <ArrowRight size={16} />
              </button>
              <button
                onClick={() => go('artisan')}
                className="px-5 py-3 rounded-full bg-white border border-terracotta/30 text-terracotta font-bold hover:bg-terracotta/5 transition text-xs sm:text-sm flex items-center gap-2 shadow-2xs cursor-pointer"
              >
                <Users size={15} /> Open Artisan Mode
              </button>
            </motion.div>
          </div>
        </section>

        {/* AJRAKH GEOMETRIC BLOCK PRINT BORDER */}
        <AjrakhBand className="my-3" />

        {/* NATIONAL ARTISAN IMPACT TICKER WITH TRADITIONAL BRASS ACCENTS */}
        <section className="py-4">
          <div className="glass rounded-3xl p-5 sm:p-6 border border-terracotta/20 shadow-xs bg-gradient-to-r from-white/95 via-sand/40 to-white/95 relative overflow-hidden">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 text-center">
              <div className="flex flex-col items-center">
                <DiyaLamp size={18} className="mb-1 text-turmeric" />
                <p className="font-display font-black text-2xl sm:text-3xl text-terracotta">15,200+</p>
                <p className="text-[11px] sm:text-xs text-indigonight/60 font-semibold uppercase tracking-wider mt-0.5">Master Artisans</p>
              </div>
              <div className="flex flex-col items-center">
                <DiyaLamp size={18} className="mb-1 text-turmeric" />
                <p className="font-display font-black text-2xl sm:text-3xl text-indigonight">28</p>
                <p className="text-[11px] sm:text-xs text-indigonight/60 font-semibold uppercase tracking-wider mt-0.5">States & UTs Mapped</p>
              </div>
              <div className="flex flex-col items-center">
                <DiyaLamp size={18} className="mb-1 text-turmeric" />
                <p className="font-display font-black text-2xl sm:text-3xl text-green-700">₹4.8+ Cr</p>
                <p className="text-[11px] sm:text-xs text-indigonight/60 font-semibold uppercase tracking-wider mt-0.5">Direct Bank Payouts</p>
              </div>
              <div className="flex flex-col items-center">
                <DiyaLamp size={18} className="mb-1 text-turmeric" />
                <p className="font-display font-black text-2xl sm:text-3xl text-bronze">0%</p>
                <p className="text-[11px] sm:text-xs text-indigonight/60 font-semibold uppercase tracking-wider mt-0.5">Middlemen Commission</p>
              </div>
            </div>
          </div>
        </section>

        {/* CRAFT CATEGORIES FILTER PILLS */}
        <section className="py-4">
          <p className="text-xs font-bold uppercase tracking-wider text-bronze mb-3 text-center">
            {t('landing.categoriesTitle')}
          </p>
          <div className="flex flex-wrap justify-center gap-2">
            {CATEGORIES.map((c) => (
              <button
                key={c.id}
                onClick={() => submitSearch(c.query)}
                className="px-3.5 py-1.5 rounded-full bg-white/90 border border-terracotta/20 text-xs font-semibold text-indigonight/80 hover:bg-terracotta/10 hover:text-terracotta hover:border-terracotta/40 transition cursor-pointer shadow-2xs"
              >
                {t(c.labelKey)}
              </button>
            ))}
          </div>
        </section>

        {/* JAALI STONE CARVING DIVIDER */}
        <JaaliDivider className="my-5" />

        {/* THE PROBLEM & OUR SOLUTION */}
        <section className="grid md:grid-cols-2 gap-5 py-6">
          <motion.div
            initial={{ opacity: 0, x: -16 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="glass rounded-3xl p-6 sm:p-8 border-2 border-madder/30 shadow-sm relative overflow-hidden bg-white/90"
          >
            <div className="absolute top-0 left-0 right-0 h-1.5 bg-madder" />
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 rounded-2xl bg-madder/15 text-madder flex items-center justify-center">
                <AlertTriangle size={20} />
              </div>
              <h3 className="font-display font-bold text-xl sm:text-2xl text-madder">
                {t('landing.problemTitle')}
              </h3>
            </div>
            <p className="text-indigonight/80 leading-relaxed text-sm sm:text-base">
              {t('landing.problemDesc')}
            </p>
            <div className="mt-4 pt-4 border-t border-madder/15 text-xs text-madder font-semibold flex items-center gap-2 flex-wrap">
              <span>✕ No smartphone typing</span>
              <span>•</span>
              <span>✕ No English barrier</span>
              <span>•</span>
              <span>✕ No middleman cut</span>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 16 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="glass rounded-3xl p-6 sm:p-8 border-2 border-terracotta/30 shadow-sm relative overflow-hidden bg-white/90"
          >
            <div className="absolute top-0 left-0 right-0 h-1.5 bg-terracotta" />
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 rounded-2xl bg-terracotta/15 text-terracotta flex items-center justify-center">
                <Lightbulb size={20} />
              </div>
              <h3 className="font-display font-bold text-xl sm:text-2xl text-terracotta">
                {t('landing.solutionTitle')}
              </h3>
            </div>
            <p className="text-indigonight/80 leading-relaxed text-sm sm:text-base">
              {t('landing.solutionDesc')}
            </p>
            <div className="mt-4 pt-4 border-t border-terracotta/15 text-xs text-terracotta font-semibold flex items-center gap-2 flex-wrap">
              <span>✓ Show & Speak in 12 languages</span>
              <span>•</span>
              <span>✓ AI Instant GI Catalog</span>
              <span>•</span>
              <span>✓ Direct Bank DBT</span>
            </div>
          </motion.div>
        </section>

        {/* SEAMLESS 5-STEP JOURNEY WITH AUTHENTIC DEVANAGARI NUMERALS */}
        <section className="py-10">
          <h2 className="text-center font-display text-2xl sm:text-3xl font-bold mb-2 text-indigonight">
            {t('landing.journeyTitle')}
          </h2>
          <p className="text-center text-indigonight/60 mb-10 text-xs sm:text-sm">
            {t('landing.journeySub')}
          </p>
          <div className="relative flex flex-col md:flex-row items-center justify-between gap-6 md:gap-2">
            <div className="hidden md:block absolute top-8 left-0 right-0 h-0.5 bg-gradient-to-r from-terracotta via-turmeric to-madder -z-10" />
            {journey.map((step, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="flex flex-col items-center text-center w-full md:w-1/5"
              >
                <motion.div
                  whileHover={{ scale: 1.06 }}
                  className="w-15 h-15 rounded-2xl bg-white shadow-md border-2 border-terracotta/25 flex items-center justify-center mb-2.5 relative"
                >
                  <span className="absolute -top-2 -right-2 w-5.5 h-5.5 rounded-full bg-terracotta text-white text-[10px] font-bold flex items-center justify-center shadow-2xs">
                    {step.num}
                  </span>
                  <step.icon className="text-terracotta" size={24} />
                </motion.div>
                <h3 className="font-display font-bold text-xs sm:text-sm text-indigonight">{step.label}</h3>
                <p className="text-[11px] text-indigonight/60 mt-1 max-w-[140px] leading-tight">{step.desc}</p>
              </motion.div>
            ))}
          </div>
        </section>

        {/* STORIES BEHIND THE CRAFT SECTION */}
        <section className="py-6">
          <div className="text-center mb-6">
            <h2 className="font-display text-2xl sm:text-3xl font-extrabold text-indigonight">
              {t('landing.storiesTitle')}
            </h2>
            <p className="text-xs sm:text-sm text-indigonight/65 mt-1 max-w-xl mx-auto">
              {t('landing.storiesSub')}
            </p>
          </div>
          <div className="grid md:grid-cols-2 gap-5">
            {CRAFT_STORIES.slice(0, 2).map((story) => {
              const product = PRODUCTS.find((p) => p.id === story.productId) || PRODUCTS[0];
              return (
                <motion.button
                  key={story.id}
                  type="button"
                  whileHover={{ y: -3 }}
                  onClick={() => onOpenStory?.(product)}
                  className="text-left glass rounded-3xl p-5 sm:p-6 border border-terracotta/20 hover:shadow-glow transition relative overflow-hidden cursor-pointer bg-white/85"
                >
                  <div className="flex items-center justify-between mb-2">
                    <p className="text-[10px] font-bold uppercase tracking-wider text-terracotta">
                      {story.narrator.region}
                    </p>
                    <span className="text-[10px] px-2 py-0.5 rounded-full bg-turmeric/20 text-bronze font-bold">
                      Artisan Video
                    </span>
                  </div>
                  <h3 className="font-display text-lg sm:text-xl font-extrabold mb-1.5 text-indigonight">{story.title}</h3>
                  <p className="text-xs sm:text-sm text-indigonight/70 leading-relaxed mb-3.5">{story.subtitle}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-semibold text-indigonight/60">
                      {story.narrator.name} · {story.narrator.role}
                    </span>
                    <span className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-semibold text-madder">
                      <Play size={13} className="fill-current" /> {t('landing.watchStories')}
                    </span>
                  </div>
                </motion.button>
              );
            })}
          </div>
        </section>

        {/* EXPLORE THE PLATFORM PILLARS */}
        <section className="py-10">
          <h2 className="text-center font-display text-2xl sm:text-3xl font-bold mb-7 text-indigonight">
            {t('landing.exploreTitle')}
          </h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { id: 'catalog', icon: Sparkles, title: 'AI Catalog Generator', desc: 'Any Photo → full certified product listing in seconds' },
              { id: 'voice', icon: Mic, title: 'Voice AI Assistant', desc: 'Speak in Tamil, Hindi, Telugu or any regional tongue' },
              { id: 'matching', icon: Target, title: 'AI Buyer Matching', desc: 'Bulk orders matched directly to master artisans' },
              { id: 'gov', icon: Landmark, title: 'Government Dashboard', desc: 'Real-time national artisan & scheme insights' },
            ].map((f, i) => (
              <motion.div
                key={i}
                whileHover={{ y: -4 }}
                onClick={() => go(f.id)}
                className="glass rounded-2xl p-5 border border-terracotta/15 cursor-pointer hover:shadow-glow transition craft-card bg-white/85"
              >
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-terracotta to-turmeric flex items-center justify-center mb-3 shadow-xs">
                  <f.icon size={18} className="text-white" />
                </div>
                <h4 className="font-display font-bold mb-1 text-sm sm:text-base text-indigonight">{f.title}</h4>
                <p className="text-xs text-indigonight/60">{f.desc}</p>
              </motion.div>
            ))}
          </div>
        </section>

        {/* WARLI HARVEST DANCE & HERITAGE QUOTE BANNER */}
        <section className="text-center py-10 flex flex-col items-center relative">
          <div className="flex items-center gap-3 mb-3">
            <DiyaLamp size={26} />
            <WarliChain count={9} className="hidden sm:flex" />
            <DiyaLamp size={26} />
          </div>
          <p className="text-lg sm:text-2xl md:text-3xl font-display font-bold text-gradient max-w-3xl leading-snug">
            "{t('landing.quote')}"
          </p>
          <p className="text-xs text-indigonight/55 mt-2 italic">
            Every thread, pot, and stroke is an unbroken civilizational thread of Indian heritage.
          </p>
        </section>
      </div>
    </div>
  );
}
