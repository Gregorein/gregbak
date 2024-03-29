"use client"

import { Box, Typography } from "@mui/joy"
import { useEffect, useState } from "react"
import { transition } from "theme/utils"
import useDebounce from "util/useDebounce"

type LinksProps = {
  links: string[]
  callback?: () => void
}

const Links = ({
  links,
  callback,
}: LinksProps) => {
  const [visibleLinks, setVisibleLinks] = useState<string[]>([])

  const handleScrollCheck = () => {
    setVisibleLinks(
      links.filter(link => {
        const bounds = document.getElementById(link).getBoundingClientRect()

        return (
          // clipped bottom
          (bounds.bottom >= 120 && bounds.bottom <= window.innerHeight) ||
          // visible
          (bounds.top >= 0 && bounds.bottom <= window.innerHeight) ||
          // clipped top
          (bounds.top >= 0 && bounds.top <= window.innerHeight - 120) ||
          // covering everything
          (bounds.top < 0 && bounds.bottom >= window.innerHeight)
        )
      })
    )
  }
  const debouncedScrollCheck = useDebounce(handleScrollCheck, 100)

  const handleScrollTo = (target: string) => {
    const element = document.getElementById(target)

    const top = (-document.body.getBoundingClientRect().top + element.getBoundingClientRect().top) - 120

    element && window.scrollTo({
      behavior: "smooth",
      top
    })

    callback && callback()
  }

  useEffect(() => {
    handleScrollCheck()

    window.addEventListener("scroll", debouncedScrollCheck)

    return () => {
      window.removeEventListener("scroll", debouncedScrollCheck)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <Box
      component="nav"
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: 1
      }}
    >
      {links.map(link => (
        <Typography
          fontSize={24}
          fontFamily="europa"
          key={link}
          onClick={() => handleScrollTo(link)}
          sx={{
            transition: transition("color"),
            cursor: "pointer",
            color: visibleLinks.includes(link) ? "primary.500" : "text.primary",
            "&:hover": {
              color: "primary.600"
            }
          }}
        >
          {link}
        </Typography>
      ))}
    </Box>
  )
}

export default Links
