import { Box } from "@mui/joy"
import HeaderActions from "components/HeaderActions/HeaderActions"
import LogoLink from "components/LogoLink/LogoLink"
import NavigationMain from "components/NavigationMain/NavigationMain"
import NavigationSocial from "components/NavigationSocial/NavigationSocial"

const Header = () => (
  <Box
    component="header"
    sx={{
      display: "flex",
      padding: 3,
      gap: 6,
      position: "fixed",
      top: 0,
      left: 0,
      right: 0,
      zIndex: 1,
      backdropFilter: "blur(10px)"
    }}
  >
    <LogoLink />

    <NavigationMain />

    <NavigationSocial />

    <HeaderActions />
  </Box>
)
export default Header