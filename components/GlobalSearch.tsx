'use client';

import { useState, useEffect, useRef } from 'react';
import { Search, X, BookOpen, FileText, Users, Book, ArrowLeft } from 'lucide-react';
import { useAppContext } from '@/lib/store';
import { SURAS_DATA } from '@/lib/suras-data';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'motion/react';

export default function GlobalSearch() {
  const [query, setQuery] = useState('');
  const { state } = useAppContext();
  const router = useRouter();
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    setTimeout(() => {
      inputRef.current?.focus();
    }, 100);
  }, []);

  const getResults = () => {
    if (!query.trim()) return [];

    const lowerQuery = query.toLowerCase();
    const results: any[] = [];

    // Search Suras
    SURAS_DATA.forEach(sura => {
      const matchName = sura.name.includes(lowerQuery);
      const matchDesc = sura.description.includes(lowerQuery);
      const matchPeople = sura.people?.some(p => p.includes(lowerQuery));
      const matchStories = sura.stories?.some(s => s.includes(lowerQuery));

      if (matchName || matchDesc || matchPeople || matchStories) {
        results.push({
          type: 'sura',
          id: sura.id,
          title: `سورة ${sura.name}`,
          subtitle: matchDesc ? sura.description : matchPeople ? `أشخاص: ${sura.people?.join('، ')}` : matchStories ? `قصص: ${sura.stories?.join('، ')}` : 'معلومات السورة',
          icon: <BookOpen size={18} className="text-[#556B2F] dark:text-[#A3B881]" />
        });
      }

      // Search Notes
      const userSura = state.suras[sura.id];
      if (userSura && userSura.notes) {
        Object.values(userSura.notes).forEach(note => {
          if (note.title.includes(lowerQuery) || note.text.includes(lowerQuery)) {
            results.push({
              type: 'note',
              id: sura.id,
              noteId: note.id,
              title: note.title || 'ملاحظة بدون عنوان',
              subtitle: `في سورة ${sura.name} - ${note.text.substring(0, 50)}...`,
              icon: <FileText size={18} className="text-[#D4AF37]" />
            });
          }
        });
      }
    });

    return results.slice(0, 15); // Limit to 15 results
  };

  const results = getResults();

  const handleSelect = (result: any) => {
    router.push(`/sura/${result.id}`);
  };

  const handleClose = () => {
    window.dispatchEvent(new CustomEvent('go-home'));
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 20 }}
      className="w-full bg-white dark:bg-[#1A1D17] rounded-3xl shadow-sm border border-[#E5E5D8] dark:border-[#2C3E18] overflow-hidden flex flex-col"
    >
      {/* Search Input */}
      <div className="flex items-center px-6 py-5 border-b border-[#E5E5D8] dark:border-[#2C3E18]">
        <Search size={24} className="text-[#556B2F] dark:text-[#A3B881] ml-4 shrink-0" />
        <input
          ref={inputRef}
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="ابحث عن سورة، تفسير، قصة، أو في ملاحظاتك..."
          className="flex-1 bg-transparent border-none outline-none text-xl text-[#2C3E18] dark:text-[#E5E5D8] placeholder-gray-400 dark:placeholder-gray-500"
        />
        <button
          onClick={handleClose}
          className="p-2 hover:bg-gray-100 dark:hover:bg-[#2C3E18] rounded-full transition-colors mr-2 text-gray-500 dark:text-gray-400"
        >
          <X size={24} />
        </button>
      </div>

      {/* Results Area */}
      <div className="overflow-y-auto flex-1 p-4 min-h-[400px] max-h-[600px]">
        {query.trim() === '' ? (
          <div className="py-20 text-center text-gray-500 dark:text-gray-400 flex flex-col items-center">
            <Search size={64} className="mb-6 opacity-20 text-[#556B2F] dark:text-[#A3B881]" />
            <p className="text-lg">اكتب للبحث في السور، القصص، والملاحظات</p>
          </div>
        ) : results.length === 0 ? (
          <div className="py-20 text-center text-gray-500 dark:text-gray-400">
            <p className="text-lg">لم يتم العثور على نتائج لـ &quot;{query}&quot;</p>
          </div>
        ) : (
          <div className="space-y-2">
            {results.map((result, idx) => (
              <button
                key={`${result.type}-${result.id}-${idx}`}
                onClick={() => handleSelect(result)}
                className="w-full text-right flex items-start gap-4 p-4 rounded-2xl hover:bg-[#F0F4E8] dark:hover:bg-[#2C3E18]/50 transition-colors group border border-transparent hover:border-[#E5E5D8] dark:hover:border-[#2C3E18]"
              >
                <div className="mt-1 bg-white dark:bg-[#121410] p-3 rounded-xl shadow-sm border border-[#E5E5D8] dark:border-[#2C3E18]">
                  {result.icon}
                </div>
                <div className="flex-1">
                  <h4 className="font-bold text-lg text-[#3A4D1A] dark:text-[#E5E5D8] group-hover:text-[#556B2F] dark:group-hover:text-[#A3B881] transition-colors">
                    {result.title}
                  </h4>
                  <p className="text-gray-500 dark:text-gray-400 mt-1 line-clamp-2">
                    {result.subtitle}
                  </p>
                </div>
                <ArrowLeft size={20} className="text-gray-300 dark:text-gray-600 group-hover:text-[#556B2F] dark:group-hover:text-[#A3B881] mt-3 transition-colors" />
              </button>
            ))}
          </div>
        )}
      </div>
    </motion.div>
  );
}
