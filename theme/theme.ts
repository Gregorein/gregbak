import type { PaletteRange } from "@mui/joy/styles"
import { extendTheme } from "@mui/joy/styles"
import palette from "theme/palette"

declare module "@mui/joy/styles" {
  interface ColorPalettePropOverrides {
    secondary: true;
  }

  interface Palette {
    secondary: PaletteRange;
  }
}


const extendedTheme = extendTheme({
  colorSchemes: {
    light: {
      palette
    },
    dark: {
      palette
    },
  },
  spacing: 10,
  fontFamily: {
    display: "anivers",
    body: "europa",
    code: "Fira Code"
  },
  components: {
    JoyBox: {
      styleOverrides: {
        
      }
    }
  }
})

export default extendedTheme
