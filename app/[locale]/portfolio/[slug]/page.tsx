import Section from "components/Section/Section"
import api from "util/datocms"

import { unstable_setRequestLocale } from "next-intl/server"

import project from "queries/Project/project.gql"
import config from "queries/Project/config.gql"
import { Box, Typography } from "@mui/joy"
import ExtendedTypography from "components/ExtendedTypography/ExtendedTypography"
import Link from "next/link"
import localiseDate from "util/localiseDate"
import { transition } from "theme/utils"
import { Image as DatoImage } from "react-datocms"
import Gallery from "sections/Project/Gallery/Gallery"
import OptionalSection from "sections/Project/OptionalSection/OptionalSection"
import StatsWip from "sections/Project/StatsWip/StatsWip"
import { locales, matchLocale } from "i18n"
import mq from "theme/mediaQueries"
import LinkArrow from "assets/icons/LinkArrow"
import { notFound } from "next/navigation"

export const generateStaticParams = async () => {
  const { allProjects } = await api("query allProjectSlugs { allProjects { slug } }")

  return allProjects.map(
    ({ slug }) => locales.map(
      locale => ({
        locale,
        slug
      })
    )
  )
}

type ProjectProps = {
  params: {
    slug: string
    locale: string
  }
}

export const generateMetadata = async ({
  params: {
    slug,
    locale
  }
}: ProjectProps) => {
  const data = await api(config, {
    variables: {
      slug,
      locale
    }
  })

  if (data.project === null) notFound()

  const {
    project: {
      title
    },
    portfolio: {
      title: portfolioTitle
    }
  } = data

  return {
    title: `${title} | ${portfolioTitle}`
  }
}


const style = {
  container: {
    gap: 6,
    paddingBottom: 6,

    [mq.under.tablet]: {
      gap: 3
    }
  },
  header: {
    display: "flex",
    flexDirection: "column",
    gap: 3,
    paddingLeft: 3,
    paddingRight: 3,
  },
  returnLink: {
    fontSize: 28,
    fontWeight: 100,
    textTransform: "uppercase",
    display: "flex",
    gap: 1.5,
    alignItems: "center",
    position: "absolute",
    left: -30,
    top: "50%",
    transform: "translate(-100%, -50%)",
    color: "primary.500",
    textDecoration: "none"
  },
  title: {
    color: "primary.500",
    fontSize: 72,
    fontWeight: 800,

    [mq.under.laptop]: {
      fontSize: 48,
    },
    [mq.under.tablet]: {
      fontSize: 36,
    }
  },
  info: {
    display: "grid",
    gridTemplateColumns: "2fr 1fr 1fr",
    gridTemplateRows: "1fr",
    gridTemplateAreas:
      "\"description . info\"",
    gridGap: 60,

    [mq.under.laptop]: {
      gridTemplateColumns: "1fr 1fr",
      gridTemplateRows: "1fr",
      gridTemplateAreas:
        "\"description info\"",
    },
    [mq.under.tablet]: {
      gridTemplateColumns: "1fr",
      gridTemplateRows: "1fr auto",
      gridTemplateAreas:
        `"info"
        "description"`,
      gridGap: 30,
    }
  },
  text: {
    fontFamily: "anivers",
    fontSize: 28,
    gridArea: "description",
    display: "flex",

    [mq.under.tablet]: {
      fontSize: 18
    }
  },
  stats: {
    gridArea: "info",
    display: "flex",
    flexDirection: "column",
    gap: 3,

    [mq.under.tablet]: {
      gap: 1
    }
  },
  stat: {
    flex: 1,
    display: "flex",
    flexDirection: "column",
  },
  statTitle: {
    fontSize: 24,
    fontWeight: 100,
    textTransform: "lowercase",

    [mq.under.tablet]: {
      fontSize: 16
    }
  },
  statText: {
    fontFamily: "anivers",
    fontSize: 21,

    [mq.under.tablet]: {
      fontSize: 14
    }
  },
  statLink: {
    fontFamily: "anivers",
    fontSize: 21,
    display: "flex",
    alignItems: "center",
    color: "primary.500",
    "&:hover": {
      color: "primary.600"
    },
    textDecoration: "none",

    [mq.under.tablet]: {
      fontSize: 14
    }
  },
  statIcon: {
    strokeWidth: 1.5
  },

  splash: {
    display: "flex",
    justifyContent: "center"
  },

  nextProjectLink: {
    margin: "0 auto",

    transition: transition("color"),
    fontSize: 36,
    fontWeight: 100,
    textTransform: "uppercase",
    textDecoration: "none",
    display: "flex",
    alignItems: "flex-start",
    gap: 1,
    "&:hover": {
      color: "primary.600"
    },

    [mq.under.tablet]: {
      fontSize: 24,
    }
  },
  nextProjectIcon: {
    position: "relative",
    top: "3px",
    strokeWidth: 1
  }
}

