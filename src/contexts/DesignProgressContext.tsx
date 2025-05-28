
"use client";

import type { ReactNode } from 'react';
import { createContext, useContext, useState, useCallback } from 'react';
import type { BaseSelectionItem } from '@/types';

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
  // "decor" | // Removed as per previous request
  // "finishes" | // Removed as per previous request
  "summary"; // Kept for completeness, though not actively used as a page

export interface SelectedDataItem extends BaseSelectionItem {
  value?: number | string;
  dataAiHint?: string;
}

export interface CallPreferences {
  phoneNumber: string;
  availableDays: string[];
  availableTimes: string[];
}

export interface ClientInfoData {
  fullName: string;
  email: string;
  callPreferences?: CallPreferences;
}

interface DesignProgressState {
  progress: Record<DesignStageKey, number>;
  selections: Record<DesignStageKey, SelectedDataItem[]>;
  clientInfo: ClientInfoData | null;
  userRoomSelections: Set<string>; // Stores IDs of selected design stages (rooms)
  updateStageSelections: (stage: DesignStageKey, progressValue: number, items: SelectedDataItem[]) => void;
  getStageProgress: (stage: DesignStageKey) => number;
  getStageSelections: (stage: DesignStageKey) => SelectedDataItem[];
  getAllSelections: () => Record<DesignStageKey, SelectedDataItem[]>;
  updateClientInfo: (data: ClientInfoData) => void;
  getClientInfo: () => ClientInfoData | null;
  updateUserRoomSelections: (newSelections: Set<string>) => void;
  getUserRoomSelections: () => Set<string>;
}

const DesignProgressContext = createContext<DesignProgressState | undefined>(undefined);

const initialProgress: Record<DesignStageKey, number> = {
  "overall-budget": 0, "overall-style": 0, "kitchen": 0,
  "utility-laundry-room": 0, "living-room": 0, "bedroom": 0,
  "bathroom": 0, "home-office": 0, "hallways": 0,
  // "decor": 0, "finishes": 0, 
  "summary": 0,
};

const initialSelections: Record<DesignStageKey, SelectedDataItem[]> = {
  "overall-budget": [], "overall-style": [], "kitchen": [],
  "utility-laundry-room": [], "living-room": [], "bedroom": [],
  "bathroom": [], "home-office": [], "hallways": [],
  // "decor": [], "finishes": [], 
  "summary": [],
};

export const DesignProgressProvider = ({ children }: { children: ReactNode }) => {
  const [progress, setProgress] = useState<Record<DesignStageKey, number>>(initialProgress);
  const [selections, setSelections] = useState<Record<DesignStageKey, SelectedDataItem[]>>(initialSelections);
  const [clientInfo, setClientInfo] = useState<ClientInfoData | null>(null);
  const [userRoomSelections, setUserRoomSelections] = useState<Set<string>>(new Set());

  const updateStageSelections = useCallback((stage: DesignStageKey, progressValue: number, items: SelectedDataItem[]) => {
    const newProgressValue = Math.max(0, Math.min(100, progressValue));
    setProgress(prev => ({ ...prev, [stage]: newProgressValue }));
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

  const updateClientInfo = useCallback((data: ClientInfoData) => {
    setClientInfo(data);
  }, []);

  const getClientInfo = useCallback((): ClientInfoData | null => {
    return clientInfo;
  }, [clientInfo]);

  const updateUserRoomSelections = useCallback((newSelections: Set<string>) => {
    setUserRoomSelections(newSelections);
  }, []);

  const getUserRoomSelections = useCallback((): Set<string> => {
    return userRoomSelections;
  }, [userRoomSelections]);

  return (
    <DesignProgressContext.Provider value={{ 
      progress, 
      selections, 
      clientInfo,
      userRoomSelections,
      updateStageSelections, 
      getStageProgress, 
      getStageSelections, 
      getAllSelections,
      updateClientInfo,
      getClientInfo,
      updateUserRoomSelections,
      getUserRoomSelections,
    }}>
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
