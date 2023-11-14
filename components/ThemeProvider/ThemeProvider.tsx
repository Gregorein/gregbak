"use client"
import { CssBaseline, CssVarsProvider } from "@mui/joy"
import EmotionCacheProvider from "components/EmotionCacheProvider/EmotionCacheProvider"
import type { ReactNode } from "react"
import theme from "theme/theme"

export type ThemeProviderProps = {
  children: ReactNode
}

const ThemeProvider = ({ children }: ThemeProviderProps) => (
  <EmotionCacheProvider options={{ key: "joy" }}>
    <CssVarsProvider
      theme={theme}
      defaultMode="system"
      modeStorageKey="themeMode"
      disableNestedContext
    >
      <CssBaseline />
      {children}
    </CssVarsProvider>
  </EmotionCacheProvider>
)

export default ThemeProvider
