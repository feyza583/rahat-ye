import AsyncStorage from '@react-native-async-storage/async-storage';
import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';
import type { LogEntry, SyncStatus } from '../types';

interface LogState {
  entries: LogEntry[];
  addEntry: (entry: LogEntry) => void;
  updateSyncStatus: (id: string, status: SyncStatus) => void;
}

export const useLogStore = create<LogState>()(
  persist(
    (set) => ({
      entries: [],
      addEntry: (entry) =>
        set((state) => ({ entries: [entry, ...state.entries] })),
      updateSyncStatus: (id, status) =>
        set((state) => ({
          entries: state.entries.map((e) =>
            e.id === id ? { ...e, syncStatus: status } : e
          ),
        })),
    }),
    {
      name: 'rahat-ye-logs-v2',
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);