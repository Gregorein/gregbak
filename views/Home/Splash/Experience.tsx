import { Box, Typography } from "@mui/joy"

type ExperienceProps = {
  splashExperience: {
    count: number
    subject: string
  }[]
}

const Experience = ({ splashExperience }: ExperienceProps) => (
  <Box sx={{
    gridArea: "experience",
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-end"
  }}>
    {splashExperience.map(({ count, subject }) => (
      <Box
        key={subject}
        sx={{
          display: "flex",
          alignItems: "center",
          gap: 1
        }}
      >
        <Typography
          fontSize={48}
          fontWeight={100}
        >
          {count}
        </Typography>
        <Typography
          fontSize={24}
          fontFamily="anivers"
        >
          {subject}
        </Typography>
      </Box>
    ))}
  </Box>
)

export default Experience