const Project = async ({
  params: {
    slug,
    locale,
  }
}: ProjectProps) => {
  unstable_setRequestLocale(matchLocale(locale))

  const data = await api(project, {
    variables: {
      slug,
      locale
    },
  })

  if (data.project === null) notFound()

  const {
    portfolio: {
      servicesTitle,
      dateTitle,
      toolsTitle,
      clientTitle,
      urlTitle,
      returnToPortfolioButton,
      wip
    },
    project: {
      urls,
      categories,
      tools,
      title,
      text,
      splash,
      optionalText,
      gallery,
      date,
      client,
    }
  } = data

  const isWip = categories.find(category => category.id === wip.id) !== undefined

  const stats: string[][] = [
    [servicesTitle, categories.filter(category => category.id !== wip.id).map(category => category.title).join(", ")],
    [dateTitle, date.map(dateRange => localiseDate(dateRange.start, locale) + (dateRange.end ? ` — ${localiseDate(dateRange.end, locale)}` : "")).join(", ")],
    [toolsTitle, tools.map(tool => tool.title).join(", ")],
  ]

  return (
    <Section
      maxWidth="1480px"
      sx={style.container}
    >
      <Box sx={style.header}>
        <Typography sx={style.title}>
          {title}
        </Typography>

        <Box sx={style.info}>
          <ExtendedTypography sx={style.text}>
            {text}
          </ExtendedTypography>

          <Box sx={style.stats}>
            {isWip && <StatsWip wip={wip} />}

            {stats.map(([title, content]) => (
              <Box
                key={title}
                sx={style.stat}
              >
                <Typography sx={style.statTitle}>
                  {title}
                </Typography>

                <Typography sx={style.statText}>
                  {content}
                </Typography>
              </Box>
            ))}

            {client && (
              <Box sx={style.stat}>
                <Typography sx={style.statTitle}>
                  {clientTitle}
                </Typography>

                {client.url ? (
                  <Typography
                    component={Link}
                    href={client.url}
                    fontFamily="anivers"
                    fontSize={21}
                    sx={style.statLink}
                  >
                    {client.name}
                    <LinkArrow sx={style.statIcon} />
                  </Typography>
                ) : (
                  <Typography sx={style.statText}>
                    {client.name}
                  </Typography>
                )}
              </Box>
            )}

            {urls.length > 0 && (
              <Box sx={style.stat}>
                <Typography sx={style.statTitle}>
                  {urlTitle}
                </Typography>

                {urls.map(({ title, url }) => (
                  <Typography
                    key={url}
                    component={Link}
                    href={url}
                    sx={style.statLink}
                  >
                    {title}
                    <LinkArrow sx={style.statIcon} />

                  </Typography>
                ))}
              </Box>
            )}
          </Box>
        </Box>
      </Box>

      <Box sx={style.splash}>
        <DatoImage data={splash.responsiveImage} />
      </Box>

      <OptionalSection optionalText={optionalText} />

      <Gallery gallery={gallery} />

      <Typography
        component={Link}
        href="/portfolio"
        sx={style.nextProjectLink}
      >
        {returnToPortfolioButton}

        <LinkArrow sx={style.nextProjectIcon} />
      </Typography>
    </Section >
  )
}

export default Project
