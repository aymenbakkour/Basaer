'use client';

import { useState, useEffect } from 'react';
import { useAppContext } from '@/lib/store';
import { QURAN_STATS } from '@/lib/quran-stats';
import { STUDY_PLANS, REVELATION_ORDER } from '@/lib/study-plans';
import { NOTE_CATEGORIES, getCategoryById } from '@/lib/categories';
import { MIRACLES_DATA } from '@/lib/miracles-data';
import Link from 'next/link';
import { BookOpen, CheckCircle, Clock, Star, Edit3, ChevronLeft, Download, Upload, User, ExternalLink, Settings, X, Moon, Sun, Calendar, FileText, BarChart2, Search, Map, ArrowUp, ArrowDown, Tag, Sparkles, ExternalLink as ExternalLinkIcon, Book, Award } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import GlobalSearch from '@/components/GlobalSearch';
import WelcomeModal from '@/components/WelcomeModal';
import TajweedSection from '@/components/TajweedSection';
import AboutAppSection from '@/components/AboutAppSection';
import DeveloperSection from '@/components/DeveloperSection';

import { BADGES } from '@/lib/badges-data';
import SurahBenefits from '@/components/SurahBenefits';
import QuranDuas from '@/components/QuranDuas';

function AchievementsList({ state }: { state: any }) {
  return (
    <>
      {BADGES.map((badge) => {
        const isEarned = badge.condition(state);
        return (
          <div 
            key={badge.id} 
            className={`p-6 rounded-2xl border ${isEarned ? 'border-[#556B2F] dark:border-[#A3B881] bg-white dark:bg-[#1A1D17]' : 'border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-900/50 opacity-60'} transition-all flex flex-col items-center text-center`}
          >
            <div className={`w-16 h-16 rounded-full flex items-center justify-center text-3xl mb-4 ${isEarned ? badge.color : 'bg-gray-200 dark:bg-gray-800 grayscale'}`}>
              {badge.icon}
            </div>
            <h3 className={`text-lg font-bold mb-2 ${isEarned ? 'text-[#2C3E18] dark:text-[#E5E5D8]' : 'text-gray-500 dark:text-gray-400'}`}>
              {badge.title}
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              {badge.description}
            </p>
            {!isEarned && (
              <div className="mt-4 text-xs font-medium text-gray-400 dark:text-gray-500 flex items-center gap-1">
                <div className="w-2 h-2 rounded-full bg-gray-300 dark:bg-gray-700"></div>
                لم تكتسب بعد
              </div>
            )}
            {isEarned && (
              <div className="mt-4 text-xs font-medium text-[#556B2F] dark:text-[#A3B881] flex items-center gap-1">
                <CheckCircle size={14} />
                تم الحصول عليها
              </div>
            )}
          </div>
        );
      })}
    </>
  );
}

