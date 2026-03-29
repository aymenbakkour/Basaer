'use client';

import { useTimerContext } from '@/components/TimerContext';
import { Play, Pause, RotateCcw, Clock } from 'lucide-react';
import { motion } from 'motion/react';

interface StudyTimerProps {
  compact?: boolean;
}

export default function StudyTimer({ compact = false }: StudyTimerProps) {
  const { timerSeconds, isTimerRunning, startTimer, pauseTimer, resetTimer } = useTimerContext();

  const handleToggle = () => {
    if (isTimerRunning) {
      pauseTimer();
    } else {
      startTimer();
    }
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
          <button onClick={handleToggle} className="p-1 text-[#556B2F] dark:text-[#A3B881] hover:bg-[#F0F4E8] dark:hover:bg-[#2C3E18] rounded-full transition-colors">
            {isTimerRunning ? <Pause size={14} /> : <Play size={14} />}
          </button>
          <button onClick={resetTimer} className="p-1 text-gray-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-full transition-colors" title="إعادة تعيين">
            <RotateCcw size={14} />
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
          <button 
            onClick={handleToggle}
            className={`w-12 h-12 flex items-center justify-center rounded-xl transition-colors ${isTimerRunning ? 'bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-400 hover:bg-amber-200 dark:hover:bg-amber-900/50' : 'bg-[#556B2F] text-white hover:bg-[#3A4D1A]'}`}
          >
            {isTimerRunning ? <Pause size={24} /> : <Play size={24} />}
          </button>
          <button 
            onClick={resetTimer}
            className="w-12 h-12 flex items-center justify-center rounded-xl bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
            title="إعادة تعيين"
          >
            <RotateCcw size={20} />
          </button>
        </div>
      </div>
    </motion.div>
  );
}
