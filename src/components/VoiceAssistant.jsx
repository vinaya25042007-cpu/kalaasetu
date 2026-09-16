import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Mic, MicOff, Volume2, VolumeX, IndianRupee, TrendingUp, ShieldCheck, 
  ArrowRight, Languages, Sparkles, AlertCircle, Send, CornerDownLeft, RefreshCw 
} from 'lucide-react';
import { useLanguage } from '../i18n/LanguageContext.jsx';
import { processVoiceQuery } from '../api/client.js';

const DIALECTS = [
  { code: 'ta-IN', langCode: 'ta', label: 'தமிழ் (Tamil)', sample: "நான் இதை பட்டு நூலால் நெய்தேன், எவ்வளவு விலை வைக்கலாம்?" },
  { code: 'hi-IN', langCode: 'hi', label: 'हिंदी (Hindi)', sample: "मैंने यह मधुबनी पेंटिंग प्राकृतिक रंगों से बनाई है, इसका सही दाम क्या होना चाहिए?" },
  { code: 'en-IN', langCode: 'en', label: 'English (India)', sample: "I made a terracotta clay pot on my wheel. What is the fair price and where is the highest demand?" },
  { code: 'kn-IN', langCode: 'kn', label: 'ಕನ್ನಡ (Kannada)', sample: "ನಾನು ಇದನ್ನು ಆಲೆ ಮರದಿಂದ ಮಾಡಿದ ಚನ್ನಪಟ್ಟಣ ಆಟಿಕೆ, ಇದಕ್ಕೆ ಯಾವ ಬೆಲೆ ಸಿಗುತ್ತದೆ?" },
  { code: 'bn-IN', langCode: 'bn', label: 'বাংলা (Bengali)', sample: "বাঁকুড়ার মাটির ঘোড়া তৈরি করেছি, পাইকারি বাজারে কত দাম পাব?" },
  { code: 'te-IN', langCode: 'te', label: 'తెలుగు (Telugu)', sample: "నేను సహజ రంగులతో కలంకారీ చీర తయారు చేశాను, దీనికి మార్కెట్ ధర ఎంత?" },
  { code: 'mr-IN', langCode: 'mr', label: 'मराठी (Marathi)', sample: "मी वारली चित्रकला तयार केली आहे, मला चांगला भाव कुठे मिळेल?" },
  { code: 'or-IN', langCode: 'or', label: 'ଓଡ଼ିଆ (Odia)', sample: "ମୁଁ ଏହି ସମ୍ବଲପୁରୀ ଇକ୍କତ ବୁଣିଛି, ଏହାକୁ କେଉଁଠି ଭଲ ଦର ମିଳିବ?" }
];

