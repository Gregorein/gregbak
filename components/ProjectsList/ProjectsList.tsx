"use client"

import { Box, Chip } from "@mui/joy"
import { useState } from "react"
import intersection from "lodash/intersection"
import { TrafficCone, X } from "lucide-react"
import ProjectTile from "components/ProjectTile/ProjectTile"
import mq from "theme/mediaQueries"

type ProjectsListProps = {
  filters: {
    title: string
  }[],
  projects: {
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
  }[]
  wip: {
    title: string
    id: string
  }
}

const style = {
  filters: {
    display: "flex",
    flexWrap: "wrap",
    gap: 1
  },
  filter: {
    display: "flex",
    alignItems: "center",
    gap: .5,
  },
  grid: {
    display: "grid",
    gridGap: 60,
    gridTemplateColumns: "repeat(4, 1fr)",
    gridAutoRows: "min(710px, 1fr)",

    [mq.under.laptop]: {
      gridTemplateColumns: "repeat(3, 1fr)",
      gridGap: 30
    },
    [mq.under.tablet]: {
      gridTemplateColumns: "1fr"
    }
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
      <Box sx={style.filters}>
        <Chip
          color="primary"
          onClick={() => setActiveFilters([])}
        >
          <Box sx={style.filter}>
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
          <Box sx={style.filter}>
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

      <Box sx={style.grid}>
        {sortedProjects.map((project) => (
          <ProjectTile
            key={project.title}
            data={project}
            wip={wip}
          />
        ))}
      </Box>
    </>
  )
}

export default ProjectsList
