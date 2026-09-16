import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Home, User, Sparkles, Mic, Store, Target, Map, Landmark, Menu, X } from 'lucide-react';
import Landing from './components/Landing.jsx';
import ArtisanMode from './components/ArtisanMode.jsx';
import AICatalog from './components/AICatalog.jsx';
import VoiceAssistant from './components/VoiceAssistant.jsx';
import Marketplace from './components/Marketplace.jsx';
import BuyerMatching from './components/BuyerMatching.jsx';
import DemandMap from './components/DemandMap.jsx';
import GovDashboard from './components/GovDashboard.jsx';
import CraftPassport from './components/CraftPassport.jsx';
import ArtisanStoryModal from './components/ArtisanStoryModal.jsx';
import LanguageSelector from './components/LanguageSelector.jsx';
import { LanguageProvider, useLanguage } from './i18n/LanguageContext.jsx';
import logoImg from './assets/logo.png';
import { ARTISANS, PRODUCTS } from '../demoData.js';

function MainApp() {
  const { t } = useLanguage();
  const [screen, setScreen] = useState('landing');
  const [passportProduct, setPassportProduct] = useState(null);
  const [storyProduct, setStoryProduct] = useState(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const [marketQuery, setMarketQuery] = useState('');

  const openPassport = (product) => {
    setPassportProduct(product);
    setScreen('passport');
  };

  const openStory = (product) => {
    setStoryProduct(product || PRODUCTS[0]);
  };

  const go = (id) => {
    setScreen(id);
    setMenuOpen(false);
  };

  const searchMarketplace = (query) => {
    setMarketQuery(query || '');
    go('marketplace');
  };

  const screens = [
    { id: 'landing', label: t('nav.home'), icon: Home },
    { id: 'artisan', label: t('nav.artisan'), icon: User },
    { id: 'catalog', label: t('nav.catalog'), icon: Sparkles },
    { id: 'voice', label: t('nav.voice'), icon: Mic },
    { id: 'marketplace', label: t('nav.marketplace'), icon: Store },
    { id: 'matching', label: t('nav.matching'), icon: Target },
    { id: 'map', label: t('nav.map'), icon: Map },
    { id: 'gov', label: t('nav.gov'), icon: Landmark },
  ];

  return (
    <div className="min-h-screen bg-[#120C08] text-ivory font-body khadi-texture flex flex-col justify-between">
      {/* Top Navigation Bar */}
      <div className="sticky top-0 z-50 glass border-b border-terracotta/25 shadow-md bg-[#160E09]/90 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-4 py-2.5 flex items-center justify-between gap-2">
          {/* Logo & Brand */}
          <div
            className="flex items-center gap-2.5 cursor-pointer flex-shrink-0 group"
            onClick={() => go('landing')}
          >
            <img
              src={logoImg}
              alt="KalaaSetu Logo"
              className="w-9 h-9 rounded-xl object-cover shadow-sm border border-terracotta/40 group-hover:border-terracotta transition-all transform group-hover:scale-105"
            />
            <span className="font-display font-bold text-lg tracking-tight text-ivory">
              Kalaa<span className="text-terracotta">Setu</span>
            </span>
          </div>

          {/* Desktop Navigation Links */}
          <div className="hidden lg:flex items-center gap-1 overflow-x-auto py-1">
            {screens.map((s) => (
              <button
                key={s.id}
                onClick={() => go(s.id)}
                className={`px-3 py-1.5 rounded-full text-xs font-semibold flex items-center gap-1.5 transition-all whitespace-nowrap ${
                  screen === s.id
                    ? 'bg-terracotta text-white shadow-glow'
                    : 'text-ivory/80 hover:bg-terracotta/20 hover:text-white'
                }`}
              >
                <s.icon size={14} /> {s.label}
              </button>
            ))}
          </div>

          {/* Right Action: Language Selector & Mobile Menu Toggle */}
          <div className="flex items-center gap-2">
            {/* Feature 3: Visible Language Selector in Navbar */}
            <LanguageSelector />

            <button
              className="lg:hidden p-1.5 rounded-xl hover:bg-terracotta/20 text-ivory transition"
              onClick={() => setMenuOpen(!menuOpen)}
              aria-label="Toggle menu"
            >
              {menuOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        <AnimatePresence>
          {menuOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="lg:hidden overflow-hidden border-t border-terracotta/20 bg-[#160E09]/95 backdrop-blur-md"
            >
              <div className="p-3 grid grid-cols-2 gap-2">
                {screens.map((s) => (
                  <button
                    key={s.id}
                    onClick={() => go(s.id)}
                    className={`px-3 py-2 rounded-xl text-xs font-semibold flex items-center gap-2 transition ${
                      screen === s.id
                        ? 'bg-terracotta text-white shadow-sm'
                        : 'bg-[#241710] text-ivory/80 hover:bg-[#2c1d14] hover:text-white'
                    }`}
                  >
                    <s.icon size={15} /> {s.label}
                  </button>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Main Content Screens */}
      <main className="flex-1">
        <AnimatePresence mode="wait">
          <motion.div
            key={screen}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.3 }}
          >
            {screen === 'landing' && (
              <Landing go={go} onOpenStory={openStory} onSearch={searchMarketplace} />
            )}
            {screen === 'artisan' && <ArtisanMode go={go} />}
            {screen === 'catalog' && <AICatalog go={go} />}
            {screen === 'voice' && <VoiceAssistant go={go} />}
            {screen === 'marketplace' && (
              <Marketplace
                go={go}
                openPassport={openPassport}
                onOpenStory={openStory}
                initialQuery={marketQuery}
              />
            )}
            {screen === 'matching' && <BuyerMatching go={go} />}
            {screen === 'map' && <DemandMap go={go} />}
            {screen === 'gov' && <GovDashboard go={go} />}
            {screen === 'passport' && (
              <CraftPassport
                go={go}
                product={passportProduct || PRODUCTS[0]}
                artisan={ARTISANS.find((a) => a.id === (passportProduct?.artisanId || 1))}
                onOpenStory={openStory}
              />
            )}
          </motion.div>
        </AnimatePresence>
      </main>

      {/* FEATURE 1: Artisan Storytelling Video Modal */}
      <AnimatePresence>
        {storyProduct && (
          <ArtisanStoryModal
            product={storyProduct}
            onClose={() => setStoryProduct(null)}
            openPassport={openPassport}
            go={go}
          />
        )}
      </AnimatePresence>

      {/* Footer */}
      <footer className="text-center py-8 px-4 text-xs sm:text-sm text-ivory/60 border-t border-terracotta/20 mt-12 bg-[#160E09]/60">
        <p className="max-w-md mx-auto">
          {t('footer.slogan')} —{' '}
          <span className="font-bold text-terracotta-light font-display">
            {t('footer.brand')}
          </span>
        </p>
      </footer>
    </div>
  );
}

export default function App() {
  return (
    <LanguageProvider>
      <MainApp />
    </LanguageProvider>
  );
}