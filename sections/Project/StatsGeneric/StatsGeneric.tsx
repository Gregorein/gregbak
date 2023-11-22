import { Box, Typography } from "@mui/joy"

type StatsGenericProps = {
  stats: string[][]
}

const StatsGeneric = ({ stats }: StatsGenericProps) => (
  <>
    {stats.map(([title, content]) => (
      <Box
        key={title}
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
          {title}
        </Typography>

        <Typography
          fontFamily="anivers"
          fontSize={21}
        >
          {content}
        </Typography>
      </Box>
    ))}
  </>
)

export default StatsGeneric
