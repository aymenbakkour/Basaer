'use client';

import { useAppContext, Note, SuraStatus } from '@/lib/store';
import { SURAS_DATA } from '@/lib/suras-data';
import { getStoryIdForKeyword } from '@/lib/story-mapping';
import { useParams } from 'next/navigation';
import { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import { ArrowRight, Save, Star, CheckCircle2, Edit3, Trash2, MapPin, List, BookOpen, Layers, Users, Book } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { useTimerContext } from '@/components/TimerContext';

export default function SuraClient({ id }: { id: string }) {
  const params = useParams();
  const { state, updateSuraStatus, updateSuraRating, updateNote, deleteNote } = useAppContext();
  
  const suraId = parseInt(id || (params?.id as string) || '0');
  const sura = state.suras ? state.suras[suraId] : undefined;
  const suraInfo = SURAS_DATA.find(s => s.id === suraId);
  const [isAddingNote, setIsAddingNote] = useState(false);
  const [showCelebration, setShowCelebration] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const handleAddNote = () => setIsAddingNote(true);
    window.addEventListener('open-add-note', handleAddNote);
    return () => window.removeEventListener('open-add-note', handleAddNote);
  }, []);

  if (!mounted) return null;

  if (!sura) {
    return <div className="p-8 text-center dark:text-gray-300">جاري التحميل...</div>;
  }

  const notesList = Object.values(sura.notes || {}).sort((a, b) => b.timestamp - a.timestamp);

  return (
    <>
      {sura.status === 'studying' && <StudyingAnimations />}
      <div className="max-w-3xl mx-auto p-4 md:p-8 space-y-6 pb-24 relative z-10">
        <header className={`relative overflow-hidden bg-gradient-to-br from-[#F0F4E8] to-[#E5E5D8] dark:from-[#1A1D17] dark:to-[#121410] rounded-3xl shadow-sm border ${sura.status === 'studying' ? 'border-[#556B2F]/50 dark:border-[#A3B881]/50 shadow-[0_0_30px_rgba(85,107,47,0.15)] dark:shadow-[0_0_30px_rgba(163,184,129,0.1)]' : 'border-[#D5E0C5] dark:border-[#2C3E18]'} mb-6 transition-all duration-1000`}>
          {/* Decorative background elements */}
        <div className="absolute top-0 left-0 w-64 h-64 bg-[#556B2F] opacity-5 dark:opacity-10 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2"></div>
        <div className="absolute bottom-0 right-0 w-64 h-64 bg-[#D4AF37] opacity-5 dark:opacity-10 rounded-full blur-3xl translate-x-1/2 translate-y-1/2"></div>

        <div className="relative p-6 sm:p-8 flex flex-col gap-6">
          {/* Top row: Back button & Status */}
          <div className="flex items-center justify-between">
            <Link href="/" className="flex items-center gap-2 text-[#556B2F] dark:text-[#A3B881] hover:text-[#3A4D1A] dark:hover:text-[#C5D8A4] transition-colors bg-white/50 dark:bg-black/20 px-4 py-2 rounded-full backdrop-blur-sm">
              <ArrowRight size={20} />
              <span className="font-medium text-sm">الرئيسية</span>
            </Link>
            
            <div className="flex items-center gap-3">
              <select 
                value={sura.status}
                onChange={(e) => {
                  const newStatus = e.target.value as SuraStatus;
                  if (newStatus === 'completed' && sura.status !== 'completed') {
                    setShowCelebration(true);
                  }
                  updateSuraStatus(suraId, newStatus);
                }}
                className="bg-white/80 dark:bg-[#1A1D17]/80 backdrop-blur-sm border border-[#D5E0C5] dark:border-[#3A4D1A] text-[#3A4D1A] dark:text-[#E5E5D8] text-sm font-medium rounded-full focus:ring-2 focus:ring-[#556B2F] dark:focus:ring-[#7A9A45] focus:border-transparent block px-4 py-2 transition-all cursor-pointer outline-none"
              >
                <option value="not_started">لم تبدأ</option>
                <option value="studying">قيد الدراسة</option>
                <option value="completed">مكتملة</option>
              </select>
            </div>
          </div>

          {/* Main Title & Info */}
          <div className="flex flex-col items-center text-center mt-2">
            <h1 className="text-4xl sm:text-5xl font-bold text-[#3A4D1A] dark:text-[#E5E5D8] mb-4 font-serif">
              سورة {sura.name}
            </h1>
            
            {suraInfo && (
              <div className="flex flex-wrap justify-center items-center gap-x-4 gap-y-2 text-sm text-[#556B2F] dark:text-[#A3B881] font-medium bg-white/40 dark:bg-black/20 py-2 px-6 rounded-full backdrop-blur-sm">
                <span className="flex items-center gap-1.5"><MapPin size={16} /> {suraInfo.type}</span>
                <span className="w-1 h-1 rounded-full bg-current opacity-50"></span>
                <span className="flex items-center gap-1.5"><List size={16} /> {suraInfo.ayahs} آية</span>
                <span className="w-1 h-1 rounded-full bg-current opacity-50"></span>
                <span className="flex items-center gap-1.5"><BookOpen size={16} /> صفحة {suraInfo.page}</span>
                <span className="w-1 h-1 rounded-full bg-current opacity-50"></span>
                <span className="flex items-center gap-1.5"><Layers size={16} /> جزء {suraInfo.juz}</span>
                {suraInfo.sajdah && (
                  <>
                    <span className="w-1 h-1 rounded-full bg-current opacity-50"></span>
                    <span className="flex items-center gap-1.5 text-[#D4AF37]"><Star size={16} fill="#D4AF37" /> بها سجدة</span>
                  </>
                )}
              </div>
            )}
          </div>

          {/* Description & Tags */}
          {suraInfo && (
            <div className="mt-2 text-center max-w-2xl mx-auto">
              <p className="text-[#3A4D1A]/80 dark:text-[#E5E5D8]/80 leading-relaxed text-sm sm:text-base">
                {suraInfo.description}
              </p>
              
              {(suraInfo.people || suraInfo.stories) && (
                <div className="mt-6 flex flex-col gap-3 items-center justify-center border-t border-[#D5E0C5]/50 dark:border-[#3A4D1A]/50 pt-6">
                  {suraInfo.people && (
                    <div className="flex flex-wrap justify-center items-center gap-2 text-sm">
                      <span className="text-[#556B2F] dark:text-[#A3B881] font-medium flex items-center gap-1.5 bg-white/50 dark:bg-[#1A1D17]/50 px-3 py-1 rounded-full">
                        <Users size={14} /> الأشخاص:
                      </span>
                      {suraInfo.people.map((person, idx) => {
                        const storyId = getStoryIdForKeyword(person);
                        return (
                          <span key={idx} className="text-[#3A4D1A] dark:text-[#E5E5D8] bg-white/30 dark:bg-black/20 px-3 py-1 rounded-full border border-white/20 dark:border-white/5">
                            {storyId ? (
                              <Link href={`/?section=stories&storyId=${storyId}`} className="hover:text-[#556B2F] dark:hover:text-[#A3B881] transition-colors">
                                {person}
                              </Link>
                            ) : person}
                          </span>
                        );
                      })}
                    </div>
                  )}
                  {suraInfo.stories && (
                    <div className="flex flex-wrap justify-center items-center gap-2 text-sm">
                      <span className="text-[#556B2F] dark:text-[#A3B881] font-medium flex items-center gap-1.5 bg-white/50 dark:bg-[#1A1D17]/50 px-3 py-1 rounded-full">
                        <Book size={14} /> القصص:
                      </span>
                      {suraInfo.stories.map((story, idx) => {
                        const storyId = getStoryIdForKeyword(story);
                        return (
                          <span key={idx} className="text-[#3A4D1A] dark:text-[#E5E5D8] bg-white/30 dark:bg-black/20 px-3 py-1 rounded-full border border-white/20 dark:border-white/5">
                            {storyId ? (
                              <Link href={`/?section=stories&storyId=${storyId}`} className="hover:text-[#556B2F] dark:hover:text-[#A3B881] transition-colors">
                                {story}
                              </Link>
                            ) : story}
                          </span>
                        );
                      })}
                    </div>
                  )}
                </div>
              )}
            </div>
          )}
        </div>
      </header>

      {sura.status === 'completed' && (
        <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="bg-[#F0F4E8] dark:bg-[#1A1D17] p-6 rounded-2xl border border-[#D5E0C5] dark:border-[#2C3E18] flex flex-col items-center justify-center space-y-3 transition-colors">
          <h3 className="font-bold text-[#3A4D1A] dark:text-[#E5E5D8]">تقييم مستوى الفهم العام للسورة</h3>
          <div className="flex space-x-2 space-x-reverse">
            {[1, 2, 3, 4, 5].map((star) => (
              <button
                key={star}
                onClick={() => updateSuraRating(suraId, star)}
                className="focus:outline-none transform hover:scale-110 transition-transform"
              >
                <Star 
                  size={32} 
                  fill={star <= sura.understandingRating ? "#EAB308" : "none"} 
                  className={star <= sura.understandingRating ? "text-yellow-500" : "text-gray-400 dark:text-gray-600"} 
                />
              </button>
            ))}
          </div>
        </motion.div>
      )}

      <div className="space-y-4">
        <div className="flex items-center justify-between px-2">
          <h2 className="text-xl font-bold text-[#3A4D1A] dark:text-[#E5E5D8]">الملاحظات والتدوينات</h2>
        </div>

        <AnimatePresence>
          {isAddingNote && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="overflow-hidden"
            >
              <NoteCard 
                suraId={suraId} 
                isNew={true}
                onClose={() => setIsAddingNote(false)}
                updateNote={updateNote}
                deleteNote={deleteNote}
              />
            </motion.div>
          )}
        </AnimatePresence>

        {notesList.length === 0 && !isAddingNote ? (
          <div className="text-center py-12 bg-white dark:bg-[#1A1D17] rounded-2xl border border-dashed border-[#E5E5D8] dark:border-[#2C3E18] transition-colors">
            <p className="text-gray-500 dark:text-gray-400">لا توجد ملاحظات مدونة بعد في هذه السورة.</p>
            <button 
              onClick={() => setIsAddingNote(true)}
              className="mt-4 text-[#556B2F] dark:text-[#A3B881] font-medium hover:underline"
            >
              أضف ملاحظتك الأولى
            </button>
          </div>
        ) : (
          notesList.map((note, index) => (
            <motion.div
              key={note.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <NoteCard 
                suraId={suraId} 
                initialNote={note} 
                updateNote={updateNote}
                deleteNote={deleteNote}
              />
            </motion.div>
          ))
        )}
      </div>

      <AnimatePresence>
        {showCelebration && (
          <IslamicCelebration 
            suraName={sura.name} 
            userName={state.userName}
            onClose={() => setShowCelebration(false)} 
          />
        )}
      </AnimatePresence>
    </div>
    </>
  );
}

