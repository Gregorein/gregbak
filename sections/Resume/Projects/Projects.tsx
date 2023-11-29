import { Box, Typography } from "@mui/joy"
import SectionTitle from "components/SectionTitle/SectionTitle"
import SubSection from "components/SubSection/SubSection"
import mq from "theme/mediaQueries"

type ProjectsProps = {
  projectsSlug: string
  projectsTitle: string
  projectsEntries: {
    count: number
    subject: string
  }[]
}

const style = {
  container: {
    display: "flex",
    flexWrap: "wrap"
  },
  entry: {
    display: "inline-flex",
    alignItems: "center",
    fontSize: 72,
    gap: 1,
    "&:not(:last-child):after": {
      content: "\"/\"",
      fontWeight: 100,
      paddingLeft: 2,
      paddingRight: 3
    },

    [mq.under.laptop]: {
      fontSize: 36,
      "&:not(:last-child):after": {
        paddingLeft: 1,
        paddingRight: 2
      }
    },
    [mq.under.tablet]: {
      fontSize: 24,
      "&:not(:last-child):after": {
        paddingLeft: 0,
        paddingRight: 0.5
      }
    }
  },
  count: {
    fontWeight: 800
  },
  subject: {
    fontFamily: "anivers",
    textTransform: "uppercase"
  }
}

const Projects = ({ projectsEntries, projectsSlug, projectsTitle }: ProjectsProps) => (
  <SubSection id={projectsSlug}>
    <SectionTitle textAlign="center">{projectsTitle}</SectionTitle>

    <Box sx={style.container}>
      {projectsEntries.map(({ count, subject }) => (
        <>
          <Typography
            sx={style.entry}
          >
            <Typography sx={style.count}>
              {count}
            </Typography>

            <Typography sx={style.subject}>
              {subject}
            </Typography>
          </Typography>
        </>
      ))}
    </Box>
  </SubSection>
)

export default Projects