'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { SURAS_DATA } from './suras-data';

export type SuraStatus = 'not_started' | 'studying' | 'completed';
export type AyahStatus = 'understood' | 'needs_review' | 'not_understood' | 'none';
export type Theme = 'light' | 'dark';

export interface ActionLog {
  id: string;
  action: string;
  details: string;
  timestamp: number;
}

export interface Note {
  id: string;
  title: string;
  text: string;
  status: AyahStatus;
  timestamp: number;
  category?: string;
}

export interface Sura {
  id: number;
  name: string;
  status: SuraStatus;
  notes: Record<string, Note>; // key is note id
  understandingRating: number; // 0 to 5
  lastModified: number;
  totalAyahs: number;
}

export interface StudySession {
  id: string;
  durationMinutes: number;
  timestamp: number;
}

interface AppState {
  suras: Record<number, Sura>;
  theme: Theme;
  studyPlan: string;
  customSuraOrder: number[];
  userName: string;
  ponderedStories: string[];
  hasSeenTour: boolean;
  actionLogs: ActionLog[];
  studySessions: StudySession[];
}

interface AppContextType {
  state: AppState;
  isLoaded: boolean;
  updateSuraStatus: (id: number, status: SuraStatus) => void;
  updateSuraRating: (id: number, rating: number) => void;
  updateNote: (suraId: number, noteId: string, title: string, text: string, status: AyahStatus, category?: string) => void;
  deleteNote: (suraId: number, noteId: string) => void;
  toggleTheme: () => void;
  updateStudyPlan: (plan: string, customOrder?: number[]) => void;
  importData: (data: AppState) => void;
  updateUserName: (name: string) => void;
  markStoryPondered: (storyId: string) => void;
  setHasSeenTour: (seen: boolean) => void;
  logAction: (action: string, details: string) => void;
  addStudySession: (durationMinutes: number) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export function AppProvider({ children }: { children: React.ReactNode }) {
  const [state, setState] = useState<AppState>({ suras: {}, theme: 'light', studyPlan: 'default', customSuraOrder: [], userName: '', ponderedStories: [], hasSeenTour: false, actionLogs: [], studySessions: [] });
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem('basaer_data');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        
        // Migration: Convert old notes (keyed by ayahNumber) to new format
        Object.values(parsed.suras || {}).forEach((sura: any) => {
          const newNotes: Record<string, Note> = {};
          if (sura.notes) {
            Object.values(sura.notes).forEach((note: any) => {
              if (note.ayahNumber !== undefined) {
                const id = `migrated-${note.ayahNumber}`;
                newNotes[id] = {
                  id,
                  title: `آية ${note.ayahNumber}`,
                  text: note.text,
                  status: note.status,
                  timestamp: Date.now()
                };
              } else {
                newNotes[note.id] = note;
              }
            });
          }
          sura.notes = newNotes;
        });

        if (!parsed.theme) parsed.theme = 'light';
        if (!parsed.studyPlan) parsed.studyPlan = 'default';
        if (!parsed.customSuraOrder) parsed.customSuraOrder = [];
        if (parsed.userName === undefined) parsed.userName = '';
        if (!parsed.ponderedStories) parsed.ponderedStories = [];
        if (parsed.hasSeenTour === undefined) parsed.hasSeenTour = false;
        if (!parsed.actionLogs) parsed.actionLogs = [];
        if (!parsed.studySessions) parsed.studySessions = [];
        
        // eslint-disable-next-line react-hooks/set-state-in-effect
        setState(parsed);
      } catch (e) {
        console.error("Failed to parse saved data", e);
      }
    } else {
      // Initialize with default data
      const initialSuras: Record<number, Sura> = {};
      SURAS_DATA.forEach(s => {
        initialSuras[s.id] = {
          id: s.id,
          name: s.name,
          status: 'not_started',
          notes: {},
          understandingRating: 0,
          lastModified: 0,
          totalAyahs: s.ayahs
        };
      });
      setState({ suras: initialSuras, theme: 'light', studyPlan: 'default', customSuraOrder: [], userName: '', ponderedStories: [], hasSeenTour: false, actionLogs: [], studySessions: [] });
    }
    setIsLoaded(true);
  }, []);

  useEffect(() => {
    if (isLoaded) {
      localStorage.setItem('basaer_data', JSON.stringify(state));
      if (state.theme === 'dark') {
        document.documentElement.classList.add('dark');
      } else {
        document.documentElement.classList.remove('dark');
      }
    }
  }, [state, isLoaded]);

  const importData = (data: AppState) => {
    setState(data);
  };

  const updateUserName = (name: string) => {
    setState(prev => ({ 
      ...prev, 
      userName: name,
      actionLogs: [createLog('تحديث الاسم', `تم تحديث اسم المستخدم إلى ${name}`), ...(prev.actionLogs || [])]
    }));
  };

  const updateStudyPlan = (plan: string, customOrder?: number[]) => {
    setState(prev => ({
      ...prev,
      studyPlan: plan,
      customSuraOrder: customOrder !== undefined ? customOrder : prev.customSuraOrder,
      actionLogs: [createLog('تحديث خطة الدراسة', `تم تغيير خطة الدراسة إلى ${plan}`), ...(prev.actionLogs || [])]
    }));
  };

  const createLog = (action: string, details: string) => ({
    id: Math.random().toString(36).substring(2, 9),
    action,
    details,
    timestamp: Date.now()
  });

  const updateSuraStatus = (id: number, status: SuraStatus) => {
    setState(prev => ({
      ...prev,
      suras: {
        ...prev.suras,
        [id]: { ...prev.suras[id], status, lastModified: Date.now() }
      },
      actionLogs: [createLog('تحديث حالة السورة', `تم تغيير حالة سورة رقم ${id} إلى ${status === 'completed' ? 'مكتملة' : status === 'studying' ? 'قيد الدراسة' : 'لم تبدأ'}`), ...(prev.actionLogs || [])]
    }));
  };

  const updateSuraRating = (id: number, rating: number) => {
    setState(prev => ({
      ...prev,
      suras: {
        ...prev.suras,
        [id]: { ...prev.suras[id], understandingRating: rating, lastModified: Date.now() }
      },
      actionLogs: [createLog('تقييم الفهم', `تم تقييم فهم سورة رقم ${id} بـ ${rating} نجوم`), ...(prev.actionLogs || [])]
    }));
  };

  const updateNote = (suraId: number, noteId: string, title: string, text: string, status: AyahStatus, category?: string) => {
    setState(prev => {
      const sura = prev.suras[suraId];
      const newNotes = { ...sura.notes };
      const isNew = !newNotes[noteId];
      newNotes[noteId] = { 
        id: noteId, 
        title, 
        text, 
        status, 
        category: category || newNotes[noteId]?.category,
        timestamp: newNotes[noteId]?.timestamp || Date.now() 
      };
      
      return {
        ...prev,
        suras: {
          ...prev.suras,
          [suraId]: { ...sura, notes: newNotes, lastModified: Date.now() }
        },
        actionLogs: [createLog(isNew ? 'إضافة ملاحظة' : 'تعديل ملاحظة', `في سورة رقم ${suraId}: ${title || 'بدون عنوان'}`), ...(prev.actionLogs || [])]
      };
    });
  };

  const deleteNote = (suraId: number, noteId: string) => {
    setState(prev => {
      const sura = prev.suras[suraId];
      const newNotes = { ...sura.notes };
      const noteTitle = newNotes[noteId]?.title || 'بدون عنوان';
      delete newNotes[noteId];
      
      return {
        ...prev,
        suras: {
          ...prev.suras,
          [suraId]: { ...sura, notes: newNotes, lastModified: Date.now() }
        },
        actionLogs: [createLog('حذف ملاحظة', `تم حذف ملاحظة "${noteTitle}" من سورة رقم ${suraId}`), ...(prev.actionLogs || [])]
      };
    });
  };

  const toggleTheme = () => {
    setState(prev => ({
      ...prev,
      theme: prev.theme === 'light' ? 'dark' : 'light',
      actionLogs: [createLog('تغيير المظهر', `تم التبديل إلى المظهر ${prev.theme === 'light' ? 'الداكن' : 'الفاتح'}`), ...(prev.actionLogs || [])]
    }));
  };

  const markStoryPondered = (storyId: string) => {
    setState(prev => {
      if (prev.ponderedStories?.includes(storyId)) return prev;
      return {
        ...prev,
        ponderedStories: [...(prev.ponderedStories || []), storyId],
        actionLogs: [createLog('تدبر قصة', `تم إتمام تدبر القصة: ${storyId}`), ...(prev.actionLogs || [])]
      };
    });
  };

  const setHasSeenTour = (seen: boolean) => {
    setState(prev => ({ 
      ...prev, 
      hasSeenTour: seen,
      actionLogs: seen ? [createLog('إتمام الجولة', 'تم إتمام الجولة التعريفية للتطبيق'), ...(prev.actionLogs || [])] : prev.actionLogs
    }));
  };

  const logAction = (action: string, details: string) => {
    setState(prev => ({
      ...prev,
      actionLogs: [
        {
          id: Math.random().toString(36).substring(2, 9),
          action,
          details,
          timestamp: Date.now()
        },
        ...(prev.actionLogs || [])
      ]
    }));
  };

  const addStudySession = (durationMinutes: number) => {
    setState(prev => ({
      ...prev,
      studySessions: [
        ...(prev.studySessions || []),
        {
          id: Math.random().toString(36).substring(2, 9),
          durationMinutes,
          timestamp: Date.now()
        }
      ],
      actionLogs: [createLog('جلسة دراسة', `تم إكمال جلسة دراسة لمدة ${durationMinutes} دقيقة`), ...(prev.actionLogs || [])]
    }));
  };

  if (!isLoaded) return null; // Prevent hydration mismatch

  return (
    <AppContext.Provider value={{ state, isLoaded, updateSuraStatus, updateSuraRating, updateNote, deleteNote, toggleTheme, updateStudyPlan, importData, updateUserName, markStoryPondered, setHasSeenTour, logAction, addStudySession }}>
      {children}
    </AppContext.Provider>
  );
}

export function useAppContext() {
  const context = useContext(AppContext);
  if (!context) throw new Error('useAppContext must be used within AppProvider');
  return context;
}
