import type { TypographyProps } from "@mui/joy"
import { Typography } from "@mui/joy"

const SectionTitle = (props: TypographyProps) => (
  <Typography
    sx={{
      color: "primary.500"
    }}
    fontSize={36}
    fontWeight={800}
    {...props}
  />
)

export default SectionTitle
