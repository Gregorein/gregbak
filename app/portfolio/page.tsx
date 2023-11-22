import { Typography } from "@mui/joy"
import ProjectsList from "components/ProjectsList/ProjectsList"
import Section from "components/Section/Section"
import config from "queries/Portfolio/config.gql"
import portfolio from "queries/Portfolio/portfolio.gql"
import api from "util/datocms"

export const generateMetadata = async () => {
  const {
    portfolio: {
      title
    }
  } = await api(config)

  return {
    title
  }
}


const Portfolio = async () => {
  const {
    portfolio: {
      title,
      text,
      filters,
      wip
    },
    allProjects
  } = await api(portfolio)

  return (
    <Section
      maxWidth="1480px"
      sx={{
        paddingTop: 18,
        gap: 3,
        paddingBottom: 12,
      }}
    >
      <Typography
        fontSize={72}
        fontWeight={800}
        sx={{
          color: "primary.500"
        }}
      >
        {title}
      </Typography>

      <Typography
        fontFamily="anivers"
        fontSize={28}
      >
        {text}
      </Typography>

      <ProjectsList
        filters={filters}
        projects={allProjects}
        wip={wip}
      />
    </Section>
  )
}

export default Portfolio
