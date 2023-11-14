"use client"

import { MenuButton } from "@mui/base"
import { Dropdown, Menu, MenuItem, Box } from "@mui/joy"
import { Languages } from "lucide-react"
import { transition } from "theme/utils"

type NavLanguageMenuProps = {
  langs?: string[]
}

const NavLanguageMenu = () => {

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
        <Languages />
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
