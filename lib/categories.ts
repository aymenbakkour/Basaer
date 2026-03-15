export const NOTE_CATEGORIES = [
  { id: 'general', name: 'عام', color: 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300' },
  { id: 'tafseer', name: 'تفسير', color: 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400' },
  { id: 'fiqh', name: 'فقه وأحكام', color: 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400' },
  { id: 'aqeedah', name: 'عقيدة', color: 'bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-400' },
  { id: 'seerah', name: 'سيرة وقصص', color: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400' },
  { id: 'akhlaq', name: 'أخلاق وتزكية', color: 'bg-rose-100 text-rose-800 dark:bg-rose-900/30 dark:text-rose-400' },
  { id: 'linguistics', name: 'لغة وبلاغة', color: 'bg-indigo-100 text-indigo-800 dark:bg-indigo-900/30 dark:text-indigo-400' }
];

export const getCategoryById = (id?: string) => {
  if (!id) return NOTE_CATEGORIES[0];
  return NOTE_CATEGORIES.find(c => c.id === id) || NOTE_CATEGORIES[0];
};
