"use client";

import { createContext, useContext, useState } from "react";
import { usePathname } from "next/navigation";
import Navbar from "@/components/navbar";
// import Footer from "@/components/footer"

const ThemeContext = createContext(null);

export function useTheme() {
  const theme = useContext(ThemeContext);
  if (!theme) {
    throw new Error("useTheme must be used inside AppShell");
  }
  return theme;
}

export default function AppShell({ children }) {
  const pathname = usePathname() || "";
  const [isNightMode, setIsNightMode] = useState(false);
  const isAdminRoute = pathname.startsWith("/admin");
  const isCrmRoute = pathname.startsWith("/crm");
  const hideSiteChrome = isAdminRoute || isCrmRoute;

  return (
    <ThemeContext.Provider
      value={{
        isNightMode,
        onToggleNightMode: () => setIsNightMode((current) => !current),
      }}
    >
      <div className={isNightMode ? "site-shell night-mode" : "site-shell"}>
        {hideSiteChrome ? null : <Navbar />}
        <main style={{ padding: 0, margin: 0 }}>
          {children}
          {/* {hideSiteChrome ? null : <Footer />} */}
        </main>
      </div>
    </ThemeContext.Provider>
  );
}


