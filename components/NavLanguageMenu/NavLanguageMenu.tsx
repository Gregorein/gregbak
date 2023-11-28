"use client"

import { Dropdown, Menu, MenuItem, Tooltip, MenuButton, Typography } from "@mui/joy"
import { Languages } from "lucide-react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { useState } from "react"
import { transition } from "theme/utils"

type NavLanguageMenuProps = {
  title: string
  locales: {
    code: string
    title: string
  }[]
}

const NavLanguageMenu = ({
  title,
  locales
}: NavLanguageMenuProps) => {
  const path = usePathname()
  const parsedPath = path.match(/^\/(en|pl)/) ? path.slice(3) : path

  const [open, setOpen] = useState(false)
  const handleToggleOpen = () => setOpen(!open)

  return (
    <Dropdown
      open={open}
      onOpenChange={handleToggleOpen}
    >
      <MenuButton
        variant="plain"
        sx={{
          cursor: "pointer",
          display: "flex",
          padding: "unset",
          alignItems: "center",
          transition: transition("color"),
          background: "none",
          "&:hover": {
            color: "primary.500",
            background: "none"
          }
        }}
      >
        {open ? (
          <Languages />
        ) : (
          <Tooltip
            title={title}
            variant="solid"
            arrow
          >
            <Languages />
          </Tooltip>
        )}
      </MenuButton>
      <Menu
        placement="bottom-end"
        variant="soft"
      >
        {locales.map(({ title, code }) => (
          <MenuItem key={code}>
            <Typography
              component={Link}
              href={`/${code}${parsedPath}`}
              locale={code}
              sx={{
                width: "100%",
                textDecoration: "none"
              }}
              textAlign="right"
            >
              {title}
            </Typography>
          </MenuItem>
        ))}
      </Menu>
    </Dropdown>
  )
}

export default NavLanguageMenu
