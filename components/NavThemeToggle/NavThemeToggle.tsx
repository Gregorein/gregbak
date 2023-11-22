"use client"

import { CircularProgress, Tooltip, useColorScheme, Box } from "@mui/joy"
import { Moon, SunDim } from "lucide-react"
import { useEffect, useState } from "react"
import { transition } from "theme/utils"

type NavThemeToggleProps = {
  titleOn: string
  titleOff: string
}

const NavThemeToggle = ({ titleOn, titleOff }: NavThemeToggleProps) => {
  const { mode, setMode } = useColorScheme()
  const isDark = mode === "dark"

  const [mounted, setMounted] = useState(false)
  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return (
      <Box
        sx={{
          display: "flex",
          alignItems: "center"
        }}
      >
        <CircularProgress
          variant="soft"
          size="sm"
        />
      </Box>
    )
  }

  return (
    <Tooltip
      title={isDark ? titleOn : titleOff}
      variant="solid"
      arrow
    >
      <Box
        onClick={() => setMode(isDark ? "light" : "dark")}
        sx={{
          display: "flex",
          alignItems: "center",
          transition: transition("color"),
          "&:hover": {
            color: "primary.500"
          },
          cursor: "pointer"
        }}
      >
        {isDark
          ? <Moon />
          : <SunDim />
        }
      </Box>
    </Tooltip>
  )
}

export default NavThemeToggle
