import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Package, ShoppingBag, IndianRupee, Layers, Users, CheckCircle2,
  Clock, Truck, ShieldCheck, Plus, Minus, ArrowRight, Eye, Trash2,
  Camera, RefreshCw, Star, AlertCircle, ChevronDown, Check,
  Send, ExternalLink, Calendar, Building2, Store, PlusCircle, X
} from 'lucide-react';
import { ARTISANS } from '../../demoData.js';
import { useLanguage } from '../i18n/LanguageContext.jsx';
import {
  fetchArtisanBusinessData,
  addArtisanProduct,
  updateProductStock,
  deleteArtisanProduct,
  updateOrderStatus
} from '../api/client.js';

// Sample craft images for quick selection in the Add Product modal
const CRAFT_SAMPLE_IMAGES = [
  { label: 'Silk Saree', url: 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=800&q=80' },
  { label: 'Terracotta Urn', url: 'https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?auto=format&fit=crop&w=800&q=80' },
  { label: 'Folk Painting', url: 'https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?auto=format&fit=crop&w=800&q=80' },
  { label: 'Wooden Toy', url: 'https://images.unsplash.com/photo-1596461404969-9ae70f2830c1?auto=format&fit=crop&w=800&q=80' },
  { label: 'Bamboo Basket', url: 'https://images.unsplash.com/photo-1513519245088-0e12902e5a38?auto=format&fit=crop&w=800&q=80' },
  { label: 'Blue Pottery', url: 'https://images.unsplash.com/photo-1612196808214-b8e1d6145a8c?auto=format&fit=crop&w=800&q=80' }
];

export default function ArtisanMode({ go }) {
  const { lang, setLang, t, languages } = useLanguage();
  const [activeArtisanId, setActiveArtisanId] = useState(1);
  const [loading, setLoading] = useState(true);

  // Business Data State
  const [artisanProfile, setArtisanProfile] = useState(ARTISANS[0]);
  const [products, setProducts] = useState([]);
  const [orders, setOrders] = useState([]);
  const [metrics, setMetrics] = useState({
    totalProducts: 0,
    totalOrders: 0,
    totalEarnings: 0,
    totalRevenue: 0,
    pendingOrdersCount: 0,
    customersCount: 0,
    middlemanSaved: 0,
    dbtStatus: 'Active (SBI A/C ••••4920)'
  });

  // Add Product Modal State (Clean, non-voice form)
  const [showAddModal, setShowAddModal] = useState(false);
  const [newTitle, setNewTitle] = useState('');
  const [newCraft, setNewCraft] = useState('');
  const [newMaterial, setNewMaterial] = useState('');
  const [newPrice, setNewPrice] = useState('');
  const [newStock, setNewStock] = useState('4');
  const [newDescription, setNewDescription] = useState('');
  const [selectedPhoto, setSelectedPhoto] = useState(CRAFT_SAMPLE_IMAGES[0].url);
  const [publishSuccess, setPublishSuccess] = useState(false);

  // Load artisan dataset from persistent store
  const loadData = async (artisanId) => {
    setLoading(true);
    try {
      const data = await fetchArtisanBusinessData(artisanId);
      if (data) {
        setArtisanProfile(data.artisan || ARTISANS[0]);
        setProducts(data.products || []);
        setOrders(data.orders || []);
        setMetrics(data.metrics || {});
      }
    } catch (e) {
      console.error('Error loading artisan data:', e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData(activeArtisanId);
  }, [activeArtisanId]);

  // Handle Artisan Profile Switch
  const handleSwitchArtisan = (id) => {
    setActiveArtisanId(id);
  };

  // Handle Manual Product Creation
  const handleCreateProduct = async (e) => {
    e.preventDefault();
    const priceNum = parseInt(newPrice) || 4500;
    const stockNum = parseInt(newStock) || 4;

    const newProd = {
      id: Date.now(),
      artisanId: activeArtisanId,
      name: newTitle || `${artisanProfile.craft} Masterpiece`,
      craft: newCraft || artisanProfile.craft,
      material: newMaterial || 'Authentic Natural Handloom Materials',
      price: priceNum,
      stockCount: stockNum,
      soldCount: 0,
      description: newDescription || `Handcrafted with traditional ancestral techniques by master artisan ${artisanProfile.name}.`,
      image: selectedPhoto || CRAFT_SAMPLE_IMAGES[0].url,
      giCertified: true,
      giStatus: 'GI Certified Protected Handcraft',
      status: 'In Stock',
      createdAt: new Date().toISOString()
    };

    setPublishSuccess(true);
    await addArtisanProduct(activeArtisanId, newProd);
    await loadData(activeArtisanId);

    setTimeout(() => {
      setPublishSuccess(false);
      setShowAddModal(false);
      setNewTitle('');
      setNewCraft('');
      setNewPrice('');
      setNewMaterial('');
      setNewDescription('');
    }, 1200);
  };

  // Stock Increment / Decrement
  const handleStockChange = async (productId, delta) => {
    await updateProductStock(activeArtisanId, productId, delta);
    await loadData(activeArtisanId);
  };

  // Remove Product
  const handleDeleteProduct = async (productId) => {
    if (window.confirm('Are you sure you want to remove this craft listing from your catalog?')) {
      await deleteArtisanProduct(activeArtisanId, productId);
      await loadData(activeArtisanId);
    }
  };

  // Update Order Delivery Status
  const handleOrderStatusToggle = async (orderId, currentStatus) => {
    const nextStatus =
      currentStatus === 'Processing'
        ? 'In Transit'
        : currentStatus === 'In Transit'
        ? 'Delivered'
        : 'Processing';

    await updateOrderStatus(activeArtisanId, orderId, nextStatus);
    await loadData(activeArtisanId);
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-6 sm:py-8 space-y-8">
      {/* 1. ARTISAN PROFILE & QUICK SWITCHER BAR */}
      <div className="bg-gradient-to-br from-madder via-terracotta to-indigonight rounded-3xl p-6 sm:p-8 text-white relative overflow-hidden shadow-xl">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 relative z-10">
          {/* Artisan Details */}
          <div className="flex items-start sm:items-center gap-4">
            <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-white/15 backdrop-blur-md border border-white/25 flex items-center justify-center text-3xl sm:text-4xl shadow-inner flex-shrink-0">
              {artisanProfile.avatar || '🧵'}
            </div>
            <div>
              <div className="flex flex-wrap items-center gap-2">
                <span className="bg-turmeric text-indigonight text-[10px] font-black px-2.5 py-0.5 rounded-full uppercase tracking-wider shadow-xs">
                  Verified Master Artisan
                </span>
                <span className="bg-white/20 text-white text-[10px] font-bold px-2.5 py-0.5 rounded-full">
                  ID: GI-IND-{artisanProfile.id}094
                </span>
              </div>
              <h2 className="font-display text-2xl sm:text-3xl font-extrabold mt-1">
                {artisanProfile.name}
              </h2>
              <p className="text-white/85 text-xs sm:text-sm font-medium">
                {artisanProfile.craft} • {artisanProfile.district}, {artisanProfile.state}
              </p>
              <div className="flex flex-wrap items-center gap-3 mt-2 text-xs">
                <span className="flex items-center gap-1 text-turmeric font-bold">
                  <Star size={14} fill="currentColor" /> {artisanProfile.rating || 4.9} Rating
                </span>
                <span className="text-white/60">•</span>
                <span className="text-white/90 font-medium">
                  {artisanProfile.exp || 20} Years Experience
                </span>
                <span className="text-white/60">•</span>
                <span className="text-green-300 font-semibold flex items-center gap-1">
                  <CheckCircle2 size={13} /> Aadhaar DBT Linked (SBI)
                </span>
              </div>
            </div>
          </div>

          {/* Switch Artisan Profile */}
          <div className="flex flex-col items-start lg:items-end gap-2">
            <span className="text-[11px] text-white/75 font-bold uppercase tracking-wider">
              Switch Artisan Profile:
            </span>
            <div className="flex flex-wrap gap-1.5">
              {ARTISANS.slice(0, 5).map((art) => (
                <button
                  key={art.id}
                  onClick={() => handleSwitchArtisan(art.id)}
                  className={`px-3 py-1.5 rounded-full text-xs font-bold transition flex items-center gap-1.5 border ${
                    activeArtisanId === art.id
                      ? 'bg-turmeric text-indigonight border-turmeric shadow-md scale-105'
                      : 'bg-white/15 text-white border-white/20 hover:bg-white/25'
                  }`}
                >
                  <span>{art.avatar}</span>
                  <span>{art.name.split(' ')[0]}</span>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* 2. SIMPLE VISUAL BUSINESS OVERVIEW (TOTAL PRODUCTS, ORDERS, EARNINGS, PENDING, CUSTOMERS) */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="font-display font-black text-xl sm:text-2xl text-indigonight">
              Artisan Business Overview
            </h3>
            <p className="text-xs text-indigonight/60">
              Live metrics calculated directly from verified orders and inventory
            </p>
          </div>
          <button
            onClick={() => setShowAddModal(true)}
            className="px-5 py-2.5 rounded-full bg-terracotta text-white font-bold text-xs flex items-center gap-2 shadow-sm hover:bg-terracotta-dark transition"
          >
            <Plus size={16} /> Add New Craft Product
          </button>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-5 gap-3.5">
          {/* Total Products */}
          <div className="bg-white rounded-3xl p-5 border border-terracotta/20 shadow-sm flex flex-col justify-between">
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-bold text-indigonight/50 uppercase tracking-wider">
                Total Products
              </span>
              <div className="w-8 h-8 rounded-xl bg-terracotta/10 text-terracotta flex items-center justify-center">
                <Package size={16} />
              </div>
            </div>
            <p className="font-display font-black text-3xl text-indigonight mt-2">
              {metrics.totalProducts}
            </p>
            <p className="text-[11px] text-indigonight/60 mt-1 font-medium">Active listings</p>
          </div>

          {/* Total Orders */}
          <div className="bg-white rounded-3xl p-5 border border-terracotta/20 shadow-sm flex flex-col justify-between">
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-bold text-indigonight/50 uppercase tracking-wider">
                Total Orders
              </span>
              <div className="w-8 h-8 rounded-xl bg-blue-100 text-blue-700 flex items-center justify-center">
                <ShoppingBag size={16} />
              </div>
            </div>
            <p className="font-display font-black text-3xl text-blue-800 mt-2">
              {metrics.totalOrders}
            </p>
            <p className="text-[11px] text-blue-700/80 mt-1 font-medium">Received from buyers</p>
          </div>

          {/* Total Earnings */}
          <div className="bg-gradient-to-br from-terracotta to-turmeric text-white rounded-3xl p-5 shadow-md flex flex-col justify-between col-span-2 sm:col-span-1">
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-bold text-white/80 uppercase tracking-wider">
                Total Earnings
              </span>
              <div className="w-8 h-8 rounded-xl bg-white/20 text-white flex items-center justify-center">
                <IndianRupee size={16} />
              </div>
            </div>
            <p className="font-display font-black text-2xl sm:text-3xl text-white mt-2">
              ₹{metrics.totalEarnings.toLocaleString()}
            </p>
            <p className="text-[11px] text-white/90 mt-1 font-medium">Completed payouts</p>
          </div>

          {/* Pending Orders */}
          <div className="bg-white rounded-3xl p-5 border border-terracotta/20 shadow-sm flex flex-col justify-between">
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-bold text-indigonight/50 uppercase tracking-wider">
                Pending Orders
              </span>
              <div className="w-8 h-8 rounded-xl bg-amber-100 text-amber-800 flex items-center justify-center">
                <Clock size={16} />
              </div>
            </div>
            <p className="font-display font-black text-3xl text-amber-700 mt-2">
              {metrics.pendingOrdersCount}
            </p>
            <p className="text-[11px] text-amber-800/80 mt-1 font-medium">Processing / In Transit</p>
          </div>

          {/* Customers / Buyers */}
          <div className="bg-white rounded-3xl p-5 border border-terracotta/20 shadow-sm flex flex-col justify-between">
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-bold text-indigonight/50 uppercase tracking-wider">
                Customers
              </span>
              <div className="w-8 h-8 rounded-xl bg-purple-100 text-purple-700 flex items-center justify-center">
                <Users size={16} />
              </div>
            </div>
            <p className="font-display font-black text-3xl text-purple-800 mt-2">
              {metrics.customersCount}
            </p>
            <p className="text-[11px] text-purple-700/80 mt-1 font-medium">Wholesale boutiques</p>
          </div>
        </div>

        {/* Bank & Middlemen Savings Ribbon */}
        <div className="grid sm:grid-cols-2 gap-3.5">
          <div className="p-4 rounded-2xl bg-green-50 border border-green-200 flex items-center justify-between text-xs">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-green-600 text-white flex items-center justify-center font-bold">
                ✓
              </div>
              <div>
                <p className="font-bold text-green-950">Aadhaar DBT Direct Deposit Active</p>
                <p className="text-[11px] text-green-800">State Bank of India (••••4920) • Auto-settled in 24h</p>
              </div>
            </div>
            <span className="font-bold text-green-900 bg-green-200/60 px-2.5 py-1 rounded-full">
              Verified
            </span>
          </div>

          <div className="p-4 rounded-2xl bg-sand/60 border border-terracotta/15 flex items-center justify-between text-xs">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-terracotta/10 text-terracotta flex items-center justify-center font-bold">
                <ShieldCheck size={20} />
              </div>
              <div>
                <p className="font-bold text-indigonight">Middlemen Commission Saved</p>
                <p className="text-[11px] text-terracotta font-bold">₹{metrics.middlemanSaved.toLocaleString()} (100% direct artisan value)</p>
              </div>
            </div>
            <span className="font-bold text-terracotta bg-terracotta/10 px-2.5 py-1 rounded-full">
              0% Fee
            </span>
          </div>
        </div>
      </div>

      {/* 3. MY PRODUCTS SECTION */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-terracotta/20 shadow-sm space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <h3 className="font-display font-black text-xl sm:text-2xl text-indigonight">
              My Products & Inventory
            </h3>
            <p className="text-xs text-indigonight/60 mt-0.5">
              Real-time craft inventory currently active on the national marketplace
            </p>
          </div>
          <button
            onClick={() => setShowAddModal(true)}
            className="px-4 py-2 rounded-full bg-terracotta/10 text-terracotta font-bold text-xs hover:bg-terracotta/20 transition flex items-center gap-1.5 self-start sm:self-auto"
          >
            <Plus size={15} /> Add New Craft Listing
          </button>
        </div>

        {/* Product Cards Grid */}
        {products.length === 0 ? (
          <div className="p-12 text-center rounded-2xl bg-sand/30 border border-dashed border-terracotta/30">
            <Package size={44} className="mx-auto text-terracotta/40 mb-3" />
            <h4 className="font-display font-bold text-lg text-indigonight">No Products Listed Yet</h4>
            <p className="text-xs text-indigonight/60 max-w-sm mx-auto mt-1">
              Add your first handcrafted masterpiece to publish your catalog to verified buyers nationwide.
            </p>
            <button
              onClick={() => setShowAddModal(true)}
              className="mt-4 px-6 py-2.5 rounded-full bg-terracotta text-white text-xs font-bold shadow-sm hover:bg-terracotta-dark transition inline-flex items-center gap-1.5"
            >
              <Plus size={15} /> Add First Product
            </button>
          </div>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {products.map((p) => {
              const stock = p.stockCount ?? 4;
              const isLow = stock <= 2 && stock > 0;
              const isOut = stock === 0;

              return (
                <div
                  key={p.id}
                  className="rounded-3xl border border-terracotta/15 overflow-hidden bg-white hover:shadow-md transition flex flex-col justify-between group"
                >
                  {/* Photo & Badge */}
                  <div className="relative h-48 bg-sand overflow-hidden">
                    <img
                      src={p.image}
                      alt={p.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition duration-300"
                    />
                    <div className="absolute top-3 left-3">
                      <span className="text-[10px] font-bold px-2.5 py-1 rounded-full bg-black/60 text-white backdrop-blur-xs">
                        {p.craft || artisanProfile.craft}
                      </span>
                    </div>
                    <div className="absolute top-3 right-3">
                      <span
                        className={`text-[10px] font-bold px-2.5 py-1 rounded-full shadow-xs ${
                          isOut
                            ? 'bg-red-500 text-white'
                            : isLow
                            ? 'bg-amber-500 text-white'
                            : 'bg-green-600 text-white'
                        }`}
                      >
                        {isOut ? 'Out of Stock' : isLow ? `Low Stock (${stock})` : `In Stock (${stock})`}
                      </span>
                    </div>
                  </div>

                  {/* Body Content */}
                  <div className="p-5 flex-1 flex flex-col justify-between space-y-3">
                    <div>
                      <h4 className="font-display font-bold text-base text-indigonight line-clamp-1">
                        {p.name}
                      </h4>
                      <p className="text-xs text-indigonight/60 mt-0.5 line-clamp-1">
                        {p.material || 'Authentic Handloom Materials'}
                      </p>
                      <p className="font-display font-black text-xl text-terracotta mt-2">
                        ₹{(p.price || 0).toLocaleString()}
                      </p>
                    </div>

                    {/* Stock Adjustment Controls */}
                    <div className="pt-3 border-t border-terracotta/10 flex items-center justify-between">
                      <div className="flex items-center gap-1.5">
                        <span className="text-[11px] font-bold text-indigonight/60 mr-1">Stock:</span>
                        <button
                          onClick={() => handleStockChange(p.id, -1)}
                          disabled={stock === 0}
                          className="w-7 h-7 rounded-lg bg-sand/70 hover:bg-sand text-indigonight/70 flex items-center justify-center disabled:opacity-30 transition"
                          title="Decrease Stock"
                        >
                          <Minus size={14} />
                        </button>
                        <span className="font-bold text-xs min-w-[24px] text-center">{stock}</span>
                        <button
                          onClick={() => handleStockChange(p.id, 1)}
                          className="w-7 h-7 rounded-lg bg-sand/70 hover:bg-sand text-indigonight/70 flex items-center justify-center transition"
                          title="Increase Stock"
                        >
                          <Plus size={14} />
                        </button>
                      </div>

                      <div className="flex items-center gap-1">
                        <button
                          onClick={() => go('marketplace')}
                          className="p-1.5 rounded-lg bg-terracotta/10 hover:bg-terracotta/20 text-terracotta text-xs transition"
                          title="View on Public Marketplace"
                        >
                          <Eye size={14} />
                        </button>
                        <button
                          onClick={() => handleDeleteProduct(p.id)}
                          className="p-1.5 rounded-lg bg-red-50 hover:bg-red-100 text-red-600 text-xs transition"
                          title="Delete Listing"
                        >
                          <Trash2 size={14} />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* 4. RECENT ORDERS & FULFILLMENT SECTION */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-terracotta/20 shadow-sm space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div>
            <h3 className="font-display font-black text-xl sm:text-2xl text-indigonight">
              Recent Buyer Orders
            </h3>
            <p className="text-xs text-indigonight/60 mt-0.5">
              Verified orders placed by boutiques, exporters and retail buyers
            </p>
          </div>
          <span className="text-xs text-indigonight/50 font-medium">
            Tap status badge to update fulfillment stage
          </span>
        </div>

        {orders.length === 0 ? (
          <div className="p-10 text-center rounded-2xl bg-sand/30 border border-dashed border-terracotta/30">
            <ShoppingBag size={40} className="mx-auto text-terracotta/40 mb-2" />
            <h4 className="font-display font-bold text-base text-indigonight">No Orders Placed Yet</h4>
            <p className="text-xs text-indigonight/60">
              New wholesale buyer orders will appear here automatically as buyers browse the marketplace.
            </p>
          </div>
        ) : (
          <div className="space-y-3">
            {orders.map((ord) => {
              const isDelivered = ord.status === 'Delivered';
              const isInTransit = ord.status === 'In Transit';

              return (
                <div
                  key={ord.id}
                  className="p-4 sm:p-5 rounded-2xl bg-sand/30 border border-terracotta/15 flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:bg-sand/50 transition"
                >
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-black text-terracotta">{ord.id}</span>
                      <span className="text-xs text-indigonight/40">•</span>
                      <span className="text-xs text-indigonight/60 flex items-center gap-1">
                        <Calendar size={12} /> {ord.date || 'Recent'}
                      </span>
                    </div>
                    <p className="font-display font-bold text-sm sm:text-base text-indigonight">
                      {ord.product}
                    </p>
                    <p className="text-xs text-indigonight/70 flex items-center gap-1">
                      <Building2 size={12} className="text-terracotta" />
                      {ord.buyer}
                    </p>
                  </div>

                  <div className="flex items-center justify-between sm:justify-end gap-4">
                    <div className="text-left sm:text-right">
                      <p className="font-display font-black text-lg text-indigonight">
                        ₹{(ord.amount || 0).toLocaleString()}
                      </p>
                      <p className="text-[10px] text-green-700 font-semibold">
                        {ord.paymentMode || 'Aadhaar DBT Direct'}
                      </p>
                    </div>

                    {/* Interactive Delivery Status Button */}
                    <button
                      onClick={() => handleOrderStatusToggle(ord.id, ord.status)}
                      className={`px-4 py-2 rounded-xl text-xs font-bold transition flex items-center gap-1.5 shadow-xs ${
                        isDelivered
                          ? 'bg-green-600 text-white hover:bg-green-700'
                          : isInTransit
                          ? 'bg-blue-600 text-white hover:bg-blue-700'
                          : 'bg-amber-500 text-white hover:bg-amber-600'
                      }`}
                      title="Tap to update delivery stage"
                    >
                      {isDelivered ? (
                        <>
                          <CheckCircle2 size={14} /> Delivered
                        </>
                      ) : isInTransit ? (
                        <>
                          <Truck size={14} /> In Transit
                        </>
                      ) : (
                        <>
                          <Clock size={14} /> Processing
                        </>
                      )}
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* 5. COMPLETED ORDER EARNINGS OVER TIME SECTION */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-terracotta/20 shadow-sm space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div>
            <h3 className="font-display font-black text-xl sm:text-2xl text-indigonight">
              Completed Earnings & Direct Bank Disbursements
            </h3>
            <p className="text-xs text-indigonight/60 mt-0.5">
              Verified payouts deposited directly to your Aadhaar-linked State Bank of India account
            </p>
          </div>
          <div className="text-right">
            <span className="font-display font-black text-2xl text-green-700">
              ₹{metrics.totalEarnings.toLocaleString()}
            </span>
            <p className="text-[10px] text-green-800/80 font-bold uppercase tracking-wider">
              Total Settled Earnings
            </p>
          </div>
        </div>

        {metrics.totalEarnings === 0 ? (
          <div className="p-8 text-center rounded-2xl bg-sand/20 border border-terracotta/15">
            <p className="text-xs text-indigonight/60">
              When buyer orders reach "Delivered" status, your completed earnings will be calculated and displayed here in real time.
            </p>
          </div>
        ) : (
          <div className="grid sm:grid-cols-3 gap-4">
            <div className="p-4 rounded-2xl bg-sand/40 border border-terracotta/15">
              <span className="text-[10px] font-bold text-indigonight/50 uppercase tracking-wider">
                Average Order Value
              </span>
              <p className="font-display font-black text-2xl text-indigonight mt-1">
                ₹
                {metrics.totalOrders > 0
                  ? Math.round(metrics.totalRevenue / metrics.totalOrders).toLocaleString()
                  : 0}
              </p>
              <p className="text-[11px] text-indigonight/60 mt-0.5">Across all wholesale contracts</p>
            </div>

            <div className="p-4 rounded-2xl bg-sand/40 border border-terracotta/15">
              <span className="text-[10px] font-bold text-indigonight/50 uppercase tracking-wider">
                Platform Cut
              </span>
              <p className="font-display font-black text-2xl text-green-700 mt-1">
                ₹0 (0%)
              </p>
              <p className="text-[11px] text-green-800 mt-0.5">Zero platform fee for registered artisans</p>
            </div>

            <div className="p-4 rounded-2xl bg-sand/40 border border-terracotta/15">
              <span className="text-[10px] font-bold text-indigonight/50 uppercase tracking-wider">
                Direct DBT Settlement
              </span>
              <p className="font-display font-black text-lg text-indigonight mt-1 truncate">
                State Bank of India
              </p>
              <p className="text-[11px] text-indigonight/60 mt-0.5">A/C ••••4920 (Aadhaar Verified)</p>
            </div>
          </div>
        )}

        <div className="p-4 rounded-2xl bg-gradient-to-r from-terracotta/10 via-turmeric/15 to-terracotta/10 border border-terracotta/20 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
          <div className="flex items-center gap-2">
            <Store size={18} className="text-terracotta" />
            <span className="font-semibold text-indigonight">
              Ready to find more buyers or showcase new crafts?
            </span>
          </div>
          <div className="flex gap-2">
            <button
              onClick={() => go('marketplace')}
              className="px-4 py-2 rounded-full bg-white text-terracotta font-bold border border-terracotta/20 hover:bg-terracotta/5 transition"
            >
              View Public Marketplace
            </button>
            <button
              onClick={() => go('matching')}
              className="px-4 py-2 rounded-full bg-terracotta text-white font-bold hover:bg-terracotta-dark transition shadow-xs"
            >
              Match Wholesale Buyers
            </button>
          </div>
        </div>
      </div>

      {/* MODAL: ADD CRAFT PRODUCT */}
      <AnimatePresence>
        {showAddModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs">
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="bg-white rounded-3xl p-6 sm:p-8 max-w-lg w-full border border-terracotta/20 shadow-2xl relative max-h-[90vh] overflow-y-auto"
            >
              <button
                onClick={() => setShowAddModal(false)}
                className="absolute top-5 right-5 w-8 h-8 rounded-full bg-sand/60 hover:bg-sand text-indigonight/60 flex items-center justify-center transition"
              >
                <X size={16} />
              </button>

              <div className="flex items-center gap-2 text-terracotta mb-1">
                <Package size={20} />
                <span className="text-xs font-bold uppercase tracking-wider">Catalog Inventory</span>
              </div>
              <h3 className="font-display font-bold text-2xl text-indigonight">
                Add New Craft Listing
              </h3>
              <p className="text-xs text-indigonight/60 mb-5">
                Register a handmade creation to your active catalog.
              </p>

              <form onSubmit={handleCreateProduct} className="space-y-4">
                <div>
                  <label className="block text-xs font-bold text-indigonight/70 mb-1">Product Title</label>
                  <input
                    type="text"
                    required
                    value={newTitle}
                    onChange={(e) => setNewTitle(e.target.value)}
                    placeholder="e.g. Handwoven Contrast Silk Saree"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-terracotta/20 text-xs text-indigonight outline-none focus:border-terracotta bg-ivory/30"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-bold text-indigonight/70 mb-1">Craft Tradition</label>
                    <input
                      type="text"
                      value={newCraft}
                      onChange={(e) => setNewCraft(e.target.value)}
                      placeholder={`e.g. ${artisanProfile.craft}`}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-terracotta/20 text-xs text-indigonight outline-none focus:border-terracotta bg-ivory/30"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-indigonight/70 mb-1">Price (₹)</label>
                    <input
                      type="number"
                      required
                      value={newPrice}
                      onChange={(e) => setNewPrice(e.target.value)}
                      placeholder="e.g. 14500"
                      className="w-full px-3.5 py-2.5 rounded-xl border border-terracotta/20 text-xs text-indigonight outline-none focus:border-terracotta bg-ivory/30"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-bold text-indigonight/70 mb-1">Initial Stock (Units)</label>
                    <input
                      type="number"
                      required
                      value={newStock}
                      onChange={(e) => setNewStock(e.target.value)}
                      placeholder="e.g. 4"
                      className="w-full px-3.5 py-2.5 rounded-xl border border-terracotta/20 text-xs text-indigonight outline-none focus:border-terracotta bg-ivory/30"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-indigonight/70 mb-1">Raw Materials</label>
                    <input
                      type="text"
                      value={newMaterial}
                      onChange={(e) => setNewMaterial(e.target.value)}
                      placeholder="e.g. Mulberry Silk, Zari"
                      className="w-full px-3.5 py-2.5 rounded-xl border border-terracotta/20 text-xs text-indigonight outline-none focus:border-terracotta bg-ivory/30"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-indigonight/70 mb-1">Short Description / Craft Story</label>
                  <textarea
                    rows={2}
                    value={newDescription}
                    onChange={(e) => setNewDescription(e.target.value)}
                    placeholder="Describe how it is handcrafted, techniques used, and heritage significance..."
                    className="w-full px-3.5 py-2.5 rounded-xl border border-terracotta/20 text-xs text-indigonight outline-none focus:border-terracotta bg-ivory/30 resize-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-indigonight/70 mb-1.5">Select Sample Photo</label>
                  <div className="grid grid-cols-3 gap-2">
                    {CRAFT_SAMPLE_IMAGES.map((img, idx) => (
                      <button
                        key={idx}
                        type="button"
                        onClick={() => setSelectedPhoto(img.url)}
                        className={`h-16 rounded-xl overflow-hidden border-2 transition ${
                          selectedPhoto === img.url
                            ? 'border-terracotta ring-2 ring-terracotta/30 scale-102'
                            : 'border-transparent opacity-70 hover:opacity-100'
                        }`}
                      >
                        <img src={img.url} alt={img.label} className="w-full h-full object-cover" />
                      </button>
                    ))}
                  </div>
                </div>

                <div className="pt-2 flex gap-2">
                  <button
                    type="button"
                    onClick={() => setShowAddModal(false)}
                    className="flex-1 py-3 rounded-full border border-terracotta/20 text-indigonight text-xs font-bold hover:bg-sand/40 transition"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={publishSuccess}
                    className="flex-1 py-3 rounded-full bg-terracotta text-white text-xs font-bold hover:bg-terracotta-dark transition shadow-md flex items-center justify-center gap-1.5"
                  >
                    {publishSuccess ? (
                      <>
                        <Check size={16} /> Saved!
                      </>
                    ) : (
                      <>
                        <Plus size={16} /> Save & Publish
                      </>
                    )}
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}