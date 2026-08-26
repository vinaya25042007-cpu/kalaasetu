import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Home, User, Sparkles, Mic, Store, Target, Map, Landmark, Fingerprint, Menu, X } from 'lucide-react';
import Landing from './components/landing.jsx';
import ArtisanMode from './components/ArtisanMode.jsx';
import AICatalog from './components/AICatalog.jsx';
import VoiceAssistant from './components/VoiceAssistant.jsx';
import Marketplace from './components/Marketplace.jsx';
import BuyerMatching from './components/BuyerMatching.jsx';
import DemandMap from './components/DemandMap.jsx';
import GovDashboard from './components/GovDashboard.jsx';
import CraftPassport from './components/CraftPassport.jsx';
import { ARTISANS, PRODUCTS } from '../demoData.js';

const SCREENS = [
  { id: 'landing', label: 'Home', icon: Home },
  { id: 'artisan', label: 'Artisan Mode', icon: User },
  { id: 'catalog', label: 'AI Catalog', icon: Sparkles },
  { id: 'voice', label: 'Voice AI', icon: Mic },
  { id: 'marketplace', label: 'Marketplace', icon: Store },
  { id: 'matching', label: 'Buyer Match', icon: Target },
  { id: 'map', label: 'Demand Map', icon: Map },
  { id: 'gov', label: 'Gov Dashboard', icon: Landmark },
];

export default function App() {
  const [screen, setScreen] = useState('landing');
  const [passportProduct, setPassportProduct] = useState(null);
  const [menuOpen, setMenuOpen] = useState(false);

  const openPassport = (product) => {
    setPassportProduct(product);
    setScreen('passport');
  };

  const go = (id) => { setScreen(id); setMenuOpen(false); };

  return (
    <div className="min-h-screen bg-ivory text-indigonight font-body">
      {/* Top Nav */}
      <div className="sticky top-0 z-50 glass border-b border-terracotta/20">
        <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-2 cursor-pointer" onClick={() => go('landing')}>
            <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-terracotta to-turmeric flex items-center justify-center text-white font-display font-bold">क</div>
            <span className="font-display font-bold text-lg tracking-tight">Kalaa<span className="text-terracotta">Setu</span></span>
          </div>
          <div className="hidden lg:flex items-center gap-1">
            {SCREENS.map(s => (
              <button key={s.id} onClick={() => go(s.id)}
                className={`px-3 py-2 rounded-full text-sm font-medium flex items-center gap-1.5 transition-all ${screen===s.id ? 'bg-terracotta text-white shadow-glow' : 'text-indigonight/70 hover:bg-terracotta/10'}`}>
                <s.icon size={15} /> {s.label}
              </button>
            ))}
          </div>
          <button className="lg:hidden" onClick={() => setMenuOpen(!menuOpen)}>
            {menuOpen ? <X /> : <Menu />}
          </button>
        </div>
        <AnimatePresence>
        {menuOpen && (
          <motion.div initial={{height:0,opacity:0}} animate={{height:'auto',opacity:1}} exit={{height:0,opacity:0}} className="lg:hidden overflow-hidden border-t border-terracotta/20">
            <div className="p-3 grid grid-cols-2 gap-2">
              {SCREENS.map(s => (
                <button key={s.id} onClick={() => go(s.id)}
                  className={`px-3 py-2 rounded-lg text-sm font-medium flex items-center gap-1.5 ${screen===s.id ? 'bg-terracotta text-white' : 'bg-white/60 text-indigonight/70'}`}>
                  <s.icon size={15} /> {s.label}
                </button>
              ))}
            </div>
          </motion.div>
        )}
        </AnimatePresence>
      </div>

      <AnimatePresence mode="wait">
        <motion.div key={screen} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -12 }} transition={{ duration: 0.35 }}>
          {screen === 'landing' && <Landing go={go} />}
          {screen === 'artisan' && <ArtisanMode go={go} />}
          {screen === 'catalog' && <AICatalog go={go} />}
          {screen === 'voice' && <VoiceAssistant go={go} />}
          {screen === 'marketplace' && <Marketplace go={go} openPassport={openPassport} />}
          {screen === 'matching' && <BuyerMatching go={go} />}
          {screen === 'map' && <DemandMap go={go} />}
          {screen === 'gov' && <GovDashboard go={go} />}
          {screen === 'passport' && <CraftPassport go={go} product={passportProduct || PRODUCTS[0]} artisan={ARTISANS.find(a=>a.id===(passportProduct?.artisanId||1))} />}
        </motion.div>
      </AnimatePresence>

      <footer className="text-center py-8 text-sm text-indigonight/50 border-t border-terracotta/10 mt-10">
        India already has the talent. We're building the bridge. — <span className="font-semibold text-terracotta">KalaaSetu</span>
      </footer>
    </div>
  );
}