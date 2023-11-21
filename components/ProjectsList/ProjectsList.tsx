"use client"

import type { Theme } from "@mui/joy"
import { Box, Chip, Typography } from "@mui/joy"
import { useState } from "react"
import intersection from "lodash/intersection"
import Link from "next/link"
import { Image as DatoImage } from "react-datocms"

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
    }[]
    date: {
      start: string
      end: string
    }[]
  }[]
}

const ProjectsList = ({
  filters,
  projects
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

  const handleToggleFilter = (i: number) => {
    if (i === 0) {
      setActiveFilters([])
      return
    }

    if (!activeFilters.includes(filters[i].title)) {
      setActiveFilters([
        ...activeFilters,
        filters[i].title
      ])
    } else {
      setActiveFilters(activeFilters.filter(activeFilter => activeFilter !== filters[i].title))
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
        {filters.map((filter, i) => {
          const isActive = (
            i === 0 && activeFilters.length === 0 ||
            i !== 0 && activeFilters.includes(filter.title)
          )

          return (
            <Chip
              key={filter.title}
              variant={isActive ? "solid" : "plain"}
              color={isActive ? "primary" : "neutral"}
              onClick={() => handleToggleFilter(i)}
            >
              {filter.title}
            </Chip>
          )
        })}
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
              textDecoration: "none"
            }}
          >
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
              {project.categories.map(category => (
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
