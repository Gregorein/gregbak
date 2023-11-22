import { Box, Typography } from "@mui/joy"
import SectionTitle from "components/SectionTitle/SectionTitle"
import SubSection from "components/SubSection/SubSection"

type ProjectsProps = {
  projectsSlug: string
  projectsTitle: string
  projectsEntries: {
    count: number
    subject: string
  }[]
}

const Projects = ({ projectsEntries, projectsSlug, projectsTitle }: ProjectsProps) => (
  <SubSection id={projectsSlug}>
    <SectionTitle textAlign="center">{projectsTitle}</SectionTitle>

    <Box
      sx={{
        display: "flex",
        flexWrap: "wrap"
      }}
    >
      {projectsEntries.map(({ count, subject }) => (
        <>
          <Typography
            sx={{
              display: "inline-flex",
              alignItems: "center",
              "&:not(:last-child):after": {
                content: "\"/\"",
                fontSize: 72,
                fontWeight: 100,
                paddingLeft: 3,
                paddingRight: 3
              }
            }}
          >
            <Typography
              fontSize={72}
              fontWeight={800}
            >
              {count}
            </Typography>

            <Typography
              fontSize={72}
              fontFamily="anivers"
              textTransform="uppercase"
            >
              {subject}
            </Typography>
          </Typography>
        </>
      ))}
    </Box>
  </SubSection>
)

export default Projects