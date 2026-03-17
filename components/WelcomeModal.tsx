'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { User, Sparkles, ArrowLeft } from 'lucide-react';

interface WelcomeModalProps {
  isOpen: boolean;
  onSubmit: (name: string) => void;
}

export default function WelcomeModal({ isOpen, onSubmit }: WelcomeModalProps) {
  const [name, setName] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (name.trim()) {
      onSubmit(name.trim());
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm">
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="bg-white dark:bg-[#1A1D17] rounded-3xl shadow-2xl w-full max-w-md overflow-hidden border border-[#E5E5D8] dark:border-[#2C3E18]"
          >
            <div className="p-8 text-center relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-[#F0F4E8] dark:bg-[#2C3E18] rounded-full -mr-10 -mt-10 opacity-50 dark:opacity-20"></div>
              <div className="absolute bottom-0 left-0 w-24 h-24 bg-[#F0F4E8] dark:bg-[#2C3E18] rounded-full -ml-8 -mb-8 opacity-50 dark:opacity-20"></div>
              
              <div className="relative z-10">
                <div className="w-16 h-16 bg-[#F0F4E8] dark:bg-[#2C3E18] rounded-full flex items-center justify-center mx-auto mb-6 text-[#556B2F] dark:text-[#A3B881]">
                  <Sparkles size={32} />
                </div>
                
                <h2 className="text-2xl font-bold text-[#3A4D1A] dark:text-[#E5E5D8] mb-2">
                  مرحباً بك في بصائر
                </h2>
                <p className="text-[#556B2F] dark:text-[#A3B881] mb-8">
                  رفيقك في رحلة تدبر وفهم القرآن الكريم. كيف تحب أن نناديك؟
                </p>

                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="relative">
                    <div className="absolute inset-y-0 right-0 pr-4 flex items-center pointer-events-none text-[#556B2F] dark:text-[#7A9A45]">
                      <User size={20} />
                    </div>
                    <input
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="أدخل اسمك هنا..."
                      className="w-full bg-[#FDFBF7] dark:bg-[#121410] border border-[#E5E5D8] dark:border-[#2C3E18] rounded-xl py-4 pr-12 pl-4 text-[#3A4D1A] dark:text-[#E5E5D8] placeholder-[#A3B881] dark:placeholder-[#556B2F] focus:outline-none focus:ring-2 focus:ring-[#556B2F] dark:focus:ring-[#7A9A45] transition-all"
                      autoFocus
                      required
                    />
                  </div>
                  
                  <button
                    type="submit"
                    disabled={!name.trim()}
                    className="w-full bg-[#556B2F] hover:bg-[#3A4D1A] dark:bg-[#7A9A45] dark:hover:bg-[#556B2F] text-white rounded-xl py-4 font-bold flex items-center justify-center gap-2 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <span>البدء في رحلة التدبر</span>
                    <ArrowLeft size={20} />
                  </button>
                </form>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