export default function Dashboard() {
  const { state, toggleTheme, updateStudyPlan, importData, updateUserName } = useAppContext();
  const [activeSection, setActiveSection] = useState<'home' | 'settings' | 'stats' | 'search' | 'plan' | 'categories' | 'miracles' | 'developer' | 'about-app' | 'tajweed' | 'achievements' | 'benefits' | 'duas'>('home');
  const [mounted, setMounted] = useState(false);
  const [time, setTime] = useState(new Date());
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [expandedMiracle, setExpandedMiracle] = useState<string | null>(null);
  const [showWelcomeModal, setShowWelcomeModal] = useState(false);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMounted(true);
    
    // Check URL parameters for initial section
    const params = new URLSearchParams(window.location.search);
    const section = params.get('section');
    if (section === 'settings' || section === 'stats' || section === 'search' || section === 'plan' || section === 'categories' || section === 'miracles' || section === 'developer' || section === 'about-app' || section === 'tajweed' || section === 'achievements' || section === 'benefits' || section === 'duas') {
      setActiveSection(section as any);
      window.history.replaceState({}, '', '/');
    }
    
    const handleOpenSettings = () => setActiveSection('settings');
    const handleOpenStats = () => setActiveSection('stats');
    const handleOpenSearch = () => setActiveSection('search');
    const handleOpenPlan = () => setActiveSection('plan');
    const handleOpenCategories = () => setActiveSection('categories');
    const handleOpenMiracles = () => setActiveSection('miracles');
    const handleOpenDeveloper = () => setActiveSection('developer');
    const handleOpenAboutApp = () => setActiveSection('about-app');
    const handleOpenTajweed = () => setActiveSection('tajweed');
    const handleOpenAchievements = () => setActiveSection('achievements');
    const handleOpenBenefits = () => setActiveSection('benefits');
    const handleOpenDuas = () => setActiveSection('duas');
    const handleGoHome = () => setActiveSection('home');

    window.addEventListener('open-settings', handleOpenSettings);
    window.addEventListener('open-stats', handleOpenStats);
    window.addEventListener('open-search', handleOpenSearch);
    window.addEventListener('open-plan', handleOpenPlan);
    window.addEventListener('open-categories', handleOpenCategories);
    window.addEventListener('open-miracles', handleOpenMiracles);
    window.addEventListener('open-developer', handleOpenDeveloper);
    window.addEventListener('open-about-app', handleOpenAboutApp);
    window.addEventListener('open-tajweed', handleOpenTajweed);
    window.addEventListener('open-achievements', handleOpenAchievements);
    window.addEventListener('open-benefits', handleOpenBenefits);
    window.addEventListener('open-duas', handleOpenDuas);
    window.addEventListener('go-home', handleGoHome);

    return () => {
      window.removeEventListener('open-settings', handleOpenSettings);
      window.removeEventListener('open-stats', handleOpenStats);
      window.removeEventListener('open-search', handleOpenSearch);
      window.removeEventListener('open-plan', handleOpenPlan);
      window.removeEventListener('open-categories', handleOpenCategories);
      window.removeEventListener('open-miracles', handleOpenMiracles);
      window.removeEventListener('open-developer', handleOpenDeveloper);
      window.removeEventListener('open-about-app', handleOpenAboutApp);
      window.removeEventListener('open-tajweed', handleOpenTajweed);
      window.removeEventListener('open-achievements', handleOpenAchievements);
      window.removeEventListener('open-benefits', handleOpenBenefits);
      window.removeEventListener('open-duas', handleOpenDuas);
      window.removeEventListener('go-home', handleGoHome);
    };
  }, []);

  useEffect(() => {
    if (mounted && state.userName === '') {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setShowWelcomeModal(true);
    }
  }, [mounted, state.userName]);

  useEffect(() => {
    window.dispatchEvent(new CustomEvent('section-changed', { detail: activeSection }));
  }, [activeSection]);

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);
  const suras = Object.values(state.suras);
  let displaySuras = [...suras];
  if (state.studyPlan === 'chronological') {
    displaySuras.sort((a, b) => REVELATION_ORDER.indexOf(a.id) - REVELATION_ORDER.indexOf(b.id));
  } else if (state.studyPlan === 'short_to_long') {
    displaySuras.sort((a, b) => a.totalAyahs - b.totalAyahs);
  } else if (state.studyPlan === 'reverse') {
    displaySuras.sort((a, b) => b.id - a.id);
  } else if (state.studyPlan === 'custom' && state.customSuraOrder.length > 0) {
    displaySuras.sort((a, b) => {
      const indexA = state.customSuraOrder.indexOf(a.id);
      const indexB = state.customSuraOrder.indexOf(b.id);
      const posA = indexA !== -1 ? indexA : a.id + 1000;
      const posB = indexB !== -1 ? indexB : b.id + 1000;
      return posA - posB;
    });
  } else {
    displaySuras.sort((a, b) => a.id - b.id);
  }

  const completedSuras = suras.filter(s => s.status === 'completed');
  
  const totalNotes = suras.reduce((acc, sura) => acc + Object.keys(sura.notes).length, 0);
  
  const averageUnderstanding = completedSuras.length > 0 
    ? completedSuras.reduce((acc, sura) => acc + sura.understandingRating, 0) / completedSuras.length 
    : 0;
  const understandingPercentage = Math.round((averageUnderstanding / 5) * 100);

  const totalAyahsInQuran = 6236;
  const completedAyahs = completedSuras.reduce((acc, sura) => acc + sura.totalAyahs, 0);
  const quranCompletionPercentage = Math.round((completedAyahs / totalAyahsInQuran) * 100);

  const earnedBadges = BADGES.filter(badge => badge.condition(state));
  const latestBadge = earnedBadges.length > 0 ? earnedBadges[earnedBadges.length - 1] : null;

  const recentSuras = [...suras]
    .filter(s => s.lastModified > 0)
    .sort((a, b) => b.lastModified - a.lastModified)
    .slice(0, 4);

  const getRelativeTime = (timestamp: number) => {
    const rtf = new Intl.RelativeTimeFormat('ar-EG', { numeric: 'auto' });
    const now = time.getTime();
    const daysDifference = Math.round((timestamp - now) / (1000 * 60 * 60 * 24));
    const hoursDifference = Math.round((timestamp - now) / (1000 * 60 * 60));
    const minutesDifference = Math.round((timestamp - now) / (1000 * 60));

    if (Math.abs(minutesDifference) < 60) return rtf.format(minutesDifference, 'minute');
    if (Math.abs(hoursDifference) < 24) return rtf.format(hoursDifference, 'hour');
    return rtf.format(daysDifference, 'day');
  };

  const handleExport = () => {
    const exportedSuras = suras.filter(s => s.status !== 'not_started' || Object.keys(s.notes).length > 0);
    
    let content = "بسم الله الرحمن الرحيم\n\n";
    content += "تقرير تطبيق بصائر لمتابعة دراسة وتفسير القرآن الكريم\n";
    content += `تاريخ التصدير: ${new Date().toLocaleDateString('ar-EG')}\n`;
    content += "==================================================\n\n";

    if (exportedSuras.length === 0) {
      content += "لا توجد بيانات أو ملاحظات مسجلة حتى الآن.\n";
    }

    exportedSuras.forEach(sura => {
      content += `سورة ${sura.name}\n`;
      const statusAr = sura.status === 'completed' ? 'مكتملة' : sura.status === 'studying' ? 'قيد الدراسة' : 'لم تبدأ';
      content += `الحالة: ${statusAr}`;
      if (sura.status === 'completed') {
        content += ` | التقييم: ${sura.understandingRating}/5`;
      }
      content += "\n";

      const notes = Object.values(sura.notes).sort((a, b) => a.timestamp - b.timestamp);
      if (notes.length > 0) {
        content += "الملاحظات:\n";
        notes.forEach(note => {
          const noteStatusAr = note.status === 'understood' ? 'مفهوم' : note.status === 'needs_review' ? 'يحتاج مراجعة' : note.status === 'not_understood' ? 'غير مفهوم' : 'بدون وسم';
          content += `- ${note.title} [${noteStatusAr}]:\n  ${note.text}\n`;
        });
      }
      content += "--------------------------------------------------\n\n";
    });

    const blob = new Blob([content], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `basaer_export_${new Date().toISOString().split('T')[0]}.txt`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const handleBackup = () => {
    const backupData = JSON.stringify(state, null, 2);
    const blob = new Blob([backupData], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `basaer_backup_${new Date().toISOString().split('T')[0]}.json`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const handleRestore = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const content = e.target?.result as string;
        const parsedData = JSON.parse(content);
        
        if (parsedData && typeof parsedData === 'object' && 'suras' in parsedData) {
          importData(parsedData);
          alert('تم استعادة البيانات بنجاح');
        } else {
          alert('ملف النسخ الاحتياطي غير صالح');
        }
      } catch (error) {
        alert('حدث خطأ أثناء قراءة الملف');
      }
    };
    reader.readAsText(file);
    event.target.value = '';
  };

  return (
    <div className="max-w-4xl mx-auto p-4 md:p-8 pb-24 space-y-8">
      <WelcomeModal 
        isOpen={showWelcomeModal} 
        onSubmit={(name) => {
          updateUserName(name);
          setShowWelcomeModal(false);
        }} 
      />
      
      <header className="bg-white dark:bg-[#1A1D17] p-6 rounded-3xl shadow-sm border border-[#E5E5D8] dark:border-[#2C3E18] relative overflow-hidden transition-colors">
        <div className="absolute top-0 right-0 w-32 h-32 bg-[#F0F4E8] dark:bg-[#2C3E18] rounded-full -mr-10 -mt-10 opacity-50 dark:opacity-20"></div>
        <div className="absolute bottom-0 left-0 w-24 h-24 bg-[#F0F4E8] dark:bg-[#2C3E18] rounded-full -ml-8 -mb-8 opacity-50 dark:opacity-20"></div>

        <div className="relative z-10 flex flex-col gap-6">
          {/* Top Row: Title and Date/Time */}
          <div className="flex flex-row items-start justify-between w-full">
            {/* Title */}
            <div className="flex flex-col">
              <h1 className="text-2xl md:text-3xl font-bold text-[#3A4D1A] dark:text-[#E5E5D8] flex items-center gap-2">
                <BookOpen className="text-[#556B2F] dark:text-[#7A9A45]" size={28} />
                بصائر
              </h1>
              <p className="text-[#556B2F] dark:text-[#A3B881] mt-1 text-xs md:text-sm font-medium">
                {state.userName ? `مرحباً بك يا ${state.userName} في رحلة تدبر القرآن` : 'متابعة دراسة وتفسير القرآن الكريم'}
              </p>
            </div>

            {/* Date/Time (Top Left) */}
            {mounted && (
              <div className="flex flex-col items-end text-[#556B2F] dark:text-[#A3B881] text-[10px] md:text-xs font-medium opacity-70 text-left">
                <div className="flex items-center gap-1">
                  <span>{time.toLocaleDateString('ar-EG', { year: 'numeric', month: 'short', day: 'numeric' })}</span>
                  <Calendar size={12} />
                </div>
                <div className="flex items-center gap-1 mt-0.5">
                  <span dir="ltr">{time.toLocaleTimeString('ar-EG', { hour: '2-digit', minute: '2-digit' })}</span>
                  <Clock size={12} />
                </div>
              </div>
            )}
          </div>

          {/* Bottom Row: Progress & Badge */}
          <div className="flex flex-wrap items-center gap-3 bg-[#FDFBF7] dark:bg-[#121410] p-3 rounded-2xl border border-[#E5E5D8] dark:border-[#2C3E18] w-full mt-2">
            
            {/* Completed Suras */}
            <div className="flex flex-1 md:flex-none items-center gap-3 px-2">
              <div className="w-10 h-10 rounded-full bg-[#E5E5D8] dark:bg-[#2C3E18] flex items-center justify-center text-[#3A4D1A] dark:text-[#A3B881] shrink-0">
                <CheckCircle size={20} />
              </div>
              <div>
                <p className="text-[10px] md:text-xs text-gray-500 dark:text-gray-400 font-medium">السور المكتملة</p>
                <p className="text-sm md:text-lg font-bold text-[#3A4D1A] dark:text-[#E5E5D8]">{completedSuras.length} <span className="text-xs font-normal text-gray-400">/ 114</span></p>
              </div>
            </div>

            {/* Divider */}
            <div className="w-px h-10 bg-[#E5E5D8] dark:bg-[#2C3E18]"></div>

            {/* Latest Badge */}
            <div className="flex flex-1 md:flex-none items-center gap-3 px-2">
              {latestBadge ? (
                <>
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center text-xl shrink-0 ${latestBadge.color}`}>
                    {latestBadge.icon}
                  </div>
                  <div className="min-w-0">
                    <p className="text-[10px] md:text-xs text-gray-500 dark:text-gray-400 font-medium">أحدث شارة</p>
                    <p className="text-xs md:text-sm font-bold text-[#3A4D1A] dark:text-[#E5E5D8] truncate max-w-[90px] md:max-w-[120px]">{latestBadge.title}</p>
                  </div>
                </>
              ) : (
                <>
                  <div className="w-10 h-10 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center text-gray-400 shrink-0">
                    <Award size={20} />
                  </div>
                  <div className="min-w-0">
                    <p className="text-[10px] md:text-xs text-gray-500 dark:text-gray-400 font-medium">أحدث شارة</p>
                    <p className="text-xs md:text-sm font-medium text-gray-400 dark:text-gray-500 truncate">لا توجد بعد</p>
                  </div>
                </>
              )}
            </div>

          </div>
        </div>
      </header>

      <AnimatePresence mode="wait">
        {activeSection === 'search' && (
          <motion.div
            key="search"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
          >
            <GlobalSearch />
          </motion.div>
        )}

        {activeSection === 'settings' && (
          <motion.div 
            key="settings"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
            className="bg-white dark:bg-[#1A1D17] w-full rounded-3xl shadow-sm border border-[#E5E5D8] dark:border-[#2C3E18] overflow-hidden"
          >
            <div className="flex items-center justify-between p-6 border-b border-[#E5E5D8] dark:border-[#2C3E18]">
              <h2 className="text-xl font-bold text-[#3A4D1A] dark:text-[#E5E5D8] flex items-center gap-2">
                <Settings size={24} />
                الإعدادات
              </h2>
              <button onClick={() => setActiveSection('home')} className="p-2 text-gray-500 hover:bg-gray-100 dark:hover:bg-[#2C3E18] rounded-full transition-colors">
                <X size={20} />
              </button>
            </div>
            
            <div className="p-6 space-y-4">
              <div className="w-full flex flex-col md:flex-row md:items-center justify-between p-4 bg-[#FDFBF7] dark:bg-[#121410] border border-[#E5E5D8] dark:border-[#2C3E18] rounded-xl gap-4">
                <div className="flex items-center gap-3 text-[#2C3E18] dark:text-[#E5E5D8] font-medium">
                  <User size={20} />
                  اسم المستخدم
                </div>
                <div className="flex-1 max-w-xs">
                  <input
                    type="text"
                    value={state.userName}
                    onChange={(e) => updateUserName(e.target.value)}
                    placeholder="أدخل اسمك..."
                    className="w-full bg-white dark:bg-[#1A1D17] border border-[#E5E5D8] dark:border-[#2C3E18] rounded-lg px-3 py-2 text-sm text-[#3A4D1A] dark:text-[#E5E5D8] focus:outline-none focus:ring-2 focus:ring-[#556B2F] dark:focus:ring-[#7A9A45] transition-all"
                  />
                </div>
              </div>

              <button
                onClick={toggleTheme}
                className="w-full flex items-center justify-between p-4 bg-[#FDFBF7] dark:bg-[#121410] border border-[#E5E5D8] dark:border-[#2C3E18] rounded-xl hover:border-[#556B2F] dark:hover:border-[#7A9A45] transition-colors"
              >
                <div className="flex items-center gap-3 text-[#2C3E18] dark:text-[#E5E5D8] font-medium">
                  {state.theme === 'light' ? <Moon size={20} /> : <Sun size={20} />}
                  المظهر
                </div>
                <span className="text-sm text-gray-500 dark:text-gray-400">
                  {state.theme === 'light' ? 'فاتح' : 'مظلم'}
                </span>
              </button>

              <button
                onClick={() => {
                  handleExport();
                  setActiveSection('home');
                }}
                className="w-full flex items-center justify-between p-4 bg-[#FDFBF7] dark:bg-[#121410] border border-[#E5E5D8] dark:border-[#2C3E18] rounded-xl hover:border-[#556B2F] dark:hover:border-[#7A9A45] transition-colors"
              >
                <div className="flex items-center gap-3 text-[#2C3E18] dark:text-[#E5E5D8] font-medium">
                  <FileText size={20} />
                  تصدير تقرير نصي
                </div>
              </button>

              <button
                onClick={() => {
                  handleBackup();
                  setActiveSection('home');
                }}
                className="w-full flex items-center justify-between p-4 bg-[#FDFBF7] dark:bg-[#121410] border border-[#E5E5D8] dark:border-[#2C3E18] rounded-xl hover:border-[#556B2F] dark:hover:border-[#7A9A45] transition-colors"
              >
                <div className="flex items-center gap-3 text-[#2C3E18] dark:text-[#E5E5D8] font-medium">
                  <Download size={20} />
                  نسخ احتياطي للبيانات
                </div>
              </button>

              <label className="w-full flex items-center justify-between p-4 bg-[#FDFBF7] dark:bg-[#121410] border border-[#E5E5D8] dark:border-[#2C3E18] rounded-xl hover:border-[#556B2F] dark:hover:border-[#7A9A45] transition-colors cursor-pointer">
                <div className="flex items-center gap-3 text-[#2C3E18] dark:text-[#E5E5D8] font-medium">
                  <Upload size={20} />
                  استعادة البيانات
                </div>
                <input 
                  type="file" 
                  accept=".json" 
                  className="hidden" 
                  onChange={(e) => {
                    handleRestore(e);
                    setActiveSection('home');
                  }}
                />
              </label>

              <a
                href="https://www.behance.net/aymenbakkour"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full flex items-center justify-between p-4 bg-[#FDFBF7] dark:bg-[#121410] border border-[#E5E5D8] dark:border-[#2C3E18] rounded-xl hover:border-[#556B2F] dark:hover:border-[#7A9A45] transition-colors"
              >
                <div className="flex items-center gap-3 text-[#2C3E18] dark:text-[#E5E5D8] font-medium">
                  <User size={20} />
                  تطوير: أيمن بكور
                </div>
                <ExternalLink size={16} className="text-gray-400" />
              </a>
            </div>
          </motion.div>
        )}

        {activeSection === 'stats' && (
          <motion.div 
            key="stats"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
            className="bg-white dark:bg-[#1A1D17] w-full rounded-3xl shadow-sm border border-[#E5E5D8] dark:border-[#2C3E18] overflow-hidden"
          >
            <div className="bg-white/90 dark:bg-[#1A1D17]/90 backdrop-blur-md flex items-center justify-between p-6 border-b border-[#E5E5D8] dark:border-[#2C3E18]">
              <h2 className="text-xl font-bold text-[#3A4D1A] dark:text-[#E5E5D8] flex items-center gap-2">
                <BarChart2 size={24} />
                الإحصائيات
              </h2>
              <button onClick={() => setActiveSection('home')} className="p-2 text-gray-500 hover:bg-gray-100 dark:hover:bg-[#2C3E18] rounded-full transition-colors">
                <X size={20} />
              </button>
            </div>
            
            <div className="p-6 space-y-8">
              {/* Stats Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <motion.div whileHover={{ y: -4 }} className="bg-[#FDFBF7] dark:bg-[#121410] p-6 rounded-2xl shadow-sm border border-[#E5E5D8] dark:border-[#2C3E18] flex items-center space-x-4 space-x-reverse transition-colors">
                  <div className="p-4 bg-[#F0F4E8] dark:bg-[#2C3E18] rounded-full text-[#556B2F] dark:text-[#A3B881]">
                    <CheckCircle size={28} />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500 dark:text-gray-400 font-medium">السور المنجزة</p>
                    <p className="text-2xl font-bold text-[#2C3E18] dark:text-[#E5E5D8]">{completedSuras.length}</p>
                  </div>
                </motion.div>

                <motion.div whileHover={{ y: -4 }} className="bg-[#FDFBF7] dark:bg-[#121410] p-6 rounded-2xl shadow-sm border border-[#E5E5D8] dark:border-[#2C3E18] flex items-center space-x-4 space-x-reverse transition-colors">
                  <div className="p-4 bg-[#F0F4E8] dark:bg-[#2C3E18] rounded-full text-[#556B2F] dark:text-[#A3B881]">
                    <Edit3 size={28} />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500 dark:text-gray-400 font-medium">إجمالي الملاحظات</p>
                    <p className="text-2xl font-bold text-[#2C3E18] dark:text-[#E5E5D8]">{totalNotes}</p>
                  </div>
                </motion.div>

                <motion.div whileHover={{ y: -4 }} className="bg-[#FDFBF7] dark:bg-[#121410] p-6 rounded-2xl shadow-sm border border-[#E5E5D8] dark:border-[#2C3E18] flex items-center space-x-4 space-x-reverse transition-colors">
                  <div className="relative w-16 h-16 flex items-center justify-center shrink-0">
                    <svg className="w-full h-full transform -rotate-90" viewBox="0 0 36 36">
                      <path
                        className="text-[#E5E5D8] dark:text-[#2C3E18]"
                        strokeWidth="3"
                        stroke="currentColor"
                        fill="none"
                        d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                      />
                      <path
                        className="text-[#556B2F] dark:text-[#7A9A45]"
                        strokeWidth="3"
                        strokeDasharray={`${understandingPercentage}, 100`}
                        strokeLinecap="round"
                        stroke="currentColor"
                        fill="none"
                        d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                      />
                    </svg>
                    <div className="absolute text-sm font-bold text-[#2C3E18] dark:text-[#E5E5D8]">{understandingPercentage}%</div>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500 dark:text-gray-400 font-medium">نسبة الفهم</p>
                    <p className="text-xs text-gray-400 mt-1">للسور المكتملة</p>
                  </div>
                </motion.div>

                <motion.div whileHover={{ y: -4 }} className="bg-[#FDFBF7] dark:bg-[#121410] p-6 rounded-2xl shadow-sm border border-[#E5E5D8] dark:border-[#2C3E18] flex items-center space-x-4 space-x-reverse transition-colors">
                  <div className="relative w-16 h-16 flex items-center justify-center shrink-0">
                    <svg className="w-full h-full transform -rotate-90" viewBox="0 0 36 36">
                      <path
                        className="text-[#E5E5D8] dark:text-[#2C3E18]"
                        strokeWidth="3"
                        stroke="currentColor"
                        fill="none"
                        d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                      />
                      <path
                        className="text-[#556B2F] dark:text-[#7A9A45]"
                        strokeWidth="3"
                        strokeDasharray={`${quranCompletionPercentage}, 100`}
                        strokeLinecap="round"
                        stroke="currentColor"
                        fill="none"
                        d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                      />
                    </svg>
                    <div className="absolute text-sm font-bold text-[#2C3E18] dark:text-[#E5E5D8]">{quranCompletionPercentage}%</div>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500 dark:text-gray-400 font-medium">اكتمال القرآن</p>
                    <p className="text-xs text-gray-400 mt-1">بناءً على الآيات</p>
                  </div>
                </motion.div>
              </div>

              {/* Quran Statistics */}
              <section>
                <h3 className="text-lg font-bold text-[#3A4D1A] dark:text-[#E5E5D8] mb-4 flex items-center">
                  <FileText className="ml-2" size={20} />
                  إحصائيات قرآنية
                </h3>
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
                  <motion.div whileHover={{ y: -4 }} className="bg-[#FDFBF7] dark:bg-[#121410] p-6 rounded-2xl shadow-sm border border-[#E5E5D8] dark:border-[#2C3E18] flex flex-col items-center justify-center text-center transition-colors">
                    <div className="p-4 bg-[#F0F4E8] dark:bg-[#2C3E18] rounded-full text-[#556B2F] dark:text-[#A3B881] mb-4">
                      <BookOpen size={32} />
                    </div>
                    <p className="text-sm text-gray-500 dark:text-gray-400 font-medium mb-1">إجمالي كلمات القرآن</p>
                    <p className="text-3xl font-bold text-[#2C3E18] dark:text-[#E5E5D8]">{QURAN_STATS.totalWords.toLocaleString('ar-EG')}</p>
                    <p className="text-xs text-gray-400 mt-2">كلمة (تقريباً)</p>
                  </motion.div>

                  <div className="lg:col-span-2 bg-[#FDFBF7] dark:bg-[#121410] p-6 rounded-2xl shadow-sm border border-[#E5E5D8] dark:border-[#2C3E18] transition-colors">
                    <h4 className="text-sm font-bold text-[#556B2F] dark:text-[#A3B881] mb-4">كم مرة ذكرت هذه الكلمات؟</h4>
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-y-4 gap-x-6">
                      {QURAN_STATS.wordFrequencies.map((item, index) => (
                        <div key={index} className="flex justify-between items-center border-b border-gray-100 dark:border-[#2C3E18] pb-2">
                          <span className="text-[#3A4D1A] dark:text-[#E5E5D8] font-medium">&quot;{item.word}&quot;</span>
                          <span className="bg-[#F0F4E8] dark:bg-[#2C3E18] text-[#556B2F] dark:text-[#A3B881] px-2 py-0.5 rounded text-sm font-bold">
                            {item.count}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </section>
            </div>
          </motion.div>
        )}

        {activeSection === 'home' && (
          <motion.div
            key="home"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
            className="space-y-8"
          >
            {/* Last Activity Banner */}
            {recentSuras.length > 0 && (
              <Link href={`/sura/${recentSuras[0].id}`}>
                <motion.div 
                  whileHover={{ scale: 1.01 }}
                  className="bg-gradient-to-r from-[#556B2F] to-[#3A4D1A] dark:from-[#2C3E18] dark:to-[#1A1D17] p-6 rounded-3xl shadow-md text-white flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 relative overflow-hidden"
                >
                  <div className="absolute left-0 top-0 w-32 h-32 bg-white opacity-5 rounded-full -ml-10 -mt-10"></div>
                  <div className="relative z-10">
                    <div className="flex items-center gap-2 text-white/80 text-sm font-medium mb-2">
                      <Clock size={16} />
                      <span>متابعة آخر نشاط ({getRelativeTime(recentSuras[0].lastModified)})</span>
                    </div>
                    <h3 className="text-2xl font-bold">سورة {recentSuras[0].name}</h3>
                    <p className="text-white/90 mt-1 text-sm">
                      {recentSuras[0].status === 'completed' ? 'مكتملة' : recentSuras[0].status === 'studying' ? 'قيد الدراسة' : 'لم تبدأ'} • {Object.keys(recentSuras[0].notes).length} ملاحظة
                    </p>
                  </div>
                  <div className="relative z-10 bg-white/20 hover:bg-white/30 p-3 rounded-2xl backdrop-blur-sm transition-colors flex items-center gap-2">
                    <span className="font-bold">إكمال القراءة</span>
                    <ChevronLeft size={20} />
                  </div>
                </motion.div>
              </Link>
            )}

            {/* Recent Activity */}
            {recentSuras.length > 1 && (
              <section>
                <h2 className="text-xl font-bold text-[#3A4D1A] dark:text-[#E5E5D8] mb-4 flex items-center">
                  <Clock className="ml-2" size={20} />
                  سجل النشاطات
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  {recentSuras.slice(1).map((sura, index) => (
                    <motion.div
                      key={sura.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                    >
                      <Link href={`/sura/${sura.id}`}>
                        <motion.div whileHover={{ scale: 1.02 }} className="bg-white dark:bg-[#1A1D17] p-4 rounded-xl shadow-sm border border-[#E5E5D8] dark:border-[#2C3E18] hover:border-[#556B2F] dark:hover:border-[#7A9A45] transition-colors h-full">
                          <div className="flex justify-between items-center mb-2">
                            <h3 className="font-bold text-lg text-[#2C3E18] dark:text-[#E5E5D8]">سورة {sura.name}</h3>
                            <span className={`text-xs px-2 py-1 rounded-full ${
                              sura.status === 'completed' ? 'bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-400' :
                              sura.status === 'studying' ? 'bg-yellow-100 dark:bg-yellow-900/30 text-yellow-800 dark:text-yellow-400' :
                              'bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-300'
                            }`}>
                              {sura.status === 'completed' ? 'مكتملة' : sura.status === 'studying' ? 'قيد الدراسة' : 'لم تبدأ'}
                            </span>
                          </div>
                          <p className="text-sm text-gray-500 dark:text-gray-400">{Object.keys(sura.notes).length} ملاحظة مدونة</p>
                        </motion.div>
                      </Link>
                    </motion.div>
                  ))}
                </div>
              </section>
            )}

            {/* All Suras List */}
            <section>
              <h2 className="text-xl font-bold text-[#3A4D1A] dark:text-[#E5E5D8] mb-4 flex items-center">
                <BookOpen className="ml-2" size={20} />
                فهرس السور
              </h2>
              <div className="bg-white dark:bg-[#1A1D17] rounded-2xl shadow-sm border border-[#E5E5D8] dark:border-[#2C3E18] overflow-hidden transition-colors">
                <div className="divide-y divide-[#E5E5D8] dark:divide-[#2C3E18] max-h-[500px] overflow-y-auto">
                  {displaySuras.map((sura, index) => (
                    <motion.div
                      key={sura.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.02 }}
                    >
                      <Link href={`/sura/${sura.id}`} className="flex items-center justify-between p-4 hover:bg-[#FDFBF7] dark:hover:bg-[#22261F] transition-colors">
                        <div className="flex items-center space-x-4 space-x-reverse">
                          <div className="w-10 h-10 rounded-full bg-[#F0F4E8] dark:bg-[#2C3E18] flex items-center justify-center text-[#556B2F] dark:text-[#A3B881] font-bold text-sm">
                            {sura.id}
                          </div>
                          <div>
                            <h3 className="font-bold text-[#2C3E18] dark:text-[#E5E5D8]">سورة {sura.name}</h3>
                            <p className="text-xs text-gray-500 dark:text-gray-400">{sura.totalAyahs} آية</p>
                          </div>
                        </div>
                        <div className="flex items-center space-x-4 space-x-reverse">
                          {sura.status === 'completed' && (
                            <div className="flex text-yellow-500 dark:text-yellow-400">
                              {[...Array(5)].map((_, i) => (
                                <Star key={i} size={14} fill={i < sura.understandingRating ? "currentColor" : "none"} className={i < sura.understandingRating ? "" : "text-gray-300 dark:text-gray-600"} />
                              ))}
                            </div>
                          )}
                          <ChevronLeft size={20} className="text-gray-400 dark:text-gray-500" />
                        </div>
                      </Link>
                    </motion.div>
                  ))}
                </div>
              </div>
            </section>
          </motion.div>
        )}

        {activeSection === 'plan' && (
          <motion.div
            key="plan"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
            className="space-y-6"
          >
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-[#3A4D1A] dark:text-[#E5E5D8] flex items-center">
                <Map className="ml-2" size={24} />
                خطة دراسة القرآن
              </h2>
              <button onClick={() => setActiveSection('home')} className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full transition-colors">
                <X size={24} className="text-gray-500 dark:text-gray-400" />
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {STUDY_PLANS.map(plan => (
                <div
                  key={plan.id}
                  onClick={() => updateStudyPlan(plan.id)}
                  className={`p-4 rounded-2xl border cursor-pointer transition-all ${
                    state.studyPlan === plan.id
                      ? 'bg-[#F0F4E8] dark:bg-[#2C3E18] border-[#556B2F] dark:border-[#7A9A45] shadow-sm'
                      : 'bg-white dark:bg-[#1A1D17] border-[#E5E5D8] dark:border-[#2C3E18] hover:border-[#556B2F] dark:hover:border-[#7A9A45]'
                  }`}
                >
                  <div className="flex items-center gap-3 mb-2">
                    <div className={`p-2 rounded-full ${state.studyPlan === plan.id ? 'bg-[#556B2F] text-white dark:bg-[#7A9A45]' : 'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300'}`}>
                      {plan.id === 'default' && <BookOpen size={20} />}
                      {plan.id === 'chronological' && <Clock size={20} />}
                      {plan.id === 'short_to_long' && <BarChart2 size={20} />}
                      {plan.id === 'reverse' && <ArrowUp size={20} />}
                      {plan.id === 'custom' && <Settings size={20} />}
                    </div>
                    <h3 className="font-bold text-lg text-[#2C3E18] dark:text-[#E5E5D8]">{plan.name}</h3>
                  </div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">{plan.description}</p>
                </div>
              ))}
            </div>

            {state.studyPlan === 'custom' && (
              <div className="mt-8 bg-white dark:bg-[#1A1D17] p-6 rounded-2xl border border-[#E5E5D8] dark:border-[#2C3E18]">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-lg font-bold text-[#3A4D1A] dark:text-[#E5E5D8]">ترتيب السور اليدوي</h3>
                  <button
                    onClick={() => updateStudyPlan('custom', [])}
                    className="text-sm text-red-600 hover:text-red-700 dark:text-red-400 dark:hover:text-red-300 font-medium px-3 py-1 rounded-lg hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors"
                  >
                    إعادة الترتيب الأصلي
                  </button>
                </div>
                <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">استخدم الأسهم لترتيب السور حسب خطتك الخاصة.</p>
                
                <div className="divide-y divide-[#E5E5D8] dark:divide-[#2C3E18] max-h-[400px] overflow-y-auto pr-2">
                  {displaySuras.map((sura, index) => (
                    <div key={sura.id} className="py-3 flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <span className="w-6 h-6 flex items-center justify-center bg-gray-100 dark:bg-gray-800 text-gray-500 dark:text-gray-400 rounded-full text-xs">
                          {index + 1}
                        </span>
                        <span className="font-medium text-[#2C3E18] dark:text-[#E5E5D8]">سورة {sura.name}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <button
                          onClick={() => {
                            if (index > 0) {
                              const newOrder = displaySuras.map(s => s.id);
                              [newOrder[index - 1], newOrder[index]] = [newOrder[index], newOrder[index - 1]];
                              updateStudyPlan('custom', newOrder);
                            }
                          }}
                          disabled={index === 0}
                          className="p-1.5 text-gray-400 hover:text-[#556B2F] dark:hover:text-[#A3B881] hover:bg-gray-100 dark:hover:bg-gray-800 rounded transition-colors disabled:opacity-30 disabled:hover:bg-transparent"
                        >
                          <ArrowUp size={18} />
                        </button>
                        <button
                          onClick={() => {
                            if (index < displaySuras.length - 1) {
                              const newOrder = displaySuras.map(s => s.id);
                              [newOrder[index + 1], newOrder[index]] = [newOrder[index], newOrder[index + 1]];
                              updateStudyPlan('custom', newOrder);
                            }
                          }}
                          disabled={index === displaySuras.length - 1}
                          className="p-1.5 text-gray-400 hover:text-[#556B2F] dark:hover:text-[#A3B881] hover:bg-gray-100 dark:hover:bg-gray-800 rounded transition-colors disabled:opacity-30 disabled:hover:bg-transparent"
                        >
                          <ArrowDown size={18} />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </motion.div>
        )}

        {activeSection === 'categories' && (
          <motion.div
            key="categories"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="space-y-6"
          >
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-2xl font-bold text-[#2C3E18] dark:text-[#E5E5D8]">التصنيفات</h2>
              <button
                onClick={() => setActiveSection('home')}
                className="flex items-center gap-2 text-sm font-medium text-[#556B2F] dark:text-[#A3B881] hover:text-[#3A4D1A] dark:hover:text-[#C5D8A4] transition-colors"
              >
                العودة للرئيسية
                <ChevronLeft size={16} />
              </button>
            </div>

            <div className="flex flex-wrap gap-3 mb-8">
              <button
                onClick={() => setSelectedCategory(null)}
                className={`px-4 py-2 rounded-full font-medium transition-all ${
                  selectedCategory === null
                    ? 'bg-[#556B2F] text-white dark:bg-[#7A9A45]'
                    : 'bg-white dark:bg-[#1A1D17] text-gray-600 dark:text-gray-300 border border-[#E5E5D8] dark:border-[#2C3E18] hover:border-[#556B2F] dark:hover:border-[#7A9A45]'
                }`}
              >
                الكل
              </button>
              {NOTE_CATEGORIES.map(cat => (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`px-4 py-2 rounded-full font-medium transition-all ${
                    selectedCategory === cat.id
                      ? 'bg-[#556B2F] text-white dark:bg-[#7A9A45]'
                      : 'bg-white dark:bg-[#1A1D17] text-gray-600 dark:text-gray-300 border border-[#E5E5D8] dark:border-[#2C3E18] hover:border-[#556B2F] dark:hover:border-[#7A9A45]'
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <span className={`w-3 h-3 rounded-full ${cat.color.split(' ')[0]}`}></span>
                    {cat.name}
                  </div>
                </button>
              ))}
            </div>

            <div className="space-y-4">
              {Object.entries(state.suras).flatMap(([suraId, sura]) => 
                Object.entries(sura.notes).map(([noteId, note]) => ({
                  suraId: parseInt(suraId),
                  noteId,
                  ...note
                }))
              )
              .filter(note => selectedCategory === null || note.category === selectedCategory)
              .sort((a, b) => b.timestamp - a.timestamp)
              .map(note => {
                const sura = state.suras[note.suraId];
                const cat = getCategoryById(note.category);
                return (
                  <Link href={`/sura/${note.suraId}`} key={`${note.suraId}-${note.noteId}`}>
                    <div className="bg-white dark:bg-[#1A1D17] p-5 rounded-2xl shadow-sm border border-[#E5E5D8] dark:border-[#2C3E18] hover:border-[#556B2F] dark:hover:border-[#7A9A45] transition-all group">
                      <div className="flex justify-between items-start mb-3">
                        <div>
                          <h3 className="font-bold text-lg text-[#3A4D1A] dark:text-[#E5E5D8] group-hover:text-[#556B2F] dark:group-hover:text-[#A3B881] transition-colors">
                            {note.title || 'ملاحظة بدون عنوان'}
                          </h3>
                          <div className="flex items-center gap-2 mt-1 text-sm text-gray-500 dark:text-gray-400">
                            <BookOpen size={14} />
                            <span>سورة {sura?.name}</span>
                            <span>•</span>
                            <Clock size={14} />
                            <span>{new Date(note.timestamp).toLocaleDateString('ar-SA')}</span>
                          </div>
                        </div>
                        <span className={`text-xs px-3 py-1 rounded-full font-medium ${cat.color}`}>
                          {cat.name}
                        </span>
                      </div>
                      {note.text && (
                        <p className="text-[#2C3E18] dark:text-gray-300 text-sm line-clamp-2 mt-2">
                          {note.text}
                        </p>
                      )}
                    </div>
                  </Link>
                );
              })}
              
              {Object.values(state.suras).every(sura => Object.keys(sura.notes).length === 0) && (
                <div className="text-center py-12 bg-white dark:bg-[#1A1D17] rounded-3xl border border-[#E5E5D8] dark:border-[#2C3E18]">
                  <div className="w-16 h-16 bg-[#F0F4E8] dark:bg-[#2C3E18] rounded-full flex items-center justify-center mx-auto mb-4">
                    <Tag size={24} className="text-[#556B2F] dark:text-[#A3B881]" />
                  </div>
                  <h3 className="text-lg font-bold text-[#2C3E18] dark:text-[#E5E5D8] mb-2">لا توجد ملاحظات</h3>
                  <p className="text-gray-500 dark:text-gray-400">ابدأ بإضافة ملاحظات وتصنيفها لتظهر هنا</p>
                </div>
              )}
            </div>
          </motion.div>
        )}

        {activeSection === 'miracles' && (
          <motion.div
            key="miracles"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="space-y-6"
          >
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-2xl font-bold text-[#2C3E18] dark:text-[#E5E5D8] flex items-center gap-2">
                <Sparkles className="text-[#D4AF37]" size={28} />
                الإعجاز في القرآن الكريم
              </h2>
              <button
                onClick={() => setActiveSection('home')}
                className="flex items-center gap-2 text-sm font-medium text-[#556B2F] dark:text-[#A3B881] hover:text-[#3A4D1A] dark:hover:text-[#C5D8A4] transition-colors"
              >
                العودة للرئيسية
                <ChevronLeft size={16} />
              </button>
            </div>

            <div className="bg-white dark:bg-[#1A1D17] p-6 rounded-3xl border border-[#E5E5D8] dark:border-[#2C3E18] mb-8">
              <p className="text-[#2C3E18] dark:text-[#E5E5D8] leading-relaxed text-lg">
                القرآن الكريم هو المعجزة الخالدة، وقد تضمن إشارات دقيقة لحقائق علمية وتاريخية لم تكن معروفة وقت نزوله، مما يثبت أنه كلام الله عز وجل. في هذا القسم، نستعرض بعضاً من هذه المعجزات مع الآيات المرتبطة بها لتدبرها ودراستها.
              </p>
            </div>

            <div className="space-y-4">
              {MIRACLES_DATA.map((miracle) => (
                <div key={miracle.id} className="bg-white dark:bg-[#1A1D17] rounded-2xl border border-[#E5E5D8] dark:border-[#2C3E18] overflow-hidden transition-all">
                  <button 
                    onClick={() => setExpandedMiracle(expandedMiracle === miracle.id ? null : miracle.id)}
                    className="w-full text-right p-5 flex items-center justify-between hover:bg-[#FDFBF7] dark:hover:bg-[#121410] transition-colors"
                  >
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-[#F0F4E8] dark:bg-[#2C3E18] rounded-full flex items-center justify-center text-[#556B2F] dark:text-[#A3B881]">
                        <Sparkles size={24} />
                      </div>
                      <div>
                        <h3 className="font-bold text-xl text-[#3A4D1A] dark:text-[#E5E5D8]">{miracle.title}</h3>
                        <div className="flex items-center gap-2 mt-1">
                          <span className="text-xs px-2 py-1 bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400 rounded-full font-medium">
                            {miracle.categoryName}
                          </span>
                          <span className="text-sm text-gray-500 dark:text-gray-400 line-clamp-1">{miracle.summary}</span>
                        </div>
                      </div>
                    </div>
                    <ChevronLeft size={24} className={`text-gray-400 transition-transform duration-300 ${expandedMiracle === miracle.id ? '-rotate-90' : ''}`} />
                  </button>
                  
                  <AnimatePresence>
                    {expandedMiracle === miracle.id && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        className="overflow-hidden border-t border-[#E5E5D8] dark:border-[#2C3E18]"
                      >
                        <div className="p-6 space-y-6 bg-[#FDFBF7] dark:bg-[#121410]">
                          <div>
                            <h4 className="font-bold text-[#2C3E18] dark:text-[#E5E5D8] mb-2 flex items-center gap-2">
                              <FileText size={18} className="text-[#556B2F] dark:text-[#A3B881]" />
                              التفاصيل
                            </h4>
                            <p className="text-[#2C3E18] dark:text-gray-300 leading-relaxed text-sm sm:text-base">
                              {miracle.content}
                            </p>
                          </div>

                          <div>
                            <h4 className="font-bold text-[#2C3E18] dark:text-[#E5E5D8] mb-3 flex items-center gap-2">
                              <BookOpen size={18} className="text-[#556B2F] dark:text-[#A3B881]" />
                              الآيات المرتبطة (للدراسة)
                            </h4>
                            <div className="space-y-3">
                              {miracle.relatedAyahs.map((ayah, idx) => (
                                <div key={idx} className="bg-white dark:bg-[#1A1D17] p-4 rounded-xl border border-[#E5E5D8] dark:border-[#2C3E18]">
                                  <p className="font-quran text-lg text-[#3A4D1A] dark:text-[#E5E5D8] leading-loose text-center mb-4">
                                    &quot;{ayah.text}&quot;
                                  </p>
                                  <div className="flex items-center justify-between border-t border-[#E5E5D8] dark:border-[#2C3E18] pt-3">
                                    <span className="text-sm font-medium text-gray-500 dark:text-gray-400">
                                      سورة {ayah.suraName} - آية {ayah.ayahRange}
                                    </span>
                                    <Link href={`/sura/${ayah.suraId}`}>
                                      <button className="flex items-center gap-1 text-sm font-bold text-[#556B2F] dark:text-[#A3B881] hover:text-[#3A4D1A] dark:hover:text-[#C5D8A4] transition-colors">
                                        دراسة السورة
                                        <ExternalLinkIcon size={14} />
                                      </button>
                                    </Link>
                                  </div>
                                </div>
                              ))}
                            </div>
                          </div>

                          <div>
                            <h4 className="font-bold text-[#2C3E18] dark:text-[#E5E5D8] mb-2 flex items-center gap-2">
                              <Book size={18} className="text-[#556B2F] dark:text-[#A3B881]" />
                              المراجع والمصادر
                            </h4>
                            <ul className="list-disc list-inside text-sm text-gray-600 dark:text-gray-400 space-y-1">
                              {miracle.references.map((ref, idx) => (
                                <li key={idx}>{ref}</li>
                              ))}
                            </ul>
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ))}
            </div>
          </motion.div>
        )}

        {activeSection === 'developer' && (
          <DeveloperSection onBack={() => setActiveSection('home')} />
        )}

        {activeSection === 'about-app' && (
          <AboutAppSection onBack={() => setActiveSection('home')} />
        )}

        {activeSection === 'tajweed' && (
          <TajweedSection onBack={() => setActiveSection('home')} />
        )}

        {activeSection === 'achievements' && (
          <motion.div
            key="achievements"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="max-w-4xl mx-auto"
          >
            <div className="flex items-center gap-4 mb-8">
              <button onClick={() => setActiveSection('home')} className="p-2 bg-white dark:bg-[#1A1D17] rounded-full shadow-sm hover:bg-gray-50 dark:hover:bg-[#2C3E18] transition-colors">
                <ChevronLeft size={24} className="text-[#556B2F] dark:text-[#A3B881]" />
              </button>
              <h2 className="text-3xl font-bold text-[#2C3E18] dark:text-[#E5E5D8] font-quran">الإنجازات والشارات</h2>
            </div>

            <div className="bg-white dark:bg-[#1A1D17] rounded-3xl p-8 shadow-sm border border-[#E5E5D8] dark:border-[#2C3E18] mb-8">
              <p className="text-gray-600 dark:text-gray-400 mb-6 text-center">
                {state.userName ? `أحسنت يا ${state.userName}! ` : ''}
                نظام الشارات يحفزك على الاستمرار في دراسة وتدبر القرآن الكريم. كلما تقدمت في دراستك، حصلت على شارات جديدة تزين ملفك الشخصي.
              </p>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                <AchievementsList state={state} />
              </div>
            </div>
          </motion.div>
        )}

        {activeSection === 'benefits' && (
          <motion.div
            key="benefits"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="max-w-4xl mx-auto"
          >
            <div className="flex items-center gap-4 mb-8">
              <button onClick={() => setActiveSection('home')} className="p-2 bg-white dark:bg-[#1A1D17] rounded-full shadow-sm hover:bg-gray-50 dark:hover:bg-[#2C3E18] transition-colors">
                <ChevronLeft size={24} className="text-[#556B2F] dark:text-[#A3B881]" />
              </button>
              <h2 className="text-3xl font-bold text-[#2C3E18] dark:text-[#E5E5D8] font-quran">فوائد السور</h2>
            </div>
            <SurahBenefits />
          </motion.div>
        )}

        {activeSection === 'duas' && (
          <motion.div
            key="duas"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="max-w-4xl mx-auto"
          >
            <div className="flex items-center gap-4 mb-8">
              <button onClick={() => setActiveSection('home')} className="p-2 bg-white dark:bg-[#1A1D17] rounded-full shadow-sm hover:bg-gray-50 dark:hover:bg-[#2C3E18] transition-colors">
                <ChevronLeft size={24} className="text-[#556B2F] dark:text-[#A3B881]" />
              </button>
              <h2 className="text-3xl font-bold text-[#2C3E18] dark:text-[#E5E5D8] font-quran">أدعية قرآنية</h2>
            </div>
            <QuranDuas />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
