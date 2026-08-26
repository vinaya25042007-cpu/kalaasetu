import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { UploadCloud, Sparkles, CheckCircle2, Tag, MapPin, Layers, IndianRupee, Users, ArrowRight } from 'lucide-react';

const RESULT = {
  name: "Handwoven Kanchipuram Bridal Silk Saree",
  craft: "Kanchipuram Silk Weaving",
  material: "Mulberry Silk with Gold Zari Border",
  origin: "Kanchipuram, Tamil Nadu",
  description: "A rich handwoven silk saree featuring traditional temple-border zari work, crafted using techniques passed down over generations. Ideal for weddings and premium festive occasions.",
  price: "₹16,500 – ₹19,800",
  buyers: ["Sanskriti Boutique Group", "Global Weaves Inc. (Export)", "Urban Ethnic Retail Pvt Ltd"],
};

export default function AICatalog({ go }) {
  const [stage, setStage] = useState('idle'); // idle -> uploaded -> scanning -> done
  const [img, setImg] = useState(null);

  const simulateUpload = () => {
    setImg('demo');
    setStage('scanning');
    setTimeout(() => setStage('done'), 2600);
  };

  return (
    <div className="max-w-5xl mx-auto px-4 py-10">
      <div className="text-center mb-8">
        <span className="inline-block px-4 py-1.5 rounded-full bg-turmeric/20 text-bronze text-sm font-semibold mb-3">✨ AI Catalog Generator</span>
        <h2 className="font-display text-3xl md:text-4xl font-extrabold">From Photo to Full Catalog in Seconds</h2>
        <p className="text-indigonight/60 mt-2">No typing. No English. Just a photo of the craft.</p>
      </div>

      <div className="grid md:grid-cols-2 gap-8">
        {/* Upload / Scan panel */}
        <div className="glass rounded-3xl p-6 border border-terracotta/20 relative overflow-hidden min-h-[420px] flex flex-col items-center justify-center">
          {stage === 'idle' && (
            <motion.button onClick={simulateUpload} whileHover={{scale:1.02}} whileTap={{scale:0.97}}
              className="border-2 border-dashed border-terracotta/40 rounded-2xl w-full h-80 flex flex-col items-center justify-center gap-3 hover:bg-terracotta/5 transition">
              <UploadCloud size={44} className="text-terracotta" />
              <p className="font-semibold">Tap to upload a saree photo</p>
              <p className="text-xs text-indigonight/50">Demo: Kanchipuram Silk Saree</p>
            </motion.button>
          )}

          {(stage === 'scanning' || stage === 'done') && (
            <div className="relative w-full h-80 rounded-2xl overflow-hidden bg-gradient-to-br from-madder via-terracotta to-turmeric">
              <div className="absolute inset-0 flex items-center justify-center text-8xl opacity-30">🥻</div>
              {stage === 'scanning' && (
                <>
                  <div className="absolute left-0 right-0 h-1 bg-turmeric/90 shadow-glow scan-line" />
                  <div className="absolute inset-0 bg-black/20 flex flex-col items-center justify-center gap-3">
                    <Sparkles className="text-white animate-spin" size={32} />
                    <p className="text-white font-display font-semibold">AI is analyzing the craft...</p>
                    <div className="flex gap-2 text-xs text-white/80">
                      {["Detecting pattern","Reading texture","Matching craft DB"].map((t,i)=>(
                        <motion.span key={i} initial={{opacity:0.3}} animate={{opacity:[0.3,1,0.3]}} transition={{duration:1.5,repeat:Infinity,delay:i*0.3}} className="px-2 py-1 bg-white/10 rounded-full">{t}</motion.span>
                      ))}
                    </div>
                  </div>
                </>
              )}
              {stage === 'done' && (
                <motion.div initial={{opacity:0}} animate={{opacity:1}} className="absolute inset-0 bg-black/30 flex flex-col items-center justify-center gap-2">
                  <CheckCircle2 className="text-green-400" size={40} />
                  <p className="text-white font-display font-bold">Craft Identified!</p>
                </motion.div>
              )}
            </div>
          )}
        </div>

        {/* Results panel */}
        <div className="glass rounded-3xl p-6 border border-terracotta/20 min-h-[420px]">
          <AnimatePresence mode="wait">
            {stage !== 'done' ? (
              <motion.div key="waiting" className="h-full flex flex-col items-center justify-center text-center text-indigonight/40 gap-2">
                <Layers size={36} />
                <p>AI-generated catalog will appear here</p>
              </motion.div>
            ) : (
              <motion.div key="result" initial={{opacity:0,y:10}} animate={{opacity:1,y:0}} className="space-y-4">
                <h3 className="font-display font-bold text-xl text-madder">{RESULT.name}</h3>
                <div className="grid grid-cols-2 gap-3 text-sm">
                  <Info icon={Tag} label="Craft" value={RESULT.craft} />
                  <Info icon={Layers} label="Material" value={RESULT.material} />
                  <Info icon={MapPin} label="Origin" value={RESULT.origin} />
                  <Info icon={IndianRupee} label="Suggested Price" value={RESULT.price} highlight />
                </div>
                <div>
                  <p className="text-xs font-semibold text-indigonight/50 mb-1">AI Description</p>
                  <p className="text-sm text-indigonight/70 bg-white/60 rounded-xl p-3">{RESULT.description}</p>
                </div>
                <div>
                  <p className="text-xs font-semibold text-indigonight/50 mb-1 flex items-center gap-1"><Users size={12}/> Matched Target Buyers</p>
                  <div className="flex flex-wrap gap-2">
                    {RESULT.buyers.map((b,i) => (
                      <span key={i} className="text-xs bg-terracotta/10 text-terracotta px-2.5 py-1 rounded-full font-medium">{b}</span>
                    ))}
                  </div>
                </div>
                <button onClick={() => go('matching')} className="w-full mt-2 py-3 rounded-full bg-terracotta text-white font-semibold flex items-center justify-center gap-2 hover:bg-terracotta-dark transition">
                  Find Buyers Now <ArrowRight size={16} />
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}

function Info({ icon: Icon, label, value, highlight }) {
  return (
    <div className={`rounded-xl p-3 ${highlight ? 'bg-turmeric/15' : 'bg-white/60'}`}>
      <p className="text-[11px] text-indigonight/50 flex items-center gap-1"><Icon size={11}/> {label}</p>
      <p className={`font-semibold text-sm mt-0.5 ${highlight ? 'text-bronze' : ''}`}>{value}</p>
    </div>
  );
}