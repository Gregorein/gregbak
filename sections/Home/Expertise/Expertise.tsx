import { Box, Typography } from "@mui/joy"
import Section from "components/Section/Section"
import SectionTitle from "components/SectionTitle/SectionTitle"
import { ArrowUpRight } from "lucide-react"
import Link from "next/link"
import Showcase from "./Showcase"

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
  <Section id={id} centered height="calc(100vh - 30px)">
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: 6,
        flex: 1,
        justifyContent: "center",
        alignItems: "center"
      }}
    >
      <SectionTitle>
        {expertiseTitle}
      </SectionTitle>

      <Box
        sx={{
          display: "flex",
          gap: 3
        }}>
        {expertiseShowcase.map(expertise => (
          <Showcase
            key={expertise.title}
            title={expertise.title}
            skills={expertise.skills}
            primary={expertise.primary}
          />
        ))}

        <Box
          sx={{
            width: 390,
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
          >
            {expertiseCtaTitle}
          </Typography>

          <Typography
            fontFamily="anivers"
            fontSize={24}
          >
            {expertiseCtaText}
          </Typography>

          <Typography
            component={Link}
            href="?contact"
            scroll={false}
            textAlign="center"
            sx={{
              width: "100%",
              textDecoration: "none",
              color: "primary.500",
              "&:hover": {
                color: "primary.600"
              }
            }}
            fontSize={32}
            fontWeight={100}
            textTransform="uppercase"
          >
            {expertiseCtaButton}
          </Typography>
        </Box>
      </Box>
    </Box>

    <Box
      sx={{
        display: "flex",
        gap: 9,
        padding: 3,
      }}
    >
      <Typography
        component={Link}
        href="/resume"
        fontSize={36}
        fontWeight={100}
        textTransform="uppercase"
        sx={{
          textDecoration: "none",
          display: "flex",
          gap: 1,
        }}
      >
        <Typography>
          {resumeButton}
        </Typography>
        <ArrowUpRight
          size={48}
          strokeWidth={1}
          style={{
            position: "relative",
            top: "3px"
          }} />
      </Typography>
      <Typography
        component={Link}
        href="/portfolio"
        fontSize={36}
        fontWeight={100}
        textTransform="uppercase"
        sx={{
          textDecoration: "none",
          display: "flex",
          gap: 1,
        }}
      >
        <Typography>
          {projectsButton}
        </Typography>
        <ArrowUpRight
          size={48}
          strokeWidth={1}
          style={{
            position: "relative",
            top: "3px"
          }} />
      </Typography>
    </Box>
  </Section>
)

export default Expertise
