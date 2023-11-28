import { Box, Typography } from "@mui/joy"
import Head from "components/Head/Head"
import Section from "components/Section/Section"

import CtaButton from "components/CtaButton/CtaButton"
import type Style from "types/style"
import mq from "theme/mediaQueries"

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

const style: Style = {
  container: {
    display: "grid",
    position: "relative",
    maxHeight: "850px",
    paddingLeft: 3,
    paddingRight: 3,
    width: "100%",
    flex: 1,
    gridTemplateColumns: "1fr 550px 1fr",
    gridTemplateRows: "1fr 1fr",
    gridTemplateAreas:
      `"greeting head experience"
      "professions head cta"`,
    [mq.under.laptop]: {
      maxHeight: "unset",
      gridTemplateColumns: "1fr 1fr",
      gridTemplateRows: "1fr 300px 1fr",
      gridTemplateAreas:
        `"greeting experience"
        "head head"
        "professions cta"`,
    },
    [mq.under.tablet]: {

    }
  },
  title: {
    gridArea: "greeting",
    color: "primary.500"
  },
  professions: {
    gridArea: "professions",
    display: "flex",
    flexDirection: "column",
    justifyContent: "flex-end",
    gap: 1
  },
  experience: {
    gridArea: "experience",
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-end"
  },
  experienceSubject: {
    display: "flex",
    alignItems: "center",
    gap: 1
  },
  cta: {
    gridArea: "cta",
    display: "flex",
    alignItems: "flex-end",
    justifyContent: "flex-end",
  },
}

const Splash = ({
  labels: {
    splashTitle,
    splashProfessions,
    splashExperience,
    splashButton,
  },
  target
}: SplashProps) => {
  const sortedExperience = splashExperience.sort((b, a) => (
    (a.count + a.subject).length - (b.count + b.subject).length
  ))

  return (
    <Section
      centered
      maxWidth="1680px"
    >
      <Box sx={style.container}>
        <Typography
          sx={style.title}
          component="h1"
          fontSize={64}
          fontWeight={800}
        >
          {splashTitle}
        </Typography>
        <Box sx={style.professions}>
          {splashProfessions.map(({ text }) => (
            <Typography
              key={text}
              fontSize={24}
              fontFamily="anivers"
              whiteSpace="pre"
            >
              {text}
            </Typography>
          ))}
        </Box>
        <Box sx={style.experience}>
          {sortedExperience.map(({ count, subject }) => (
            <Box
              key={subject}
              sx={style.experienceSubject}
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
                whiteSpace="pre"
              >
                {subject}
              </Typography>
            </Box>
          ))}
        </Box>
        <Box sx={style.cta}>
          <CtaButton
            title={splashButton}
            target={target}
          />
        </Box>

        <Head />
      </Box>
    </Section>
  )
}

export default Splash
