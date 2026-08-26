import React, { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { Search, SlidersHorizontal, MapPin, Star, Fingerprint } from 'lucide-react';
import { PRODUCTS, CRAFTS } from '../../../demoData.js';

export default function Marketplace({ go, openPassport }) {
  const [query, setQuery] = useState('');
  const [craftFilter, setCraftFilter] = useState('All');

  const filtered = useMemo(() => {
    return PRODUCTS.filter(p =>
      (craftFilter === 'All' || p.craft === craftFilter) &&
      (p.name.toLowerCase().includes(query.toLowerCase()) || p.craft.toLowerCase().includes(query.toLowerCase()))
    );
  }, [query, craftFilter]);

  return (
    <div className="max-w-7xl mx-auto px-4 py-10">
      <div className="text-center mb-8">
        <span className="inline-block px-4 py-1.5 rounded-full bg-terracotta/10 text-terracotta text-sm font-semibold mb-3">🛍️ Buyer Marketplace</span>
        <h2 className="font-display text-3xl md:text-4xl font-extrabold">Authentic Crafts, Direct from Artisans</h2>
      </div>

      <div className="flex flex-col md:flex-row gap-3 mb-6 sticky top-16 z-30 glass p-3 rounded-2xl border border-terracotta/15">
        <div className="flex items-center gap-2 bg-white rounded-full px-4 py-2 flex-1 border border-terracotta/15">
          <Search size={16} className="text-terracotta" />
          <input value={query} onChange={e=>setQuery(e.target.value)} placeholder="Search crafts, products..." className="bg-transparent outline-none text-sm flex-1" />
        </div>
        <div className="flex items-center gap-2 overflow-x-auto pb-1 md:pb-0">
          <SlidersHorizontal size={16} className="text-terracotta flex-shrink-0" />
          {['All', ...CRAFTS].map(c => (
            <button key={c} onClick={()=>setCraftFilter(c)}
              className={`whitespace-nowrap px-3 py-1.5 rounded-full text-xs font-medium flex-shrink-0 ${craftFilter===c ? 'bg-terracotta text-white' : 'bg-white text-indigonight/60 border border-terracotta/15'}`}>
              {c}
            </button>
          ))}
        </div>
      </div>

      <p className="text-sm text-indigonight/50 mb-4">{filtered.length} products found</p>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filtered.map(p => (
          <motion.div key={p.id} whileHover={{y:-6}} className="bg-white rounded-2xl overflow-hidden shadow-sm border border-terracotta/10 hover:shadow-glow transition">
            <div className={`h-44 bg-gradient-to-br ${p.gradient} relative flex items-center justify-center`}>
              <span className="text-5xl opacity-40">🧵</span>
              <span className="absolute top-3 left-3 bg-white/90 text-terracotta text-[10px] font-bold px-2 py-1 rounded-full">{p.craft}</span>
            </div>
            <div className="p-4">
              <h3 className="font-display font-bold text-sm leading-snug">{p.name}</h3>
              <p className="text-xs text-indigonight/50 mt-1 flex items-center gap-1"><MapPin size={11}/> {p.district}, {p.state}</p>
              <div className="flex items-center justify-between mt-3">
                <p className="font-display font-bold text-terracotta">₹{p.price.toLocaleString()}</p>
                <div className="flex items-center gap-1 text-xs text-bronze"><Star size={12} fill="currentColor"/> 4.{6+p.id%4}</div>
              </div>
              <div className="flex gap-2 mt-3">
                <button onClick={() => openPassport(p)} className="flex-1 text-xs font-semibold border border-terracotta/30 text-terracotta rounded-full py-2 flex items-center justify-center gap-1 hover:bg-terracotta/5">
                  <Fingerprint size={13}/> Meet the Artisan
                </button>
                <button className="flex-1 text-xs font-semibold bg-terracotta text-white rounded-full py-2 hover:bg-terracotta-dark">
                  Enquire
                </button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}