"use client"

import { Skeleton } from "@mui/joy"
import { Typography } from "@mui/joy"
import { Box, Chip } from "@mui/joy"
import { TrafficCone } from "lucide-react"
import Link from "next/link"
import { Image as DatoImage } from "react-datocms"
import mq from "theme/mediaQueries"
import useMounted from "util/useMounted"

type ProjectTileProps = {
  data: {
    splash: {
      responsiveImage: {
        [key: string]: string | number | boolean
        width: number
      }
    }
    slug: string
    title: string
    categories: {
      title: string
      id: string
    }[]
    date: {
      start: string
      end: string
    }[]
  }
  wip: {
    id: string
    title: string
  }
}

const style = {
  skeleton: {
    container: {
      display: "flex",
      flexDirection: "column",
      gap: 1.5,

      [mq.under.tablet]: {
        flexDirection: "row"
      }
    },
    image: {
      position: "relative",
      width: "unset",
      height: "unset",
      aspectRatio: "1 / 1",

      [mq.under.tablet]: {
        flex: 1,
      }
    },
    content: {
      display: "flex",
      flex: 2,
      flexDirection: "column",
      gap: 1.5,
    },
    text: {
      position: "relative",
      width: "unset",
      height: "unset"
    }
  },
  tile: {
    container: {
      display: "flex",
      flexDirection: "column",
      gap: 1.5,
      textDecoration: "none",
      position: "relative",

      [mq.under.tablet]: {
        flexDirection: "row",
        alignItems: "flex-start"
      }
    },
    image: {
      aspectRatio: "1 / 1",
      backgroundColor: "background.level1",

      [mq.under.tablet]: {
        flex: 1,
      }
    },
    content: {
      display: "flex",
      flex: 2,
      flexDirection: "column",
      gap: 1.5,
    },
    categories: {
      display: "flex",
      flexWrap: "wrap",
      gap: 1,

      [mq.under.tablet]: {
        order: 1,
      }
    },
    category: {
      [mq.under.tablet]: {
        fontSize: 12
      }
    },
    wip: {
      position: "absolute",
      zIndex: 1,
      top: 0,
      right: 0,
      transform: "translate(10px, -50%)",

      [mq.under.tablet]: {
        right: "unset",
        left: 0,
        transform: "translate(-10px, -50%)",
      }
    },
    title: {
      fontFamily: "anivers",
      fontSize: 28,
      fontWeight: 800,
      textTransform: "uppercase",

      [mq.under.tablet]: {
        fontSize: 24,
        order: 0,
      }
    }
  }
}

const ProjectTile = ({ data: {
  title,
  splash,
  slug,
  categories,
},
  wip
}: ProjectTileProps) => {
  const isMounted = useMounted()

  if (!isMounted) {
    return (
      <Box sx={style.skeleton.container}>
        <Skeleton
          sx={style.skeleton.image}
          animation="wave"
        />

        <Box sx={style.skeleton.content}>
          <Skeleton
            sx={style.skeleton.text}
            animation="wave"
          >
            <br />
          </Skeleton>

          <Skeleton
            sx={style.skeleton.text}
            animation="wave"
          >
            <br />
            <br />
          </Skeleton>
        </Box>
      </Box>
    )
  }

  return (
    <Box
      component={Link}
      href={`/portfolio/${slug}`}
      sx={style.tile.container}
    >
      {categories.find(category => category.id === wip.id) !== undefined && (
        <Chip
          variant="soft"
          sx={style.tile.wip}
        >
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              gap: .5
            }}
          >
            <TrafficCone size={16} />
            {wip.title}
          </Box>
        </Chip>
      )}

      <Box sx={style.tile.image}>
        <DatoImage data={splash.responsiveImage} />
      </Box>

      <Box sx={style.tile.content}>
        <Box
          sx={style.tile.categories}
        >
          {categories.filter(category => category.id !== wip.id).map(category => (
            <Chip
              key={category.title}
              variant="plain"
              sx={style.tile.category}
            >
              {category.title}
            </Chip>
          ))}
        </Box>

        <Typography sx={style.tile.title}>
          {title}
        </Typography>
      </Box>
    </Box>
  )
}

export default ProjectTile
