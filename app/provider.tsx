"use client";

import AppContext from "@/contexts/AppContext";
import { useAsyncInitialize } from "@/hooks/useAsyncInitialize";
import { GenerativeModel, GoogleGenerativeAI } from "@google/generative-ai";
import { useState } from "react";

const initGenAI = new GoogleGenerativeAI(
  "AIzaSyBOshCB4qecTvtyfuFx1GnSkJk_TIsqTDg"
);
const model = initGenAI.getGenerativeModel({
  model: "gemini-1.5-flash",
});

const AppProvider = ({ children }: { children: React.ReactNode }) => {
  const [genAI, setGenAI] = useState<GenerativeModel | null>(null);

  useAsyncInitialize(async () => {
    if (model) {
      setGenAI(model);
    }
  }, [model]);

  return (
    <AppContext.Provider value={{ genAI }}>{children}</AppContext.Provider>
  );
};

export default AppProvider;
