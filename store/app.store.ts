import { create } from "zustand";
import { persist } from "zustand/middleware";

type State = {
  colorsPicked: string[];
  onColorPick: (color: string) => void;
};

const useAppStore = create<State, [["zustand/persist", State]]>(
  persist(
    (set, get) => ({
      colorsPicked: ["", "", "", "", "", "", "", "", ""],
      onColorPick: (color: string) => {
        set((state) => {
          const updatedColors = [...state.colorsPicked, color];
          // Giữ chỉ 9 màu gần đây nhất
          return { colorsPicked: updatedColors.slice(-9) };
        });
      },
    }),
    { name: "app-store" }
  )
);

export default useAppStore;
