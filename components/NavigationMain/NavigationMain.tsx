"use client"

import { Badge, Box } from "@mui/joy"
import NavLink from "components/NavLink/NavLink"
import useProjectCounter from "util/useProjectCounter"

type NavigationMainProps = {
  labels: {
    navResume: string
    navPortfolio: string
  }
  projectCount: number
}

const NavigationMain = ({
  labels: {
    navResume,
    navPortfolio
  },
  projectCount
}: NavigationMainProps) => {
  const { count } = useProjectCounter()

  return (
    <Box
      component="nav"
      sx={{
        flex: 1,
        display: "flex",
        gap: 3
      }}
    >
      <NavLink
        href="/resume"
        title={navResume}
      />

      <Badge
        invisible={!count(projectCount)}
        badgeContent={count(projectCount)}
      >
        <NavLink
          href="/portfolio"
          title={navPortfolio}
        />
      </Badge >
    </Box>
  )
}

export default NavigationMain
