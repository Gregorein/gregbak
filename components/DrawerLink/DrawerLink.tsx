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
  callback?: () => void
}

export const DrawerLink = ({
  href,
  icon,
  title,
  external = false,
  scroll = true,
  callback
}: DrawerLinkProps) => (
  <Typography
    component={Link}
    href={href}
    target={external ? "_blank" : "_self"}
    rel={external ? "noopener noreferrer" : ""}
    scroll={scroll}
    onClick={callback}
    fontSize={21}
    sx={{
      transition: transition("color"),
      display: "flex",
      gap: 1,
      alignItems: "center",
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
