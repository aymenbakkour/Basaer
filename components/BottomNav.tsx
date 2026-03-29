'use client';

import { useState, useEffect } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { Home, Search, BarChart2, Menu, List } from 'lucide-react';
import { motion } from 'motion/react';
import { useTimerContext } from '@/components/TimerContext';

export default function BottomNav() {
  const pathname = usePathname();
  const router = useRouter();
  const [activeTab, setActiveTab] = useState('home');
  const [mounted, setMounted] = useState(false);
  const { hasUnsavedNote, setPendingSectionChange } = useTimerContext();

  useEffect(() => {
    setMounted(true);
    if (pathname !== '/') {
      setActiveTab('');
    } else {
      // If we are on home page, we might need to check URL params or just default to home
      // The section-changed event will handle the exact section
      const params = new URLSearchParams(window.location.search);
      const section = params.get('section');
      if (section) {
        setActiveTab(section);
      } else if (activeTab === '') {
        setActiveTab('home');
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);

  useEffect(() => {
    const handleSectionChange = (e: Event) => {
      const customEvent = e as CustomEvent;
      setActiveTab(customEvent.detail || 'home');
    };
    
    window.addEventListener('section-changed', handleSectionChange);
    return () => window.removeEventListener('section-changed', handleSectionChange);
  }, []);

  if (!mounted) return null;

  const handleNav = (tab: string) => {
    if (tab === 'menu') {
      window.dispatchEvent(new CustomEvent('open-menu'));
      return;
    }

    if (hasUnsavedNote) {
      setPendingSectionChange(tab);
      return;
    }

    if (pathname !== '/') {
      router.push(`/?section=${tab}`);
    } else {
      if (tab === 'home') {
        window.dispatchEvent(new CustomEvent('go-home'));
      } else {
        window.dispatchEvent(new CustomEvent(`open-${tab}`));
      }
      setActiveTab(tab);
    }
  };

  const navItems = [
    { id: 'home', icon: Home, label: 'الرئيسية' },
    { id: 'index', icon: List, label: 'فهرس السور' },
    { id: 'search', icon: Search, label: 'البحث' },
    { id: 'stats', icon: BarChart2, label: 'الإحصائيات' },
    { id: 'menu', icon: Menu, label: 'المزيد' },
  ];

  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 bg-white/95 dark:bg-[#1A1D17]/95 backdrop-blur-md border-t border-[#E5E5D8] dark:border-[#2C3E18] pb-safe z-40 shadow-[0_-4px_20px_rgba(0,0,0,0.05)] dark:shadow-[0_-4px_20px_rgba(0,0,0,0.2)]">
      <div className="flex justify-around items-center h-16 px-2">
        {navItems.map((item) => {
          const isActive = activeTab === item.id && pathname === '/';
          return (
            <button
              key={item.id}
              onClick={() => handleNav(item.id)}
              className={`relative flex flex-col items-center justify-center w-full h-full space-y-1 transition-colors ${
                isActive ? 'text-[#556B2F] dark:text-[#A3B881]' : 'text-gray-500 dark:text-gray-400 hover:text-[#3A4D1A] dark:hover:text-[#C5D8A4]'
              }`}
            >
              <div className="relative">
                <item.icon size={22} className={isActive ? 'stroke-[2.5px]' : 'stroke-2'} />
                {isActive && (
                  <motion.div
                    layoutId="bottomNavIndicator"
                    className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-1 h-1 bg-[#556B2F] dark:bg-[#A3B881] rounded-full"
                  />
                )}
              </div>
              <span className="text-[10px] font-medium">{item.label}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
