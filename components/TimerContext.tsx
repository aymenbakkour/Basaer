'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { useAppContext } from '@/lib/store';
import { motion, AnimatePresence } from 'motion/react';
import { CheckCircle2 } from 'lucide-react';

interface TimerContextType {
  timerSeconds: number;
  isTimerRunning: boolean;
  startTimer: () => void;
  pauseTimer: () => void;
  resetTimer: () => void;
  hasUnsavedNote: boolean;
  setHasUnsavedNote: (has: boolean) => void;
  pendingSectionChange: string | null;
  setPendingSectionChange: (section: string | null) => void;
}

const TimerContext = createContext<TimerContextType | undefined>(undefined);

export function TimerProvider({ children }: { children: React.ReactNode }) {
  const [timerSeconds, setTimerSeconds] = useState(0);
  const [isTimerRunning, setIsTimerRunning] = useState(false);
  const [hasUnsavedNote, setHasUnsavedNote] = useState(false);
  const [pendingSectionChange, setPendingSectionChange] = useState<string | null>(null);
  const [showNotification, setShowNotification] = useState(false);
  const [lastSessionMinutes, setLastSessionMinutes] = useState(0);
  
  const { state, addStudySession, setTimerStart, isLoaded, updateLastActiveTime } = useAppContext();

  // Handle persistence and "closure" calculation
  useEffect(() => {
    if (isLoaded && state.lastTimerStart) {
      const startTime = state.lastTimerStart;
      const endTime = state.lastActiveTime || Date.now();
      const elapsedSeconds = Math.floor((endTime - startTime) / 1000);
      const elapsedMinutes = Math.floor(elapsedSeconds / 60);
      
      if (elapsedMinutes > 0) {
        addStudySession(elapsedMinutes);
        setLastSessionMinutes(elapsedMinutes);
        setShowNotification(true);
        setTimeout(() => setShowNotification(false), 5000);
      }
      
      // Clear the timer start since we've "closed" that session
      setTimerStart(undefined);
    }
  }, [isLoaded, state.lastTimerStart, state.lastActiveTime, addStudySession, setTimerStart]); // Only run once when app loads and data is ready

  useEffect(() => {
    let interval: NodeJS.Timeout;
    let activeTimeInterval: NodeJS.Timeout;
    
    if (isTimerRunning && state.lastTimerStart) {
      interval = setInterval(() => {
        const now = Date.now();
        const elapsed = Math.floor((now - state.lastTimerStart!) / 1000);
        setTimerSeconds(elapsed);
      }, 1000);
      
      // Update last active time every 10 seconds
      activeTimeInterval = setInterval(() => {
        updateLastActiveTime(Date.now());
      }, 10000);
    } else {
      setTimerSeconds(0);
    }
    return () => {
      if (interval) clearInterval(interval);
      if (activeTimeInterval) clearInterval(activeTimeInterval);
    };
  }, [isTimerRunning, state.lastTimerStart, updateLastActiveTime]);

  const startTimer = () => {
    const now = Date.now();
    setTimerStart(now);
    setIsTimerRunning(true);
  };

  const pauseTimer = () => {
    if (state.lastTimerStart) {
      const now = Date.now();
      const elapsedSeconds = Math.floor((now - state.lastTimerStart) / 1000);
      const elapsedMinutes = Math.floor(elapsedSeconds / 60);
      
      if (elapsedMinutes > 0) {
        addStudySession(elapsedMinutes);
        setLastSessionMinutes(elapsedMinutes);
        setShowNotification(true);
        setTimeout(() => setShowNotification(false), 5000);
      }
    }
    setIsTimerRunning(false);
    setTimerStart(undefined);
    setTimerSeconds(0);
  };
  
  const resetTimer = () => {
    setIsTimerRunning(false);
    setTimerStart(undefined);
    setTimerSeconds(0);
  };

  return (
    <TimerContext.Provider
      value={{
        timerSeconds,
        isTimerRunning,
        startTimer,
        pauseTimer,
        resetTimer,
        hasUnsavedNote,
        setHasUnsavedNote,
        pendingSectionChange,
        setPendingSectionChange,
      }}
    >
      {children}
      <AnimatePresence>
        {showNotification && (
          <motion.div
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -50 }}
            className="fixed top-20 left-1/2 -translate-x-1/2 z-50 bg-[#F0F4E8] dark:bg-[#2C3E18] border border-[#556B2F] dark:border-[#A3B881] text-[#3A4D1A] dark:text-[#E5E5D8] px-6 py-4 rounded-2xl shadow-lg flex items-center gap-3"
          >
            <CheckCircle2 className="text-[#556B2F] dark:text-[#A3B881]" size={24} />
            <div>
              <h4 className="font-bold">تم تسجيل وقت الدراسة!</h4>
              <p className="text-sm opacity-90">تم إضافة {lastSessionMinutes} دقيقة إلى سجلك.</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </TimerContext.Provider>
  );
}

export function useTimerContext() {
  const context = useContext(TimerContext);
  if (!context) throw new Error('useTimerContext must be used within TimerProvider');
  return context;
}
