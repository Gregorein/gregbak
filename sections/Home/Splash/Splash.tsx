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
    overflowX: "hidden",
    display: "grid",
    position: "relative",
    p: 3,
    height: "100%",
    maxHeight: 850,
    width: "100%",
    flex: 1,
    gridTemplateColumns: "1fr 1fr",
    gridTemplateRows: "1fr 1fr",
    gridTemplateAreas:
      `"greeting experience"
      "professions cta"`,

    [mq.under.laptop]: {
      maxHeight: "unset"
    },
  },
  title: {
    gridArea: "greeting",
    color: "primary.500",
    fontSize: 64,
    fontWeight: 800,

    [mq.under.laptop]: {
      fontSize: 48
    }
  },
  professions: {
    gridArea: "professions",
    display: "flex",
    flexDirection: "column",
    justifyContent: "flex-end",
    gap: 1
  },
  profession: {
    fontSize: 24,
    fontFamily: "anivers",
    whiteSpace: "pre",

    [mq.under.laptop]: {
      fontSize: 16
    }
  },
  experiences: {
    gridArea: "experience",
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-end",

    [mq.under.laptop]: {
      paddingTop: 1.5
    }
  },
  experience: {
    display: "flex",
    alignItems: "center",
    gap: 1,

    [mq.under.laptop]: {
      gap: 0.5
    }
  },
  experienceCount: {
    fontSize: 48,
    fontWeight: 100,

    [mq.under.laptop]: {
      fontSize: 28
    }
  },
  experienceSubject: {
    fontSize: 24,
    fontFamily: "anivers",
    whiteSpace: "pre",

    [mq.under.laptop]: {
      fontSize: 12
    }
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
        >
          {splashTitle}
        </Typography>
        <Box sx={style.professions}>
          {splashProfessions.map(({ text }) => (
            <Typography
              key={text}
              sx={style.profession}
            >
              {text}
            </Typography>
          ))}
        </Box>
        <Box sx={style.experiences}>
          {sortedExperience.map(({ count, subject }) => (
            <Box
              key={subject}
              sx={style.experience}
            >
              <Typography sx={style.experienceCount}>
                {count}
              </Typography>
              <Typography sx={style.experienceSubject}>
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
