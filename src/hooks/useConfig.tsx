"use client";

import { ConfigProps } from "@/types";

import React, {
  createContext,
  useState,
  useEffect,
  useCallback,
  useContext,
} from "react";

const STORAGE_KEY = "app_config";

const defaultState: ConfigProps = {
  i18n: "pt-BR",
  darkMode: false,
  handleChangeLocation: () => {},
  handleChangeMode: () => {},
};

const ConfigContext = createContext<ConfigProps>(defaultState);

export function ConfigProvider({ children }: { children: React.ReactNode }) {
  const [i18n, setI18n] = useState(defaultState.i18n);
  const [darkMode, setDarkMode] = useState(defaultState.darkMode);

  const handleChangeLocation = useCallback((lang: string) => setI18n(lang), []);
  const handleChangeMode = useCallback(
    (isDark: boolean) => setDarkMode(isDark),
    []
  );

  useEffect(() => {
    const storedConfig = localStorage.getItem(STORAGE_KEY);

    if (storedConfig) {
      try {
        const parsed = JSON.parse(storedConfig);

        if (parsed.i18n) setI18n(parsed.i18n);
        if (typeof parsed.darkMode === "boolean") setDarkMode(parsed.darkMode);
      } catch {
        return;
      }
    }
  }, []);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify({ i18n, darkMode }));
  }, [i18n, darkMode]);

  return (
    <ConfigContext.Provider
      value={{ i18n, darkMode, handleChangeLocation, handleChangeMode }}
    >
      {children}
    </ConfigContext.Provider>
  );
}

export function useConfig() {
  const context = useContext(ConfigContext);

  if (context === undefined) {
    throw new Error("useConfig must be used within a ConfigProvider");
  }

  return context;
}
