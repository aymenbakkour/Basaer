'use client';

import { motion } from 'motion/react';
import { ChevronLeft, User, Heart, ExternalLink } from 'lucide-react';

export default function DeveloperSection({ onBack }: { onBack: () => void }) {
  return (
    <motion.div
      key="developer"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="max-w-3xl mx-auto"
    >
      <div className="flex items-center gap-4 mb-8">
        <button onClick={onBack} className="p-2 bg-white dark:bg-[#1A1D17] rounded-full shadow-sm hover:bg-gray-50 dark:hover:bg-[#2C3E18] transition-colors">
          <ChevronLeft size={24} className="text-[#556B2F] dark:text-[#A3B881]" />
        </button>
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 bg-[#F0F4E8] dark:bg-[#2C3E18] rounded-2xl flex items-center justify-center text-[#556B2F] dark:text-[#A3B881]">
            <User size={24} />
          </div>
          <h2 className="text-3xl font-bold text-[#2C3E18] dark:text-[#E5E5D8] font-quran">عن المطور</h2>
        </div>
      </div>

      <div className="bg-white dark:bg-[#1A1D17] rounded-3xl p-8 shadow-sm border border-[#E5E5D8] dark:border-[#2C3E18] text-center relative overflow-hidden">
        {/* Decorative elements */}
        <div className="absolute top-0 right-0 w-48 h-48 bg-[#F0F4E8] dark:bg-[#2C3E18] rounded-full -mr-24 -mt-24 opacity-50 dark:opacity-20"></div>
        <div className="absolute bottom-0 left-0 w-32 h-32 bg-[#F0F4E8] dark:bg-[#2C3E18] rounded-full -ml-16 -mb-16 opacity-50 dark:opacity-20"></div>

        <div className="relative z-10">
          <div className="w-32 h-32 mx-auto bg-[#FDFBF7] dark:bg-[#121410] border-4 border-[#E5E5D8] dark:border-[#3A4D1A] rounded-full flex items-center justify-center mb-8 shadow-lg relative">
            <Heart size={48} className="text-[#556B2F] dark:text-[#A3B881] animate-pulse" />
            <div className="absolute -bottom-2 -right-2 w-10 h-10 bg-[#D4AF37] rounded-full flex items-center justify-center border-2 border-white dark:border-[#1A1D17]">
              <User size={20} className="text-white" />
            </div>
          </div>
          
          <h3 className="text-3xl font-bold text-[#3A4D1A] dark:text-[#E5E5D8] mb-4 font-quran">أيمن بكور</h3>
          
          <div className="max-w-xl mx-auto space-y-6 text-gray-700 dark:text-gray-300 leading-loose text-lg font-serif text-justify">
            <p>
              بسم الله الرحمن الرحيم، والصلاة والسلام على أشرف الأنبياء والمرسلين.
            </p>
            <p>
              أنا أيمن بكور، حاصل على درجة البكالوريوس في المحاسبة، وقد قادني شغفي بالتكنولوجيا والإبداع للحصول على شهادة متخصصة في التصميم الجرافيكي وتطوير الويب في ألمانيا. أعمل حالياً كعمل حر (Freelancer)، حيث أكرس خبرتي في بناء وتصميم العديد من التطبيقات والمشاريع الرقمية التي تهدف إلى تقديم قيمة حقيقية وتجربة مستخدم مميزة.
            </p>
            <div className="py-6 border-y border-[#E5E5D8] dark:border-[#2C3E18] my-8">
              <p className="text-xl font-bold text-[#556B2F] dark:text-[#A3B881] font-quran leading-relaxed text-center mb-4">
                &quot;إلى من جرعا الكأس فارغاً ليسقياني قطرة حب... إلى أمي وأبي&quot;
              </p>
              <p className="text-center">
                أهدي ثواب هذا العمل المتواضع إلى قرة عيني ونبض قلبي؛ والداي الكريمان. إلى من سهرت الليالي الطوال تدعو لي، وإلى من كدّ وتعب ليمهد لي دروب الحياة. أسأل الله العظيم أن يتقبل هذا العمل ويجعله في ميزان حسناتكما، وأن يرزقني بركما ورضاكما ما حييت.
              </p>
            </div>
            <p className="text-[#3A4D1A] dark:text-[#E5E5D8] font-bold text-center">
              اللهم اغفر لوالدي وارحمهما كما ربياني صغيراً.
            </p>
          </div>
          
          <div className="mt-12 pt-8 border-t border-[#E5E5D8] dark:border-[#2C3E18]">
            <a 
              href="https://behance.net/aymenbakkour" 
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 bg-[#FDFBF7] dark:bg-[#121410] border border-[#E5E5D8] dark:border-[#3A4D1A] text-[#3A4D1A] dark:text-[#E5E5D8] px-8 py-4 rounded-xl font-bold hover:bg-[#F0F4E8] dark:hover:bg-[#2C3E18] transition-all shadow-sm group"
            >
              <ExternalLink size={20} className="text-[#556B2F] dark:text-[#A3B881] group-hover:scale-110 transition-transform" />
              معرض الأعمال على Behance
            </a>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
