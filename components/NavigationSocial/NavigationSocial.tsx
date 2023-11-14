import { Box } from "@mui/joy"
import SocialLink from "components/SocialLink/SocialLink"
import { Dribbble, Github, Linkedin, MailIcon } from "lucide-react"

type NavigationSocialProps = {
  secondary?: boolean
}

const NavigationSocial = ({
  secondary = false
}: NavigationSocialProps) => (
  <Box
    component="nav"
    sx={{
      display: "flex",
      gap: 3
    }}
  >
    <SocialLink
      href="mailto:contact@gregbak.com"
      title="__mail__"
      icon={<MailIcon />}
      secondary={secondary}
    />
    <SocialLink
      href="https://github.com/Gregorein"
      title="__github__"
      icon={<Github />}
      secondary={secondary}
    />
    <SocialLink
      href="https://dribbble.com/Gregorein"
      title="__dribbble__"
      icon={<Dribbble />}
      secondary={secondary}
    />
    <SocialLink
      href="https://www.linkedin.com/in/gregorein/"
      title="__linkedin__"
      icon={<Linkedin />}
      secondary={secondary}
    />
  </Box>
)

export default NavigationSocial
