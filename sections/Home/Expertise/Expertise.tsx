import { Box, Typography } from "@mui/joy"
import LinkArrow from "assets/icons/LinkArrow"
import Section from "components/Section/Section"
import SectionTitle from "components/SectionTitle/SectionTitle"
import Link from "next/link"
import mq from "theme/mediaQueries"
import { transition } from "theme/utils"

type ExpertiseProps = {
  labels: {
    expertiseCtaButton: string
    expertiseTitle: string
    expertiseCtaTitle: string
    expertiseCtaText: string
    expertiseShowcase: {
      title: string
      skills: {
        title: string
      }[]
      primary: boolean
    }[]
    projectsButton: string
    resumeButton: string
  }
  id: string
}

const style = {
  container: {
    display: "flex",
    flexDirection: "column",
    gap: 6,
    flex: 1,
    justifyContent: "center",
    alignItems: "center",

    [mq.under.laptop]: {
      p: 3,
      gap: 3
    },
    [mq.under.tablet]: {
      alignItems: "flex-start"
    }
  },
  groups: {
    display: "flex",
    gap: 3,

    [mq.under.laptop]: {
      flexWrap: "wrap"
    },
    [mq.under.tablet]: {
      flexDirection: "column",
    }
  },
  group: {
    flex: 2,
    display: "flex",
    flexDirection: "column",
    gap: 3,

    [mq.under.laptop]: {
      gap: 1
    }
  },
  groupMain: {
    flex: 3
  },
  groupTitle: {
    fontSize: 48,
    fontWeight: 800,
    textAlign: "center",
    width: "100%",
    whiteSpace: "pre",

    [mq.under.laptop]: {
      whiteSpace: "unset",
      fontSize: 36
    },
    [mq.under.tablet]: {
      textAlign: "left"
    }
  },
  groupText: {
    fontFamily: "anivers",
    fontSize: 24,

    [mq.under.tablet]: {
      fontSize: 18
    }
  },
  groupLink: {
    textAlign: "center",
    fontSize: 32,
    fontWeight: 100,
    textTransform: "uppercase",
    width: "100%",
    textDecoration: "none",
    color: "primary.500",
    "&:hover": {
      color: "primary.600"
    },

    [mq.under.tablet]: {
      textAlign: "left"
    }
  },
  footer: {
    display: "flex",
    width: "100%",
    gap: 9,
    padding: 3,
    justifyContent: "center",

    [mq.under.tablet]: {
      flexDirection: "column",
      gap: 3,
      alignItems: "flex-start"
    }
  },
  footerLink: {
    transition: transition("color"),
    fontSize: 36,
    fontWeight: 100,
    textTransform: "uppercase",
    textDecoration: "none",
    display: "flex",
    gap: 1,
    "&:hover": {
      color: "primary.600"
    },

    [mq.under.tablet]: {
      fontSize: 24
    }
  },
  footerIcon: {
    strokeWidth: 1,
    position: "relative",
    top: 3
  }
}

const Expertise = ({
  labels: {
    expertiseTitle,
    expertiseShowcase,

    expertiseCtaTitle,
    expertiseCtaText,
    expertiseCtaButton,

    projectsButton,
    resumeButton,
  },
  id
}: ExpertiseProps) => (
  <Section
    id={id}
    centered
    height="calc(100vh - 30px)"
  >
    <Box sx={style.container}>
      <SectionTitle>
        {expertiseTitle}
      </SectionTitle>

      <Box sx={style.groups}>
        {expertiseShowcase.map(({
          title,
          skills,
        }, i) => (
          <Box
            key={title}
            sx={i == expertiseShowcase.length - 1 ? {
              ...style.group,
              ...style.groupMain
            } : style.group}
          >
            <Typography sx={style.groupTitle}>
              {title}
            </Typography>

            <Typography>
              {skills.map(skill => (
                (
                  <>
                    <Typography sx={style.groupText}>
                      — {skill.title}
                    </Typography>
                    <br />
                  </>
                )
              ))}
            </Typography>
          </Box>
        ))}

        <Box sx={style.group}>
          <Typography sx={style.groupTitle}>
            {expertiseCtaTitle}
          </Typography>

          <Typography sx={style.groupText}>
            {expertiseCtaText}
          </Typography>

          <Typography
            component={Link}
            href="?contact"
            scroll={false}
            sx={style.groupLink}
          >
            {expertiseCtaButton}
          </Typography>
        </Box>
      </Box>
    </Box>

    <Box sx={style.footer}>
      <Typography
        component={Link}
        href="/resume"
        sx={style.footerLink}
      >
        <Typography>
          {resumeButton}
        </Typography>
        <LinkArrow sx={style.footerIcon} />
      </Typography>
      <Typography
        component={Link}
        href="/portfolio"
        sx={style.footerLink}
      >
        <Typography>
          {projectsButton}
        </Typography>
        <LinkArrow sx={style.footerIcon} />
      </Typography>
    </Box>
  </Section>
)


export default Expertise
