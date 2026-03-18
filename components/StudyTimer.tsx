'use client';

import { useTimerContext } from '@/components/TimerContext';
import { useAppContext } from '@/lib/store';
import { Play, Pause, RotateCcw, Clock, Settings2, CheckCircle2 } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { useState, useEffect, useRef } from 'react';

interface StudyTimerProps {
  compact?: boolean;
}

export default function StudyTimer({ compact = false }: StudyTimerProps) {
  const { timerSeconds, isTimerRunning, isCountdown, initialDuration, startTimer, pauseTimer, resetTimer } = useTimerContext();
  const { addStudySession } = useAppContext();
  const [showSettings, setShowSettings] = useState(false);
  const [inputHours, setInputHours] = useState('0');
  const [inputMinutes, setInputMinutes] = useState('30');

  const handleStart = () => {
    if (timerSeconds === 0 && !isTimerRunning) {
      const h = parseInt(inputHours) || 0;
      const m = parseInt(inputMinutes) || 0;
      const totalSeconds = (h * 3600) + (m * 60);
      if (totalSeconds > 0) {
        startTimer(totalSeconds);
      } else {
        startTimer(); // countup
      }
      setShowSettings(false);
    } else {
      startTimer();
    }
  };

  const handleStopAndLog = () => {
    pauseTimer();
    let elapsed = 0;
    if (isCountdown) {
      elapsed = initialDuration - timerSeconds;
    } else {
      elapsed = timerSeconds;
    }
    const durationMinutes = Math.round(elapsed / 60);
    if (durationMinutes > 0) {
      addStudySession(durationMinutes);
    }
    resetTimer();
  };

  const formatTime = (totalSeconds: number) => {
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;

    if (hours > 0) {
      return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    }
    return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  };

  if (compact) {
    return (
      <div className="fixed top-4 left-4 z-40 bg-white/90 dark:bg-[#1A1D17]/90 backdrop-blur-md border border-[#E5E5D8] dark:border-[#2C3E18] rounded-full px-4 py-2 flex items-center gap-3 shadow-sm">
        <Clock size={16} className={`${isTimerRunning ? 'text-[#556B2F] dark:text-[#A3B881] animate-pulse' : 'text-gray-400'}`} />
        <span className="font-mono font-bold text-[#3A4D1A] dark:text-[#E5E5D8] text-sm">
          {formatTime(timerSeconds)}
        </span>
        <div className="flex items-center gap-1 border-r border-[#E5E5D8] dark:border-[#2C3E18] pr-2 ml-2">
          {isTimerRunning ? (
            <button onClick={pauseTimer} className="p-1 text-[#556B2F] dark:text-[#A3B881] hover:bg-[#F0F4E8] dark:hover:bg-[#2C3E18] rounded-full transition-colors">
              <Pause size={14} />
            </button>
          ) : (
            <button onClick={handleStart} className="p-1 text-[#556B2F] dark:text-[#A3B881] hover:bg-[#F0F4E8] dark:hover:bg-[#2C3E18] rounded-full transition-colors">
              <Play size={14} />
            </button>
          )}
          <button onClick={handleStopAndLog} className="p-1 text-gray-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-full transition-colors" title="إنهاء وتسجيل">
            <CheckCircle2 size={14} />
          </button>
        </div>
      </div>
    );
  }

  return (
    <motion.div 
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white dark:bg-[#1A1D17] border border-[#E5E5D8] dark:border-[#2C3E18] rounded-2xl p-4 mb-8 shadow-sm relative overflow-hidden"
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className={`w-12 h-12 rounded-full flex items-center justify-center ${isTimerRunning ? 'bg-[#556B2F] text-white animate-pulse' : 'bg-[#F0F4E8] dark:bg-[#2C3E18] text-[#556B2F] dark:text-[#A3B881]'}`}>
            <Clock size={24} />
          </div>
          <div>
            <h3 className="text-sm font-bold text-gray-500 dark:text-gray-400 mb-1">مؤقت الدراسة</h3>
            <div className="font-mono text-3xl font-bold text-[#3A4D1A] dark:text-[#E5E5D8] tracking-wider">
              {formatTime(timerSeconds)}
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2">
          {!isTimerRunning && timerSeconds === 0 && (
            <button 
              onClick={() => setShowSettings(!showSettings)}
              className={`w-12 h-12 flex items-center justify-center rounded-xl transition-colors ${showSettings ? 'bg-[#556B2F] text-white' : 'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700'}`}
            >
              <Settings2 size={20} />
            </button>
          )}
          {isTimerRunning ? (
            <button 
              onClick={pauseTimer}
              className="w-12 h-12 flex items-center justify-center rounded-xl bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-400 hover:bg-amber-200 dark:hover:bg-amber-900/50 transition-colors"
            >
              <Pause size={24} />
            </button>
          ) : (
            <button 
              onClick={handleStart}
              className="w-12 h-12 flex items-center justify-center rounded-xl bg-[#556B2F] text-white hover:bg-[#3A4D1A] transition-colors"
            >
              <Play size={24} />
            </button>
          )}
          {(timerSeconds > 0 || isTimerRunning) && (
            <button 
              onClick={handleStopAndLog}
              className="w-12 h-12 flex items-center justify-center rounded-xl bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400 hover:bg-red-200 dark:hover:bg-red-900/50 transition-colors"
              title="إنهاء وتسجيل"
            >
              <CheckCircle2 size={20} />
            </button>
          )}
        </div>
      </div>

      <AnimatePresence>
        {showSettings && !isTimerRunning && timerSeconds === 0 && (
          <motion.div 
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden"
          >
            <div className="pt-4 mt-4 border-t border-[#E5E5D8] dark:border-[#2C3E18] flex items-center gap-4">
              <div className="flex-1">
                <label className="block text-xs text-gray-500 dark:text-gray-400 mb-1">الساعات</label>
                <input 
                  type="number" 
                  min="0" 
                  max="23"
                  value={inputHours}
                  onChange={(e) => setInputHours(e.target.value)}
                  className="w-full bg-[#FDFBF7] dark:bg-[#121410] border border-[#E5E5D8] dark:border-[#2C3E18] rounded-lg p-2 text-center text-[#2C3E18] dark:text-[#E5E5D8] outline-none focus:border-[#556B2F]"
                />
              </div>
              <div className="flex-1">
                <label className="block text-xs text-gray-500 dark:text-gray-400 mb-1">الدقائق</label>
                <input 
                  type="number" 
                  min="0" 
                  max="59"
                  value={inputMinutes}
                  onChange={(e) => setInputMinutes(e.target.value)}
                  className="w-full bg-[#FDFBF7] dark:bg-[#121410] border border-[#E5E5D8] dark:border-[#2C3E18] rounded-lg p-2 text-center text-[#2C3E18] dark:text-[#E5E5D8] outline-none focus:border-[#556B2F]"
                />
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
