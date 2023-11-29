"use client"

import { Box, Button, Drawer, Link, Typography } from "@mui/joy"
import { FileBadge } from "lucide-react"
import { useEffect, useRef, useState } from "react"
import mq from "theme/mediaQueries"
import { transition } from "theme/utils"
import useMediaQuery from "util/useMediaQuery"
import Links from "./Links"

type NavigationAsideProps = {
  aboutSlug: string
  awardsSlug: string
  contributionsSlug: string
  cvButton: string
  cvUrl: string
  experienceSlug: string
  projectsSlug: string
  skillsSlug: string
  testimonialsSlug: string
  toolsSlug: string
  navigationButton: string
}

const style = {
  vertical: {
    position: "fixed",
    right: "50%",
    transform: "translate(-640px, 50%)",
    display: "flex",
    flexDirection: "column",
    gap: 3,
  },
  horizontal: {
    position: "fixed",
    top: 90,
    left: 0,
    right: 0,
    zIndex: 1000,

    display: "flex",
    justifyContent: "space-between",
    p: 1,

    // background: "blue"
    backdropFilter: "brightness( var(--palette-background-header) ) blur(50px)",
  },
  menu: {
    height: "100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center"
  },

  cvButton: {
    transition: transition("color"),
    display: "flex",
    gap: 2,
    alignItems: "center",
    color: "primary.500",
    "&:hover": {
      color: "primary.600"
    },
    textDecoration: "none",
    fontSize: 24,
    fontFamily: "europa",

    [mq.under.tablet]: {
      fontSize: 14,
      gap: 1,
    }
  },
}

const NavigationAside = ({ aboutSlug, awardsSlug, contributionsSlug, cvButton, cvUrl, experienceSlug, projectsSlug, skillsSlug, testimonialsSlug, toolsSlug, navigationButton }: NavigationAsideProps) => {
  // using this instead of position sticky because it doesn't fit properly in this layout
  const [bottom, updateBottom] = useState("50%")
  const asideRef = useRef<HTMLBaseElement>(null)
  const calculateBottom = () => {
    if (!asideRef.current) {
      return
    }

    const diff =
      (window.scrollY + (window.innerHeight + asideRef.current.clientHeight) / 2) -
      asideRef.current.parentElement.clientHeight

    if (diff > 0) {
      updateBottom(`calc(50% + ${diff}px)`)
      return
    }
    if (bottom !== "50%") {
      updateBottom("50%")
    }
  }
  useEffect(() => {
    window.addEventListener("scroll", calculateBottom)
    calculateBottom()

    return () => {
      window.removeEventListener("scroll", calculateBottom)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const width = useMediaQuery()
  const [open, setOpen] = useState(false)
  const toggleNavigation = () => setOpen(!open)
  const hideDrawer = () => setOpen(false)

  return width.under.desktop ? (
    <>
      <Box
        component="aside"
        sx={style.horizontal}
      >
        <Typography
          component={Link}
          href={cvUrl}
          sx={style.cvButton}
        >
          {cvButton}<FileBadge />
        </Typography>

        <Button
          size="sm"
          variant="plain"
          onClick={toggleNavigation}
        >
          {navigationButton}
        </Button>
      </Box>

      <Drawer
        open={open}
        onClose={hideDrawer}
        anchor="right"
      >
        <Box sx={style.menu}>
          <Links
            links={[
              aboutSlug,
              awardsSlug,
              contributionsSlug,
              projectsSlug,
              skillsSlug,
              toolsSlug,
              testimonialsSlug,
              experienceSlug,
            ]}
            callback={hideDrawer}
          />
        </Box>
      </Drawer>
    </>
  ) : (
    <Box
      ref={asideRef}
      component="aside"
      sx={{
        ...style.vertical,
        bottom,
      }}
    >
      <Links
        links={[
          aboutSlug,
          awardsSlug,
          contributionsSlug,
          projectsSlug,
          skillsSlug,
          toolsSlug,
          testimonialsSlug,
          experienceSlug,
        ]}
      />

      <Typography
        component={Link}
        href={cvUrl}
        sx={style.cvButton}
      >
        {cvButton}<FileBadge />
      </Typography>
    </Box>
  )
}

export default NavigationAside
