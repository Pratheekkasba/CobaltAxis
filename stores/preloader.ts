import { create } from "zustand"

type PreloaderState = {
  isLoaded: boolean
  setLoaded: () => void
}

export const usePreloaderStore = create<PreloaderState>((set) => ({
  isLoaded: false,
  setLoaded: () => set({ isLoaded: true }),
}))
