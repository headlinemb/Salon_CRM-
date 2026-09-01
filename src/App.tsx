import React, { useState, useEffect, useMemo, useRef } from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, CartesianGrid, Legend, ComposedChart, LabelList } from 'recharts';

const Icons = {
  Check: ({ className = "w-5 h-5" }) => <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" /></svg>,
  User: () => <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg>,
  X: ({ className = "w-5 h-5" }) => <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>,
  Gift: () => <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v13m0-13V6a2 2 0 112 2h-2zm0 0V5.5A2.5 2.5 0 109.5 8H12zm-7 4h14M5 12a2 2 0 110-4h14a2 2 0 110 4M5 12v7a2 2 0 002 2h10a2 2 0 002-2v-7" /></svg>,
  Chart: () => <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" /></svg>,
  Database: () => <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4m0 5c0 2.21-3.582 4-8 4s-8-1.79-8-4" /></svg>,
  Upload: () => <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" /></svg>,
  Download: () => <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" /></svg>,
  History: () => <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>,
  Plus: () => <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" /></svg>,
  Minus: () => <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" /></svg>,
  Trash: () => <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>,
  Edit: () => <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" /></svg>,
  Banknote: () => <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" /></svg>,
  CreditCard: () => <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" /></svg>,
  Wallet: () => <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M3 14h18m-9-4v8m-7 0h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" /></svg>,
  AlertTriangle: () => <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" /></svg>,
  Photo: ({ className = "w-5 h-5" }) => <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>,
  Lock: () => <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" /></svg>,
  Refresh: ({ className = "w-5 h-5" }) => <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" /></svg>,
  MessageCircle: () => <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" /></svg>,
  Calendar: () => <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>,
  ChevronLeft: () => <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>,
  ChevronRight: () => <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>,
  Maximize: ({ className = "w-5 h-5" }) => <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4" /></svg>,
  Minimize: ({ className = "w-5 h-5" }) => <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 14h6m0 0v6m0-6l-7 7m17-11h-6m0 0V4m0 6l7-7m-7 17v-6m0 0h6m-6 0l7 7M10 4v6m0 0H4m6 0L3 3" /></svg>,
};

const STYLIST_THEMES = { 'Man': { hex: '#6D3A14', light: '#6D3A1415', shadow: 'rgba(109, 58, 20, 0.3)' }, 'Becky': { hex: '#9F3E3E', light: '#9F3E3E15', shadow: 'rgba(159, 62, 62, 0.3)' }, 'Sammy': { hex: '#2C496A', light: '#2C496A15', shadow: 'rgba(44, 73, 106, 0.3)' }, 'Others': { hex: '#595959', light: '#59595915', shadow: 'rgba(89, 89, 89, 0.3)' } };
const CHART_COLORS = ['#6D3A14', '#9F3E3E', '#2C496A', '#C4A485', '#595959'];
const stylists = ['Man', 'Becky', 'Sammy', 'Others'];
const paymentMethods = [ { id: 'Cash', label: 'Cash', icon: Icons.Banknote }, { id: 'Credit Card', label: 'Credit', icon: Icons.CreditCard }, { id: 'Others', label: 'Others', icon: Icons.Wallet } ];
const SERVICE_DURATIONS = { '剪髮 (Cut)': 60, '洗吹 (Wash & Blow)': 30, '電髮 (Perm)': 150, '全頭染髮 (Color)': 120, '髮根補染 (Root Touch)': 60, '漂髮 (Bleach)': 180, '挑染 (Highlights)': 180, '角蛋白護理 (Keratin)': 120, '頭皮理療 (Treatment)': 60 };
const defaultServices = Object.keys(SERVICE_DURATIONS);
const birthMonthsList = ['1月','2月','3月','4月','5月','6月','7月','8月','9月','10月','11月','12月','不提供'];
const TIME_SLOTS = Array.from({length: 21}, (_, i) => `${Math.floor(i / 2) + 10}:${i % 2 === 0 ? '00' : '30'}`);

let audioCtx = null;
const playAudioFeedback = (type) => {
  try {
    if (!window.AudioContext && !window.webkitAudioContext) return;
    if (!audioCtx) audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    if (audioCtx.state === 'suspended') audioCtx.resume();
    const osc = audioCtx.createOscillator(); const gain = audioCtx.createGain();
    osc.connect(gain); gain.connect(audioCtx.destination);
    if (type === 'click') {
      osc.type = 'sine'; osc.frequency.setValueAtTime(600, audioCtx.currentTime); osc.frequency.exponentialRampToValueAtTime(800, audioCtx.currentTime + 0.02);
      gain.gain.setValueAtTime(0.02, audioCtx.currentTime); gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 0.04);
      osc.start(audioCtx.currentTime); osc.stop(audioCtx.currentTime + 0.04);
    } else if (type === 'warn') {
      osc.type = 'square'; osc.frequency.setValueAtTime(200, audioCtx.currentTime);
      gain.gain.setValueAtTime(0.1, audioCtx.currentTime); gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 0.1);
      osc.start(audioCtx.currentTime); osc.stop(audioCtx.currentTime + 0.1);
    } else if (type === 'cashier') {
      osc.type = 'square'; osc.frequency.setValueAtTime(800, audioCtx.currentTime); osc.frequency.setValueAtTime(1200, audioCtx.currentTime + 0.1);
      gain.gain.setValueAtTime(0.05, audioCtx.currentTime); gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 0.3);
      osc.start(audioCtx.currentTime); osc.stop(audioCtx.currentTime + 0.3);
    }
  } catch (e) {}
};

const parseDateFlexible = (dateStr) => { if (!dateStr) return ''; try { const cleanStr = String(dateStr).trim(); let d = new Date(cleanStr); if (!isNaN(d.getTime())) return d.toLocaleDateString('en-CA'); return cleanStr.split(' ')[0]; } catch (e) { return String(dateStr); } };
const getWaLink = (phone) => phone ? `https://wa.me/852${String(phone).replace(/\D/g, '').slice(-8)}` : '#';
const getFullName = (record) => record ? `${record.firstName || ''} ${record.lastName || ''}`.trim() || record.name || 'Unknown' : 'Unknown';
const parsePriceRobust = (val) => val ? (isNaN(Number(String(val).replace(/[^0-9.-]+/g, ""))) ? 0 : Number(String(val).replace(/[^0-9.-]+/g, ""))) : 0;
const cleanStylistName = (name) => name ? String(name).trim() : 'Others';

