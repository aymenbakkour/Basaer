import { motion } from 'motion/react';
import { Heart, BookOpen } from 'lucide-react';
import { SURAH_BENEFITS_DATA } from '@/lib/surah-benefits-data';

export default function SurahBenefits() {
  return (
    <div className="space-y-6">
      <div className="bg-[#F0F4E8] dark:bg-[#2C3E18]/30 p-6 rounded-3xl border border-[#E5E5D8] dark:border-[#2C3E18]">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-12 h-12 bg-[#3A4D1A] dark:bg-[#556B2F] rounded-2xl flex items-center justify-center text-white">
            <Heart size={24} />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-[#2C3E18] dark:text-[#E5E5D8]">فوائد السور</h2>
            <p className="text-[#556B2F] dark:text-[#A3B881] text-sm mt-1">فضائل وخصائص سور القرآن الكريم (114 سورة)</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {SURAH_BENEFITS_DATA.map((item, index) => (
          <motion.div
            key={item.id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ delay: (index % 10) * 0.05 }}
            className="bg-white dark:bg-[#1A1D17] p-6 rounded-2xl border border-[#E5E5D8] dark:border-[#2C3E18] shadow-sm hover:shadow-md transition-shadow"
          >
            <h3 className="text-xl font-bold text-[#3A4D1A] dark:text-[#E5E5D8] mb-4 flex items-center gap-2">
              <BookOpen size={20} className="text-[#556B2F] dark:text-[#A3B881]" />
              {item.sura}
            </h3>
            <ul className="space-y-3">
              {item.benefits.map((benefit, i) => (
                <li key={i} className="flex items-start gap-2 text-gray-700 dark:text-gray-300">
                  <span className="text-[#556B2F] dark:text-[#A3B881] mt-1">•</span>
                  <span className="leading-relaxed">{benefit}</span>
                </li>
              ))}
            </ul>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
