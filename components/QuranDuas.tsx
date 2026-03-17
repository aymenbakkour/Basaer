import { motion } from 'motion/react';
import { Book, Heart } from 'lucide-react';
import { QURAN_DUAS_DATA } from '@/lib/quran-duas-data';

export default function QuranDuas() {
  return (
    <div className="space-y-6">
      <div className="bg-[#F0F4E8] dark:bg-[#2C3E18]/30 p-6 rounded-3xl border border-[#E5E5D8] dark:border-[#2C3E18]">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-12 h-12 bg-[#3A4D1A] dark:bg-[#556B2F] rounded-2xl flex items-center justify-center text-white">
            <Book size={24} />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-[#2C3E18] dark:text-[#E5E5D8]">أدعية قرآنية</h2>
            <p className="text-[#556B2F] dark:text-[#A3B881] text-sm mt-1">أدعية الأنبياء والصالحين من القرآن الكريم</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4">
        {QURAN_DUAS_DATA.map((item, index) => (
          <motion.div
            key={item.id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ delay: (index % 10) * 0.05 }}
            className="bg-white dark:bg-[#1A1D17] p-6 rounded-2xl border border-[#E5E5D8] dark:border-[#2C3E18] shadow-sm hover:shadow-md transition-shadow"
          >
            <h3 className="text-xl font-bold text-[#3A4D1A] dark:text-[#E5E5D8] mb-4 flex items-center gap-2">
              <Heart size={20} className="text-[#556B2F] dark:text-[#A3B881]" />
              {item.title}
            </h3>
            <p className="text-gray-700 dark:text-gray-300 leading-loose font-quran text-xl">
              {item.dua}
            </p>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
