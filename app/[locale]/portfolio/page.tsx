import { Typography } from "@mui/joy"
import ProjectsList from "components/ProjectsList/ProjectsList"
import Section from "components/Section/Section"
import config from "queries/Portfolio/config.gql"
import portfolio from "queries/Portfolio/portfolio.gql"
import api from "util/datocms"

import { unstable_setRequestLocale } from "next-intl/server"
import { locales, matchLocale } from "i18n"

export const generateStaticParams = async () => locales.map(locale => ({ locale }))

type PortfolioProps = {
  params: {
    locale: string
  }
}

export const generateMetadata = async ({
  params: {
    locale
  }
}: PortfolioProps) => {
  const {
    portfolio: {
      title
    }
  } = await api(config, {
    variables: {
      locale
    }
  })

  return {
    title
  }
}

const Portfolio = async ({
  params: {
    locale
  }
}: PortfolioProps) => {
  unstable_setRequestLocale(matchLocale(locale))

  const {
    portfolio: {
      title,
      text,
      filters,
      wip
    },
    allProjects
  } = await api(portfolio, {
    variables: {
      locale
    }
  })

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
