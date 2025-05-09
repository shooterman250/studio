
"use client";

import type { ReactNode } from 'react';
import { createContext, useContext, useState, useCallback }  from 'react';

// Defines the keys for each design stage that can have progress tracked.
export type DesignStageKey = "room-setup" | "furniture" | "decor" | "finishes" | "summary";

interface DesignProgressState {
  progress: Record<DesignStageKey, number>;
  updateProgress: (stage: DesignStageKey, value: number) => void;
  getStageProgress: (stage: DesignStageKey) => number;
}

const DesignProgressContext = createContext<DesignProgressState | undefined>(undefined);

// Initial progress values for all design stages.
const initialProgress: Record<DesignStageKey, number> = {
  "room-setup": 0,
  "furniture": 0, // Default progress for furniture, can be updated later
  "decor": 0,     // Default progress for decor & lighting
  "finishes": 0,  // Default progress for colors & finishes
  "summary": 0,   // Default progress for summary
};

export const DesignProgressProvider = ({ children }: { children: ReactNode }) => {
  const [progress, setProgress] = useState<Record<DesignStageKey, number>>(initialProgress);

  const updateProgress = useCallback((stage: DesignStageKey, value: number) => {
    setProgress(prev => ({ ...prev, [stage]: Math.max(0, Math.min(100, value)) })); // Ensure progress is between 0 and 100
  }, []);

  const getStageProgress = useCallback((stage: DesignStageKey): number => {
    return progress[stage] ?? 0; // Return 0 if stage not found, though initialProgress should cover all keys
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
