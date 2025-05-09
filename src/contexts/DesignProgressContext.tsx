
"use client";

import type { ReactNode } from 'react';
import { createContext, useContext, useState, useCallback }  from 'react';
import type { BaseSelectionItem } from '@/types'; // Ensure BaseSelectionItem is imported

// Defines the keys for each design stage that can have progress tracked.
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

// Defines the structure for a selected item's data to be stored in the context.
// This can be extended if more details are needed for the summary display.
export interface SelectedDataItem extends BaseSelectionItem {
  value?: number | string; // For items like budget that have a specific value rather than just being 'selected'
  // dataAiHint is part of BaseSelectionItem
}

interface DesignProgressState {
  progress: Record<DesignStageKey, number>;
  selections: Record<DesignStageKey, SelectedDataItem[]>;
  updateStageSelections: (stage: DesignStageKey, progressValue: number, items: SelectedDataItem[]) => void;
  getStageProgress: (stage: DesignStageKey) => number;
  getStageSelections: (stage: DesignStageKey) => SelectedDataItem[];
  getAllSelections: () => Record<DesignStageKey, SelectedDataItem[]>;
}

const DesignProgressContext = createContext<DesignProgressState | undefined>(undefined);

// Initial progress values for all design stages.
const initialProgress: Record<DesignStageKey, number> = {
  "overall-budget": 0,
  "overall-style": 0,
  "kitchen": 0,
  "utility-laundry-room": 0,
  "living-room": 0,
  "bedroom": 0,
  "bathroom": 0,
  "home-office": 0,
  "hallways": 0,
  "decor": 0,
  "finishes": 0,
  "summary": 0,
};

// Initial selections for all design stages.
const initialSelections: Record<DesignStageKey, SelectedDataItem[]> = {
  "overall-budget": [],
  "overall-style": [],
  "kitchen": [],
  "utility-laundry-room": [],
  "living-room": [],
  "bedroom": [],
  "bathroom": [],
  "home-office": [],
  "hallways": [],
  "decor": [],
  "finishes": [],
  "summary": [],
};

export const DesignProgressProvider = ({ children }: { children: ReactNode }) => {
  const [progress, setProgress] = useState<Record<DesignStageKey, number>>(initialProgress);
  const [selections, setSelections] = useState<Record<DesignStageKey, SelectedDataItem[]>>(initialSelections);

  const updateStageSelections = useCallback((stage: DesignStageKey, progressValue: number, items: SelectedDataItem[]) => {
    setProgress(prev => ({ ...prev, [stage]: Math.max(0, Math.min(100, progressValue)) }));
    setSelections(prev => ({ ...prev, [stage]: items }));
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
