import { Box } from "@mui/joy"
import HeaderActions from "components/HeaderActions/HeaderActions"
import LogoLink from "components/LogoLink/LogoLink"
import NavigationMain from "components/NavigationMain/NavigationMain"
import NavigationSocial from "components/NavigationSocial/NavigationSocial"

type HeaderProps = {
  labels: {
    navContact: string
    navResume: string
    navPortfolio: string

    socialMail: string
    socialLinkedin: string
    socialGithub: string
    socialDribble: string

    cookiesButton: string
    codeButton: string
    uiToggle: {
      text: string
    }[]
    languagesMenu: string
  }
}

const Header = ({
  labels: {
    navContact,
    navResume,
    navPortfolio,

    socialMail,
    socialLinkedin,
    socialGithub,
    socialDribble,

    cookiesButton,
    codeButton,
    uiToggle,
    languagesMenu
  }
}: HeaderProps) => (
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
      zIndex: 9001,
      backdropFilter: "blur(50px)"
    }}
  >
    <LogoLink />

    <NavigationMain
      labels={{
        navContact,
        navResume,
        navPortfolio
      }}
    />

    <NavigationSocial
      labels={{
        socialMail,
        socialLinkedin,
        socialGithub,
        socialDribble
      }}
    />

    <HeaderActions
      labels={{
        cookiesButton,
        codeButton,
        uiToggle,
        languagesMenu
      }}
    />
  </Box>
)
export default Header