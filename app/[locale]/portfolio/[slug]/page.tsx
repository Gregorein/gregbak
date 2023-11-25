import Section from "components/Section/Section"
import api from "util/datocms"

import { unstable_setRequestLocale } from "next-intl/server"

import project from "queries/Project/project.gql"
import config from "queries/Project/config.gql"
import { Box, Typography } from "@mui/joy"
import ExtendedTypography from "components/ExtendedTypography/ExtendedTypography"
import Link from "next/link"
import { ArrowUpRight, Undo2 } from "lucide-react"
import localiseDate from "util/localiseDate"
import { transition } from "theme/utils"
import { Image as DatoImage } from "react-datocms"
import Gallery from "sections/Project/Gallery/Gallery"
import OptionalSection from "sections/Project/OptionalSection/OptionalSection"
import StatsURL from "sections/Project/StatsURL/StatsURL"
import StatsClient from "sections/Project/StatsClient/StatsClient"
import StatsGeneric from "sections/Project/StatsGeneric/StatsGeneric"
import StatsWip from "sections/Project/StatsWip/StatsWip"
import { locales, matchLocale } from "i18n"

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
  const {
    project: {
      title
    },
    portfolio: {
      title: portfolioTitle
    }
  } = await api(config, {
    variables: {
      slug,
      locale
    }
  })

  return {
    title: `${title} | ${portfolioTitle}`
  }
}

const Project = async ({
  params: {
    slug,
    locale,
  }
}: ProjectProps) => {
  unstable_setRequestLocale(matchLocale(locale))

  const {
    portfolio: {
      servicesTitle,
      dateTitle,
      toolsTitle,
      clientTitle,
      urlTitle,
      returnToPortfolioButton,
      nextProjectButton,
      wip
    },
    project: {
      url,
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
  } = await api(project, {
    variables: {
      slug,
      locale
    },
  })

  const isWip = categories.find(category => category.id === wip.id) !== undefined

  const stats: string[][] = [
    [servicesTitle, categories.filter(category => category.id !== wip.id).map(category => category.title).join(", ")],
    [dateTitle, date.map(dateRange => localiseDate(dateRange.start) + (dateRange.end ? ` — ${localiseDate(dateRange.end)}` : "")).join(", ")],
    [toolsTitle, tools.map(tool => tool.title).join(", ")],
  ]

  return (
    <Section
      maxWidth="1480px"
      sx={{
        gap: 6,
        paddingBottom: 6
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: 3
        }}
      >
        <Box
          sx={{
            position: "relative"
          }}
        >
          <Typography
            component={Link}
            href="/portfolio"
            fontSize={28}
            fontWeight={100}
            textTransform="uppercase"
            sx={{
              display: "flex",
              gap: 1.5,
              alignItems: "center",
              position: "absolute",
              left: -30,
              top: "50%",
              transform: "translate(-100%, -50%)",
              color: "primary.500",
              textDecoration: "none"
            }}
          >{returnToPortfolioButton}<Undo2 /></Typography>

          <Typography
            sx={{
              color: "primary.500"
            }}
            fontSize={72}
            fontWeight={800}
          >
            {title}
          </Typography>
        </Box>

        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: "2fr 1fr 1fr",
            gridTemplateRows: "1fr",
            gridTemplateAreas:
              "\"description . info\"",
            gridGap: 6,
          }}
        >
          <ExtendedTypography
            fontFamily="anivers"
            fontSize={28}
            sx={{
              gridArea: "description",
              display: "flex"
            }}
          >
            {text}
          </ExtendedTypography>

          <Box
            sx={{
              gridArea: "info",
              display: "flex",
              flexDirection: "column",
              gap: 3
            }}
          >
            {isWip && <StatsWip wip={wip} />}

            <StatsGeneric stats={stats} />

            <StatsClient
              client={client}
              clientTitle={clientTitle}
            />

            <StatsURL
              url={url}
              urlTitle={urlTitle}
            />
          </Box>
        </Box>
      </Box>

      <Box
        sx={{
          display: "flex",
          justifyContent: "center"
        }}
      >
        <DatoImage data={splash.responsiveImage} />
      </Box>

      <OptionalSection optionalText={optionalText} />

      <Gallery gallery={gallery} />

      <Typography
        component={Link}
        href=""
        sx={{
          margin: "0 auto",
          cursor: "pointer",
          transition: transition("color"),
          display: "flex",
          gap: 2,
          color: "primary.500",
          "&:hover": {
            color: "primary.600"
          },
          textDecoration: "none"
        }}
        fontSize={36}
        fontWeight={100}
        textTransform="uppercase"
      >
        {nextProjectButton}

        <ArrowUpRight
          size={48}
          strokeWidth={1}
          style={{
            position: "relative",
            top: "3px"
          }}
        />
      </Typography>
    </Section >
  )
}

export default Project
