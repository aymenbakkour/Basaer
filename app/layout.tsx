import type {Metadata} from 'next';
import './globals.css'; // Global styles
import { Cairo } from 'next/font/google';
import { AppProvider } from '@/lib/store';
import { TimerProvider } from '@/components/TimerContext';
import FloatingMenu from '@/components/FloatingMenu';
import BadgeNotification from '@/components/BadgeNotification';
import BottomNav from '@/components/BottomNav';
import UnsavedNoteModal from '@/components/UnsavedNoteModal';

const cairo = Cairo({ subsets: ['arabic'], variable: '--font-cairo' });

export const metadata: Metadata = {
  title: 'بصائر - متابعة دراسة وتفسير القرآن',
  description: 'تطبيق بصائر لمتابعة دراسة وتفسير القرآن الكريم وتدوين الملاحظات',
};

export default function RootLayout({children}: {children: React.ReactNode}) {
  return (
    <html lang="ar" dir="rtl" className={cairo.variable} suppressHydrationWarning>
      <body className="font-sans bg-[#FDFBF7] dark:bg-[#121410] text-[#2C3E18] dark:text-[#E5E5D8] min-h-screen transition-colors duration-300" suppressHydrationWarning>
        <AppProvider>
          <TimerProvider>
            {children}
            <FloatingMenu />
            <BottomNav />
            <BadgeNotification />
            <UnsavedNoteModal />
          </TimerProvider>
        </AppProvider>
      </body>
    </html>
  );
}
