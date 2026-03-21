'use client';

import { useAppContext } from '@/lib/store';
import { Calendar as CalendarIcon, Clock } from 'lucide-react';

export default function StudyCalendar() {
  const { state } = useAppContext();
  const sessions = state.studySessions || [];

  // Calculate total time
  const totalMinutes = sessions.reduce((acc, session) => acc + session.durationMinutes, 0);
  const totalHours = Math.floor(totalMinutes / 60);
  const remainingMinutes = totalMinutes % 60;

  // Calculate daily, monthly, yearly stats
  const now = new Date();
  const todayStart = new Date(now.getFullYear(), now.getMonth(), now.getDate()).getTime();
  const monthStart = new Date(now.getFullYear(), now.getMonth(), 1).getTime();
  const yearStart = new Date(now.getFullYear(), 0, 1).getTime();

  const dailyMinutes = sessions
    .filter(s => s.timestamp >= todayStart)
    .reduce((acc, s) => acc + s.durationMinutes, 0);

  const monthlyMinutes = sessions
    .filter(s => s.timestamp >= monthStart)
    .reduce((acc, s) => acc + s.durationMinutes, 0);

  const yearlyMinutes = sessions
    .filter(s => s.timestamp >= yearStart)
    .reduce((acc, s) => acc + s.durationMinutes, 0);

  const formatTime = (mins: number) => {
    const h = Math.floor(mins / 60);
    const m = mins % 60;
    if (h > 0) {
      return `${h} ساعة و ${m} دقيقة`;
    }
    return `${m} دقيقة`;
  };

  return (
    <section className="w-full">
      <h3 className="text-lg font-bold text-[#3A4D1A] dark:text-[#E5E5D8] mb-4 flex items-center">
        <CalendarIcon className="ml-2" size={20} />
        سجل الدراسة والوقت
      </h3>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-[#FDFBF7] dark:bg-[#121410] p-6 rounded-2xl shadow-sm border border-[#E5E5D8] dark:border-[#2C3E18] flex flex-col items-center justify-center text-center">
          <div className="p-3 bg-[#F0F4E8] dark:bg-[#2C3E18] rounded-full text-[#556B2F] dark:text-[#A3B881] mb-3">
            <Clock size={24} />
          </div>
          <p className="text-sm text-gray-500 dark:text-gray-400 font-medium mb-1">إجمالي وقت الدراسة</p>
          <p className="text-xl font-bold text-[#2C3E18] dark:text-[#E5E5D8]">{formatTime(totalMinutes)}</p>
        </div>

        <div className="bg-[#FDFBF7] dark:bg-[#121410] p-6 rounded-2xl shadow-sm border border-[#E5E5D8] dark:border-[#2C3E18] flex flex-col items-center justify-center text-center">
          <p className="text-sm text-gray-500 dark:text-gray-400 font-medium mb-1">اليوم</p>
          <p className="text-xl font-bold text-[#2C3E18] dark:text-[#E5E5D8]">{formatTime(dailyMinutes)}</p>
        </div>

        <div className="bg-[#FDFBF7] dark:bg-[#121410] p-6 rounded-2xl shadow-sm border border-[#E5E5D8] dark:border-[#2C3E18] flex flex-col items-center justify-center text-center">
          <p className="text-sm text-gray-500 dark:text-gray-400 font-medium mb-1">هذا الشهر</p>
          <p className="text-xl font-bold text-[#2C3E18] dark:text-[#E5E5D8]">{formatTime(monthlyMinutes)}</p>
        </div>

        <div className="bg-[#FDFBF7] dark:bg-[#121410] p-6 rounded-2xl shadow-sm border border-[#E5E5D8] dark:border-[#2C3E18] flex flex-col items-center justify-center text-center">
          <p className="text-sm text-gray-500 dark:text-gray-400 font-medium mb-1">هذا العام</p>
          <p className="text-xl font-bold text-[#2C3E18] dark:text-[#E5E5D8]">{formatTime(yearlyMinutes)}</p>
        </div>
      </div>

      <div className="mt-4 bg-[#FDFBF7] dark:bg-[#121410] p-6 rounded-2xl shadow-sm border border-[#E5E5D8] dark:border-[#2C3E18]">
        <h4 className="text-sm font-bold text-[#556B2F] dark:text-[#A3B881] mb-4">سجل الجلسات الأخيرة</h4>
        {sessions.length === 0 ? (
          <p className="text-gray-500 dark:text-gray-400 text-sm text-center py-4">لم تقم بتسجيل أي جلسات دراسة بعد. استخدم المؤقت للبدء!</p>
        ) : (
          <div className="space-y-3 max-h-60 overflow-y-auto pr-2">
            {[...sessions].sort((a, b) => b.timestamp - a.timestamp).slice(0, 10).map((session) => (
              <div key={session.id} className="flex justify-between items-center border-b border-gray-100 dark:border-[#2C3E18] pb-2">
                <span className="text-[#3A4D1A] dark:text-[#E5E5D8] text-sm">
                  {new Date(session.timestamp).toLocaleDateString('ar-EG', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
                </span>
                <span className="bg-[#F0F4E8] dark:bg-[#2C3E18] text-[#556B2F] dark:text-[#A3B881] px-3 py-1 rounded-full text-sm font-bold">
                  {formatTime(session.durationMinutes)}
                </span>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