function IslamicCelebration({ suraName, userName, onClose }: { suraName: string, userName?: string, onClose: () => void }) {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, 8000);
    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 backdrop-blur-md overflow-hidden"
      onClick={onClose}
    >
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
        className="absolute w-[200vw] h-[200vw] max-w-[1500px] max-h-[1500px] opacity-20"
        style={{
          background: 'repeating-conic-gradient(from 0deg, transparent 0deg 10deg, #D4AF37 10deg 20deg)'
        }}
      />

      {[...Array(30)].map((_, i) => {
        const size = ((i * 17) % 30) + 10;
        const left = (i * 23) % 100;
        const top = (i * 31) % 100;
        const delay = (i * 7) % 2;
        const duration = 3 + ((i * 11) % 3);
        
        return (
          <motion.div
            key={i}
            initial={{ opacity: 0, scale: 0, y: 0 }}
            animate={{ 
              opacity: [0, 0.8, 0], 
              scale: [0.5, 1.2, 0.5],
              y: -150,
              rotate: 180
            }}
            transition={{ duration, repeat: Infinity, delay, ease: "easeInOut" }}
            className="absolute text-[#D4AF37]"
            style={{ left: `${left}%`, top: `${top}%` }}
          >
            <div className="relative" style={{ width: size, height: size }}>
              <div className="absolute inset-0 border border-[#D4AF37] rotate-45" />
              <div className="absolute inset-0 border border-[#D4AF37]" />
            </div>
          </motion.div>
        );
      })}

      <motion.div
        initial={{ scale: 0.5, opacity: 0, y: 50 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        transition={{ type: "spring", bounce: 0.5, duration: 0.8 }}
        className="relative z-10 flex flex-col items-center text-center p-10 bg-gradient-to-b from-[#1A1D17] to-[#2C3E18] border-2 border-[#D4AF37] rounded-3xl shadow-[0_0_60px_rgba(212,175,55,0.4)] max-w-sm w-full mx-4"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="w-28 h-28 mb-8 relative flex items-center justify-center">
          <motion.div 
            animate={{ rotate: 360 }} 
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            className="absolute inset-0"
          >
            <div className="absolute inset-0 border-4 border-[#D4AF37] rounded-lg rotate-45" />
            <div className="absolute inset-0 border-4 border-[#D4AF37] rounded-lg" />
          </motion.div>
          <CheckCircle2 size={56} className="text-[#D4AF37] relative z-10 bg-[#1A1D17] rounded-full" />
        </div>
        
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="text-4xl font-bold text-[#D4AF37] mb-4 font-serif"
        >
          {userName ? `ما شاء الله يا ${userName}!` : 'ما شاء الله!'}
        </motion.h2>
        
        <motion.p 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="text-xl text-[#E5E5D8] mb-2"
        >
          لقد أتممت دراسة
        </motion.p>
        
        <motion.p 
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.7, type: "spring" }}
          className="text-4xl font-bold text-white mb-8"
        >
          سورة {suraName}
        </motion.p>
        
        <motion.p 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.9 }}
          className="text-[#A3B881] text-sm"
        >
          نسأل الله أن ينفعك بما علمت ويزيدك علماً
        </motion.p>

        <motion.button
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
          onClick={onClose}
          className="mt-8 px-8 py-3 bg-[#D4AF37] text-[#1A1D17] font-bold rounded-full hover:bg-[#F3E5AB] transition-colors shadow-lg"
        >
          متابعة
        </motion.button>
      </motion.div>
    </motion.div>
  );
}

