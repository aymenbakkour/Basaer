'use client';

import { useTimerContext } from '@/components/TimerContext';
import { motion, AnimatePresence } from 'motion/react';
import { AlertTriangle, Save, Trash2, X } from 'lucide-react';
import { useRouter, usePathname } from 'next/navigation';

export default function UnsavedNoteModal() {
  const { pendingSectionChange, setPendingSectionChange, setHasUnsavedNote } = useTimerContext();
  const router = useRouter();
  const pathname = usePathname();

  const handleAction = (action: 'save' | 'discard' | 'cancel') => {
    if (action === 'cancel') {
      setPendingSectionChange(null);
      return;
    }

    if (action === 'save') {
      window.dispatchEvent(new CustomEvent('save-note'));
    } else if (action === 'discard') {
      window.dispatchEvent(new CustomEvent('discard-note'));
    }

    setHasUnsavedNote(false);
    
    if (pendingSectionChange) {
      if (pathname !== '/') {
        router.push(`/?section=${pendingSectionChange}`);
      } else {
        if (pendingSectionChange === 'home') {
          window.dispatchEvent(new CustomEvent('go-home'));
        } else {
          window.dispatchEvent(new CustomEvent(`open-${pendingSectionChange}`));
        }
      }
    }
    setPendingSectionChange(null);
  };

  return (
    <AnimatePresence>
      {pendingSectionChange && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="bg-white dark:bg-[#1A1D17] rounded-3xl shadow-2xl w-full max-w-md overflow-hidden border border-[#E5E5D8] dark:border-[#2C3E18]"
          >
            <div className="p-6 text-center">
              <div className="w-16 h-16 bg-amber-100 dark:bg-amber-900/30 rounded-full flex items-center justify-center mx-auto mb-4 text-amber-600 dark:text-amber-400">
                <AlertTriangle size={32} />
              </div>
              
              <h2 className="text-xl font-bold text-[#3A4D1A] dark:text-[#E5E5D8] mb-2">
                ملاحظة غير محفوظة
              </h2>
              <p className="text-gray-500 dark:text-gray-400 mb-8">
                لديك ملاحظة مفتوحة لم تقم بحفظها. ماذا تريد أن تفعل؟
              </p>

              <div className="flex flex-col gap-3">
                <button
                  onClick={() => handleAction('save')}
                  className="w-full py-3 px-4 bg-[#556B2F] hover:bg-[#3A4D1A] text-white rounded-xl font-medium flex items-center justify-center gap-2 transition-colors"
                >
                  <Save size={18} />
                  حفظ الملاحظة والمتابعة
                </button>
                
                <button
                  onClick={() => handleAction('discard')}
                  className="w-full py-3 px-4 bg-red-50 hover:bg-red-100 dark:bg-red-900/20 dark:hover:bg-red-900/40 text-red-600 dark:text-red-400 rounded-xl font-medium flex items-center justify-center gap-2 transition-colors"
                >
                  <Trash2 size={18} />
                  تجاهل التغييرات والمتابعة
                </button>
                
                <button
                  onClick={() => handleAction('cancel')}
                  className="w-full py-3 px-4 bg-gray-100 hover:bg-gray-200 dark:bg-gray-800 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-xl font-medium flex items-center justify-center gap-2 transition-colors"
                >
                  <X size={18} />
                  إلغاء والبقاء في الملاحظة
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
