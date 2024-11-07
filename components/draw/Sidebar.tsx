"use client";

import { colors } from "@/data/colors";
import useAppStore from "@/store/app.store";
import { useRef } from "react";
import { useDrawContext } from "@/contexts/DrawContext";

const Sidebar = () => {
  const { color, brushSize, setColor, setBrushSize } = useDrawContext();
  const { colorsPicked, onColorPick } = useAppStore();
  const inputColorRef = useRef<HTMLInputElement>(null);

  return (
    <div className="p-3">
      <div className="text-3xl mt-3 pb-2 border-b border-white/10 font-bold uppercase">
        JP
      </div>
      <div className="text-sm mt-3 font-semibold">Colors</div>
      <div className="mt-2">
        <div className="grid grid-cols-10 gap-2">
          {colors.map((x, i) => (
            <div
              key={i}
              className="w-5 h-5 border border-white/10 cursor-pointer rounded-full"
              style={{ backgroundColor: x }}
              onClick={() => setColor(x)}
            ></div>
          ))}
          {colorsPicked.map((x, i) => (
            <div
              key={i}
              className="w-5 h-5 border border-white/10 cursor-pointer rounded-full"
              style={{ backgroundColor: x }}
              onClick={() => setColor(x)}
            ></div>
          ))}
          <div
            className="size-5 cursor-pointer rounded-full relative"
            onClick={() => inputColorRef.current?.click()}
            style={{
              background:
                "conic-gradient(#880015, #ED1C24, #FF7F27, #FFF200, #22B14C, #00A2E8, #3F48CC, #A349A4)",
            }}
          >
            <input
              ref={inputColorRef}
              type="color"
              value={color}
              onChange={(e) => {
                const newColor = e.target.value;
                setColor(newColor);
                onColorPick(newColor);
              }}
              className="absolute"
              hidden
            />
          </div>
        </div>
        <div className="mt-4 text-sm font-semibold">Size</div>
        <input
          type="range"
          min="1"
          max="248"
          value={brushSize}
          onChange={(e) => setBrushSize(parseInt(e.target.value))}
          className="w-full"
        />
      </div>
    </div>
  );
};

export default Sidebar;
