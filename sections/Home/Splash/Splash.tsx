import { Box, Typography } from "@mui/joy"
import Head from "components/Head/Head"
import Section from "components/Section/Section"

import CtaButton from "components/CtaButton/CtaButton"

type SplashProps = {
  labels: {
    splashButton: string
    splashTitle: string
    splashProfessions: {
      text: string
    }[]
    splashExperience: {
      count: number
      subject: string
    }[]
  },
  target: string
}

const Splash = ({
  labels: {
    splashTitle,
    splashProfessions,
    splashExperience,
    splashButton,
  },
  target
}: SplashProps) => (
  <Section centered>
    <Box
      sx={{
        display: "grid",
        maxHeight: "850px",
        width: "100%",
        flex: 1,
        gridTemplateColumns: "1fr 850px 1fr",
        gridTemplateRows: "1fr 1fr",
        gridTemplateAreas:
          `"greeting head experience"
          "professions head cta"`,
      }}
    >  <Typography
      sx={{
        gridArea: "greeting",
        color: "primary.500"
      }}
      fontSize={72}
      fontWeight={800}
    >
        {splashTitle}
      </Typography>
      <Box
        sx={{
          gridArea: "professions",
          display: "flex",
          flexDirection: "column",
          justifyContent: "flex-end",
          gap: 1
        }}
      >
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
      <Box
        sx={{
          gridArea: "experience",
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-end"
        }}
      >
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
      <Box
        sx={{
          gridArea: "cta",
          display: "flex",
          alignItems: "flex-end",
          justifyContent: "flex-end",
        }}
      >
        <CtaButton
          title={splashButton}
          target={target}
        />
      </Box>

      <Head />
    </Box>
  </Section>
)

export default Splash
