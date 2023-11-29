import { Box } from "@mui/joy"
import NavLink from "components/NavLink/NavLink"

type NavigationMainProps = {
  labels: {
    navResume: string
    navPortfolio: string
  }
}

const NavigationMain = ({
  labels: {
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
    <NavLink
      href="/resume"
      title={navResume}
    />
    <NavLink
      href="/portfolio"
      title={navPortfolio}
    // badge="" // TODO add unseen projects badge 
    />
  </Box>
)

export default NavigationMain
