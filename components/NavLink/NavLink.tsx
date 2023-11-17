"use client"

import { Box, Typography } from "@mui/joy"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { transition } from "theme/utils"

type NavLinkProps = {
  href: string
  title: string
  scroll?: boolean
}

export const NavLink = ({
  href,
  title,
  scroll = true
}: NavLinkProps) => {
  const pathname = usePathname()

  return (
    <Box
      component={Link}
      href={href}
      scroll={scroll}
      sx={({
        display: "flex",
        gap: 3,
        height: 30,
        alignItems: "center",
        textDecoration: "none"
      })}
    >
      <Typography
        fontFamily="anivers"
        fontSize={18}
        sx={{
          transition: transition("color"),
          color: href.includes(pathname) && pathname !== "/" && "primary.500",
          "&:hover": {
            color: "primary.500"
          }
        }}
      >
        {title}
      </Typography>
    </Box>
  )
}

export default NavLink