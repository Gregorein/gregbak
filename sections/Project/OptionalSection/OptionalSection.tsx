import { Box, Typography } from "@mui/joy"

type OptionalSectionProps = {
  optionalText: {
    title: string
    text: string
  }[]
}

const OptionalSection = ({ optionalText }: OptionalSectionProps) => optionalText.length > 0 && (
  <Box
    sx={{
      display: "grid",
      gridTemplateColumns: "1fr 1fr",
      gridAutoColumns: "1fr",
      gap: 3
    }}
  >
    {optionalText.map(({ title, text }) => (
      <Box
        key={title}
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: 3
        }}
      >
        <Typography
          fontSize={48}
          fontWeight={800}
          sx={{
            color: "primary.500"
          }}
        >
          {title}
        </Typography>

        <Typography
          fontFamily="anivers"
          fontSize={28}
        >
          {text}
        </Typography>
      </Box>
    ))}
  </Box>
)

export default OptionalSection