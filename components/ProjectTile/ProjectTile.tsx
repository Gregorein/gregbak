import { Skeleton } from "@mui/joy"
import { Typography } from "@mui/joy"
import { Box, Chip } from "@mui/joy"
import { TrafficCone } from "lucide-react"
import Link from "next/link"
import { Image as DatoImage } from "react-datocms"
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
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: 1.5,
          textDecoration: "none"
        }}
      >
        <Skeleton
          sx={{
            position: "relative",
            width: "unset",
            height: "unset",
            aspectRatio: "1 / 1"
          }}
          animation="wave"
        />

        <Skeleton
          sx={{
            position: "relative",
            width: "unset",
            height: "unset"
          }}
          animation="wave"
        >
          <br />
        </Skeleton>

        <Skeleton
          sx={{
            position: "relative",
            width: "unset",
            height: "unset"
          }}
          animation="wave"
        >
          <br />
          <br />
        </Skeleton>
      </Box>
    )
  }

  return (
    <Box
      component={Link}
      href={`/portfolio/${slug}`}
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: 1.5,
        textDecoration: "none",
        position: "relative"
      }}
    >
      {categories.find(category => category.id === wip.id) !== undefined && (
        <Chip
          variant="soft"
          sx={{
            position: "absolute",
            zIndex: 1,
            top: 0,
            right: 0,
            transform: "translate(10px, -50%)"
          }}
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

      <Box
        sx={{
          aspectRatio: "1 / 1",
          backgroundColor: "background.level1"
        }}
      >
        <DatoImage data={splash.responsiveImage} />
      </Box>

      <Box
        sx={{
          display: "flex",
          flexWrap: "wrap",
          gap: 1
        }}
      >
        {categories.filter(category => category.id !== wip.id).map(category => (
          <Chip
            key={category.title}
            variant="plain"
          >
            {category.title}
          </Chip>
        ))}
      </Box>

      <Typography
        fontFamily="anivers"
        fontSize={28}
        fontWeight={800}
        textTransform="uppercase"
      >
        {title}
      </Typography>
    </Box>
  )
}

export default ProjectTile
