import React, { useState, useEffect, useMemo } from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, CartesianGrid, LineChart, Line } from 'recharts';

// --- Icons ---
const Icons = {
  Check: () => <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" /></svg>,
  User: () => <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg>,
  X: () => <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>,
  IdCard: () => <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V8a2 2 0 00-2-2h-5m-4 0V5a2 2 0 114 0v1m-4 0a2 2 0 104 0m-5 8a2 2 0 100-4 2 2 0 000 4zm0 0c1.306 0 2.417.835 2.83 2M9 14a3.001 3.001 0 00-2.83 2M15 11h3m-3 4h2" /></svg>,
  Dollar: () => <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>,
  Gift: () => <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v13m0-13V6a2 2 0 112 2h-2zm0 0V5.5A2.5 2.5 0 109.5 8H12zm-7 4h14M5 12a2 2 0 110-4h14a2 2 0 110 4M5 12v7a2 2 0 002 2h10a2 2 0 002-2v-7" /></svg>,
  Chart: () => <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" /></svg>,
  Database: () => <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4m0 5c0 2.21-3.582 4-8 4s-8-1.79-8-4" /></svg>,
  Save: () => <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-3m-1 4l-3 3m0 0l-3-3m3 3V4" /></svg>,
  Upload: () => <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" /></svg>,
  Download: () => <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" /></svg>,
  ListView: () => <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" /></svg>,
  CardView: () => <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" /></svg>,
  Beaker: () => <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" /></svg>,
  History: () => <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>,
  Plus: () => <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" /></svg>,
  Minus: () => <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" /></svg>,
  Trash: () => <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>,
  Edit: () => <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" /></svg>,
  Banknote: () => <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" /></svg>,
  CreditCard: () => <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" /></svg>,
  Wallet: () => <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M3 14h18m-9-4v8m-7 0h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" /></svg>,
  Settings: () => <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /></svg>,
  Cart: () => <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" /></svg>,
  AlertTriangle: () => <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" /></svg>,
  Photo: () => <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>,
  Link: () => <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" /></svg>,
  Cloud: () => <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z" /></svg>,
  Key: () => <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z" /></svg>,
  Refresh: () => <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" /></svg>
};

// --- Themes & Constants ---
const STYLIST_THEMES = {
  'Man': { hex: '#6D3A14', light: '#6D3A1415', shadow: 'rgba(109, 58, 20, 0.3)' },
  'Becky': { hex: '#9F3E3E', light: '#9F3E3E15', shadow: 'rgba(159, 62, 62, 0.3)' },
  'Sammy': { hex: '#2C496A', light: '#2C496A15', shadow: 'rgba(44, 73, 106, 0.3)' },
  'Others': { hex: '#595959', light: '#59595915', shadow: 'rgba(89, 89, 89, 0.3)' }
};

const CHART_COLORS = ['#6D3A14', '#9F3E3E', '#2C496A', '#C4A485', '#595959'];
const chemicalKeywords = ['電', '染', '漂', 'Keratin', 'Perm', 'Color', 'Highlight', 'Touch', 'Bleach'];
const scalpNotes = ['正常', '偏油性', '偏乾性', '敏感性頭皮', '髮質偏幼細', '嚴重受損髮質', '抗拒染膏'];
const stylists = ['Man', 'Becky', 'Sammy', 'Others'];
const paymentMethods = [
  { id: 'Cash', label: 'Cash', icon: Icons.Banknote },
  { id: 'Credit Card', label: 'Credit', icon: Icons.CreditCard },
  { id: 'Others', label: 'Others', icon: Icons.Wallet }
];
const defaultServices = ['剪髮 (Cut)', '洗吹 (Wash & Blow)', '電髮 (Perm)', '全頭染髮 (Color)', '髮根補染 (Root Touch)', '漂髮 (Bleach)', '挑染 (Highlights)', '角蛋白護理 (Keratin)', '頭皮理療 (Treatment)'];

