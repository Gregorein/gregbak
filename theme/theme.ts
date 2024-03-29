 import type { PaletteRange } from "@mui/joy/styles"
import { extendTheme } from "@mui/joy/styles"
import palette from "theme/palette"
import {breakpoints} from "./mediaQueries"

declare module "@mui/joy/styles" {
  interface ColorPalettePropOverrides {
    secondary: true
  }

  interface PaletteRangeOverrides {
    softActiveColor: true
  }

  interface Palette {
    secondary: PaletteRange
  }

  interface PaletteBackgroundOverrides {
    header: true
    radar: true
  }

  interface PaletteTextOverrides {
    notification: true
  }

  interface BreakpointOverrides {
    xs: false // removes the default breakpoints
    sm: false
    md: false
    lg: false
    xl: false
    mobile: true // adds the custom breakpoints
    tablet: true
    laptop: true
    desktop: true
  }
}

const extendedTheme = extendTheme({
  cssVarPrefix: "",
  colorSchemes: {
    light: {
      palette: {
        ...palette,
        secondary: {
          ...palette.secondary,

          solidColor: "var(--palette-common-white)",
          solidBg: "var(--palette-secondary-500)",
          solidHoverBg: "var(--palette-secondary-600)",
          solidActiveBg: "var(--palette-secondary-700)",
          solidDisabledColor: "var(--palette-secondary-400)",
          solidDisabledBg: "var(--palette-secondary-100)",

          plainColor: "var(--palette-secondary-500)",
          plainHoverBg: "var(--palette-secondary-100)",
          plainActiveBg: "var(--palette-secondary-200)",
          plainDisabledColor: "var(--palette-secondary-400)",
          
          outlinedColor: "var(--palette-secondary-500)",
          outlinedBorder: "var(--palette-secondary-300)",
          outlinedHoverBg: "var(--palette-secondary-100)",
          outlinedActiveBg: "var(--palette-secondary-200)",
          outlinedDisabledColor: "var(--palette-secondary-400)",
          outlinedDisabledBorder: "var(--palette-secondary-200)",
          
          softColor: "var(--palette-secondary-700)",
          softBg: "var(--palette-secondary-100)",
          softHoverBg: "var(--palette-secondary-200)",
          softActiveColor: "magenta",
          softActiveBg: "var(--palette-secondary-300)",
          softDisabledColor: "var(--palette-secondary-400)",
          softDisabledBg: "var(--palette-secondary-50)",
          
          mainChannel: "64 192 199",
          lightChannel: "190 234 236",
          darkChannel: "32 105 109",
        },
        background: {
          header: "1.0",
          radar: "var(--palette-neutral-100)",
        },
        text: {
          notification: "var(--palette-neutral-900)"
        }
      }
    },
    dark: {
      palette: {
        ...palette,
        secondary: {
          ...palette.secondary,

          solidColor: "var(--palette-common-white)",
          solidBg: "var(--palette-secondary-500)",
          solidHoverBg: "var(--palette-secondary-600)",
          solidActiveBg: "var(--palette-secondary-700)",
          solidDisabledColor: "var(--palette-secondary-500)",
          solidDisabledBg: "var(--palette-secondary-800)",

          plainColor: "var(--palette-secondary-300)",
          plainHoverBg: "var(--palette-secondary-800)",
          plainActiveBg: "var(--palette-secondary-700)",
          plainDisabledColor: "var(--palette-secondary-500)",

          outlinedColor: "var(--palette-secondary-200)",
          outlinedBorder: "var(--palette-secondary-700)",
          outlinedHoverBg: "var(--palette-secondary-800)",
          outlinedActiveBg: "var(--palette-secondary-700)",
          outlinedDisabledColor: "var(--palette-secondary-500)",
          outlinedDisabledBorder: "var(--palette-secondary-800)",

          softColor: "var(--palette-secondary-200)",
          softBg: "var(--palette-secondary-800)",
          softHoverBg: "var(--palette-secondary-700)",
          softActiveBg: "var(--palette-secondary-600)",
          softDisabledColor: "var(--palette-secondary-500)",
          softDisabledBg: "var(--palette-secondary-800)",

          mainChannel: "64 192 199",
          lightChannel: "190 234 236",
          darkChannel: "32 105 109",
        },
        background: {
          header: "0.6",
          radar: "var(--palette-primary-900)"
        },
        text: {
          notification: "var(--palette-neutral-50)"
        }
      }
    },
  },
  spacing: 10,
  fontFamily: {
    display: "anivers",
    body: "europa",
    code: "Fira Code"
  },
  breakpoints: {
    values: breakpoints
  }
})

export default extendedTheme