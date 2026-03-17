'use client';

import { useState, useEffect, useCallback } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'motion/react';
import { Menu, X, Search, Settings, BarChart2, Plus, Home, Map, Tag, Sparkles, User, Award, Book, Heart, BookOpen, Info, BookOpenCheck } from 'lucide-react';
import { useAppContext } from '@/lib/store';

export default function FloatingMenu() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();
  const router = useRouter();
  const { state } = useAppContext();

  const toggleMenu = () => setIsOpen(!isOpen);

  const closeMenu = () => setIsOpen(false);

  const handleAction = useCallback((section: string) => {
    if (pathname !== '/') {
      router.push(`/?section=${section}`);
    } else {
      window.dispatchEvent(new CustomEvent(`open-${section}`));
    }
    closeMenu();
  }, [pathname, router]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        handleAction('search');
      }
    };
    
    const handleOpenMenu = () => setIsOpen(true);
    
    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('open-menu', handleOpenMenu);
    
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('open-menu', handleOpenMenu);
    };
  }, [handleAction]);

  const isSuraPage = pathname.startsWith('/sura/');

  const menuItems = [
    { icon: Search, label: 'البحث', action: () => handleAction('search') },
    { icon: Settings, label: 'الإعدادات', action: () => handleAction('settings') },
    { icon: Info, label: 'عن التطبيق', action: () => handleAction('about-app') },
    { icon: User, label: 'عن المطور', action: () => handleAction('developer') },
  ];

  if (pathname === '/') {
    menuItems.unshift({ icon: Award, label: 'الإنجازات والشارات', action: () => handleAction('achievements') });
    menuItems.unshift({ icon: Sparkles, label: 'الإعجاز القرآني', action: () => handleAction('miracles') });
    menuItems.unshift({ icon: BookOpenCheck, label: 'أحكام التجويد', action: () => handleAction('tajweed') });
    menuItems.unshift({ icon: Book, label: 'أدعية قرآنية', action: () => handleAction('duas') });
    menuItems.unshift({ icon: Heart, label: 'فوائد السور', action: () => handleAction('benefits') });
    menuItems.unshift({ icon: Tag, label: 'التصنيفات', action: () => handleAction('categories') });
    menuItems.unshift({ icon: Map, label: 'خطة الدراسة', action: () => handleAction('plan') });
    menuItems.unshift({ icon: BarChart2, label: 'الإحصائيات', action: () => handleAction('stats') });
  } else if (isSuraPage) {
    menuItems.unshift({ icon: Plus, label: 'إضافة ملاحظة', action: () => { window.dispatchEvent(new CustomEvent('open-add-note')); closeMenu(); } });
    menuItems.push({ icon: Home, label: 'الرئيسية', action: () => { router.push('/'); closeMenu(); } });
  }

  return (
    <>
      <div className="fixed top-6 right-6 z-50 hidden md:block">
        <button
          onClick={toggleMenu}
          className="w-14 h-14 bg-[#3A4D1A] dark:bg-[#556B2F] text-white rounded-2xl shadow-lg flex items-center justify-center hover:bg-[#2C3E18] dark:hover:bg-[#3A4D1A] transition-colors relative"
        >
          <AnimatePresence mode="wait">
            {isOpen ? (
              <motion.div
                key="close"
                initial={{ opacity: 0, rotate: -90 }}
                animate={{ opacity: 1, rotate: 0 }}
                exit={{ opacity: 0, rotate: 90 }}
                transition={{ duration: 0.15 }}
                className="absolute"
              >
                <X size={28} />
              </motion.div>
            ) : (
              <motion.div
                key="menu"
                initial={{ opacity: 0, rotate: 90 }}
                animate={{ opacity: 1, rotate: 0 }}
                exit={{ opacity: 0, rotate: -90 }}
                transition={{ duration: 0.15 }}
                className="absolute"
              >
                <Menu size={28} />
              </motion.div>
            )}
          </AnimatePresence>
        </button>
      </div>

      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={closeMenu}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40"
            />
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed top-0 right-0 bottom-0 w-80 bg-[#FDFBF7] dark:bg-[#121410] shadow-2xl z-50 flex flex-col border-l border-[#E5E5D8] dark:border-[#2C3E18] overflow-hidden"
            >
              {/* Drawer Header */}
              <div className="relative p-8 pb-6 bg-[#F0F4E8] dark:bg-[#1A1D17] border-b border-[#E5E5D8] dark:border-[#2C3E18]">
                <div className="absolute top-0 right-0 w-32 h-32 bg-[#E5E5D8] dark:bg-[#2C3E18] rounded-full -mr-16 -mt-16 opacity-50 dark:opacity-20"></div>
                <div className="relative z-10 flex items-start justify-between">
                  <div className="flex flex-col gap-1">
                    <div className="w-12 h-12 bg-white dark:bg-[#2C3E18] rounded-2xl flex items-center justify-center shadow-sm mb-2 border border-[#E5E5D8] dark:border-[#3A4D1A]">
                      <BookOpen className="text-[#556B2F] dark:text-[#A3B881]" size={24} />
                    </div>
                    <h2 className="text-xl font-bold text-[#2C3E18] dark:text-[#E5E5D8]">بصائر</h2>
                    {state.userName && (
                      <p className="text-sm text-[#556B2F] dark:text-[#A3B881] font-medium">مرحباً، {state.userName}</p>
                    )}
                  </div>
                  <button onClick={closeMenu} className="p-2 text-gray-500 hover:text-gray-800 dark:text-gray-400 dark:hover:text-gray-200 bg-white/50 dark:bg-black/20 rounded-full backdrop-blur-sm transition-colors">
                    <X size={20} />
                  </button>
                </div>
              </div>

              {/* Drawer Content */}
              <div className="flex-1 overflow-y-auto p-4 space-y-2">
                {menuItems.map((item, index) => (
                  <motion.button
                    key={item.label}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.05 }}
                    onClick={item.action}
                    className="flex items-center gap-4 bg-transparent hover:bg-[#F0F4E8] dark:hover:bg-[#1A1D17] px-4 py-3.5 rounded-2xl transition-all group w-full text-right"
                  >
                    <div className="w-10 h-10 rounded-xl bg-white dark:bg-[#2C3E18] border border-[#E5E5D8] dark:border-[#3A4D1A] flex items-center justify-center shadow-sm group-hover:scale-110 group-hover:bg-[#556B2F] dark:group-hover:bg-[#7A9A45] group-hover:border-transparent transition-all">
                      <item.icon size={20} className="text-[#556B2F] dark:text-[#A3B881] group-hover:text-white transition-colors" />
                    </div>
                    <span className="text-base font-medium text-[#2C3E18] dark:text-[#E5E5D8] group-hover:text-[#556B2F] dark:group-hover:text-[#A3B881] transition-colors">{item.label}</span>
                  </motion.button>
                ))}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
