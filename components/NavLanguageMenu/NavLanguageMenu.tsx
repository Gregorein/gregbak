"use client"

import { Dropdown, Menu, MenuItem, Box, Tooltip, MenuButton, Typography } from "@mui/joy"
import { Languages } from "lucide-react"
import Link from "next/link"
import { usePathname } from "next/navigation"
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
  const path = usePathname().slice(3)

  return (
    <Dropdown>
      <MenuButton
        slots={{
          root: Box
        }}
        slotProps={{
          root: {
            variant: "plain",
            sx: {
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              transition: transition("color"),
              "&:hover": {
                color: "primary.500"
              }
            }
          }
        }}
      >
        <Tooltip
          title={title}
          variant="solid"
          arrow
        >
          <Languages />
        </Tooltip>
      </MenuButton>
      <Menu placement="bottom-end">
        {locales.map(({ title, code }) => (
          <MenuItem key={code}>
            <Typography
              component={Link}
              href={`/${code}${path}`}
              locale={code}
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
