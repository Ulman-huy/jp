"use client";

import { useEffect, useState } from "react";
import Button from "../ui/Button";
import { jp } from "@/data/jp";
import { AiOutlineReload } from "react-icons/ai";
import Paint from "./Paint";
import { useDrawContext } from "@/contexts/DrawContext";

const DrawContainer = () => {
  const [type] = useState("hiragana");
  const data = jp[type];
  const { color, brushSize, setLetter, onCheck, letter, canvasRef } =
    useDrawContext();

  useEffect(() => {
    handleRandomLetter();
  }, []);

  const handleRandomLetter = () => {
    const randomLetter =
      Object.keys(data)[Math.floor(Math.random() * Object.keys(data).length)];
    setLetter(randomLetter);
  };

  return (
    <div className="p-3 flex flex-col h-full">
      <div className="flex rounded-lg p-2 items-end space-x-4 border border-white/10">
        <div className="grow flex justify-center items-end space-x-2">
          <div className="text-[70px] px-8 rounded-lg bg-white/5 min-w-[100px] min-h-[105px]">
            {data[letter]?.en}
          </div>
          <span
            className="cursor-pointer flex p-1.5 hover:bg-white/5 rounded-[4px] transition-colors"
            onClick={handleRandomLetter}
          >
            <AiOutlineReload />
          </span>
        </div>
        <Button
          className="py-2 rounded-md font-semibold uppercase px-6"
          onClick={onCheck}
        >
          Check
        </Button>
      </div>
      <div className="grow bg-white rounded-[4px] h-full mt-3 relative">
        <div className="w-full h-full">
          <Paint color={color} brushSize={brushSize} canvasRef={canvasRef} />
        </div>
      </div>
    </div>
  );
};

export default DrawContainer;
