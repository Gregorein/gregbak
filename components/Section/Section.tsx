import type { ReactNode } from "react"

import { Box } from "@mui/system"

type SectionProps = {
  children: ReactNode
  height?: string
  centered?: boolean
  id?: string
  trim?: boolean
  maxWidth?: string
  sx?: {
    [key: string]: string | number
  }
}

const Section = ({
  children,
  height = "100vh",
  centered = false,
  trim = false,
  id,
  maxWidth,
  sx
}: SectionProps) => (
  <Box
    id={id}
    component="section"
    sx={{
      width: "100vw",
      minHeight: height,
      paddingTop: 9,
      display: "flex",
      overflowX: trim ? "hidden" : "none"
    }}
  >
    <Box
      sx={{
        maxWidth: maxWidth || "1280px",
        flex: 1,
        width: "100%",
        margin: "0 auto",
        display: "flex",
        flexDirection: "column",
        ...(centered && {
          justifyContent: "center",
          alignItems: "center"
        }),
        ...(sx)
      }}
    >
      {children}
    </Box>
  </Box>
)

export default Section
