import { Box, Typography } from "@mui/joy"
import SectionTitle from "components/SectionTitle/SectionTitle"
import SubSection from "components/SubSection/SubSection"
import mq from "theme/mediaQueries"
import ExperienceProjects from "./ExperienceProjects"

type ExperienceProps = {
  experienceSlug: string;
  experienceTitle: string;
  experienceEntries: {
    title: string
    projects: {
      title: string
      role: string
      text: string
      stack: {
        title: string
      }[]
      clients: {
        name: string
        url?: string
      }[]
    }[]
  }[];
}

const style = {
  container: {
    display: "grid",
    gridTemplateColumns: "repeat(4, 1fr)",
    gridTemplateRows: "auto",
    gridGap: 60,
    justifyContent: "space-between",

    [mq.under.laptop]: {
      gridTemplateColumns: "1fr 1fr",
      gridTemplateRows: "auto auto",
    },
    [mq.under.tablet]: {
      gridTemplateColumns: "auto",
      gridTemplateRows: "auto",
    }
  },
  entries: {
    display: "flex",
    gap: 3,
    flexDirection: "column"
  },
  title: {
    fontSize: 24,
    fontWeight: 100,
    textAlign: "center"
  }
}

const Experience = ({ experienceEntries, experienceSlug, experienceTitle }: ExperienceProps) => (
  <SubSection id={experienceSlug}>
    <SectionTitle textAlign="center">{experienceTitle}</SectionTitle>

    <Box sx={style.container}>
      {experienceEntries.map(({ title, projects }) => (
        <Box
          key={title}
          sx={style.entries}
        >
          <Typography sx={style.title}>
            {title}
          </Typography>
          <ExperienceProjects projects={projects} />
        </Box>
      ))}

    </Box>
  </SubSection>
)

export default Experience
