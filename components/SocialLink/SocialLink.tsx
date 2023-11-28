import { Tooltip, Typography } from "@mui/joy"
import Box from "@mui/joy/Box"
import Link from "next/link"
import type { ReactNode } from "react"
import { transition } from "theme/utils"

type SocialLinkProps = {
  href: string
  title: string
  icon: ReactNode
  secondary?: boolean
  external?: boolean
}

export const SocialLink = ({
  href,
  icon,
  title,
  secondary = false,
  external = true
}: SocialLinkProps) => (
  <Tooltip
    title={title}
    variant={secondary ? "plain" : "solid"}
    arrow
  >
    <Box
      component={Link}
      href={href}
      sx={{
        display: "flex",
        alignItems: "center"
      }}
      target={external ? "_blank" : "_self"}
      rel={external ? "noopener noreferrer" : ""}
    >
      <Typography
        sx={{
          display: "flex",
          transition: transition("color"),
          ...(secondary ? {
            color: "primary.200",
            "&:hover": {
              color: "primary.50"
            }
          } : {
            "&:hover": {
              color: "primary.500"
            }
          })
        }}
      >
        {icon}
      </Typography>
    </Box>
  </Tooltip>
)

export default SocialLink
