"use client"

import { Box, Typography } from "@mui/joy"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { transition } from "theme/utils"

type NavLinkProps = {
  href: string
  title: string
}

export const NavLink = ({
  href,
  title
}: NavLinkProps) => {
  const pathname = usePathname()

  return (
    <Box
      component={Link}
      href={href}
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
        fontSize="18px"
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