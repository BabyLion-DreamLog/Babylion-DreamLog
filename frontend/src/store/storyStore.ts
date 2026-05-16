import { create } from "zustand";

interface StoryInput {
  place: string;
  name: string;
  activity: string;
  duration: number;
  voice: string;
  storyTitle: string;
  storySummary: string;
  setInput: (field: "place" | "name" | "activity", value: string) => void;
  setMeta: (duration: number, voice: string) => void;
  setStoryTitle: (title: string) => void;
  setStorySummary: (summary: string) => void;
  reset: () => void;
}

export const useStoryStore = create<StoryInput>((set) => ({
  place: "",
  name: "",
  activity: "",
  duration: 8,
  voice: "엄마 목소리",
  storyTitle: "",
  storySummary: "",
  setInput: (field, value) => set({ [field]: value }),
  setMeta: (duration, voice) => set({ duration, voice }),
  setStoryTitle: (title) => set({ storyTitle: title }),
  setStorySummary: (summary) => set({ storySummary: summary }),
  reset: () => set({ place: "", name: "", activity: "", duration: 8, voice: "엄마 목소리", storyTitle: "", storySummary: "" }),
}));