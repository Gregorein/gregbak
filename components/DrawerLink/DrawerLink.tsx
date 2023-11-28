import { Typography } from "@mui/joy"
import Link from "next/link"
import type { ReactNode } from "react"
import { transition } from "theme/utils"

type DrawerLinkProps = {
  href: string
  title: string
  icon?: ReactNode
  scroll?: boolean
  external?: boolean
}

export const DrawerLink = ({
  href,
  icon,
  title,
  external = false,
  scroll = true
}: DrawerLinkProps) => (
  <Typography
    component={Link}
    href={href}
    target={external ? "_blank" : "_self"}
    rel={external ? "noopener noreferrer" : ""}
    scroll={scroll}
    sx={{
      display: "flex",
      gap: 1,
      transition: transition("color"),
      textDecoration: "none",
      color: "primary.500",
      "&:hover": {
        color: "primary.50"
      }
    }}
  >
    {icon}{title}
  </Typography>
)

export default DrawerLink
