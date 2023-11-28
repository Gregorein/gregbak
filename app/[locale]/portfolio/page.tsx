import { Typography } from "@mui/joy"
import ProjectsList from "components/ProjectsList/ProjectsList"
import Section from "components/Section/Section"
import config from "queries/Portfolio/config.gql"
import portfolio from "queries/Portfolio/portfolio.gql"
import api from "util/datocms"

import { unstable_setRequestLocale } from "next-intl/server"
import { locales, matchLocale } from "i18n"
import mq from "theme/mediaQueries"

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

const style = {
  container: {
    gap: 3,
    p: 3,
  },
  title: {
    fontSize: 72,
    fontWeight: 800,
    color: "primary.500",

    [mq.under.laptop]: {
      fontSize: 64
    },
    [mq.under.tablet]: {
      fontSize: 48
    }
  },
  text: {
    fontFamily: "anivers",
    fontSize: 28,

    [mq.under.laptop]: {
      fontSize: 21
    },
    [mq.under.tablet]: {
      fontSize: 18
    }
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
      sx={style.container}
    >
      <Typography sx={style.title}>
        {title}
      </Typography>

      <Typography sx={style.text}>
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
