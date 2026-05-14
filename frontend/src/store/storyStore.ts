import { create } from "zustand";

interface StoryInput {
  place: string;
  name: string;
  activity: string;
  setInput: (field: "place" | "name" | "activity", value: string) => void;
  reset: () => void;
}

export const useStoryStore = create<StoryInput>((set) => ({
  place: "",
  name: "",
  activity: "",
  setInput: (field, value) => set({ [field]: value }),
  reset: () => set({ place: "", name: "", activity: "" }),
}));