import {
  type ReactNode,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

type SettingsContextType = {
  maintenanceMode: boolean;
  setMaintenanceMode: (value: boolean) => void;
};

const SettingsContext = createContext<SettingsContextType | undefined>(
  undefined,
);

export const SettingsProvider = ({ children }: { children: ReactNode }) => {
  const [maintenanceMode, setMaintenanceMode] = useState(
    localStorage.getItem("maintenanceMode") === "true",
  );

  useEffect(() => {
    localStorage.setItem("maintenanceMode", maintenanceMode.toString());
  }, [maintenanceMode]);

  return (
    <SettingsContext.Provider value={{ maintenanceMode, setMaintenanceMode }}>
      {children}
    </SettingsContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useSettings = () => {
  const context = useContext(SettingsContext);
  if (!context)
    throw new Error("useSettings must be used within SettingsProvider");
  return context;
};
