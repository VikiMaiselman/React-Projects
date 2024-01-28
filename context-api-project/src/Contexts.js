import { createContext } from "react";

// 1. Call createContext() outside any components to create one or more contexts.
export const ThemeContext = createContext(false);
export const LanguageContext = createContext("english");
