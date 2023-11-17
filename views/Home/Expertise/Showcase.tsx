import { Box, Typography } from "@mui/joy"

type ShowcaseProps = {
  title: string
  skills: {
    title: string
  }[]
  primary?: boolean
}

const Showcase = ({
  title,
  skills,
  primary = false
}: ShowcaseProps) => (
  <Box
    sx={{
      width: primary ? 840 : 390,
      display: "flex",
      flexDirection: "column",
      gap: 3,
    }}
  >
    <Typography
      fontSize={48}
      fontWeight={800}
      textAlign="center"
      sx={{
        width: "100%"
      }}
      whiteSpace="pre"
    >
      {title}
    </Typography>

    <Typography>
      {skills.map(skill => (
        (
          <>
            <Typography
              fontFamily="anivers"
              fontSize={24}
            >— {skill.title}</Typography>
            <br />
          </>
        )
      ))}
    </Typography>
  </Box>
)

export default Showcase