export default function VoiceAssistant({ go }) {
  const { t } = useLanguage();
  const [selectedDialect, setSelectedDialect] = useState(DIALECTS[0]);
  const [isListening, setIsListening] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [spokenTranscript, setSpokenTranscript] = useState('');
  const [manualInput, setManualInput] = useState('');
  const [activeResponse, setActiveResponse] = useState(null);
  const [micSupported, setMicSupported] = useState(true);
  const [micError, setMicError] = useState(null);
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);

  const recognitionRef = useRef(null);

  // Check speech recognition support on mount
  useEffect(() => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) {
      setMicSupported(false);
      setMicError("Speech recognition is not supported in this browser. You can type or use the sample prompts below.");
    }
  }, []);

  // Cleanup speech synthesis on unmount
  useEffect(() => {
    return () => {
      if (window.speechSynthesis) {
        window.speechSynthesis.cancel();
      }
      if (recognitionRef.current) {
        try {
          recognitionRef.current.stop();
        } catch {}
      }
    };
  }, []);

  // Start live microphone speech recognition
  const startListening = () => {
    setMicError(null);
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    
    if (!SpeechRecognition) {
      setMicSupported(false);
      setMicError("Speech recognition not supported in this browser. Please use keyboard input.");
      return;
    }

    try {
      if (window.speechSynthesis) {
        window.speechSynthesis.cancel();
        setIsPlayingAudio(false);
      }

      const recognition = new SpeechRecognition();
      recognition.lang = selectedDialect.code;
      recognition.interimResults = true;
      recognition.continuous = false;
      recognition.maxAlternatives = 1;

      let finalResult = '';

      recognition.onstart = () => {
        setIsListening(true);
        setSpokenTranscript('');
      };

      recognition.onresult = (event) => {
        let interim = '';
        for (let i = event.resultIndex; i < event.results.length; ++i) {
          if (event.results[i].isFinal) {
            finalResult += event.results[i][0].transcript;
          } else {
            interim += event.results[i][0].transcript;
          }
        }
        setSpokenTranscript(finalResult || interim);
      };

      recognition.onerror = (event) => {
        console.warn("Speech recognition error:", event.error);
        if (event.error === 'not-allowed') {
          setMicError("Microphone access denied. Please allow microphone permissions in your browser or type below.");
        } else if (event.error === 'no-speech') {
          setMicError("No speech detected. Please tap the microphone and speak again.");
        } else {
          setMicError(`Recognition error: ${event.error}. You can type your question below.`);
        }
        setIsListening(false);
      };

      recognition.onend = () => {
        setIsListening(false);
        const queryToProcess = finalResult || spokenTranscript;
        if (queryToProcess && queryToProcess.trim().length > 1) {
          handleQuerySubmission(queryToProcess);
        }
      };

      recognitionRef.current = recognition;
      recognition.start();
    } catch (err) {
      console.error("Failed to start speech recognition:", err);
      setMicError("Could not access microphone. Please check browser permissions or type below.");
      setIsListening(false);
    }
  };

  const stopListening = () => {
    if (recognitionRef.current) {
      try {
        recognitionRef.current.stop();
      } catch {}
    }
    setIsListening(false);
  };

  // Submit and process the speech / text with backend API
  const handleQuerySubmission = async (text) => {
    if (!text || !text.trim()) return;
    const cleanText = text.trim();
    setSpokenTranscript(cleanText);
    setIsProcessing(true);
    setMicError(null);

    try {
      const result = await processVoiceQuery({
        text: cleanText,
        language: selectedDialect.langCode,
      });

      if (result && result.answer) {
        setActiveResponse(result);
        speakResponse(result.answer, selectedDialect.code);
      }
    } catch (err) {
      console.error("Voice processing error:", err);
    } finally {
      setIsProcessing(false);
    }
  };

  // Text-To-Speech Playback
  const speakResponse = (text, langCode) => {
    if (!('speechSynthesis' in window)) return;

    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = langCode || 'hi-IN';
    utterance.rate = 0.95; // Natural cadence for Indian languages
    utterance.pitch = 1.0;

    utterance.onstart = () => setIsPlayingAudio(true);
    utterance.onend = () => setIsPlayingAudio(false);
    utterance.onerror = () => setIsPlayingAudio(false);

    window.speechSynthesis.speak(utterance);
  };

  const toggleAudio = () => {
    if (isPlayingAudio) {
      window.speechSynthesis.cancel();
      setIsPlayingAudio(false);
    } else if (activeResponse?.answer) {
      speakResponse(activeResponse.answer, selectedDialect.code);
    }
  };

  return (
    <div className="max-w-3xl mx-auto px-4 py-10 text-center">
      {/* Badge & Title */}
      <span className="inline-block px-4 py-1.5 rounded-full bg-terracotta/10 text-terracotta text-sm font-semibold mb-3">
        {t('voiceAssistant.badge')} — Live Web Speech Engine
      </span>
      <h2 className="font-display text-3xl md:text-4xl font-extrabold mb-2 text-indigonight">
        {t('voiceAssistant.title')}
      </h2>
      <p className="text-xs sm:text-sm text-indigonight/70 mb-6 max-w-xl mx-auto">
        Speak directly into your microphone in your mother tongue. Our AI transcribes live audio, analyzes fair craft pricing, and identifies wholesale buyers.
      </p>

      {/* Language Dialect Selector */}
      <div className="bg-white/80 p-3 rounded-2xl border border-terracotta/15 mb-6 shadow-xs">
        <div className="flex items-center justify-between gap-2 mb-2 px-1">
          <span className="text-xs font-bold text-indigonight/70 flex items-center gap-1.5">
            <Languages size={14} className="text-terracotta" />
            Active Dialect for Live Recognition:
          </span>
          <span className="text-[10px] px-2 py-0.5 rounded-full bg-turmeric/20 text-bronze font-bold">
            {selectedDialect.code}
          </span>
        </div>
        <div className="flex flex-wrap items-center justify-center gap-1.5">
          {DIALECTS.map((d) => (
            <button
              key={d.code}
              onClick={() => {
                setSelectedDialect(d);
                if (window.speechSynthesis) window.speechSynthesis.cancel();
              }}
              className={`px-3 py-1 rounded-full text-xs font-medium transition border ${
                selectedDialect.code === d.code
                  ? 'bg-terracotta text-white border-terracotta shadow-xs'
                  : 'bg-white text-indigonight/70 border-terracotta/15 hover:border-terracotta/40'
              }`}
            >
              {d.label}
            </button>
          ))}
        </div>
      </div>

      {/* Mic Button & Waveform Animation */}
      <div className="flex flex-col items-center justify-center my-6">
        <div className="relative">
          {isListening && (
            <>
              <div className="absolute -inset-4 rounded-full bg-terracotta/30 animate-ping" />
              <div className="absolute -inset-8 rounded-full bg-turmeric/20 animate-pulse" />
            </>
          )}

          <button
            onClick={isListening ? stopListening : startListening}
            disabled={isProcessing}
            className={`relative w-28 h-28 sm:w-32 sm:h-32 rounded-full flex items-center justify-center shadow-2xl transition-all duration-300 cursor-pointer ${
              isListening
                ? 'bg-madder ring-8 ring-madder/30 scale-105'
                : isProcessing
                ? 'bg-gradient-to-br from-turmeric to-terracotta animate-pulse'
                : 'bg-gradient-to-br from-terracotta to-turmeric hover:shadow-glow hover:scale-103'
            }`}
            title={isListening ? "Tap to Stop Listening" : "Tap to Speak into Microphone"}
          >
            {isListening ? (
              <MicOff className="text-white animate-bounce" size={44} />
            ) : (
              <Mic className="text-white" size={44} />
            )}
          </button>
        </div>

        {/* Status text */}
        <div className="mt-4 min-h-[30px] flex items-center justify-center">
          {isListening && (
            <p className="text-madder font-bold text-sm sm:text-base animate-pulse flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-madder animate-ping" />
              Listening to your microphone... Speak your craft details!
            </p>
          )}
          {isProcessing && (
            <p className="text-terracotta font-semibold text-sm flex items-center gap-2">
              <Sparkles size={16} className="animate-spin text-terracotta" />
              Processing speech with KalaaSetu AI Market Engine...
            </p>
          )}
          {!isListening && !isProcessing && (
            <p className="text-indigonight/60 text-xs sm:text-sm font-medium">
              Tap the microphone to speak, or type your question below
            </p>
          )}
        </div>
      </div>

      {/* Live Waveform Indicator while listening */}
      {isListening && (
        <div className="flex items-center justify-center gap-1.5 h-8 my-2">
          {[40, 70, 90, 60, 100, 50, 80, 45, 95, 65, 85].map((height, i) => (
            <motion.div
              key={i}
              animate={{ height: [`${height * 0.2}%`, `${height}%`, `${height * 0.3}%`] }}
              transition={{ repeat: Infinity, duration: 0.6 + i * 0.08, ease: "easeInOut" }}
              className="w-1.5 bg-terracotta rounded-full"
            />
          ))}
        </div>
      )}

      {/* Mic Error Notice */}
      {micError && (
        <div className="mb-4 p-3 bg-amber-50 border border-amber-200 rounded-2xl text-xs text-amber-800 flex items-center justify-center gap-2 max-w-lg mx-auto">
          <AlertCircle size={16} className="flex-shrink-0 text-amber-600" />
          <span>{micError}</span>
        </div>
      )}

      {/* Live Transcription Card */}
      {(spokenTranscript || isListening) && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-3 bg-white rounded-3xl p-5 shadow-sm text-left border border-terracotta/20 relative"
        >
          <div className="flex items-center justify-between mb-1">
            <span className="text-[10px] font-bold text-indigonight/50 uppercase tracking-wider flex items-center gap-1">
              <span className={`w-2 h-2 rounded-full ${isListening ? 'bg-red-500 animate-ping' : 'bg-green-500'}`} />
              Live Transcribed Speech ({selectedDialect.label})
            </span>
            {isListening && (
              <span className="text-[10px] text-madder font-semibold">Streaming real-time audio</span>
            )}
          </div>
          <p className="font-display font-semibold text-lg text-indigonight leading-snug">
            "{spokenTranscript || 'Listening to your voice...'}"
          </p>
        </motion.div>
      )}

      {/* Live AI Market Valuation Response */}
      <AnimatePresence>
        {activeResponse && (
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-4 bg-gradient-to-br from-madder to-terracotta text-white rounded-3xl p-6 shadow-xl text-left relative overflow-hidden"
          >
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold text-turmeric uppercase tracking-wider flex items-center gap-1.5">
                  <Volume2 size={16} className={isPlayingAudio ? 'animate-bounce' : ''} />
                  KalaaSetu AI Intelligence
                </span>
                {activeResponse.craftDetected && (
                  <span className="text-[10px] px-2 py-0.5 rounded-full bg-white/20 text-white font-semibold">
                    Craft: {activeResponse.craftDetected}
                  </span>
                )}
              </div>

              <button
                onClick={toggleAudio}
                className="p-1.5 rounded-full bg-white/20 hover:bg-white/30 text-white text-xs flex items-center gap-1 transition"
                title={isPlayingAudio ? "Mute Speech" : "Speak Aloud"}
              >
                {isPlayingAudio ? <VolumeX size={14} /> : <Volume2 size={14} />}
                <span>{isPlayingAudio ? 'Playing' : 'Listen'}</span>
              </button>
            </div>

            <p className="font-display font-semibold text-lg leading-relaxed">
              "{activeResponse.answer}"
            </p>
            {activeResponse.answerTranslation && activeResponse.answerTranslation !== activeResponse.answer && (
              <p className="text-xs text-white/80 mt-1.5 italic">
                {activeResponse.answerTranslation}
              </p>
            )}

            {/* Price & Demand Metrics Grid */}
            <div className="grid sm:grid-cols-2 gap-3 mt-5">
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-3.5 border border-white/10">
                <p className="text-[11px] text-white/70 flex items-center gap-1 font-medium">
                  <IndianRupee size={12} /> {t('voiceAssistant.fairPrice')}
                </p>
                <p className="font-display font-bold text-2xl text-white mt-1">
                  {activeResponse.priceRange}
                </p>
                <p className="text-[10px] text-white/60 mt-0.5">Direct fair-trade artisan baseline</p>
              </div>

              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-3.5 border border-white/10">
                <p className="text-[11px] text-white/70 flex items-center gap-1 font-medium">
                  <TrendingUp size={12} /> Peak Buyer Demand
                </p>
                <p className="font-display font-bold text-base text-turmeric mt-1 truncate">
                  {activeResponse.highDemandRegions?.join(', ') || 'Metros + Export'}
                </p>
                <p className="text-[10px] text-white/60 mt-0.5">Demand Score: {activeResponse.demandScore || 88}/100</p>
              </div>
            </div>

            {/* Matched Buyers */}
            {activeResponse.matchedBuyers && activeResponse.matchedBuyers.length > 0 && (
              <div className="mt-4 pt-3 border-t border-white/15">
                <p className="text-[11px] font-bold text-white/80 mb-2">
                  Active Procurement Inquiries for this Craft:
                </p>
                <div className="flex flex-wrap gap-2">
                  {activeResponse.matchedBuyers.map((b, idx) => (
                    <span
                      key={idx}
                      className="text-xs bg-white/20 text-white px-2.5 py-1 rounded-full font-medium"
                    >
                      🏢 {b.name} ({b.location})
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* PM Vishwakarma Subsidy Callout */}
            <div className="mt-4 bg-black/20 rounded-2xl p-3.5 flex items-center gap-2.5 text-xs text-white/90">
              <ShieldCheck className="text-turmeric flex-shrink-0" size={20} />
              <span>
                <b>Government Welfare Linked:</b> Eligible for PM Vishwakarma ₹15,000 tool-grant and 5% credit subsidy for this craft cluster.
              </span>
            </div>

            <div className="mt-5 flex flex-col sm:flex-row items-center gap-3">
              <button
                onClick={() => go('matching')}
                className="w-full sm:w-auto px-6 py-2.5 rounded-full bg-white text-terracotta font-bold text-xs flex items-center justify-center gap-2 hover:bg-white/90 transition shadow"
              >
                {t('voiceAssistant.continueMatch')} <ArrowRight size={14} />
              </button>
              <button
                onClick={() => go('artisan')}
                className="w-full sm:w-auto px-5 py-2.5 rounded-full bg-white/20 text-white font-medium text-xs hover:bg-white/30 transition"
              >
                Create Product Listing with this Price
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Manual Keyboard Input for Live Testing */}
      <div className="mt-8 bg-white/90 rounded-2xl p-3 border border-terracotta/20 shadow-sm max-w-xl mx-auto text-left">
        <p className="text-[11px] font-bold text-indigonight/60 mb-1.5 flex items-center justify-between">
          <span>Or Type / Test with Your Own Words:</span>
          <span className="text-[10px] text-terracotta font-normal">Works with any craft description</span>
        </p>
        <div className="flex items-center gap-2">
          <input
            type="text"
            value={manualInput}
            onChange={(e) => setManualInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter' && manualInput.trim()) {
                handleQuerySubmission(manualInput);
                setManualInput('');
              }
            }}
            placeholder={`e.g. ${selectedDialect.sample}`}
            className="flex-1 px-3 py-2 rounded-xl bg-sand/40 border border-terracotta/15 text-xs text-indigonight outline-none focus:border-terracotta"
          />
          <button
            onClick={() => {
              if (manualInput.trim()) {
                handleQuerySubmission(manualInput);
                setManualInput('');
              }
            }}
            disabled={!manualInput.trim() || isProcessing}
            className="px-4 py-2 rounded-xl bg-terracotta text-white text-xs font-semibold hover:bg-terracotta-dark transition flex items-center gap-1 disabled:opacity-50"
          >
            <Send size={12} /> Ask
          </button>
        </div>

        {/* Quick Sample Clickers */}
        <div className="mt-2.5 flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none">
          <span className="text-[10px] text-indigonight/40 whitespace-nowrap">Try:</span>
          {DIALECTS.slice(0, 4).map((d) => (
            <button
              key={d.code}
              onClick={() => {
                setSelectedDialect(d);
                handleQuerySubmission(d.sample);
              }}
              className="text-[10px] px-2.5 py-1 rounded-lg bg-terracotta/5 hover:bg-terracotta/10 text-terracotta font-medium whitespace-nowrap border border-terracotta/10 transition"
            >
              {d.label.split(' ')[0]} Sample
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}