"use client"
import { CssBaseline, CssVarsProvider } from "@mui/joy"
import EmotionCacheProvider from "components/EmotionCacheProvider/EmotionCacheProvider"
import type { ReactNode } from "react"
import theme from "./theme"

export type ThemeProviderProps = {
  children: ReactNode
}

const ThemeProvider = ({ children }: ThemeProviderProps) => (
  <EmotionCacheProvider options={{ key: "joy" }}>
    <CssVarsProvider theme={theme}>
      <CssBaseline />
      {children}
    </CssVarsProvider>
  </EmotionCacheProvider>
)

export default ThemeProvider
