export interface Badge {
  id: string;
  title: string;
  description: string;
  icon: string; // emoji or lucide icon name
  color: string;
  condition: (state: any) => boolean;
}

export const BADGES: Badge[] = [
  {
    id: 'first_sura',
    title: 'بداية النور',
    description: 'أتممت دراسة أول سورة من القرآن الكريم',
    icon: '🌟',
    color: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300',
    condition: (state) => {
      const completed = Object.values(state.suras).filter((s: any) => s.status === 'completed');
      return completed.length >= 1;
    }
  },
  {
    id: 'ten_suras',
    title: 'همة عالية',
    description: 'أتممت دراسة 10 سور من القرآن الكريم',
    icon: '🚀',
    color: 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300',
    condition: (state) => {
      const completed = Object.values(state.suras).filter((s: any) => s.status === 'completed');
      return completed.length >= 10;
    }
  },
  {
    id: 'half_quran',
    title: 'نصف الطريق',
    description: 'أتممت دراسة نصف سور القرآن الكريم (57 سورة)',
    icon: '🌓',
    color: 'bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-300',
    condition: (state) => {
      const completed = Object.values(state.suras).filter((s: any) => s.status === 'completed');
      return completed.length >= 57;
    }
  },
  {
    id: 'full_quran',
    title: 'ختمة التدبر',
    description: 'أتممت دراسة جميع سور القرآن الكريم (114 سورة)',
    icon: '👑',
    color: 'bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-300',
    condition: (state) => {
      const completed = Object.values(state.suras).filter((s: any) => s.status === 'completed');
      return completed.length >= 114;
    }
  },
  {
    id: 'first_note',
    title: 'قيد الصيد',
    description: 'أضفت أول ملاحظة أو تدبر',
    icon: '✍️',
    color: 'bg-emerald-100 text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-300',
    condition: (state) => {
      const totalNotes = Object.values(state.suras).reduce((acc: number, sura: any) => acc + Object.keys(sura.notes || {}).length, 0);
      return totalNotes >= 1;
    }
  },
  {
    id: 'fifty_notes',
    title: 'الباحث المتدبر',
    description: 'أضفت 50 ملاحظة وتدبر',
    icon: '📚',
    color: 'bg-indigo-100 text-indigo-800 dark:bg-indigo-900/30 dark:text-indigo-300',
    condition: (state) => {
      const totalNotes = Object.values(state.suras).reduce((acc: number, sura: any) => acc + Object.keys(sura.notes || {}).length, 0);
      return totalNotes >= 50;
    }
  },
  {
    id: 'high_understanding',
    title: 'فهم عميق',
    description: 'حققت تقييم فهم 5 نجوم في 5 سور مختلفة',
    icon: '🧠',
    color: 'bg-rose-100 text-rose-800 dark:bg-rose-900/30 dark:text-rose-300',
    condition: (state) => {
      const highRating = Object.values(state.suras).filter((s: any) => s.understandingRating === 5);
      return highRating.length >= 5;
    }
  },
  {
    id: 'first_story',
    title: 'بداية التدبر',
    description: 'بدأت بتدبر أول قصة من قصص القرآن الكريم',
    icon: '📖',
    color: 'bg-teal-100 text-teal-800 dark:bg-teal-900/30 dark:text-teal-300',
    condition: (state) => {
      return (state.ponderedStories?.length || 0) >= 1;
    }
  },
  {
    id: 'ten_stories',
    title: 'مستكشف القصص',
    description: 'تدبرت 10 قصص من قصص القرآن الكريم',
    icon: '🧭',
    color: 'bg-cyan-100 text-cyan-800 dark:bg-cyan-900/30 dark:text-cyan-300',
    condition: (state) => {
      return (state.ponderedStories?.length || 0) >= 10;
    }
  },
  {
    id: 'all_stories',
    title: 'خبير القصص',
    description: 'تدبرت جميع قصص القرآن الكريم',
    icon: '🏆',
    color: 'bg-fuchsia-100 text-fuchsia-800 dark:bg-fuchsia-900/30 dark:text-fuchsia-300',
    condition: (state) => {
      return (state.ponderedStories?.length || 0) >= 28;
    }
  }
];
