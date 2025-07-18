import {
  createContext,
  useState,
  ReactNode,
  useContext,
  useEffect,
} from "react";

type DarkModeContextType = {
  darkMode: boolean;
  toggleDarkMode: () => void;
};

const DarkModeContext = createContext<DarkModeContextType>({
  darkMode: false,
  toggleDarkMode: () => {}, //empty function to satisfy the type
});

type DarkModeProviderProps = {
  children: ReactNode; //like an any type but more specific to react, can be anything React can render
};

function DarkModeProvider({ children }: DarkModeProviderProps) {
  const [darkMode, setDarkMode] = useState(false);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  useEffect(() => {
    document.body.classList.remove("dark", "light");
    document.body.classList.add(darkMode ? "dark" : "light");
  }, [darkMode]);

  return (
    // Provider is how we pass data to the context -> which is in the values
    <DarkModeContext.Provider value={{ darkMode, toggleDarkMode }}>
      {children}
    </DarkModeContext.Provider>
  );
}

export { DarkModeContext, DarkModeProvider };
export const useDarkMode = () => useContext(DarkModeContext);
