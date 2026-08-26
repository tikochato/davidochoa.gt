"use client";

import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from "react";

type SiteContextValue = {
  menuOpen: boolean;
  setMenuOpen: (open: boolean) => void;
  loading: boolean;
  setLoading: (loading: boolean) => void;
};

const SiteContext = createContext<SiteContextValue | null>(null);

export function SiteProvider({ children }: { children: ReactNode }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [loading, setLoading] = useState(true);

  const value = useMemo(
    () => ({ menuOpen, setMenuOpen, loading, setLoading }),
    [menuOpen, loading],
  );

  return <SiteContext.Provider value={value}>{children}</SiteContext.Provider>;
}

export function useSite() {
  const context = useContext(SiteContext);
  if (!context) {
    throw new Error("useSite must be used within SiteProvider");
  }
  return context;
}

export function useToggleMenu() {
  const { menuOpen, setMenuOpen } = useSite();
  return useCallback(() => setMenuOpen(!menuOpen), [menuOpen, setMenuOpen]);
}
