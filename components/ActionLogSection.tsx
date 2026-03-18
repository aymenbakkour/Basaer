'use client';

import { motion } from 'motion/react';
import { X, Activity, Clock, FileText, Settings, Star, Search, Map, BookOpen } from 'lucide-react';
import { useAppContext } from '@/lib/store';

export default function ActionLogSection({ onClose }: { onClose: () => void }) {
  const { state } = useAppContext();
  const { actionLogs } = state;

  const getActionIcon = (action: string) => {
    if (action.includes('note')) return <FileText size={16} />;
    if (action.includes('theme')) return <Settings size={16} />;
    if (action.includes('status') || action.includes('rating')) return <Star size={16} />;
    if (action.includes('search')) return <Search size={16} />;
    if (action.includes('plan')) return <Map size={16} />;
    if (action.includes('sura') || action.includes('story')) return <BookOpen size={16} />;
    return <Activity size={16} />;
  };

  const formatTime = (timestamp: number) => {
    return new Intl.DateTimeFormat('ar-EG', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    }).format(new Date(timestamp));
  };

  return (
    <motion.div
      key="action-log"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.2 }}
      className="bg-white dark:bg-[#1A1D17] w-full rounded-3xl shadow-sm border border-[#E5E5D8] dark:border-[#2C3E18] overflow-hidden"
    >
      <div className="flex items-center justify-between p-6 border-b border-[#E5E5D8] dark:border-[#2C3E18]">
        <h2 className="text-xl font-bold text-[#3A4D1A] dark:text-[#E5E5D8] flex items-center gap-2">
          <Activity size={24} />
          سجل النشاطات (البروتوكول)
        </h2>
        <button onClick={onClose} className="p-2 text-gray-500 hover:bg-gray-100 dark:hover:bg-[#2C3E18] rounded-full transition-colors">
          <X size={20} />
        </button>
      </div>
      
      <div className="p-6">
        {actionLogs.length === 0 ? (
          <div className="text-center py-12 text-gray-500 dark:text-gray-400">
            <Activity size={48} className="mx-auto mb-4 opacity-20" />
            <p>لا توجد نشاطات مسجلة بعد</p>
          </div>
        ) : (
          <div className="space-y-4 max-h-[60vh] overflow-y-auto pr-2">
            {actionLogs.map((log) => (
              <div key={log.id} className="flex gap-4 p-4 bg-[#FDFBF7] dark:bg-[#121410] rounded-xl border border-[#E5E5D8] dark:border-[#2C3E18]">
                <div className="w-10 h-10 rounded-full bg-[#F0F4E8] dark:bg-[#2C3E18] flex items-center justify-center text-[#556B2F] dark:text-[#A3B881] shrink-0">
                  {getActionIcon(log.action)}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex justify-between items-start mb-1">
                    <p className="font-medium text-[#2C3E18] dark:text-[#E5E5D8] truncate">{log.details}</p>
                    <span className="text-xs text-gray-500 dark:text-gray-400 flex items-center gap-1 shrink-0 mr-2">
                      <Clock size={12} />
                      {formatTime(log.timestamp)}
                    </span>
                  </div>
                  <p className="text-xs text-gray-500 dark:text-gray-400 font-mono bg-gray-100 dark:bg-gray-800 inline-block px-2 py-0.5 rounded">
                    {log.action}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </motion.div>
  );
}
