import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Map, TrendingUp, ArrowRight } from 'lucide-react';
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid } from 'recharts';
import { STATE_DEMAND } from '../../../demoData.js';

export default function DemandMap({ go }) {
  const [selected, setSelected] = useState(STATE_DEMAND[0]);

  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="text-center mb-8">
        <span className="inline-block px-4 py-1.5 rounded-full bg-terracotta/10 text-terracotta text-sm font-semibold mb-3">🗺️ India Demand Map</span>
        <h2 className="font-display text-3xl md:text-4xl font-extrabold">Where Every Craft is in Demand</h2>
        <p className="text-indigonight/60 mt-2">Tap a state to see live craft demand & growth trend</p>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* stylized state grid "map" */}
        <div className="lg:col-span-2 glass rounded-3xl p-6 border border-terracotta/20">
          <div className="grid grid-cols-3 sm:grid-cols-4 gap-3">
            {STATE_DEMAND.map((s, i) => (
              <motion.button key={s.state} onClick={() => setSelected(s)}
                whileHover={{scale:1.06}} whileTap={{scale:0.96}}
                style={{opacity: 0.55 + s.demand/220}}
                className={`rounded-xl p-3 text-left border transition ${selected.state===s.state ? 'bg-terracotta text-white border-terracotta shadow-glow' : 'bg-white border-terracotta/15 hover:border-terracotta/40'}`}>
                <p className="text-[11px] font-bold leading-tight">{s.state}</p>
                <p className={`text-[10px] mt-1 ${selected.state===s.state ? 'text-white/80' : 'text-indigonight/50'}`}>{s.craft}</p>
                <div className="flex items-center gap-1 mt-2">
                  <div className={`h-1.5 flex-1 rounded-full ${selected.state===s.state ? 'bg-white/30' : 'bg-terracotta/10'}`}>
                    <div className={`h-1.5 rounded-full ${selected.state===s.state ? 'bg-white' : 'bg-terracotta'}`} style={{width:`${s.demand}%`}} />
                  </div>
                  <span className="text-[10px] font-bold">{s.demand}</span>
                </div>
              </motion.button>
            ))}
          </div>
        </div>

        {/* detail panel */}
        <div className="glass rounded-3xl p-6 border border-terracotta/20">
          <motion.div key={selected.state} initial={{opacity:0,y:10}} animate={{opacity:1,y:0}}>
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-terracotta to-turmeric flex items-center justify-center mb-4">
              <Map className="text-white" size={22} />
            </div>
            <h3 className="font-display font-bold text-xl">{selected.state}</h3>
            <p className="text-sm text-indigonight/60 mb-4">{selected.craft}</p>
            <div className="space-y-3">
              <div className="bg-white/70 rounded-xl p-3">
                <p className="text-xs text-indigonight/50">Demand Index</p>
                <p className="font-display font-bold text-2xl text-terracotta">{selected.demand}<span className="text-sm text-indigonight/40">/100</span></p>
              </div>
              <div className="bg-white/70 rounded-xl p-3 flex items-center justify-between">
                <div>
                  <p className="text-xs text-indigonight/50">YoY Growth</p>
                  <p className="font-display font-bold text-lg text-green-600">+{selected.growth}%</p>
                </div>
                <TrendingUp className="text-green-600" size={28} />
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Trend chart */}
      <div className="glass rounded-3xl p-6 border border-terracotta/20 mt-6">
        <h3 className="font-display font-bold mb-4">Demand Index — All Tracked States</h3>
        <ResponsiveContainer width="100%" height={280}>
          <BarChart data={STATE_DEMAND}>
            <CartesianGrid strokeDasharray="3 3" stroke="#BF5B3D" strokeOpacity={0.1} />
            <XAxis dataKey="state" tick={{fontSize:10}} angle={-30} textAnchor="end" height={70} />
            <YAxis tick={{fontSize:11}} />
            <Tooltip />
            <Bar dataKey="demand" fill="#BF5B3D" radius={[6,6,0,0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>

      <div className="text-center mt-8">
        <button onClick={() => go('gov')} className="px-7 py-3 rounded-full bg-terracotta text-white font-semibold inline-flex items-center gap-2 shadow-glow">
          See Government Impact <ArrowRight size={16} />
        </button>
      </div>
    </div>
  );
}