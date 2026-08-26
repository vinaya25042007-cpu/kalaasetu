import React from 'react';
import { motion } from 'framer-motion';
import { Camera, Sparkles, LayoutGrid, ShoppingBag, TrendingUp, ArrowRight, Mic, Landmark, Target } from 'lucide-react';

const journey = [
  { icon: Camera, label: "Artisan", desc: "Shows product, speaks in own language" },
  { icon: Sparkles, label: "AI", desc: "Identifies craft, understands speech" },
  { icon: LayoutGrid, label: "Catalog", desc: "Auto-generates listing & fair price" },
  { icon: ShoppingBag, label: "Buyer", desc: "Matched with the right market" },
  { icon: TrendingUp, label: "Market", desc: "Sold & tracked, income uplift" },
];

export default function Landing({ go }) {
  return (
    <div className="max-w-7xl mx-auto px-4">
      <section className="pt-16 pb-10 text-center relative overflow-hidden">
        <motion.div initial={{scale:0.8,opacity:0}} animate={{scale:1,opacity:1}} transition={{duration:0.8}}
          className="absolute -top-20 left-1/2 -translate-x-1/2 w-[600px] h-[600px] rounded-full bg-gradient-to-br from-terracotta/10 via-turmeric/10 to-transparent blur-3xl -z-10" />
        <motion.span initial={{opacity:0,y:-10}} animate={{opacity:1,y:0}} className="inline-block px-4 py-1.5 rounded-full bg-terracotta/10 text-terracotta text-sm font-semibold mb-6 tracking-wide">
          🪷 AI Market Bridge for Indian Artisans
        </motion.span>
        <motion.h1 initial={{opacity:0,y:20}} animate={{opacity:1,y:0}} transition={{delay:0.1}}
          className="font-display text-4xl md:text-6xl font-extrabold leading-tight max-w-4xl mx-auto">
          India's Crafts Deserve a <span className="text-gradient">Bigger Market.</span>
        </motion.h1>
        <motion.p initial={{opacity:0,y:20}} animate={{opacity:1,y:0}} transition={{delay:0.2}}
          className="mt-6 text-lg text-indigonight/70 max-w-2xl mx-auto">
          Zero typing. Zero English. Zero digital literacy. An artisan just shows their craft and speaks — AI does the rest, from catalog to buyer to fair price.
        </motion.p>
        <motion.div initial={{opacity:0,y:20}} animate={{opacity:1,y:0}} transition={{delay:0.3}} className="mt-8 flex flex-wrap gap-4 justify-center">
          <button onClick={() => go('artisan')} className="px-7 py-3.5 rounded-full bg-terracotta text-white font-semibold shadow-glow hover:bg-terracotta-dark transition flex items-center gap-2">
            Try Artisan Mode <ArrowRight size={18} />
          </button>
          <button onClick={() => go('marketplace')} className="px-7 py-3.5 rounded-full glass border border-terracotta/30 text-terracotta font-semibold hover:bg-terracotta/10 transition">
            Explore Marketplace
          </button>
        </motion.div>
      </section>

      {/* Animated journey */}
      <section className="py-16">
        <h2 className="text-center font-display text-2xl font-bold mb-2">Show & Speak → AI Understands → Sold</h2>
        <p className="text-center text-indigonight/60 mb-12">The complete journey, in one seamless flow</p>
        <div className="relative flex flex-col md:flex-row items-center justify-between gap-8 md:gap-2">
          <div className="hidden md:block absolute top-8 left-0 right-0 h-0.5 bg-gradient-to-r from-terracotta via-turmeric to-madder -z-10" />
          {journey.map((step, i) => (
            <motion.div key={i} initial={{opacity:0,y:30}} whileInView={{opacity:1,y:0}} viewport={{once:true}} transition={{delay:i*0.15}}
              className="flex flex-col items-center text-center w-full md:w-1/5">
              <motion.div whileHover={{scale:1.1,rotate:5}} className="w-16 h-16 rounded-2xl bg-white shadow-lg border border-terracotta/20 flex items-center justify-center mb-3 relative">
                <step.icon className="text-terracotta" size={26} />
                {i < journey.length - 1 && <div className="md:hidden absolute -bottom-6 w-0.5 h-6 bg-terracotta/30" />}
              </motion.div>
              <h3 className="font-display font-bold">{step.label}</h3>
              <p className="text-xs text-indigonight/60 mt-1 max-w-[140px]">{step.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Problem/Solution */}
      <section className="grid md:grid-cols-2 gap-6 py-10">
        <motion.div initial={{opacity:0,x:-20}} whileInView={{opacity:1,x:0}} viewport={{once:true}} className="glass rounded-2xl p-8 border border-madder/20">
          <h3 className="font-display font-bold text-xl text-madder mb-3">The Problem</h3>
          <p className="text-indigonight/70 leading-relaxed">Millions of artisans, especially marginalized communities, are excluded from digital markets — not for lack of talent, but lack of access: no smartphone, no literacy, no English, no digital skill.</p>
        </motion.div>
        <motion.div initial={{opacity:0,x:20}} whileInView={{opacity:1,x:0}} viewport={{once:true}} className="glass rounded-2xl p-8 border border-terracotta/20">
          <h3 className="font-display font-bold text-xl text-terracotta mb-3">Our Solution</h3>
          <p className="text-indigonight/70 leading-relaxed">A zero-digital-barrier AI platform. Show the product, speak in your language — a local facilitator can help if there's no phone at all. AI identifies craft, prices it fairly, finds buyers, and matches government schemes automatically.</p>
        </motion.div>
      </section>

      {/* Feature grid to explore */}
      <section className="py-10">
        <h2 className="text-center font-display text-2xl font-bold mb-8">Explore the Platform</h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {[
            {id:'catalog', icon: Sparkles, title:'AI Catalog Generator', desc:'Photo → full product listing in seconds'},
            {id:'voice', icon: Mic, title:'Voice AI Assistant', desc:'Speak in Tamil, Hindi or English'},
            {id:'matching', icon: Target, title:'AI Buyer Matching', desc:'Bulk orders matched to best artisans'},
            {id:'gov', icon: Landmark, title:'Government Dashboard', desc:'Real-time artisan & scheme insights'},
          ].map((f,i) => (
            <motion.div key={i} whileHover={{y:-6}} onClick={() => go(f.id)}
              className="glass rounded-2xl p-6 border border-terracotta/15 cursor-pointer hover:shadow-glow transition">
              <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-terracotta to-turmeric flex items-center justify-center mb-4">
                <f.icon size={20} className="text-white" />
              </div>
              <h4 className="font-display font-bold mb-1">{f.title}</h4>
              <p className="text-sm text-indigonight/60">{f.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      <section className="text-center py-16">
        <p className="text-2xl md:text-3xl font-display font-bold text-gradient">"India already has the talent.<br/>We're building the bridge."</p>
      </section>
    </div>
  );
}