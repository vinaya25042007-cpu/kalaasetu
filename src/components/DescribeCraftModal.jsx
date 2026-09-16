import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import {
  Mic, Square, Sparkles, Globe, CheckCircle2,
  X, ArrowRight, Edit3, ShieldCheck
} from 'lucide-react';
import { useLanguage } from '../i18n/LanguageContext.jsx';

const SAMPLE_STORIES = {
  ta: {
    transcript: "நான் பாரம்பரிய முறையில் காஞ்சிபுரம் பட்டுப் புடவைகளை நெய்கிறேன். தூய மல்பெரி பட்டு மற்றும் 24 காரட் தங்க ஜரிகை கொண்டு மூன்று நாடாக்களால் கோர்வை முறையில் நெய்கிறோம். ஒரு புடவை நெய்ய 28 நாட்கள் ஆகும்.",
    translation: "I weave traditional Kanchipuram silk sarees using ancestral pit looms. Crafted from 100% pure Mulberry silk filaments and 24-karat gold zari using the triple-shuttle Korvai interlocking technique. Each masterpiece requires 28 days of patient handcrafting."
  },
  hi: {
    transcript: "हम चार पीढ़ियों से बिहार के मधुबनी में पारंपरिक लोक चित्रकला बनाते हैं। हम गाय के गोबर से शुद्ध किए गए हस्तनिर्मित कागज पर बांस की कलम और गेंदे के फूल व हल्दी के प्राकृतिक रंगों से चित्र बनाते हैं।",
    translation: "We have preserved the sacred Madhubani folk art in Bihar across four generations. Drawn on handmade cotton rag paper treated with neem, using sharpened bamboo nibs and organic dyes extracted from marigold blossoms and wild turmeric."
  },
  te: {
    transcript: "మేము శ్రీకాళహస్తిలో సహజ రంగులతో కలంకారి వస్త్రాలను చేతితో గీస్తాము. తాజా వెదురు కలం మరియు స్వచ్ఛమైన కూరగాయల రంగులను ఉపయోగిస్తాము. ప్రతి చీర పూర్తి కావడానికి 20 రోజులు పడుతుంది.",
    translation: "We hand-paint traditional Kalamkari textiles in Srikalahasti using natural vegetable dyes and sharpened bamboo pens. Each narrative piece requires 20 days of intricate hand-drawn craftsmanship."
  },
  bn: {
    transcript: "আমরা বাঁকুড়ার পঞ্চমুড়ায় ঐতিহ্যবাহী পোড়ামাটির ঘোড়া ও পাত্র তৈরি করি। স্থানীয় নদীর পলিমাটি দিয়ে চাকা ঘুরিয়ে প্রতিটি নকশা হাতে গড়া হয়।",
    translation: "We sculpt iconic Bankura terracotta horses and vessels in Panchmura. Hand-turned from local river silt clay on traditional wheels and wood-fired in village kilns."
  },
  mr: {
    transcript: "आम्ही पालघरमध्ये निसर्गाच्या साक्षीने वारली भित्तीचित्रे काढतो. तांदळाच्या पिठाचा पांढरा रंग आणि डिंकाचा वापर करून आदिवासी जीवन आणि विवाहाचे प्रसंग चितारतो.",
    translation: "We paint ritual Warli art in Palghar celebrating tribal harvests and weddings. Painted using ground rice flour paste and natural acacia gum on raw terracotta surfaces."
  },
  gu: {
    transcript: "અમે કચ્છમાં પરંપરાગત બાંધણી અને ટાઈ-ડાઈ કામ કરીએ છીએ. હજારો નાના ટપકાં હાથથી બાંધીને કુદરતી રંગોમાં ડુબાડીને આ સાડીઓ તૈયાર કરવામાં આવે છે.",
    translation: "We craft traditional Bandhani tie-dye sarees in Kutch. Tens of thousands of micro-knots are tied by hand and dip-dyed in vibrant natural pigments."
  },
  en: {
    transcript: "I handcraft authentic heritage pieces using age-old ancestral techniques passed down through my family. We use strictly non-toxic natural raw materials, requiring over 20 days of dedication per piece.",
    translation: "I handcraft authentic heritage pieces using age-old ancestral techniques passed down through my family. We use strictly non-toxic natural raw materials, requiring over 20 days of dedication per piece."
  }
};

