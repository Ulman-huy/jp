"use client";

import { checkDraw } from "@/actions";
import DrawContainer from "@/components/draw/DrawContainer";
import Sidebar from "@/components/draw/Sidebar";
import { DrawContext } from "@/contexts/DrawContext";
import { jp } from "@/data/jp";
import { fileToGenerativePart } from "@/utils";
import { useRef, useState } from "react";

const Draw = () => {
  const [color, setColor] = useState("#000000");
  const [brushSize, setBrushSize] = useState(10);
  const [letter, setLetter] = useState("");
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const onCheck = async () => {
    try {
      const canvas = canvasRef.current;
      let image = null;
      if (canvas) {
        canvas.toBlob(async (blob) => {
          if (blob) {
            const file = new File([blob], "drawing.png", { type: "image/png" });
            image = await fileToGenerativePart(file);
            const link = document.createElement("a");
            link.href = `data:image/png;base64,${image.inlineData.data}`;
            link.download = "drawing.png";
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
            const letterJP = jp["hiragana"][letter]?.jp;
            const res = await checkDraw({ image, letter: letterJP });
            console.log({ res });
          }
        }, "image/png");
      }
    } catch (error) {
      console.log({ error });
    }
  };

  return (
    <DrawContext.Provider
      value={{
        color,
        brushSize,
        setColor,
        setBrushSize,
        letter,
        setLetter,
        onCheck,
        canvasRef,
      }}
    >
      <div className="grid grid-cols-12 w-full h-screen">
        <div className="col-span-2 border-r border-white/10">
          <Sidebar />
        </div>
        <div className="col-span-10">
          <DrawContainer />
        </div>
      </div>
    </DrawContext.Provider>
  );
};

export default Draw;
