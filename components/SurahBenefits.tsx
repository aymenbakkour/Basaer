import { motion } from 'motion/react';
import { Heart, BookOpen } from 'lucide-react';

const BENEFITS_DATA = [
  {
    id: 1,
    sura: 'سورة الفاتحة',
    benefits: [
      'أعظم سورة في القرآن الكريم.',
      'ركن من أركان الصلاة لا تصح إلا بها.',
      'رقية شافية من الأمراض والسموم.',
      'تتضمن مناجاة بين العبد وربه.'
    ]
  },
  {
    id: 2,
    sura: 'سورة البقرة',
    benefits: [
      'أخذها بركة وتركها حسرة ولا تستطيعها البطلة (السحرة).',
      'تطرد الشياطين من البيت الذي تقرأ فيه.',
      'فيها أعظم آية في القرآن (آية الكرسي).',
      'خواتيمها تكفي من قرأها في ليلته.'
    ]
  },
  {
    id: 3,
    sura: 'سورة الكهف',
    benefits: [
      'نور بين الجمعتين لمن قرأها يوم الجمعة.',
      'عصمة من فتنة المسيح الدجال (حفظ أول عشر آيات).',
      'تتضمن أربع قصص عظيمة فيها فتن الدنيا وكيفية النجاة منها.'
    ]
  },
  {
    id: 4,
    sura: 'سورة الملك',
    benefits: [
      'المانعة والمنجية من عذاب القبر.',
      'تشفع لصاحبها حتى يُغفر له.',
      'يُستحب قراءتها كل ليلة قبل النوم.'
    ]
  },
  {
    id: 5,
    sura: 'سورة الإخلاص',
    benefits: [
      'تعدل ثلث القرآن الكريم.',
      'حبها يوجب دخول الجنة.',
      'حصن وملاذ من كل سوء مع المعوذتين.'
    ]
  }
];

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
            <p className="text-[#556B2F] dark:text-[#A3B881] text-sm mt-1">فضائل وخصائص سور القرآن الكريم</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {BENEFITS_DATA.map((item, index) => (
          <motion.div
            key={item.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
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
