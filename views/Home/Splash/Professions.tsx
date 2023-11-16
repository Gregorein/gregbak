import { Box, Typography } from "@mui/joy"

type ProfessionsProps = {
  splashProfessions: {
    text: string
  }[]
}

const Professions = ({ splashProfessions }: ProfessionsProps) => (
  <Box sx={{
    gridArea: "professions",
    display: "flex",
    flexDirection: "column",
    justifyContent: "flex-end",
    gap: 1
  }}>
    {splashProfessions.map(({ text }) => (
      <Typography
        key={text}
        fontSize={24}
        fontFamily="anivers"
      >
        {text}
      </Typography>
    ))}
  </Box>
)

export default Professions