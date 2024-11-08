import { GenerativeModel } from "@google/generative-ai";
import { createContext, useContext } from "react";

type AppContextType = {
  genAI: GenerativeModel | null;
};

const AppContext = createContext<AppContextType>({
  genAI: null,
});

export const useAppContext = () => {
  return useContext(AppContext);
};

export default AppContext;