export default function DescribeCraftModal({ onClose, onSave }) {
  const { lang, t, languages } = useLanguage();
  const [selectedLang, setSelectedLang] = useState(lang || 'en');
  const [isRecording, setIsRecording] = useState(false);
  const [recordSeconds, setRecordSeconds] = useState(0);
  const [transcript, setTranscript] = useState(() => (SAMPLE_STORIES[lang] || SAMPLE_STORIES.en).transcript);
  const [translation, setTranslation] = useState(() => (SAMPLE_STORIES[lang] || SAMPLE_STORIES.en).translation);
  const [craftType, setCraftType] = useState("Kanchipuram Silk Weaving");
  const [materials, setMaterials] = useState("Mulberry Silk, Gold Zari, Natural Dyes");
  const [daysSpent, setDaysSpent] = useState("24 Days");
  const [savedSuccess, setSavedSuccess] = useState(false);

  const timerRef = useRef(null);

  const handleLangChange = (newLang) => {
    setSelectedLang(newLang);
    const sample = SAMPLE_STORIES[newLang] || SAMPLE_STORIES.en;
    setTranscript(sample.transcript);
    setTranslation(sample.translation);
  };

  // Recording timer simulation
  useEffect(() => {
    if (isRecording) {
      timerRef.current = setInterval(() => {
        setRecordSeconds(prev => prev + 1);
      }, 1000);
    } else {
      if (timerRef.current) clearInterval(timerRef.current);
    }
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isRecording]);

  const toggleRecording = () => {
    if (isRecording) {
      // Stop recording
      setIsRecording(false);
    } else {
      // Start recording
      setRecordSeconds(0);
      setIsRecording(true);
      // Simulate live speech-to-text typing
      const sample = SAMPLE_STORIES[selectedLang] || SAMPLE_STORIES.en;
      setTranscript("");
      setTranslation("");

      let index = 0;
      const fullText = sample.transcript;
      const interval = setInterval(() => {
        if (index < fullText.length) {
          setTranscript(fullText.slice(0, index + 4));
          index += 4;
        } else {
          clearInterval(interval);
          setTranslation(sample.translation);
        }
      }, 100);
    }
  };

  const handleSave = () => {
    setSavedSuccess(true);
    if (onSave) {
      onSave({
        transcript,
        translation,
        craftType,
        materials,
        daysSpent,
        language: selectedLang
      });
    }
    setTimeout(() => {
      setSavedSuccess(false);
      onClose();
    }, 1800);
  };

  const formatTimer = (s) => {
    const m = Math.floor(s / 60);
    const sec = s % 60;
    return `${String(m).padStart(2, '0')}:${String(sec).padStart(2, '0')}`;
  };

  return (
    <div className="fixed inset-0 z-50 bg-indigonight/80 backdrop-blur-md flex items-center justify-center p-3 sm:p-5 overflow-y-auto">
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 15 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 15 }}
        transition={{ duration: 0.25 }}
        className="bg-ivory rounded-3xl max-w-3xl w-full my-6 max-h-[92vh] overflow-y-auto shadow-2xl border-2 border-terracotta/30 text-indigonight relative"
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-20 w-9 h-9 rounded-full bg-terracotta/10 hover:bg-terracotta/20 text-terracotta flex items-center justify-center transition"
          aria-label={t('common.close')}
        >
          <X size={18} />
        </button>

        {/* Modal Header */}
        <div className="bg-gradient-to-r from-madder to-indigonight text-white p-6 rounded-t-3xl relative overflow-hidden">
          <div className="absolute -right-8 -bottom-8 w-36 h-36 rounded-full bg-turmeric/15 blur-xl pointer-events-none" />
          <div className="relative z-10 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <span className="inline-block px-3 py-1 rounded-full bg-white/15 text-turmeric text-xs font-semibold mb-2">
                🎙️ Artisan Regional Story Studio
              </span>
              <h3 className="font-display font-bold text-2xl">
                {t('describeCraft.title')}
              </h3>
              <p className="text-white/70 text-xs sm:text-sm mt-1 max-w-xl">
                {t('describeCraft.subtitle')}
              </p>
            </div>

            {/* Regional Language Picker */}
            <div className="flex items-center gap-2 bg-white/10 p-1.5 rounded-2xl border border-white/15 flex-shrink-0">
              <Globe size={14} className="text-turmeric ml-1.5" />
              <select
                value={selectedLang}
                onChange={(e) => handleLangChange(e.target.value)}
                className="bg-transparent text-white text-xs font-semibold outline-none cursor-pointer pr-2"
              >
                {languages.map((l) => (
                  <option key={l.code} value={l.code} className="text-indigonight bg-white">
                    {l.nativeName} ({l.name})
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Studio Body */}
        <div className="p-6 space-y-6">
          {/* Voice Input Recorder UI Placeholder */}
          <div className="bg-white rounded-3xl p-6 border border-terracotta/15 shadow-sm text-center relative overflow-hidden">
            <div className="flex flex-col items-center justify-center gap-3">
              {/* Pulsating Record Button */}
              <div className="relative flex items-center justify-center">
                {isRecording && (
                  <>
                    <div className="absolute w-28 h-28 rounded-full bg-terracotta/20 animate-ping" />
                    <div className="absolute w-24 h-24 rounded-full bg-terracotta/30 pulse-ring" />
                  </>
                )}
                <motion.button
                  whileTap={{ scale: 0.94 }}
                  onClick={toggleRecording}
                  className={`relative z-10 w-20 h-20 rounded-full flex items-center justify-center text-white shadow-xl transition-all ${
                    isRecording
                      ? 'bg-madder shadow-glow'
                      : 'bg-gradient-to-br from-terracotta to-turmeric hover:brightness-105'
                  }`}
                  aria-label={isRecording ? t('describeCraft.tapToStop') : t('describeCraft.tapToRecord')}
                >
                  {isRecording ? <Square size={26} className="fill-current" /> : <Mic size={32} />}
                </motion.button>
              </div>

              {/* Status and Audio Equalizer Waveform */}
              <div>
                <p className="font-display font-bold text-base text-indigonight">
                  {isRecording ? t('describeCraft.recording') : t('describeCraft.tapToRecord')}
                </p>
                <div className="flex items-center justify-center gap-2 mt-1">
                  <span className="font-mono text-xs font-bold text-terracotta">
                    {formatTimer(recordSeconds)}
                  </span>
                  <span className="text-xs text-indigonight/40">• Max 2:00</span>
                </div>
              </div>

              {/* Animated Waveform Bars */}
              {isRecording && (
                <div className="flex items-center justify-center gap-1.5 h-8 mt-1">
                  {[18, 28, 14, 32, 24, 30, 16, 26, 32, 20, 28, 14].map((h, i) => (
                    <motion.div
                      key={i}
                      className="w-1 bg-terracotta rounded-full"
                      animate={{
                        height: [6, h, 8, h * 0.8, 6],
                      }}
                      transition={{
                        duration: 0.7,
                        repeat: Infinity,
                        delay: i * 0.08,
                        ease: "easeInOut"
                      }}
                    />
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Regional Transcript & AI Translation Grid */}
          <div className="grid md:grid-cols-2 gap-4">
            {/* Regional Textarea */}
            <div className="bg-white rounded-2xl p-4 border border-terracotta/15 shadow-sm">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-bold text-terracotta flex items-center gap-1.5">
                  <Edit3 size={13} /> {t('describeCraft.regionalText')}
                </span>
                <span className="text-[10px] bg-terracotta/10 text-terracotta px-2 py-0.5 rounded-full font-semibold">
                  {languages.find(l => l.code === selectedLang)?.nativeName || selectedLang}
                </span>
              </div>
              <textarea
                value={transcript}
                onChange={(e) => setTranscript(e.target.value)}
                rows={5}
                placeholder={t('describeCraft.transcriptPlaceholder')}
                className="w-full text-sm text-indigonight bg-ivory/50 rounded-xl p-3 outline-none border border-terracotta/10 focus:border-terracotta transition resize-none leading-relaxed"
              />
            </div>

            {/* AI Live English Translation */}
            <div className="bg-gradient-to-br from-terracotta/5 to-turmeric/10 rounded-2xl p-4 border border-turmeric/30 shadow-sm">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-bold text-bronze flex items-center gap-1.5">
                  <Sparkles size={13} /> {t('describeCraft.aiTranslation')}
                </span>
                <span className="text-[10px] bg-green-100 text-green-700 px-2 py-0.5 rounded-full font-bold">
                  English for Global Buyers
                </span>
              </div>
              <div className="text-sm text-indigonight/80 bg-white/70 rounded-xl p-3 min-h-[120px] border border-terracotta/10 leading-relaxed italic font-serif">
                {translation || t('describeCraft.englishPreview')}
              </div>
            </div>
          </div>

          {/* Craft Attributes Form */}
          <div className="bg-white rounded-2xl p-5 border border-terracotta/15 shadow-sm space-y-4">
            <h4 className="font-display font-bold text-sm text-indigonight flex items-center gap-2">
              <ShieldCheck size={16} className="text-terracotta" />
              Craft Authenticity Parameters
            </h4>
            <div className="grid sm:grid-cols-3 gap-3">
              <div>
                <label className="text-[11px] font-semibold text-indigonight/60 block mb-1">
                  {t('describeCraft.craftTradition')}
                </label>
                <input
                  type="text"
                  value={craftType}
                  onChange={(e) => setCraftType(e.target.value)}
                  className="w-full text-xs font-medium bg-ivory/60 rounded-xl p-2.5 border border-terracotta/15 outline-none focus:border-terracotta"
                />
              </div>
              <div>
                <label className="text-[11px] font-semibold text-indigonight/60 block mb-1">
                  {t('describeCraft.materialsUsed')}
                </label>
                <input
                  type="text"
                  value={materials}
                  onChange={(e) => setMaterials(e.target.value)}
                  className="w-full text-xs font-medium bg-ivory/60 rounded-xl p-2.5 border border-terracotta/15 outline-none focus:border-terracotta"
                />
              </div>
              <div>
                <label className="text-[11px] font-semibold text-indigonight/60 block mb-1">
                  {t('describeCraft.hoursInvested')}
                </label>
                <input
                  type="text"
                  value={daysSpent}
                  onChange={(e) => setDaysSpent(e.target.value)}
                  className="w-full text-xs font-medium bg-ivory/60 rounded-xl p-2.5 border border-terracotta/15 outline-none focus:border-terracotta"
                />
              </div>
            </div>
          </div>

          {/* Save Action */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-2">
            {savedSuccess ? (
              <motion.div
                initial={{ opacity: 0, y: 5 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex items-center gap-2 text-xs font-bold text-green-700 bg-green-100 px-4 py-2 rounded-full"
              >
                <CheckCircle2 size={15} /> {t('describeCraft.storySavedSuccess')}
              </motion.div>
            ) : (
              <p className="text-xs text-indigonight/50">
                Story connects directly to Craft DNA on your product passport.
              </p>
            )}

            <button
              onClick={handleSave}
              className="w-full sm:w-auto ml-auto px-8 py-3 rounded-full bg-terracotta text-white font-semibold text-sm hover:bg-terracotta-dark transition shadow-glow flex items-center justify-center gap-2"
            >
              {t('describeCraft.saveStory')} <ArrowRight size={15} />
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
