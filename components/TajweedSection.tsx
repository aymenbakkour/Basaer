'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronLeft, BookOpenCheck, ChevronDown, ChevronUp } from 'lucide-react';
import { TAJWEED_RULES } from '@/lib/tajweed-data';

export default function TajweedSection({ onBack }: { onBack: () => void }) {
  const [activeRule, setActiveRule] = useState<string>(TAJWEED_RULES[0].id);
  const [expandedSubRule, setExpandedSubRule] = useState<string | null>(null);

  const currentRule = TAJWEED_RULES.find(r => r.id === activeRule);

  return (
    <motion.div
      key="tajweed"
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
            <BookOpenCheck size={24} />
          </div>
          <h2 className="text-3xl font-bold text-[#2C3E18] dark:text-[#E5E5D8] font-quran">أحكام التجويد</h2>
        </div>
      </div>

      <div className="bg-white dark:bg-[#1A1D17] rounded-3xl shadow-sm border border-[#E5E5D8] dark:border-[#2C3E18] overflow-hidden flex flex-col md:flex-row min-h-[600px]">
        {/* Sidebar for Rules */}
        <div className="w-full md:w-1/3 bg-[#FDFBF7] dark:bg-[#121410] border-b md:border-b-0 md:border-l border-[#E5E5D8] dark:border-[#2C3E18] p-4 flex flex-col gap-2 overflow-y-auto max-h-[300px] md:max-h-none">
          {TAJWEED_RULES.map((rule) => (
            <button
              key={rule.id}
              onClick={() => {
                setActiveRule(rule.id);
                setExpandedSubRule(null);
              }}
              className={`text-right p-4 rounded-xl transition-all ${
                activeRule === rule.id
                  ? 'bg-[#556B2F] text-white shadow-md'
                  : 'hover:bg-[#F0F4E8] dark:hover:bg-[#2C3E18] text-[#3A4D1A] dark:text-[#E5E5D8]'
              }`}
            >
              <h3 className="font-bold text-sm md:text-base">{rule.title}</h3>
            </button>
          ))}
        </div>

        {/* Content Area */}
        <div className="w-full md:w-2/3 p-6 md:p-8 overflow-y-auto">
          <AnimatePresence mode="wait">
            {currentRule && (
              <motion.div
                key={currentRule.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                transition={{ duration: 0.2 }}
                className="space-y-6"
              >
                <div>
                  <h3 className="text-2xl font-bold text-[#2C3E18] dark:text-[#E5E5D8] mb-3">{currentRule.title}</h3>
                  <p className="text-gray-600 dark:text-gray-400 leading-relaxed text-lg">{currentRule.description}</p>
                </div>

                {currentRule.subRules && (
                  <div className="space-y-4 mt-8">
                    {currentRule.subRules.map((subRule, index) => {
                      const isExpanded = expandedSubRule === subRule.title;
                      return (
                        <div 
                          key={index}
                          className="border border-[#E5E5D8] dark:border-[#2C3E18] rounded-2xl overflow-hidden bg-[#FDFBF7] dark:bg-[#121410]"
                        >
                          <button
                            onClick={() => setExpandedSubRule(isExpanded ? null : subRule.title)}
                            className="w-full flex items-center justify-between p-5 text-right hover:bg-[#F0F4E8] dark:hover:bg-[#2C3E18] transition-colors"
                          >
                            <span className="font-bold text-lg text-[#3A4D1A] dark:text-[#A3B881]">{subRule.title}</span>
                            {isExpanded ? (
                              <ChevronUp size={20} className="text-[#556B2F] dark:text-[#A3B881]" />
                            ) : (
                              <ChevronDown size={20} className="text-[#556B2F] dark:text-[#A3B881]" />
                            )}
                          </button>
                          
                          <AnimatePresence>
                            {isExpanded && (
                              <motion.div
                                initial={{ height: 0, opacity: 0 }}
                                animate={{ height: 'auto', opacity: 1 }}
                                exit={{ height: 0, opacity: 0 }}
                                className="overflow-hidden"
                              >
                                <div className="p-5 pt-0 space-y-4 border-t border-[#E5E5D8] dark:border-[#2C3E18] mt-2">
                                  <p className="text-gray-700 dark:text-gray-300 leading-relaxed mt-4">
                                    {subRule.explanation}
                                  </p>
                                  
                                  <div className="bg-[#F0F4E8] dark:bg-[#1A1D17] p-4 rounded-xl border border-[#D5E0C5] dark:border-[#3A4D1A]">
                                    <span className="font-bold text-[#2C3E18] dark:text-[#E5E5D8] block mb-2">الحروف:</span>
                                    <span className="text-[#556B2F] dark:text-[#A3B881] font-medium">{subRule.letters}</span>
                                  </div>

                                  <div>
                                    <span className="font-bold text-[#2C3E18] dark:text-[#E5E5D8] block mb-3">أمثلة:</span>
                                    <div className="grid gap-3">
                                      {subRule.examples.map((example, exIndex) => (
                                        <div key={exIndex} className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 bg-white dark:bg-[#2C3E18] p-3 rounded-xl border border-[#E5E5D8] dark:border-[#3A4D1A]">
                                          <span className="font-quran text-xl text-[#3A4D1A] dark:text-[#D4AF37] min-w-[120px]">{example.word}</span>
                                          <span className="text-sm text-gray-600 dark:text-gray-400">{example.explanation}</span>
                                        </div>
                                      ))}
                                    </div>
                                  </div>
                                </div>
                              </motion.div>
                            )}
                          </AnimatePresence>
                        </div>
                      );
                    })}
                  </div>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </motion.div>
  );
}
