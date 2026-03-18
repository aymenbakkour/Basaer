'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { BookOpen, Clock, Edit3, CheckCircle, ArrowLeft, ArrowRight } from 'lucide-react';

interface OnboardingTourProps {
  isOpen: boolean;
  onComplete: () => void;
  userName: string;
}

export default function OnboardingTour({ isOpen, onComplete, userName }: OnboardingTourProps) {
  const [step, setStep] = useState(0);

  const steps = [
    {
      title: `أهلاً بك يا ${userName} في بصائر`,
      description: 'تطبيق بصائر هو رفيقك المساعد لتدبر القرآن الكريم بشكل موازٍ لسماع أو قراءة تفسير القرآن.',
      icon: <BookOpen size={48} className="text-[#556B2F] dark:text-[#A3B881]" />
    },
    {
      title: 'كيف تستفيد من التطبيق؟',
      description: 'يمكنك تدوين ملاحظاتك، وتتبع تقدمك في فهم السور، واستكشاف قصص القرآن وإعجازه، كل ذلك في مكان واحد منظم.',
      icon: <Edit3 size={48} className="text-[#556B2F] dark:text-[#A3B881]" />
    },
    {
      title: 'مؤقت الدراسة',
      description: 'استخدم مؤقت الدراسة الجديد لتتبع وقتك أثناء التدبر والقراءة، مما يساعدك على التركيز والإنجاز.',
      icon: <Clock size={48} className="text-[#556B2F] dark:text-[#A3B881]" />
    },
    {
      title: 'دعاء لك بالتوفيق',
      description: `نسأل الله العظيم أن يوفقك يا ${userName}، وأن يفتح عليك فتوح العارفين، وأن يعينك على إتمام دراستك وتدبرك لكتابه الكريم، وأن يجعله حجة لك لا عليك.`,
      icon: <CheckCircle size={48} className="text-[#556B2F] dark:text-[#A3B881]" />
    }
  ];

  const nextStep = () => {
    if (step < steps.length - 1) {
      setStep(step + 1);
    } else {
      onComplete();
    }
  };

  const prevStep = () => {
    if (step > 0) {
      setStep(step - 1);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="bg-white dark:bg-[#1A1D17] rounded-3xl shadow-2xl w-full max-w-lg overflow-hidden border border-[#E5E5D8] dark:border-[#2C3E18]"
          >
            <div className="p-8 text-center relative overflow-hidden min-h-[400px] flex flex-col">
              <div className="absolute top-0 right-0 w-40 h-40 bg-[#F0F4E8] dark:bg-[#2C3E18] rounded-full -mr-16 -mt-16 opacity-50 dark:opacity-20"></div>
              <div className="absolute bottom-0 left-0 w-32 h-32 bg-[#F0F4E8] dark:bg-[#2C3E18] rounded-full -ml-12 -mb-12 opacity-50 dark:opacity-20"></div>
              
              <div className="relative z-10 flex-grow flex flex-col items-center justify-center">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={step}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.3 }}
                    className="flex flex-col items-center"
                  >
                    <div className="w-24 h-24 bg-[#F0F4E8] dark:bg-[#2C3E18] rounded-full flex items-center justify-center mb-6">
                      {steps[step].icon}
                    </div>
                    
                    <h2 className="text-2xl font-bold text-[#3A4D1A] dark:text-[#E5E5D8] mb-4">
                      {steps[step].title}
                    </h2>
                    <p className="text-lg text-[#556B2F] dark:text-[#A3B881] leading-relaxed">
                      {steps[step].description}
                    </p>
                  </motion.div>
                </AnimatePresence>
              </div>

              <div className="relative z-10 mt-8 flex items-center justify-between">
                <div className="flex gap-2">
                  {steps.map((_, idx) => (
                    <div
                      key={idx}
                      className={`h-2 rounded-full transition-all duration-300 ${
                        idx === step 
                          ? 'w-8 bg-[#556B2F] dark:bg-[#A3B881]' 
                          : 'w-2 bg-[#E5E5D8] dark:bg-[#2C3E18]'
                      }`}
                    />
                  ))}
                </div>

                <div className="flex gap-3">
                  {step > 0 && (
                    <button
                      onClick={prevStep}
                      className="p-3 rounded-xl border border-[#E5E5D8] dark:border-[#2C3E18] text-[#556B2F] dark:text-[#A3B881] hover:bg-[#F0F4E8] dark:hover:bg-[#2C3E18] transition-colors"
                    >
                      <ArrowRight size={20} />
                    </button>
                  )}
                  <button
                    onClick={nextStep}
                    className="px-6 py-3 rounded-xl bg-[#556B2F] hover:bg-[#3A4D1A] dark:bg-[#7A9A45] dark:hover:bg-[#556B2F] text-white font-bold flex items-center gap-2 transition-colors"
                  >
                    <span>{step === steps.length - 1 ? 'ابدأ الآن' : 'التالي'}</span>
                    {step < steps.length - 1 && <ArrowLeft size={20} />}
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
