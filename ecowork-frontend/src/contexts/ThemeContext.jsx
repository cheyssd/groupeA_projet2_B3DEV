import { createContext, useContext, useState } from "react";

const ThemeContext = createContext();

export function ThemeProvider({ children }) {
  const [isDark, setIsDark] = useState(true);

  const toggle = () => setIsDark(!isDark);

  return (
    <ThemeContext.Provider value={{ isDark, toggle }}>
  <div 
    className={isDark ? "dark" : "light"}
    style={{ background: "var(--bg-primary)", minHeight: "100vh" }}
  >
    {children}
  </div>
</ThemeContext.Provider>
  );
}

export function useTheme() {
  return useContext(ThemeContext);
}