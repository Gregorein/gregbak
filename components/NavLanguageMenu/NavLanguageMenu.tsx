"use client"

import { Dropdown, Menu, MenuItem, Box, Tooltip, MenuButton } from "@mui/joy"
import { Languages } from "lucide-react"
import { transition } from "theme/utils"

type NavLanguageMenuProps = {
  title: string
  langs?: string[]
}

const NavLanguageMenu = ({
  title
}: NavLanguageMenuProps) => {

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
        <Tooltip title={title} variant="solid" arrow>
          <Languages />
        </Tooltip>
      </MenuButton>
      <Menu
        placement="bottom-end"
      >
        <MenuItem>__lang_1__</MenuItem>
        <MenuItem>__lang_2__</MenuItem>
        <MenuItem>__lang_3__</MenuItem>
      </Menu>
    </Dropdown>
  )
}

export default NavLanguageMenu
