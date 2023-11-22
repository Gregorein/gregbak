import { Button, Tooltip } from "@mui/joy"
import type { ReactNode } from "react"
import { transition } from "theme/utils"

type NavActionProps = {
  onClick: () => void
  title: string
  icon: ReactNode
}

export const NavAction = ({
  onClick,
  icon,
  title,
}: NavActionProps) => (
  <Tooltip
    title={title}
    variant="solid"
    arrow
  >
    <Button
      onClick={onClick}
      sx={({
        transition: transition("color"),
        "&:hover": {
          color: "primary.500"
        }
      })}
    >
      {icon}
    </Button>
  </Tooltip>
)

export default NavAction
