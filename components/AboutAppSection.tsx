'use client';

import { motion } from 'motion/react';
import { ChevronLeft, Info, BookOpen, BarChart2, Tag, Sparkles, Book, Heart, Award, Map, BookOpenCheck } from 'lucide-react';

export default function AboutAppSection({ onBack }: { onBack: () => void }) {
  const sections = [
    { icon: Map, title: 'خطة الدراسة', desc: 'تنظيم مسار ختم القرآن الكريم وتدبره بخطط متعددة تناسب وقتك.' },
    { icon: BarChart2, title: 'الإحصائيات', desc: 'متابعة دقيقة لتقدمك وإنجازاتك في التلاوة والتدبر.' },
    { icon: Tag, title: 'التصنيفات', desc: 'تبويب السور حسب موضوعاتها ومقاصدها لتسهيل الوصول والربط.' },
    { icon: Sparkles, title: 'الإعجاز القرآني', desc: 'تأملات في وجوه الإعجاز العلمي واللغوي والبياني في القرآن.' },
    { icon: BookOpenCheck, title: 'أحكام التجويد', desc: 'شرح مبسط وشامل لقواعد التجويد مع الأمثلة التطبيقية.' },
    { icon: Heart, title: 'فوائد السور', desc: 'استخلاص العبر والدروس والفوائد الروحية من كل سورة.' },
    { icon: Book, title: 'أدعية قرآنية', desc: 'موسوعة للأدعية الواردة في القرآن الكريم مرتبة ومنسقة.' },
    { icon: Award, title: 'الإنجازات', desc: 'نظام تحفيزي بالشارات لضمان الاستمرارية والمداومة.' },
  ];

  return (
    <motion.div
      key="about-app"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="max-w-4xl mx-auto"
    >
      <div className="flex items-center gap-4 mb-8">
        <button onClick={onBack} className="p-2 bg-white dark:bg-[#1A1D17] rounded-full shadow-sm hover:bg-gray-50 dark:hover:bg-[#2C3E18] transition-colors">
          <ChevronLeft size={24} className="text-[#556B2F] dark:text-[#A3B881]" />
        </button>
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 bg-[#F0F4E8] dark:bg-[#2C3E18] rounded-2xl flex items-center justify-center text-[#556B2F] dark:text-[#A3B881]">
            <Info size={24} />
          </div>
          <h2 className="text-3xl font-bold text-[#2C3E18] dark:text-[#E5E5D8] font-quran">عن التطبيق</h2>
        </div>
      </div>

      <div className="bg-white dark:bg-[#1A1D17] rounded-3xl p-8 shadow-sm border border-[#E5E5D8] dark:border-[#2C3E18] mb-8 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-64 h-64 bg-[#F0F4E8] dark:bg-[#2C3E18] rounded-full -ml-32 -mt-32 opacity-50 dark:opacity-20"></div>
        
        <div className="relative z-10 text-center mb-12">
          <div className="w-24 h-24 bg-[#F0F4E8] dark:bg-[#2C3E18] rounded-3xl flex items-center justify-center mx-auto mb-6 shadow-sm border border-[#E5E5D8] dark:border-[#3A4D1A] transform rotate-3">
            <BookOpen size={48} className="text-[#556B2F] dark:text-[#A3B881] -rotate-3" />
          </div>
          <h3 className="text-3xl font-bold text-[#3A4D1A] dark:text-[#E5E5D8] mb-4 font-quran">تطبيق بصائر</h3>
          <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto leading-relaxed text-lg">
            &quot;بصائر&quot; هو رفيقك الرقمي في رحلة تدبر القرآن الكريم. صُمم التطبيق ليكون أكثر من مجرد مصحف للقراءة، بل بيئة متكاملة تعينك على الفهم، والتدبر، والعمل بآيات الله. نهدف إلى تيسير الوصول لكنوز القرآن وربطها بواقع المسلم اليومي.
          </p>
        </div>

        <div className="space-y-6">
          <h4 className="text-2xl font-bold text-[#2C3E18] dark:text-[#E5E5D8] mb-6 text-center font-quran">أقسام التطبيق ومميزاته</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {sections.map((section, index) => (
              <motion.div 
                key={index}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-[#FDFBF7] dark:bg-[#121410] p-5 rounded-2xl border border-[#E5E5D8] dark:border-[#2C3E18] flex items-start gap-4 hover:border-[#556B2F] dark:hover:border-[#7A9A45] transition-colors group"
              >
                <div className="w-12 h-12 bg-white dark:bg-[#1A1D17] rounded-xl flex items-center justify-center shrink-0 border border-[#E5E5D8] dark:border-[#3A4D1A] group-hover:bg-[#556B2F] dark:group-hover:bg-[#7A9A45] transition-colors">
                  <section.icon size={24} className="text-[#556B2F] dark:text-[#A3B881] group-hover:text-white transition-colors" />
                </div>
                <div>
                  <h5 className="font-bold text-[#3A4D1A] dark:text-[#E5E5D8] mb-1 text-lg">{section.title}</h5>
                  <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">{section.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
}
