
"use client";

import type { ReactNode } from 'react';
import { createContext, useContext, useState, useCallback, useEffect } from 'react';
import type { BaseSelectionItem } from '@/types';
// Removed: import { useAuth } from './AuthContext'; 

export type DesignStageKey = 
  "overall-budget" |
  "overall-style" | 
  "kitchen" | 
  "utility-laundry-room" |
  "living-room" |
  "bedroom" | 
  "bathroom" |
  "home-office" |
  "hallways" |
  "decor" | 
  "finishes" | 
  "summary";

export interface SelectedDataItem extends BaseSelectionItem {
  value?: number | string;
  dataAiHint?: string;
}

// Removed UserDesignSelections interface

interface DesignProgressState {
  progress: Record<DesignStageKey, number>;
  selections: Record<DesignStageKey, SelectedDataItem[]>;
  updateStageSelections: (stage: DesignStageKey, progressValue: number, items: SelectedDataItem[]) => void;
  getStageProgress: (stage: DesignStageKey) => number;
  getStageSelections: (stage: DesignStageKey) => SelectedDataItem[];
  getAllSelections: () => Record<DesignStageKey, SelectedDataItem[]>;
}

const DesignProgressContext = createContext<DesignProgressState | undefined>(undefined);

const initialProgress: Record<DesignStageKey, number> = {
  "overall-budget": 0, "overall-style": 0, "kitchen": 0,
  "utility-laundry-room": 0, "living-room": 0, "bedroom": 0,
  "bathroom": 0, "home-office": 0, "hallways": 0,
  "decor": 0, "finishes": 0, "summary": 0,
};

const initialSelections: Record<DesignStageKey, SelectedDataItem[]> = {
  "overall-budget": [], "overall-style": [], "kitchen": [],
  "utility-laundry-room": [], "living-room": [], "bedroom": [],
  "bathroom": [], "home-office": [], "hallways": [],
  "decor": [], "finishes": [], "summary": [],
};

// Removed userSpecificStorage

export const DesignProgressProvider = ({ children }: { children: ReactNode }) => {
  // Removed: const { userId: currentAuthUserId } = useAuth();

  const [progress, setProgress] = useState<Record<DesignStageKey, number>>(initialProgress);
  const [selections, setSelections] = useState<Record<DesignStageKey, SelectedDataItem[]>>(initialSelections);

  // Removed useEffect that depended on currentAuthUserId

  const updateStageSelections = useCallback((stage: DesignStageKey, progressValue: number, items: SelectedDataItem[]) => {
    const newProgressValue = Math.max(0, Math.min(100, progressValue));
    setProgress(prev => ({ ...prev, [stage]: newProgressValue }));
    setSelections(prev => ({ ...prev, [stage]: items }));
    // Placeholder: console.log(`Data for stage ${stage} updated. Not saved to DB (auth removed).`);
  }, []);

  const getStageProgress = useCallback((stage: DesignStageKey): number => {
    return progress[stage] ?? 0;
  }, [progress]);

  const getStageSelections = useCallback((stage: DesignStageKey): SelectedDataItem[] => {
    return selections[stage] ?? [];
  }, [selections]);

  const getAllSelections = useCallback((): Record<DesignStageKey, SelectedDataItem[]> => {
    return selections;
  }, [selections]);

  return (
    <DesignProgressContext.Provider value={{ progress, selections, updateStageSelections, getStageProgress, getStageSelections, getAllSelections }}>
      {children}
    </DesignProgressContext.Provider>
  );
};

export const useDesignProgress = () => {
  const context = useContext(DesignProgressContext);
  if (context === undefined) {
    throw new Error('useDesignProgress must be used within a DesignProgressProvider');
  }
  return context;
};
