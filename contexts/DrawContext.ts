import { createContext, useContext } from "react";

type DrawContextType = {
  color: string;
  brushSize: number;
  setColor: (color: string) => void;
  setBrushSize: (brushSize: number) => void;
  letter: string;
  setLetter: (letter: string) => void;
  onCheck: () => void;
  canvasRef: React.RefObject<HTMLCanvasElement>;
};

export const DrawContext = createContext<DrawContextType>({
  color: "#000000",
  brushSize: 10,
  setColor: () => {},
  setBrushSize: () => {},
  letter: "",
  setLetter: () => {},
  onCheck: () => {},
  canvasRef: { current: null },
});

export const useDrawContext = () => {
  return useContext(DrawContext);
};
