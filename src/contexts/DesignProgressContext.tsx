
"use client";

import type { ReactNode } from 'react';
import { createContext, useContext, useState, useCallback }  from 'react';

// Defines the keys for each design stage that can have progress tracked.
export type DesignStageKey = 
  "overall-budget" |
  "overall-style" | // Replaces "room-setup"
  "kitchen" | 
  "utility-laundry-room" |
  "living-room" |
  "bedroom" | // Replaces "furniture" 
  "bathroom" |
  "home-office" |
  "hallways" |
  "decor" | // Retained for general decor/lighting if still applicable outside specific rooms
  "finishes" | // Retained for general colors/finishes if still applicable
  "summary";

interface DesignProgressState {
  progress: Record<DesignStageKey, number>;
  updateProgress: (stage: DesignStageKey, value: number) => void;
  getStageProgress: (stage: DesignStageKey) => number;
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

export const DesignProgressProvider = ({ children }: { children: ReactNode }) => {
  const [progress, setProgress] = useState<Record<DesignStageKey, number>>(initialProgress);

  const updateProgress = useCallback((stage: DesignStageKey, value: number) => {
    setProgress(prev => ({ ...prev, [stage]: Math.max(0, Math.min(100, value)) })); // Ensure progress is between 0 and 100
  }, []);

  const getStageProgress = useCallback((stage: DesignStageKey): number => {
    return progress[stage] ?? 0; // Return 0 if stage not found
  }, [progress]);

  return (
    <DesignProgressContext.Provider value={{ progress, updateProgress, getStageProgress }}>
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

    