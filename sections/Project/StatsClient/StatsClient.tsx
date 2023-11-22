import { Box, Typography } from "@mui/joy"
import Link from "next/link"
import { ArrowUpRight } from "lucide-react"

type StatsClientProps = {
  clientTitle: string
  client: {
    url?: string
    name: string
  }
}

const StatsClient = ({ client, clientTitle }: StatsClientProps) => client && (
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
      {clientTitle}
    </Typography>

    {client.url ? (
      <Typography
        component={Link}
        href={client.url}
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
        {client.name}
        <ArrowUpRight
          size={48}
          strokeWidth={1.5}
        />
      </Typography>
    ) : (
      <Typography
        fontFamily="anivers"
        fontSize={21}
      >
        {client.name}
      </Typography>
    )}
  </Box>
)

export default StatsClient
