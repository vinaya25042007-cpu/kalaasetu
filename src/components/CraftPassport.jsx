import React from 'react';
import { motion } from 'framer-motion';
import { Fingerprint, MapPin, Award, Calendar, ShieldCheck, QrCode, ArrowRight } from 'lucide-react';

export default function CraftPassport({ go, product, artisan }) {
  if (!product || !artisan) return null;
  return (
    <div className="max-w-2xl mx-auto px-4 py-10">
      <div className="text-center mb-6">
        <span className="inline-block px-4 py-1.5 rounded-full bg-turmeric/20 text-bronze text-sm font-semibold mb-3">🪪 Craft Passport & Craft DNA</span>
        <h2 className="font-display text-3xl font-extrabold">Digital Identity of a Craft</h2>
      </div>

      <motion.div initial={{opacity:0,y:15,rotateX:10}} animate={{opacity:1,y:0,rotateX:0}} transition={{duration:0.6}}
        className="rounded-3xl overflow-hidden shadow-2xl border-4 border-turmeric/40 bg-gradient-to-br from-ivory to-white">
        <div className="bg-gradient-to-r from-madder to-indigonight p-6 text-white relative">
          <div className="absolute inset-0 opacity-10" style={{backgroundImage:'repeating-linear-gradient(45deg,#fff 0,#fff 1px,transparent 1px,transparent 12px)'}} />
          <div className="flex justify-between items-center relative z-10">
            <div>
              <p className="text-xs text-turmeric font-semibold tracking-widest">KALAASETU CRAFT PASSPORT</p>
              <h3 className="font-display font-bold text-xl mt-1">{product.name}</h3>
            </div>
            <QrCode size={44} className="text-white/80" />
          </div>
        </div>

        <div className="p-6 space-y-5">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-full bg-gradient-to-br from-terracotta to-turmeric flex items-center justify-center text-2xl">{artisan.avatar}</div>
            <div>
              <p className="font-display font-bold">{artisan.name}</p>
              <p className="text-xs text-indigonight/50 flex items-center gap-1"><MapPin size={11}/> {artisan.district}, {artisan.state}</p>
            </div>
            {artisan.verified && (
              <span className="ml-auto flex items-center gap-1 text-xs bg-green-100 text-green-700 px-2.5 py-1 rounded-full font-semibold"><ShieldCheck size={13}/> Verified</span>
            )}
          </div>

          <div className="grid grid-cols-2 gap-3">
            <Field label="Craft" value={product.craft} />
            <Field label="Material" value={product.material} />
            <Field label="Origin" value={`${product.district}, ${product.state}`} />
            <Field label="Experience" value={`${artisan.exp} years`} />
          </div>

          <div>
            <p className="text-xs font-semibold text-indigonight/50 mb-1">Craft History</p>
            <p className="text-sm text-indigonight/70 bg-terracotta/5 rounded-xl p-3">{product.desc}</p>
          </div>

          <div className="flex items-center justify-between pt-3 border-t border-dashed border-terracotta/20">
            <div className="flex items-center gap-1 text-xs text-indigonight/50"><Fingerprint size={13}/> DNA ID: KS-{String(product.id).padStart(4,'0')}-{artisan.id}</div>
            <div className="flex items-center gap-1 text-xs text-bronze font-semibold"><Award size={13}/> Rating {artisan.rating}</div>
          </div>
        </div>
      </motion.div>

      <div className="text-center mt-8">
        <button onClick={() => go('marketplace')} className="px-7 py-3 rounded-full bg-terracotta text-white font-semibold inline-flex items-center gap-2 shadow-glow">
          Back to Marketplace <ArrowRight size={16} />
        </button>
      </div>
    </div>
  );
}

function Field({ label, value }) {
  return (
    <div className="bg-white rounded-xl p-3 border border-terracotta/10">
      <p className="text-[11px] text-indigonight/40">{label}</p>
      <p className="text-sm font-semibold mt-0.5">{value}</p>
    </div>
  );
}
