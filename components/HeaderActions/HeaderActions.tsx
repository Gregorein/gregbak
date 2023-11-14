import { Box } from "@mui/joy"
import SocialLink from "components/SocialLink/SocialLink"
import { Cookie, FileCode2 } from "lucide-react"
import NavThemeToggle from "components/NavThemeToggle/NavThemeToggle"
import NavLanguageMenu from "components/NavLanguageMenu/NavLanguageMenu"

const HeaderActions = () => (
  <Box
    component="nav"
    sx={{
      display: "flex",
      gap: 3
    }}
  >
    <SocialLink href="/policy" title="__policy__" icon={<Cookie />} />
    <SocialLink href="https://github.com/Gregorein/gregbak" title="__code__" icon={<FileCode2 />} />
    <NavThemeToggle titleOn="ON" titleOff="OFF" />
    <NavLanguageMenu />
  </Box>
)

export default HeaderActions
