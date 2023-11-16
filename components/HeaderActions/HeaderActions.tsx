import { Box } from "@mui/joy"
import SocialLink from "components/SocialLink/SocialLink"
import { Cookie, FileCode2 } from "lucide-react"
import NavThemeToggle from "components/NavThemeToggle/NavThemeToggle"
import NavLanguageMenu from "components/NavLanguageMenu/NavLanguageMenu"

type HeaderActionsProps = {
  labels: {
    cookiesButton: string
    codeButton: string
    uiToggle: {
      text: string
    }[]
    languagesMenu: string
  }
}

const HeaderActions = ({
  labels: {
    cookiesButton,
    codeButton,
    uiToggle,
    languagesMenu,
  }
}: HeaderActionsProps) => (
  <Box
    component="nav"
    sx={{
      display: "flex",
      gap: 3
    }}
  >
    <SocialLink href="/policy" title={cookiesButton} icon={<Cookie />} />
    <SocialLink href="https://github.com/Gregorein/gregbak" title={codeButton} icon={<FileCode2 />} />
    <NavThemeToggle titleOn={uiToggle[0].text} titleOff={uiToggle[1].text} />
    <NavLanguageMenu title={languagesMenu} />
  </Box>
)

export default HeaderActions
