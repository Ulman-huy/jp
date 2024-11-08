"use client";

import { GEMINI_API_KEY } from "@/configs/contains";
import AppContext from "@/contexts/AppContext";
import { useAsyncInitialize } from "@/hooks/useAsyncInitialize";
import { GenerativeModel, GoogleGenerativeAI } from "@google/generative-ai";
import { useState } from "react";

const initGenAI = new GoogleGenerativeAI(GEMINI_API_KEY!);
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
