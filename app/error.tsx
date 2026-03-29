'use client';

import { useEffect } from 'react';
import { Home, RotateCcw } from 'lucide-react';
import Link from 'next/link';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error('App Error:', error);
  }, [error]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 text-center bg-[#FDFBF7] dark:bg-[#121410]">
      <h1 className="text-6xl font-bold text-red-500 mb-4">خطأ</h1>
      <h2 className="text-2xl font-semibold mb-6 text-[#2C3E18] dark:text-[#E5E5D8]">حدث خطأ غير متوقع</h2>
      <p className="text-gray-600 dark:text-gray-400 mb-8 max-w-md">
        عذراً، حدث خطأ أثناء تحميل الصفحة. يرجى المحاولة مرة أخرى.
      </p>
      <div className="flex flex-wrap items-center justify-center gap-4">
        <button
          onClick={() => reset()}
          className="flex items-center gap-2 bg-[#556B2F] text-white px-6 py-3 rounded-full font-medium hover:opacity-90 transition-opacity"
        >
          <RotateCcw size={20} />
          إعادة المحاولة
        </button>
        <Link
          href="/"
          className="flex items-center gap-2 bg-gray-200 dark:bg-gray-800 text-[#2C3E18] dark:text-[#E5E5D8] px-6 py-3 rounded-full font-medium hover:opacity-90 transition-opacity"
        >
          <Home size={20} />
          العودة للرئيسية
        </Link>
      </div>
    </div>
  );
}
