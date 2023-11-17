import { Box } from "@mui/system"
import type { ReactNode } from "react"

type SectionProps = {
  children: ReactNode
  height?: string
  centered?: boolean
  id?: string
  trim?: boolean
}

const Section = ({
  children,
  height = "100vh",
  centered = false,
  trim = false,
  id,
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
        maxWidth: "1745px",
        flex: 1,
        width: "100%",
        margin: "0 auto",
        display: "flex",
        flexDirection: "column",
        ...(centered && {
          justifyContent: "center",
          alignItems: "center"
        })
      }}
    >
      {children}
    </Box>
  </Box>
)

export default Section
