import { Box, Typography } from "@mui/joy"
import Link from "next/link"
import { ArrowUpRight } from "lucide-react"

type StatsURLProps = {
  url: string
  urlTitle: string
}

const StatsURL = ({ url, urlTitle }: StatsURLProps) => url && (
  <Box
    sx={{
      flex: 1,
      display: "flex",
      flexDirection: "column",
    }}
  >
    <Typography
      fontSize={24}
      fontWeight={100}
      textTransform="lowercase"
    >
      {urlTitle}
    </Typography>

    <Typography
      component={Link}
      href={url}
      fontFamily="anivers"
      fontSize={21}
      sx={{
        display: "flex",
        alignItems: "center",
        color: "primary.500",
        "&:hover": {
          color: "primary.600"
        },
        textDecoration: "none"
      }}
    >
      {url}
      <ArrowUpRight
        size={48}
        strokeWidth={1.5}
      />
    </Typography>
  </Box>
)

export default StatsURL
