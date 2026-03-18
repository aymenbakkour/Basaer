'use client';

import { useEffect, useState, useRef } from 'react';
import { useAppContext } from '@/lib/store';
import { BADGES } from '@/lib/badges-data';
import { motion, AnimatePresence } from 'motion/react';
import { Trophy, X } from 'lucide-react';
import confetti from 'canvas-confetti';

export default function BadgeNotification() {
  const { state } = useAppContext();
  const [earnedBadges, setEarnedBadges] = useState<string[]>([]);
  const [currentNotification, setCurrentNotification] = useState<any | null>(null);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    // Load previously earned badges from localStorage
    const saved = localStorage.getItem('earnedBadges');
    if (saved) {
      setEarnedBadges(JSON.parse(saved));
    } else {
      // If no saved badges, initialize with currently earned badges to prevent initial spam
      const initialEarned: string[] = [];
      BADGES.forEach((badge) => {
        if (badge.condition(state)) {
          initialEarned.push(badge.id);
        }
      });
      setEarnedBadges(initialEarned);
      localStorage.setItem('earnedBadges', JSON.stringify(initialEarned));
    }
    setIsLoaded(true);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // Run only once on mount

  useEffect(() => {
    if (!isLoaded) return;

    const newlyEarned: any[] = [];
    const updatedEarnedBadges = [...earnedBadges];

    BADGES.forEach((badge) => {
      if (!earnedBadges.includes(badge.id) && badge.condition(state)) {
        newlyEarned.push(badge);
        updatedEarnedBadges.push(badge.id);
      }
    });

    if (newlyEarned.length > 0) {
      setEarnedBadges(updatedEarnedBadges);
      localStorage.setItem('earnedBadges', JSON.stringify(updatedEarnedBadges));
      
      // Show the first newly earned badge
      setCurrentNotification(newlyEarned[0]);
      
      // Trigger confetti
      confetti({
        particleCount: 150,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#556B2F', '#A3B881', '#F0F4E8', '#FFD700']
      });

      // Auto hide after 5 seconds
      setTimeout(() => {
        setCurrentNotification(null);
      }, 5000);
    }
  }, [state, earnedBadges, isLoaded]);

  return (
    <AnimatePresence>
      {currentNotification && (
        <motion.div
          initial={{ opacity: 0, y: 50, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 20, scale: 0.9 }}
          className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 w-[90%] max-w-sm"
        >
          <div className="bg-white dark:bg-[#1A1D17] border-2 border-[#556B2F] dark:border-[#A3B881] rounded-2xl p-4 shadow-2xl flex items-start gap-4 relative overflow-hidden">
            <div className="absolute -right-4 -top-4 w-24 h-24 bg-[#556B2F]/10 dark:bg-[#A3B881]/10 rounded-full blur-xl"></div>
            
            <div className={`w-14 h-14 shrink-0 rounded-full flex items-center justify-center text-3xl ${currentNotification.color} z-10 shadow-inner`}>
              {currentNotification.icon}
            </div>
            
            <div className="flex-1 z-10">
              <div className="flex items-center gap-2 mb-1">
                <Trophy size={16} className="text-[#556B2F] dark:text-[#A3B881]" />
                <span className="text-xs font-bold text-[#556B2F] dark:text-[#A3B881] uppercase tracking-wider">إنجاز جديد!</span>
              </div>
              <h4 className="text-lg font-bold text-[#2C3E18] dark:text-[#E5E5D8] mb-1">
                {currentNotification.title}
              </h4>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                {currentNotification.description}
              </p>
            </div>

            <button 
              onClick={() => setCurrentNotification(null)}
              className="absolute top-2 left-2 p-1 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 z-10"
            >
              <X size={16} />
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