function NoteCard({ suraId, initialNote, isNew = false, onClose, updateNote, deleteNote }: { 
  suraId: number, 
  initialNote?: Note,
  isNew?: boolean,
  onClose?: () => void,
  updateNote: (suraId: number, noteId: string, title: string, text: string) => void,
  deleteNote: (suraId: number, noteId: string) => void
}) {
  const [title, setTitle] = useState(initialNote?.title || '');
  const [text, setText] = useState(initialNote?.text || '');
  const [isEditing, setIsEditing] = useState(isNew);
  const { setHasUnsavedNote } = useTimerContext();

  useEffect(() => {
    if (!isNew) {
      setTitle(initialNote?.title || '');
      setText(initialNote?.text || '');
    }
  }, [initialNote, isNew]);

  useEffect(() => {
    setHasUnsavedNote(isEditing);
    return () => setHasUnsavedNote(false);
  }, [isEditing, setHasUnsavedNote]);

  const handleSave = useCallback(() => {
    if (title.trim() === '' && text.trim() === '') {
      if (isNew && onClose) onClose();
      return;
    }
    
    const noteId = initialNote?.id || Date.now().toString();
    updateNote(suraId, noteId, title, text);
    
    if (isNew && onClose) {
      onClose();
    } else {
      setIsEditing(false);
    }
  }, [title, text, isNew, onClose, initialNote, suraId, updateNote]);

  useEffect(() => {
    const handleGlobalSave = () => {
      if (isEditing) {
        handleSave();
      }
    };
    const handleGlobalDiscard = () => {
      if (isEditing) {
        if (isNew && onClose) {
          onClose();
        } else {
          setTitle(initialNote?.title || '');
          setText(initialNote?.text || '');
          setIsEditing(false);
        }
      }
    };
    window.addEventListener('save-note', handleGlobalSave);
    window.addEventListener('discard-note', handleGlobalDiscard);
    return () => {
      window.removeEventListener('save-note', handleGlobalSave);
      window.removeEventListener('discard-note', handleGlobalDiscard);
    };
  }, [isEditing, title, text, initialNote, isNew, onClose, handleSave]);

  const handleDelete = () => {
    if (initialNote?.id) {
      deleteNote(suraId, initialNote.id);
    }
    if (isNew && onClose) onClose();
  };

  if (!isEditing) {
    return (
      <motion.div layout className="bg-white dark:bg-[#1A1D17] p-5 rounded-xl shadow-sm border border-[#E5E5D8] dark:border-[#2C3E18] hover:border-[#556B2F] dark:hover:border-[#7A9A45] transition-colors cursor-pointer" onClick={() => setIsEditing(true)}>
        <div className="flex justify-between items-start mb-3">
          <div className="flex flex-col gap-2">
            <h3 className="font-bold text-lg text-[#3A4D1A] dark:text-[#E5E5D8]">{title || 'ملاحظة بدون عنوان'}</h3>
          </div>
          <button className="text-gray-400 hover:text-[#556B2F] dark:hover:text-[#A3B881] transition-colors p-1">
            <Edit3 size={18} />
          </button>
        </div>
        {text && <p className="text-[#2C3E18] dark:text-gray-300 whitespace-pre-wrap mt-2 text-sm leading-relaxed">{text}</p>}
      </motion.div>
    );
  }

  return (
    <motion.div layout className="bg-white dark:bg-[#1A1D17] p-5 rounded-xl shadow-md border-2 border-[#556B2F] dark:border-[#7A9A45] transition-colors mb-4">
      <div className="flex items-center space-x-2 space-x-reverse mb-4">
        <span className="font-bold text-[#3A4D1A] dark:text-[#E5E5D8] text-lg">
          {isNew ? 'إضافة ملاحظة جديدة' : 'تعديل الملاحظة'}
        </span>
      </div>
      
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="عنوان الملاحظة (مثال: تأملات في الآية 5)"
        className="w-full p-3 mb-3 bg-[#FDFBF7] dark:bg-[#121410] border border-[#E5E5D8] dark:border-[#2C3E18] text-[#2C3E18] dark:text-[#E5E5D8] rounded-lg focus:ring-2 focus:ring-[#556B2F] dark:focus:ring-[#7A9A45] focus:border-transparent outline-none font-bold transition-colors"
        dir="rtl"
      />

      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="اكتب تأملاتك وملاحظاتك هنا..."
        className="w-full p-3 bg-[#FDFBF7] dark:bg-[#121410] border border-[#E5E5D8] dark:border-[#2C3E18] text-[#2C3E18] dark:text-[#E5E5D8] rounded-lg focus:ring-2 focus:ring-[#556B2F] dark:focus:ring-[#7A9A45] focus:border-transparent resize-none min-h-[120px] text-sm transition-colors mb-3"
        dir="rtl"
      />
      
      <div className="flex flex-col sm:flex-row sm:items-center justify-end mt-4 gap-4">
        <div className="flex items-center gap-2">
          {!isNew && (
            <button onClick={handleDelete} className="p-2 text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors" title="حذف الملاحظة">
              <Trash2 size={20} />
            </button>
          )}
          <button onClick={() => {
            if (isNew && onClose) {
              onClose();
            } else {
              setTitle(initialNote?.title || '');
              setText(initialNote?.text || '');
              setIsEditing(false);
            }
          }} className="px-4 py-2 text-sm text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-[#2C3E18] rounded-lg transition-colors">
            إلغاء
          </button>
          <button onClick={handleSave} className="flex items-center px-4 py-2 bg-[#556B2F] dark:bg-[#7A9A45] text-white text-sm rounded-lg hover:bg-[#3A4D1A] dark:hover:bg-[#556B2F] transition-colors">
            <Save size={16} className="ml-2" />
            حفظ
          </button>
        </div>
      </div>
    </motion.div>
  );
}

