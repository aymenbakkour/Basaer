'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { SURAS_DATA } from './suras-data';

export type SuraStatus = 'not_started' | 'studying' | 'completed';
export type AyahStatus = 'understood' | 'needs_review' | 'not_understood' | 'none';
export type Theme = 'light' | 'dark';

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

interface AppState {
  suras: Record<number, Sura>;
  theme: Theme;
  studyPlan: string;
  customSuraOrder: number[];
  userName: string;
}

interface AppContextType {
  state: AppState;
  updateSuraStatus: (id: number, status: SuraStatus) => void;
  updateSuraRating: (id: number, rating: number) => void;
  updateNote: (suraId: number, noteId: string, title: string, text: string, status: AyahStatus, category?: string) => void;
  deleteNote: (suraId: number, noteId: string) => void;
  toggleTheme: () => void;
  updateStudyPlan: (plan: string, customOrder?: number[]) => void;
  importData: (data: AppState) => void;
  updateUserName: (name: string) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export function AppProvider({ children }: { children: React.ReactNode }) {
  const [state, setState] = useState<AppState>({ suras: {}, theme: 'light', studyPlan: 'default', customSuraOrder: [], userName: '' });
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem('basaer_data');
    if (saved) {
      const parsed = JSON.parse(saved);
      
      // Migration: Convert old notes (keyed by ayahNumber) to new format
      Object.values(parsed.suras).forEach((sura: any) => {
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
      
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setState(parsed);
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
      setState({ suras: initialSuras, theme: 'light', studyPlan: 'default', customSuraOrder: [], userName: '' });
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
    setState(prev => ({ ...prev, userName: name }));
  };

  const updateStudyPlan = (plan: string, customOrder?: number[]) => {
    setState(prev => ({
      ...prev,
      studyPlan: plan,
      customSuraOrder: customOrder !== undefined ? customOrder : prev.customSuraOrder
    }));
  };

  const updateSuraStatus = (id: number, status: SuraStatus) => {
    setState(prev => ({
      ...prev,
      suras: {
        ...prev.suras,
        [id]: { ...prev.suras[id], status, lastModified: Date.now() }
      }
    }));
  };

  const updateSuraRating = (id: number, rating: number) => {
    setState(prev => ({
      ...prev,
      suras: {
        ...prev.suras,
        [id]: { ...prev.suras[id], understandingRating: rating, lastModified: Date.now() }
      }
    }));
  };

  const updateNote = (suraId: number, noteId: string, title: string, text: string, status: AyahStatus, category?: string) => {
    setState(prev => {
      const sura = prev.suras[suraId];
      const newNotes = { ...sura.notes };
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
        }
      };
    });
  };

  const deleteNote = (suraId: number, noteId: string) => {
    setState(prev => {
      const sura = prev.suras[suraId];
      const newNotes = { ...sura.notes };
      delete newNotes[noteId];
      
      return {
        ...prev,
        suras: {
          ...prev.suras,
          [suraId]: { ...sura, notes: newNotes, lastModified: Date.now() }
        }
      };
    });
  };

  const toggleTheme = () => {
    setState(prev => ({
      ...prev,
      theme: prev.theme === 'light' ? 'dark' : 'light'
    }));
  };

  if (!isLoaded) return null; // Prevent hydration mismatch

  return (
    <AppContext.Provider value={{ state, updateSuraStatus, updateSuraRating, updateNote, deleteNote, toggleTheme, updateStudyPlan, importData, updateUserName }}>
      {children}
    </AppContext.Provider>
  );
}

export function useAppContext() {
  const context = useContext(AppContext);
  if (!context) throw new Error('useAppContext must be used within AppProvider');
  return context;
}
