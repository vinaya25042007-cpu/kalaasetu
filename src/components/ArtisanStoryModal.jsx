import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Play, Pause, Volume2, VolumeX, Maximize, X,
  Sparkles, Award, Shield, Users, HeartHandshake,
  CheckCircle2, Clock, MapPin, ChevronRight, Fingerprint, MessageSquare
} from 'lucide-react';
import { getCraftStory } from '../data/craftStories.js';
import { useLanguage } from '../i18n/LanguageContext.jsx';
import BrushStroke from './craft/BrushStroke.jsx';

export default function ArtisanStoryModal({ product, onClose, openPassport }) {
  const { lang, t } = useLanguage();
  const story = getCraftStory(product);

  const videoRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(138); // default fallback duration seconds
  const [isMuted, setIsMuted] = useState(false);
  const [showSubtitles, setShowSubtitles] = useState(true);
  const [activeStep, setActiveStep] = useState(0);
  const [currentCaption, setCurrentCaption] = useState("");

  // Setup video listener
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const onTimeUpdate = () => {
      setCurrentTime(video.currentTime);
      if (video.duration && !isNaN(video.duration)) {
        setDuration(video.duration);
      }

      // Update caption based on language
      const captionsForLang = story.video.captions[lang] || story.video.captions.en || [];
      const match = captionsForLang
        .filter(c => c.time <= video.currentTime)
        .sort((a, b) => b.time - a.time)[0];
      setCurrentCaption(match ? match.text : "");
    };

    const onPlay = () => setIsPlaying(true);
    const onPause = () => setIsPlaying(false);
    const onLoadedMetadata = () => {
      if (video.duration) setDuration(video.duration);
    };

    video.addEventListener('timeupdate', onTimeUpdate);
    video.addEventListener('play', onPlay);
    video.addEventListener('pause', onPause);
    video.addEventListener('loadedmetadata', onLoadedMetadata);

    return () => {
      video.removeEventListener('timeupdate', onTimeUpdate);
      video.removeEventListener('play', onPlay);
      video.removeEventListener('pause', onPause);
      video.removeEventListener('loadedmetadata', onLoadedMetadata);
    };
  }, [story, lang]);

  const togglePlay = () => {
    if (!videoRef.current) return;
    if (isPlaying) {
      videoRef.current.pause();
    } else {
      videoRef.current.play().catch(() => {
        // Autoplay may be restricted; state handles gracefully
      });
    }
  };

  const handleSeek = (e) => {
    const time = parseFloat(e.target.value);
    setCurrentTime(time);
    if (videoRef.current) {
      videoRef.current.currentTime = time;
    }
  };

  const toggleMute = () => {
    if (!videoRef.current) return;
    videoRef.current.muted = !isMuted;
    setIsMuted(!isMuted);
  };

  const toggleFullscreen = () => {
    if (!videoRef.current) return;
    if (videoRef.current.requestFullscreen) {
      videoRef.current.requestFullscreen();
    }
  };

  const formatTime = (secs) => {
    const m = Math.floor(secs / 60);
    const s = Math.floor(secs % 60);
    return `${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`;
  };

  const iconMap = {
    Shield: Shield,
    Users: Users,
    Award: Award,
    HeartHandshake: HeartHandshake,
  };

  return (
    <div className="fixed inset-0 z-50 bg-indigonight/80 backdrop-blur-md flex items-center justify-center p-2 sm:p-4 overflow-y-auto">
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 15 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 15 }}
        transition={{ duration: 0.3 }}
        className="bg-ivory rounded-3xl max-w-4xl w-full my-8 max-h-[92vh] overflow-y-auto shadow-2xl border-2 border-terracotta/30 text-indigonight relative"
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-20 w-10 h-10 rounded-full bg-black/40 hover:bg-black/60 text-white flex items-center justify-center backdrop-blur-sm transition"
          aria-label={t('common.close')}
        >
          <X size={20} />
        </button>

        {/* Video Hero Section */}
        <div className="relative bg-black rounded-t-3xl overflow-hidden aspect-video max-h-[440px] w-full flex items-center justify-center">
          <video
            ref={videoRef}
            src={story.video.src}
            poster={story.video.poster}
            className="w-full h-full object-cover"
            playsInline
            onClick={togglePlay}
          />

          {/* Subtitles Overlay */}
          {showSubtitles && currentCaption && (
            <div className="absolute bottom-16 left-4 right-4 text-center z-10 pointer-events-none">
              <span className="inline-block bg-black/80 text-white text-xs sm:text-sm font-medium px-4 py-1.5 rounded-lg backdrop-blur-sm shadow-md border border-white/10">
                {currentCaption}
              </span>
            </div>
          )}

          {/* Large Center Play Button overlay when paused */}
          {!isPlaying && (
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              onClick={togglePlay}
              className="absolute z-10 w-18 h-18 sm:w-20 sm:h-20 rounded-full bg-terracotta text-white flex items-center justify-center shadow-glow border-2 border-white/30"
            >
              <Play size={32} className="ml-1 fill-current" />
            </motion.button>
          )}

          {/* Video Controls Bar */}
          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent p-3 sm:p-4 z-10 flex flex-col gap-2">
            {/* Scrubber */}
            <input
              type="range"
              min={0}
              max={duration || 100}
              value={currentTime}
              onChange={handleSeek}
              className="w-full h-1.5 bg-white/30 rounded-lg appearance-none cursor-pointer accent-terracotta hover:h-2 transition-all"
            />

            <div className="flex items-center justify-between text-white text-xs">
              <div className="flex items-center gap-3">
                <button onClick={togglePlay} className="hover:text-turmeric transition">
                  {isPlaying ? <Pause size={18} /> : <Play size={18} />}
                </button>
                <button onClick={toggleMute} className="hover:text-turmeric transition">
                  {isMuted ? <VolumeX size={18} /> : <Volume2 size={18} />}
                </button>
                <span className="font-mono">
                  {formatTime(currentTime)} / {formatTime(duration)}
                </span>
              </div>

              <div className="flex items-center gap-3">
                <button
                  onClick={() => setShowSubtitles(!showSubtitles)}
                  className={`px-2 py-0.5 rounded font-bold text-[10px] transition ${
                    showSubtitles ? 'bg-terracotta text-white' : 'bg-white/20 text-white/70'
                  }`}
                  title="Toggle Subtitles"
                >
                  CC
                </button>
                <button onClick={toggleFullscreen} className="hover:text-turmeric transition">
                  <Maximize size={16} />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Story Content & Narrator */}
        <div className="p-6 sm:p-8 space-y-8">
          {/* Header & Narrator Profile */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-6 border-b border-terracotta/15">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <span className="px-3 py-1 rounded-full bg-terracotta/10 text-terracotta text-xs font-bold tracking-wide">
                  {t('craftStory.storyBehindCraft')}
                </span>
                <span className="px-3 py-1 rounded-full bg-turmeric/20 text-bronze text-xs font-semibold">
                  {story.craftName}
                </span>
              </div>
              <h2 className="font-display text-2xl sm:text-3xl font-extrabold text-indigonight leading-tight">
                {story.title}
              </h2>
              <p className="text-indigonight/70 text-sm mt-1">{story.subtitle}</p>
            </div>

            {/* Narrator Card */}
            <div className="glass rounded-2xl p-4 border border-terracotta/20 flex items-center gap-4 flex-shrink-0 md:max-w-xs">
              <div className="w-14 h-14 rounded-full bg-gradient-to-br from-terracotta to-turmeric flex items-center justify-center text-3xl shadow-md">
                {story.narrator.avatar}
              </div>
              <div>
                <p className="text-[10px] text-terracotta font-bold tracking-wider uppercase">
                  {t('craftStory.narrator')}
                </p>
                <h4 className="font-display font-bold text-sm leading-tight">{story.narrator.name}</h4>
                <p className="text-xs text-indigonight/60 mt-0.5">{story.narrator.role}</p>
                <p className="text-[11px] text-indigonight/50 flex items-center gap-1 mt-1">
                  <MapPin size={10} /> {story.narrator.region}
                </p>
              </div>
            </div>
          </div>

          {/* Narrator's Personal Quote */}
          {story.narrator.quote && (
            <div className="bg-gradient-to-r from-terracotta/10 via-turmeric/10 to-transparent p-4 rounded-2xl border-l-4 border-terracotta flex items-start gap-3">
              <MessageSquare size={20} className="text-terracotta flex-shrink-0 mt-0.5" />
              <p className="italic text-sm text-indigonight/80 font-serif leading-relaxed">
                "{story.narrator.quote}"
              </p>
            </div>
          )}

          {/* Deep Product Story */}
          <div>
            <h3 className="font-display font-bold text-xl mb-3 flex items-center gap-2">
              <Sparkles size={18} className="text-terracotta" />
              {t('craftStory.heritage')}
            </h3>
            <p className="text-indigonight/75 leading-relaxed text-sm sm:text-base bg-white/70 p-5 rounded-2xl border border-terracotta/10">
              {story.productStory}
            </p>
          </div>

          {/* Visual Journey: Raw Materials → Process → Finished Product */}
          <div>
            <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-4">
              <div>
                <h3 className="font-display font-bold text-xl">
                  {t('craftStory.visualJourney')}
                </h3>
                <p className="text-xs text-indigonight/60">
                  Raw materials → traditional technique → masterwork authentication
                </p>
              </div>
              <div className="flex items-center gap-1 mt-2 sm:mt-0">
                {story.visualJourney.map((step, idx) => (
                  <button
                    key={idx}
                    onClick={() => setActiveStep(idx)}
                    className={`px-3 py-1.5 rounded-full text-xs font-bold transition ${
                      activeStep === idx
                        ? 'bg-terracotta text-white shadow-sm'
                        : 'bg-white/70 text-indigonight/60 hover:bg-terracotta/10'
                    }`}
                  >
                    Step {step.step}
                  </button>
                ))}
              </div>
            </div>

            {/* Step Card */}
            <AnimatePresence mode="wait">
              {story.visualJourney[activeStep] && (
                <motion.div
                  key={activeStep}
                  initial={{ opacity: 0, x: 10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -10 }}
                  transition={{ duration: 0.25 }}
                  className="bg-white rounded-3xl p-6 border-2 border-terracotta/20 shadow-md relative overflow-hidden"
                >
                  <div className="flex items-start justify-between gap-4 mb-3">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-terracotta to-turmeric flex items-center justify-center text-2xl shadow-inner">
                        {story.visualJourney[activeStep].icon}
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="text-xs font-bold text-terracotta uppercase tracking-wider">
                            {story.visualJourney[activeStep].stage}
                          </span>
                          <span className="text-[11px] bg-turmeric/20 text-bronze px-2 py-0.5 rounded-full font-semibold flex items-center gap-1">
                            <Clock size={10} /> {story.visualJourney[activeStep].timeframe}
                          </span>
                        </div>
                        <h4 className="font-display font-bold text-lg text-indigonight">
                          {story.visualJourney[activeStep].headline}
                        </h4>
                      </div>
                    </div>
                    <span className="text-xs font-bold bg-green-100 text-green-700 px-3 py-1 rounded-full flex items-center gap-1 flex-shrink-0">
                      <CheckCircle2 size={13} /> {story.visualJourney[activeStep].badge}
                    </span>
                  </div>

                  <p className="text-sm text-indigonight/70 leading-relaxed pl-2 sm:pl-15">
                    {story.visualJourney[activeStep].desc}
                  </p>

                  <div className="mt-4 pt-3 border-t border-dashed border-terracotta/15 flex items-start gap-2 text-xs bg-terracotta/5 p-3 rounded-xl">
                    <span className="font-bold text-terracotta whitespace-nowrap">Artisan's Note:</span>
                    <span className="italic text-indigonight/70">
                      "{story.visualJourney[activeStep].artisanNote}"
                    </span>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* "Why This Craft Is Special" Section */}
          <div>
            <h3 className="font-display font-bold text-xl mb-4">
              <BrushStroke>{t('craftStory.whySpecial')}</BrushStroke>
            </h3>
            <div className="grid sm:grid-cols-2 gap-4">
              {story.whySpecial.map((item, idx) => {
                const IconComponent = iconMap[item.icon] || Award;
                return (
                  <div
                    key={idx}
                    className="bg-white/80 rounded-2xl p-4 border border-terracotta/15 shadow-sm hover:shadow-md transition"
                  >
                    <div className="w-10 h-10 rounded-xl bg-terracotta/10 text-terracotta flex items-center justify-center mb-3">
                      <IconComponent size={20} />
                    </div>
                    <h5 className="font-display font-bold text-sm text-indigonight mb-1">
                      {item.title}
                    </h5>
                    <p className="text-xs text-indigonight/65 leading-relaxed">{item.desc}</p>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Bottom Action Footer */}
          <div className="pt-6 border-t border-terracotta/15 flex flex-wrap items-center justify-between gap-4">
            {openPassport && product && (
              <button
                onClick={() => {
                  onClose();
                  openPassport(product);
                }}
                className="px-6 py-3 rounded-full border border-terracotta text-terracotta font-semibold text-sm hover:bg-terracotta/10 transition flex items-center gap-2"
              >
                <Fingerprint size={16} /> View Digital Craft Passport & DNA
              </button>
            )}

            <button
              onClick={onClose}
              className="ml-auto px-7 py-3 rounded-full bg-terracotta text-white font-semibold text-sm hover:bg-terracotta-dark transition shadow-glow flex items-center gap-2"
            >
              Done Reading <ChevronRight size={16} />
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
