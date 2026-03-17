import { motion } from 'motion/react';
import { Book, Heart } from 'lucide-react';

const DUAS_DATA = [
  {
    id: 1,
    title: 'دعاء ختم القرآن الكريم',
    dua: 'اللهم ارحمني بالقرآن واجعله لي إماماً ونوراً وهدى ورحمة، اللهم ذكرني منه ما نسيت وعلمني منه ما جهلت وارزقني تلاوته آناء الليل وأطراف النهار واجعله لي حجة يا رب العالمين.',
  },
  {
    id: 2,
    title: 'دعاء قبل التلاوة',
    dua: 'أعوذ بالله السميع العليم من الشيطان الرجيم من همزه ونفخه ونفثه. اللهم افتح علي فتوح العارفين بحكمتك، وانشر علي رحمتك، وذكرني ما نسيت يا ذا الجلال والإكرام.',
  },
  {
    id: 3,
    title: 'دعاء الحفظ والفهم',
    dua: 'اللهم ارزقني فهم النبيين وحفظ المرسلين وإلهام الملائكة المقربين، اللهم اجعل ألسنتنا عامرة بذكرك وقلوبنا بخشيتك وأسرارنا بطاعتك إنك على كل شيء قدير.',
  },
  {
    id: 4,
    title: 'دعاء سجود التلاوة',
    dua: 'سجد وجهي للذي خلقه وشق سمعه وبصره بحوله وقوته، فتبارك الله أحسن الخالقين. اللهم اكتب لي بها عندك أجراً، وضع عني بها وزراً، واجعلها لي عندك ذخراً، وتقبلها مني كما تقبلتها من عبدك داود.',
  },
  {
    id: 5,
    title: 'فضل قراءة القرآن',
    dua: 'قال رسول الله ﷺ: "اقرؤوا القرآن فإنه يأتي يوم القيامة شفيعاً لأصحابه". وقال ﷺ: "من قرأ حرفاً من كتاب الله فله به حسنة، والحسنة بعشر أمثالها، لا أقول الم حرف، ولكن ألف حرف ولام حرف وميم حرف".',
  }
];

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
            <p className="text-[#556B2F] dark:text-[#A3B881] text-sm mt-1">أدعية التلاوة وفضائل القرآن الكريم</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4">
        {DUAS_DATA.map((item, index) => (
          <motion.div
            key={item.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="bg-white dark:bg-[#1A1D17] p-6 rounded-2xl border border-[#E5E5D8] dark:border-[#2C3E18] shadow-sm hover:shadow-md transition-shadow"
          >
            <h3 className="text-xl font-bold text-[#3A4D1A] dark:text-[#E5E5D8] mb-4 flex items-center gap-2">
              <Heart size={20} className="text-[#556B2F] dark:text-[#A3B881]" />
              {item.title}
            </h3>
            <p className="text-gray-700 dark:text-gray-300 leading-loose font-quran text-lg">
              {item.dua}
            </p>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
