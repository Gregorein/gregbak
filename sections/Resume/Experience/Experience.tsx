import { Box, Typography } from "@mui/joy"
import SectionTitle from "components/SectionTitle/SectionTitle"
import SubSection from "components/SubSection/SubSection"
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

const Experience = ({ experienceEntries, experienceSlug, experienceTitle }: ExperienceProps) => (
  <SubSection id={experienceSlug}>
    <SectionTitle textAlign="center">{experienceTitle}</SectionTitle>

    <Box
      sx={{
        display: "flex",
        gap: 6,
        justifyContent: "space-between"
      }}
    >
      {experienceEntries.map(({ title, projects }) => (
        <Box
          key={title}
          sx={{
            width: "325px",
            display: "flex",
            gap: 3,
            flexDirection: "column"
          }}
        >
          <Typography
            fontSize={24}
            fontWeight={100}
            textAlign="center"
          >
            {title}
          </Typography>
          <ExperienceProjects projects={projects} />
        </Box>
      ))}

    </Box>
  </SubSection>
)

export default Experience
