import { Box } from "@mui/joy"
import type { ReactNode } from "react"

type MainProps = {
  children: ReactNode
}

const Main = ({ children }: MainProps) => (
  <Box
    component="main"
    sx={{
      minHeight: `calc(100vh - ${90 + 570}px)`,
      overflow: "hidden",
    }}
  >
    {children}
  </Box>
)

export default Main