function StudyingAnimations() {
  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      <motion.div
        animate={{ opacity: [0.1, 0.25, 0.1], scale: [1, 1.05, 1] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-0 left-1/4 w-[50vw] h-[50vw] bg-[#556B2F]/20 dark:bg-[#A3B881]/10 rounded-full blur-[100px]"
      />
      <motion.div
        animate={{ opacity: [0.1, 0.2, 0.1], scale: [1, 1.1, 1] }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 2 }}
        className="absolute bottom-0 right-1/4 w-[60vw] h-[60vw] bg-[#D4AF37]/10 dark:bg-[#D4AF37]/5 rounded-full blur-[120px]"
      />

      {[...Array(15)].map((_, i) => {
        const size = ((i * 7) % 4) + 3;
        const left = (i * 13) % 100;
        const delay = (i * 3) % 5;
        const duration = ((i * 5) % 10) + 15;
        const xOffset = ((i * 11) % 10) - 5;
        
        return (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: "100vh", x: `${left}vw` }}
            animate={{ 
              opacity: [0, 0.5, 0], 
              y: "-10vh",
              x: `${left + xOffset}vw`
            }}
            transition={{ duration, repeat: Infinity, delay, ease: "linear" }}
            className="absolute rounded-full bg-[#556B2F]/40 dark:bg-[#A3B881]/40 blur-[1px]"
            style={{ width: size, height: size }}
          />
        );
      })}
    </div>
  );
}
