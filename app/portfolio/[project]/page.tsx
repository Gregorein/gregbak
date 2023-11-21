import Section from "components/Section/Section"
import api from "util/datocms"

import projectQuery from "queries/Project/project.gql"
import { Box, Typography } from "@mui/joy"
import ExtendedTypography from "components/ExtendedTypography/ExtendedTypography"
import Link from "next/link"
import { ArrowUpRight, Undo2 } from "lucide-react"
import localiseDate from "util/localiseDate"
import { transition } from "theme/utils"
import { Image as DatoImage } from "react-datocms"
import ReactPlayer from "react-player"
import VideoPlayer from "components/VideoPlayer/VideoPlayer"

export const generateStaticParams = async () => {
  const { allProjects } = await api("query allProjectSlugs { allProjects { slug } }")

  return allProjects.map(({ slug }) => slug)
}

type ProjectProps = {
  params: {
    project: string
  }
}

const Project = async ({
  params
}: ProjectProps) => {
  const {
    portfolio: {
      servicesTitle,
      dateTitle,
      toolsTitle,
      clientTitle,
      urlTitle,
      returnToPortfolioButton,
      nextProjectButton,
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
  } = await api(projectQuery, {
    variables: {
      slug: params.project
    },
  })

  const stats = [
    [servicesTitle, categories.map(category => category.title).join(", ")],
    [dateTitle, date.map(dateRange => localiseDate(dateRange.start) + (dateRange.end ? ` — ${localiseDate(dateRange.end)}` : "")).join(", ")],
    [toolsTitle, tools.map(tool => tool.title).join(", ")],
  ]
  if (client) {
    stats.push([clientTitle, JSON.stringify(client)])
  }

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
          <Typography
            fontFamily="anivers"
            fontSize={28}
            sx={{
              gridArea: "description",
              display: "flex"
            }}
          >
            {text}
          </Typography>

          <Box
            sx={{
              gridArea: "info",
              display: "flex",
              flexDirection: "column",
              gap: 3
            }}
          >
            {stats.map(([title, content]) => (
              <Box
                key={title}
                sx={{
                  flex: 1,
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                <Typography
                  fontSize={24}
                  fontWeight={100}
                  textTransform="lowercase"
                >
                  {title}
                </Typography>

                <Typography
                  fontFamily="anivers"
                  fontSize={21}
                >
                  {content}
                </Typography>
              </Box>
            ))}

            {url && (
              <Box
                sx={{
                  flex: 1,
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                <Typography
                  fontSize={24}
                  fontWeight={100}
                  textTransform="lowercase"
                >
                  {urlTitle}
                </Typography>

                <Typography
                  component={Link}
                  href={url}
                  fontFamily="anivers"
                  fontSize={21}
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    gap: 1
                  }}
                >
                  {url}
                  <ArrowUpRight />
                </Typography>
              </Box>

            )}
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

      {optionalText.length > 0 && (
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gridAutoColumns: "1fr",
            gap: 3
          }}
        >
          {optionalText.map(({ title, text }) => (
            <Box
              key={title}
              sx={{
                display: "flex",
                flexDirection: "column",
                gap: 3
              }}
            >
              <Typography
                fontSize={48}
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
            </Box>
          ))}
        </Box>
      )}

      {gallery.length > 0 && (
        <Box
          sx={{
            display: "flex",
            flexWrap: "wrap",
            gap: 3,
            alignItems: "flex-start",
            justifyContent: "center",
          }}
        >
          {gallery.map(({
            mimeType,
            responsiveImage,
            video,
            blurhash,
            title,
            alt,
            height,
            width
          }, i) => (
            mimeType.includes("image") ? (
              <DatoImage
                key={i}
                data={responsiveImage}
              />
            ) : (
              <VideoPlayer
                key={i}
                video={video}
                blurhash={blurhash}
                title={title}
                alt={alt}
                height={height}
                width={width}
              />
            )
          ))}
        </Box>
      )}

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
