import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Mic, Package, ShoppingBag, Wallet, Globe, ChevronRight, Star, Plus } from 'lucide-react';
import { ARTISANS, PRODUCTS, ORDERS } from '../../demoData.js';

const LANGS = { en: 'English', ta: 'தமிழ்', hi: 'हिंदी' };
const T = {
  en: { greet: "Welcome back", products: "My Products", orders: "Recent Orders", earnings: "Total Earnings", addNew: "Add New Product", speak: "Tap & Speak to AI" },
  ta: { greet: "மீண்டும் வரவேற்கிறோம்", products: "எனது பொருட்கள்", orders: "சமீபத்திய ஆர்டர்கள்", earnings: "மொத்த வருமானம்", addNew: "புதிய பொருள் சேர்க்க", speak: "AI உடன் பேச தட்டவும்" },
  hi: { greet: "वापसी पर स्वागत है", products: "मेरे उत्पाद", orders: "हाल के ऑर्डर", earnings: "कुल कमाई", addNew: "नया उत्पाद जोड़ें", speak: "AI से बात करने के लिए टैप करें" },
};

export default function ArtisanMode({ go }) {
  const [lang, setLang] = useState('en');
  const meenakshi = ARTISANS[0];
  const products = PRODUCTS.filter(p => p.artisanId === 1);
  const t = T[lang];

  return (
    <div className="max-w-md mx-auto px-4 py-6">
      <div className="bg-gradient-to-br from-madder to-indigonight rounded-3xl p-6 text-white relative overflow-hidden shadow-2xl">
        <div className="absolute -right-8 -top-8 w-32 h-32 rounded-full bg-turmeric/20" />
        <div className="flex justify-between items-start relative z-10">
          <div>
            <p className="text-white/70 text-sm">{t.greet},</p>
            <h2 className="font-display text-2xl font-bold">{meenakshi.name} {meenakshi.avatar}</h2>
            <p className="text-white/70 text-sm mt-1">{meenakshi.craft} • {meenakshi.district}</p>
            <div className="flex items-center gap-1 mt-2 text-turmeric text-sm">
              <Star size={14} fill="currentColor" /> {meenakshi.rating} · {meenakshi.exp} yrs experience
            </div>
          </div>
          <div className="flex gap-1 bg-white/10 rounded-full p-1">
            {Object.keys(LANGS).map(l => (
              <button key={l} onClick={() => setLang(l)} className={`px-2.5 py-1 rounded-full text-xs font-semibold ${lang===l ? 'bg-turmeric text-indigonight' : 'text-white/70'}`}>
                {LANGS[l]}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Big voice button */}
      <motion.button onClick={() => go('voice')} whileTap={{scale:0.95}}
        className="w-full mt-5 bg-white rounded-2xl p-5 shadow-lg border border-terracotta/15 flex items-center gap-4 hover:shadow-glow transition">
        <div className="relative">
          <div className="absolute inset-0 rounded-full bg-terracotta pulse-ring" />
          <div className="relative w-14 h-14 rounded-full bg-gradient-to-br from-terracotta to-madder flex items-center justify-center">
            <Mic className="text-white" size={24} />
          </div>
        </div>
        <div className="text-left">
          <p className="font-display font-bold">{t.speak}</p>
          <p className="text-xs text-indigonight/50">"நான் இதை பட்டு நூலால் நெய்தேன்..."</p>
        </div>
        <ChevronRight className="ml-auto text-terracotta" />
      </motion.button>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-3 mt-5">
        {[
          {icon: Package, val: meenakshi.products, label: "Products"},
          {icon: ShoppingBag, val: ORDERS.length, label: "Orders"},
          {icon: Wallet, val: `₹${(meenakshi.earnings/1000).toFixed(0)}K`, label: t.earnings},
        ].map((s,i) => (
          <div key={i} className="bg-white rounded-xl p-4 text-center shadow-sm border border-terracotta/10">
            <s.icon className="mx-auto text-terracotta mb-1" size={20} />
            <p className="font-display font-bold text-lg">{s.val}</p>
            <p className="text-[11px] text-indigonight/50">{s.label}</p>
          </div>
        ))}
      </div>

      {/* Products */}
      <div className="mt-6">
        <div className="flex justify-between items-center mb-3">
          <h3 className="font-display font-bold">{t.products}</h3>
          <button onClick={() => go('catalog')} className="text-terracotta text-sm font-semibold flex items-center gap-1">
            <Plus size={14} /> {t.addNew}
          </button>
        </div>
        <div className="space-y-3">
          {products.map(p => (
            <div key={p.id} className="bg-white rounded-xl p-3 flex items-center gap-3 shadow-sm border border-terracotta/10">
              <div className={`w-14 h-14 rounded-lg bg-gradient-to-br ${p.gradient} flex-shrink-0`} />
              <div className="flex-1">
                <p className="font-semibold text-sm">{p.name}</p>
                <p className="text-xs text-indigonight/50">{p.material}</p>
              </div>
              <p className="font-display font-bold text-terracotta">₹{p.price.toLocaleString()}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Orders */}
      <div className="mt-6">
        <h3 className="font-display font-bold mb-3">{t.orders}</h3>
        <div className="space-y-2">
          {ORDERS.map(o => (
            <div key={o.id} className="bg-white rounded-xl p-3 flex justify-between items-center shadow-sm border border-terracotta/10">
              <div>
                <p className="text-sm font-semibold">{o.product}</p>
                <p className="text-xs text-indigonight/50">{o.buyer}</p>
              </div>
              <div className="text-right">
                <p className="font-bold text-sm">₹{o.amount.toLocaleString()}</p>
                <span className={`text-[10px] px-2 py-0.5 rounded-full ${o.status==='Delivered' ? 'bg-green-100 text-green-700' : o.status==='In Transit' ? 'bg-turmeric/20 text-bronze' : 'bg-terracotta/10 text-terracotta'}`}>{o.status}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}