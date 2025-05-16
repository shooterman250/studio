
"use client";

import type { ReactNode } from 'react';
import { createContext, useContext, useState, useCallback, useEffect } from 'react';
import type { BaseSelectionItem } from '@/types';
import { useAuth } from './AuthContext'; // Import useAuth to get userId

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
  dataAiHint?: string; // Already in BaseSelectionItem, explicitly listed for clarity
}

// Interface for storing selections per user
interface UserDesignSelections {
  progress: Record<DesignStageKey, number>;
  selections: Record<DesignStageKey, SelectedDataItem[]>;
}

interface DesignProgressState {
  progress: Record<DesignStageKey, number>;
  selections: Record<DesignStageKey, SelectedDataItem[]>;
  updateStageSelections: (stage: DesignStageKey, progressValue: number, items: SelectedDataItem[], userId?: string | null) => void;
  getStageProgress: (stage: DesignStageKey, userId?: string | null) => number;
  getStageSelections: (stage: DesignStageKey, userId?: string | null) => SelectedDataItem[];
  getAllSelections: (userId?: string | null) => Record<DesignStageKey, SelectedDataItem[]>;
  // Potentially add functions to load/save all data for a user from/to Firestore
  // loadUserSelections: (userId: string) => Promise<void>;
  // saveUserSelections: (userId: string) => Promise<void>;
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


// This will store selections for multiple users in memory.
// For persistence, this would be replaced by Firestore.
const userSpecificStorage: Record<string, UserDesignSelections> = {};

export const DesignProgressProvider = ({ children }: { children: ReactNode }) => {
  const { userId: currentAuthUserId } = useAuth(); // Get current user's ID

  // These states will now reflect the *current authenticated user's* data,
  // or default if no user is logged in.
  const [progress, setProgress] = useState<Record<DesignStageKey, number>>(initialProgress);
  const [selections, setSelections] = useState<Record<DesignStageKey, SelectedDataItem[]>>(initialSelections);

  // Effect to load data when user logs in or changes
  useEffect(() => {
    if (currentAuthUserId) {
      // Placeholder: In a real app, you'd load from Firestore here.
      // For now, we'll load from our in-memory userSpecificStorage.
      const userData = userSpecificStorage[currentAuthUserId];
      if (userData) {
        setProgress(userData.progress);
        setSelections(userData.selections);
      } else {
        // New user for this session, or no saved data. Reset to initial.
        setProgress(initialProgress);
        setSelections(initialSelections);
        // Initialize storage for this user
        userSpecificStorage[currentAuthUserId] = { progress: { ...initialProgress }, selections: { ...initialSelections } };
      }
    } else {
      // No user logged in, reset to initial state.
      // (Or maintain local/anonymous state if desired, more complex)
      setProgress(initialProgress);
      setSelections(initialSelections);
    }
  }, [currentAuthUserId]);


  const updateStageSelections = useCallback((stage: DesignStageKey, progressValue: number, items: SelectedDataItem[]) => {
    const newProgressValue = Math.max(0, Math.min(100, progressValue));
    if (currentAuthUserId) {
      // Update in-memory storage for the current user
      if (!userSpecificStorage[currentAuthUserId]) {
        userSpecificStorage[currentAuthUserId] = { progress: { ...initialProgress }, selections: { ...initialSelections } };
      }
      userSpecificStorage[currentAuthUserId].progress[stage] = newProgressValue;
      userSpecificStorage[currentAuthUserId].selections[stage] = items;
      
      // Update local state to re-render
      setProgress(prev => ({ ...prev, [stage]: newProgressValue }));
      setSelections(prev => ({ ...prev, [stage]: items }));
      
      // Placeholder: console.log(`Data for user ${currentAuthUserId} at stage ${stage} would be saved to Firestore here.`);
    } else {
      // Handle anonymous user (currently updates local state only)
      setProgress(prev => ({ ...prev, [stage]: newProgressValue }));
      setSelections(prev => ({ ...prev, [stage]: items }));
       // Placeholder: console.log(`Anonymous data for stage ${stage} updated. Not saved to DB.`);
    }
  }, [currentAuthUserId]);

  const getStageProgress = useCallback((stage: DesignStageKey): number => {
    if (currentAuthUserId && userSpecificStorage[currentAuthUserId]) {
      return userSpecificStorage[currentAuthUserId].progress[stage] ?? 0;
    }
    return progress[stage] ?? 0; // Fallback for anonymous or if somehow not in storage
  }, [progress, currentAuthUserId]);

  const getStageSelections = useCallback((stage: DesignStageKey): SelectedDataItem[] => {
     if (currentAuthUserId && userSpecificStorage[currentAuthUserId]) {
      return userSpecificStorage[currentAuthUserId].selections[stage] ?? [];
    }
    return selections[stage] ?? []; // Fallback for anonymous
  }, [selections, currentAuthUserId]);

  const getAllSelections = useCallback((): Record<DesignStageKey, SelectedDataItem[]> => {
    if (currentAuthUserId && userSpecificStorage[currentAuthUserId]) {
      return userSpecificStorage[currentAuthUserId].selections;
    }
    return selections; // Fallback for anonymous
  }, [selections, currentAuthUserId]);

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
