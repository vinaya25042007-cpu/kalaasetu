import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Mic, Volume2, IndianRupee, TrendingUp, ShieldCheck, ArrowRight } from 'lucide-react';

const CONVO = {
  question: "நான் இதை பட்டு நூலால் நெய்தேன், எவ்வளவு விலை வைக்கலாம்?",
  translation: "(“I wove this with silk thread — what price should I set?”)",
  answer: "இந்த பட்டு புடவைக்கு ₹16,500 முதல் ₹19,800 வரை நல்ல விலை. தமிழ்நாடு மற்றும் வெளிநாட்டு வாங்குபவர்களிடம் அதிக தேவை உள்ளது.",
  answerTranslation: "(“A fair price for this silk saree is ₹16,500–₹19,800. There's strong demand from Tamil Nadu and export buyers.”)",
};

export default function VoiceAssistant({ go }) {
  const [stage, setStage] = useState('idle'); // idle -> listening -> thinking -> answered

  const startDemo = () => {
    setStage('listening');
    setTimeout(() => setStage('thinking'), 2000);
    setTimeout(() => setStage('answered'), 3800);
  };

  return (
    <div className="max-w-2xl mx-auto px-4 py-14 text-center">
      <span className="inline-block px-4 py-1.5 rounded-full bg-terracotta/10 text-terracotta text-sm font-semibold mb-4">🎙️ Voice AI Assistant</span>
      <h2 className="font-display text-3xl font-extrabold mb-2">Speak in Your Language</h2>
      <p className="text-indigonight/60 mb-10">Tamil · Hindi · English — no typing, no reading required.</p>

      <div className="flex justify-center mb-10">
        <motion.button onClick={startDemo} whileTap={{scale:0.92}} className="relative">
          {stage === 'listening' && (
            <>
              <div className="absolute inset-0 rounded-full bg-terracotta pulse-ring" />
              <div className="absolute inset-0 rounded-full bg-terracotta pulse-ring" style={{animationDelay:'0.5s'}} />
            </>
          )}
          <div className={`relative w-32 h-32 rounded-full flex items-center justify-center shadow-2xl transition-colors ${stage==='listening' ? 'bg-madder' : 'bg-gradient-to-br from-terracotta to-turmeric'}`}>
            <Mic className="text-white" size={48} />
          </div>
        </motion.button>
      </div>

      {stage === 'idle' && <p className="text-indigonight/40 text-sm">Tap the mic to hear a live demo</p>}
      {stage === 'listening' && <p className="text-madder font-semibold animate-pulse">Listening in Tamil...</p>}
      {stage === 'thinking' && <p className="text-terracotta font-semibold animate-pulse">AI is processing speech & market data...</p>}

      {(stage === 'listening' || stage === 'thinking' || stage === 'answered') && (
        <motion.div initial={{opacity:0,y:10}} animate={{opacity:1,y:0}} className="mt-6 bg-white rounded-2xl p-5 shadow-md text-left border border-terracotta/10">
          <p className="text-xs font-semibold text-indigonight/40 mb-1">ARTISAN ASKED</p>
          <p className="font-display font-semibold text-lg">"{CONVO.question}"</p>
          <p className="text-xs text-indigonight/50 mt-1">{CONVO.translation}</p>
        </motion.div>
      )}

      {stage === 'answered' && (
        <motion.div initial={{opacity:0,y:10}} animate={{opacity:1,y:0}} className="mt-4 bg-madder text-white rounded-2xl p-5 shadow-md text-left">
          <p className="text-xs font-semibold text-turmeric mb-1 flex items-center gap-1"><Volume2 size={12}/> AI VOICE RESPONSE</p>
          <p className="font-display font-semibold text-lg">"{CONVO.answer}"</p>
          <p className="text-xs text-white/70 mt-1">{CONVO.answerTranslation}</p>
          <div className="grid grid-cols-2 gap-3 mt-4">
            <div className="bg-white/10 rounded-xl p-3">
              <p className="text-[11px] text-white/60 flex items-center gap-1"><IndianRupee size={11}/> Fair Price</p>
              <p className="font-bold">₹16,500 – ₹19,800</p>
            </div>
            <div className="bg-white/10 rounded-xl p-3">
              <p className="text-[11px] text-white/60 flex items-center gap-1"><TrendingUp size={11}/> Best Market</p>
              <p className="font-bold">Tamil Nadu + Export</p>
            </div>
          </div>
        </motion.div>
      )}

      {stage === 'answered' && (
        <motion.div initial={{opacity:0}} animate={{opacity:1}} className="mt-4 bg-turmeric/15 rounded-2xl p-4 flex items-center gap-3 text-left">
          <ShieldCheck className="text-bronze flex-shrink-0" size={22} />
          <p className="text-sm text-bronze"><b>PM Vishwakarma Yojana</b> — eligible for ₹15,000 toolkit incentive. Say "Haan" to confirm and go live.</p>
        </motion.div>
      )}

      {stage === 'answered' && (
        <button onClick={() => go('matching')} className="mt-8 px-7 py-3 rounded-full bg-terracotta text-white font-semibold inline-flex items-center gap-2 shadow-glow">
          Continue to Buyer Matching <ArrowRight size={16} />
        </button>
      )}
    </div>
  );
}