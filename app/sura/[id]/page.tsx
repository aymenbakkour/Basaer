'use client';

import { useAppContext, AyahStatus, Note } from '@/lib/store';
import { SURAS_DATA } from '@/lib/suras-data';
import { getStoryIdForKeyword } from '@/lib/story-mapping';
import { useParams, useRouter } from 'next/navigation';
import { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import { ArrowRight, Save, Star, CheckCircle2, AlertCircle, HelpCircle, Edit3, Plus, Trash2, Info, MapPin, List, BookOpen, Layers, Users, Book, FileText, Tag } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { NOTE_CATEGORIES, getCategoryById } from '@/lib/categories';
import StudyTimer from '@/components/StudyTimer';
import { useTimerContext } from '@/components/TimerContext';

export default function SuraPage() {
  const params = useParams();
  const router = useRouter();
  const { state, updateSuraStatus, updateSuraRating, updateNote, deleteNote } = useAppContext();
  
  const suraId = parseInt(params.id as string);
  const sura = state.suras ? state.suras[suraId] : undefined;
  const suraInfo = SURAS_DATA.find(s => s.id === suraId);
  const [isAddingNote, setIsAddingNote] = useState(false);
  const [showCelebration, setShowCelebration] = useState(false);

  useEffect(() => {
    const handleAddNote = () => setIsAddingNote(true);
    window.addEventListener('open-add-note', handleAddNote);
    return () => window.removeEventListener('open-add-note', handleAddNote);
  }, []);

  if (!sura) {
    return <div className="p-8 text-center dark:text-gray-300">جاري التحميل...</div>;
  }

  const notesList = Object.values(sura.notes || {}).sort((a, b) => b.timestamp - a.timestamp);

  return (
    <div className="max-w-3xl mx-auto p-4 md:p-8 space-y-6 pb-24">
      <StudyTimer compact />
      <header className="flex flex-col sm:flex-row sm:items-center justify-between bg-white dark:bg-[#1A1D17] p-4 pr-20 rounded-2xl shadow-sm border border-[#E5E5D8] dark:border-[#2C3E18] sticky top-4 z-10 gap-4 transition-colors">
        <div className="flex items-center space-x-4 space-x-reverse">
          <Link href="/" className="p-2 hover:bg-[#F0F4E8] dark:hover:bg-[#2C3E18] rounded-full text-[#556B2F] dark:text-[#A3B881] transition-colors">
            <ArrowRight size={24} />
          </Link>
          <div>
            <h1 className="text-2xl font-bold text-[#3A4D1A] dark:text-[#E5E5D8]">سورة {sura.name}</h1>
            <p className="text-sm text-gray-500 dark:text-gray-400">{sura.totalAyahs} آية</p>
          </div>
        </div>
        
        <div className="flex items-center space-x-4 space-x-reverse">
          <select 
            value={sura.status}
            onChange={(e) => {
              const newStatus = e.target.value as any;
              if (newStatus === 'completed' && sura.status !== 'completed') {
                setShowCelebration(true);
              }
              updateSuraStatus(suraId, newStatus);
            }}
            className="bg-[#FDFBF7] dark:bg-[#121410] border border-[#E5E5D8] dark:border-[#2C3E18] text-[#2C3E18] dark:text-[#E5E5D8] text-sm rounded-lg focus:ring-[#556B2F] dark:focus:ring-[#7A9A45] focus:border-[#556B2F] dark:focus:border-[#7A9A45] block p-2.5 transition-colors"
          >
            <option value="not_started">لم تبدأ</option>
            <option value="studying">قيد الدراسة</option>
            <option value="completed">مكتملة</option>
          </select>
        </div>
      </header>

      {suraInfo && (
        <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="bg-[#FDFBF7] dark:bg-[#121410] p-5 rounded-2xl border border-[#E5E5D8] dark:border-[#2C3E18] flex flex-col gap-3 transition-colors">
          <div className="flex items-center gap-2 text-[#556B2F] dark:text-[#A3B881]">
            <Info size={20} />
            <h3 className="font-bold text-lg">بطاقة السورة</h3>
          </div>
          <div className="flex flex-wrap items-center gap-x-6 gap-y-3 text-sm text-gray-600 dark:text-gray-400 font-medium">
            <span className="flex items-center gap-1.5"><MapPin size={16} /> {suraInfo.type}</span>
            <span className="flex items-center gap-1.5"><List size={16} /> {suraInfo.ayahs} آية</span>
            <span className="flex items-center gap-1.5"><BookOpen size={16} /> صفحة {suraInfo.page}</span>
            <span className="flex items-center gap-1.5"><Layers size={16} /> جزء {suraInfo.juz}</span>
            {suraInfo.words && <span className="flex items-center gap-1.5"><FileText size={16} /> {suraInfo.words} كلمة</span>}
            {suraInfo.sajdah && <span className="flex items-center gap-1.5 text-[#D4AF37]"><Star size={16} fill="#D4AF37" /> بها سجدة</span>}
          </div>
          <p className="text-[#3A4D1A] dark:text-[#E5E5D8] leading-relaxed text-sm mt-1">
            {suraInfo.description}
          </p>
          {(suraInfo.people || suraInfo.stories) && (
            <div className="mt-2 pt-3 border-t border-[#E5E5D8] dark:border-[#2C3E18] flex flex-col gap-2">
              {suraInfo.people && (
                <div className="flex items-start gap-2 text-sm">
                  <Users size={16} className="text-[#556B2F] dark:text-[#A3B881] mt-0.5 shrink-0" />
                  <span className="text-gray-600 dark:text-gray-400 font-medium">الأشخاص:</span>
                  <div className="flex flex-wrap gap-1">
                    {suraInfo.people.map((person, idx) => {
                      const storyId = getStoryIdForKeyword(person);
                      return (
                        <span key={idx} className="text-[#3A4D1A] dark:text-[#E5E5D8]">
                          {storyId ? (
                            <Link href={`/?section=stories&storyId=${storyId}`} className="hover:text-[#556B2F] dark:hover:text-[#A3B881] hover:underline transition-colors">
                              {person}
                            </Link>
                          ) : (
                            person
                          )}
                          {idx < suraInfo.people!.length - 1 && '، '}
                        </span>
                      );
                    })}
                  </div>
                </div>
              )}
              {suraInfo.stories && (
                <div className="flex items-start gap-2 text-sm">
                  <Book size={16} className="text-[#556B2F] dark:text-[#A3B881] mt-0.5 shrink-0" />
                  <span className="text-gray-600 dark:text-gray-400 font-medium">القصص:</span>
                  <div className="flex flex-wrap gap-1">
                    {suraInfo.stories.map((story, idx) => {
                      const storyId = getStoryIdForKeyword(story);
                      return (
                        <span key={idx} className="text-[#3A4D1A] dark:text-[#E5E5D8]">
                          {storyId ? (
                            <Link href={`/?section=stories&storyId=${storyId}`} className="hover:text-[#556B2F] dark:hover:text-[#A3B881] hover:underline transition-colors">
                              {story}
                            </Link>
                          ) : (
                            story
                          )}
                          {idx < suraInfo.stories!.length - 1 && '، '}
                        </span>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>
          )}
        </motion.div>
      )}

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
  );
}

function IslamicCelebration({ suraName, userName, onClose }: { suraName: string, userName?: string, onClose: () => void }) {
  // Auto close after 8 seconds
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
      {/* Radiating light rays */}
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
        className="absolute w-[200vw] h-[200vw] max-w-[1500px] max-h-[1500px] opacity-20"
        style={{
          background: 'repeating-conic-gradient(from 0deg, transparent 0deg 10deg, #D4AF37 10deg 20deg)'
        }}
      />

      {/* Floating geometric stars */}
      {[...Array(30)].map((_, i) => {
        // Use pseudo-random values based on index to avoid hydration mismatch and impure function warnings
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

      {/* Center Card */}
      <motion.div
        initial={{ scale: 0.5, opacity: 0, y: 50 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        transition={{ type: "spring", bounce: 0.5, duration: 0.8 }}
        className="relative z-10 flex flex-col items-center text-center p-10 bg-gradient-to-b from-[#1A1D17] to-[#2C3E18] border-2 border-[#D4AF37] rounded-3xl shadow-[0_0_60px_rgba(212,175,55,0.4)] max-w-sm w-full mx-4"
        onClick={(e) => e.stopPropagation()}
      >
        {/* 8-pointed star icon */}
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
  updateNote: (suraId: number, noteId: string, title: string, text: string, status: AyahStatus, category?: string) => void,
  deleteNote: (suraId: number, noteId: string) => void
}) {
  const [title, setTitle] = useState(initialNote?.title || '');
  const [text, setText] = useState(initialNote?.text || '');
  const [status, setStatus] = useState<AyahStatus>(initialNote?.status || 'none');
  const [category, setCategory] = useState<string>(initialNote?.category || 'general');
  const [isEditing, setIsEditing] = useState(isNew);
  const { setHasUnsavedNote } = useTimerContext();

  useEffect(() => {
    if (!isNew) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setTitle(initialNote?.title || '');
      setText(initialNote?.text || '');
      setStatus(initialNote?.status || 'none');
      setCategory(initialNote?.category || 'general');
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
    updateNote(suraId, noteId, title, text, status, category);
    
    if (isNew && onClose) {
      onClose();
    } else {
      setIsEditing(false);
    }
  }, [title, text, isNew, onClose, initialNote, suraId, status, category, updateNote]);

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
          setStatus(initialNote?.status || 'none');
          setCategory(initialNote?.category || 'general');
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
  }, [isEditing, title, text, status, category, initialNote, isNew, onClose, handleSave]);

  const handleDelete = () => {
    if (initialNote?.id) {
      deleteNote(suraId, initialNote.id);
    }
    if (isNew && onClose) onClose();
  };

  if (!isEditing) {
    const cat = getCategoryById(initialNote?.category);
    return (
      <motion.div layout className="bg-white dark:bg-[#1A1D17] p-5 rounded-xl shadow-sm border border-[#E5E5D8] dark:border-[#2C3E18] hover:border-[#556B2F] dark:hover:border-[#7A9A45] transition-colors cursor-pointer" onClick={() => setIsEditing(true)}>
        <div className="flex justify-between items-start mb-3">
          <div className="flex flex-col gap-2">
            <h3 className="font-bold text-lg text-[#3A4D1A] dark:text-[#E5E5D8]">{title || 'ملاحظة بدون عنوان'}</h3>
            <div className="flex flex-wrap items-center gap-2">
              <StatusBadge status={status} />
              <span className={`text-xs px-2 py-1 rounded-full font-medium ${cat.color}`}>
                {cat.name}
              </span>
            </div>
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
      
      <div className="mb-3">
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="w-full p-3 bg-[#FDFBF7] dark:bg-[#121410] border border-[#E5E5D8] dark:border-[#2C3E18] text-[#2C3E18] dark:text-[#E5E5D8] rounded-lg focus:ring-2 focus:ring-[#556B2F] dark:focus:ring-[#7A9A45] focus:border-transparent outline-none transition-colors"
          dir="rtl"
        >
          {NOTE_CATEGORIES.map(cat => (
            <option key={cat.id} value={cat.id}>{cat.name}</option>
          ))}
        </select>
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
      
      <div className="flex flex-col sm:flex-row sm:items-center justify-between mt-4 gap-4">
        <div className="flex flex-wrap gap-2">
          <StatusButton current={status} value="understood" icon={<CheckCircle2 size={16}/>} label="مفهوم" onClick={() => setStatus('understood')} color="bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 border-green-200 dark:border-green-800 hover:bg-green-200 dark:hover:bg-green-800/50" activeColor="bg-green-500 text-white border-green-600" />
          <StatusButton current={status} value="needs_review" icon={<AlertCircle size={16}/>} label="يحتاج مراجعة" onClick={() => setStatus('needs_review')} color="bg-yellow-100 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-400 border-yellow-200 dark:border-yellow-800 hover:bg-yellow-200 dark:hover:bg-yellow-800/50" activeColor="bg-yellow-500 text-white border-yellow-600" />
          <StatusButton current={status} value="not_understood" icon={<HelpCircle size={16}/>} label="غير مفهوم" onClick={() => setStatus('not_understood')} color="bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400 border-red-200 dark:border-red-800 hover:bg-red-200 dark:hover:bg-red-800/50" activeColor="bg-red-500 text-white border-red-600" />
        </div>
        
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
              setStatus(initialNote?.status || 'none');
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

function StatusButton({ current, value, icon, label, onClick, color, activeColor }: any) {
  const isActive = current === value;
  return (
    <button
      onClick={onClick}
      className={`flex items-center px-3 py-1.5 rounded-full text-xs font-medium border transition-colors ${isActive ? activeColor : color}`}
    >
      <span className="ml-1">{icon}</span>
      {label}
    </button>
  );
}

function StatusBadge({ status }: { status: AyahStatus }) {
  switch (status) {
    case 'understood':
      return <span className="flex items-center text-xs px-2 py-1 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 rounded-full"><CheckCircle2 size={12} className="ml-1"/> مفهوم 🟢</span>;
    case 'needs_review':
      return <span className="flex items-center text-xs px-2 py-1 bg-yellow-100 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-400 rounded-full"><AlertCircle size={12} className="ml-1"/> يحتاج مراجعة 🟡</span>;
    case 'not_understood':
      return <span className="flex items-center text-xs px-2 py-1 bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400 rounded-full"><HelpCircle size={12} className="ml-1"/> غير مفهوم 🔴</span>;
    default:
      return null;
  }
}
