import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Map as MapIcon, TrendingUp, ArrowRight, Search, Sparkles, 
  Layers, Users, ShieldCheck, ShoppingBag, ExternalLink, RefreshCw, ZoomIn, ZoomOut
} from 'lucide-react';
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid, Cell } from 'recharts';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { CRAFT_HUBS, CATEGORIES } from '../data/craftHubs.js';
import { useLanguage } from '../i18n/LanguageContext.jsx';

export default function DemandMap({ go }) {
  const { t } = useLanguage();
  const [selectedHub, setSelectedHub] = useState(CRAFT_HUBS[0]);
  const [selectedCategory, setSelectedCategory] = useState("All Crafts");
  const [searchQuery, setSearchQuery] = useState("");
  const [viewMetric, setViewMetric] = useState("demand"); // "demand" or "growth"
  
  const mapContainerRef = useRef(null);
  const mapInstanceRef = useRef(null);
  const markersRef = useRef({});

  // Filter hubs based on category & search query
  const filteredHubs = CRAFT_HUBS.filter(hub => {
    const matchesCat = selectedCategory === "All Crafts" || hub.category === selectedCategory;
    const matchesSearch = 
      hub.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      hub.state.toLowerCase().includes(searchQuery.toLowerCase()) ||
      hub.craft.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCat && matchesSearch;
  });

  // Initialize and update Leaflet Map
  useEffect(() => {
    if (!mapContainerRef.current) return;

    // Create map if not already created
    if (!mapInstanceRef.current) {
      const map = L.map(mapContainerRef.current, {
        center: [22.8, 79.5],
        zoom: 5,
        minZoom: 4,
        maxZoom: 10,
        scrollWheelZoom: false,
        attributionControl: false
      });

      // Add OpenStreetMap tile layer
      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 18,
      }).addTo(map);

      // Add custom minimal attribution in bottom right
      L.control.attribution({ position: 'bottomright', prefix: '© OpenStreetMap | KalaaSetu' }).addTo(map);

      mapInstanceRef.current = map;
    }

    const map = mapInstanceRef.current;

    // Clear previous markers
    Object.values(markersRef.current).forEach(marker => marker.remove());
    markersRef.current = {};

    // Add markers for filtered hubs
    filteredHubs.forEach(hub => {
      const isSelected = selectedHub?.id === hub.id;
      const isHighDemand = hub.demand >= 85;
      
      const pinColor = isHighDemand ? '#BF5B3D' : hub.demand >= 75 ? '#8C6A3F' : '#E8A93C';
      
      const customIcon = L.divIcon({
        className: 'custom-craft-marker',
        html: `
          <div class="relative flex items-center justify-center cursor-pointer transform -translate-x-1/2 -translate-y-1/2 transition-transform duration-200 hover:scale-125 ${isSelected ? 'scale-125 z-50' : 'z-20'}">
            ${isHighDemand ? '<span class="absolute w-10 h-10 rounded-full bg-terracotta/30 animate-ping"></span>' : ''}
            <div class="w-8 h-8 rounded-full flex items-center justify-center text-sm shadow-lg border-2 ${isSelected ? 'border-white ring-4 ring-terracotta/40' : 'border-white/90'}" style="background-color: ${pinColor}; color: white;">
              <span>${hub.icon}</span>
            </div>
            <div class="absolute -bottom-5 px-1.5 py-0.5 rounded bg-indigonight/85 text-white text-[9px] font-bold whitespace-nowrap pointer-events-none shadow backdrop-blur-sm">
              ${hub.name} (${hub.demand})
            </div>
          </div>
        `,
        iconSize: [32, 32],
        iconAnchor: [16, 16],
      });

      const marker = L.marker([hub.lat, hub.lng], { icon: customIcon }).addTo(map);

      // Popup content
      const popupContent = `
        <div style="font-family: system-ui, -apple-system, sans-serif; padding: 4px; min-width: 180px;">
          <div style="display: flex; align-items: center; gap: 6px; margin-bottom: 4px;">
            <span style="font-size: 18px;">${hub.icon}</span>
            <div>
              <h4 style="margin: 0; font-size: 13px; font-weight: 700; color: #232C4D;">${hub.craft}</h4>
              <p style="margin: 0; font-size: 11px; color: #8C6A3F;">${hub.name}, ${hub.state}</p>
            </div>
          </div>
          <div style="display: flex; gap: 8px; margin: 8px 0; background: #FBF6EE; padding: 6px 8px; border-radius: 8px;">
            <div>
              <span style="font-size: 9px; color: #666; display: block;">DEMAND INDEX</span>
              <strong style="font-size: 14px; color: #BF5B3D;">${hub.demand}/100</strong>
            </div>
            <div>
              <span style="font-size: 9px; color: #666; display: block;">YOY GROWTH</span>
              <strong style="font-size: 14px; color: #16a34a;">+${hub.growth}%</strong>
            </div>
          </div>
          ${hub.giTagged ? '<div style="font-size: 10px; color: #232C4D; font-weight: 600; margin-bottom: 4px;">🛡️ GI Tag Certified</div>' : ''}
          <div style="font-size: 10px; color: #555; line-height: 1.3; margin-top: 4px;">${hub.description.slice(0, 75)}...</div>
        </div>
      `;

      marker.bindPopup(popupContent);

      marker.on('click', () => {
        setSelectedHub(hub);
      });

      markersRef.current[hub.id] = marker;
    });

    return () => {
      // Cleanup happens if component unmounts completely
    };
  }, [filteredHubs, selectedHub]);

  // Clean up map instance on unmount
  useEffect(() => {
    return () => {
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
      }
    };
  }, []);

  // When selectedHub changes from cards or search, pan map to it
  const handleSelectHub = (hub) => {
    setSelectedHub(hub);
    if (mapInstanceRef.current) {
      mapInstanceRef.current.flyTo([hub.lat, hub.lng], 7, {
        duration: 1.2,
        easeLinearity: 0.25
      });
      // Open popup if marker exists
      const marker = markersRef.current[hub.id];
      if (marker) {
        setTimeout(() => marker.openPopup(), 400);
      }
    }
  };

  const handleResetZoom = () => {
    if (mapInstanceRef.current) {
      mapInstanceRef.current.flyTo([22.8, 79.5], 5, { duration: 1 });
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      {/* Header */}
      <div className="text-center mb-8">
        <span className="inline-block px-4 py-1.5 rounded-full bg-terracotta/10 text-terracotta text-sm font-semibold mb-3">
          {t('demandMap.badge')}
        </span>
        <h2 className="font-display text-3xl md:text-4xl font-extrabold text-indigonight tracking-tight">
          {t('demandMap.title')}
        </h2>
        <p className="text-xs sm:text-sm text-indigonight/70 mt-2 max-w-2xl mx-auto">
          {t('demandMap.subtitle')} — Interactive geographical mapping of artisan craft clusters, domestic procurement spikes, and export buyer intelligence.
        </p>
      </div>

      {/* Category filters & Search bar */}
      <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-6">
        <div className="flex items-center gap-2 overflow-x-auto w-full md:w-auto pb-2 md:pb-0 scrollbar-none">
          {CATEGORIES.map(cat => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3.5 py-1.5 rounded-full text-xs font-medium whitespace-nowrap transition-all ${
                selectedCategory === cat
                  ? 'bg-terracotta text-white shadow-sm'
                  : 'bg-white text-indigonight/70 border border-terracotta/15 hover:border-terracotta/40'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        <div className="relative w-full md:w-72">
          <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-indigonight/40" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search craft, city, or state..."
            className="w-full pl-9 pr-4 py-2 rounded-full bg-white border border-terracotta/20 text-xs text-indigonight placeholder-indigonight/40 focus:outline-none focus:border-terracotta shadow-sm"
          />
          {searchQuery && (
            <button 
              onClick={() => setSearchQuery('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-indigonight/40 hover:text-indigonight"
            >
              ✕
            </button>
          )}
        </div>
      </div>

      {/* Main Grid: Leaflet Map (Left) + Detailed Panel (Right) */}
      <div className="grid lg:grid-cols-12 gap-6 items-start">
        {/* Leaflet Map Card */}
        <div className="lg:col-span-8 glass rounded-3xl p-4 sm:p-5 border border-terracotta/20 shadow-sm relative overflow-hidden">
          <div className="flex items-center justify-between mb-3 px-2">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-green-500 animate-pulse"></span>
              <span className="text-xs font-bold text-indigonight uppercase tracking-wider">
                Live India Craft Hubs ({filteredHubs.length} Active Hubs)
              </span>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={handleResetZoom}
                className="px-2.5 py-1 rounded-lg bg-white/80 hover:bg-white text-[11px] text-indigonight/70 border border-terracotta/15 flex items-center gap-1 transition"
                title="Reset Map to All-India View"
              >
                <RefreshCw size={12} /> Reset View
              </button>
            </div>
          </div>

          {/* Leaflet Container */}
          <div className="relative w-full h-[460px] sm:h-[520px] rounded-2xl overflow-hidden border border-terracotta/15 bg-[#e8e4da] z-0">
            <div ref={mapContainerRef} className="w-full h-full" />
            
            {/* Legend Overlay on Map */}
            <div className="absolute bottom-3 left-3 z-10 bg-white/90 backdrop-blur-md rounded-xl p-2.5 shadow-md border border-terracotta/15 text-[10px] space-y-1">
              <div className="font-bold text-indigonight mb-1">Demand Index</div>
              <div className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-[#BF5B3D]"></span>
                <span className="text-indigonight/80">Surging (85 - 100)</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-[#8C6A3F]"></span>
                <span className="text-indigonight/80">Steady High (75 - 84)</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-[#E8A93C]"></span>
                <span className="text-indigonight/80">Emerging (&lt; 75)</span>
              </div>
            </div>
          </div>

          {/* Quick Hub Ribbon */}
          <div className="mt-4 pt-3 border-t border-terracotta/10">
            <p className="text-[11px] font-semibold text-indigonight/50 mb-2">
              Quick Select Artisan Cluster:
            </p>
            <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-none">
              {filteredHubs.map(hub => (
                <button
                  key={hub.id}
                  onClick={() => handleSelectHub(hub)}
                  className={`px-3 py-1 rounded-xl text-[11px] font-medium transition flex items-center gap-1.5 whitespace-nowrap border ${
                    selectedHub?.id === hub.id
                      ? 'bg-terracotta text-white border-terracotta shadow-sm'
                      : 'bg-white/80 text-indigonight/80 border-terracotta/15 hover:bg-white'
                  }`}
                >
                  <span>{hub.icon}</span>
                  <span>{hub.name}</span>
                  <span className={`text-[10px] px-1 py-0.2 rounded ${selectedHub?.id === hub.id ? 'bg-white/20' : 'bg-terracotta/10 text-terracotta font-bold'}`}>
                    {hub.demand}
                  </span>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Selected Hub Detail Panel */}
        <div className="lg:col-span-4 glass rounded-3xl p-6 border border-terracotta/20 shadow-sm">
          <AnimatePresence mode="wait">
            {selectedHub && (
              <motion.div
                key={selectedHub.id}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                className="space-y-4"
              >
                {/* Header */}
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-terracotta to-turmeric flex items-center justify-center text-2xl shadow-sm text-white">
                      {selectedHub.icon}
                    </div>
                    <div>
                      <span className="text-[10px] font-bold text-terracotta tracking-wider uppercase">
                        {selectedHub.category}
                      </span>
                      <h3 className="font-display font-bold text-xl text-indigonight leading-tight">
                        {selectedHub.craft}
                      </h3>
                      <p className="text-xs text-indigonight/60 font-medium">
                        {selectedHub.name}, {selectedHub.state}
                      </p>
                    </div>
                  </div>

                  {selectedHub.giTagged && (
                    <span className="flex items-center gap-1 px-2 py-1 rounded-full bg-green-100 text-green-800 text-[10px] font-semibold">
                      <ShieldCheck size={11} /> GI Tag
                    </span>
                  )}
                </div>

                {/* Key Metrics in Cards */}
                <div className="grid grid-cols-2 gap-3 pt-2">
                  <div className="bg-white/80 rounded-2xl p-3 border border-terracotta/10 shadow-xs">
                    <p className="text-[10px] font-medium text-indigonight/50 uppercase tracking-wider">
                      {t('demandMap.demandIndex')}
                    </p>
                    <div className="flex items-baseline gap-1 mt-1">
                      <span className="font-display font-extrabold text-2xl text-terracotta">
                        {selectedHub.demand}
                      </span>
                      <span className="text-xs text-indigonight/40 font-semibold">/100</span>
                    </div>
                    <div className="w-full bg-terracotta/10 h-1.5 rounded-full mt-2 overflow-hidden">
                      <div 
                        className="bg-terracotta h-full rounded-full transition-all duration-500" 
                        style={{ width: `${selectedHub.demand}%` }}
                      />
                    </div>
                  </div>

                  <div className="bg-white/80 rounded-2xl p-3 border border-terracotta/10 shadow-xs">
                    <p className="text-[10px] font-medium text-indigonight/50 uppercase tracking-wider">
                      {t('demandMap.yoyGrowth')}
                    </p>
                    <div className="flex items-center justify-between mt-1">
                      <span className="font-display font-extrabold text-2xl text-green-600">
                        +{selectedHub.growth}%
                      </span>
                      <TrendingUp size={20} className="text-green-600" />
                    </div>
                    <p className="text-[10px] text-green-700 font-medium mt-1">Annual buyer surge</p>
                  </div>
                </div>

                {/* Craft Stats */}
                <div className="bg-white/80 rounded-2xl p-3.5 border border-terracotta/10 space-y-2 text-xs">
                  <div className="flex items-center justify-between pb-1.5 border-b border-terracotta/10">
                    <span className="text-indigonight/60 flex items-center gap-1.5">
                      <Users size={13} className="text-terracotta" /> Active Registered Artisans
                    </span>
                    <span className="font-bold text-indigonight">
                      {selectedHub.activeArtisans.toLocaleString()}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-indigonight/60 flex items-center gap-1.5">
                      <Layers size={13} className="text-bronze" /> Estimated Value Band
                    </span>
                    <span className="font-bold text-indigonight">
                      {selectedHub.avgPrice}
                    </span>
                  </div>
                </div>

                {/* Craft Tradition Bio */}
                <div className="bg-white/70 rounded-2xl p-3.5 border border-terracotta/10">
                  <p className="text-[11px] font-bold text-indigonight/70 mb-1">Tradition & Technique:</p>
                  <p className="text-xs text-indigonight/80 leading-relaxed">
                    {selectedHub.description}
                  </p>
                </div>

                {/* Market Intelligence / Trending Reason */}
                <div className="bg-turmeric/10 rounded-2xl p-3.5 border border-turmeric/30">
                  <p className="text-[11px] font-bold text-bronze mb-1 flex items-center gap-1">
                    <Sparkles size={12} /> Live Market Driver:
                  </p>
                  <p className="text-xs text-indigonight/80 leading-relaxed font-medium">
                    "{selectedHub.trendingReason}"
                  </p>
                </div>

                {/* Top Matched Buyers Seeking this Craft */}
                <div>
                  <p className="text-[11px] font-bold text-indigonight/70 mb-2 flex items-center gap-1">
                    <ShoppingBag size={12} className="text-terracotta" /> Major Buyers Procuring This Craft:
                  </p>
                  <div className="flex flex-wrap gap-1.5">
                    {selectedHub.topBuyers.map((buyer, idx) => (
                      <span
                        key={idx}
                        className="text-[11px] bg-terracotta/10 text-terracotta px-2.5 py-1 rounded-full font-medium"
                      >
                        {buyer}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="pt-2 space-y-2">
                  <button
                    onClick={() => go('matching')}
                    className="w-full py-2.5 rounded-full bg-terracotta text-white font-semibold text-xs flex items-center justify-center gap-2 hover:bg-terracotta-dark transition shadow-sm"
                  >
                    Find Bulk Buyers for {selectedHub.name} <ArrowRight size={14} />
                  </button>
                  <button
                    onClick={() => go('marketplace')}
                    className="w-full py-2 rounded-full bg-white text-indigonight/80 font-medium text-xs border border-terracotta/20 hover:bg-terracotta/5 flex items-center justify-center gap-1.5 transition"
                  >
                    View Products from this Cluster
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Comparative Demand Chart */}
      <div className="glass rounded-3xl p-6 border border-terracotta/20 mt-8 shadow-sm">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6">
          <div>
            <h3 className="font-display font-bold text-lg text-indigonight">
              {viewMetric === 'demand' ? 'Comparative Craft Demand Index (0 - 100)' : 'Year-over-Year Growth Rate (%)'}
            </h3>
            <p className="text-xs text-indigonight/60">
              Filtered across {filteredHubs.length} handicraft clusters in {selectedCategory}
            </p>
          </div>

          <div className="flex items-center gap-2 bg-white/70 p-1 rounded-xl border border-terracotta/15">
            <button
              onClick={() => setViewMetric('demand')}
              className={`px-3 py-1 rounded-lg text-xs font-semibold transition ${
                viewMetric === 'demand' 
                  ? 'bg-terracotta text-white shadow-xs' 
                  : 'text-indigonight/70 hover:text-indigonight'
              }`}
            >
              Demand Index
            </button>
            <button
              onClick={() => setViewMetric('growth')}
              className={`px-3 py-1 rounded-lg text-xs font-semibold transition ${
                viewMetric === 'growth' 
                  ? 'bg-terracotta text-white shadow-xs' 
                  : 'text-indigonight/70 hover:text-indigonight'
              }`}
            >
              YoY Growth %
            </button>
          </div>
        </div>

        <div className="w-full h-72">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={filteredHubs} margin={{ top: 10, right: 10, left: -15, bottom: 40 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#BF5B3D" strokeOpacity={0.08} />
              <XAxis 
                dataKey="name" 
                tick={{ fontSize: 10, fill: '#232C4D' }} 
                angle={-35} 
                textAnchor="end" 
                interval={0}
              />
              <YAxis tick={{ fontSize: 10, fill: '#232C4D' }} domain={viewMetric === 'demand' ? [0, 100] : [0, 35]} />
              <Tooltip 
                content={({ active, payload }) => {
                  if (active && payload && payload.length) {
                    const data = payload[0].payload;
                    return (
                      <div className="bg-white p-3 rounded-xl shadow-lg border border-terracotta/20 text-xs">
                        <p className="font-bold text-indigonight">{data.craft}</p>
                        <p className="text-indigonight/60">{data.name}, {data.state}</p>
                        <div className="mt-2 space-y-1">
                          <p className="text-terracotta font-semibold">Demand Index: {data.demand}/100</p>
                          <p className="text-green-600 font-semibold">YoY Growth: +{data.growth}%</p>
                          <p className="text-indigonight/70">Artisans: {data.activeArtisans}</p>
                        </div>
                      </div>
                    );
                  }
                  return null;
                }}
              />
              <Bar 
                dataKey={viewMetric} 
                radius={[6, 6, 0, 0]}
                onClick={(data) => handleSelectHub(data)}
                className="cursor-pointer"
              >
                {filteredHubs.map((entry) => (
                  <Cell 
                    key={`cell-${entry.id}`} 
                    fill={entry.id === selectedHub?.id ? '#BF5B3D' : entry.demand >= 85 ? '#D97757' : '#E8A93C'} 
                  />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* CTA to Government Dashboard */}
      <div className="text-center mt-8">
        <button
          onClick={() => go('gov')}
          className="px-7 py-3 rounded-full bg-terracotta text-white font-semibold inline-flex items-center gap-2 shadow-glow hover:bg-terracotta-dark transition text-sm"
        >
          {t('demandMap.seeGov')} <ArrowRight size={16} />
        </button>
      </div>
    </div>
  );
}