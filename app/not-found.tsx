import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 text-center bg-[#FDFBF7] dark:bg-[#121410]">
      <h1 className="text-6xl font-bold text-[#556B2F] dark:text-[#A3B881] mb-4">404</h1>
      <h2 className="text-2xl font-semibold mb-6 text-[#2C3E18] dark:text-[#E5E5D8]">الصفحة غير موجودة</h2>
      <p className="text-gray-600 dark:text-gray-400 mb-8 max-w-md">
        عذراً، الصفحة التي تبحث عنها غير موجودة أو تم نقلها.
      </p>
      <Link
        href="/"
        className="flex items-center gap-2 bg-[#556B2F] text-white px-6 py-3 rounded-full font-medium hover:opacity-90 transition-opacity"
      >
        العودة للرئيسية
      </Link>
    </div>
  );
}
