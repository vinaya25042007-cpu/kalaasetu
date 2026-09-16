import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Fingerprint, MapPin, Award, ShieldCheck, QrCode, ArrowRight,
  Play, Sparkles, Clock, Video
} from 'lucide-react';
import { useLanguage } from '../i18n/LanguageContext.jsx';
import { getCraftStory } from '../data/craftStories.js';
import BrushStroke from './craft/BrushStroke.jsx';

export default function CraftPassport({ go, product, artisan, onOpenStory }) {
  const { t } = useLanguage();
  const [activeTab, setActiveTab] = useState('passport'); // 'passport' | 'story'
  const [activeStep, setActiveStep] = useState(0);

  if (!product || !artisan) return null;

  const story = getCraftStory(product);

  return (
    <div className="max-w-4xl mx-auto px-4 py-10">
      <div className="text-center mb-6">
        <span className="inline-block px-4 py-1.5 rounded-full bg-turmeric/20 text-bronze text-sm font-semibold mb-3">
          🪪 {t('nav.passport')} & Craft DNA
        </span>
        <h2 className="font-display text-3xl font-extrabold text-indigonight">
          {product.name}
        </h2>
        <p className="text-xs sm:text-sm text-indigonight/60 mt-1">
          {artisan.name} • {artisan.district}, {artisan.state}
        </p>

        {/* View Switcher: Certificate vs Story */}
        <div className="flex justify-center gap-2 mt-6">
          <button
            onClick={() => setActiveTab('passport')}
            className={`px-5 py-2.5 rounded-full text-xs sm:text-sm font-bold transition flex items-center gap-2 ${
              activeTab === 'passport'
                ? 'bg-terracotta text-white shadow-md'
                : 'bg-white/80 text-indigonight/70 hover:bg-terracotta/10 border border-terracotta/20'
            }`}
          >
            <Fingerprint size={15} /> Digital Passport & DNA
          </button>
          <button
            onClick={() => setActiveTab('story')}
            className={`px-5 py-2.5 rounded-full text-xs sm:text-sm font-bold transition flex items-center gap-2 ${
              activeTab === 'story'
                ? 'bg-madder text-white shadow-md'
                : 'bg-white/80 text-indigonight/70 hover:bg-madder/10 border border-madder/20'
            }`}
          >
            <Video size={15} /> Story Behind the Craft (Video)
          </button>
        </div>
      </div>

      <AnimatePresence mode="wait">
        {activeTab === 'passport' ? (
          /* Certificate View */
          <motion.div
            key="passport"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.4 }}
            className="rounded-3xl overflow-hidden shadow-2xl border-4 border-turmeric/40 bg-gradient-to-br from-ivory to-white max-w-2xl mx-auto"
          >
            <div className="bg-gradient-to-r from-madder to-indigonight p-6 text-white relative">
              <div
                className="absolute inset-0 opacity-10 pointer-events-none"
                style={{
                  backgroundImage:
                    'repeating-linear-gradient(45deg,#fff 0,#fff 1px,transparent 1px,transparent 12px)',
                }}
              />
              <div className="flex justify-between items-center relative z-10">
                <div>
                  <p className="text-xs text-turmeric font-semibold tracking-widest">
                    KALAASETU CRAFT PASSPORT
                  </p>
                  <h3 className="font-display font-bold text-xl mt-1">{product.name}</h3>
                </div>
                <QrCode size={44} className="text-white/80" />
              </div>
            </div>

            <div className="p-6 space-y-5">
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 rounded-full bg-gradient-to-br from-terracotta to-turmeric flex items-center justify-center text-2xl shadow-md">
                  {artisan.avatar}
                </div>
                <div>
                  <p className="font-display font-bold text-base">{artisan.name}</p>
                  <p className="text-xs text-indigonight/50 flex items-center gap-1">
                    <MapPin size={11} /> {artisan.district}, {artisan.state}
                  </p>
                </div>
                {artisan.verified && (
                  <span className="ml-auto flex items-center gap-1 text-xs bg-green-100 text-green-700 px-2.5 py-1 rounded-full font-semibold">
                    <ShieldCheck size={13} /> {t('common.verified')}
                  </span>
                )}
              </div>

              <div className="grid grid-cols-2 gap-3">
                <Field label={t('catalog.craft')} value={product.craft} />
                <Field label={t('catalog.material')} value={product.material} />
                <Field label={t('catalog.origin')} value={`${product.district}, ${product.state}`} />
                <Field label="Experience" value={`${artisan.exp} ${t('common.yearsExp')}`} />
              </div>

              <div>
                <p className="text-xs font-semibold text-indigonight/50 mb-1">Craft Lineage & History</p>
                <p className="text-sm text-indigonight/70 bg-terracotta/5 rounded-xl p-3 leading-relaxed">
                  {product.desc}
                </p>
              </div>

              {/* Quick Watch Video Link banner inside passport */}
              <div
                onClick={() => setActiveTab('story')}
                className="bg-gradient-to-r from-turmeric/20 to-terracotta/10 rounded-xl p-3 flex items-center justify-between cursor-pointer hover:bg-turmeric/25 transition border border-turmeric/30"
              >
                <div className="flex items-center gap-2 text-xs font-bold text-bronze">
                  <Play size={14} className="fill-current text-terracotta" />
                  <span>Watch Artisan Storytelling Video (2m 18s)</span>
                </div>
                <ArrowRight size={14} className="text-terracotta" />
              </div>

              <div className="flex items-center justify-between pt-3 border-t border-dashed border-terracotta/20">
                <div className="flex items-center gap-1 text-xs text-indigonight/50 font-mono">
                  <Fingerprint size={13} /> DNA ID: KS-{String(product.id).padStart(4, '0')}-{artisan.id}
                </div>
                <div className="flex items-center gap-1 text-xs text-bronze font-semibold">
                  <Award size={13} /> {t('common.rating')} {artisan.rating}
                </div>
              </div>
            </div>
          </motion.div>
        ) : (
          /* Storytelling Video Experience View */
          <motion.div
            key="story"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.4 }}
            className="bg-white rounded-3xl p-6 sm:p-8 shadow-xl border-2 border-terracotta/20 space-y-8"
          >
            {/* Embedded Video Player Card */}
            <div className="rounded-2xl overflow-hidden relative aspect-video max-h-[380px] bg-black flex items-center justify-center shadow-lg">
              <video
                src={story.video.src}
                poster={story.video.poster}
                controls
                className="w-full h-full object-cover"
              />
            </div>

            {/* Narrator Card */}
            <div className="glass rounded-2xl p-5 border border-terracotta/20 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 rounded-full bg-gradient-to-br from-terracotta to-turmeric flex items-center justify-center text-3xl shadow-sm">
                  {story.narrator.avatar}
                </div>
                <div>
                  <p className="text-[10px] text-terracotta font-bold tracking-wider uppercase">
                    {t('craftStory.narrator')}
                  </p>
                  <h4 className="font-display font-bold text-base">{story.narrator.name}</h4>
                  <p className="text-xs text-indigonight/60">{story.narrator.role}</p>
                  <p className="text-[11px] text-indigonight/50 flex items-center gap-1 mt-0.5">
                    <MapPin size={10} /> {story.narrator.region}
                  </p>
                </div>
              </div>

              {onOpenStory && (
                <button
                  onClick={() => onOpenStory(product)}
                  className="px-5 py-2 rounded-full bg-terracotta text-white text-xs font-bold hover:bg-terracotta-dark transition flex items-center gap-1.5 shadow-sm"
                >
                  <Play size={12} className="fill-current" /> Open Fullscreen Theatre
                </button>
              )}
            </div>

            {/* Product Narrative */}
            <div>
              <h3 className="font-display font-bold text-lg text-indigonight mb-2 flex items-center gap-2">
                <Sparkles size={16} className="text-terracotta" />
                {t('craftStory.storyBehindCraft')}
              </h3>
              <p className="text-sm text-indigonight/75 leading-relaxed bg-ivory p-4 rounded-xl border border-terracotta/10">
                {story.productStory}
              </p>
            </div>

            {/* Visual Journey Stepper */}
            <div>
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-display font-bold text-lg text-indigonight">
                  {t('craftStory.visualJourney')}
                </h3>
                <div className="flex gap-1">
                  {story.visualJourney.map((_, i) => (
                    <button
                      key={i}
                      onClick={() => setActiveStep(i)}
                      className={`px-3 py-1 rounded-full text-xs font-bold transition ${
                        activeStep === i
                          ? 'bg-terracotta text-white'
                          : 'bg-ivory text-indigonight/60 hover:bg-terracotta/10'
                      }`}
                    >
                      Step {i + 1}
                    </button>
                  ))}
                </div>
              </div>

              <div className="bg-ivory rounded-2xl p-5 border border-terracotta/15">
                <div className="flex items-start gap-3 mb-2">
                  <span className="text-3xl">{story.visualJourney[activeStep].icon}</span>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-bold text-terracotta uppercase tracking-wider">
                        {story.visualJourney[activeStep].stage}
                      </span>
                      <span className="text-[10px] bg-turmeric/20 text-bronze px-2 py-0.5 rounded-full font-semibold flex items-center gap-1">
                        <Clock size={9} /> {story.visualJourney[activeStep].timeframe}
                      </span>
                    </div>
                    <h4 className="font-display font-bold text-base text-indigonight mt-0.5">
                      {story.visualJourney[activeStep].headline}
                    </h4>
                  </div>
                </div>
                <p className="text-xs sm:text-sm text-indigonight/70 leading-relaxed mt-2">
                  {story.visualJourney[activeStep].desc}
                </p>
                <div className="mt-3 pt-2 border-t border-dashed border-terracotta/15 text-xs text-indigonight/60 italic">
                  Artisan Note: "{story.visualJourney[activeStep].artisanNote}"
                </div>
              </div>
            </div>

            {/* Why Special */}
            <div>
              <h3 className="font-display font-bold text-lg text-indigonight mb-3">
                <BrushStroke>{t('craftStory.whySpecial')}</BrushStroke>
              </h3>
              <div className="grid sm:grid-cols-2 gap-3">
                {story.whySpecial.map((item, idx) => (
                  <div key={idx} className="bg-ivory rounded-xl p-3.5 border border-terracotta/10">
                    <h5 className="font-display font-bold text-xs text-indigonight mb-0.5">
                      {item.title}
                    </h5>
                    <p className="text-[11px] text-indigonight/65 leading-relaxed">{item.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="text-center mt-8">
        <button
          onClick={() => go('marketplace')}
          className="px-7 py-3 rounded-full bg-terracotta text-white font-semibold inline-flex items-center gap-2 shadow-glow text-sm hover:bg-terracotta-dark transition"
        >
          Back to Marketplace <ArrowRight size={16} />
        </button>
      </div>
    </div>
  );
}

function Field({ label, value }) {
  return (
    <div className="bg-white rounded-xl p-3 border border-terracotta/10">
      <p className="text-[11px] text-indigonight/40 font-medium">{label}</p>
      <p className="text-sm font-semibold mt-0.5 text-indigonight">{value}</p>
    </div>
  );
}
