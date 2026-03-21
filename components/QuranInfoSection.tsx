import { motion } from 'motion/react';
import { QURAN_STATS } from '@/lib/quran-stats';
import { ArrowRight, BookOpen } from 'lucide-react';

interface QuranInfoSectionProps {
  onBack: () => void;
}

export default function QuranInfoSection({ onBack }: QuranInfoSectionProps) {
  return (
    <motion.div
      key="quran-info"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="max-w-4xl mx-auto"
    >
      <div className="flex items-center gap-4 mb-8">
        <button
          onClick={onBack}
          className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full transition-colors"
        >
          <ArrowRight size={24} className="text-gray-600 dark:text-gray-400" />
        </button>
        <h2 className="text-3xl font-bold text-[#2C3E18] dark:text-[#E5E5D8] font-quran flex items-center gap-3">
          <BookOpen className="text-[#556B2F] dark:text-[#A3B881]" size={32} />
          معلومات قرآنية
        </h2>
      </div>

      <div className="bg-white dark:bg-[#1A1D17] p-6 md:p-8 rounded-3xl shadow-sm border border-[#E5E5D8] dark:border-[#2C3E18] transition-colors mb-8">
        <h3 className="text-xl font-bold text-[#3A4D1A] dark:text-[#E5E5D8] mb-6 flex items-center gap-2">
          <span className="w-2 h-6 bg-[#556B2F] dark:bg-[#A3B881] rounded-full"></span>
          إحصائيات عامة
        </h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <motion.div whileHover={{ y: -4 }} className="bg-[#FDFBF7] dark:bg-[#121410] p-4 rounded-2xl shadow-sm border border-[#E5E5D8] dark:border-[#2C3E18] flex flex-col items-center justify-center text-center transition-colors">
            <p className="text-sm text-gray-500 dark:text-gray-400 font-medium mb-1">إجمالي الكلمات</p>
            <p className="text-2xl font-bold text-[#2C3E18] dark:text-[#E5E5D8]">{QURAN_STATS.totalWords.toLocaleString('ar-EG')}</p>
          </motion.div>
          <motion.div whileHover={{ y: -4 }} className="bg-[#FDFBF7] dark:bg-[#121410] p-4 rounded-2xl shadow-sm border border-[#E5E5D8] dark:border-[#2C3E18] flex flex-col items-center justify-center text-center transition-colors">
            <p className="text-sm text-gray-500 dark:text-gray-400 font-medium mb-1">إجمالي الحروف</p>
            <p className="text-2xl font-bold text-[#2C3E18] dark:text-[#E5E5D8]">{QURAN_STATS.totalLetters.toLocaleString('ar-EG')}</p>
          </motion.div>
          <motion.div whileHover={{ y: -4 }} className="bg-[#FDFBF7] dark:bg-[#121410] p-4 rounded-2xl shadow-sm border border-[#E5E5D8] dark:border-[#2C3E18] flex flex-col items-center justify-center text-center transition-colors">
            <p className="text-sm text-gray-500 dark:text-gray-400 font-medium mb-1">السور المكية</p>
            <p className="text-2xl font-bold text-[#2C3E18] dark:text-[#E5E5D8]">{QURAN_STATS.makkiSuras}</p>
          </motion.div>
          <motion.div whileHover={{ y: -4 }} className="bg-[#FDFBF7] dark:bg-[#121410] p-4 rounded-2xl shadow-sm border border-[#E5E5D8] dark:border-[#2C3E18] flex flex-col items-center justify-center text-center transition-colors">
            <p className="text-sm text-gray-500 dark:text-gray-400 font-medium mb-1">السور المدنية</p>
            <p className="text-2xl font-bold text-[#2C3E18] dark:text-[#E5E5D8]">{QURAN_STATS.madaniSuras}</p>
          </motion.div>
        </div>

        <h3 className="text-xl font-bold text-[#3A4D1A] dark:text-[#E5E5D8] mb-6 flex items-center gap-2">
          <span className="w-2 h-6 bg-[#556B2F] dark:bg-[#A3B881] rounded-full"></span>
          أطول وأقصر
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
          <motion.div whileHover={{ y: -4 }} className="bg-[#FDFBF7] dark:bg-[#121410] p-4 rounded-2xl shadow-sm border border-[#E5E5D8] dark:border-[#2C3E18] flex flex-col items-center justify-center text-center transition-colors">
            <p className="text-sm text-gray-500 dark:text-gray-400 font-medium mb-1">أطول سورة</p>
            <p className="text-lg font-bold text-[#2C3E18] dark:text-[#E5E5D8]">{QURAN_STATS.longestSura}</p>
          </motion.div>
          <motion.div whileHover={{ y: -4 }} className="bg-[#FDFBF7] dark:bg-[#121410] p-4 rounded-2xl shadow-sm border border-[#E5E5D8] dark:border-[#2C3E18] flex flex-col items-center justify-center text-center transition-colors">
            <p className="text-sm text-gray-500 dark:text-gray-400 font-medium mb-1">أقصر سورة</p>
            <p className="text-lg font-bold text-[#2C3E18] dark:text-[#E5E5D8]">{QURAN_STATS.shortestSura}</p>
          </motion.div>
          <motion.div whileHover={{ y: -4 }} className="bg-[#FDFBF7] dark:bg-[#121410] p-4 rounded-2xl shadow-sm border border-[#E5E5D8] dark:border-[#2C3E18] flex flex-col items-center justify-center text-center transition-colors">
            <p className="text-sm text-gray-500 dark:text-gray-400 font-medium mb-1">أطول آية</p>
            <p className="text-sm font-bold text-[#2C3E18] dark:text-[#E5E5D8]">{QURAN_STATS.longestAyah}</p>
          </motion.div>
          <motion.div whileHover={{ y: -4 }} className="bg-[#FDFBF7] dark:bg-[#121410] p-4 rounded-2xl shadow-sm border border-[#E5E5D8] dark:border-[#2C3E18] flex flex-col items-center justify-center text-center transition-colors">
            <p className="text-sm text-gray-500 dark:text-gray-400 font-medium mb-1">أقصر آية</p>
            <p className="text-sm font-bold text-[#2C3E18] dark:text-[#E5E5D8]">{QURAN_STATS.shortestAyah}</p>
          </motion.div>
          <motion.div whileHover={{ y: -4 }} className="bg-[#FDFBF7] dark:bg-[#121410] p-4 rounded-2xl shadow-sm border border-[#E5E5D8] dark:border-[#2C3E18] flex flex-col items-center justify-center text-center transition-colors">
            <p className="text-sm text-gray-500 dark:text-gray-400 font-medium mb-1">أطول كلمة</p>
            <p className="text-sm font-bold text-[#2C3E18] dark:text-[#E5E5D8]">{QURAN_STATS.longestWord}</p>
          </motion.div>
          <motion.div whileHover={{ y: -4 }} className="bg-[#FDFBF7] dark:bg-[#121410] p-4 rounded-2xl shadow-sm border border-[#E5E5D8] dark:border-[#2C3E18] flex flex-col items-center justify-center text-center transition-colors">
            <p className="text-sm text-gray-500 dark:text-gray-400 font-medium mb-1">الكلمة التي تتوسط القرآن</p>
            <p className="text-sm font-bold text-[#2C3E18] dark:text-[#E5E5D8]">{QURAN_STATS.middleWord}</p>
          </motion.div>
        </div>

        <h3 className="text-xl font-bold text-[#3A4D1A] dark:text-[#E5E5D8] mb-6 flex items-center gap-2">
          <span className="w-2 h-6 bg-[#556B2F] dark:bg-[#A3B881] rounded-full"></span>
          معلومات أخرى
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
          <motion.div whileHover={{ y: -4 }} className="bg-[#FDFBF7] dark:bg-[#121410] p-4 rounded-2xl shadow-sm border border-[#E5E5D8] dark:border-[#2C3E18] flex flex-col items-center justify-center text-center transition-colors">
            <p className="text-sm text-gray-500 dark:text-gray-400 font-medium mb-1">عدد الأنبياء المذكورين</p>
            <p className="text-lg font-bold text-[#2C3E18] dark:text-[#E5E5D8]">{QURAN_STATS.prophetsMentioned}</p>
          </motion.div>
          <motion.div whileHover={{ y: -4 }} className="bg-[#FDFBF7] dark:bg-[#121410] p-4 rounded-2xl shadow-sm border border-[#E5E5D8] dark:border-[#2C3E18] flex flex-col items-center justify-center text-center transition-colors">
            <p className="text-sm text-gray-500 dark:text-gray-400 font-medium mb-1">سورة بدون بسملة</p>
            <p className="text-lg font-bold text-[#2C3E18] dark:text-[#E5E5D8]">{QURAN_STATS.suraWithoutBasmala}</p>
          </motion.div>
          <motion.div whileHover={{ y: -4 }} className="bg-[#FDFBF7] dark:bg-[#121410] p-4 rounded-2xl shadow-sm border border-[#E5E5D8] dark:border-[#2C3E18] flex flex-col items-center justify-center text-center transition-colors">
            <p className="text-sm text-gray-500 dark:text-gray-400 font-medium mb-1">سورة ببسمتلين</p>
            <p className="text-lg font-bold text-[#2C3E18] dark:text-[#E5E5D8]">{QURAN_STATS.suraWithTwoBasmalas}</p>
          </motion.div>
          <motion.div whileHover={{ y: -4 }} className="bg-[#FDFBF7] dark:bg-[#121410] p-4 rounded-2xl shadow-sm border border-[#E5E5D8] dark:border-[#2C3E18] flex flex-col items-center justify-center text-center transition-colors">
            <p className="text-sm text-gray-500 dark:text-gray-400 font-medium mb-1">سورة سميت باسم امرأة</p>
            <p className="text-lg font-bold text-[#2C3E18] dark:text-[#E5E5D8]">{QURAN_STATS.suraNamedAfterWoman}</p>
          </motion.div>
          <motion.div whileHover={{ y: -4 }} className="bg-[#FDFBF7] dark:bg-[#121410] p-4 rounded-2xl shadow-sm border border-[#E5E5D8] dark:border-[#2C3E18] flex flex-col items-center justify-center text-center transition-colors md:col-span-2">
            <p className="text-sm text-gray-500 dark:text-gray-400 font-medium mb-1">سور سميت بأسماء أنبياء</p>
            <p className="text-lg font-bold text-[#2C3E18] dark:text-[#E5E5D8]">{QURAN_STATS.surasNamedAfterProphets}</p>
          </motion.div>
        </div>

        <div className="bg-[#FDFBF7] dark:bg-[#121410] p-6 rounded-2xl shadow-sm border border-[#E5E5D8] dark:border-[#2C3E18] transition-colors">
          <h4 className="text-sm font-bold text-[#556B2F] dark:text-[#A3B881] mb-4">كم مرة ذكرت هذه الكلمات؟</h4>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-y-4 gap-x-6">
            {QURAN_STATS.wordFrequencies.map((item, index) => (
              <div key={index} className="flex justify-between items-center border-b border-gray-100 dark:border-[#2C3E18] pb-2">
                <span className="text-[#3A4D1A] dark:text-[#E5E5D8] font-medium">&quot;{item.word}&quot;</span>
                <span className="bg-[#F0F4E8] dark:bg-[#2C3E18] text-[#556B2F] dark:text-[#A3B881] px-2 py-0.5 rounded text-sm font-bold">
                  {item.count}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
}
