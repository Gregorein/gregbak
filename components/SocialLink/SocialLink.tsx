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
}

export const SocialLink = ({
  href,
  icon,
  title,
  secondary = false
}: SocialLinkProps) => (
  <Tooltip
    title={title}
    variant="solid"
    arrow
  >
    <Box
      component={Link}
      href={href}
      sx={{
        display: "flex",
        alignItems: "center"
      }}
      target="_blank"
      rel="noopener noreferrer"
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
