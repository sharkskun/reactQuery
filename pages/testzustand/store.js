import { create } from "zustand";
import { persist } from 'zustand/middleware';

export const useStore = create(
  persist(
    (set, get) => ({
      count: 0,
  increment: () => set((state) => ({ count: state.count + 1 })),
  reset: () => set({ count: 0 }),
    }),
    {
      name: 'tes-storage',
    },
  ),
)