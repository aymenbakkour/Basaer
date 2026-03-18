'use client';

import React, { createContext, useContext, useState, useEffect, useRef } from 'react';
import { useAppContext } from '@/lib/store';
import { motion, AnimatePresence } from 'motion/react';
import { CheckCircle2 } from 'lucide-react';

interface TimerContextType {
  timerSeconds: number; // remaining time if countdown, or elapsed if countup
  isTimerRunning: boolean;
  isCountdown: boolean;
  initialDuration: number;
  startTimer: (durationSeconds?: number) => void;
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
  const [initialDuration, setInitialDuration] = useState(0);
  const [isTimerRunning, setIsTimerRunning] = useState(false);
  const [isCountdown, setIsCountdown] = useState(false);
  const [hasUnsavedNote, setHasUnsavedNote] = useState(false);
  const [pendingSectionChange, setPendingSectionChange] = useState<string | null>(null);
  const [showNotification, setShowNotification] = useState(false);
  const prevTimerRef = useRef(timerSeconds);
  
  const { addStudySession } = useAppContext();

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isTimerRunning) {
      interval = setInterval(() => {
        setTimerSeconds((prev) => {
          if (isCountdown) {
            if (prev <= 1) {
              setIsTimerRunning(false);
              return 0;
            }
            return prev - 1;
          } else {
            return prev + 1;
          }
        });
      }, 1000);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isTimerRunning, isCountdown]);

  useEffect(() => {
    // Check if countdown finished
    if (isCountdown && prevTimerRef.current > 0 && timerSeconds === 0) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setShowNotification(true);
      const durationMinutes = Math.round(initialDuration / 60);
      if (durationMinutes > 0) {
        addStudySession(durationMinutes);
      }
      setTimeout(() => setShowNotification(false), 5000);
    }
    prevTimerRef.current = timerSeconds;
  }, [timerSeconds, isCountdown, initialDuration, addStudySession]);

  const startTimer = (durationSeconds?: number) => {
    if (durationSeconds !== undefined) {
      setTimerSeconds(durationSeconds);
      setInitialDuration(durationSeconds);
      setIsCountdown(true);
    } else if (timerSeconds === 0 && !isCountdown) {
      // Starting from 0 as countup
      setIsCountdown(false);
    }
    setIsTimerRunning(true);
  };

  const pauseTimer = () => setIsTimerRunning(false);
  
  const resetTimer = () => {
    setIsTimerRunning(false);
    setTimerSeconds(0);
    setInitialDuration(0);
    setIsCountdown(false);
  };

  return (
    <TimerContext.Provider
      value={{
        timerSeconds,
        isTimerRunning,
        isCountdown,
        initialDuration,
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
              <h4 className="font-bold">انتهى وقت الدراسة!</h4>
              <p className="text-sm opacity-90">تم تسجيل {Math.round(initialDuration / 60)} دقيقة في سجل دراستك.</p>
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
