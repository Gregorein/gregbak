
import { Box } from "@mui/joy"
import type { ReactNode } from "react"

type MainProps = {
  children: ReactNode
}

const Main = ({ children }: MainProps) => (
  <Box
    component="main"
    sx={{
      paddingTop: 9,
      minHeight: `calc(100vh - ${90 + 570}px)`
    }}
  >
    {children}
  </Box>
)

export default Main
