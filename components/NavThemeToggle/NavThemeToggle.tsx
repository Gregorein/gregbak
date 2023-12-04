"use client"

import { CircularProgress, Tooltip, useColorScheme, Box } from "@mui/joy"
import { Moon, SunDim } from "lucide-react"
import { transition } from "theme/utils"
import useMounted from "util/useMounted"

type NavThemeToggleProps = {
  titleOn: string
  titleOff: string
}

const NavThemeToggle = ({ titleOn, titleOff }: NavThemeToggleProps) => {
  const { mode, setMode } = useColorScheme()
  const isDark = mode === "dark"

  const isMounted = useMounted()
  if (!isMounted) {
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
          ? <SunDim />
          : <Moon />
        }
      </Box>
    </Tooltip>
  )
}

export default NavThemeToggle
