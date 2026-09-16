import React from 'react';
import { motion } from 'framer-motion';
import { Users, Package, ShoppingBag, TrendingUp, Landmark, ArrowRight } from 'lucide-react';
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid, PieChart, Pie, Cell } from 'recharts';
import { ARTISANS, PRODUCTS, ORDERS, MONTHLY_TREND } from '../../demoData.js';
import { useLanguage } from '../i18n/LanguageContext.jsx';

const COLORS = ['#BF5B3D','#E8A93C','#7A1F3D','#232C4D','#8C6A3F'];

export default function GovDashboard({ go }) {
  const { t } = useLanguage();
  const states = [...new Set(ARTISANS.map(a=>a.state))];
  const craftDist = states.map((s) => ({ name: s, value: ARTISANS.filter(a=>a.state===s).length }));

  return (
    <div className="max-w-7xl mx-auto px-4 py-10">
      <div className="text-center mb-8">
        <span className="inline-block px-4 py-1.5 rounded-full bg-indigonight/10 text-indigonight text-sm font-semibold mb-3">
          {t('govDashboard.badge')}
        </span>
        <h2 className="font-display text-3xl md:text-4xl font-extrabold text-indigonight">
          {t('govDashboard.title')}
        </h2>
        <p className="text-xs sm:text-sm text-indigonight/60 mt-2">
          {t('govDashboard.subtitle')}
        </p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        {[
          { icon: Users, label: t('govDashboard.registeredArtisans'), val: ARTISANS.length },
          { icon: Package, label: t('govDashboard.productsCatalogued'), val: PRODUCTS.length },
          { icon: ShoppingBag, label: t('govDashboard.ordersFulfilled'), val: ORDERS.length + 342 },
          { icon: TrendingUp, label: t('govDashboard.incomeUplift'), val: "+38%" },
        ].map((s,i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.08 }}
            className="bg-white rounded-2xl p-5 shadow-sm border border-terracotta/10 text-center hover:shadow-md transition"
          >
            <s.icon className="mx-auto text-terracotta mb-2" size={22} />
            <p className="font-display font-bold text-2xl text-indigonight">{s.val}</p>
            <p className="text-xs text-indigonight/50 font-medium">{s.label}</p>
          </motion.div>
        ))}
      </div>

      <div className="grid lg:grid-cols-3 gap-6 mb-8">
        <div className="lg:col-span-2 glass rounded-3xl p-6 border border-terracotta/20 shadow-sm">
          <h3 className="font-display font-bold mb-4 text-indigonight">
            {t('govDashboard.ordersTrend')}
          </h3>
          <ResponsiveContainer width="100%" height={260}>
            <LineChart data={MONTHLY_TREND}>
              <CartesianGrid strokeDasharray="3 3" stroke="#BF5B3D" strokeOpacity={0.1} />
              <XAxis dataKey="month" tick={{ fontSize: 12 }} />
              <YAxis yAxisId="left" tick={{ fontSize: 11 }} />
              <Tooltip />
              <Line yAxisId="left" type="monotone" dataKey="orders" stroke="#BF5B3D" strokeWidth={3} dot={{ r: 4 }} />
              <Line yAxisId="left" type="monotone" dataKey="income" stroke="#E8A93C" strokeWidth={0} dot={false} />
            </LineChart>
          </ResponsiveContainer>
        </div>
        <div className="glass rounded-3xl p-6 border border-terracotta/20 shadow-sm">
          <h3 className="font-display font-bold mb-4 text-indigonight">
            {t('govDashboard.artisansByState')}
          </h3>
          <ResponsiveContainer width="100%" height={220}>
            <PieChart>
              <Pie data={craftDist} dataKey="value" nameKey="name" innerRadius={45} outerRadius={80} paddingAngle={3}>
                {craftDist.map((_, i) => <Cell key={i} fill={COLORS[i % COLORS.length]} />)}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="glass rounded-3xl p-6 border border-terracotta/20 mb-8 shadow-sm">
        <h3 className="font-display font-bold mb-4 text-indigonight">
          {t('govDashboard.districtCoverage')}
        </h3>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-left text-indigonight/50 border-b border-terracotta/10">
                <th className="pb-2">District</th>
                <th className="pb-2">State</th>
                <th className="pb-2">Craft</th>
                <th className="pb-2">Artisans</th>
                <th className="pb-2">Total Earnings</th>
              </tr>
            </thead>
            <tbody>
              {ARTISANS.map(a => (
                <tr key={a.id} className="border-b border-terracotta/5 hover:bg-terracotta/5 transition">
                  <td className="py-2 font-medium text-indigonight">{a.district}</td>
                  <td className="py-2 text-indigonight/60">{a.state}</td>
                  <td className="py-2 text-indigonight/60">{a.craft}</td>
                  <td className="py-2">1</td>
                  <td className="py-2 font-semibold text-terracotta">₹{a.earnings.toLocaleString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="bg-gradient-to-br from-indigonight to-madder rounded-3xl p-8 text-white shadow-md">
        <div className="flex items-center gap-2 mb-3">
          <Landmark size={20} className="text-turmeric" />
          <h3 className="font-display font-bold text-lg">{t('govDashboard.aiPolicy')}</h3>
        </div>
        <ul className="space-y-2 text-sm text-white/85 list-disc list-inside">
          <li>Bamboo Craft (Tripura) shows highest YoY growth (+31%) — recommend priority PM Vishwakarma outreach.</li>
          <li>Dhokra Metal Casting (Bastar) has strong export interest but low digital footprint — deploy facilitator kiosks.</li>
          <li>Chikankari (Lucknow) demand exceeds current artisan capacity — potential for skill-training expansion.</li>
        </ul>
      </div>

      <div className="text-center mt-8">
        <button
          onClick={() => go('landing')}
          className="px-7 py-3 rounded-full bg-terracotta text-white font-semibold inline-flex items-center gap-2 shadow-glow hover:bg-terracotta-dark transition text-sm"
        >
          {t('govDashboard.backHome')} <ArrowRight size={16} />
        </button>
      </div>
    </div>
  );
}