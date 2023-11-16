import { Box } from "@mui/joy"
import SocialLink from "components/SocialLink/SocialLink"
import { Dribbble, Github, Linkedin, MailIcon } from "lucide-react"

type NavigationSocialProps = {
  secondary?: boolean
  labels: {
    socialMail: string
    socialLinkedin: string
    socialGithub: string
    socialDribble: string
  }
}

const NavigationSocial = ({
  secondary = false,
  labels: {
    socialMail,
    socialLinkedin,
    socialGithub,
    socialDribble,
  }
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
      title={socialMail}
      icon={<MailIcon />}
      secondary={secondary}
    />
    <SocialLink
      href="https://github.com/Gregorein"
      title={socialGithub}
      icon={<Github />}
      secondary={secondary}
    />
    <SocialLink
      href="https://dribbble.com/Gregorein"
      title={socialDribble}
      icon={<Dribbble />}
      secondary={secondary}
    />
    <SocialLink
      href="https://www.linkedin.com/in/gregorein/"
      title={socialLinkedin}
      icon={<Linkedin />}
      secondary={secondary}
    />
  </Box>
)

export default NavigationSocial
