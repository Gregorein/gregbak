import { Box, Chip } from "@mui/joy"
import { TrafficCone } from "lucide-react"
import mq from "theme/mediaQueries"

type StatsWipProps = {
  wip: {
    title: string
  }
}

const StatsWip = ({ wip }: StatsWipProps) => (
  <Chip
    color="primary"
    variant="soft"
  >
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        gap: .5,

        [mq.under.tablet]: {
          fontSize: 12
        }
      }}
    >
      <TrafficCone size={16} />
      {wip.title}
    </Box>
  </Chip>
)

export default StatsWip

