"use client"

import type { Theme } from "@mui/joy"
import { Box, Chip, Typography } from "@mui/joy"
import { useState } from "react"
import intersection from "lodash/intersection"
import Link from "next/link"
import { Image as DatoImage } from "react-datocms"
import { TrafficCone, X } from "lucide-react"

type ProjectsListProps = {
  filters: {
    title: string
  }[],
  projects: {
    splash: {
      responsiveImage: object
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
  }[]
  wip: {
    title: string
    id: string
  }
}

const ProjectsList = ({
  filters: [
    filterAll,
    filterWip,
    ...filters
  ],
  projects,
  wip
}: ProjectsListProps) => {
  const [activeFilters, setActiveFilters] = useState<string[]>([])

  // useEffect(() => {
  // TODO: hook up the filters to the queryparams for bookmarking and ux
  // }, [activeFilters])

  const filteredProjects = activeFilters.length === 0
    ? projects
    : projects.filter(project => intersection(activeFilters, project.categories.map(category => category.title)).length > 0)

  const sortedProjects = filteredProjects.sort((a, b) => {

    const aDate = a.date[a.date.length - 1]
    const bDate = b.date[b.date.length - 1]

    if ((aDate.start || aDate.end) < (bDate.start || bDate.end)) {
      return 1
    }
    return -1
  })

  const handleToggleFilter = (filter: string) => {
    if (!activeFilters.includes(filter)) {
      setActiveFilters([
        ...activeFilters,
        filter
      ])
    } else {
      setActiveFilters(activeFilters.filter(activeFilter => activeFilter !== filter))
    }
  }

  return (
    <>
      <Box
        sx={{
          display: "flex",
          gap: 1
        }}
      >
        <Chip
          color="primary"
          onClick={() => setActiveFilters([])}
        >
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              gap: .5,
            }}
          >
            <X
              size={16}
              strokeWidth={1.5}
              absoluteStrokeWidth
            />
            {filterAll.title}
          </Box>
        </Chip>

        <Chip
          onClick={() => handleToggleFilter(filterWip.title)}
          variant={activeFilters.includes(filterWip.title) ? "solid" : "plain"}
        >
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              gap: .5
            }}
          >
            <TrafficCone size={16} />
            {filterWip.title}
          </Box>
        </Chip>

        {filters.map((filter) => (
          <Chip
            key={filter.title}
            variant={activeFilters.includes(filter.title) ? "solid" : "plain"}
            color={activeFilters.includes(filter.title) ? "primary" : "neutral"}
            onClick={() => handleToggleFilter(filter.title)}
          >
            {filter.title}
          </Chip>
        ))}
      </Box>

      <Box
        sx={{
          display: "grid",
          gridGap: 60,
          gridTemplateColumns: "1fr 1fr 1fr 1fr",
          gridAutoRows: "min(710px, 1fr)"
        }}
      >
        {sortedProjects.map(project => (
          <Box
            key={project.title}
            component={Link}
            href={`/portfolio/${project.slug}`}
            sx={{
              display: "flex",
              flexDirection: "column",
              gap: 1.5,
              textDecoration: "none",
              position: "relative"
            }}
          >
            {project.categories.find(category => category.id === wip.id) !== undefined && (
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
              sx={(theme: Theme) => ({
                aspectRatio: "1 / 1",
                backgroundColor: theme.palette.background.level1
              })}
            >
              <DatoImage data={project.splash.responsiveImage} />
            </Box>

            <Box
              sx={{
                display: "flex",
                flexWrap: "wrap",
                gap: 1
              }}
            >
              {project.categories.filter(category => category.id !== wip.id).map(category => (
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
              {project.title}
            </Typography>
          </Box>
        ))}
      </Box>
    </>
  )
}

export default ProjectsList
