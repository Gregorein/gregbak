"use client"

import { Box, Typography } from "@mui/joy"
import Logo from "assets/icons/logo"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { transition } from "theme/utils"

const LogoLink = () => {
  const pathname = usePathname()

  return (
    <Box
      component={Link}
      href="/"
      sx={({
        marginRight: 3,
        textDecoration: "none",
      })}
    >
      <Typography
        fontFamily="anivers"
        fontSize={21}
        sx={{
          transition: transition("color"),
          display: "flex",
          gap: 3,
          alignItems: "center",
          color: pathname === "/" && "primary.500",
          "&:hover": {
            color: "primary.500"
          }
        }}
      >
        <Logo />
        <Typography>
          gregbak
        </Typography>
      </Typography>
    </Box>
  )
}

export default LogoLink
