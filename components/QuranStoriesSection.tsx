'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronLeft, BookOpen, ArrowLeft, Lightbulb, MapPin } from 'lucide-react';
import { QURAN_STORIES } from '@/lib/quran-stories-data';
import { useRouter } from 'next/navigation';
import { useAppContext } from '@/lib/store';

export default function QuranStoriesSection({ onBack, initialStoryId }: { onBack: () => void, initialStoryId?: string | null }) {
  const [activeStory, setActiveStory] = useState<string>(initialStoryId || QURAN_STORIES[0].id);
  const router = useRouter();
  const { markStoryPondered } = useAppContext();

  const currentStory = QURAN_STORIES.find(s => s.id === activeStory);

  const handleStartPondering = (suraId: number, startAyah: number, endAyah: number) => {
    if (currentStory) {
      markStoryPondered(currentStory.id);
    }
    // Navigate to the sura page, potentially passing start/end ayahs as query params if supported
    router.push(`/sura/${suraId}?start=${startAyah}&end=${endAyah}`);
  };

  return (
    <motion.div
      key="stories"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="max-w-5xl mx-auto"
    >
      <div className="flex items-center gap-4 mb-8">
        <button onClick={onBack} className="p-2 bg-white dark:bg-[#1A1D17] rounded-full shadow-sm hover:bg-gray-50 dark:hover:bg-[#2C3E18] transition-colors">
          <ChevronLeft size={24} className="text-[#556B2F] dark:text-[#A3B881]" />
        </button>
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 bg-[#F0F4E8] dark:bg-[#2C3E18] rounded-2xl flex items-center justify-center text-[#556B2F] dark:text-[#A3B881]">
            <BookOpen size={24} />
          </div>
          <h2 className="text-3xl font-bold text-[#2C3E18] dark:text-[#E5E5D8] font-quran">قصص القرآن</h2>
        </div>
      </div>

      <div className="bg-white dark:bg-[#1A1D17] rounded-3xl shadow-sm border border-[#E5E5D8] dark:border-[#2C3E18] overflow-hidden flex flex-col md:flex-row min-h-[600px]">
        {/* Sidebar for Stories */}
        <div className="w-full md:w-1/3 bg-[#FDFBF7] dark:bg-[#121410] border-b md:border-b-0 md:border-l border-[#E5E5D8] dark:border-[#2C3E18] p-4 flex flex-col gap-2 overflow-y-auto max-h-[300px] md:max-h-[700px]">
          {QURAN_STORIES.map((story) => (
            <button
              key={story.id}
              onClick={() => setActiveStory(story.id)}
              className={`text-right p-4 rounded-xl transition-all ${
                activeStory === story.id
                  ? 'bg-[#556B2F] text-white shadow-md'
                  : 'hover:bg-[#F0F4E8] dark:hover:bg-[#2C3E18] text-[#3A4D1A] dark:text-[#E5E5D8]'
              }`}
            >
              <h3 className="font-bold text-sm md:text-base">{story.title}</h3>
            </button>
          ))}
        </div>

        {/* Content Area */}
        <div className="w-full md:w-2/3 p-6 md:p-8 overflow-y-auto max-h-[700px]">
          <AnimatePresence mode="wait">
            {currentStory && (
              <motion.div
                key={currentStory.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                transition={{ duration: 0.2 }}
                className="space-y-8"
              >
                <div>
                  <h3 className="text-3xl font-bold text-[#2C3E18] dark:text-[#E5E5D8] mb-4 font-quran">{currentStory.title}</h3>
                  <div className="bg-[#F0F4E8] dark:bg-[#2C3E18]/30 p-4 rounded-xl border border-[#D5E0C5] dark:border-[#3A4D1A] mb-6 flex items-center gap-3">
                    <MapPin className="text-[#556B2F] dark:text-[#A3B881]" size={20} />
                    <span className="text-[#3A4D1A] dark:text-[#E5E5D8] font-medium">
                      سورة {currentStory.suraName} (الآيات: {currentStory.startAyah} - {currentStory.endAyah})
                    </span>
                  </div>
                  <p className="text-gray-700 dark:text-gray-300 leading-loose text-lg text-justify">
                    {currentStory.description}
                  </p>
                </div>

                <div>
                  <h4 className="text-xl font-bold text-[#2C3E18] dark:text-[#E5E5D8] mb-4 flex items-center gap-2">
                    <Lightbulb className="text-[#D4AF37]" size={24} />
                    الدروس والعبر المستفادة
                  </h4>
                  <ul className="grid gap-3">
                    {currentStory.lessons.map((lesson, idx) => (
                      <li key={idx} className="flex items-start gap-3 bg-[#FDFBF7] dark:bg-[#121410] p-4 rounded-xl border border-[#E5E5D8] dark:border-[#2C3E18]">
                        <span className="w-6 h-6 rounded-full bg-[#556B2F] text-white flex items-center justify-center text-sm shrink-0 mt-0.5">
                          {idx + 1}
                        </span>
                        <span className="text-gray-700 dark:text-gray-300 leading-relaxed">{lesson}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="pt-6 border-t border-[#E5E5D8] dark:border-[#2C3E18]">
                  <button
                    onClick={() => handleStartPondering(currentStory.suraId, currentStory.startAyah, currentStory.endAyah)}
                    className="w-full sm:w-auto flex items-center justify-center gap-2 bg-[#3A4D1A] dark:bg-[#556B2F] text-white px-8 py-4 rounded-xl font-bold hover:bg-[#2C3E18] dark:hover:bg-[#3A4D1A] transition-colors shadow-md group"
                  >
                    بدء تدبر القصة
                    <ArrowLeft size={20} className="group-hover:-translate-x-1 transition-transform" />
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </motion.div>
  );
}
