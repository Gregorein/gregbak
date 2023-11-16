import { Box } from "@mui/joy"
import NavLink from "components/NavLink/NavLink"

type NavigationMainProps = {
  labels: {
    navContact: string
    navResume: string
    navPortfolio: string
  }
}

const NavigationMain = ({
  labels: {
    navContact,
    navResume,
    navPortfolio
  }
}: NavigationMainProps) => (
  <Box
    component="nav"
    sx={{
      flex: 1,
      display: "flex",
      gap: 3
    }}
  >
    <NavLink href="/portfolio" title={navPortfolio} />
    <NavLink href="/resume" title={navResume} />
    <NavLink href="?contact" title={navContact} scroll={false} />
  </Box>
)

export default NavigationMain