export default function App() {
  const [activeTab, setActiveTab] = useState('checkout'); 
  const [crmSortBy, setCrmSortBy] = useState('latestVisit'); 
  const [crmSearchQuery, setCrmSearchQuery] = useState(''); 
  const [expandedHistory, setExpandedHistory] = useState({});
  const [notification, setNotification] = useState(null);
  const [dataHubUnlocked, setDataHubUnlocked] = useState(false);
  const [authPassword, setAuthPassword] = useState('');
  
  const [editModal, setEditModal] = useState(null); 
  const [profileEditData, setProfileEditData] = useState(null);
  const [confirmDialog, setConfirmDialog] = useState(null);
  const [confirmFormulaModal, setConfirmFormulaModal] = useState(null);
  const [showServicesConfig, setShowServicesConfig] = useState(false);
  const [showTagsConfig, setShowTagsConfig] = useState(false);
  const [isProfileExpanded, setIsProfileExpanded] = useState(false);

  const [driveApiUrl, setDriveApiUrl] = useState(() => localStorage.getItem('headline_drive_api_v13_6') || 'https://script.google.com/macros/s/AKfycbxCv4qRXnzrAimYoRfI1fwJLqM4P9NfyAAumRalugmgUhTs0eKEop3Z712JKET8rIgbKQ/exec');
  const [calendarApiUrl, setCalendarApiUrl] = useState(() => localStorage.getItem('headline_calendar_api_v13_6') || 'https://script.google.com/macros/s/AKfycbyuAjmjMvUoJz2ZrMXXCeZ-zn0F9Gk2CG2R1-hyUm8dmd-u76rvkzW0xUJNtMP5nSzFdQ/exec');
  
  const [calendarEvents, setCalendarEvents] = useState([]);
  const [isCalendarLoading, setIsCalendarLoading] = useState(false);
  const [schedViewMode, setSchedViewMode] = useState('day'); 
  const [schedSelectedDate, setSchedSelectedDate] = useState(new Date());
  const [schedDetailModal, setSchedDetailModal] = useState(null);
  const [schedAddEditModal, setSchedAddEditModal] = useState(null);
  const [showSchedNameSuggest, setShowSchedNameSuggest] = useState(false);
  const [schedNameSuggests, setSchedNameSuggests] = useState([]);
  const [schedFilterStylist, setSchedFilterStylist] = useState('All');
  const [currentTime, setCurrentTime] = useState(new Date());

  const [dashboardPeriod, setDashboardPeriod] = useState('month');
  const [dashboardDateRef, setDashboardDateRef] = useState(new Date());
  const [dashboardStartDate, setDashboardStartDate] = useState('');
  const [dashboardEndDate, setDashboardEndDate] = useState('');
  const [hairServices, setHairServices] = useState(() => JSON.parse(localStorage.getItem('headline_services_v11') || JSON.stringify(defaultServices)));
  const [interestTags, setInterestTags] = useState(() => JSON.parse(localStorage.getItem('headline_tags_v1') || JSON.stringify(['白頭髮遮蓋', '想試染髮', '有機/天然品牌', '縮毛矯正', '受損髮質修護'])));
  const [showRetailSection, setShowRetailSection] = useState(false);
  const [isUploadingPhoto, setIsUploadingPhoto] = useState(false);
  const [isSyncing, setIsSyncing] = useState(false);

  useEffect(() => { const interval = setInterval(() => setCurrentTime(new Date()), 60000); return () => clearInterval(interval); }, []);
  useEffect(() => { localStorage.setItem('headline_services_v11', JSON.stringify(hairServices)); }, [hairServices]);
  useEffect(() => { localStorage.setItem('headline_tags_v1', JSON.stringify(interestTags)); }, [interestTags]);
  useEffect(() => { localStorage.setItem('headline_drive_api_v13_6', driveApiUrl); }, [driveApiUrl]);
  useEffect(() => { localStorage.setItem('headline_calendar_api_v13_6', calendarApiUrl); }, [calendarApiUrl]);

  const getApiUrl = (baseUrl, action) => { if (!baseUrl) return ''; try { const url = new URL(baseUrl); url.searchParams.set('action', action); return url.toString(); } catch (e) { return `${baseUrl}?action=${action}`; } };

  const fetchCalendarEvents = async () => {
    if (!calendarApiUrl) return; 
    setIsCalendarLoading(true);
    try { 
        // REMOVED 'headers' to fix CORS preflight issue on Google Apps Script GET request!
        const res = await fetch(getApiUrl(calendarApiUrl, 'get_events')); 
        const data = await res.json(); 
        if (data.status === 'success') {
            setCalendarEvents(data.data || []); 
        } else {
            console.error("Calendar API format mismatch", data);
        }
    } catch (e) { 
        console.error("Calendar Sync Error:", e);
    } finally { 
        setIsCalendarLoading(false); 
    }
  };
  
  const handleGlobalSync = async () => {
    setIsSyncing(true);
    let successCount = 0;
    
    if (driveApiUrl) {
      try {
        // REMOVED headers to fix CORS preflight issue on GET
        const res = await fetch(getApiUrl(driveApiUrl, 'get_all'));
        const result = await res.json();
        if (result.status === 'success' && result.data) {
          setRawHistoryRecords(result.data);
          successCount++;
        }
      } catch(e) { console.error("Drive Sync Fail:", e); }
    }
    
    if (calendarApiUrl) {
      try {
        await fetchCalendarEvents();
        successCount++;
      } catch(e) { console.error("Calendar Sync Fail:", e); }
    }
    
    if (successCount > 0) triggerNotification('✅ 資料同步完成 (Synced)');
    else triggerNotification('❌ 無法連線至雲端 (Sync Failed)');
    
    setIsSyncing(false);
  };

  useEffect(() => {
    handleGlobalSync();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const generateServiceId = () => {
    const d = new Date();
    return `S-${String(d.getFullYear()).slice(-2)}${String(d.getMonth()+1).padStart(2,'0')}${String(d.getDate()).padStart(2,'0')}-${Math.floor(Math.random()*9000+1000)}`;
  };

  const getInitialForm = () => ({ customerId: '', clientType: 'New', sourceDetail: 'Walk-in', referredBy: '', language: '中文', stylist: 'Man', firstName: '', lastName: '', gender: 'Female', phonePrefix: '+852', phone: '', email: '', edmConsent: '', birthMonth: '', customerSource: '熟客 (Regular)', date: new Date().toISOString().split('T')[0], selectedServices: [], customService: '', retailItems: '', retailPrice: '', subtotal: '', discountPct: '0', price: '', paymentMethod: 'Cash', formula: '', interests: [], photoLink: '', serviceId: generateServiceId(), _eventId: null, _stylist: null });

  const [formData, setFormData] = useState(getInitialForm());
  const [submitting, setSubmitting] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [showNameSuggest, setShowNameSuggest] = useState(false);
  const [nameSuggests, setNameSuggests] = useState([]);
  
  const [rawHistoryRecords, setRawHistoryRecords] = useState(() => { try { const parsed = JSON.parse(localStorage.getItem('headline_salon_history_v11') || '[]'); return Array.isArray(parsed) ? parsed.map((r, i) => ({ ...r, serviceId: r.serviceId || `S-OLD-${Date.now()}-${i}` })) : []; } catch(e) { return []; } });
  const historyRecords = useMemo(() => { return rawHistoryRecords.map(r => ({...r, stylist: r.stylist ? String(r.stylist).trim() : 'Unknown', price: Number(String(r.price).replace(/[^0-9.-]+/g, "")) || 0})); }, [rawHistoryRecords]);
  const activeTheme = STYLIST_THEMES[formData.stylist] || STYLIST_THEMES['Man'];
  useEffect(() => { localStorage.setItem('headline_salon_history_v11', JSON.stringify(rawHistoryRecords)); }, [rawHistoryRecords]);

  const triggerNotification = (msg) => { setNotification(msg); setTimeout(() => setNotification(null), 3000); };
  const handleTabChange = (tab) => { playAudioFeedback('click'); setActiveTab(tab); if(tab !== 'datahub') setDataHubUnlocked(false); setIsProfileExpanded(false); };
  const handleInputChange = (field, value) => setFormData(prev => ({ ...prev, [field]: value }));
  const toggleArrayItem = (f, i) => { playAudioFeedback('click'); setFormData(p => ({ ...p, [f]: (p[f]||[]).includes(i) ? p[f].filter(s=>s!==i) : [...(p[f]||[]), i] })); };

  useEffect(() => {
    const finalPrice = Math.round(((parseInt(formData.subtotal)||0) * (1 - (parseInt(formData.discountPct)||0)/100)) + (parseInt(formData.retailPrice)||0));
    setFormData(prev => ({ ...prev, price: finalPrice.toString() }));
  }, [formData.subtotal, formData.retailPrice, formData.discountPct]);

  const getNextCustomerId = (records) => {
    const ids = records.filter(r => r.customerId && r.customerId.startsWith('C')).map(r => parseInt(r.customerId.replace('C', ''), 10)).filter(n => !isNaN(n));
    return `C${ids.length > 0 ? Math.max(...ids) + 1 : 1000}`;
  };

  const crmProfiles = useMemo(() => {
    const profiles = {};
    historyRecords.forEach(record => {
      const rawName = getFullName(record);
      const key = record.customerId ? String(record.customerId).toUpperCase() : rawName.toLowerCase(); 
      if (!profiles[key]) profiles[key] = { customerId: record.customerId || '', fullName: rawName, gender: record.gender || 'Female', language: record.language || '中文', phone: record.phone || '', email: record.email || '', edmConsent: record.edmConsent || '', birthMonth: record.birthMonth || '', source: record.customerSource, totalSpent: 0, visitCount: 0, visits: [], latestFormula: '', latestVisitDate: '1970-01-01', preferences: record.notes || '', preferredStylist: record.stylist, interests: [], latestService: '', referralsMade: 0 };
      const p = profiles[key];
      if (rawName && rawName !== 'Unknown') p.fullName = rawName;
      if (record.phone) p.phone = record.phone;
      if (!record.isProfileOnly) { p.visitCount++; p.totalSpent += record.price; p.visits.push(record); }
      const recDate = parseDateFlexible(record.date);
      if (recDate > p.latestVisitDate && !record.isProfileOnly) {
        p.latestVisitDate = recDate; p.preferredStylist = cleanStylistName(record.stylist);
        if (record.formula) p.latestFormula = record.formula;
        const validSvcs = (record.services||'').split(',').map(s=>s.trim()).filter(s => s && !s.includes('沒有記錄') && !s.includes('系統匯入') && !s.includes('建立檔案'));
        if(validSvcs.length > 0) p.latestService = validSvcs.join(', ');
      }
      if (record.interests) {
          const arr = Array.isArray(record.interests) ? record.interests : String(record.interests).split(',').map(s=>s.trim());
          arr.forEach(i => { if(i && !p.interests.includes(i)) p.interests.push(i) });
      }
    });

    Object.values(profiles).forEach(p => {
        if (p.customerId) {
            p.referralsMade = historyRecords.filter(r => {
                const ref = String(r.referredBy || '').trim().toLowerCase();
                if (!ref) return false;
                return ref.includes(p.customerId.toLowerCase()) || (p.phone && p.phone.length > 5 && ref.includes(p.phone)) || (p.fullName && p.fullName.length > 1 && ref.includes(p.fullName.toLowerCase()));
            }).length;
        }
    });

    let result = Object.values(profiles).map(p => {
      let tags = [];
      if (p.totalSpent >= 8000) tags.push({ label: 'VIP', color: 'bg-amber-100 text-amber-900 border-amber-300' });
      const isReferred = p.visits.some(v => v.customerSource?.includes('Referral') || String(v.referredBy || '').trim() !== '');
      if (p.visitCount === 1) tags.push({ label: isReferred ? '🎁 推薦新客' : '新客', color: isReferred ? 'bg-pink-100 text-pink-800' : 'bg-emerald-100 text-emerald-900' });
      if (p.referralsMade > 0) tags.push({ label: `⭐ 推薦達人 (${p.referralsMade})`, color: 'bg-yellow-100 text-yellow-800' });
      
      let lastVisit = new Date(p.latestVisitDate === '1970-01-01' ? Date.now() : p.latestVisitDate);
      let daysSince = isNaN(lastVisit.getTime()) ? 0 : Math.floor((new Date() - lastVisit) / 86400000);
      if (daysSince > 90 && p.visitCount > 0) tags.push({ label: '⚠️ 流失風險', color: 'bg-red-100 text-red-900 border-red-300' });
      
      p.visits.sort((a,b) => parseDateFlexible(b.date).localeCompare(parseDateFlexible(a.date)));
      return { ...p, tags, daysSince };
    });

    const sortedResult = [...result];
    if (crmSortBy === 'latestVisit') {
        sortedResult.sort((a, b) => {
           const dateA = new Date(a.latestVisitDate === '1970-01-01' ? 0 : a.latestVisitDate).getTime() || 0;
           const dateB = new Date(b.latestVisitDate === '1970-01-01' ? 0 : b.latestVisitDate).getTime() || 0;
           return dateB - dateA;
        });
    }
    if (crmSortBy === 'totalSpent') sortedResult.sort((a, b) => b.totalSpent - a.totalSpent);
    if (crmSortBy === 'visitCount') sortedResult.sort((a, b) => b.visitCount - a.visitCount);
    if (crmSortBy === 'name_asc') sortedResult.sort((a, b) => (a.fullName || '').localeCompare(b.fullName || ''));
    if (crmSortBy === 'stylist') {
        // Enforce specific Stylist Sort Order
        const order = { 'Man': 1, 'Becky': 2, 'Sammy': 3, 'Others': 4 };
        sortedResult.sort((a, b) => (order[a.preferredStylist] || 4) - (order[b.preferredStylist] || 4));
    }
    return sortedResult;
  }, [historyRecords, crmSortBy]);

  const currentProfile = useMemo(() => { if (!formData.customerId) return null; return crmProfiles.find(p => p.customerId === formData.customerId) || null; }, [formData.customerId, crmProfiles]);

  const dashboardData = useMemo(() => {
    const getPeriodRange = (p, date, off) => {
        const d = new Date(date);
        if (p === 'day') { d.setDate(d.getDate() + off); return { start: new Date(d.setHours(0,0,0,0)), end: new Date(d.setHours(23,59,59,999)) }; }
        if (p === 'week') { d.setDate(d.getDate() + (off * 7)); const diff = d.getDate() - d.getDay() + (d.getDay() === 0 ? -6 : 1); const start = new Date(d.setDate(diff)); start.setHours(0,0,0,0); const end = new Date(start); end.setDate(end.getDate() + 6); end.setHours(23,59,59,999); return { start, end }; }
        if (p === 'month') { d.setMonth(d.getMonth() + off); return { start: new Date(d.getFullYear(), d.getMonth(), 1), end: new Date(d.getFullYear(), d.getMonth() + 1, 0, 23, 59, 59, 999) }; }
        if (p === 'year') { d.setFullYear(d.getFullYear() + off); return { start: new Date(d.getFullYear(), 0, 1), end: new Date(d.getFullYear(), 11, 31, 23, 59, 59, 999) }; }
        return { start: new Date(`${dashboardStartDate}T00:00:00`), end: new Date(`${dashboardEndDate}T23:59:59`) };
    };

    const currentRange = getPeriodRange(dashboardPeriod, dashboardDateRef, 0);
    const prevRange = dashboardPeriod !== 'custom' ? getPeriodRange(dashboardPeriod, dashboardDateRef, -1) : null;

    let globalReferralMap = {}; 
    let globalRefTotal = 0, globalRefRev = 0;
    
    // Calculates Top Referrers safely across ALL history regardless of dates
    historyRecords.forEach(r => {
        const isRef = String(r.customerSource || '').includes('Referral') || String(r.customerSource || '').includes('朋友介紹') || String(r.referredBy || '').trim() !== '';
        if (isRef) {
            globalRefTotal++; 
            globalRefRev += r.price;
            const refKey = String(r.referredBy || '').trim();
            if (refKey) {
                if(!globalReferralMap[refKey]) globalReferralMap[refKey] = { name: refKey, count: 0, revenue: 0 };
                globalReferralMap[refKey].count += 1; 
                globalReferralMap[refKey].revenue += r.price;
            }
        }
    });
    const topReferrersList = Object.values(globalReferralMap).sort((a,b) => b.count - a.count).slice(0, 5);

    const getMetrics = (start, end) => {
        const records = historyRecords.filter(r => !r.isProfileOnly && new Date(parseDateFlexible(r.date)) >= start && new Date(parseDateFlexible(r.date)) <= end);
        let m = { rev: 0, clients: records.length, retail: 0, newCus: 0, male: 0, female: 0, en: 0, cn: 0, zh: 0 };
        let dailyMap = {}, serviceMap = {}, stylistMap = { Man: { revenue: 0, count: 0 }, Becky: { revenue: 0, count: 0 }, Sammy: { revenue: 0, count: 0 }, Others: { revenue: 0, count: 0 } }, sourceMap = {};
        
        records.forEach(r => {
            m.rev += r.price; 
            const sSub = parsePriceRobust(r.subtotal), rSub = parsePriceRobust(r.retailPrice);
            if (sSub + rSub > 0) m.retail += (rSub / (sSub + rSub)) * r.price; else if (rSub > 0) m.retail += r.price;
            if (r.gender === 'Male') m.male++; else m.female++;
            if (r.language === 'EN') m.en++; else m.zh++; 
            if (String(r.customerSource || '').includes('新客')) {
                m.newCus++;
                let src = String(r.customerSource || '').includes('Referral') ? '朋友介紹' : (String(r.customerSource || '').includes('IG') || String(r.customerSource || '').includes('FB') ? 'IG/FB' : 'Walk-in');
                sourceMap[src] = (sourceMap[src] || 0) + 1;
            }
            const sty = ['Man', 'Becky', 'Sammy'].includes(cleanStylistName(r.stylist)) ? cleanStylistName(r.stylist) : 'Others';
            stylistMap[sty].revenue += r.price; stylistMap[sty].count += 1;

            const recDate = new Date(parseDateFlexible(r.date));
            if (!isNaN(recDate.getTime())) {
                const dateKey = `${recDate.getMonth()+1}/${recDate.getDate()}`;
                if (!dailyMap[dateKey]) dailyMap[dateKey] = { time: dateKey, count: 0, revenue: 0, isSunday: recDate.getDay()===0, rawDate: recDate.getTime() };
                dailyMap[dateKey].count += 1; dailyMap[dateKey].revenue += r.price;
            }

            (r.services || '').split(',').map(s=>s.trim()).filter(s => s && s!=='系統匯入' && s!=='建立檔案').forEach(s => {
                if(!serviceMap[s]) serviceMap[s] = { name: s, Man: 0, Becky: 0, Sammy: 0, Others: 0, total: 0 };
                serviceMap[s][sty] += 1; serviceMap[s].total += 1;
            });
        });
        
        return { ...m, dailyChart: Object.values(dailyMap).sort((a,b) => a.rawDate - b.rawDate), serviceChart: Object.values(serviceMap).sort((a,b)=>b.total-a.total).slice(0,8), stylistChart: Object.keys(stylistMap).map(k => ({ name: k, ...stylistMap[k] })).sort((a,b)=>b.revenue-a.revenue), sourceChart: Object.keys(sourceMap).map(k => ({ name: k, value: sourceMap[k] })), records };
    };

    const curr = getMetrics(currentRange.start, currentRange.end);
    const prev = prevRange ? getMetrics(prevRange.start, prevRange.end) : null;
    const calcChange = (c, p) => p ? (((c - p) / Math.abs(p)) * 100).toFixed(1) : (c > 0 ? 100 : 0);
    
    return {
        ...curr, start: currentRange.start, end: currentRange.end,
        changes: prev ? { rev: calcChange(curr.rev, prev.rev), clients: calcChange(curr.clients, prev.clients), avg: calcChange(curr.clients?curr.rev/curr.clients:0, prev.clients?prev.rev/prev.clients:0), newCus: calcChange(curr.newCus, prev.newCus) } : null,
        avgSpending: curr.clients ? (curr.rev / curr.clients).toFixed(0) : 0,
        retailPct: curr.rev ? ((curr.retail / curr.rev) * 100).toFixed(1) : 0,
        malePct: curr.clients ? ((curr.male / curr.clients) * 100).toFixed(0) : 0, femalePct: curr.clients ? ((curr.female / curr.clients) * 100).toFixed(0) : 0,
        enPct: (curr.en+curr.zh) ? ((curr.en / (curr.en+curr.zh)) * 100).toFixed(0) : 0, zhPct: (curr.en+curr.zh) ? ((curr.zh / (curr.en+curr.zh)) * 100).toFixed(0) : 0, 
        newCusPct: curr.clients ? ((curr.newCus / curr.clients) * 100).toFixed(0) : 0, retCusPct: curr.clients ? (((curr.clients - curr.newCus) / curr.clients) * 100).toFixed(0) : 0,
        referral: { totalReferred: globalRefTotal, revenue: globalRefRev, topReferrers: topReferrersList }
    };
  }, [historyRecords, dashboardPeriod, dashboardDateRef, dashboardStartDate, dashboardEndDate]);

  const checkConflict = (stylist, dateStr, timeStr, durationMins, excludeEventId = null) => {
    if(!stylist || !dateStr || !timeStr || !durationMins) return false;
    const [hour, min] = timeStr.split(':'); const start = new Date(dateStr); start.setHours(parseInt(hour, 10), parseInt(min, 10), 0); const end = new Date(start.getTime() + parseInt(durationMins, 10) * 60000);
    return calendarEvents.some(e => { if (excludeEventId && e.id === excludeEventId) return false; if (e.stylist !== stylist) return false; const eStart = new Date(e.startTime); const eEnd = new Date(e.endTime); if (isNaN(eStart.getTime()) || isNaN(eEnd.getTime())) return false; return (start < eEnd && eStart < end); });
  };

  const handleSaveCalendarEvent = async (e) => {
    e.preventDefault();
    if (checkConflict(schedAddEditModal.stylist, schedAddEditModal.date, schedAddEditModal.time, schedAddEditModal.duration, schedAddEditModal.id)) { playAudioFeedback('warn'); triggerNotification('⚠️ 警告：該時段已有預約，將強行排入！'); }
    const [hour, min] = schedAddEditModal.time.split(':'); const start = new Date(schedAddEditModal.date); start.setHours(parseInt(hour, 10), parseInt(min, 10), 0); const end = new Date(start.getTime() + (parseInt(schedAddEditModal.duration) || 60) * 60 * 1000);
    const fakeId = schedAddEditModal.id || ('evt_' + Date.now());
    const payload = { action: 'create_event', stylist: schedAddEditModal.stylist, title: `${schedAddEditModal.clientName} | ${schedAddEditModal.service}`, description: schedAddEditModal.phone ? `Phone: ${schedAddEditModal.phone}\n${schedAddEditModal.notes}` : schedAddEditModal.notes, startTime: start.toISOString(), endTime: end.toISOString() };
    setCalendarEvents(prev => [...prev.filter(ev => ev.id !== schedAddEditModal.id), { id: fakeId, ...payload }]); setSchedAddEditModal(null); playAudioFeedback('success');
    if (!calendarApiUrl) return triggerNotification('✅ 已本地新增預約 (未設定 API)');
    
    // POST request is safe from CORS preflight issues when using text/plain
    if (schedAddEditModal.id) { try { await fetch(getApiUrl(calendarApiUrl, 'delete_event'), { method: 'POST', body: JSON.stringify({ action: 'delete_event', stylist: schedAddEditModal.oldStylist, eventId: schedAddEditModal.id }), headers: { 'Content-Type': 'text/plain;charset=utf-8' }}); } catch(err) {} }
    try { triggerNotification('⏳ 雲端同步中...'); const res = await fetch(getApiUrl(calendarApiUrl, 'create_event'), { method: 'POST', body: JSON.stringify(payload), headers: { 'Content-Type': 'text/plain;charset=utf-8' }}); const result = await res.json(); if (result.status === 'success') { triggerNotification('✅ 預約已同步至 Google 日曆！'); fetchCalendarEvents(); } } catch(err) { triggerNotification('❌ 同步失敗'); }
  };

  const handlePeriodChange = (offset) => { playAudioFeedback('click'); if (dashboardPeriod === 'custom') return; const d = new Date(dashboardDateRef); if (dashboardPeriod === 'day') d.setDate(d.getDate() + offset); if (dashboardPeriod === 'week') d.setDate(d.getDate() + (offset * 7)); if (dashboardPeriod === 'month') d.setMonth(d.getMonth() + offset); if (dashboardPeriod === 'year') d.setFullYear(d.getFullYear() + offset); setDashboardDateRef(d); };

  const handleNameSearchInput = (e) => {
    const val = e.target.value; setFormData(prev => ({ ...prev, firstName: val }));
    if (val.trim().length > 0) { const matches = crmProfiles.filter(p => String(p.fullName || '').toLowerCase().includes(val.toLowerCase()) || (p.phone && String(p.phone).includes(val))); setNameSuggests(matches); setShowNameSuggest(matches.length > 0); } else { setShowNameSuggest(false); setFormData(prev => ({ ...prev, customerId: '' })); }
  };

  const handleSelectSuggest = (profile, extraData = {}) => {
    playAudioFeedback('click');
    setFormData(prev => ({ ...prev, customerId: profile.customerId, clientType: 'Repeated', firstName: profile.fullName || '', lastName: '', gender: profile.gender || 'Female', language: profile.language || '中文', phone: profile.phone || '', email: profile.email || '', edmConsent: profile.edmConsent || '', birthMonth: profile.birthMonth || '', customerSource: '舊客 (Repeated)', interests: profile.interests || [], formula: '', ...extraData }));
    setShowNameSuggest(false);
    
    // Feature: Smart Formula Retrieval Popup 
    if (profile.latestFormula && profile.latestFormula.trim() !== '') {
        setConfirmFormulaModal({ name: profile.fullName, formula: profile.latestFormula });
    } else {
        triggerNotification(`✅ 已成功帶入舊客資料`);
    }
  };

  const capturePhoto = async () => {
    try {
        const input = document.createElement('input'); input.type = 'file'; input.accept = 'image/*'; input.capture = 'environment';
        input.onchange = (e) => {
            const file = (e.target).files[0]; if(!file) return; setIsUploadingPhoto(true); const reader = new FileReader();
            reader.onload = async (event) => {
                const base64Data = (event.target.result).split(',')[1];
                if (!driveApiUrl) { setFormData(prev => ({...prev, photoLink: 'Local Image Bound'})); setIsUploadingPhoto(false); return triggerNotification('✅ 圖片已暫存 (未設定 API)'); }
                try {
                    // Smart Naming Format: Client ID_first name_service ID
                    const dynamicId = formData.clientType === 'New' || !formData.customerId ? 'NewClient' : formData.customerId;
                    const fName = formData.firstName || 'Unknown';
                    const filename = `${dynamicId}_${fName}_${formData.serviceId}.jpg`;
                    
                    const res = await fetch(driveApiUrl, { method: 'POST', body: JSON.stringify({ action: 'upload_photo', filename: filename, mimeType: file.type, data: base64Data }), headers: { 'Content-Type': 'text/plain;charset=utf-8' } });
                    const result = await res.json();
                    if(result.status === 'success') { setFormData(prev => ({...prev, photoLink: result.url})); triggerNotification('✅ 照片已成功上傳至雲端！'); }
                } catch(err) { triggerNotification('❌ 照片上傳失敗'); } setIsUploadingPhoto(false);
            }; reader.readAsDataURL(file);
        }; input.click();
    } catch(e) { triggerNotification('❌ 無法啟動相機'); }
  };

  const handleSubmitCheckout = (e) => {
    e.preventDefault(); if (!formData.firstName) return triggerNotification('請輸入顧客姓名！'); if (!formData.price || parseInt(formData.price) <= 0) return triggerNotification('請輸入有效金額！');
    setSubmitting(true);
    const finalRecord = { ...formData, firstName: formData.firstName.trim(), lastName: '', name: formData.firstName.trim(), customerId: formData.clientType === 'New' || !formData.customerId ? getNextCustomerId(rawHistoryRecords) : formData.customerId, serviceId: formData.serviceId || generateServiceId(), customerSource: formData.clientType === 'New' ? `新客 (${formData.sourceDetail})` : (formData.clientType === 'Repeated' && !formData.customerId ? '舊客 (數位首建)' : '舊客 (Repeated)'), services: [...formData.selectedServices, formData.customService].filter(Boolean).join(', '), interests: formData.interests.join(', '), isProfileOnly: false, timestamp: new Date().toISOString() };

    setTimeout(() => {
      setRawHistoryRecords(prev => [finalRecord, ...prev]);
      if (driveApiUrl) fetch(getApiUrl(driveApiUrl, 'append'), { method: 'POST', body: JSON.stringify({ action: 'append', record: finalRecord }), headers: { 'Content-Type': 'text/plain;charset=utf-8' } }).catch(()=>{});
      if (formData._eventId && calendarApiUrl) fetch(getApiUrl(calendarApiUrl, 'delete_event'), { method: 'POST', body: JSON.stringify({ action: 'delete_event', eventId: formData._eventId }), headers: { 'Content-Type': 'text/plain;charset=utf-8' } }).catch(()=>{});
      setSubmitting(false); playAudioFeedback('cashier'); setShowSuccessModal(true); setFormData(getInitialForm());
    }, 400); 
  };

  const exportCSV = (type) => {
      let data = type === 'customers' ? crmProfiles.map(p => ({ ID: p.customerId, 姓名: p.fullName, 電話: p.phone, 總消費: p.totalSpent, 造訪次數: p.visitCount, 最新造訪: p.latestVisitDate })) : historyRecords.map(r => ({ 單號: r.serviceId, 日期: r.date, 姓名: r.firstName, 設計師: r.stylist, 服務: r.services, 金額: r.price }));
      if (data.length === 0) return triggerNotification('沒有資料可匯出');
      const headers = Object.keys(data[0]); const csv = [headers.join(','), ...data.map(row => headers.map(h => `"${row[h]||''}"`).join(','))].join('\n');
      const link = document.createElement('a'); link.href = URL.createObjectURL(new Blob(["\uFEFF"+csv], { type: 'text/csv;charset=utf-8;' })); link.download = `Headline_${type}_${new Date().toISOString().split('T')[0]}.csv`; link.click();
  };

  const handleCloudRestore = async () => {
      if (!driveApiUrl) return triggerNotification('請先設定 API 網址');
      try { 
          triggerNotification('⏳ 正在從雲端下載資料...'); 
          const res = await fetch(getApiUrl(driveApiUrl, 'get_all')); // No headers to avoid CORS error
          const result = await res.json(); 
          if (result.status === 'success' && result.data) { 
              setRawHistoryRecords(result.data); triggerNotification('✅ 雲端資料還原成功！'); 
          } else triggerNotification('❌ 還原失敗'); 
      } catch(e) { triggerNotification('❌ 無法連線至雲端'); }
  };

  const handleCloudBackup = async () => {
      if (!driveApiUrl) return triggerNotification('請先設定 API 網址');
      try { triggerNotification('⏳ 正在上傳資料...'); await fetch(getApiUrl(driveApiUrl, 'sync_all'), { method: 'POST', body: JSON.stringify({ action: 'sync_all', records: rawHistoryRecords }), headers: { 'Content-Type': 'text/plain;charset=utf-8' } }); triggerNotification('✅ 資料已備份至雲端！'); } catch(e) { triggerNotification('❌ 備份失敗'); }
  };

  const MeterChart = ({ title, data, colors }) => {
    const total = data.reduce((sum, item) => sum + (isNaN(Number(item.value)) ? 0 : Number(item.value)), 0);
    const displayData = total === 0 ? [{ name: '無資料', value: 1 }] : data.map(d => ({ ...d, value: isNaN(Number(d.value)) ? 0 : Number(d.value) }));
    return (
      <div className="bg-white p-4 rounded-3xl shadow-sm border border-[#E8DCC8] flex flex-col items-center justify-center flex-1 min-w-[200px] min-h-[220px]">
        <h3 className="text-sm font-bold text-gray-500 mb-2">{title}</h3>
        <div style={{ width: '100%', height: 140 }}><ResponsiveContainer><PieChart><Pie data={displayData} cx="50%" cy="100%" startAngle={180} endAngle={0} innerRadius={60} outerRadius={80} paddingAngle={2} dataKey="value">{displayData.map((e, i) => <Cell key={i} fill={total===0 ? '#e5e7eb' : colors[i % colors.length]} />)}</Pie>{total > 0 && <Tooltip contentStyle={{borderRadius:'8px',fontWeight:'bold'}}/>}</PieChart></ResponsiveContainer></div>
        <div className="flex flex-wrap justify-center gap-3 mt-4 text-xs font-bold">{total > 0 ? displayData.map((e, i) => e.value > 0 && <div key={e.name} className="flex items-center gap-1"><span className="w-3 h-3 rounded-full" style={{ backgroundColor: colors[i] }}></span>{e.name} ({e.value}%)</div>) : <span className="text-gray-400">尚無數據</span>}</div>
      </div>
    );
  };

  return (
    <div className="h-screen flex flex-col font-sans selection:bg-[#E8DCC8] selection:text-[#4A2511] overflow-hidden bg-[#F6EFE9] text-[#4A2511]">
      {notification && <div className="fixed top-6 left-1/2 transform -translate-x-1/2 z-[100] text-white px-8 py-4 rounded-2xl shadow-2xl flex items-center space-x-3 font-bold text-xl" style={{ backgroundColor: activeTheme.hex }}><Icons.Check /> <span>{notification}</span></div>}
      
      {/* HEADER SECTION */}
      <header className="shrink-0 z-40 px-6 py-2 flex justify-between items-center bg-white/90 backdrop-blur-md border-b border-[#E8DCC8] shadow-sm">
        <div className="flex items-center space-x-8 w-full justify-between">
          <div className="flex flex-col items-start justify-center select-none pt-1"><h1 className="text-3xl font-bold tracking-[0.2em] leading-none text-[#4A2511] flex items-center">HEADLINE <span className="text-[10px] font-bold text-gray-400 tracking-normal ml-3 mt-1 bg-gray-100 px-1.5 py-0.5 rounded border">v13.8 Pro</span></h1><span className="text-xs tracking-[0.4em] uppercase mt-1 font-semibold text-gray-500">Hair Salon</span></div>
          
          <div className="flex items-center gap-4">
            {/* Global Sync Button */}
            <button type="button" onClick={handleGlobalSync} disabled={isSyncing} className={`flex items-center space-x-2 px-4 py-2.5 rounded-xl font-bold text-sm transition-all ${isSyncing ? 'bg-gray-100 text-gray-400' : 'bg-blue-50 text-blue-600 hover:bg-blue-100 shadow-sm border border-blue-100'}`}>
              <span className={isSyncing ? "animate-spin inline-block" : "inline-block"}><Icons.Refresh /></span> <span>{isSyncing ? '同步中...' : '雲端同步'}</span>
            </button>
            
            <div className="flex items-center space-x-1 bg-[#F6EFE9] p-1 rounded-2xl border border-[#E8DCC8]">
              {[{ id: 'scheduler', icon: Icons.Calendar, label: '預約排程' }, { id: 'checkout', icon: Icons.Gift, label: '現場結帳' }, { id: 'crm', icon: Icons.User, label: '客戶資料庫' }, { id: 'dashboard', icon: Icons.Chart, label: '數據報表' }, { id: 'datahub', icon: Icons.Database, label: '資料中心' }].map(t => (
                <button key={t.id} onClick={() => handleTabChange(t.id)} className={`px-5 py-2.5 rounded-xl text-lg font-bold flex items-center space-x-2 transition-all ${activeTab === t.id ? 'text-white shadow-md' : 'text-gray-500 hover:bg-white/50'}`} style={activeTab === t.id ? { backgroundColor: activeTheme.hex } : {}}><t.icon /> <span>{t.label}</span></button>
              ))}
            </div>
          </div>
        </div>
      </header>

      <main className="flex-1 overflow-y-auto p-4 md:p-6 lg:p-8 custom-scrollbar relative">
        
        {/* SCHEDULER TAB */}
        {activeTab === 'scheduler' && (
          <div className="w-full max-w-[1500px] mx-auto animate-in fade-in duration-300 h-full flex flex-col">
             <div className="bg-white border border-[#E8DCC8] rounded-3xl p-8 shadow-sm flex flex-col h-full">
                <div className="flex justify-between items-center mb-6 border-b-2 border-gray-100 pb-5">
                   <div><h2 className="text-4xl font-black flex items-center space-x-4 text-[#4A2511]"><div className="w-3 h-12 rounded-full" style={{ backgroundColor: activeTheme.hex }}></div><span>預約排程 (Scheduler)</span></h2></div>
                   <div className="flex items-center gap-4">
                      <div className="flex bg-[#F6EFE9] rounded-2xl p-1 h-[48px] mr-2">
                        <select value={schedFilterStylist} onChange={e => setSchedFilterStylist(e.target.value)} className="bg-transparent font-bold text-[#4A2511] px-4 focus:outline-none cursor-pointer border-r border-[#E8DCC8]"><option value="All">All Stylists</option>{stylists.filter(s=>s!=='Others').map(s => <option key={s} value={s}>{s}</option>)}</select>
                        <button onClick={() => { playAudioFeedback('click'); setSchedViewMode('day'); }} className={`px-5 rounded-xl font-bold transition-all ${schedViewMode === 'day' ? 'bg-white shadow text-[#4A2511]' : 'text-gray-500'}`}>日</button>
                        <button onClick={() => { playAudioFeedback('click'); setSchedViewMode('week'); }} className={`px-5 rounded-xl font-bold transition-all ${schedViewMode === 'week' ? 'bg-white shadow text-[#4A2511]' : 'text-gray-500'}`}>週</button>
                        <button onClick={() => { playAudioFeedback('click'); setSchedViewMode('month'); }} className={`px-5 rounded-xl font-bold transition-all ${schedViewMode === 'month' ? 'bg-white shadow text-[#4A2511]' : 'text-gray-500'}`}>月</button>
                      </div>
                      <button onClick={() => { playAudioFeedback('click'); fetchCalendarEvents(); }} className="bg-gray-100 text-gray-600 px-4 py-2.5 rounded-xl font-bold flex items-center gap-2 hover:bg-gray-200 transition-colors shadow-sm"><Icons.Refresh /> <span>同步日曆</span></button>
                      <button onClick={() => { playAudioFeedback('click'); setSchedAddEditModal({ date: schedSelectedDate.toLocaleDateString('en-CA'), time: '12:00', duration: 60, stylist: schedFilterStylist === 'All' ? 'Man' : schedFilterStylist, clientName: '', service: '', phone: '', notes: '' }); }} className="bg-[#8B5A2B] text-white px-5 py-2.5 rounded-xl font-bold flex items-center gap-2 hover:bg-[#6D3A14] transition-colors shadow-sm"><Icons.Plus /> <span>新增預約</span></button>
                   </div>
                </div>

                {(schedViewMode === 'day' || schedViewMode === 'month') && (
                   <div className="flex justify-between items-center mb-6 bg-[#F6EFE9]/50 p-4 rounded-2xl border border-[#E8DCC8]">
                      <button onClick={() => { const d = new Date(schedSelectedDate); if(schedViewMode==='day') d.setDate(d.getDate() - 1); else d.setMonth(d.getMonth() - 1); setSchedSelectedDate(d); }} className="p-2 hover:bg-white rounded-xl transition-colors text-[#4A2511] font-bold flex items-center"><Icons.ChevronLeft /> {schedViewMode==='day' ? '前一天' : '上個月'}</button>
                      <h3 className="text-2xl font-black text-[#8B5A2B]">{schedViewMode==='day' ? schedSelectedDate.toLocaleDateString('zh-HK', { month: 'long', day: 'numeric', weekday: 'long' }) : schedSelectedDate.toLocaleDateString('zh-HK', { year:'numeric', month: 'long' })}</h3>
                      <button onClick={() => { const d = new Date(schedSelectedDate); if(schedViewMode==='day') d.setDate(d.getDate() + 1); else d.setMonth(d.getMonth() + 1); setSchedSelectedDate(d); }} className="p-2 hover:bg-white rounded-xl transition-colors text-[#4A2511] font-bold flex items-center">{schedViewMode==='day' ? '後一天' : '下個月'} <Icons.ChevronRight /></button>
                   </div>
                )}

                <div className="flex-1 overflow-y-auto border-2 border-[#E8DCC8] rounded-2xl bg-gray-50 custom-scrollbar relative flex flex-col">
                   {schedViewMode === 'day' && (() => {
                       const visibleStylists = schedFilterStylist === 'All' ? stylists.filter(s=>s!=='Others') : [schedFilterStylist];
                       const isToday = schedSelectedDate.toDateString() === currentTime.toDateString(); const currentHour = currentTime.getHours(), currentMin = currentTime.getMinutes(); const showTimeLine = isToday && currentHour >= 10 && currentHour < 21; const timeLineTop = showTimeLine ? ((currentHour - 10) * 64) + (currentMin / 60) * 64 : -100;
                       return (
                         <div className="flex min-w-[800px] relative">
                            {showTimeLine && (<div className="absolute left-24 right-0 border-b-[3px] border-red-500 z-30 pointer-events-none flex items-center" style={{ top: `${timeLineTop + 64}px` }}><div className="bg-red-500 text-white text-[10px] font-bold px-2 py-0.5 rounded-full absolute -left-12">{currentHour}:{currentMin.toString().padStart(2,'0')}</div><div className="w-2 h-2 rounded-full bg-red-500 absolute -left-1"></div></div>)}
                            <div className="w-24 shrink-0 bg-[#F6EFE9] border-r-2 border-[#E8DCC8] flex flex-col sticky left-0 z-20"><div className="h-16 border-b-2 border-[#E8DCC8] bg-[#F6EFE9] sticky top-0 z-30"></div>{TIME_SLOTS.map((time, i) => <div key={i} className={`h-16 flex items-start justify-end pr-2 pt-1 font-bold text-gray-400 text-sm ${i % 2 === 0 ? 'border-b border-[#E8DCC8]' : 'border-b-2 border-[#E8DCC8]'}`}>{i % 2 === 0 ? time : ''}</div>)}</div>
                            {visibleStylists.map(stylist => {
                               const dateStr = schedSelectedDate.toLocaleDateString('en-CA');
                               const dayEvents = calendarEvents.filter(e => { const eDate = new Date(e.startTime); return !isNaN(eDate.getTime()) && cleanStylistName(e.stylist) === stylist && eDate.toLocaleDateString('en-CA') === dateStr; });
                               return (
                                  <div key={stylist} className="flex-1 min-w-[200px] border-r-2 border-[#E8DCC8] relative bg-white">
                                     <div className="h-16 border-b-2 border-[#E8DCC8] bg-white sticky top-0 z-20 flex items-center justify-center"><span className="text-xl font-black px-4 py-1.5 rounded-lg text-white shadow-sm" style={{ backgroundColor: STYLIST_THEMES[stylist].hex }}>{stylist}</span></div>
                                     {TIME_SLOTS.map((_, i) => (<div key={i} className={`h-16 w-full ${i % 2 === 0 ? 'border-b border-gray-50' : 'border-b-2 border-gray-100'}`}></div>))}
                                     {dayEvents.map((evt, i) => {
                                        const eStart = new Date(evt.startTime); const hour = eStart.getHours(), min = eStart.getMinutes(); if (hour < 10 || hour >= 21) return null;
                                        const topPx = ((hour - 10) * 64) + (min / 60) * 64; let durationMins = Math.round((new Date(evt.endTime) - new Date(evt.startTime)) / 60000); if (!durationMins || durationMins <= 0) durationMins = 60; const heightPx = Math.max((durationMins / 60) * 64 - 4, 30); 
                                        const parts = evt.title.split('|'); let clientName = parts[0]?.trim() || evt.title, service = parts[1]?.trim() || '', phone = '', notes = evt.description || '';
                                        if (notes.includes('Phone:')) { const splitNotes = notes.split('\n'); phone = splitNotes[0].replace('Phone:', '').trim(); notes = splitNotes.slice(1).join('\n'); }
                                        const parsedApt = { id: evt.id, stylist, clientName, service, time: `${hour}:${min.toString().padStart(2,'0')}`, duration: durationMins, date: dateStr, phone, notes };
                                        return (
                                           <div key={i} onClick={() => { playAudioFeedback('click'); setSchedDetailModal(parsedApt); }} className="absolute left-1 right-1 rounded-xl p-3 shadow-md hover:shadow-lg transition-shadow cursor-pointer overflow-hidden border-2 z-10" style={{ top: `${topPx + 66}px`, height: `${heightPx}px`, backgroundColor: STYLIST_THEMES[stylist].light, borderColor: STYLIST_THEMES[stylist].hex, borderLeftWidth: '6px' }}>
                                               <div className="flex justify-between items-start mb-1"><span className="font-black text-[#4A2511] text-base leading-tight truncate">{clientName}</span><span className="text-xs font-bold text-[#8B5A2B] bg-white/80 px-2 py-0.5 rounded shadow-sm">{parsedApt.time}</span></div>
                                               <div className="text-xs font-bold text-gray-700 truncate mb-1">{service}</div>{heightPx > 60 && phone && <div className="text-[10px] text-gray-500 font-mono">📞 {phone}</div>}
                                           </div>
                                        );
                                     })}
                                  </div>
                               )
                            })}
                         </div>
                       );
                   })()}

                   {schedViewMode === 'week' && (() => {
                       const visibleStylists = schedFilterStylist === 'All' ? stylists.filter(s=>s!=='Others') : [schedFilterStylist];
                       return (
                         <table className="w-full text-left border-collapse min-w-[800px] bg-white">
                            <thead className="bg-[#F6EFE9] sticky top-0 z-10 shadow-sm border-b-2 border-[#E8DCC8]"><tr><th className="p-4 border-r border-[#E8DCC8] font-black text-[#4A2511] w-32 text-center text-lg">日期</th>{visibleStylists.map(stylist => <th key={stylist} className="p-4 border-r border-[#E8DCC8] font-black text-center text-xl" style={{ color: STYLIST_THEMES[stylist].hex }}>{stylist}</th>)}</tr></thead>
                            <tbody>
                              {Array.from({length: 7}, (_, i) => {
                                 const d = new Date(); d.setDate(d.getDate() + i); const dateString = d.toLocaleDateString('en-CA'); 
                                 return (
                                    <tr key={dateString} className="hover:bg-gray-50">
                                      <td className="p-4 border-b border-r border-[#E8DCC8] align-top text-center"><div className="font-black text-xl text-[#4A2511]">{dateString.slice(5)}</div><div className="text-xs font-bold text-gray-400 mt-1">{d.toLocaleDateString('zh-HK', { weekday: 'short' })}</div></td>
                                      {visibleStylists.map(stylist => {
                                         const dayEvents = calendarEvents.filter(e => { const eD = new Date(e.startTime); return !isNaN(eD.getTime()) && eD.toLocaleDateString('en-CA') === dateString && cleanStylistName(e.stylist) === stylist; }).sort((a,b)=>new Date(a.startTime).getTime()-new Date(b.startTime).getTime());
                                         return (
                                            <td key={stylist} className="p-3 border-b border-r border-[#E8DCC8] align-top">
                                              <div className="space-y-3">
                                                 {dayEvents.map((evt, j) => {
                                                    const eDate = new Date(evt.startTime); const timeString = eDate.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: false }); const parts = evt.title.split('|'), clientName = parts[0]?.trim() || evt.title, service = parts[1]?.trim() || ''; let phone = '', notes = evt.description || '';
                                                    if (notes.includes('Phone:')) { const splitNotes = notes.split('\n'); phone = splitNotes[0].replace('Phone:', '').trim(); notes = splitNotes.slice(1).join('\n'); }
                                                    return (
                                                       <div key={j} onClick={() => setSchedDetailModal({ id: evt.id, stylist, clientName, service, time: timeString, duration: 60, date: dateString, phone, notes })} className="group relative bg-white border p-3 rounded-xl shadow-sm hover:shadow-md cursor-pointer" style={{ borderColor: STYLIST_THEMES[stylist].light, borderLeftWidth: '6px', borderLeftColor: STYLIST_THEMES[stylist].hex }}>
                                                          <div className="flex justify-between items-start"><span className="font-black text-[#4A2511] text-base">{clientName}</span><span className="text-xs font-bold text-[#8B5A2B] bg-[#F6EFE9] px-2 py-0.5 rounded-md">{timeString}</span></div>
                                                          <div className="text-xs font-bold text-gray-500 mt-1 truncate">{service}</div>
                                                       </div>
                                                    );
                                                 })}
                                              </div>
                                            </td>
                                         )
                                      })}
                                    </tr>
                                 );
                              })}
                            </tbody>
                         </table>
                       );
                   })()}

                   {schedViewMode === 'month' && (() => {
                       const year = schedSelectedDate.getFullYear(), month = schedSelectedDate.getMonth(); const firstDay = new Date(year, month, 1).getDay(), daysInMonth = new Date(year, month + 1, 0).getDate(); const days = []; for (let i = 0; i < firstDay; i++) days.push(null); for (let i = 1; i <= daysInMonth; i++) days.push(new Date(year, month, i)); const weeks = []; let currentWeek = []; days.forEach((day, i) => { currentWeek.push(day); if ((i + 1) % 7 === 0 || i === days.length - 1) { while(currentWeek.length < 7) currentWeek.push(null); weeks.push(currentWeek); currentWeek = []; }}); const visibleStylists = schedFilterStylist === 'All' ? stylists.filter(s=>s!=='Others') : [schedFilterStylist];
                       return (
                           <div className="flex-1 flex flex-col bg-gray-50">
                               <div className="grid grid-cols-7 border-b border-[#E8DCC8] bg-[#F6EFE9]">{['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(d => <div key={d} className="p-3 text-center font-bold text-gray-500 text-sm uppercase">{d}</div>)}</div>
                               <div className="flex-1 grid grid-cols-7 grid-rows-5 bg-white">
                                   {weeks.map((week, wIdx) => week.map((day, dIdx) => {
                                       if (!day) return <div key={`empty-${wIdx}-${dIdx}`} className="border-b border-r border-gray-100 bg-gray-50/50 p-2"></div>;
                                       const dateStr = day.toLocaleDateString('en-CA'), isToday = dateStr === new Date().toLocaleDateString('en-CA'); const dayEvents = calendarEvents.filter(e => { const eD = new Date(e.startTime); return !isNaN(eD.getTime()) && eD.toLocaleDateString('en-CA') === dateStr && visibleStylists.includes(cleanStylistName(e.stylist)); });
                                       return (
                                           <div key={dateStr} className={`border-b border-r border-gray-100 p-2 overflow-hidden flex flex-col ${isToday ? 'bg-[#F6EFE9]/30' : ''}`}>
                                               <div className={`text-sm font-bold mb-1 w-7 h-7 flex items-center justify-center rounded-full ${isToday ? 'bg-[#8B5A2B] text-white' : 'text-gray-500'}`}>{day.getDate()}</div>
                                               <div className="flex-1 overflow-y-auto space-y-1 custom-scrollbar pr-1">
                                                   {dayEvents.slice(0, 5).map((evt, i) => {
                                                       const eTime = new Date(evt.startTime).toLocaleTimeString('en-US', {hour:'2-digit', minute:'2-digit', hour12:false}); const cName = (evt.title.split('|')[0] || '').trim(), styName = cleanStylistName(evt.stylist);
                                                       return (
                                                           <div key={i} className="text-[10px] truncate px-1.5 py-0.5 rounded font-bold cursor-pointer" style={{ backgroundColor: STYLIST_THEMES[styName]?.light, color: STYLIST_THEMES[styName]?.hex }}
                                                                onClick={() => { const parts = evt.title.split('|'); setSchedDetailModal({ id: evt.id, stylist: styName, clientName: cName, service: parts[1]?.trim()||'', time: eTime, duration:60, date: dateStr, notes: evt.description }); }}>{eTime} {cName}</div>
                                                       );
                                                   })}
                                                   {dayEvents.length > 5 && <div className="text-[10px] text-gray-400 font-bold px-1">+ {dayEvents.length - 5} more</div>}
                                               </div>
                                           </div>
                                       );
                                   }))}
                               </div>
                           </div>
                       );
                   })()}
                </div>
             </div>
          </div>
        )}

        {/* CHECKOUT TAB */}
        {}
        {activeTab === 'checkout' && (
          <form onSubmit={handleSubmitCheckout} className="w-full max-w-[1500px] mx-auto animate-in fade-in duration-300">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 w-full">
              
              {/* Dynamic Enlargeable Container for Client Form */}
              <div className={isProfileExpanded ? "fixed inset-4 md:inset-10 z-[195] bg-white rounded-[2.5rem] p-8 md:p-12 shadow-2xl overflow-y-auto custom-scrollbar flex flex-col transition-all border border-gray-200" : "lg:col-span-5 bg-white border border-gray-200 p-8 shadow-sm relative overflow-hidden rounded-[2.5rem] flex flex-col transition-all"}>
                <div className="absolute top-0 left-0 right-0 h-3 bg-gradient-to-r from-gray-200 to-gray-100"></div>
                
                <div className="flex justify-between items-center mb-6">
                   <h2 className={`${isProfileExpanded ? 'text-3xl' : 'text-2xl'} font-black text-gray-800 flex items-center space-x-2`}>
                      <Icons.User /> <span>客資建檔 Client Profile</span>
                   </h2>
                   <button type="button" onClick={() => setIsProfileExpanded(!isProfileExpanded)} className="flex items-center gap-2 bg-gray-100 hover:bg-gray-200 text-gray-700 font-bold py-2.5 px-4 rounded-xl transition-colors text-sm">
                      {isProfileExpanded ? <><Icons.Minimize className="w-5 h-5" /> <span>縮小返回 (Minimize)</span></> : <><Icons.Maximize className="w-5 h-5" /> <span>客戶自填 (Enlarge)</span></>}
                   </button>
                </div>
                
                <div className="space-y-6 flex-1">
                  <div className="relative">
                     <label className="block text-sm font-bold uppercase tracking-wider mb-2 text-gray-500">顧客全名 Full Name</label>
                     <input type="text" value={formData.firstName} onChange={handleNameSearchInput} onBlur={() => setTimeout(() => setShowNameSuggest(false), 200)} required placeholder="點此輸入全名 (如: Jacky Cheng)" className="w-full rounded-2xl py-4 px-5 text-xl font-black bg-gray-50 border-transparent focus:bg-white focus:border-gray-800 border-2 outline-none transition-colors shadow-inner" />
                     {formData.firstName && <button type="button" onClick={() => setFormData(f=>({...f, firstName: '', customerId: ''}))} className="absolute right-4 top-11 p-1.5 text-gray-400 hover:bg-gray-200 rounded-full transition-colors"><Icons.X /></button>}
                     
                     {showNameSuggest && nameSuggests.length > 0 && (
                        <div className="absolute z-50 top-[100%] mt-2 left-0 right-0 bg-white border border-gray-200 rounded-2xl shadow-2xl max-h-60 overflow-y-auto">
                           {nameSuggests.map(p => (
                             <div key={p.customerId} onMouseDown={() => handleSelectSuggest(p)} className="px-5 py-4 border-b last:border-0 hover:bg-gray-50 cursor-pointer flex justify-between items-center">
                               <div><span className="font-black text-xl text-[#4A2511]">{p.fullName}</span><span className="ml-3 text-sm font-bold text-gray-400 bg-gray-100 px-2 py-1 rounded-md">{p.phone}</span></div><span className="text-sm font-bold text-[#8B5A2B] bg-[#E8DCC8]/30 px-2 py-1 rounded">{p.customerId}</span>
                             </div>
                           ))}
                        </div>
                     )}
                  </div>

                  <div>
                     <label className="block text-sm font-bold uppercase tracking-wider mb-2 text-gray-500">聯絡電話 Phone Number</label>
                     <div className="flex gap-2">
                         <input type="text" value={formData.phonePrefix} onChange={e=>handleInputChange('phonePrefix', e.target.value)} className="w-[100px] text-center bg-gray-50 border-transparent rounded-2xl py-4 font-bold outline-none focus:bg-white focus:border-gray-800 border-2 transition-colors shadow-inner" />
                         <input type="tel" value={formData.phone} onClick={()=>playAudioFeedback('click')} onChange={(e) => handleInputChange('phone', e.target.value)} placeholder="Phone Number..." className="flex-1 bg-gray-50 border-transparent rounded-2xl py-4 px-5 text-xl font-bold outline-none focus:bg-white focus:border-gray-800 border-2 transition-colors shadow-inner" />
                     </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                     <div>
                        <label className="block text-sm font-bold uppercase tracking-wider mb-2 text-gray-500">性別 Gender</label>
                        <div className="flex bg-gray-100 rounded-2xl p-1.5">
                           <button type="button" onClick={() => {playAudioFeedback('click'); handleInputChange('gender', 'Female')}} className={`flex-1 rounded-xl py-3 text-lg font-black transition-all ${formData.gender === 'Female' ? 'bg-white shadow text-pink-600' : 'text-gray-400 hover:bg-gray-200'}`}>👩 女</button>
                           <button type="button" onClick={() => {playAudioFeedback('click'); handleInputChange('gender', 'Male')}} className={`flex-1 rounded-xl py-3 text-lg font-black transition-all ${formData.gender === 'Male' ? 'bg-white shadow text-blue-600' : 'text-gray-400 hover:bg-gray-200'}`}>👨 男</button>
                        </div>
                     </div>
                     <div>
                        <label className="block text-sm font-bold uppercase tracking-wider mb-2 text-gray-500">語言 Language</label>
                        <div className="flex bg-gray-100 rounded-2xl p-1.5">
                           <button type="button" onClick={() => {playAudioFeedback('click'); handleInputChange('language', '中文')}} className={`flex-1 rounded-xl py-3 text-lg font-black transition-all ${formData.language === '中文' ? 'bg-white shadow text-gray-800' : 'text-gray-400 hover:bg-gray-200'}`}>中文</button>
                           <button type="button" onClick={() => {playAudioFeedback('click'); handleInputChange('language', 'EN')}} className={`flex-1 rounded-xl py-3 text-lg font-black transition-all ${formData.language === 'EN' ? 'bg-white shadow text-gray-800' : 'text-gray-400 hover:bg-gray-200'}`}>EN</button>
                        </div>
                     </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4 mt-6 pt-6 border-t border-gray-100">
                     <div>
                        <label className="block text-xs font-bold uppercase tracking-wider text-gray-500 mb-1">生日月份</label>
                        <select value={formData.birthMonth} onChange={(e) => handleInputChange('birthMonth', e.target.value)} className="w-full bg-gray-50 border border-gray-200 rounded-xl py-3 px-3 text-base font-bold outline-none focus:border-gray-500"><option value="">- 選擇 -</option>{birthMonthsList.map(m => <option key={m} value={m}>{m}</option>)}</select>
                     </div>
                     <div>
                        <label className="block text-xs font-bold uppercase tracking-wider text-gray-500 mb-1">Email (For EDM)</label>
                        <input type="email" value={formData.email} onClick={()=>playAudioFeedback('click')} onChange={(e) => handleInputChange('email', e.target.value)} placeholder="example@email.com" className="w-full bg-gray-50 border border-gray-200 rounded-xl py-3 px-4 text-base font-bold outline-none focus:bg-white focus:border-gray-500" />
                     </div>
                  </div>

                  {/* Conditionally hidden tags section when expanded */}
                  {!isProfileExpanded && (
                     <div className="border-t border-gray-100 pt-6 mt-6">
                        <h3 className="text-sm font-bold uppercase tracking-widest text-gray-400 mb-4 flex justify-between items-center"><span>客人興趣 / 需求標籤 (Optional)</span><button type="button" onClick={()=>setShowTagsConfig(true)} className="text-blue-500 hover:text-blue-600 font-bold bg-blue-50 px-2 py-1 rounded">管理標籤</button></h3>
                        <div className="flex flex-wrap gap-3 mb-6">
                           {interestTags.map(interest => (
                               <button type="button" key={interest} onClick={() => toggleArrayItem('interests', interest)} className={`px-5 py-2.5 rounded-xl text-base font-bold transition-all shadow-sm border-2 ${formData.interests.includes(interest) ? 'bg-gray-800 text-white border-gray-800' : 'bg-white border-gray-200 text-gray-600 hover:bg-gray-50'}`}>{interest}</button>
                           ))}
                        </div>
                     </div>
                  )}

                  {/* Submit/Done button exclusively for Enlarge Mode */}
                  {isProfileExpanded && (
                     <div className="mt-auto pt-8 flex justify-center">
                        <button type="button" onClick={() => setIsProfileExpanded(false)} className="w-full bg-emerald-500 hover:bg-emerald-600 text-white py-6 text-2xl font-black rounded-2xl shadow-lg transition-all">
                           ✅ 完成填寫 (Done)
                        </button>
                     </div>
                  )}
                </div>
              </div>

              {/* Dim background overlay when enlarged */}
              {isProfileExpanded && <div className="fixed inset-0 bg-black/60 z-[190] backdrop-blur-sm transition-all" onClick={() => setIsProfileExpanded(false)}></div>}

              {/* Right Side Columns */}
              <div className="lg:col-span-7 bg-[#F6EFE9] border border-[#E8DCC8] rounded-[2.5rem] p-8 shadow-sm flex flex-col relative">
                   <div className="absolute top-0 left-0 right-0 h-3" style={{ backgroundColor: activeTheme.hex }}></div>
                   
                   <div className="flex justify-between items-start mb-6">
                       <div className="flex bg-white rounded-2xl p-1.5 shadow-sm border border-[#E8DCC8] mr-4 overflow-x-auto custom-scrollbar">
                           {stylists.map(s => (
                               <button key={s} type="button" onClick={() => { playAudioFeedback('click'); handleInputChange('stylist', s); }} className={`px-5 py-2.5 rounded-xl text-xl font-black transition-all whitespace-nowrap ${formData.stylist === s ? 'shadow-md text-white' : 'text-gray-500 hover:bg-gray-50'}`} style={formData.stylist === s ? { backgroundColor: STYLIST_THEMES[s].hex } : {}}>{s}</button>
                           ))}
                       </div>
                       <div className="bg-white rounded-2xl shadow-sm border border-[#E8DCC8] px-4 py-3 flex items-center shrink-0">
                           <span className="text-sm font-bold text-gray-500 mr-3 uppercase tracking-wider hidden sm:inline-block">服務日期</span>
                           <input type="date" value={formData.date} onChange={(e) => handleInputChange('date', e.target.value)} className="bg-transparent text-[#8B5A2B] text-xl font-black outline-none w-[160px] text-center" />
                       </div>
                   </div>

                   <div className="bg-white p-5 rounded-3xl border border-[#E8DCC8] shadow-sm mb-6 flex gap-4 relative">
                        <div className="flex-1 flex flex-col">
                           <label className="block text-xs font-bold uppercase tracking-wider mb-2 text-gray-500">客源狀態 (Client Status)</label>
                           <div className="flex gap-2">
                              <div className="flex bg-gray-100 rounded-2xl p-1.5 w-[40%]">
                                 <button type="button" onClick={() => handleInputChange('clientType', 'New')} className={`flex-1 rounded-xl font-black text-lg transition-all ${formData.clientType === 'New' ? 'bg-white shadow text-[#4A2511]' : 'text-gray-400 hover:bg-gray-200'}`}>新客</button>
                                 <button type="button" onClick={() => handleInputChange('clientType', 'Repeated')} className={`flex-1 rounded-xl font-black text-lg transition-all ${formData.clientType === 'Repeated' ? 'bg-white shadow text-[#4A2511]' : 'text-gray-400 hover:bg-gray-200'}`}>舊客</button>
                              </div>
                              {formData.clientType === 'New' ? (
                                <select value={formData.sourceDetail} onChange={(e) => handleInputChange('sourceDetail', e.target.value)} className="w-[60%] bg-gray-50 border border-gray-200 rounded-2xl px-4 text-lg font-bold outline-none focus:border-[#8B5A2B]">
                                  <option value="Walk-in">Walk-in</option><option value="Referral">朋友介紹 (Referral)</option><option value="IG/Facebook">IG/FB</option><option value="Google">Google</option>
                                </select>
                              ) : (
                                <div className="w-[60%] bg-gray-50 border border-gray-200 rounded-2xl px-4 flex items-center justify-center text-gray-400 font-bold">自動歸檔為舊客</div>
                              )}
                           </div>
                           
                           {formData.clientType === 'New' && formData.sourceDetail === 'Referral' && (
                             <div className="mt-3 relative bg-pink-50 p-3 rounded-2xl border border-pink-200 animate-in fade-in">
                               <label className="block text-xs font-bold text-pink-700 mb-1">推薦人 (搜尋姓名或電話)</label>
                               <input type="text" value={formData.referredBy} onChange={(e) => {
                                 handleInputChange('referredBy', e.target.value);
                                 if(e.target.value.length > 0) { const matches = crmProfiles.filter(p => String(p.fullName).toLowerCase().includes(e.target.value.toLowerCase()) || String(p.phone).includes(e.target.value)); setNameSuggests(matches); setShowNameSuggest(matches.length > 0); } else setShowNameSuggest(false);
                               }} onBlur={() => setTimeout(() => setShowNameSuggest(false), 200)} placeholder="輸入推薦人..." className="w-full bg-white border border-pink-100 rounded-xl py-2 px-3 font-bold outline-none focus:border-pink-400" />
                               {showNameSuggest && nameSuggests.length > 0 && (
                                 <div className="absolute z-50 top-[100%] mt-1 left-0 right-0 bg-white border rounded-xl shadow-xl max-h-40 overflow-y-auto">
                                    {nameSuggests.map(p => (
                                      <div key={p.customerId} onMouseDown={() => { handleInputChange('referredBy', p.fullName); setShowNameSuggest(false); }} className="px-4 py-2 border-b last:border-0 hover:bg-pink-50 cursor-pointer font-bold text-[#4A2511] flex justify-between"><span>{p.fullName}</span><span className="text-gray-400 text-sm">{p.phone}</span></div>
                                    ))}
                                 </div>
                               )}
                             </div>
                           )}
                        </div>
                        <div className="w-[120px] flex flex-col shrink-0">
                           <label className="block text-xs font-bold uppercase tracking-wider mb-2 text-gray-500">Client ID</label>
                           <input type="text" value={formData.clientType === 'New' ? getNextCustomerId(rawHistoryRecords) : formData.customerId} readOnly={formData.clientType === 'New'} onChange={(e) => handleInputChange('customerId', e.target.value.toUpperCase())} className="w-full bg-gray-50 border border-gray-200 rounded-2xl py-3 px-2 text-xl font-bold text-center font-mono outline-none focus:bg-white" />
                        </div>
                   </div>

                   <div className="mb-6">
                     <h3 className="text-sm font-bold uppercase tracking-widest text-gray-500 mb-3 flex justify-between items-center"><span>服務項目 (Services)</span><button type="button" onClick={()=>setShowServicesConfig(true)} className="text-blue-500 hover:text-blue-600 font-bold bg-blue-50 px-2 py-1 rounded">管理清單</button></h3>
                     <div className="flex flex-wrap gap-2 mb-3">
                       {hairServices.map(service => (
                         <label key={service} className="cursor-pointer">
                            <input type="checkbox" className="hidden" checked={formData.selectedServices.includes(service)} onChange={() => toggleArrayItem('selectedServices', service)}/>
                            <div className={`py-3 px-4 rounded-2xl text-base font-bold border-2 transition-all ${formData.selectedServices.includes(service) ? 'shadow-md text-white' : 'bg-white border-transparent text-gray-600 hover:bg-[#E8DCC8]'}`} style={formData.selectedServices.includes(service) ? { backgroundColor: activeTheme.hex, borderColor: activeTheme.hex } : {}}>{service}</div>
                         </label>
                       ))}
                     </div>
                     <input type="text" placeholder="+ 其他客製服務或套餐名稱..." value={formData.customService} onChange={(e) => handleInputChange('customService', e.target.value)} className="w-full bg-white border-transparent rounded-2xl py-3 px-4 text-lg font-bold outline-none focus:border-[#8B5A2B] border-2 transition-colors mb-4 shadow-sm" />
                   </div>

                   <div className="bg-white rounded-3xl p-5 mb-6 shadow-sm border border-[#E8DCC8]">
                      <div className="grid grid-cols-12 gap-4 mb-4">
                        <div className="col-span-3">
                          <label className="block text-sm font-bold text-gray-500 mb-1">服務小計 $</label>
                          <input type="number" placeholder="0" value={formData.subtotal} onChange={(e) => handleInputChange('subtotal', e.target.value)} className="w-full bg-gray-50 rounded-xl py-3 px-3 text-xl font-black outline-none border focus:border-[#8B5A2B]" />
                        </div>
                        <div className="col-span-9 flex flex-col justify-end">
                          <button type="button" onClick={() => setShowRetailSection(!showRetailSection)} className="self-start mb-1 px-4 py-2 bg-purple-50 text-purple-700 font-bold rounded-lg border border-purple-100 hover:bg-purple-100 transition-colors">{showRetailSection ? '- 隱藏零售' : '+ 新增零售產品 (Retail)'}</button>
                        </div>
                      </div>

                      {showRetailSection && (
                        <div className="grid grid-cols-12 gap-4 mb-4 bg-purple-50/50 p-4 rounded-2xl animate-in slide-in-from-top-2">
                           <div className="col-span-8">
                               <label className="block text-xs font-bold text-purple-700 mb-1">產品名稱 (Retail Items)</label>
                               <input type="text" placeholder="例: Kerastase 洗髮精 x1" value={formData.retailItems} onChange={(e) => handleInputChange('retailItems', e.target.value)} className="w-full bg-white rounded-xl py-2.5 px-3 text-base font-bold outline-none border border-purple-200" />
                           </div>
                           <div className="col-span-4">
                               <label className="block text-xs font-bold text-purple-700 mb-1">產品金額 $</label>
                               <input type="number" placeholder="0" value={formData.retailPrice} onChange={(e) => handleInputChange('retailPrice', e.target.value)} className="w-full bg-white rounded-xl py-2.5 px-3 text-base font-black text-purple-700 outline-none border border-purple-200" />
                           </div>
                        </div>
                      )}

                      <div className="grid grid-cols-12 gap-4 items-end border-t border-gray-100 pt-4">
                        <div className="col-span-3">
                          <label className="block text-sm font-bold text-gray-500 mb-1">折扣 %</label>
                          <select value={formData.discountPct} onChange={(e) => handleInputChange('discountPct', e.target.value)} className="w-full bg-gray-50 rounded-xl py-3.5 px-2 text-lg font-bold outline-none border focus:border-[#8B5A2B]"><option value="0">無</option><option value="5">5%</option><option value="10">10%</option><option value="15">15%</option><option value="20">20%</option><option value="30">30%</option><option value="50">50%</option><option value="100">Free</option></select>
                        </div>
                        <div className="col-span-4">
                          <label className="block text-sm font-bold mb-1" style={{ color: activeTheme.hex }}>總結金額 $ (Total)</label>
                          <input type="number" required placeholder="0" value={formData.price} onChange={(e) => handleInputChange('price', e.target.value)} className="w-full bg-[#F6EFE9] rounded-2xl py-4 px-4 text-3xl font-black outline-none border-2 border-transparent focus:border-red-400" style={{ color: activeTheme.hex }} />
                        </div>
                        <div className="col-span-5">
                           <label className="block text-sm font-bold text-gray-500 mb-1">支付</label>
                           <div className="flex space-x-2 h-[60px]">
                             {paymentMethods.filter(m => m.id !== 'Others').map(method => (
                               <button key={method.id} type="button" onClick={() => handleInputChange('paymentMethod', method.id)} className={`flex-1 rounded-xl border-2 transition-all flex flex-col items-center justify-center ${formData.paymentMethod === method.id ? 'bg-white shadow-md' : 'bg-gray-50 border-transparent hover:bg-gray-100'}`} style={formData.paymentMethod === method.id ? { borderColor: activeTheme.hex, color: activeTheme.hex } : { color: 'gray' }}><method.icon /><span className="font-bold text-[10px] mt-0.5">{method.label}</span></button>
                             ))}
                           </div>
                        </div>
                      </div>
                   </div>

                   <div className="bg-white rounded-3xl p-5 border border-[#E8DCC8] shadow-sm mb-6 flex-1 flex flex-col">
                      <div className="flex justify-between items-center mb-2">
                          <label className="block text-sm font-bold uppercase tracking-wider text-gray-500">化學配方與備註</label>
                      </div>
                      <textarea rows={3} placeholder="例: 8B 70ml + 7MT 30ml + 9%..." value={formData.formula} onChange={(e) => handleInputChange('formula', e.target.value)} className="w-full flex-1 bg-gray-50 border border-gray-200 rounded-2xl p-4 text-xl font-mono focus:bg-white outline-none focus:border-[#8B5A2B] transition-colors mb-4" />
                      
                      {/* Photo Section */}
                      <div className="mt-auto pt-4 border-t border-[#E8DCC8]">
                          <button type="button" onClick={capturePhoto} className={`w-full py-4 rounded-2xl font-black text-white shadow-md flex items-center justify-center gap-2 transition-all text-lg ${isUploadingPhoto ? 'bg-gray-400' : 'bg-blue-600 hover:bg-blue-700'}`} disabled={isUploadingPhoto}>
                              {isUploadingPhoto ? <Icons.Refresh className="animate-spin inline-block w-6 h-6" /> : <Icons.Photo className="w-6 h-6" />} 
                              <span>{isUploadingPhoto ? '上傳中 (Uploading)...' : formData.photoLink ? '✅ 已綁定照片 (Photo Bound)' : '📷 拍照上傳 (Take Photo)'}</span>
                          </button>
                      </div>
                   </div>

                   <button type="submit" disabled={submitting} className="w-full text-white font-black py-6 rounded-3xl text-3xl shadow-lg transition-all flex items-center justify-center space-x-3 mt-auto hover:opacity-90 hover:scale-[1.02]" style={{ backgroundColor: activeTheme.hex, boxShadow: `0 10px 25px -5px ${activeTheme.shadow}` }}>
                     {submitting ? <span className="animate-spin rounded-full h-8 w-8 border-b-4 border-white"></span> : <><Icons.Check className="w-10 h-10"/> <span>完成結帳 (Checkout)</span></>}
                   </button>
              </div>
            </div>
          </form>
        )}

        {/* CRM TAB */}
        {}
        {activeTab === 'crm' && (
          <div className="max-w-[1500px] mx-auto space-y-6">
            <div className="bg-white border border-[#E8DCC8] rounded-3xl p-8 shadow-sm">
              <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4 border-b-2 border-gray-100 pb-5">
                <h2 className="text-4xl font-black flex items-center space-x-4 text-[#4A2511] shrink-0"><div className="w-3 h-12 rounded-full bg-[#8B5A2B]"></div><span>客戶檔案庫 ({crmProfiles.length} 位)</span></h2>
                
                <div className="flex flex-wrap items-center justify-end gap-3 w-full">
                  <div className="flex-1 min-w-[300px] max-w-md relative">
                    <input type="text" placeholder="🔍 搜尋電話、姓名、關鍵字..." value={crmSearchQuery} onChange={(e) => setCrmSearchQuery(e.target.value)} className="w-full bg-[#F6EFE9] border border-[#E8DCC8] rounded-2xl py-3 px-4 pr-10 text-lg font-bold outline-none focus:bg-white focus:border-[#8B5A2B] transition-colors" />
                    {crmSearchQuery && <button type="button" onClick={() => setCrmSearchQuery('')} className="absolute right-3 top-1/2 -translate-y-1/2 p-1 text-gray-400 hover:bg-gray-200 rounded-full transition-colors"><Icons.X className="w-4 h-4" /></button>}
                  </div>
                  <div className="flex items-center space-x-3 bg-[#F6EFE9] rounded-2xl p-2.5 px-4 border border-[#E8DCC8]">
                    <span className="text-sm font-bold text-gray-500 uppercase">Sort:</span>
                    <select value={crmSortBy} onChange={(e) => setCrmSortBy(e.target.value)} className="bg-transparent text-lg font-bold focus:outline-none text-[#4A2511] cursor-pointer">
                      <option value="latestVisit">最新到店</option><option value="name_asc">姓名 (A-Z)</option><option value="stylist">設計師</option><option value="totalSpent">消費總額</option>
                    </select>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                {crmProfiles.filter(p => !crmSearchQuery || String(p.fullName).toLowerCase().includes(crmSearchQuery.toLowerCase()) || String(p.phone).includes(crmSearchQuery) || (p.interests && p.interests.some(t => t.toLowerCase().includes(crmSearchQuery.toLowerCase()))) || (p.tags && p.tags.some(t => t.label.toLowerCase().includes(crmSearchQuery.toLowerCase())))).map((client, i) => {
                  const isExpanded = expandedHistory[client.customerId]; const clientTheme = STYLIST_THEMES[client.preferredStylist] || STYLIST_THEMES['Others'];
                  return (
                  <div key={i} className="border-2 rounded-3xl p-6 transition-all bg-white hover:shadow-xl flex flex-col justify-between group relative" style={{ borderColor: clientTheme.light }}>
                    <div className="absolute top-4 right-4 flex space-x-2 opacity-0 group-hover:opacity-100 transition-opacity z-10">
                        <button onClick={() => setProfileEditData(client)} className="p-2 bg-gray-50 text-gray-400 hover:text-blue-600 rounded-xl transition-colors shadow-sm"><Icons.Edit/></button>
                        <button onClick={() => setConfirmDialog({ title: '確認刪除檔案', message: `確定要永久刪除客戶 ${client.fullName} 的所有資料與交易紀錄嗎？此操作無法復原。`, onConfirm: () => { setRawHistoryRecords(prev => prev.filter(r => r.customerId !== client.customerId)); triggerNotification('✅ 客戶檔案已刪除'); } })} className="p-2 bg-red-50 text-red-400 hover:text-red-600 rounded-xl transition-colors shadow-sm"><Icons.Trash/></button>
                    </div>
                    <div>
                      <div className="flex flex-col mb-3 pr-16 relative">
                          <div className="flex items-center space-x-3 mb-2"><span className="text-2xl font-black text-[#4A2511] truncate">{client.fullName}</span><span className="bg-[#F6EFE9] text-[#8B5A2B] text-xs px-2.5 py-1 rounded-md font-mono font-bold shrink-0 border border-[#E8DCC8]">{client.customerId}</span></div>
                          <div className="flex flex-wrap gap-1.5 mb-4">
                              {client.tags.map((t, idx) => <span key={idx} className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${t.color}`}>{t.label}</span>)}
                              {client.interests && client.interests.map((t, idx) => <span key={`int-${idx}`} className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-gray-100 text-gray-600 border border-gray-200">{t}</span>)}
                          </div>
                          <div className="flex items-center gap-4 mb-4">
                             <span className="text-xl font-black text-white px-3 py-1 rounded shadow-sm" style={{ backgroundColor: clientTheme.hex }}>{client.preferredStylist}</span>
                             <div className="text-xl font-black text-gray-500 flex items-center space-x-2"><span className={client.gender === 'Male' ? 'text-blue-600' : 'text-pink-600'}>{client.gender === 'Male' ? '男' : '女'}</span>{client.birthMonth && <span className="text-base">🎂 {client.birthMonth}</span>}</div>
                          </div>
                          <div className="text-sm font-bold text-gray-500 flex items-center flex-wrap gap-2">
                              {client.phone && <div className="flex items-center gap-1"><span>📞 {client.phone}</span><a href={getWaLink(client.phone)} target="_blank" rel="noopener noreferrer" className="text-emerald-500 hover:text-emerald-600 ml-1"><Icons.MessageCircle /></a></div>}
                              <span className="bg-gray-100 px-1.5 py-0.5 rounded text-xs">{client.language}</span>
                          </div>
                      </div>
                      <div className="grid grid-cols-2 gap-4 text-lg bg-[#F6EFE9]/50 p-5 rounded-2xl mb-4 border border-[#E8DCC8]">
                        <div><span className="text-sm text-gray-500 uppercase font-bold block mb-1">LTV (總消費)</span><span className="font-black text-[#4A2511] text-2xl">${client.totalSpent.toLocaleString()}</span></div>
                        <div><span className="text-sm text-gray-500 uppercase font-bold block mb-1">最近造訪</span><span className="font-black text-[#4A2511] text-base">{client.latestVisitDate === '1970-01-01' ? '無紀錄' : <>{client.latestVisitDate} <span className="text-xs font-bold text-gray-400 ml-1">({client.daysSince} 天前)</span></>}</span></div>
                      </div>
                    </div>
                    <div className="mt-2">
                      <button onClick={() => setExpandedHistory(prev => ({...prev, [client.customerId]: !prev[client.customerId]}))} className="w-full py-3 flex items-center justify-center space-x-2 text-lg font-bold rounded-xl transition-colors hover:bg-gray-100" style={{ color: clientTheme.hex, backgroundColor: clientTheme.light }}><Icons.History /> <span>{isExpanded ? '隱藏紀錄' : `展開完整紀錄 (${client.visitCount} 次)`}</span></button>
                      {isExpanded && (
                        <div className="mt-4 space-y-3 animate-in slide-in-from-top-2 max-h-[450px] overflow-y-auto custom-scrollbar pr-2">
                          {client.visits.map((v, vIdx) => (
                            <div key={vIdx} className="bg-white border-2 p-3 rounded-2xl shadow-sm relative group/record flex flex-col" style={{ borderColor: clientTheme.light }}>
                              <div className="flex justify-between font-black text-lg text-[#4A2511] mb-1 pr-12"><div className="flex items-center gap-2"><span>{parseDateFlexible(v.date)}</span></div><span style={{ color: clientTheme.hex }}>${parsePriceRobust(v.price).toLocaleString()}</span></div>
                              <p className="text-gray-600 font-bold text-sm mb-1">{v.services}</p>
                              {v.formula && <p className="font-mono text-xs text-gray-700 bg-gray-50 p-2 rounded-lg border border-gray-100 break-words whitespace-pre-wrap">{v.formula}</p>}
                              
                              {/* Visible View Photo Link (查看照片) */}
                              {v.photoLink && v.photoLink !== 'Local Image Bound' && (
                                <a href={v.photoLink} target="_blank" rel="noreferrer" className="mt-2 inline-flex items-center gap-1.5 px-3 py-1.5 bg-blue-50 text-blue-600 font-bold rounded-lg text-xs hover:bg-blue-100 transition-colors shadow-sm self-start">
                                  <Icons.Photo className="w-4 h-4" /> <span>查看照片 (View Photo)</span>
                                </a>
                              )}

                              <div className="absolute top-2 right-2 flex space-x-1 opacity-0 group-hover/record:opacity-100 transition-opacity">
                                 <button onClick={() => setEditModal({...v, firstName: client.fullName, customerId: client.customerId})} className="p-1.5 bg-gray-100 hover:text-blue-600 text-gray-500 rounded-lg"><Icons.Edit /></button>
                                 <button onClick={() => setConfirmDialog({ title: '刪除單筆紀錄', message: `確定刪除 ${v.date} 的紀錄嗎？`, onConfirm: () => { setRawHistoryRecords(prev => prev.filter(r => r.serviceId !== v.serviceId)); triggerNotification('✅ 紀錄已刪除'); } })} className="p-1.5 bg-gray-100 hover:text-red-600 text-gray-500 rounded-lg"><Icons.Trash /></button>
                              </div>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                )})}
              </div>
            </div>
          </div>
        )}

        {/* DASHBOARD TAB */}
        {}
        {activeTab === 'dashboard' && (
          <div className="max-w-[1500px] mx-auto space-y-8 animate-in fade-in duration-300 pb-10">
            <div className="bg-white border border-[#E8DCC8] rounded-3xl p-8 shadow-sm flex flex-col md:flex-row justify-between items-center gap-6">
               <h2 className="text-3xl lg:text-4xl font-black flex items-center space-x-4 text-[#4A2511]">
                  <div className="w-3 h-12 rounded-full bg-[#8B5A2B]"></div>
                  <span>營業數據儀表板</span>
                  <span className="text-sm font-bold bg-[#F6EFE9] text-[#8B5A2B] px-3 py-1 rounded-xl ml-4 tracking-widest">{dashboardData.start.toLocaleDateString('zh-HK')} - {dashboardData.end.toLocaleDateString('zh-HK')}</span>
               </h2>
               <div className="flex items-center gap-3 flex-wrap">
                   <div className="flex bg-[#F6EFE9] rounded-2xl p-1.5 min-h-[64px] border border-[#E8DCC8] flex-wrap">
                     <button onClick={() => handlePeriodChange(-1)} className="px-4 text-gray-400 hover:text-[#4A2511] transition-colors"><Icons.ChevronLeft /></button>
                     {['day', 'week', 'month', 'year', 'custom'].map(p => (
                       <button key={p} onClick={() => { playAudioFeedback('click'); setDashboardPeriod(p); setDashboardDateRef(new Date()); setDashboardStartDate(''); setDashboardEndDate(''); }} className={`px-6 rounded-xl text-xl font-bold capitalize transition-all ${dashboardPeriod === p ? 'bg-[#8B5A2B] text-white shadow-md' : 'text-gray-500 hover:bg-white/50'}`}>{p === 'day' ? '今日' : p === 'week' ? '本週' : p === 'month' ? '本月' : p === 'year' ? '全年' : '自訂'}</button>
                     ))}
                     <button onClick={() => handlePeriodChange(1)} className="px-4 text-gray-400 hover:text-[#4A2511] transition-colors"><Icons.ChevronRight /></button>
                   </div>
                   {dashboardPeriod === 'custom' && (
                     <div className="flex bg-white rounded-2xl p-1.5 h-[64px] border border-[#E8DCC8] shadow-sm items-center px-4 gap-2 animate-in fade-in zoom-in-95">
                         <span className="text-sm font-bold text-gray-400">從:</span>
                         <input type="date" value={dashboardStartDate} onChange={e=>{setDashboardStartDate(e.target.value); setDashboardPeriod('custom');}} className="font-bold text-[#8B5A2B] outline-none bg-transparent"/>
                         <span className="text-gray-300">至:</span>
                         <input type="date" value={dashboardEndDate} onChange={e=>{setDashboardEndDate(e.target.value); setDashboardPeriod('custom');}} className="font-bold text-[#8B5A2B] outline-none bg-transparent"/>
                     </div>
                   )}
               </div>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
               <div className="border border-[#4A2511] rounded-3xl p-6 shadow-lg" style={{ backgroundColor: '#4A2511' }}><h3 className="text-sm font-bold text-[#E8DCC8] mb-2">總營業額</h3><p className="text-4xl font-black text-white">${dashboardData.rev.toLocaleString()}</p>{dashboardData.changes && <p className={`text-sm font-bold mt-2 ${dashboardData.changes.rev >= 0 ? 'text-emerald-400' : 'text-red-400'}`}>{dashboardData.changes.rev >= 0 ? '▲' : '▼'} {Math.abs(dashboardData.changes.rev)}%</p>}</div>
               <div className="bg-white border border-[#E8DCC8] rounded-3xl p-6 shadow-sm"><h3 className="text-sm font-bold text-gray-400 mb-2">服務客數</h3><p className="text-4xl font-black text-[#4A2511]">{dashboardData.clients} <span className="text-xl text-gray-300">位</span></p>{dashboardData.changes && <p className={`text-sm font-bold mt-2 ${dashboardData.changes.clients >= 0 ? 'text-emerald-500' : 'text-red-500'}`}>{dashboardData.changes.clients >= 0 ? '▲' : '▼'} {Math.abs(dashboardData.changes.clients)}%</p>}</div>
               <div className="bg-white border border-[#E8DCC8] rounded-3xl p-6 shadow-sm"><h3 className="text-sm font-bold text-gray-400 mb-2">平均客單價</h3><p className="text-4xl font-black text-[#4A2511]">${dashboardData.avgSpending.toLocaleString()}</p>{dashboardData.changes && <p className={`text-sm font-bold mt-2 ${dashboardData.changes.avg >= 0 ? 'text-emerald-500' : 'text-red-500'}`}>{dashboardData.changes.avg >= 0 ? '▲' : '▼'} {Math.abs(dashboardData.changes.avg)}%</p>}</div>
               <div className="bg-white border border-[#E8DCC8] rounded-3xl p-6 shadow-sm"><h3 className="text-sm font-bold text-gray-400 mb-2">新客數</h3><p className="text-4xl font-black text-[#4A2511]">{dashboardData.newCus} <span className="text-xl text-gray-300">位</span></p>{dashboardData.changes && <p className={`text-sm font-bold mt-2 ${dashboardData.changes.newCus >= 0 ? 'text-emerald-500' : 'text-red-500'}`}>{dashboardData.changes.newCus >= 0 ? '▲' : '▼'} {Math.abs(dashboardData.changes.newCus)}%</p>}</div>
            </div>

            <div className="bg-white border border-[#E8DCC8] rounded-3xl p-6 shadow-sm">
                <h3 className="text-sm font-bold uppercase tracking-widest text-[#4A2511] mb-6">客群佔比分析</h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                    <MeterChart title="新舊客佔比" data={[{name: '舊客', value: dashboardData.retCusPct}, {name: '新客', value: dashboardData.newCusPct}]} colors={['#10b981', '#f59e0b']} />
                    <MeterChart title="零售產品佔比" data={[{name: '服務', value: (100 - dashboardData.retailPct).toFixed(1)}, {name: '產品', value: dashboardData.retailPct}]} colors={['#3b82f6', '#8b5cf6']} />
                    <MeterChart title="男女比例" data={[{name: '女', value: dashboardData.femalePct}, {name: '男', value: dashboardData.malePct}]} colors={['#ec4899', '#3b82f6']} />
                    <MeterChart title="語言佔比" data={[{name: '中文', value: dashboardData.zhPct}, {name: 'EN', value: dashboardData.enPct}]} colors={['#8B5A2B', '#9ca3af']} />
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                <div className="lg:col-span-8 bg-white border border-[#E8DCC8] rounded-3xl p-6 shadow-sm">
                    <h3 className="text-xl font-black mb-6 text-[#4A2511] flex items-center gap-2"><Icons.Gift /> 推薦計畫成效追蹤 (Referral Program)</h3>
                    <div className="flex flex-col md:flex-row gap-6 items-center mb-6">
                        <div className="bg-pink-50 p-5 rounded-2xl flex-1 border border-pink-100 w-full text-center md:text-left"><p className="text-sm font-bold text-pink-600 mb-1">歷史推薦新客總數 (All Time)</p><p className="text-4xl font-black text-pink-700">{dashboardData.referral.totalReferred} <span className="text-lg text-pink-500">位</span></p></div>
                        <div className="bg-emerald-50 p-5 rounded-2xl flex-1 border border-emerald-100 w-full text-center md:text-left"><p className="text-sm font-bold text-emerald-600 mb-1">歷史推薦總營收 (All Time)</p><p className="text-4xl font-black text-emerald-700">${dashboardData.referral.revenue.toLocaleString()}</p></div>
                    </div>
                    <div>
                        <h4 className="text-sm font-bold text-gray-500 mb-3 uppercase tracking-wider">👑 Top 推薦達人 排行榜 (Top 5 All Time)</h4>
                        <div className="space-y-2">
                            {dashboardData.referral.topReferrers.length > 0 ? dashboardData.referral.topReferrers.map((r, i) => (
                                <div key={i} className="flex justify-between items-center bg-gray-50 p-3 rounded-xl border border-gray-100">
                                    <div className="flex items-center gap-3"><span className="w-6 h-6 rounded-full bg-yellow-100 text-yellow-600 flex items-center justify-center font-bold text-xs">{i+1}</span><span className="font-bold text-[#4A2511] text-lg">{r.name}</span></div>
                                    <div className="flex gap-4 text-sm font-bold"><span className="text-gray-500">{r.count} 位</span><span className="text-emerald-600">${r.revenue.toLocaleString()}</span></div>
                                </div>
                            )) : <div className="text-sm font-bold text-gray-400 p-4 text-center bg-gray-50 rounded-xl">資料庫尚無推薦紀錄</div>}
                        </div>
                    </div>
                </div>
                <div className="lg:col-span-4 bg-white border border-[#E8DCC8] rounded-3xl p-6 shadow-sm h-full flex flex-col">
                 <h3 className="text-xl font-black mb-6 text-[#4A2511]">新客來源分布 (本期)</h3>
                 {dashboardData.sourceChart.length > 0 ? (
                    <ResponsiveContainer width="100%" height="100%">
                        <PieChart>
                            <Pie data={dashboardData.sourceChart} cx="50%" cy="50%" innerRadius={50} outerRadius={80} paddingAngle={5} dataKey="value">
                                {dashboardData.sourceChart.map((entry, index) => <Cell key={`cell-${index}`} fill={CHART_COLORS[index % CHART_COLORS.length]} />)}
                            </Pie>
                            <Tooltip contentStyle={{borderRadius: '12px', fontWeight: 'bold', border: 'none', boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1)'}}/>
                            <Legend verticalAlign="bottom" height={36} iconType="circle" wrapperStyle={{fontWeight: 'bold', fontSize: '13px'}}/>
                        </PieChart>
                    </ResponsiveContainer>
                 ) : <div className="flex-1 flex items-center justify-center text-xl font-bold text-gray-300">無資料</div>}
              </div>
            </div>

            <div className="bg-white border border-[#E8DCC8] rounded-3xl p-6 shadow-sm h-[400px] flex flex-col">
                <h3 className="text-xl font-black text-[#4A2511] mb-6">客流量分布 (Traffic via Date) <span className="text-xs text-red-500 bg-red-50 px-2 py-1 rounded-md ml-2 align-middle">紅柱為星期日</span></h3>
                <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={dashboardData.dailyChart} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                        <XAxis dataKey="time" axisLine={false} tickLine={false} tick={{fill:'#9ca3af', fontSize:12, fontWeight:'bold'}} />
                        <YAxis axisLine={false} tickLine={false} tick={{fill:'#9ca3af', fontSize:12}} />
                        <Tooltip cursor={{fill: '#F6EFE9'}} contentStyle={{borderRadius:'12px', fontWeight:'bold', border:'none', boxShadow:'0 10px 15px -3px rgba(0,0,0,0.1)'}} formatter={(value)=>[`${value} 人`, '客數']} />
                        <Bar dataKey="count" radius={[6, 6, 0, 0]}>
                            {dashboardData.dailyChart.map((entry, index) => <Cell key={`cell-${index}`} fill={entry.isSunday ? '#ef4444' : '#8B5A2B'} />)}
                        </Bar>
                    </BarChart>
                </ResponsiveContainer>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 h-[400px]">
              <div className="lg:col-span-8 bg-white border border-[#E8DCC8] rounded-3xl p-6 shadow-sm flex flex-col">
                  <h3 className="text-xl font-black mb-6 text-[#4A2511]">熱門服務分布 (Services by Stylist)</h3>
                  {dashboardData.serviceChart.length > 0 ? (
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={dashboardData.serviceChart} margin={{ top: 0, right: 0, left: -20, bottom: 0 }}>
                        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E8DCC8" opacity={0.5} />
                        <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: '#4A2511', fontSize: 11, fontWeight: 'bold' }} />
                        <YAxis axisLine={false} tickLine={false} tick={{ fill: '#9ca3af', fontSize: 12 }} />
                        <Tooltip cursor={{fill: '#F6EFE9'}} contentStyle={{borderRadius:'12px', fontWeight:'bold', border:'none', boxShadow:'0 10px 15px -3px rgba(0,0,0,0.1)'}} />
                        <Legend verticalAlign="top" height={36} iconType="circle" wrapperStyle={{fontWeight: 'bold', fontSize: '13px'}} />
                        <Bar dataKey="Man" stackId="a" fill={STYLIST_THEMES.Man.hex} radius={[0, 0, 0, 0]} />
                        <Bar dataKey="Becky" stackId="a" fill={STYLIST_THEMES.Becky.hex} radius={[0, 0, 0, 0]} />
                        <Bar dataKey="Sammy" stackId="a" fill={STYLIST_THEMES.Sammy.hex} radius={[0, 0, 0, 0]} />
                        <Bar dataKey="Others" stackId="a" fill={STYLIST_THEMES.Others.hex} radius={[6, 6, 0, 0]} />
                      </BarChart>
                    </ResponsiveContainer>
                  ) : <div className="flex-1 flex items-center justify-center text-xl font-bold text-gray-300">此區間尚無數據</div>}
              </div>
              <div className="lg:col-span-4 bg-white border border-[#E8DCC8] rounded-3xl p-6 shadow-sm flex flex-col">
                <h3 className="text-xl font-black mb-6 text-[#4A2511]">設計師業績分布</h3>
                {dashboardData.stylistChart.length > 0 ? (
                  <ResponsiveContainer width="100%" height="100%">
                    <ComposedChart data={dashboardData.stylistChart} layout="vertical" margin={{ top: 0, right: 100, left: 0, bottom: 0 }}>
                      <XAxis type="number" hide />
                      <YAxis dataKey="name" type="category" axisLine={false} tickLine={false} tick={{ fill: '#4A2511', fontSize: 13, fontWeight: 'bold' }} width={80}/>
                      <Tooltip cursor={{fill: 'transparent'}} formatter={(value, name) => name === 'revenue' ? `$${value.toLocaleString()}` : `${value} 人`} />
                      <Bar dataKey="revenue" radius={[0, 8, 8, 0]} barSize={32}>
                        <LabelList dataKey="revenue" content={(props) => {
                           const { x, y, width, height, value, index } = props; if (x == null || y == null || width == null || height == null) return null;
                           const sty = dashboardData.stylistChart[index]; const cnt = sty ? sty.count : 0;
                           return <text x={x + width + 12} y={y + height / 2 + 1} fill="#4A2511" fontSize={13} fontWeight="bold" dominantBaseline="central">${Number(value || 0).toLocaleString()} / {cnt} 人</text>;
                        }} />
                        {dashboardData.stylistChart.map((entry, index) => <Cell key={`cell-${index}`} fill={STYLIST_THEMES[entry.name]?.hex || '#595959'} />)}
                      </Bar>
                    </ComposedChart>
                  </ResponsiveContainer>
                ) : <div className="flex-1 flex items-center justify-center text-xl font-bold text-gray-300">此區間尚無數據</div>}
              </div>
            </div>

            <div className="bg-white border border-[#E8DCC8] rounded-3xl shadow-sm overflow-hidden flex flex-col">
               <div className="flex justify-between items-center p-6 bg-[#F6EFE9] border-b border-[#E8DCC8]">
                   <h3 className="text-2xl font-black text-[#4A2511]">交易明細總表 <span className="text-sm font-bold text-gray-500">(可點擊編輯)</span></h3>
                   <button onClick={() => exportCSV('transactions')} className="bg-white border border-[#E8DCC8] px-4 py-2 rounded-xl text-[#8B5A2B] font-bold shadow-sm hover:bg-gray-50 flex items-center gap-2"><Icons.Download /> 匯出目前明細</button>
               </div>
               <div className="w-full">
                  <div className="grid grid-cols-12 gap-4 px-6 py-4 bg-[#F6EFE9]/50 border-b border-[#E8DCC8] text-sm font-black text-gray-500 tracking-wider">
                     <div className="col-span-2">服務日期 / 建立時間</div><div className="col-span-2">交易單號</div><div className="col-span-2">客戶姓名</div><div className="col-span-1 text-center">設計師</div><div className="col-span-3">服務/產品項目</div><div className="col-span-1">支付方式</div><div className="col-span-1 text-right">總額</div>
                  </div>
                  <div className="max-h-[600px] overflow-y-auto custom-scrollbar">
                     {dashboardData.records.length > 0 ? dashboardData.records.sort((a,b)=>new Date(b.timestamp||b.date).getTime() - new Date(a.timestamp||a.date).getTime()).map((r, i) => {
                         const dateObj = new Date(r.timestamp || r.date); const isDateValid = !isNaN(dateObj.getTime()); const styTheme = STYLIST_THEMES[r.stylist] || STYLIST_THEMES['Others'];
                         return (
                             <div key={i} onClick={() => setEditModal(r)} className="grid grid-cols-12 gap-4 px-6 py-5 border-b border-gray-100 items-center hover:bg-gray-50 cursor-pointer transition-colors group">
                                 <div className="col-span-2 flex flex-col"><span className="font-black text-[#4A2511] text-base">{isDateValid ? dateObj.toLocaleDateString('en-CA') : r.date}</span><span className="text-xs font-bold text-gray-400 font-mono mt-0.5">{isDateValid && r.timestamp ? `${String(dateObj.getMonth()+1).padStart(2,'0')}/${String(dateObj.getDate()).padStart(2,'0')} ${String(dateObj.getHours()).padStart(2,'0')}:${String(dateObj.getMinutes()).padStart(2,'0')}` : ''}</span></div>
                                 <div className="col-span-2 font-mono text-gray-400 font-bold text-sm tracking-wide">{r.serviceId}</div>
                                 <div className="col-span-2 flex items-center gap-2 font-black text-[#8B5A2B] text-lg"><Icons.User /> {r.firstName}</div>
                                 <div className="col-span-1 flex justify-center"><span className="text-white text-xs font-bold px-3 py-1 rounded-md" style={{ backgroundColor: styTheme.hex }}>{r.stylist}</span></div>
                                 <div className="col-span-3 text-sm font-bold text-gray-600 truncate pr-4">{[r.services, r.retailItems].filter(Boolean).join(', ')}</div>
                                 <div className="col-span-1 text-sm font-bold text-gray-500">{r.paymentMethod}</div>
                                 <div className="col-span-1 text-right font-black text-[#4A2511] text-xl">${parsePriceRobust(r.price).toLocaleString()}</div>
                             </div>
                         );
                     }) : <div className="text-center py-10 font-bold text-gray-400">目前區間無交易紀錄</div>}
                  </div>
               </div>
            </div>
          </div>
        )}

        {/* DATAHUB TAB */}
        {}
        {activeTab === 'datahub' && !dataHubUnlocked && (
           <div className="flex flex-col items-center justify-center pt-20 animate-in zoom-in-95">
               <div className="bg-white border p-10 rounded-3xl shadow-xl max-w-sm w-full text-center">
                   <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6 text-gray-400"><Icons.Lock /></div>
                   <h3 className="text-2xl font-black mb-2 text-[#4A2511]">安全鎖定</h3>
                   <p className="text-sm font-bold text-gray-500 mb-6">請輸入店長密碼以進入資料中心</p>
                   <input type="password" placeholder="••••" value={authPassword} onChange={e=>setAuthPassword(e.target.value)} onKeyDown={e=>{if(e.key==='Enter' && authPassword==='8888'){playAudioFeedback('success');setDataHubUnlocked(true);setAuthPassword('');}}} className="w-full bg-gray-50 border rounded-xl py-3 px-4 text-center text-2xl tracking-widest outline-none focus:border-[#8B5A2B] mb-4" />
                   <button onClick={()=>{if(authPassword==='8888'){setDataHubUnlocked(true);setAuthPassword('');}}} className="w-full bg-[#8B5A2B] text-white font-bold py-3 rounded-xl">解鎖</button>
               </div>
           </div>
        )}

        {/* DATAHUB TAB UNLOCKED */}
        {activeTab === 'datahub' && dataHubUnlocked && (
          <div className="max-w-[1500px] mx-auto space-y-6 animate-in fade-in duration-300 pb-10">
            <div className="bg-white border border-[#E8DCC8] rounded-3xl p-6 shadow-sm flex items-center justify-between gap-4">
               <h2 className="text-3xl font-black text-[#4A2511]">系統資料中心 (Data Hub)</h2>
               <button onClick={()=>setDataHubUnlocked(false)} className="text-gray-400 hover:bg-gray-100 p-2 rounded-xl flex items-center gap-1 font-bold text-sm"><Icons.Lock/> 重新上鎖</button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="bg-white border border-[#E8DCC8] rounded-3xl p-8 shadow-sm">
                  <h3 className="text-2xl font-black text-[#4A2511] mb-6 border-b border-gray-100 pb-4">API 雲端串接設定</h3>
                  <div className="space-y-4 mb-6">
                      <div><label className="block text-sm font-bold text-gray-600 mb-1">CRM Google Sheet Webhook API</label><input type="text" value={driveApiUrl} onChange={(e) => setDriveApiUrl(e.target.value)} className="w-full bg-blue-50 border-blue-200 border rounded-xl py-3 px-4 text-sm font-mono outline-none text-blue-900" /></div>
                      <div><label className="block text-sm font-bold text-gray-600 mb-1">Google Calendar Webhook API</label><input type="text" value={calendarApiUrl} onChange={(e) => setCalendarApiUrl(e.target.value)} className="w-full bg-yellow-50 border-yellow-200 border rounded-xl py-3 px-4 text-sm font-mono outline-none text-yellow-900" /></div>
                  </div>
                  <div className="flex gap-4">
                      <button onClick={() => setConfirmDialog({ title: '強制上傳備份', message: '這將會把目前系統內的所有資料強制覆蓋到 Google Sheet 雲端。確定繼續嗎？', onConfirm: handleCloudBackup })} className="flex-1 bg-blue-600 text-white font-bold py-3 rounded-xl flex justify-center items-center gap-2 hover:bg-blue-700"><Icons.Upload /> 備份至雲端</button>
                      <button onClick={() => setConfirmDialog({ title: '強制雲端還原', message: '這將會清除目前系統的資料，並從 Google Sheet 雲端下載覆蓋。確定繼續嗎？', onConfirm: handleCloudRestore })} className="flex-1 bg-emerald-600 text-white font-bold py-3 rounded-xl flex justify-center items-center gap-2 hover:bg-emerald-700"><Icons.Download /> 從雲端庫還原</button>
                  </div>
                </div>

                <div className="bg-white border border-[#E8DCC8] rounded-3xl p-8 shadow-sm flex flex-col justify-between">
                  <div>
                      <h3 className="text-2xl font-black text-[#4A2511] mb-6 border-b border-gray-100 pb-4">本地檔案匯出與還原</h3>
                      <div className="grid grid-cols-2 gap-4 mb-6">
                         <button onClick={() => exportCSV('customers')} className="bg-gray-100 hover:bg-gray-200 text-gray-700 font-bold py-3 rounded-xl flex items-center justify-center gap-2"><Icons.Download /> 匯出客戶 CSV</button>
                         <button onClick={() => exportCSV('transactions')} className="bg-gray-100 hover:bg-gray-200 text-gray-700 font-bold py-3 rounded-xl flex items-center justify-center gap-2"><Icons.Download /> 匯出交易 CSV</button>
                      </div>
                      <div className="flex gap-4">
                          <button onClick={() => {
                             const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(rawHistoryRecords));
                             const dlAnchorElem = document.createElement('a'); dlAnchorElem.setAttribute("href", dataStr); dlAnchorElem.setAttribute("download", `Headline_Backup_${new Date().toISOString().split('T')[0]}.json`); dlAnchorElem.click(); triggerNotification('✅ JSON 備份已下載');
                          }} className="flex-1 border-2 border-[#8B5A2B] text-[#8B5A2B] font-bold py-3 rounded-xl flex justify-center items-center gap-2 hover:bg-[#F6EFE9]"><Icons.Download /> 匯出 JSON</button>
                          
                          <label className="flex-1 border-2 border-[#8B5A2B] bg-[#8B5A2B] text-white font-bold py-3 rounded-xl flex justify-center items-center gap-2 hover:bg-[#6D3A14] cursor-pointer">
                              <Icons.Upload /> 匯入 JSON
                              <input type="file" accept=".json" className="hidden" onChange={(e) => {
                                  const file = (e.target as any).files[0]; if (!file) return; const reader = new FileReader();
                                  reader.onload = (event) => { setConfirmDialog({ title: '確認還原 JSON', message: '這將覆蓋目前的系統資料。確定繼續嗎？', onConfirm: () => { try { setRawHistoryRecords(JSON.parse(event.target.result as string)); triggerNotification('✅ JSON 資料還原成功'); } catch(err) { triggerNotification('❌ 檔案格式錯誤'); } } }); }; reader.readAsText(file); e.target.value = '';
                              }} />
                          </label>
                      </div>
                  </div>
                  <div className="mt-8 pt-6 border-t border-red-100">
                     <button onClick={() => setConfirmDialog({ title: '⚠️ 嚴重警告：清空所有資料', message: '此操作將徹底刪除系統內所有的客戶與交易紀錄，並且無法復原！強烈建議先進行 JSON 備份。您確定要清空嗎？', onConfirm: () => { setRawHistoryRecords([]); triggerNotification('🗑️ 系統已清空'); } })} className="w-full bg-red-50 text-red-600 border border-red-200 hover:bg-red-600 hover:text-white font-black py-4 rounded-2xl transition-colors">Factory Reset (清空所有資料)</button>
                  </div>
                </div>
            </div>
          </div>
        )}
      </main>

      {}
      {/* CONFIRM DIALOG MODAL */}
      {confirmDialog && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-[300] p-4">
          <div className="bg-white rounded-[2rem] max-w-sm w-full p-8 shadow-2xl animate-in zoom-in-95 duration-200 text-center">
            <div className="w-16 h-16 bg-red-100 text-red-500 rounded-full flex items-center justify-center mx-auto mb-4"><Icons.AlertTriangle /></div>
            <h3 className="text-2xl font-black mb-2 text-gray-800">{confirmDialog.title}</h3>
            <p className="text-gray-500 font-bold text-sm mb-8 leading-relaxed whitespace-pre-wrap">{confirmDialog.message}</p>
            <div className="flex gap-3">
               <button onClick={() => { if(confirmDialog.onCancel) confirmDialog.onCancel(); setConfirmDialog(null); }} className="flex-1 py-3 rounded-xl font-bold bg-gray-100 text-gray-600 hover:bg-gray-200 transition-colors">取消 (Cancel)</button>
               <button onClick={() => { confirmDialog.onConfirm(); setConfirmDialog(null); }} className="flex-1 py-3 rounded-xl font-black bg-red-500 text-white shadow-md hover:bg-red-600 transition-colors">確認 (Confirm)</button>
            </div>
          </div>
        </div>
      )}

      {/* SUCCESS MODAL */}
      {showSuccessModal && (
        <div className="fixed inset-0 bg-[#4A2511]/60 backdrop-blur-sm flex items-center justify-center z-[100] p-4">
          <div className="bg-white rounded-[3rem] max-w-lg w-full p-12 text-center shadow-2xl animate-in zoom-in-95 duration-300">
            <div className="w-24 h-24 bg-emerald-100 text-emerald-500 rounded-full flex items-center justify-center mx-auto mb-6"><Icons.Check className="w-12 h-12" /></div>
            <h3 className="text-4xl font-black mb-4 text-[#4A2511]">結帳成功！</h3>
            <div className="bg-yellow-50 border border-yellow-200 p-4 rounded-2xl mb-8">
                <p className="text-yellow-800 font-bold text-lg">💡 請記得邀請客人留下 Google 好評！</p>
                <p className="text-yellow-600 text-sm mt-1">累積好評有助於提升沙龍排名與新客來店率</p>
            </div>
            <button onClick={() => { playAudioFeedback('click'); setShowSuccessModal(false); }} className="mt-2 w-full text-white font-black py-5 rounded-2xl text-2xl transition-all shadow-lg hover:scale-105" style={{ backgroundColor: activeTheme.hex }}>完成 (Done)</button>
          </div>
        </div>
      )}

      {/* SMART FORMULA POPUP MODAL */}
      {confirmFormulaModal && (
        <div className="fixed inset-0 bg-[#4A2511]/60 backdrop-blur-sm flex items-center justify-center z-[300] p-4">
             <div className="bg-white rounded-[2rem] max-w-sm w-full p-8 shadow-2xl animate-in zoom-in-95 text-center">
                 <div className="w-16 h-16 bg-blue-100 text-blue-500 rounded-full flex items-center justify-center mx-auto mb-4"><Icons.Refresh className="w-8 h-8" /></div>
                 <h3 className="text-2xl font-black mb-2 text-gray-800">載入歷史配方？</h3>
                 <p className="text-gray-500 font-bold text-sm mb-4">系統發現 <span className="text-[#8B5A2B]">{confirmFormulaModal.name}</span> 有歷史化學配方：</p>
                 <div className="bg-gray-50 p-4 rounded-xl text-left font-mono text-sm text-gray-700 mb-6 border border-gray-200 whitespace-pre-wrap max-h-40 overflow-y-auto custom-scrollbar">
                    {confirmFormulaModal.formula}
                 </div>
                 <div className="flex gap-3">
                    <button onClick={() => { setConfirmFormulaModal(null); }} className="flex-1 py-3 rounded-xl font-bold bg-gray-100 text-gray-600 hover:bg-gray-200 transition-colors">取消 (維持空白)</button>
                    <button onClick={() => { handleInputChange('formula', confirmFormulaModal.formula); setConfirmFormulaModal(null); playAudioFeedback('success'); }} className="flex-1 py-3 rounded-xl font-black bg-blue-500 text-white shadow-md hover:bg-blue-600 transition-colors">✅ 確認載入</button>
                 </div>
             </div>
        </div>
      )}

      {/* SCHEDULER ADD/EDIT MODAL */}
      {schedAddEditModal && (
         <div className="fixed inset-0 bg-[#4A2511]/60 backdrop-blur-sm flex items-center justify-center z-[200] p-4">
             <form onSubmit={handleSaveCalendarEvent} className="bg-white rounded-[2rem] max-w-md w-full p-8 shadow-2xl animate-in zoom-in-95 overflow-visible relative">
                 <button type="button" onClick={() => setSchedAddEditModal(null)} className="absolute top-6 right-6 text-gray-400 hover:text-gray-800"><Icons.X/></button>
                 <h3 className="text-2xl font-black mb-6 text-[#4A2511]">{schedAddEditModal.id ? '編輯預約' : '新增預約'}</h3>
                 <div className="space-y-4">
                     <div className="grid grid-cols-2 gap-3">
                         <div><label className="block text-xs font-bold mb-1 text-gray-500">日期</label><input type="date" required value={schedAddEditModal.date} onChange={e=>setSchedAddEditModal({...schedAddEditModal, date: e.target.value})} className="w-full bg-[#F6EFE9] rounded-xl py-3 px-3 font-bold outline-none" /></div>
                         <div><label className="block text-xs font-bold mb-1 text-gray-500">時間</label><select required value={schedAddEditModal.time} onChange={e=>setSchedAddEditModal({...schedAddEditModal, time: e.target.value})} className="w-full bg-[#F6EFE9] rounded-xl py-3 px-3 font-bold outline-none">{TIME_SLOTS.map(t=><option key={t} value={t}>{t}</option>)}</select></div>
                     </div>
                     <div className="relative z-50">
                         <label className="block text-xs font-bold mb-1 text-gray-500">顧客姓名 / 電話</label>
                         <div className="flex gap-2">
                             <input type="text" required placeholder="姓名..." value={schedAddEditModal.clientName} onChange={(e)=>{
                                 const val = e.target.value; setSchedAddEditModal({...schedAddEditModal, clientName: val});
                                 if(val.trim().length > 0) { const matches = crmProfiles.filter(p => String(p.fullName || '').toLowerCase().includes(val.toLowerCase()) || (p.phone && String(p.phone).includes(val))); setSchedNameSuggests(matches); setShowSchedNameSuggest(matches.length > 0); } else { setShowSchedNameSuggest(false); }
                             }} onBlur={() => setTimeout(() => setShowSchedNameSuggest(false), 200)} className="flex-1 bg-[#F6EFE9] rounded-xl py-3 px-4 font-bold outline-none" />
                             <input type="text" placeholder="電話..." value={schedAddEditModal.phone} onChange={e=>setSchedAddEditModal({...schedAddEditModal, phone: e.target.value})} className="w-1/3 bg-[#F6EFE9] rounded-xl py-3 px-3 font-bold outline-none" />
                         </div>
                         {showSchedNameSuggest && schedNameSuggests.length > 0 && (
                             <div className="absolute top-[100%] mt-1 left-0 right-0 bg-white border border-gray-200 rounded-xl shadow-xl max-h-40 overflow-y-auto">
                                 {schedNameSuggests.map(p => (
                                     <div key={p.customerId} onMouseDown={() => { setSchedAddEditModal({...schedAddEditModal, clientName: p.fullName, phone: p.phone}); setShowSchedNameSuggest(false); }} className="px-3 py-2 border-b last:border-0 hover:bg-gray-50 cursor-pointer"><span className="font-bold text-[#4A2511]">{p.fullName}</span> <span className="text-xs text-gray-500 ml-2">{p.phone}</span></div>
                                 ))}
                             </div>
                         )}
                     </div>
                     <div>
                         <label className="block text-xs font-bold mb-1 text-gray-500">服務內容</label>
                         <select required value={schedAddEditModal.service} onChange={e=>{ const svc = e.target.value; setSchedAddEditModal({...schedAddEditModal, service: svc, duration: SERVICE_DURATIONS[svc] || 60}); }} className="w-full bg-[#F6EFE9] rounded-xl py-3 px-4 font-bold outline-none cursor-pointer">
                             <option value="">- 選擇服務項目 -</option>{hairServices.map(s => <option key={s} value={s}>{s}</option>)}<option value="其他客製服務">其他客製服務</option>
                         </select>
                     </div>
                     <div className="grid grid-cols-2 gap-3">
                         <div><label className="block text-xs font-bold mb-1 text-gray-500">設計師</label><select required value={schedAddEditModal.stylist} onChange={e=>setSchedAddEditModal({...schedAddEditModal, stylist: e.target.value})} className="w-full bg-[#F6EFE9] rounded-xl py-3 px-3 font-bold outline-none">{stylists.filter(s=>s!=='Others').map(s=><option key={s} value={s}>{s}</option>)}</select></div>
                         <div><label className="block text-xs font-bold mb-1 text-gray-500">預計時長 (自動估算)</label><select required value={schedAddEditModal.duration} onChange={e=>setSchedAddEditModal({...schedAddEditModal, duration: e.target.value})} className="w-full bg-[#F6EFE9] rounded-xl py-3 px-3 font-bold outline-none text-[#8B5A2B]"><option value="30">30 min</option><option value="60">60 min</option><option value="90">90 min</option><option value="120">120 min</option><option value="150">150 min</option><option value="180">180 min</option><option value="240">240 min</option></select></div>
                     </div>
                     <div><label className="block text-xs font-bold mb-1 text-gray-500">備註 (Optional)</label><textarea rows={2} placeholder="特別要求..." value={schedAddEditModal.notes} onChange={e=>setSchedAddEditModal({...schedAddEditModal, notes: e.target.value})} className="w-full bg-[#F6EFE9] rounded-xl py-3 px-4 font-bold outline-none" /></div>
                 </div>
                 <button type="submit" className="w-full mt-6 bg-[#8B5A2B] text-white font-black py-4 rounded-xl shadow-lg hover:bg-[#6D3A14]">儲存預約 (Save)</button>
             </form>
         </div>
      )}

      {/* SCHEDULER DETAIL MODAL */}
      {schedDetailModal && (
        <div className="fixed inset-0 bg-[#4A2511]/60 backdrop-blur-sm flex items-center justify-center z-[200] p-4">
            <div className="bg-white rounded-[2rem] max-w-sm w-full p-8 shadow-2xl animate-in zoom-in-95 relative border-4" style={{ borderColor: STYLIST_THEMES[schedDetailModal.stylist].hex }}>
                <button type="button" onClick={() => setSchedDetailModal(null)} className="absolute top-4 right-4 text-gray-400 hover:text-gray-800"><Icons.X/></button>
                <div className="mb-6">
                    <span className="px-3 py-1 text-white text-xs font-black rounded-md mb-3 inline-block shadow-sm" style={{ backgroundColor: STYLIST_THEMES[schedDetailModal.stylist].hex }}>{schedDetailModal.stylist}</span>
                    <h3 className="text-3xl font-black text-[#4A2511] leading-tight">{schedDetailModal.clientName}</h3>
                    <p className="text-[#8B5A2B] font-bold text-lg mt-1">{schedDetailModal.date} {schedDetailModal.time}</p>
                </div>
                <div className="space-y-4 mb-8">
                    <div><span className="text-xs font-bold text-gray-400 block mb-1 uppercase tracking-wider">預約服務</span><p className="text-gray-800 font-bold bg-gray-50 p-3 rounded-xl">{schedDetailModal.service}</p></div>
                    {schedDetailModal.phone && <div><span className="text-xs font-bold text-gray-400 block mb-1 uppercase tracking-wider">聯絡電話</span><a href={getWaLink(schedDetailModal.phone)} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-emerald-600 font-bold bg-emerald-50 p-3 rounded-xl hover:bg-emerald-100 transition-colors"><Icons.MessageCircle/> <span>{schedDetailModal.phone}</span></a></div>}
                    {schedDetailModal.notes && <div><span className="text-xs font-bold text-gray-400 block mb-1 uppercase tracking-wider">備註</span><p className="text-gray-600 text-sm font-bold bg-yellow-50/50 p-3 rounded-xl border border-yellow-100 whitespace-pre-wrap">{schedDetailModal.notes}</p></div>}
                </div>
                <div className="flex flex-col gap-3">
                    <button onClick={() => {
                        const existingClient = crmProfiles.find(p => p.fullName === schedDetailModal.clientName || (p.phone && p.phone === schedDetailModal.phone));
                        if (existingClient) { handleSelectSuggest(existingClient); setFormData(prev => ({ ...prev, stylist: schedDetailModal.stylist, notes: `預約服務: ${schedDetailModal.service}\n${schedDetailModal.notes}`, _eventId: schedDetailModal.id, _stylist: schedDetailModal.stylist })); } else { setFormData({ ...getInitialForm(), firstName: schedDetailModal.clientName, stylist: schedDetailModal.stylist, phone: schedDetailModal.phone || '', notes: `預約服務: ${schedDetailModal.service}\n${schedDetailModal.notes}`, _eventId: schedDetailModal.id, _stylist: schedDetailModal.stylist }); }
                        setSchedDetailModal(null); setActiveTab('checkout');
                    }} className="w-full bg-[#4A2511] text-white font-black py-4 rounded-xl shadow-lg flex items-center justify-center gap-2 hover:opacity-90"><Icons.Gift/> <span>立即結帳 (Checkout)</span></button>
                    <div className="flex gap-3">
                        <button onClick={() => { setSchedAddEditModal({...schedDetailModal, oldStylist: schedDetailModal.stylist}); setSchedDetailModal(null); }} className="flex-1 bg-gray-100 text-gray-700 font-bold py-3 rounded-xl hover:bg-gray-200">修改</button>
                        <button onClick={() => setConfirmDialog({ title: '刪除預約', message: `確定刪除 ${schedDetailModal.clientName} 的預約嗎？`, onConfirm: async () => { setCalendarEvents(prev => prev.filter(ev => ev.id !== schedDetailModal.id)); setSchedDetailModal(null); if (calendarApiUrl) fetch(getApiUrl(calendarApiUrl, 'delete_event'), { method: 'POST', body: JSON.stringify({ action: 'delete_event', stylist: schedDetailModal.stylist, eventId: schedDetailModal.id }), headers: { 'Content-Type': 'text/plain;charset=utf-8' }}); triggerNotification('✅ 已刪除預約'); } })} className="flex-1 bg-red-50 text-red-600 font-bold py-3 rounded-xl hover:bg-red-100 border border-red-100">刪除</button>
                    </div>
                </div>
            </div>
        </div>
      )}

      {showTagsConfig && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-[200] p-4">
            <div className="bg-white rounded-[2rem] max-w-sm w-full p-8 shadow-2xl animate-in zoom-in-95">
                <div className="flex justify-between items-center mb-6"><h3 className="text-xl font-black text-[#4A2511]">管理需求標籤</h3><button onClick={() => setShowTagsConfig(false)} className="text-gray-400 hover:text-gray-800"><Icons.X/></button></div>
                <div className="flex flex-wrap gap-2 max-h-[300px] overflow-y-auto mb-4 custom-scrollbar p-1">
                    {interestTags.map((tag, idx) => ( <div key={idx} className="flex items-center gap-1 bg-gray-100 border border-gray-200 px-3 py-1.5 rounded-xl"><span className="font-bold text-gray-700 text-sm">{tag}</span><button onClick={() => setInterestTags(interestTags.filter(t => t !== tag))} className="text-red-400 hover:text-red-600 ml-1"><Icons.X/></button></div> ))}
                </div>
                <form onSubmit={(e) => { e.preventDefault(); const val = (e.target as any).newTag.value.trim(); if(val && !interestTags.includes(val)) { setInterestTags([...interestTags, val]); (e.target as any).newTag.value = ''; } }} className="flex gap-2">
                    <input type="text" name="newTag" placeholder="新增標籤名稱..." className="flex-1 bg-gray-50 border border-gray-200 rounded-xl px-3 py-2 outline-none font-bold text-sm" />
                    <button type="submit" className="bg-[#8B5A2B] text-white px-4 py-2 rounded-xl font-bold"><Icons.Plus/></button>
                </form>
            </div>
        </div>
      )}

      {showServicesConfig && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-[200] p-4">
            <div className="bg-white rounded-[2rem] max-w-sm w-full p-8 shadow-2xl animate-in zoom-in-95">
                <div className="flex justify-between items-center mb-6"><h3 className="text-xl font-black text-[#4A2511]">管理服務清單</h3><button onClick={() => setShowServicesConfig(false)} className="text-gray-400 hover:text-gray-800"><Icons.X/></button></div>
                <div className="space-y-2 max-h-[300px] overflow-y-auto mb-4 custom-scrollbar">
                    {hairServices.map((svc, idx) => ( <div key={idx} className="flex justify-between items-center bg-gray-50 p-3 rounded-xl"><span className="font-bold text-gray-700 text-sm">{svc}</span><button onClick={() => setHairServices(hairServices.filter(s => s !== svc))} className="text-red-400 hover:text-red-600"><Icons.Trash/></button></div> ))}
                </div>
                <form onSubmit={(e) => { e.preventDefault(); const val = (e.target as any).newSvc.value.trim(); if(val && !hairServices.includes(val)) { setHairServices([...hairServices, val]); (e.target as any).newSvc.value = ''; } }} className="flex gap-2">
                    <input type="text" name="newSvc" placeholder="新增服務名稱..." className="flex-1 bg-gray-50 border border-gray-200 rounded-xl px-3 py-2 outline-none font-bold text-sm" />
                    <button type="submit" className="bg-[#8B5A2B] text-white px-4 py-2 rounded-xl font-bold"><Icons.Plus/></button>
                </form>
            </div>
        </div>
      )}

      {/* RECORD EDIT MODAL */}
      {editModal && (
        <div className="fixed inset-0 bg-[#4A2511]/60 backdrop-blur-sm flex items-center justify-center z-[100] p-4">
          <form onSubmit={(e) => {
            e.preventDefault(); const updatedRecord = { ...editModal };
            setRawHistoryRecords(prev => {
                const newRecords = prev.map(r => r.serviceId === updatedRecord.serviceId ? { ...r, ...updatedRecord } : r);
                if (driveApiUrl) { fetch(getApiUrl(driveApiUrl, 'sync_all'), { method: 'POST', body: JSON.stringify({ action: 'sync_all', records: newRecords }), headers: { 'Content-Type': 'text/plain;charset=utf-8' } }).catch(()=>{}); }
                return newRecords;
            });
            triggerNotification(`✅ 已更新紀錄並同步至雲端！`); setEditModal(null);
          }} className="bg-white rounded-[2rem] max-w-2xl w-full p-8 shadow-2xl flex flex-col relative">
            <button type="button" onClick={() => setEditModal(null)} className="absolute top-6 right-6 text-gray-400 hover:text-gray-800"><Icons.X/></button>
            <h3 className="text-3xl font-black mb-6 text-[#4A2511]">編輯服務紀錄</h3>
            <div className="grid grid-cols-2 gap-4 mb-4">
              <div><label className="block text-xs font-bold mb-1 text-gray-500">日期</label><input type="date" value={parseDateFlexible(editModal.date)} onChange={e=>setEditModal({...editModal, date: e.target.value})} className="w-full bg-[#F6EFE9] rounded-xl py-3 px-3 font-bold outline-none focus:bg-white border" /></div>
              <div><label className="block text-xs font-bold mb-1 text-gray-500">總金額 $</label><input type="number" value={editModal.price} onChange={e=>setEditModal({...editModal, price: e.target.value})} className="w-full bg-[#F6EFE9] rounded-xl py-3 px-3 font-bold outline-none focus:bg-white border" /></div>
              <div className="col-span-2"><label className="block text-xs font-bold mb-1 text-gray-500">服務與產品</label><input type="text" value={editModal.services||''} onChange={e=>setEditModal({...editModal, services: e.target.value})} className="w-full bg-[#F6EFE9] rounded-xl py-3 px-3 font-bold outline-none focus:bg-white border" /></div>
              <div className="col-span-2"><label className="block text-xs font-bold mb-1 text-gray-500">配方</label><textarea rows={3} value={editModal.formula||''} onChange={e=>setEditModal({...editModal, formula: e.target.value})} className="w-full bg-[#F6EFE9] rounded-xl py-3 px-3 font-bold outline-none focus:bg-white border font-mono text-sm" /></div>
            </div>
            <button type="submit" className="w-full py-4 mt-2 rounded-xl font-black text-xl text-white bg-[#8B5A2B] hover:bg-[#6D3A14] shadow-md transition-colors">儲存更新</button>
          </form>
        </div>
      )}

      {/* PROFILE EDIT MODAL */}
      {profileEditData && (
        <div className="fixed inset-0 bg-[#4A2511]/60 backdrop-blur-sm flex items-center justify-center z-[100] p-4">
          <form onSubmit={(e) => {
            e.preventDefault(); const newFullName = (e.target as any).fullName.value.trim();
            setRawHistoryRecords(prev => {
                const newRecords = prev.map(r => r.customerId === profileEditData.customerId ? { ...r, firstName: newFullName, lastName: '', name: newFullName, gender: (e.target as any).gender.value, language: (e.target as any).language.value, phone: (e.target as any).phone.value, interests: profileEditData.interests.join(', ') } : r);
                if (driveApiUrl) { fetch(getApiUrl(driveApiUrl, 'sync_all'), { method: 'POST', body: JSON.stringify({ action: 'sync_all', records: newRecords }), headers: { 'Content-Type': 'text/plain;charset=utf-8' } }).catch(()=>{}); }
                return newRecords;
            });
            triggerNotification(`✅ 已更新檔案並同步至雲端！`); setProfileEditData(null);
          }} className="bg-white rounded-[2rem] max-w-lg w-full p-8 shadow-2xl flex flex-col relative">
            <button type="button" onClick={() => setProfileEditData(null)} className="absolute top-6 right-6 text-gray-400 hover:text-gray-800"><Icons.X/></button>
            <h3 className="text-3xl font-black mb-6 text-[#4A2511]">編輯客戶基本資料</h3>
            <div className="space-y-4 mb-6">
              <div><label className="block text-xs font-bold mb-1 text-gray-500">姓名 (Full Name)</label><input type="text" name="fullName" defaultValue={profileEditData.fullName} required className="w-full bg-[#F6EFE9] border-transparent focus:bg-white focus:border-[#8B5A2B] border-2 rounded-xl py-3 px-4 font-bold outline-none" /></div>
              <div className="grid grid-cols-2 gap-3">
                <div><label className="block text-xs font-bold mb-1 text-gray-500">電話</label><input type="text" name="phone" defaultValue={profileEditData.phone} className="w-full bg-[#F6EFE9] border-transparent focus:bg-white focus:border-[#8B5A2B] border-2 rounded-xl py-3 px-4 font-bold outline-none" /></div>
                <div className="grid grid-cols-2 gap-2">
                    <div><label className="block text-xs font-bold mb-1 text-gray-500">性別</label><select name="gender" defaultValue={profileEditData.gender} className="w-full bg-[#F6EFE9] border-transparent focus:border-[#8B5A2B] border-2 rounded-xl py-3 px-2 font-bold outline-none"><option value="Female">女</option><option value="Male">男</option></select></div>
                    <div><label className="block text-xs font-bold mb-1 text-gray-500">語言</label><select name="language" defaultValue={profileEditData.language} className="w-full bg-[#F6EFE9] border-transparent focus:border-[#8B5A2B] border-2 rounded-xl py-3 px-2 font-bold outline-none"><option value="中文">中文</option><option value="EN">EN</option></select></div>
                </div>
              </div>
              <div className="pt-2">
                  <label className="block text-xs font-bold mb-2 text-gray-500">編輯標籤 (Interests & Tags)</label>
                  <div className="flex flex-wrap gap-2">
                     {interestTags.map(tag => {
                         const isSelected = profileEditData.interests.includes(tag);
                         return (
                             <button type="button" key={tag} onClick={() => { setProfileEditData(p => ({ ...p, interests: isSelected ? p.interests.filter(t => t !== tag) : [...p.interests, tag] })); }} className={`px-3 py-1.5 rounded-lg text-xs font-bold border transition-colors ${isSelected ? 'bg-[#8B5A2B] text-white border-[#8B5A2B]' : 'bg-white text-gray-500 border-gray-200 hover:bg-gray-50'}`}>{isSelected ? '✓ ' : ''}{tag}</button>
                         )
                     })}
                  </div>
              </div>
            </div>
            <button type="submit" className="w-full py-4 mt-2 rounded-xl font-black text-xl text-white bg-[#8B5A2B] hover:bg-[#6D3A14] shadow-md transition-colors">儲存更新</button>
          </form>
        </div>
      )}
    </div>
  );
}
