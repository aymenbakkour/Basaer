'use client';

import { useState, useEffect } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'motion/react';
import { Menu, X, Search, Settings, BarChart2, Plus, Home, Map, Tag, Sparkles } from 'lucide-react';

export default function FloatingMenu() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();
  const router = useRouter();

  const toggleMenu = () => setIsOpen(!isOpen);

  const closeMenu = () => setIsOpen(false);

  const handleAction = (section: string) => {
    if (pathname !== '/') {
      router.push(`/?section=${section}`);
    } else {
      window.dispatchEvent(new CustomEvent(`open-${section}`));
    }
    closeMenu();
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        handleAction('search');
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [pathname]);

  const isSuraPage = pathname.startsWith('/sura/');

  const menuItems = [
    { icon: Search, label: 'البحث', action: () => handleAction('search') },
    { icon: Settings, label: 'الإعدادات', action: () => handleAction('settings') },
  ];

  if (pathname === '/') {
    menuItems.unshift({ icon: Sparkles, label: 'الإعجاز القرآني', action: () => handleAction('miracles') });
    menuItems.unshift({ icon: Tag, label: 'التصنيفات', action: () => handleAction('categories') });
    menuItems.unshift({ icon: Map, label: 'خطة الدراسة', action: () => handleAction('plan') });
    menuItems.unshift({ icon: BarChart2, label: 'الإحصائيات', action: () => handleAction('stats') });
  } else if (isSuraPage) {
    menuItems.unshift({ icon: Plus, label: 'إضافة ملاحظة', action: () => { window.dispatchEvent(new CustomEvent('open-add-note')); closeMenu(); } });
    menuItems.push({ icon: Home, label: 'الرئيسية', action: () => { router.push('/'); closeMenu(); } });
  }

  return (
    <div className="fixed top-6 left-6 z-50 flex flex-col items-start gap-3">
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

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.9 }}
            className="flex flex-col gap-2"
          >
            {menuItems.map((item, index) => (
              <motion.button
                key={item.label}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ delay: index * 0.05 }}
                onClick={item.action}
                className="flex items-center gap-3 bg-white/95 dark:bg-[#1A1D17]/95 backdrop-blur-md border border-[#E5E5D8] dark:border-[#2C3E18] px-4 py-3 rounded-xl shadow-sm hover:bg-[#F0F4E8] dark:hover:bg-[#2C3E18] transition-colors group"
              >
                <item.icon size={20} className="text-[#556B2F] dark:text-[#A3B881] group-hover:scale-110 transition-transform" />
                <span className="text-sm font-medium text-[#2C3E18] dark:text-[#E5E5D8]">{item.label}</span>
              </motion.button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
