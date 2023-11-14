import { Box } from "@mui/joy"
import NavLink from "components/NavLink/NavLink"

const NavigationMain = () => (
  <Box
    component="nav"
    sx={{
      flex: 1,
      display: "flex",
      gap: 3
    }}
  >
    <NavLink href="/portfolio" title="__portfolio__" />
    <NavLink href="/resume" title="__resume__" />
    <NavLink href="?contact" title="__contact__" />
  </Box>
)

export default NavigationMain
