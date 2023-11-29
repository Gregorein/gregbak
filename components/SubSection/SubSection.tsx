import type { BoxProps } from "@mui/joy"
import { Box } from "@mui/joy"

const SubSection = ({ sx, ...props }: BoxProps) => (
  <Box
    sx={{
      display: "flex",
      width: "100%",
      flexDirection: "column",
      gap: 3,
      paddingLeft: 3,
      paddingRight: 3,
      ...sx
    }}
    {...props}
  />
)

export default SubSection
