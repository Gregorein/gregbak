import { Box } from "@mui/joy"
import SocialLink from "components/SocialLink/SocialLink"
import { Twitter, Twitch, PiggyBank, Github, Linkedin, MailIcon } from "lucide-react"

type NavigationSocialProps = {
	secondary?: boolean
	labels: {
		socialMail: string
		socialLinkedin: string
		socialGithub: string
		socialPatreon: string
		socialTwitter: string
		socialTwitch: string
	}
}

const NavigationSocial = ({
	secondary = false,
	labels: {
		socialMail,
		socialLinkedin,
		socialGithub,
		socialPatreon,
		socialTwitter,
		socialTwitch
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
			href="https://patreon.com/Gregorein"
			title={socialPatreon}
			icon={<PiggyBank />}
			secondary={secondary}
		/>
		<SocialLink
			href="https://twitter.com/Gregorein"
			title={socialTwitter}
			icon={<Twitter />}
			secondary={secondary}
		/>
		<SocialLink
			href="https://www.twitch.tv/gregorein"
			title={socialTwitch}
			icon={<Twitch />}
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