// Audio Feedback System
let audioCtx = null;
const playAudioFeedback = (type) => {
  try {
    if (!window.AudioContext && !window.webkitAudioContext) return;
    if (!audioCtx) audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    if (audioCtx.state === 'suspended') audioCtx.resume();
    
    const osc = audioCtx.createOscillator();
    const gain = audioCtx.createGain();
    
    osc.connect(gain);
    gain.connect(audioCtx.destination);
    
    if (type === 'click') {
      osc.type = 'sine';
      osc.frequency.setValueAtTime(800, audioCtx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(300, audioCtx.currentTime + 0.05);
      gain.gain.setValueAtTime(0.05, audioCtx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 0.05);
      osc.start(audioCtx.currentTime);
      osc.stop(audioCtx.currentTime + 0.05);
    } else if (type === 'success') {
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(440, audioCtx.currentTime); 
      osc.frequency.setValueAtTime(554.37, audioCtx.currentTime + 0.1); 
      osc.frequency.setValueAtTime(659.25, audioCtx.currentTime + 0.2); 
      gain.gain.setValueAtTime(0.1, audioCtx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 0.6);
      osc.start(audioCtx.currentTime);
      osc.stop(audioCtx.currentTime + 0.6);
    } else if (type === 'warn') {
      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(300, audioCtx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(100, audioCtx.currentTime + 0.2);
      gain.gain.setValueAtTime(0.1, audioCtx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 0.2);
      osc.start(audioCtx.currentTime);
      osc.stop(audioCtx.currentTime + 0.2);
    }
  } catch (e) {
    console.warn('Audio feedback failed');
  }
};

export default function App() {
  const [activeTab, setActiveTab] = useState('checkout'); 
  const [crmViewMode, setCrmViewMode] = useState('cards'); 
  const [crmSortBy, setCrmSortBy] = useState('latestVisit'); 
  const [crmSearchQuery, setCrmSearchQuery] = useState(''); 
  const [expandedHistory, setExpandedHistory] = useState({});
  const [showNotes, setShowNotes] = useState(false);
  const [showRetail, setShowRetail] = useState(false);
  const [showEmailField, setShowEmailField] = useState(false);
  const [notification, setNotification] = useState(null);

  // Data Hub State
  const [importMode, setImportMode] = useState('csv_paste'); 
  const [importInput, setImportInput] = useState('');
  
  // Modals State
  const [deleteConfirm, setDeleteConfirm] = useState(null); 
  const [editModal, setEditModal] = useState(null); 
  const [profileAddModal, setProfileAddModal] = useState(false);
  const [profileEditData, setProfileEditData] = useState(null);
  const [clientDeleteConfirm, setClientDeleteConfirm] = useState(null);
  const [showServicesConfig, setShowServicesConfig] = useState(false);
  const [showResetConfirm, setShowResetConfirm] = useState(false);

  // Cloud Sync State
  const [driveApiUrl, setDriveApiUrl] = useState(() => localStorage.getItem('headline_drive_api') || '');
  const [isSyncing, setIsSyncing] = useState(false);

  // Settings State
  const [hairServices, setHairServices] = useState(() => {
    const saved = localStorage.getItem('headline_services_v11');
    return saved ? JSON.parse(saved) : defaultServices;
  });

  useEffect(() => {
    localStorage.setItem('headline_services_v11', JSON.stringify(hairServices));
  }, [hairServices]);
  
  // ID Generators
  const generateServiceId = (isRetailOnly = false) => {
    const prefix = isRetailOnly ? 'R-' : 'S-';
    return prefix + Math.floor(1000 + Math.random() * 9000);
  };
  
  const getNextCustomerId = (records) => {
    const cIds = records.map(r => r.customerId).filter(id => id && /^C\d{4,}$/.test(id));
    if (cIds.length === 0) return 'C0001';
    const nums = cIds.map(id => parseInt(id.replace('C', ''), 10));
    const max = Math.max(...nums);
    return `C${String(max + 1).padStart(4, '0')}`;
  };

  const getInitialForm = () => ({
    customerId: '', 
    clientType: 'New', 
    sourceDetail: 'Walk-in',
    language: 'CN',
    stylist: 'Man',
    firstName: '',
    lastName: '',
    gender: 'Female',
    phone: '',
    email: '',
    birthMonth: '',
    customerSource: '熟客 (Regular)',
    date: new Date().toISOString().split('T')[0],
    selectedServices: [],
    customService: '',
    retailItems: '',
    retailPrice: '',
    subtotal: '',
    discountPct: '0',
    price: '',
    paymentMethod: 'Cash',
    formula: '',
    hairTexture: '正常',
    notes: '',
    photoLink: '',
    nextSuggest: ''
  });

  const [formData, setFormData] = useState(getInitialForm());
  const [submitting, setSubmitting] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [showNameSuggest, setShowNameSuggest] = useState(false);
  const [nameSuggests, setNameSuggests] = useState([]);
  
  const [historyRecords, setHistoryRecords] = useState(() => {
    const saved = localStorage.getItem('headline_salon_history_v11');
    if (saved) return JSON.parse(saved);
    return [];
  });

  const [dashboardPeriod, setDashboardPeriod] = useState('month');
  const [revenueMonths, setRevenueMonths] = useState(6);
  const activeTheme = STYLIST_THEMES[formData.stylist] || STYLIST_THEMES['Man'];

  useEffect(() => {
    localStorage.setItem('headline_salon_history_v11', JSON.stringify(historyRecords));
  }, [historyRecords]);

  useEffect(() => {
    localStorage.setItem('headline_drive_api', driveApiUrl);
  }, [driveApiUrl]);

  const triggerNotification = (msg) => {
    setNotification(msg);
    setTimeout(() => setNotification(null), 3000);
  };

  const handleTabChange = (tab) => {
    playAudioFeedback('click');
    setActiveTab(tab);
  };

  useEffect(() => {
    const sTotal = parseInt(formData.subtotal) || 0;
    const rTotal = parseInt(formData.retailPrice) || 0;
    const pct = parseInt(formData.discountPct) || 0;
    const finalPrice = Math.round((sTotal + rTotal) * (1 - pct/100));
    setFormData(prev => ({ ...prev, price: finalPrice.toString() }));
  }, [formData.subtotal, formData.retailPrice, formData.discountPct]);

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const toggleArrayItem = (field, item) => {
    playAudioFeedback('click');
    setFormData(prev => {
      const active = prev[field].includes(item);
      return { ...prev, [field]: active ? prev[field].filter(s => s !== item) : [...prev[field], item] };
    });
  };

  const hasChemicalService = useMemo(() => {
    const allServices = [...formData.selectedServices, formData.customService];
    return allServices.some(s => chemicalKeywords.some(k => String(s || '').toLowerCase().includes(k.toLowerCase())));
  }, [formData.selectedServices, formData.customService]);

  const getFullName = (record) => {
    if (record.firstName || record.lastName) {
      return `${record.firstName || ''} ${record.lastName || ''}`.trim();
    }
    return record.name || 'Unknown'; 
  };

  // Build CRM Profiles
  const crmProfiles = useMemo(() => {
    const profiles = {};
    historyRecords.forEach(record => {
      const rawName = getFullName(record);
      const key = record.customerId ? String(record.customerId).toUpperCase() : rawName.toLowerCase(); 
      
      if (!profiles[key]) {
        profiles[key] = {
          customerId: record.customerId || '',
          fullName: rawName,
          gender: record.gender || 'Female',
          language: record.language || 'CN',
          phone: record.phone || (['Phone', 'WhatsApp'].includes(record.contactOption) ? record.contactValue : ''),
          email: record.email || (record.contactOption === 'Email' ? record.contactValue : ''),
          birthMonth: record.birthMonth || '',
          source: record.customerSource,
          totalSpent: 0,
          visitCount: 0,
          visits: [], 
          latestFormula: '',
          latestVisitDate: '1970-01-01',
          preferences: record.notes || '',
          preferredStylist: record.stylist
        };
      }
      
      const p = profiles[key];
      if (!record.isProfileOnly) {
          p.visitCount += 1;
          p.totalSpent += parseInt(record.price) || 0;
          p.visits.push(record);
      }
      
      if (record.date && record.date > p.latestVisitDate && !record.isProfileOnly) {
        // Fix: Format date to YYYY-MM-DD to avoid long timezone strings
        try {
           const d = new Date(record.date);
           if (!isNaN(d.getTime())) {
               // Use Sweden locale which naturally outputs YYYY-MM-DD
               p.latestVisitDate = d.toLocaleDateString('sv-SE');
           } else {
               p.latestVisitDate = record.date; // Fallback if it's already a string like "2021-10-05" but failed parsing
           }
        } catch(e) {
           p.latestVisitDate = record.date;
        }
        
        p.preferredStylist = record.stylist;
        if (record.formula) p.latestFormula = record.formula;
      }
    });

    let result = Object.values(profiles).map(p => {
      let tags = [];
      if (p.totalSpent >= 8000) tags.push({ label: 'VIP', color: 'bg-amber-100 text-amber-900 border-amber-300' });
      if (p.visitCount === 1) tags.push({ label: '新客', color: 'bg-emerald-100 text-emerald-900 border-emerald-300' });
      
      const lastVisit = new Date(p.latestVisitDate === '1970-01-01' ? Date.now() : p.latestVisitDate);
      const daysSince = Math.floor((new Date() - lastVisit) / (1000 * 60 * 60 * 24));
      
      if (daysSince > 90 && p.visitCount > 0) {
        tags.push({ label: '⚠️ 流失風險', color: 'bg-red-100 text-red-900 border-red-300' });
      } else if (daysSince > 45 && p.visits.some(v => v.services && v.services.includes('染'))) {
        tags.push({ label: '需補染', color: 'bg-orange-100 text-orange-900 border-orange-300' });
      }
      
      p.visits.sort((a,b) => String(b.date || '').localeCompare(String(a.date || '')));
      return { ...p, tags, daysSince };
    });

    if (crmSortBy === 'latestVisit') result.sort((a, b) => String(b.latestVisitDate || '').localeCompare(String(a.latestVisitDate || '')));
    if (crmSortBy === 'totalSpent') result.sort((a, b) => b.totalSpent - a.totalSpent);
    if (crmSortBy === 'visitCount') result.sort((a, b) => b.visitCount - a.visitCount);
    if (crmSortBy === 'name_asc') result.sort((a, b) => String(a.fullName || '').localeCompare(String(b.fullName || '')));
    if (crmSortBy === 'stylist') result.sort((a, b) => String(a.preferredStylist || '').localeCompare(String(b.preferredStylist || '')));

    return result;
  }, [historyRecords, crmSortBy]);

  const handleNameSearchInput = (e) => {
    const val = e.target.value;
    setFormData(prev => ({ ...prev, firstName: val }));
    
    if (val.trim().length > 0) {
      const matches = crmProfiles.filter(p => String(p.fullName || '').toLowerCase().includes(val.toLowerCase()) || (p.phone && p.phone.includes(val)));
      setNameSuggests(matches);
      setShowNameSuggest(matches.length > 0);
    } else {
      setShowNameSuggest(false);
      setFormData(prev => ({ ...prev, customerId: '' })); 
    }
  };

  const handleSelectSuggest = (profile) => {
    playAudioFeedback('click');
    const parts = (profile.fullName || '').split(' ');
    const fName = parts[0];
    const lName = parts.length > 1 ? parts.slice(1).join(' ') : '';

    setFormData(prev => ({
      ...prev,
      customerId: profile.customerId,
      clientType: 'Repeated',
      firstName: fName,
      lastName: lName,
      gender: profile.gender || 'Female',
      language: profile.language || 'CN',
      phone: profile.phone || '',
      email: profile.email || '',
      birthMonth: profile.birthMonth || '',
      customerSource: '熟客 (Regular)',
      hairTexture: profile.latestVisitDate !== '1970-01-01' && profile.visits[0] ? profile.visits[0].hairTexture : '正常'
    }));
    setShowNameSuggest(false);
    triggerNotification(`✅ 已成功帶入舊客資料`);
  };

  const handleSubmitCheckout = (e) => {
    e.preventDefault();
    if (!formData.firstName && !formData.lastName) return triggerNotification('請輸入姓名！');
    if (!formData.price) return triggerNotification('請確認總結金額！');

    setSubmitting(true);
    const isNew = !formData.customerId;
    const finalCustomerId = formData.customerId || getNextCustomerId(historyRecords);
    
    const hasServices = formData.selectedServices.length > 0 || formData.customService.trim() !== '';
    const hasRetail = formData.retailItems.trim() !== '' || parseInt(formData.retailPrice) > 0;
    const isRetailOnly = !hasServices && hasRetail;

    const finalRecord = {
      ...formData,
      customerId: finalCustomerId,
      serviceId: generateServiceId(isRetailOnly),
      customerSource: isNew ? `新客 (${formData.sourceDetail})` : '舊客 (Repeated)',
      services: [...formData.selectedServices, formData.customService].filter(Boolean).join(', '),
      notes: `${formData.hairTexture && hasChemicalService ? `【髮質:${formData.hairTexture}】 ` : ''}${formData.notes}`,
      isProfileOnly: false,
      timestamp: new Date().toISOString()
    };

    setTimeout(async () => {
      // 1. 先存入本機
      setHistoryRecords(prev => [finalRecord, ...prev]);
      
      // 2. 背景即時同步到 Google Sheet
      if (driveApiUrl) {
        try {
          fetch(driveApiUrl, {
            method: 'POST',
            body: JSON.stringify({ action: 'append', record: finalRecord }),
            headers: { 'Content-Type': 'text/plain;charset=utf-8' }
          });
        } catch(err) {
          console.error("雲端寫入失敗", err);
        }
      }

      setSubmitting(false);
      playAudioFeedback('success');
      setShowSuccessModal(true);
      setFormData(getInitialForm());
      setShowNotes(false);
      setShowRetail(false);
      setShowEmailField(false);
    }, 400); 
  };

  // --- CSV Bulk Import ---
  const parseCSV = (str) => {
      const cleanStr = str.trim();
      const firstDataLine = cleanStr.split('\n').find(l => l.trim().length > 0) || '';
      const delimiter = firstDataLine.includes('\t') ? '\t' : ',';
      
      const rows = [];
      let row = [];
      let curr = '';
      let inQuotes = false;
      for(let i=0; i<cleanStr.length; i++) {
          const char = cleanStr[i];
          if (char === '"' && cleanStr[i+1] === '"') { curr += '"'; i++; }
          else if (char === '"') { inQuotes = !inQuotes; }
          else if (char === delimiter && !inQuotes) { row.push(curr); curr = ''; }
          else if (char === '\n' && !inQuotes) { row.push(curr); rows.push(row); row = []; curr = ''; }
          else if (char !== '\r') { curr += char; }
      }
      if (curr) row.push(curr);
      if (row.length > 0) rows.push(row);
      return rows;
  };

  const formatImportDate = (dStr) => {
      if (!dStr) return new Date().toISOString().split('T')[0];
      const cleanStr = dStr.trim().split(' ')[0];
      const parts = cleanStr.split(/[-/]/);
      if (parts.length === 3) {
          let y = parts[0], m = parts[1], d = parts[2];
          if (y.length < 4) {
             if (parts[2].length === 4) { y = parts[2]; m = parts[1]; d = parts[0]; } 
             else { y = '20' + y; }
          }
          return `${y}-${m.padStart(2, '0')}-${d.padStart(2, '0')}`;
      }
      return dStr;
  };

  const processCSVImport = (csvText) => {
      const rows = parseCSV(csvText);
      if(rows.length < 2) return triggerNotification('❌ 格式錯誤或無資料');
      
      let headerRowIdx = rows.findIndex(r => r.some(cell => cell && cell.includes('姓名')));
      if (headerRowIdx === -1) return triggerNotification('❌ 找不到「姓名」欄位，請確認您有複製到標題列');

      const headers = rows[headerRowIdx].map(h => h?.trim() || '');
      const isProfileSheet = headers.some(h => h.includes('總消費') || h.includes('到店次數') || h.includes('最新造訪'));

      const getIdx = (keywords) => {
          let idx = headers.findIndex(h => keywords.some(k => h === k)); 
          if (idx === -1) idx = headers.findIndex(h => keywords.some(k => h.includes(k))); 
          return idx;
      };
      
      const idxCusId = getIdx(['客戶編號', '會員編號']);
      const idxSrvId = getIdx(['交易編號', '服務編號', '單號']);
      const idxIdFallback = getIdx(['編號', 'ID']); 
      
      const idxName = getIdx(['姓名', '顧客姓名']);
      const idxDate = getIdx(['服務日期', '日期', '造訪']);
      const idxPrice = getIdx(['消費總額', '金額', '消費']);
      const idxSrv = getIdx(['服務項目', '項目', '服務']); 
      const idxRetail = getIdx(['零售產品', '產品']);
      const idxFormula = getIdx(['化學配方', '配方']);
      const idxNotes = getIdx(['備註與建議', '一般備註', '備註', '建議']);
      const idxStylist = getIdx(['主理設計師', '設計師']);
      const idxGender = getIdx(['性別']);
      const idxLang = getIdx(['語言']);
      const idxPhone = getIdx(['聯絡電話', '電話', '聯絡方式', '聯絡']);
      const idxSource = getIdx(['客源狀態', '客源', '來源']);
      const idxPhoto = getIdx(['照片連結', '照片']);

      const newRecords = [];
      for(let i = headerRowIdx + 1; i < rows.length; i++) {
          const row = rows[i];
          if(!row[idxName] || !row[idxName].trim()) continue;

          let finalSrvId = generateServiceId();
          let finalCusId = '';

          if (idxSrvId > -1 && row[idxSrvId]) {
              finalSrvId = row[idxSrvId].trim().toUpperCase();
          } else if (idxIdFallback > -1 && row[idxIdFallback] && (row[idxIdFallback].toUpperCase().startsWith('S') || row[idxIdFallback].toUpperCase().startsWith('R'))) {
              finalSrvId = row[idxIdFallback].trim().toUpperCase();
          }

          if (idxCusId > -1 && row[idxCusId]) {
              finalCusId = row[idxCusId].trim().toUpperCase();
          } else if (idxIdFallback > -1 && row[idxIdFallback] && row[idxIdFallback].toUpperCase().startsWith('C')) {
              finalCusId = row[idxIdFallback].trim().toUpperCase();
          }

          newRecords.push({
              serviceId: finalSrvId,
              customerId: finalCusId, 
              firstName: row[idxName].trim(),
              date: (idxDate > -1 && row[idxDate]) ? formatImportDate(row[idxDate].trim()) : new Date().toISOString().split('T')[0],
              price: isProfileSheet ? '0' : ((idxPrice > -1 && row[idxPrice]) ? String(row[idxPrice]).replace(/[^0-9.]/g, '') : '0'),
              services: isProfileSheet ? '建立檔案' : ((idxSrv > -1 && row[idxSrv]) ? row[idxSrv].trim() : '系統匯入'),
              retailItems: (idxRetail > -1 && row[idxRetail]) ? row[idxRetail].trim() : '',
              formula: (idxFormula > -1 && row[idxFormula]) ? row[idxFormula].trim() : '',
              notes: (idxNotes > -1 && row[idxNotes]) ? row[idxNotes].trim() : '',
              photoLink: (idxPhoto > -1 && row[idxPhoto]) ? row[idxPhoto].trim() : '',
              stylist: (idxStylist > -1 && row[idxStylist] && row[idxStylist].trim()) ? row[idxStylist].trim() : 'Others',
              gender: (idxGender > -1 && row[idxGender]) ? (row[idxGender].includes('男') || row[idxGender] === 'M' ? 'Male' : 'Female') : 'Female',
              language: (idxLang > -1 && row[idxLang]) ? (row[idxLang].includes('EN') ? 'EN' : 'CN') : 'CN',
              phone: (idxPhone > -1 && row[idxPhone]) ? row[idxPhone].trim() : '',
              paymentMethod: 'Others',
              customerSource: (idxSource > -1 && row[idxSource]) ? row[idxSource].trim() : 'CSV 匯入',
              isProfileOnly: isProfileSheet, 
              timestamp: new Date().toISOString()
          });
      }

      let currentMaxId = getNextCustomerId(historyRecords);
      const nameToIdMap = {};
      
      historyRecords.forEach(r => { 
        if (r.customerId && r.firstName) nameToIdMap[r.firstName.trim().toLowerCase()] = r.customerId; 
      });

      newRecords.forEach(r => {
          const lowerName = r.firstName.toLowerCase();
          if (r.customerId) {
              nameToIdMap[lowerName] = r.customerId; 
          } else {
              if (nameToIdMap[lowerName]) {
                  r.customerId = nameToIdMap[lowerName]; 
              } else {
                  r.customerId = currentMaxId;
                  nameToIdMap[lowerName] = currentMaxId;
                  const num = parseInt(currentMaxId.replace('C', ''), 10) || 0;
                  currentMaxId = `C${String(num + 1).padStart(4, '0')}`;
              }
          }
      });

      setHistoryRecords(prev => [...newRecords, ...prev]);
      triggerNotification(`✅ 成功匯入 ${newRecords.length} 筆資料！${isProfileSheet ? '(客戶主檔)' : '(交易明細)'}`);
      setImportInput('');
  };

  const handleFetchCSV = async (url) => {
      if (!url) return;
      try {
          let fetchUrl = url;
          if(url.includes('docs.google.com/spreadsheets')) {
              const match = url.match(/spreadsheets\/d\/([a-zA-Z0-9-_]+)/);
              if(match) fetchUrl = `https://docs.google.com/spreadsheets/d/${match[1]}/export?format=csv`;
          }
          const res = await fetch(`https://api.allorigins.win/raw?url=${encodeURIComponent(fetchUrl)}`);
          const text = await res.text();
          if(text.includes('<html') || text.trim() === '') {
              triggerNotification('❌ 抓取失敗，請確認 Sheet 權限設為「知道連結的人均可檢視」');
          } else {
              processCSVImport(text);
          }
      } catch(e) {
          triggerNotification('❌ 網路阻擋，請使用最穩定的「貼上 CSV」模式。');
      }
  };

  const handleJSONImport = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    playAudioFeedback('click');
    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const importedData = JSON.parse(event.target.result);
        if (Array.isArray(importedData)) {
          setHistoryRecords(prev => {
            const existingIds = new Set(prev.map(r => r.serviceId));
            const newRecords = importedData.filter(r => !existingIds.has(r.serviceId));
            return [...newRecords, ...prev];
          });
          triggerNotification(`✅ 成功還原 ${importedData.length} 筆資料！`);
        } else throw new Error();
      } catch (err) {
        triggerNotification(`❌ JSON 格式不符。`);
      }
    };
    reader.readAsText(file);
    e.target.value = null;
  };

  const handleResetDatabase = () => {
    playAudioFeedback('warn');
    setHistoryRecords([]);
    setShowResetConfirm(false);
    triggerNotification('⚠️ 系統已恢復原廠設定，所有資料已清空。');
  };

  // --- Exports ---
  const handleCRMCSVExport = () => {
    playAudioFeedback('click');
    const headers = ['客戶編號', '姓名', '性別', '語言', '電話', 'Email', '客源', '總消費', '到店次數', '最新造訪', '偏好設計師', '配方與備註'];
    const csvRows = [headers.join(',')];
    crmProfiles.forEach(p => {
        const safeNotes = (p.latestFormula || p.preferences).replace(/"/g, '""');
        const row = [ p.customerId, p.fullName, p.gender, p.language, `"${p.phone}"`, `"${p.email}"`, p.source, p.totalSpent, p.visitCount, p.latestVisitDate, p.preferredStylist, `"${safeNotes}"` ];
        csvRows.push(row.join(','));
    });
    const blob = new Blob(["\uFEFF" + csvRows.join('\n')], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `Headline_CRM_Profiles_${new Date().toISOString().split('T')[0]}.csv`;
    link.click();
  };

  const handleTransactionCSVExport = () => {
    playAudioFeedback('click');
    const headers = ['交易編號', '服務日期', '客戶編號', '姓名', '主理設計師', '客源', '服務項目', '零售產品', '消費總額', '支付方式', '化學配方', '備註與建議', '照片連結'];
    const csvRows = [headers.join(',')];
    historyRecords.filter(r => !r.isProfileOnly).forEach(r => {
        const safeServices = (r.services || '').replace(/"/g, '""');
        const safeRetail = (r.retailItems || '').replace(/"/g, '""');
        const safeFormula = (r.formula || '').replace(/"/g, '""');
        const safeNotes = ((r.notes || '') + ' ' + (r.nextSuggest || '')).trim().replace(/"/g, '""');
        const row = [ r.serviceId, r.date, r.customerId, getFullName(r), r.stylist, r.customerSource, `"${safeServices}"`, `"${safeRetail}"`, r.price, r.paymentMethod || 'Cash', `"${safeFormula}"`, `"${safeNotes}"`, r.photoLink || '' ];
        csvRows.push(row.join(','));
    });
    const blob = new Blob(["\uFEFF" + csvRows.join('\n')], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `Headline_Transactions_${new Date().toISOString().split('T')[0]}.csv`;
    link.click();
  };

  const handleJSONExport = () => {
    playAudioFeedback('click');
    const dataStr = JSON.stringify(historyRecords, null, 2);
    const blob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `Headline_System_Backup_${new Date().toISOString().split('T')[0]}.json`;
    link.click();
    triggerNotification('✅ 系統備份檔案已成功下載！');
  };

  // --- Cloud Sync Actions ---
  const handleCloudRefresh = async () => {
    if (!driveApiUrl) return triggerNotification('❌ 請先至資料中心設定 Google Sheet API 網址！');
    
    playAudioFeedback('click');
    setIsSyncing(true);
    
    try {
      const res = await fetch(driveApiUrl);
      const data = await res.json();
      if (data && Array.isArray(data)) {
        // 過濾掉明顯無效的空行資料 (解決白畫面問題的核心防護)
        const validData = data.filter(r => r && r.serviceId);
        
        // 安全排序
        validData.sort((a, b) => new Date(b.timestamp || 0) - new Date(a.timestamp || 0));
        setHistoryRecords(validData);
        playAudioFeedback('success');
        triggerNotification(`🔄 已成功同步雲端最新資料庫！`);
      } else {
        throw new Error('Format issue');
      }
    } catch(e) {
      playAudioFeedback('warn');
      triggerNotification('❌ 同步失敗，請確認 API 網址正確或無跨域限制。');
    }
    setIsSyncing(false);
  };

  const handleCloudBackup = async () => {
    if (!driveApiUrl) return triggerNotification('❌ 請先設定 Google Sheet API 網址！');
    if (historyRecords.length === 0) return triggerNotification('❌ 系統目前無資料可備份。');
    
    playAudioFeedback('click');
    setIsSyncing(true);
    triggerNotification('⏳ 雲端同步備份中，請稍候...');
    
    try {
      // 進行全覆蓋更新
      const res = await fetch(driveApiUrl, {
        method: 'POST',
        body: JSON.stringify({ action: 'sync_all', records: historyRecords }),
        headers: { 'Content-Type': 'text/plain;charset=utf-8' }
      });
      const result = await res.json();
      if (result.status === 'success') {
        playAudioFeedback('success');
        triggerNotification('☁️✅ 成功！全站資料已安全覆蓋至 Google Sheet！');
      } else {
         throw new Error(result.message);
      }
    } catch (e) {
      playAudioFeedback('warn');
      triggerNotification('❌ 備份失敗，請確認 API 網址正確且具有執行權限。');
    }
    setIsSyncing(false);
  };

  const handleCloudRestore = async () => {
     handleCloudRefresh(); // 邏輯與 Refresh 相同，直接呼叫
  };

  // Dashboard Data Analytics
  const dashboardData = useMemo(() => {
    const now = new Date();
    const filtered = historyRecords.filter(record => {
      if (record.isProfileOnly) return false;
      const rDate = new Date(record.date || Date.now());
      if (dashboardPeriod === 'day') return rDate.toDateString() === now.toDateString();
      if (dashboardPeriod === 'week') { const weekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000); return rDate >= weekAgo; }
      if (dashboardPeriod === 'month') return rDate.getMonth() === now.getMonth() && rDate.getFullYear() === now.getFullYear();
      if (dashboardPeriod === 'quarter') { const quarterAgo = new Date(); quarterAgo.setMonth(now.getMonth() - 3); return rDate >= quarterAgo; }
      if (dashboardPeriod === 'year') return rDate.getFullYear() === now.getFullYear();
      return true;
    });

    let totalRev = 0, retailRev = 0, maleCount = 0, enCount = 0, returningCount = 0;
    const stylistMap = {};
    const serviceMap = {};

    filtered.forEach(r => { 
      totalRev += (parseInt(r.price) || 0); 
      const sSub = parseInt(r.subtotal) || 0;
      const rSub = parseInt(r.retailPrice) || 0;
      if (sSub + rSub > 0) {
         retailRev += (rSub / (sSub + rSub)) * (parseInt(r.price) || 0);
      } else if (rSub > 0) {
         retailRev += (parseInt(r.price) || 0);
      }

      if (r.gender === 'Male') maleCount++;
      if (r.language === 'EN') enCount++;
      
      const profile = crmProfiles.find(p => p.customerId === r.customerId);
      if (profile && profile.visitCount > 1) returningCount++;

      stylistMap[r.stylist] = (stylistMap[r.stylist] || 0) + (parseInt(r.price) || 0); 
      const svcs = (r.services || '').split(', ');
      svcs.forEach(s => {
        const shortName = s.trim();
        if(shortName && shortName !== '系統匯入' && shortName !== '建立檔案') serviceMap[shortName] = (serviceMap[shortName] || 0) + 1;
      });
    });

    const totalClients = filtered.length;
    const stylistChart = Object.keys(stylistMap).map(k => ({ name: k, value: stylistMap[k] }));
    const serviceChart = Object.keys(serviceMap).map(k => ({ name: k, count: serviceMap[k] })).sort((a,b)=>b.count-a.count).slice(0,5);

    const monthlyRev = {};
    for (let i = revenueMonths - 1; i >= 0; i--) {
       const d = new Date(now.getFullYear(), now.getMonth() - i, 1);
       const mLabel = `${d.getFullYear().toString().slice(2)}年${d.getMonth()+1}月`;
       monthlyRev[mLabel] = 0;
    }
    historyRecords.filter(r => !r.isProfileOnly).forEach(r => {
       const d = new Date(r.date || Date.now());
       const mLabel = `${d.getFullYear().toString().slice(2)}年${d.getMonth()+1}月`;
       if (monthlyRev[mLabel] !== undefined) {
          monthlyRev[mLabel] += (parseInt(r.price) || 0);
       }
    });
    const monthlyChart = Object.keys(monthlyRev).map(k => ({ month: k, revenue: monthlyRev[k] }));

    return { 
      totalRev, totalClients, retailRev, stylistChart, serviceChart, monthlyChart,
      filteredRecords: filtered,
      avgSpending: totalClients > 0 ? (totalRev / totalClients).toFixed(0) : 0, 
      malePct: totalClients > 0 ? ((maleCount / totalClients) * 100).toFixed(0) : 0, 
      femalePct: totalClients > 0 ? (100 - ((maleCount / totalClients) * 100)).toFixed(0) : 0, 
      enPct: totalClients > 0 ? ((enCount / totalClients) * 100).toFixed(0) : 0, 
      cnPct: totalClients > 0 ? (100 - ((enCount / totalClients) * 100)).toFixed(0) : 0, 
      retentionPct: totalClients > 0 ? ((returningCount / totalClients) * 100).toFixed(0) : 0,
      newPct: totalClients > 0 ? (100 - ((returningCount / totalClients) * 100)).toFixed(0) : 0,
      retailPct: totalRev > 0 ? ((retailRev / totalRev) * 100).toFixed(1) : 0
    };
  }, [historyRecords, dashboardPeriod, revenueMonths, crmProfiles]);

  return (
    <div className="h-screen flex flex-col font-sans selection:bg-[#E8DCC8] selection:text-[#4A2511] overflow-hidden bg-[#F6EFE9] text-[#4A2511]">
      
      {notification && (
        <div className="fixed top-6 left-1/2 transform -translate-x-1/2 z-[100] text-white px-8 py-4 rounded-2xl shadow-2xl animate-in slide-in-from-top-4 duration-300 flex items-center space-x-3 font-bold text-xl" style={{ backgroundColor: activeTheme.hex }}>
          <Icons.Check /> <span>{notification}</span>
        </div>
      )}

      {/* HEADER */}
      <header className="shrink-0 z-40 px-6 py-2 flex justify-between items-center bg-white/90 backdrop-blur-md border-b border-[#E8DCC8] shadow-sm">
        <div className="flex items-center space-x-8">
          <div className="flex flex-col items-start justify-center select-none pt-1">
            <h1 className="text-3xl font-bold tracking-[0.2em] leading-none text-[#4A2511]" style={{ fontFamily: 'Arial, sans-serif' }}>HEADLINE</h1>
            <span className="text-xs tracking-[0.4em] uppercase mt-1 font-semibold text-gray-500">Hair Salon</span>
          </div>
          <div className="flex space-x-1 bg-[#F6EFE9] p-1 rounded-2xl border border-[#E8DCC8]">
            {[
              { id: 'checkout', icon: Icons.Gift, label: 'CHECK OUT' },
              { id: 'crm', icon: Icons.User, label: '客戶資料庫' },
              { id: 'dashboard', icon: Icons.Chart, label: '數據報表' },
              { id: 'datahub', icon: Icons.Database, label: '資料中心' }
            ].map(tab => (
              <button key={tab.id} type="button" onClick={() => handleTabChange(tab.id)}
                className={`px-5 py-2.5 rounded-xl text-lg font-bold flex items-center space-x-2 transition-all ${
                  activeTab === tab.id ? 'text-white shadow-md' : 'text-gray-500 hover:bg-white/50'
                }`}
                style={activeTab === tab.id ? { backgroundColor: activeTheme.hex } : {}}>
                <tab.icon /> <span>{tab.label}</span>
              </button>
            ))}
          </div>
        </div>
        <div className="flex items-center space-x-3">
          <span className="text-sm font-bold text-gray-400 mr-2">v11.4.0 Pro</span>
          
          <button onClick={handleCloudRefresh} disabled={isSyncing} 
                  className={`p-2.5 rounded-xl text-white transition-all shadow-sm flex items-center gap-1 ${isSyncing ? 'animate-spin opacity-50' : 'hover:opacity-80'}`} 
                  style={{ backgroundColor: activeTheme.hex }} title="重新整理雲端最新資料">
             <Icons.Refresh />
          </button>
        </div>
      </header>

      {/* MAIN CONTENT AREA */}
      <main className="flex-1 overflow-y-auto p-4 md:p-6 lg:p-8 custom-scrollbar">
        
        {/* ==========================================
            TAB 1: CHECKOUT FORM
            ========================================== */}
        {activeTab === 'checkout' && (
          <form onSubmit={handleSubmitCheckout} className="w-full max-w-[1500px] mx-auto animate-in fade-in duration-300">
            <div className={`grid grid-cols-1 ${hasChemicalService ? 'xl:grid-cols-12' : ''} gap-6 transition-all duration-500`}>
              {/* LEFT COLUMN */}
              <div className={`bg-white border border-[#E8DCC8] rounded-3xl p-8 shadow-sm flex flex-col ${hasChemicalService ? 'xl:col-span-7' : 'xl:col-span-12'}`}>
                
                {/* Stylist */}
                <div className="mb-6">
                  <div className="grid grid-cols-4 gap-4">
                    {stylists.map(s => (
                      <label key={s} className="cursor-pointer">
                        <input type="radio" name="stylist" className="hidden radio-card" checked={formData.stylist === s} onChange={() => { playAudioFeedback('click'); handleInputChange('stylist', s); }}/>
                        <div className={`text-center py-3 rounded-2xl border-2 text-2xl font-black transition-all ${formData.stylist === s ? 'shadow-md' : 'bg-[#F6EFE9] hover:bg-[#E8DCC8] border-transparent text-gray-700'}`}
                             style={formData.stylist === s ? { backgroundColor: STYLIST_THEMES[s].hex, color: 'white', borderColor: STYLIST_THEMES[s].hex } : {}}>{s}</div>
                      </label>
                    ))}
                  </div>
                </div>

                {/* 2. Client Identity & Source */}
                <div className="grid grid-cols-12 gap-4 mb-4 relative">
                  <div className="col-span-6 relative">
                     <label className="block text-xs font-bold uppercase tracking-wider mb-1.5 text-gray-500">顧客姓名 (Name)</label>
                     <div className="flex space-x-2">
                       <div className="relative flex-1">
                          <input type="text" value={formData.firstName} onChange={handleNameSearchInput} onBlur={() => setTimeout(() => setShowNameSuggest(false), 200)} required placeholder="First (搜尋...)"
                            className="w-full rounded-xl py-2.5 px-3 pr-8 text-lg font-black bg-[#F6EFE9] border-transparent focus:bg-white focus:border-[#8B5A2B] border outline-none transition-colors" />
                          {formData.firstName && (
                             <button type="button" onClick={() => setFormData({...formData, firstName: '', customerId: ''})} className="absolute right-2 top-1/2 -translate-y-1/2 p-1 text-gray-400 hover:bg-gray-200 rounded-full transition-colors"><Icons.X className="w-4 h-4" /></button>
                          )}
                       </div>
                       <div className="relative w-28">
                          <input type="text" value={formData.lastName} onChange={(e) => handleInputChange('lastName', e.target.value)} placeholder="Last"
                            className="w-full rounded-xl py-2.5 px-3 pr-8 text-lg font-bold bg-[#F6EFE9] border-transparent focus:bg-white focus:border-[#8B5A2B] border outline-none" />
                          {formData.lastName && (
                             <button type="button" onClick={() => handleInputChange('lastName', '')} className="absolute right-2 top-1/2 -translate-y-1/2 p-1 text-gray-400 hover:bg-gray-200 rounded-full transition-colors"><Icons.X className="w-4 h-4" /></button>
                          )}
                       </div>
                     </div>

                    {showNameSuggest && nameSuggests.length > 0 && (
                        <div className="absolute z-50 top-[100%] mt-2 left-0 right-0 bg-white border border-gray-200 rounded-2xl shadow-2xl max-h-60 overflow-y-auto">
                           {nameSuggests.map(p => (
                             <div key={p.customerId} onClick={() => handleSelectSuggest(p)} className="px-5 py-4 border-b last:border-0 hover:bg-gray-50 cursor-pointer flex justify-between items-center">
                               <div>
                                 <span className="font-black text-xl text-[#4A2511]">{p.fullName}</span>
                                 <span className="ml-3 text-sm font-bold text-gray-400 bg-gray-100 px-2 py-1 rounded-md">{p.phone}</span>
                               </div>
                               <span className="text-sm font-bold text-[#8B5A2B] bg-[#E8DCC8]/30 px-2 py-1 rounded">{p.customerId}</span>
                             </div>
                           ))}
                        </div>
                     )}
                  </div>
                  
                  <div className="col-span-3">
                     <label className="block text-xs font-bold uppercase tracking-wider mb-1.5 text-gray-500">客源狀態 (Client Status)</label>
                     <div className="flex gap-1 h-[46px]">
                       <div className="flex bg-[#F6EFE9] rounded-xl p-1 w-[45%]">
                          <button type="button" onClick={() => handleInputChange('clientType', 'New')} className={`flex-1 rounded-lg font-bold text-sm transition-all ${formData.clientType === 'New' ? 'bg-white shadow text-[#4A2511]' : 'text-gray-400'}`}>新客</button>
                          <button type="button" onClick={() => handleInputChange('clientType', 'Repeated')} className={`flex-1 rounded-lg font-bold text-sm transition-all ${formData.clientType === 'Repeated' ? 'bg-white shadow text-[#4A2511]' : 'text-gray-400'}`}>舊客</button>
                       </div>
                       {formData.clientType === 'New' && (
                         <select value={formData.sourceDetail} onChange={(e) => handleInputChange('sourceDetail', e.target.value)} className="w-[55%] bg-[#F6EFE9] border-transparent rounded-xl px-1 text-xs font-bold outline-none focus:border-[#8B5A2B] border">
                           <option>Walk-in</option><option>Referral</option><option>Tourist</option><option>Google</option><option>IG/Facebook</option>
                         </select>
                       )}
                     </div>
                  </div>

                  <div className="col-span-3">
                     <label className="block text-xs font-bold uppercase tracking-wider mb-1.5 text-gray-500">客戶編號 (Client ID)</label>
                     <input type="text" value={formData.clientType === 'New' ? getNextCustomerId(historyRecords) : formData.customerId} 
                            readOnly={formData.clientType === 'New'} onChange={(e) => handleInputChange('customerId', e.target.value.toUpperCase())} placeholder="C0001"
                            className={`w-full border rounded-xl py-2.5 px-3 text-lg font-bold outline-none text-center font-mono transition-colors ${formData.clientType === 'New' ? 'bg-gray-50 border-gray-200 text-gray-400' : 'bg-[#F6EFE9] border-transparent text-[#4A2511] focus:bg-white focus:border-[#8B5A2B]'}`} />
                  </div>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-6 border-b border-gray-100 pb-6">
                  <div>
                     <label className="block text-xs font-bold uppercase tracking-wider mb-1.5 text-gray-500">性別 & 語言</label>
                     <div className="flex space-x-1">
                        <div className="w-1/2 flex bg-[#F6EFE9] rounded-xl p-1 h-[46px]">
                           <button type="button" onClick={() => handleInputChange('gender', 'Female')} className={`flex-1 rounded-lg text-sm font-bold transition-all ${formData.gender === 'Female' ? 'bg-white shadow text-[#4A2511]' : 'text-gray-400'}`}>女</button>
                           <button type="button" onClick={() => handleInputChange('gender', 'Male')} className={`flex-1 rounded-lg text-sm font-bold transition-all ${formData.gender === 'Male' ? 'bg-white shadow text-[#4A2511]' : 'text-gray-400'}`}>男</button>
                        </div>
                        <div className="w-1/2 flex bg-[#F6EFE9] rounded-xl p-1 h-[46px]">
                           <button type="button" onClick={() => handleInputChange('language', 'EN')} className={`flex-1 rounded-lg text-sm font-bold transition-all ${formData.language === 'EN' ? 'bg-white shadow text-[#4A2511]' : 'text-gray-400'}`}>EN</button>
                           <button type="button" onClick={() => handleInputChange('language', 'CN')} className={`flex-1 rounded-lg text-sm font-bold transition-all ${formData.language === 'CN' ? 'bg-white shadow text-[#4A2511]' : 'text-gray-400'}`}>CN</button>
                        </div>
                     </div>
                  </div>
                  <div>
                     <label className="block text-xs font-bold uppercase tracking-wider mb-1.5 text-gray-500">聯絡電話 (Phone)</label>
                     <div className="relative">
                        <input type="text" value={formData.phone} onChange={(e) => handleInputChange('phone', e.target.value)} placeholder="自由輸入..." className="w-full bg-[#F6EFE9] border border-transparent rounded-xl py-2.5 px-3 pr-8 text-base font-bold outline-none focus:bg-white focus:border-[#8B5A2B] h-[46px]" />
                        {formData.phone && (
                           <button type="button" onClick={() => handleInputChange('phone', '')} className="absolute right-2 top-1/2 -translate-y-1/2 p-1 text-gray-400 hover:bg-gray-200 rounded-full transition-colors"><Icons.X className="w-4 h-4" /></button>
                        )}
                     </div>
                  </div>
                  <div>
                     <label className="block text-xs font-bold uppercase tracking-wider mb-1.5 text-gray-500">電子郵件 (Email)</label>
                     {!showEmailField && !formData.email ? (
                        <button type="button" onClick={() => setShowEmailField(true)} className="w-full bg-[#F6EFE9] border border-transparent rounded-xl py-2.5 px-3 text-sm font-bold text-gray-400 hover:bg-[#E8DCC8] hover:text-[#8B5A2B] transition-colors h-[46px] flex items-center justify-center">
                           + 新增 Email
                        </button>
                     ) : (
                        <div className="relative">
                           <input type="email" value={formData.email} onChange={(e) => handleInputChange('email', e.target.value)} placeholder="@" className="w-full bg-[#F6EFE9] border border-transparent rounded-xl py-2.5 px-3 pr-8 text-base font-bold outline-none focus:bg-white focus:border-[#8B5A2B] h-[46px]" autoFocus />
                           <button type="button" onClick={() => { setShowEmailField(false); handleInputChange('email', ''); }} className="absolute right-2 top-1/2 -translate-y-1/2 p-1 text-gray-400 hover:bg-gray-200 rounded-full transition-colors"><Icons.X className="w-4 h-4" /></button>
                        </div>
                     )}
                  </div>
                  <div>
                     <label className="block text-xs font-bold uppercase tracking-wider mb-1.5 text-gray-500">生日月份 (Birth)</label>
                     <select value={formData.birthMonth} onChange={(e) => handleInputChange('birthMonth', e.target.value)} className="w-full bg-[#F6EFE9] border border-transparent rounded-xl py-2.5 px-2 text-sm font-bold outline-none focus:border-[#8B5A2B] h-[46px]">
                       <option value="">- 無 -</option>
                       {['1月','2月','3月','4月','5月','6月','7月','8月','9月','10月','11月','12月'].map(m => <option key={m} value={m}>{m}</option>)}
                     </select>
                  </div>
                  <div>
                     <label className="block text-xs font-bold uppercase tracking-wider mb-1.5 text-gray-500">服務日期 (Date)</label>
                     <input type="date" value={formData.date} onChange={(e) => handleInputChange('date', e.target.value)} className="w-full bg-[#F6EFE9] border border-transparent rounded-xl py-2.5 px-3 text-sm font-bold outline-none focus:bg-white focus:border-[#8B5A2B] h-[46px]" />
                  </div>
                </div>

                {/* Services & Retail */}
                <div className="mb-6 border-b border-gray-100 pb-6">
                  <div className="flex items-center justify-between mb-3">
                    <label className="block text-sm font-bold uppercase tracking-wider text-gray-500">服務項目 (Services)</label>
                    <button type="button" onClick={() => setShowServicesConfig(true)} className="text-gray-400 hover:text-[#8B5A2B] transition-colors"><Icons.Settings /></button>
                  </div>
                  <div className="flex flex-wrap gap-2 mb-3">
                    {hairServices.map((service, index) => (
                      <label key={index} className="cursor-pointer">
                         <input type="checkbox" className="hidden checkbox-card" checked={formData.selectedServices.includes(service)} onChange={() => toggleArrayItem('selectedServices', service)}/>
                         <div className={`py-2 px-3 rounded-xl text-sm font-bold border-2 transition-all ${formData.selectedServices.includes(service) ? 'shadow-sm' : 'bg-[#F6EFE9] border-transparent text-gray-600 hover:bg-[#E8DCC8]'}`}
                              style={formData.selectedServices.includes(service) ? { backgroundColor: activeTheme.hex, color: 'white', borderColor: activeTheme.hex } : {}}>{service}</div>
                      </label>
                    ))}
                  </div>
                  <input type="text" placeholder="+ 其他客製服務或套餐名稱..." value={formData.customService} onChange={(e) => handleInputChange('customService', e.target.value)}
                    className="w-full bg-[#F6EFE9] border-transparent rounded-xl py-2 px-4 text-base font-bold outline-none focus:bg-white focus:border-[#8B5A2B] border transition-colors mb-4" />

                  {/* Retail Toggle */}
                  <button type="button" onClick={() => { playAudioFeedback('click'); setShowRetail(!showRetail); }} className="flex items-center space-x-2 text-[#8B5A2B] font-bold text-sm hover:opacity-80 transition-colors bg-[#F6EFE9] px-3 py-1.5 rounded-lg">
                     {showRetail ? <Icons.Minus /> : <Icons.Plus />} <span>零售產品 (Retail)</span>
                  </button>
                  {showRetail && (
                    <div className="mt-3 bg-[#F6EFE9]/50 p-4 rounded-2xl border border-[#E8DCC8] animate-in slide-in-from-top-2">
                      <textarea rows="2" placeholder="產品名稱 (例: Oribe 洗髮精)..." value={formData.retailItems} onChange={(e) => handleInputChange('retailItems', e.target.value)}
                        className="w-full bg-white border-transparent rounded-xl p-3 text-sm font-bold outline-none focus:border-[#8B5A2B] border transition-colors mb-3" />
                      <div className="flex items-center gap-3 w-1/2">
                         <span className="text-sm font-bold text-gray-500 whitespace-nowrap">產品總額 $</span>
                         <input type="number" placeholder="0" value={formData.retailPrice} onChange={(e) => handleInputChange('retailPrice', e.target.value)}
                          className="w-full bg-white border-transparent rounded-xl py-2 px-3 text-lg font-black outline-none focus:border-[#8B5A2B] border transition-colors" />
                      </div>
                    </div>
                  )}
                </div>

                {/* Payment */}
                <div className="grid grid-cols-12 gap-5 p-6 rounded-3xl" style={{ backgroundColor: activeTheme.light, border: `1px solid ${activeTheme.hex}30` }}>
                  <div className="col-span-3">
                    <label className="block text-sm font-bold uppercase tracking-wider mb-2" style={{ color: activeTheme.hex }}>服務小計 $</label>
                    <input type="number" placeholder="0" value={formData.subtotal} onChange={(e) => handleInputChange('subtotal', e.target.value)}
                      className="w-full bg-white border-transparent rounded-2xl py-3 px-4 text-2xl font-black focus:ring-2 focus:outline-none" style={{ color: activeTheme.hex }} />
                  </div>
                  <div className="col-span-2">
                    <label className="block text-sm font-bold uppercase tracking-wider mb-2" style={{ color: activeTheme.hex }}>折扣 %</label>
                    <select value={formData.discountPct} onChange={(e) => handleInputChange('discountPct', e.target.value)}
                      className="w-full bg-white border-transparent rounded-2xl py-3.5 px-2 text-lg font-bold focus:outline-none cursor-pointer" style={{ color: activeTheme.hex }}>
                      <option value="0">無折扣</option><option value="5">5% OFF</option><option value="10">10% OFF</option><option value="15">15% OFF</option><option value="20">20% OFF</option><option value="30">30% OFF</option><option value="50">50% OFF</option><option value="100">Free</option>
                    </select>
                  </div>
                  <div className="col-span-4">
                    <label className="block text-sm font-bold uppercase tracking-wider mb-2" style={{ color: activeTheme.hex }}>總結算 $ (Total) *</label>
                    <input type="number" placeholder="0" value={formData.price} onChange={(e) => handleInputChange('price', e.target.value)} required
                        className="w-full bg-white border-transparent rounded-2xl py-3 px-5 text-4xl font-black focus:ring-2 focus:outline-none" style={{ color: activeTheme.hex }} />
                  </div>
                  <div className="col-span-3">
                     <label className="block text-sm font-bold uppercase tracking-wider mb-2" style={{ color: activeTheme.hex }}>支付方式</label>
                     <div className="flex space-x-2 h-[52px]">
                       {paymentMethods.map(method => (
                         <button key={method.id} type="button" onClick={() => { playAudioFeedback('click'); handleInputChange('paymentMethod', method.id); }}
                           className={`flex-1 rounded-2xl border-2 transition-all flex items-center justify-center space-x-2 ${formData.paymentMethod === method.id ? 'bg-white shadow-sm' : 'bg-transparent border-transparent hover:bg-white/40'}`}
                           style={formData.paymentMethod === method.id ? { borderColor: activeTheme.hex, color: activeTheme.hex } : { color: activeTheme.hex, opacity: 0.7 }}>
                           <method.icon />
                           <span className="font-bold text-sm">{method.label}</span>
                         </button>
                       ))}
                     </div>
                  </div>
                </div>

                {/* Notes & Photos */}
                <div className="mt-5">
                  <button type="button" onClick={() => { playAudioFeedback('click'); setShowNotes(!showNotes); }} 
                          className="w-full flex items-center justify-between py-4 px-6 bg-gray-50 border border-gray-200 rounded-2xl text-xl font-bold text-gray-500 hover:bg-gray-100 transition-colors">
                      <span className="flex items-center space-x-2"><Icons.History className="w-6 h-6"/> <span>{showNotes ? '隱藏備註與照片' : '新增照片連結、備註與下次建議'}</span></span>
                      {showNotes ? <Icons.Minus /> : <Icons.Plus />}
                  </button>
                  
                  {showNotes && (
                    <div className="mt-4 p-6 bg-gray-50 border border-gray-200 rounded-3xl animate-in slide-in-from-top-2">
                        <label className="block text-sm font-bold uppercase tracking-wider mb-2 text-gray-500 flex items-center gap-1"><Icons.Link /> <span>作品照片連結 (Photo URL)</span></label>
                        <input type="url" placeholder="貼上照片的網址 (例如 IG 或圖床連結)..." value={formData.photoLink} onChange={(e) => handleInputChange('photoLink', e.target.value)}
                            className="w-full bg-white border-transparent rounded-2xl p-4 text-lg font-mono mb-4 focus:outline-none focus:ring-1" />
                        {formData.photoLink && (
                           <div className="mb-4">
                             <img src={formData.photoLink} alt="Preview" className="h-32 object-cover rounded-xl border border-gray-200 shadow-sm" onError={(e) => e.target.style.display = 'none'} />
                           </div>
                        )}

                        <label className="block text-sm font-bold uppercase tracking-wider mb-2 text-gray-500">一般備註 (General Notes)</label>
                        <textarea rows={2} placeholder="輸入私密備註..." value={formData.notes} onChange={(e) => handleInputChange('notes', e.target.value)}
                            className="w-full bg-white border-transparent rounded-2xl p-4 text-xl font-semibold mb-4 focus:outline-none focus:ring-1" />
                        
                        <label className="block text-sm font-bold uppercase tracking-wider mb-2 text-gray-500">下次建議 (Next Suggestion)</label>
                        <input type="text" placeholder="例: 4週後來修剪" value={formData.nextSuggest} onChange={(e) => handleInputChange('nextSuggest', e.target.value)}
                            className="w-full bg-white border-transparent rounded-2xl py-3 px-4 text-xl font-semibold focus:outline-none focus:ring-1" />
                    </div>
                  )}
                </div>
                
                {!hasChemicalService && (
                   <button type="submit" disabled={submitting} className="w-full text-white font-black py-6 rounded-3xl text-3xl shadow-lg transition-all flex items-center justify-center space-x-3 mt-8 hover:opacity-90"
                           style={{ backgroundColor: activeTheme.hex, boxShadow: `0 10px 25px -5px ${activeTheme.shadow}` }}>
                    {submitting ? <span className="animate-spin rounded-full h-8 w-8 border-b-4 border-white"></span> : <><Icons.Check className="w-10 h-10"/> <span>完成結帳並存檔</span></>}
                  </button>
                )}
              </div>

              {/* RIGHT COLUMN */}
              {hasChemicalService && (
                <div className="xl:col-span-5 bg-white border border-[#E8DCC8] p-8 rounded-3xl flex flex-col shadow-lg animate-in slide-in-from-right-8 duration-500">
                  <div className="flex items-center justify-between border-b-2 border-gray-100 pb-5 mb-6">
                    <h2 className="text-3xl font-black flex items-center space-x-3" style={{ color: activeTheme.hex }}>
                      <Icons.Beaker /> <span>化學配方紀錄 (Formula)</span>
                    </h2>
                  </div>
                  <div className="mb-6 flex-1 flex flex-col">
                    <label className="block text-sm font-bold uppercase tracking-wider mb-3 text-gray-500">完整配方與操作紀錄 (Formula Details)</label>
                    <textarea placeholder={`例:\n8B 70ml + 7MT 30ml + 9%\n先打底藥水, 藍色藥水25分鐘...`} value={formData.formula} onChange={(e) => handleInputChange('formula', e.target.value)}
                        className="w-full flex-1 bg-gray-50 border border-gray-200 rounded-3xl p-5 text-2xl font-mono focus:bg-white focus:outline-none focus:border-[#8B5A2B] focus:border-2 shadow-inner leading-relaxed transition-colors" />
                  </div>
                  <div className="mb-8">
                    <label className="block text-sm font-bold uppercase tracking-wider mb-3 text-gray-500">頭皮/髮質狀況標籤 (Hair Texture)</label>
                    <div className="flex flex-wrap gap-2">
                      {scalpNotes.map((texture, index) => (
                        <button key={index} type="button" onClick={() => handleInputChange('hairTexture', texture)}
                          className={`px-4 py-2.5 text-lg font-bold border-2 rounded-xl transition-all ${formData.hairTexture === texture ? 'shadow-sm' : 'bg-white hover:bg-gray-50 border-gray-200 text-gray-600'}`}
                          style={formData.hairTexture === texture ? { backgroundColor: activeTheme.hex, color: 'white', borderColor: activeTheme.hex } : {}}
                        >{texture}</button>
                      ))}
                    </div>
                  </div>
                  <button type="submit" disabled={submitting} className="w-full text-white font-black py-6 rounded-3xl text-3xl shadow-lg transition-all flex items-center justify-center space-x-3 mt-auto hover:opacity-90"
                          style={{ backgroundColor: activeTheme.hex, boxShadow: `0 10px 25px -5px ${activeTheme.shadow}` }}>
                    {submitting ? <span className="animate-spin rounded-full h-8 w-8 border-b-4 border-white"></span> : <><Icons.Check className="w-10 h-10"/> <span>完成結帳並存檔</span></>}
                  </button>
                </div>
              )}
            </div>
          </form>
        )}

        {/* ==========================================
            TAB 2: CRM DIRECTORY
            ========================================== */}
        {activeTab === 'crm' && (
          <div className="max-w-[1500px] mx-auto space-y-6 animate-in fade-in duration-300">
            <div className="bg-white border border-[#E8DCC8] rounded-3xl p-8 shadow-sm">
              <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4 border-b-2 border-gray-100 pb-5">
                <h2 className="text-4xl font-black flex items-center space-x-4 text-[#4A2511] shrink-0">
                  <div className="w-3 h-12 rounded-full" style={{ backgroundColor: activeTheme.hex }}></div>
                  <span>客戶檔案庫 ({crmProfiles.length} 位)</span>
                </h2>
                
                <div className="flex flex-wrap items-center justify-end gap-3 w-full">
                  <div className="flex-1 min-w-[300px] max-w-md relative">
                    <input type="text" placeholder="🔍 搜尋電話、姓名、配方關鍵字..." value={crmSearchQuery} onChange={(e) => setCrmSearchQuery(e.target.value)} 
                           className="w-full bg-[#F6EFE9] border border-[#E8DCC8] rounded-2xl py-3 px-4 pr-10 text-lg font-bold outline-none focus:bg-white focus:border-[#8B5A2B] transition-colors" />
                    {crmSearchQuery && (
                       <button type="button" onClick={() => setCrmSearchQuery('')} className="absolute right-3 top-1/2 -translate-y-1/2 p-1 text-gray-400 hover:bg-gray-200 rounded-full transition-colors"><Icons.X className="w-4 h-4" /></button>
                    )}
                  </div>
                  <div className="flex items-center space-x-3 bg-[#F6EFE9] rounded-2xl p-2.5 px-4 border border-[#E8DCC8]">
                    <span className="text-sm font-bold text-gray-500 uppercase">Sort:</span>
                    <select value={crmSortBy} onChange={(e) => setCrmSortBy(e.target.value)} className="bg-transparent text-lg font-bold focus:outline-none text-[#4A2511] cursor-pointer">
                      <option value="latestVisit">最新到店</option><option value="name_asc">姓名 (A-Z)</option><option value="stylist">設計師</option><option value="totalSpent">消費總額</option>
                    </select>
                  </div>
                  <div className="flex bg-[#F6EFE9] rounded-2xl p-1 h-[56px] border border-[#E8DCC8]">
                    <button onClick={() => { playAudioFeedback('click'); setCrmViewMode('list'); }} className={`px-4 rounded-xl flex items-center justify-center transition-colors ${crmViewMode === 'list' ? 'bg-white shadow text-[#4A2511]' : 'text-gray-400'}`}><Icons.ListView /></button>
                    <button onClick={() => { playAudioFeedback('click'); setCrmViewMode('cards'); }} className={`px-4 rounded-xl flex items-center justify-center transition-colors ${crmViewMode === 'cards' ? 'bg-white shadow text-[#4A2511]' : 'text-gray-400'}`}><Icons.CardView /></button>
                  </div>
                </div>
              </div>

              {(() => {
                const displayedProfiles = crmProfiles.filter(p => {
                  if (!crmSearchQuery) return true;
                  const q = crmSearchQuery.toLowerCase();
                  return String(p.fullName || '').toLowerCase().includes(q) || 
                         String(p.phone || '').toLowerCase().includes(q) || 
                         String(p.latestFormula || '').toLowerCase().includes(q) || 
                         String(p.preferences || '').toLowerCase().includes(q) || 
                         String(p.customerId || '').toLowerCase().includes(q);
                });

                if (crmProfiles.length === 0) return <div className="py-32 text-center text-2xl font-bold text-gray-300">尚無客戶資料，請從結帳或資料中心匯入建立。</div>;
                if (displayedProfiles.length === 0) return <div className="py-32 text-center text-2xl font-bold text-gray-400">🔍 找不到符合「{crmSearchQuery}」的客戶。</div>;

                if (crmViewMode === 'list') {
                  return (
                    <div className="overflow-x-auto border border-[#E8DCC8] rounded-2xl bg-white">
                      <table className="w-full text-left text-lg">
                        <thead className="bg-[#F6EFE9] border-b border-[#E8DCC8] font-bold text-[#4A2511]">
                          <tr>
                            <th className="p-4">ID</th><th className="p-4">姓名</th><th className="p-4">性別/語言</th><th className="p-4">聯絡電話</th><th className="p-4 text-right">總消費 / 次數</th><th className="p-4">最新造訪</th><th className="p-4">操作</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-[#E8DCC8]">
                          {displayedProfiles.map((client, i) => {
                            const isExpanded = expandedHistory[client.customerId];
                            return (
                             <React.Fragment key={client.customerId}>
                               <tr className="hover:bg-gray-50 transition-colors">
                                 <td className="p-4 font-mono text-gray-500 text-sm">{client.customerId}</td>
                                 <td className="p-4 font-black text-[#4A2511] text-xl flex flex-col gap-1">
                                    <div className="flex items-center gap-2">
                                       {client.fullName}
                                       {client.daysSince > 90 && client.visitCount > 0 && <span title="流失預警" className="text-red-500"><Icons.AlertTriangle/></span>}
                                    </div>
                                    <span className="text-sm font-bold flex items-center gap-1" style={{ color: STYLIST_THEMES[client.preferredStylist]?.hex || '#8B5A2B'}}>
                                        <div className="w-2 h-2 rounded-full" style={{ backgroundColor: STYLIST_THEMES[client.preferredStylist]?.hex || '#8B5A2B'}}></div>
                                        {client.preferredStylist}
                                    </span>
                                 </td>
                                 <td className="p-4 text-base text-gray-600 font-bold">{client.gender === 'Male' ? '♂ 男' : '♀ 女'} <span className="ml-2 bg-gray-100 px-2 py-0.5 rounded">{client.language}</span></td>
                                 <td className="p-4 text-base text-gray-600 font-bold">{client.phone}</td>
                                 <td className="p-4 text-right">
                                    <div className="font-black text-[#4A2511] text-xl">${client.totalSpent}</div>
                                    <div className="text-sm font-bold text-gray-400">{client.visitCount} 次</div>
                                 </td>
                                 <td className="p-4 text-base font-bold text-gray-600">
                                   {client.latestVisitDate === '1970-01-01' ? '無紀錄' : <>{client.latestVisitDate} <span className="text-xs text-gray-400 ml-1">({client.daysSince} 天前)</span></>}
                                 </td>
                                 <td className="p-4 flex items-center space-x-2">
                                    <button onClick={() => { playAudioFeedback('click'); setExpandedHistory(prev => ({...prev, [client.customerId]: !prev[client.customerId]})); }} 
                                            className="px-4 py-2 bg-[#F6EFE9] text-[#8B5A2B] font-bold text-base rounded-xl hover:bg-[#E8DCC8] transition-colors">
                                        {isExpanded ? '隱藏' : '紀錄'}
                                    </button>
                                    <button onClick={() => { playAudioFeedback('click'); setProfileEditData(client); }} className="p-2 text-blue-500 hover:bg-blue-50 rounded-xl"><Icons.Edit/></button>
                                 </td>
                               </tr>
                               {isExpanded && client.visits.length > 0 && (
                                 <tr className="bg-gray-50 border-b-4 border-double border-gray-200">
                                    <td colSpan={7} className="p-6">
                                       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                                          {client.visits.map((v, vIdx) => (
                                            <div key={vIdx} className="bg-white border p-3 rounded-2xl shadow-sm relative group/record flex flex-col justify-between" style={{ borderColor: STYLIST_THEMES[v.stylist]?.light || '#eee' }}>
                                              <div>
                                                <div className="flex justify-between font-black text-lg text-[#4A2511] mb-1 pr-12">
                                                  <div className="flex items-center gap-2">
                                                     <span>{v.date}</span>
                                                     <span className="text-[10px] font-mono text-gray-400 bg-gray-100 px-1.5 py-0.5 rounded">{v.serviceId}</span>
                                                  </div>
                                                  <span className="text-[#8B5A2B]">${v.price}</span>
                                                </div>
                                                <p className="text-gray-600 font-bold text-sm mb-1">{v.services}</p>
                                                {v.retailItems && <p className="text-[#8B5A2B] font-bold text-xs mb-1 flex items-center gap-1"><Icons.Cart className="w-3 h-3"/> {v.retailItems}</p>}
                                                {v.formula && <p className="font-mono text-xs text-gray-700 bg-gray-50 p-2 rounded-lg border border-gray-100 break-words whitespace-pre-wrap">{v.formula}</p>}
                                                {v.notes && <p className="text-xs text-gray-500 mt-1 font-bold bg-amber-50 p-1.5 rounded-md line-clamp-2">{v.notes}</p>}
                                              </div>
                                              
                                              {v.photoLink && (
                                                <div className="mt-2">
                                                   <a href={v.photoLink} target="_blank" rel="noopener noreferrer">
                                                     <img src={v.photoLink} alt="紀錄照" className="h-16 w-16 object-cover rounded-lg border border-gray-200 shadow-sm hover:opacity-80 transition-opacity" onError={(e) => e.target.style.display = 'none'} />
                                                   </a>
                                                </div>
                                              )}

                                              <div className="absolute top-2 right-2 flex space-x-1 opacity-0 group-hover/record:opacity-100 transition-opacity">
                                                 <button onClick={() => setEditModal(v)} className="p-1.5 bg-gray-100 hover:bg-blue-100 hover:text-blue-600 text-gray-500 rounded-lg"><Icons.Edit /></button>
                                                 <button onClick={() => setDeleteConfirm({ serviceId: v.serviceId, date: v.date, fullName: client.fullName })} className="p-1.5 bg-gray-100 hover:bg-red-100 hover:text-red-600 text-gray-500 rounded-lg"><Icons.Trash /></button>
                                              </div>
                                            </div>
                                          ))}
                                       </div>
                                    </td>
                                 </tr>
                               )}
                             </React.Fragment>
                            );
                          })}
                        </tbody>
                      </table>
                    </div>
                  );
                }

                return (
                  <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                    {displayedProfiles.map((client, i) => {
                      const isExpanded = expandedHistory[client.customerId];
                      const clientTheme = STYLIST_THEMES[client.preferredStylist] || STYLIST_THEMES['Others'];
                      
                      return (
                      <div key={i} className="border-2 rounded-3xl p-6 transition-all bg-white hover:shadow-xl flex flex-col justify-between group relative" style={{ borderColor: clientTheme.light }}>
                        <div className="absolute top-4 right-4 flex space-x-2 opacity-0 group-hover:opacity-100 transition-opacity z-10">
                            <button onClick={() => { playAudioFeedback('click'); setProfileEditData(client); }} className="p-2 bg-gray-50 text-gray-400 hover:text-blue-600 rounded-xl transition-colors shadow-sm"><Icons.Edit/></button>
                            <button onClick={() => { playAudioFeedback('warn'); setClientDeleteConfirm(client); }} className="p-2 bg-red-50 text-red-400 hover:text-red-600 rounded-xl transition-colors shadow-sm"><Icons.Trash/></button>
                        </div>
                        <div>
                          <div className="flex flex-col mb-3 pr-16 relative">
                              <div className="flex items-center space-x-3 mb-2">
                                  <span className="text-2xl font-black text-[#4A2511] truncate">{client.fullName}</span>
                                  <span className="bg-[#F6EFE9] text-[#8B5A2B] text-xs px-2.5 py-1 rounded-md font-mono font-bold shrink-0 border border-[#E8DCC8]">{client.customerId}</span>
                              </div>
                              
                              {/* Stylist Badge & Info */}
                              <div className="flex items-center gap-4 mb-4">
                                 <span className="text-xl font-black text-white px-3 py-1 rounded shadow-sm" style={{ backgroundColor: clientTheme.hex }}>{client.preferredStylist}</span>
                                 <div className="text-xl font-black text-gray-500 flex items-center space-x-2">
                                    <span className={client.gender === 'Male' ? 'text-blue-600' : 'text-pink-600'}>{client.gender === 'Male' ? '男' : '女'}</span>
                                    {client.birthMonth && <span className="text-base">🎂 {client.birthMonth}</span>}
                                 </div>
                              </div>
                              
                              {(client.phone || client.email) && (
                                 <div className="text-sm font-bold text-gray-500 flex items-center">
                                    {client.phone && <span className="mr-2">📞 {client.phone}</span>}
                                    <span className="bg-gray-100 px-1.5 py-0.5 rounded text-xs">{client.language}</span>
                                 </div>
                              )}
                          </div>

                          <div className="flex flex-wrap gap-2 mb-5">
                              {client.tags.map((t, idx) => (
                                  <span key={idx} className={`text-xs font-bold px-2.5 py-1 rounded-md border ${t.color}`}>{t.label}</span>
                              ))}
                          </div>

                          <div className="grid grid-cols-2 gap-4 text-lg bg-[#F6EFE9]/50 p-5 rounded-2xl mb-4 border border-[#E8DCC8]">
                            <div><span className="text-sm text-gray-500 uppercase font-bold block mb-1">LTV (總消費)</span><span className="font-black text-[#4A2511] text-2xl">${client.totalSpent}</span></div>
                            <div>
                               <span className="text-sm text-gray-500 uppercase font-bold block mb-1">最近造訪</span>
                               <span className="font-black text-[#4A2511] text-base">
                                 {client.latestVisitDate === '1970-01-01' ? '無紀錄' : <>{client.latestVisitDate} <span className="text-xs font-bold text-gray-400 ml-1">({client.daysSince} 天前)</span></>}
                               </span>
                            </div>
                          </div>
                        </div>
                        
                        <div className="mt-2">
                          <button onClick={() => { playAudioFeedback('click'); setExpandedHistory(prev => ({...prev, [client.customerId]: !prev[client.customerId]})); }} 
                                  className="w-full py-3 flex items-center justify-center space-x-2 text-lg font-bold rounded-xl transition-colors hover:bg-gray-100" style={{ color: clientTheme.hex, backgroundColor: clientTheme.light }}>
                            <Icons.History /> <span>{isExpanded ? '隱藏紀錄' : `展開完整紀錄 (${client.visitCount} 次)`}</span>
                          </button>
                          
                          {isExpanded && (
                            <div className="mt-4 space-y-3 animate-in slide-in-from-top-2 max-h-[350px] overflow-y-auto custom-scrollbar pr-2">
                              {client.visits.map((v, vIdx) => (
                                <div key={vIdx} className="bg-white border-2 p-3 rounded-2xl shadow-sm relative group/record flex flex-col justify-between" style={{ borderColor: clientTheme.light }}>
                                  <div>
                                    <div className="flex justify-between font-black text-lg text-[#4A2511] mb-1 pr-12">
                                      <div className="flex items-center gap-2">
                                         <span>{v.date}</span>
                                         <span className="text-[10px] font-mono text-gray-400 bg-gray-100 px-1.5 py-0.5 rounded">{v.serviceId}</span>
                                      </div>
                                      <span style={{ color: clientTheme.hex }}>${v.price}</span>
                                    </div>
                                    <p className="text-gray-600 font-bold text-sm mb-1">{v.services}</p>
                                    {v.retailItems && <p className="text-[#8B5A2B] font-bold text-xs mb-1 flex items-center gap-1"><Icons.Cart className="w-3 h-3"/> {v.retailItems}</p>}
                                    {v.formula && <p className="font-mono text-xs text-gray-700 bg-gray-50 p-2 rounded-lg border border-gray-100 break-words whitespace-pre-wrap">{v.formula}</p>}
                                    {v.notes && <p className="text-xs text-gray-500 mt-1 font-bold bg-amber-50 p-1.5 rounded-md line-clamp-2">{v.notes}</p>}
                                  </div>

                                  {v.photoLink && (
                                    <div className="mt-2">
                                       <a href={v.photoLink} target="_blank" rel="noopener noreferrer">
                                         <img src={v.photoLink} alt="紀錄照" className="h-16 w-16 object-cover rounded-lg border border-gray-200 shadow-sm hover:opacity-80 transition-opacity" onError={(e) => e.target.style.display = 'none'} />
                                       </a>
                                    </div>
                                  )}
                                  
                                  <div className="absolute top-2 right-2 flex space-x-1 opacity-0 group-hover/record:opacity-100 transition-opacity">
                                     <button onClick={() => { playAudioFeedback('click'); setEditModal(v); }} className="p-1.5 bg-gray-100 hover:bg-blue-100 hover:text-blue-600 text-gray-500 rounded-lg transition-colors"><Icons.Edit /></button>
                                     <button onClick={() => { playAudioFeedback('warn'); setDeleteConfirm({ serviceId: v.serviceId, date: v.date, fullName: client.fullName }); }} className="p-1.5 bg-gray-100 hover:bg-red-100 hover:text-red-600 text-gray-500 rounded-lg transition-colors"><Icons.Trash /></button>
                                  </div>
                                </div>
                              ))}
                            </div>
                          )}
                        </div>
                      </div>
                    )})}
                  </div>
                );
              })()}
            </div>
          </div>
        )}

        {/* ==========================================
            TAB 3: DASHBOARD
            ========================================== */}
        {activeTab === 'dashboard' && (
          <div className="max-w-[1500px] mx-auto space-y-8 animate-in fade-in duration-300 pb-10">
            <div className="bg-white border border-[#E8DCC8] rounded-3xl p-8 shadow-sm flex flex-col md:flex-row justify-between items-center gap-6">
               <h2 className="text-4xl font-black flex items-center space-x-4 text-[#4A2511]">
                  <div className="w-3 h-12 rounded-full" style={{ backgroundColor: activeTheme.hex }}></div>
                  <span>營業數據儀表板</span>
               </h2>
               <div className="flex bg-[#F6EFE9] rounded-2xl p-1.5 h-[64px]">
                 {['day', 'week', 'month', 'quarter', 'year'].map(p => (
                   <button key={p} onClick={() => { playAudioFeedback('click'); setDashboardPeriod(p); }}
                     className={`px-6 rounded-xl text-xl font-bold capitalize transition-all ${dashboardPeriod === p ? 'text-white shadow-md' : 'text-gray-500 hover:bg-white/50'}`}
                     style={dashboardPeriod === p ? { backgroundColor: activeTheme.hex } : {}}>
                     {p === 'day' ? '今日' : p === 'week' ? '本週' : p === 'month' ? '本月' : p === 'quarter' ? '本季' : '全年'}
                   </button>
                 ))}
               </div>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
               <div className="bg-white border border-[#E8DCC8] rounded-3xl p-6 shadow-sm">
                   <h3 className="text-sm font-bold uppercase tracking-widest text-gray-400 mb-2">平均客單價</h3>
                   <p className="text-4xl font-black text-[#4A2511]">${dashboardData.avgSpending}</p>
               </div>
               <div className="bg-white border border-[#E8DCC8] rounded-3xl p-6 shadow-sm">
                   <h3 className="text-sm font-bold uppercase tracking-widest text-gray-400 mb-2 flex justify-between">
                     <span>新舊客佔比</span>
                     <span className="text-xs bg-red-50 text-red-600 px-2 py-0.5 rounded flex items-center"><Icons.AlertTriangle className="w-3 h-3 mr-1"/> 流失預警: {crmProfiles.filter(p=>p.daysSince>90 && p.visitCount>0).length} 人</span>
                   </h3>
                   <p className="text-4xl font-black text-[#4A2511]"><span className="text-emerald-600">{dashboardData.retentionPct}%</span> <span className="text-amber-600 ml-2">{dashboardData.newPct}%</span></p>
               </div>
               <div className="bg-white border border-[#E8DCC8] rounded-3xl p-6 shadow-sm">
                   <h3 className="text-sm font-bold uppercase tracking-widest text-gray-400 mb-2">零售產品佔比 (Retail)</h3>
                   <p className="text-4xl font-black text-[#4A2511]"><span className="text-[#8B5A2B]">{dashboardData.retailPct}%</span> <span className="text-lg text-gray-400 ml-2">${dashboardData.retailRev.toLocaleString()}</span></p>
               </div>
               <div className="bg-white border border-[#E8DCC8] rounded-3xl p-6 shadow-sm">
                   <h3 className="text-sm font-bold uppercase tracking-widest text-gray-400 mb-2">中英客佔比 (EN/CN)</h3>
                   <p className="text-4xl font-black text-[#4A2511]">{dashboardData.enPct}% / {dashboardData.cnPct}%</p>
               </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
               <div className="text-white rounded-3xl p-10 shadow-xl relative overflow-hidden flex flex-col justify-center h-56" style={{ backgroundColor: activeTheme.hex }}>
                 <div className="absolute right-[-20px] top-[-20px] opacity-10 transform scale-[5]"><Icons.Dollar /></div>
                 <h3 className="text-xl font-bold opacity-80 uppercase tracking-widest mb-3">週期總營業額 (Revenue)</h3>
                 <p className="text-7xl font-black tracking-tight">${dashboardData.totalRev.toLocaleString()}</p>
               </div>
               <div className="bg-white border border-[#E8DCC8] rounded-3xl p-10 shadow-sm flex flex-col justify-center h-56">
                 <h3 className="text-xl font-bold uppercase tracking-widest mb-3 text-gray-500">週期服務客數 (Clients)</h3>
                 <p className="text-7xl font-black text-[#4A2511] tracking-tight">{dashboardData.totalClients} <span className="text-3xl font-bold text-gray-300 ml-3">位</span></p>
               </div>
            </div>

            {/* CHARTS */}
            <div className="bg-white border border-[#E8DCC8] rounded-3xl p-10 shadow-sm flex flex-col h-[400px]">
                <div className="flex justify-between items-center mb-8">
                  <h3 className="text-2xl font-black text-[#4A2511]">營收趨勢 (Monthly Revenue)</h3>
                  <select value={revenueMonths} onChange={(e) => setRevenueMonths(Number(e.target.value))} className="bg-[#F6EFE9] border border-[#E8DCC8] rounded-xl px-4 py-2 font-bold text-[#4A2511] outline-none cursor-pointer">
                    <option value={3}>近 3 個月</option>
                    <option value={6}>近 6 個月</option>
                    <option value={12}>近 1 年</option>
                  </select>
                </div>
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={dashboardData.monthlyChart} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E8DCC8" />
                    <XAxis dataKey="month" tick={{fill: '#8B5A2B', fontWeight: 'bold'}} axisLine={false} tickLine={false} />
                    <YAxis tick={{fill: '#8B5A2B', fontWeight: 'bold'}} axisLine={false} tickLine={false} tickFormatter={(val) => `$${val}`} />
                    <Tooltip formatter={(value) => `$${value}`} contentStyle={{borderRadius: '12px', fontWeight: 'bold', fontSize: '16px', border: 'none', boxShadow: '0 10px 25px rgba(0,0,0,0.1)'}} />
                    <Line type="monotone" dataKey="revenue" stroke={activeTheme.hex} strokeWidth={4} dot={{r: 6, fill: activeTheme.hex, strokeWidth: 2, stroke: 'white'}} activeDot={{r: 8}} />
                  </LineChart>
                </ResponsiveContainer>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 h-[500px]">
              <div className="bg-white border border-[#E8DCC8] rounded-3xl p-10 shadow-sm flex flex-col">
                <h3 className="text-2xl font-black mb-8 text-center text-[#4A2511]">設計師業績分佈 (受上方期間連動)</h3>
                {dashboardData.stylistChart.length > 0 ? (
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={dashboardData.stylistChart.sort((a,b) => b.value - a.value)} layout="vertical" margin={{ top: 0, right: 30, left: 40, bottom: 0 }}>
                      <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="#E8DCC8" />
                      <XAxis type="number" hide />
                      <YAxis dataKey="name" type="category" axisLine={false} tickLine={false} tick={{ fill: '#4A2511', fontSize: 15, fontWeight: 'bold' }} width={80}/>
                      <Tooltip cursor={{fill: 'transparent'}} formatter={(value) => `$${value.toLocaleString()}`} contentStyle={{borderRadius: '16px', fontWeight: 'bold', fontSize: '18px', border: 'none', boxShadow: '0 10px 25px rgba(0,0,0,0.1)'}}/>
                      <Bar dataKey="value" radius={[0, 12, 12, 0]} barSize={40}>
                        {dashboardData.stylistChart.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={STYLIST_THEMES[entry.name]?.hex || CHART_COLORS[index % CHART_COLORS.length]} />
                        ))}
                      </Bar>
                    </BarChart>
                  </ResponsiveContainer>
                ) : <div className="flex-1 flex items-center justify-center text-2xl font-bold text-gray-300">尚無數據</div>}
              </div>

              <div className="bg-white border border-[#E8DCC8] rounded-3xl p-10 shadow-sm flex flex-col">
                <h3 className="text-2xl font-black mb-8 text-center text-[#4A2511]">熱門服務排行</h3>
                {dashboardData.serviceChart.length > 0 ? (
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={dashboardData.serviceChart} layout="vertical" margin={{ top: 0, right: 30, left: 40, bottom: 0 }}>
                      <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="#E8DCC8" />
                      <XAxis type="number" hide />
                      <YAxis dataKey="name" type="category" axisLine={false} tickLine={false} tick={{ fill: '#4A2511', fontSize: 13, fontWeight: 'bold' }} width={160}/>
                      <Tooltip cursor={{fill: 'transparent'}} contentStyle={{borderRadius: '16px', fontWeight: 'bold', fontSize: '18px', border: 'none', boxShadow: '0 10px 25px rgba(0,0,0,0.1)'}}/>
                      <Bar dataKey="count" fill={activeTheme.hex} radius={[0, 12, 12, 0]} barSize={40} />
                    </BarChart>
                  </ResponsiveContainer>
                ) : <div className="flex-1 flex items-center justify-center text-2xl font-bold text-gray-300">尚無數據</div>}
              </div>
            </div>

            {/* TRANSACTION LIST SECTION */}
            <div className="bg-white border border-[#E8DCC8] rounded-3xl p-8 shadow-sm flex flex-col">
               <h3 className="text-2xl font-black mb-6 text-[#4A2511]">交易明細總表 (Transaction Records)</h3>
               <div className="overflow-x-auto custom-scrollbar max-h-[500px]">
                 <table className="w-full text-left text-sm whitespace-nowrap">
                   <thead className="bg-[#F6EFE9] sticky top-0 z-10 text-[#4A2511]">
                     <tr>
                       <th className="p-4 font-bold rounded-tl-xl">日期</th>
                       <th className="p-4 font-bold">交易單號</th>
                       <th className="p-4 font-bold">客戶姓名</th>
                       <th className="p-4 font-bold">設計師</th>
                       <th className="p-4 font-bold">服務/產品項目</th>
                       <th className="p-4 font-bold">支付方式</th>
                       <th className="p-4 font-bold text-right rounded-tr-xl">總額</th>
                     </tr>
                   </thead>
                   <tbody className="divide-y divide-[#E8DCC8]">
                     {dashboardData.filteredRecords.sort((a,b) => String(b.date || '').localeCompare(String(a.date || ''))).map((r, i) => (
                       <tr key={i} className="hover:bg-gray-50 transition-colors">
                         <td className="p-4 font-bold text-gray-600">{r.date}</td>
                         <td className="p-4 font-mono text-gray-400">{r.serviceId}</td>
                         <td className="p-4 font-black text-[#4A2511]">{r.firstName || r.name}</td>
                         <td className="p-4">
                            <span className="px-2 py-1 rounded-md text-white text-xs font-bold shadow-sm" style={{backgroundColor: STYLIST_THEMES[r.stylist]?.hex || '#595959'}}>{r.stylist}</span>
                         </td>
                         <td className="p-4 text-gray-600 max-w-[250px] truncate" title={`${r.services} ${r.retailItems ? `| 🛒 ${r.retailItems}` : ''}`}>
                           {r.services} {r.retailItems && <span className="text-[#8B5A2B] ml-1 font-bold">🛒 {r.retailItems}</span>}
                         </td>
                         <td className="p-4 font-bold text-gray-500">{r.paymentMethod}</td>
                         <td className="p-4 font-black text-[#4A2511] text-right text-lg">${r.price}</td>
                       </tr>
                     ))}
                   </tbody>
                 </table>
                 {dashboardData.filteredRecords.length === 0 && <div className="py-10 text-center text-xl text-gray-300 font-bold">此期間無交易紀錄</div>}
               </div>
            </div>
          </div>
        )}

        {/* ==========================================
            TAB 4: DATA HUB
            ========================================== */}
        {activeTab === 'datahub' && (
          <div className="max-w-[1500px] mx-auto space-y-8 animate-in fade-in duration-300 pb-10">
            <div className="bg-white border border-[#E8DCC8] rounded-3xl p-8 shadow-sm flex items-center gap-4">
               <h2 className="text-4xl font-black flex items-center space-x-4 text-[#4A2511]">
                  <div className="w-3 h-12 rounded-full" style={{ backgroundColor: activeTheme.hex }}></div>
                  <span>系統資料中心 (Data Hub)</span>
               </h2>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* IMPORT & RESTORE SECTION */}
                <div className="bg-white border border-[#E8DCC8] rounded-3xl p-8 shadow-sm flex flex-col">
                    <h3 className="text-2xl font-black text-[#4A2511] mb-6 border-b border-gray-100 pb-4 flex items-center gap-2">
                       <Icons.Upload /> <span>大量資料匯入與還原 (Import & Restore)</span>
                    </h3>

                    <div className="flex space-x-2 bg-[#F6EFE9] p-1 rounded-2xl mb-6">
                      <button onClick={() => setImportMode('csv_paste')} className={`flex-1 py-3 rounded-xl font-bold transition-all ${importMode === 'csv_paste' ? 'bg-white shadow text-[#8B5A2B]' : 'text-gray-500'}`}>📋 貼上 CSV</button>
                      <button onClick={() => setImportMode('csv_url')} className={`flex-1 py-3 rounded-xl font-bold transition-all ${importMode === 'csv_url' ? 'bg-white shadow text-[#8B5A2B]' : 'text-gray-500'}`}>🔗 Sheet 連結</button>
                      <button onClick={() => setImportMode('json')} className={`flex-1 py-3 rounded-xl font-bold transition-all ${importMode === 'json' ? 'bg-white shadow text-[#8B5A2B]' : 'text-gray-500'}`}>📦 JSON 還原</button>
                    </div>

                    <div className="flex-1 overflow-y-auto mb-6 custom-scrollbar min-h-[250px]">
                      {importMode === 'csv_paste' && (
                        <div className="animate-in fade-in">
                          <p className="text-sm font-bold text-gray-500 mb-2">從 Google Sheet 或 Excel 全選複製，並貼在下方：</p>
                          <textarea rows={8} value={importInput} onChange={(e) => setImportInput(e.target.value)} placeholder="支援檔案總表或交易紀錄 (以 Tab 或逗號分隔)" className="w-full bg-gray-50 border border-gray-200 rounded-xl p-4 text-base font-mono focus:outline-none focus:border-[#8B5A2B]" />
                        </div>
                      )}
                      
                      {importMode === 'csv_url' && (
                        <div className="animate-in fade-in">
                          <p className="text-sm font-bold text-gray-500 mb-2">請貼上 Google Sheet 共用連結 (須設為「知道連結的人均可檢視」)：</p>
                          <input type="text" value={importInput} onChange={(e) => setImportInput(e.target.value)} placeholder="https://docs.google.com/spreadsheets/d/..." className="w-full bg-gray-50 border border-gray-200 rounded-xl p-4 text-base font-mono focus:outline-none focus:border-[#8B5A2B]" />
                        </div>
                      )}

                      {importMode === 'json' && (
                        <div className="flex flex-col items-center justify-center p-12 border-2 border-dashed border-gray-300 rounded-2xl bg-gray-50 animate-in fade-in">
                          <input type="file" accept=".json" onChange={handleJSONImport} className="hidden" id="json-upload" />
                          <label htmlFor="json-upload" className="cursor-pointer flex flex-col items-center space-y-4">
                             <div className="p-5 bg-white rounded-full shadow-sm text-gray-400"><Icons.Upload /></div>
                             <span className="font-bold text-gray-600 text-lg">點擊上傳系統 JSON 備份檔</span>
                          </label>
                        </div>
                      )}
                    </div>

                    {importMode !== 'json' && (
                      <button onClick={() => {
                        playAudioFeedback('click');
                        if(importMode === 'csv_paste') processCSVImport(importInput);
                        if(importMode === 'csv_url') handleFetchCSV(importInput);
                      }} className="w-full py-4 rounded-xl text-xl font-bold text-white shadow-lg bg-[#8B5A2B] hover:opacity-90 mt-auto">開始解析並匯入</button>
                    )}
                </div>

                {/* EXPORT, BACKUP & CLOUD SYNC SECTION */}
                <div className="flex flex-col gap-6">
                  
                  {/* CLOUD SYNC MODULE */}
                  <div className="bg-white border border-[#E8DCC8] rounded-3xl p-8 shadow-sm flex flex-col relative overflow-hidden">
                      {isSyncing && (
                         <div className="absolute inset-0 bg-white/80 backdrop-blur-sm flex flex-col items-center justify-center z-10">
                            <span className="animate-spin rounded-full h-12 w-12 border-b-4 border-[#8B5A2B] mb-4"></span>
                            <span className="text-[#8B5A2B] font-bold text-lg">正在與 Google Drive 同步...</span>
                         </div>
                      )}
                      <h3 className="text-2xl font-black text-[#4A2511] mb-6 border-b border-gray-100 pb-4 flex items-center gap-2">
                         <Icons.Cloud /> <span>Google Drive 雲端自動同步</span>
                      </h3>
                      
                      <div className="mb-5">
                         <label className="block text-sm font-bold uppercase tracking-wider mb-2 text-gray-500 flex items-center gap-1"><Icons.Key /> <span>專屬 Web API 網址 (GAS URL)</span></label>
                         <input type="text" placeholder="請貼上部署好的 Google Apps Script 網址..." value={driveApiUrl} onChange={(e) => setDriveApiUrl(e.target.value)}
                                className="w-full bg-blue-50 border-blue-200 border rounded-xl py-3 px-4 text-sm font-mono focus:outline-none focus:border-blue-400 text-blue-900" />
                         <p className="text-xs text-gray-400 mt-2 font-bold">*請參閱隨附的部署教學，建立綁定您專屬資料夾的 API 橋接器。</p>
                      </div>

                      <div className="flex gap-4">
                         <button onClick={handleCloudBackup} disabled={isSyncing} className="flex-1 flex flex-col items-center justify-center p-4 bg-[#8B5A2B] text-white hover:bg-[#6D3A14] rounded-2xl transition-colors shadow-lg">
                            <Icons.Upload />
                            <span className="font-bold mt-1">一鍵上傳備份至雲端</span>
                         </button>
                         <button onClick={handleCloudRestore} disabled={isSyncing} className="flex-1 flex flex-col items-center justify-center p-4 bg-emerald-600 text-white hover:bg-emerald-700 rounded-2xl transition-colors shadow-lg">
                            <Icons.Download />
                            <span className="font-bold mt-1">從雲端還原至本機</span>
                         </button>
                      </div>
                  </div>

                  {/* EXPORT MODULE */}
                  <div className="bg-white border border-[#E8DCC8] rounded-3xl p-8 shadow-sm flex flex-col flex-1">
                      <h3 className="text-2xl font-black text-[#4A2511] mb-6 border-b border-gray-100 pb-4 flex items-center gap-2">
                         <Icons.Download /> <span>實體檔案匯出 (Local Export)</span>
                      </h3>
                      
                      <div className="space-y-4 flex-1">
                          <button onClick={handleCRMCSVExport} className="w-full flex items-center justify-between p-6 bg-gray-50 hover:bg-[#E8DCC8]/30 rounded-2xl transition-colors border border-gray-100 group">
                               <div className="flex flex-col items-start">
                                 <span className="text-xl font-bold text-[#4A2511]">匯出客戶總表 (CSV)</span>
                                 <span className="text-gray-500 font-bold text-sm mt-1">適用於 EDM 派發與行銷受眾分析</span>
                               </div>
                               <div className="text-gray-400 group-hover:text-[#8B5A2B] transition-colors"><Icons.Download /></div>
                            </button>
                            
                            <button onClick={handleTransactionCSVExport} className="w-full flex items-center justify-between p-6 bg-gray-50 hover:bg-[#E8DCC8]/30 rounded-2xl transition-colors border border-gray-100 group">
                               <div className="flex flex-col items-start">
                                 <span className="text-xl font-bold text-[#4A2511]">匯出交易明細 (CSV)</span>
                                 <span className="text-gray-500 font-bold text-sm mt-1">適用於會計記帳、業績結算與趨勢分析</span>
                               </div>
                               <div className="text-gray-400 group-hover:text-[#8B5A2B] transition-colors"><Icons.Download /></div>
                            </button>
                            
                            <div className="pt-4 mt-4 border-t border-gray-100">
                               <button onClick={handleJSONExport} className="w-full flex items-center justify-between p-6 bg-emerald-50 hover:bg-emerald-100 rounded-2xl transition-colors border border-emerald-100 group">
                                  <div className="flex flex-col items-start">
                                    <span className="text-xl font-bold text-emerald-800">完整系統備份 (JSON)</span>
                                    <span className="text-emerald-600/80 font-bold text-sm mt-1">下載全站結構化資料以防遺失 (建議每週執行)</span>
                                  </div>
                                  <div className="text-emerald-500 group-hover:text-emerald-700 transition-colors"><Icons.Save /></div>
                               </button>
                            </div>
                        </div>
                        
                        {/* RESET DATABASE BUTTON */}
                        <div className="mt-8 pt-6 border-t border-gray-100">
                           <button onClick={() => setShowResetConfirm(true)} className="w-full flex items-center justify-center space-x-2 p-4 bg-red-50 hover:bg-red-500 hover:text-white text-red-500 rounded-2xl transition-colors border border-red-100 font-bold">
                              <Icons.Trash /> <span>系統重置 (Factory Reset)</span>
                           </button>
                        </div>
                    </div>
                </div>
            </div>
          </div>
        )}
      </main>

      {/* ==========================================
          MODALS
          ========================================== */}
      {showSuccessModal && (
        <div className="fixed inset-0 bg-[#4A2511]/60 backdrop-blur-sm flex items-center justify-center z-[100] p-4">
          <div className="bg-white rounded-[3rem] max-w-lg w-full p-12 text-center shadow-2xl animate-in zoom-in-95 duration-300">
            <div className="w-28 h-28 bg-emerald-50 text-emerald-500 rounded-full flex items-center justify-center mx-auto mb-8 shadow-inner border-4 border-white"><Icons.Check /></div>
            <h3 className="text-4xl font-black mb-4 text-[#4A2511]">結帳成功！</h3>
            <button onClick={() => { playAudioFeedback('click'); setShowSuccessModal(false); }} className="w-full text-white font-black py-5 rounded-2xl text-2xl transition-all shadow-lg hover:opacity-90" style={{ backgroundColor: activeTheme.hex }}>完成 (Done)</button>
          </div>
        </div>
      )}

      {deleteConfirm && (
        <div className="fixed inset-0 bg-red-900/60 backdrop-blur-sm flex items-center justify-center z-[100] p-4">
          <div className="bg-white rounded-[2rem] max-w-md w-full p-8 text-center shadow-2xl animate-in zoom-in-95">
            <div className="w-20 h-20 bg-red-50 text-red-500 rounded-full flex items-center justify-center mx-auto mb-6"><Icons.Trash /></div>
            <h3 className="text-3xl font-black mb-2 text-[#4A2511]">確認刪除紀錄？</h3>
            <p className="text-lg text-gray-500 font-bold mb-8">將永久刪除 {deleteConfirm.fullName} 於 {deleteConfirm.date} 的服務紀錄，此操作無法復原。</p>
            <div className="flex space-x-4">
               <button onClick={() => setDeleteConfirm(null)} className="flex-1 py-4 rounded-xl text-xl font-bold bg-gray-100 text-gray-600 hover:bg-gray-200">取消</button>
               <button onClick={() => {
                  playAudioFeedback('success');
                  setHistoryRecords(prev => prev.filter(r => r.serviceId !== deleteConfirm.serviceId));
                  triggerNotification(`已刪除 ${deleteConfirm.fullName} 的服務紀錄`);
                  setDeleteConfirm(null);
               }} className="flex-1 py-4 rounded-xl text-xl font-bold bg-red-500 text-white shadow-lg hover:bg-red-600">確認刪除</button>
            </div>
          </div>
        </div>
      )}

      {editModal && (
        <div className="fixed inset-0 bg-[#4A2511]/60 backdrop-blur-sm flex items-center justify-center z-[100] p-4">
          <form onSubmit={(e) => {
            e.preventDefault();
            playAudioFeedback('success');
            setHistoryRecords(prev => prev.map(r => r.serviceId === editModal.serviceId ? { ...editModal } : r));
            triggerNotification(`已更新服務紀錄！`);
            setEditModal(null);
          }} className="bg-white rounded-[2rem] max-w-2xl w-full p-8 shadow-2xl animate-in zoom-in-95 flex flex-col max-h-[90vh]">
            <h3 className="text-3xl font-black mb-6 text-[#4A2511] flex items-center space-x-3"><Icons.Edit /> <span>編輯紀錄 ({editModal.date})</span></h3>
            <div className="overflow-y-auto custom-scrollbar pr-2 space-y-5 mb-6">
              <div><label className="block text-sm font-bold uppercase tracking-wider mb-2 text-gray-500">消費總結金額</label><input type="number" value={editModal.price} onChange={e => setEditModal({...editModal, price: e.target.value})} className="w-full bg-[#F6EFE9] border-transparent rounded-xl py-3 px-4 text-2xl font-black outline-none focus:border-[#8B5A2B] border" /></div>
              
              <div>
                <label className="block text-sm font-bold uppercase tracking-wider mb-2 text-gray-500">服務項目 (點擊快速選擇)</label>
                <div className="flex flex-wrap gap-2 mb-3">
                  {hairServices.map(service => {
                    const isSelected = (editModal.services || '').includes(service);
                    return (
                      <button
                        key={service}
                        type="button"
                        onClick={() => {
                          let sArr = (editModal.services || '').split(', ').filter(Boolean);
                          if (isSelected) {
                            sArr = sArr.filter(s => s !== service && s !== '');
                          } else {
                            sArr.push(service);
                          }
                          setEditModal({...editModal, services: sArr.join(', ')});
                        }}
                        className={`px-3 py-1.5 rounded-lg text-sm font-bold border-2 transition-all ${isSelected ? 'shadow-sm text-white' : 'border-transparent bg-gray-100 text-gray-500 hover:bg-gray-200'}`}
                        style={isSelected ? { backgroundColor: '#8B5A2B', borderColor: '#8B5A2B' } : {}}
                      >
                        {service}
                      </button>
                    )
                  })}
                </div>
                <input type="text" placeholder="+ 手動輸入其他服務..." value={editModal.services || ''} onChange={e => setEditModal({...editModal, services: e.target.value})} className="w-full bg-[#F6EFE9] border-transparent rounded-xl py-3 px-4 text-xl font-bold outline-none focus:border-[#8B5A2B] border" />
              </div>

              <div><label className="block text-sm font-bold uppercase tracking-wider mb-2 text-gray-500">零售產品</label><input type="text" value={editModal.retailItems || ''} onChange={e => setEditModal({...editModal, retailItems: e.target.value})} className="w-full bg-[#F6EFE9] border-transparent rounded-xl py-3 px-4 text-lg font-bold outline-none focus:border-[#8B5A2B] border" /></div>
              <div><label className="block text-sm font-bold uppercase tracking-wider mb-2 text-gray-500">照片連結</label><input type="url" value={editModal.photoLink || ''} onChange={e => setEditModal({...editModal, photoLink: e.target.value})} placeholder="貼上照片的網址 (例如 IG 或圖床連結)..." className="w-full bg-[#F6EFE9] border-transparent rounded-xl py-3 px-4 text-lg font-mono outline-none focus:border-[#8B5A2B] border" /></div>
              <div><label className="block text-sm font-bold uppercase tracking-wider mb-2 text-gray-500">化學配方</label><textarea rows={3} value={editModal.formula} onChange={e => setEditModal({...editModal, formula: e.target.value})} className="w-full bg-[#F6EFE9] border-transparent rounded-xl py-3 px-4 text-lg font-mono outline-none focus:border-[#8B5A2B] border" /></div>
              <div><label className="block text-sm font-bold uppercase tracking-wider mb-2 text-gray-500">備註</label><textarea rows={2} value={editModal.notes} onChange={e => setEditModal({...editModal, notes: e.target.value})} className="w-full bg-[#F6EFE9] border-transparent rounded-xl py-3 px-4 text-lg font-bold outline-none focus:border-[#8B5A2B] border" /></div>
            </div>
            <div className="flex space-x-4 shrink-0 mt-auto">
               <button type="button" onClick={() => setEditModal(null)} className="flex-1 py-4 rounded-xl text-xl font-bold bg-gray-100 text-gray-600 hover:bg-gray-200">取消</button>
               <button type="submit" className="flex-1 py-4 rounded-xl text-xl font-bold text-white shadow-lg" style={{ backgroundColor: activeTheme.hex }}>儲存更新</button>
            </div>
          </form>
        </div>
      )}

      {profileEditData && (
        <div className="fixed inset-0 bg-[#4A2511]/60 backdrop-blur-sm flex items-center justify-center z-[100] p-4">
          <form onSubmit={(e) => {
            e.preventDefault();
            playAudioFeedback('success');
            setHistoryRecords(prev => prev.map(r => r.customerId === profileEditData.customerId ? { 
                ...r, firstName: document.getElementById('edit-name').value, gender: e.target.gender.value, language: e.target.language.value, phone: e.target.phone.value, email: e.target.email.value, birthMonth: e.target.birthMonth.value
            } : r));
            triggerNotification(`已更新客戶檔案！`);
            setProfileEditData(null);
          }} className="bg-white rounded-[2rem] max-w-lg w-full p-8 shadow-2xl animate-in zoom-in-95 flex flex-col">
            <h3 className="text-3xl font-black mb-6 text-[#4A2511] flex items-center space-x-3"><Icons.Edit /> <span>編輯客戶基本資料</span></h3>
            <div className="space-y-4 mb-8">
              <div>
                 <label className="block text-sm font-bold uppercase mb-2 text-gray-500">姓名 (Name)</label>
                 <div className="relative">
                    <input type="text" id="edit-name" defaultValue={profileEditData.fullName} required className="w-full bg-[#F6EFE9] rounded-xl py-3 px-4 pr-10 font-bold outline-none border focus:border-[#8B5A2B]" />
                    <button type="button" onClick={() => { document.getElementById('edit-name').value = ''; document.getElementById('edit-name').focus(); }} className="absolute right-2 top-1/2 -translate-y-1/2 p-1 text-gray-400 hover:bg-gray-200 rounded-full transition-colors"><Icons.X className="w-4 h-4" /></button>
                 </div>
              </div>
              <div className="grid grid-cols-3 gap-3">
                <div><label className="block text-sm font-bold uppercase mb-2 text-gray-500">語言</label><select name="language" defaultValue={profileEditData.language} className="w-full bg-[#F6EFE9] rounded-xl py-3 px-3 font-bold outline-none border focus:border-[#8B5A2B]"><option value="CN">CN</option><option value="EN">EN</option></select></div>
                <div><label className="block text-sm font-bold uppercase mb-2 text-gray-500">性別</label><select name="gender" defaultValue={profileEditData.gender} className="w-full bg-[#F6EFE9] rounded-xl py-3 px-3 font-bold outline-none border focus:border-[#8B5A2B]"><option value="Female">女</option><option value="Male">男</option></select></div>
                <div><label className="block text-sm font-bold uppercase mb-2 text-gray-500">生日月份</label><select name="birthMonth" defaultValue={profileEditData.birthMonth} className="w-full bg-[#F6EFE9] rounded-xl py-3 px-3 font-bold outline-none border focus:border-[#8B5A2B]"><option value="">- 無 -</option>{['1月','2月','3月','4月','5月','6月','7月','8月','9月','10月','11月','12月'].map(m => <option key={m} value={m}>{m}</option>)}</select></div>
              </div>
              <div className="grid grid-cols-2 gap-3">
                 <div><label className="block text-sm font-bold uppercase mb-2 text-gray-500">電話</label><input type="text" name="phone" defaultValue={profileEditData.phone} className="w-full bg-[#F6EFE9] rounded-xl py-3 px-4 font-bold outline-none border focus:border-[#8B5A2B]" /></div>
                 <div><label className="block text-sm font-bold uppercase mb-2 text-gray-500">Email</label><input type="email" name="email" defaultValue={profileEditData.email} className="w-full bg-[#F6EFE9] rounded-xl py-3 px-4 font-bold outline-none border focus:border-[#8B5A2B]" /></div>
              </div>
            </div>
            <div className="flex space-x-4 shrink-0 mt-auto">
               <button type="button" onClick={() => setProfileEditData(null)} className="flex-1 py-4 rounded-xl text-xl font-bold bg-gray-100 text-gray-600 hover:bg-gray-200">取消</button>
               <button type="submit" className="flex-1 py-4 rounded-xl text-xl font-bold text-white shadow-lg bg-[#8B5A2B]">儲存更新</button>
            </div>
          </form>
        </div>
      )}

      {clientDeleteConfirm && (
        <div className="fixed inset-0 bg-red-900/60 backdrop-blur-sm flex items-center justify-center z-[100] p-4">
          <div className="bg-white rounded-[2rem] max-w-md w-full p-8 text-center shadow-2xl animate-in zoom-in-95">
            <div className="w-20 h-20 bg-red-50 text-red-500 rounded-full flex items-center justify-center mx-auto mb-6"><Icons.Trash /></div>
            <h3 className="text-3xl font-black mb-2 text-[#4A2511]">刪除整個客戶檔案？</h3>
            <p className="text-lg text-gray-500 font-bold mb-8">您即將永久刪除 <span className="text-red-500">{clientDeleteConfirm.fullName}</span> 包含其 {clientDeleteConfirm.visitCount} 次歷史紀錄，此操作無法復原。</p>
            <div className="flex space-x-4">
               <button onClick={() => setClientDeleteConfirm(null)} className="flex-1 py-4 rounded-xl text-xl font-bold bg-gray-100 text-gray-600 hover:bg-gray-200">取消</button>
               <button onClick={() => {
                  playAudioFeedback('success');
                  setHistoryRecords(prev => prev.filter(r => r.customerId !== clientDeleteConfirm.customerId));
                  triggerNotification(`已刪除 ${clientDeleteConfirm.fullName} 的所有檔案`);
                  setClientDeleteConfirm(null);
               }} className="flex-1 py-4 rounded-xl text-xl font-bold bg-red-500 text-white shadow-lg hover:bg-red-600">確認刪除</button>
            </div>
          </div>
        </div>
      )}

      {profileAddModal && (
        <div className="fixed inset-0 bg-[#4A2511]/60 backdrop-blur-sm flex items-center justify-center z-[100] p-4">
          <form onSubmit={(e) => {
            e.preventDefault();
            playAudioFeedback('success');
            const newRecord = {
                 customerId: getNextCustomerId(historyRecords), serviceId: generateServiceId(), firstName: document.getElementById('add-name').value, phone: e.target.phone.value, email: e.target.email.value, language: e.target.language.value, gender: e.target.gender.value, birthMonth: e.target.birthMonth.value, customerSource: `手動新增 (${e.target.source.value})`, date: new Date().toISOString().split('T')[0], services: '建立檔案', price: '0', paymentMethod: 'Others', stylist: 'Others', isProfileOnly: true, timestamp: new Date().toISOString()
            };
            setHistoryRecords(prev => [newRecord, ...prev]);
            triggerNotification(`已成功建立新客戶檔案！`);
            setProfileAddModal(false);
          }} className="bg-white rounded-[2rem] max-w-lg w-full p-8 shadow-2xl animate-in zoom-in-95 flex flex-col">
            <h3 className="text-3xl font-black mb-6 text-[#4A2511] flex items-center space-x-3"><Icons.Plus /> <span>手動建立新客戶</span></h3>
            <div className="space-y-4 mb-8">
              <div>
                 <label className="block text-sm font-bold uppercase mb-2 text-gray-500">姓名 (Name)</label>
                 <div className="relative">
                    <input type="text" id="add-name" required placeholder="輸入姓名..." className="w-full bg-[#F6EFE9] rounded-xl py-3 px-4 pr-10 font-bold outline-none border focus:border-[#8B5A2B]" />
                    <button type="button" onClick={() => { document.getElementById('add-name').value = ''; document.getElementById('add-name').focus(); }} className="absolute right-2 top-1/2 -translate-y-1/2 p-1 text-gray-400 hover:bg-gray-200 rounded-full transition-colors"><Icons.X className="w-4 h-4" /></button>
                 </div>
              </div>
              <div className="grid grid-cols-3 gap-3">
                <div><label className="block text-sm font-bold uppercase mb-2 text-gray-500">語言</label><select name="language" className="w-full bg-[#F6EFE9] rounded-xl py-3 px-3 font-bold outline-none border focus:border-[#8B5A2B]"><option value="CN">CN</option><option value="EN">EN</option></select></div>
                <div><label className="block text-sm font-bold uppercase mb-2 text-gray-500">性別</label><select name="gender" className="w-full bg-[#F6EFE9] rounded-xl py-3 px-3 font-bold outline-none border focus:border-[#8B5A2B]"><option value="Female">女</option><option value="Male">男</option></select></div>
                <div><label className="block text-sm font-bold uppercase mb-2 text-gray-500">生日月份</label><select name="birthMonth" className="w-full bg-[#F6EFE9] rounded-xl py-3 px-3 font-bold outline-none border focus:border-[#8B5A2B]"><option value="">- 無 -</option>{['1月','2月','3月','4月','5月','6月','7月','8月','9月','10月','11月','12月'].map(m => <option key={m} value={m}>{m}</option>)}</select></div>
              </div>
              <div className="grid grid-cols-2 gap-3">
                 <div><label className="block text-sm font-bold uppercase mb-2 text-gray-500">聯絡電話</label><input type="text" name="phone" placeholder="自由輸入..." className="w-full bg-[#F6EFE9] rounded-xl py-3 px-4 font-bold outline-none border focus:border-[#8B5A2B]" /></div>
                 <div><label className="block text-sm font-bold uppercase mb-2 text-gray-500">Email</label><input type="email" name="email" placeholder="@" className="w-full bg-[#F6EFE9] rounded-xl py-3 px-4 font-bold outline-none border focus:border-[#8B5A2B]" /></div>
              </div>
              <div><label className="block text-sm font-bold uppercase mb-2 text-gray-500">來源 (Source)</label><select name="source" className="w-full bg-[#F6EFE9] rounded-xl py-3 px-4 font-bold outline-none border focus:border-[#8B5A2B]"><option>Walk-in</option><option>Referral</option><option>Tourist</option><option>Google</option><option>IG/Facebook</option></select></div>
            </div>
            <div className="flex space-x-4 shrink-0 mt-auto">
               <button type="button" onClick={() => setProfileAddModal(false)} className="flex-1 py-4 rounded-xl text-xl font-bold bg-gray-100 text-gray-600 hover:bg-gray-200">取消</button>
               <button type="submit" className="flex-1 py-4 rounded-xl text-xl font-bold text-white shadow-lg bg-[#8B5A2B]">建立檔案</button>
            </div>
          </form>
        </div>
      )}

      {/* Services Configuration Modal */}
      {showServicesConfig && (
        <div className="fixed inset-0 bg-[#4A2511]/60 backdrop-blur-sm flex items-center justify-center z-[100] p-4">
          <div className="bg-white rounded-[2rem] max-w-lg w-full p-8 shadow-2xl animate-in zoom-in-95 flex flex-col max-h-[80vh]">
            <h3 className="text-2xl font-black mb-6 text-[#4A2511] flex items-center space-x-3"><Icons.Settings /> <span>自訂服務菜單項目</span></h3>
            
            <div className="overflow-y-auto flex-1 mb-4 custom-scrollbar pr-2">
              <div className="space-y-2">
                {hairServices.map((srv, index) => (
                  <div key={index} className="flex justify-between items-center bg-gray-50 p-3 rounded-xl border border-gray-200">
                    <span className="font-bold text-gray-700">{srv}</span>
                    <button onClick={() => { playAudioFeedback('warn'); setHairServices(prev => prev.filter((_, i) => i !== index)); }} className="text-red-400 hover:text-red-600 p-1"><Icons.Trash /></button>
                  </div>
                ))}
              </div>
            </div>

            <form onSubmit={(e) => {
              e.preventDefault();
              const newSrv = document.getElementById('new-service').value.trim();
              if(newSrv && !hairServices.includes(newSrv)) {
                playAudioFeedback('success');
                setHairServices(prev => [...prev, newSrv]);
                e.target.reset();
              }
            }} className="flex gap-2 mb-6">
              <div className="relative flex-1">
                 <input type="text" id="new-service" placeholder="新增服務名稱..." required className="w-full bg-[#F6EFE9] border-transparent rounded-xl py-3 px-4 pr-10 font-bold outline-none focus:border-[#8B5A2B] border" />
                 <button type="button" onClick={() => { document.getElementById('new-service').value = ''; document.getElementById('new-service').focus(); }} className="absolute right-2 top-1/2 -translate-y-1/2 p-1 text-gray-400 hover:bg-gray-200 rounded-full transition-colors"><Icons.X className="w-4 h-4" /></button>
              </div>
              <button type="submit" className="px-4 py-3 bg-[#8B5A2B] text-white rounded-xl font-bold hover:bg-[#6D3A14] shadow-sm"><Icons.Plus/></button>
            </form>

            <button onClick={() => setShowServicesConfig(false)} className="w-full py-4 rounded-xl text-xl font-bold bg-gray-100 text-gray-600 hover:bg-gray-200 mt-auto">完成 (Done)</button>
          </div>
        </div>
      )}

      {/* Database Reset Confirm Modal */}
      {showResetConfirm && (
        <div className="fixed inset-0 bg-red-900/80 backdrop-blur-md flex items-center justify-center z-[100] p-4">
          <div className="bg-white rounded-[2rem] max-w-md w-full p-8 text-center shadow-2xl animate-in zoom-in-95">
            <div className="w-20 h-20 bg-red-50 text-red-600 rounded-full flex items-center justify-center mx-auto mb-6"><Icons.AlertTriangle /></div>
            <h3 className="text-3xl font-black mb-2 text-red-600">嚴重警告：系統重置</h3>
            <p className="text-lg text-gray-600 font-bold mb-8">此操作將會清空您的 <strong className="text-red-600">所有客戶資料、交易明細與數據報表</strong>，且 <span className="underline">完全無法復原</span>。<br/><br/>您確定已經做好了 JSON 備份嗎？</p>
            <div className="flex space-x-4">
               <button onClick={() => setShowResetConfirm(false)} className="flex-1 py-4 rounded-xl text-xl font-bold bg-gray-100 text-gray-600 hover:bg-gray-200">取消，返回安全區</button>
               <button onClick={handleResetDatabase} className="flex-1 py-4 rounded-xl text-xl font-bold bg-red-600 text-white shadow-lg hover:bg-red-700">我已備份，確認清空</button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
