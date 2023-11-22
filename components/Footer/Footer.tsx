import { Box, Typography } from "@mui/joy"
import NavigationSocial from "components/NavigationSocial/NavigationSocial"
import { ArrowUpRight } from "lucide-react"
import Link from "next/link"
import { transition } from "theme/utils"

type FooterProps = {
  labels: {
    socialMail: string
    socialLinkedin: string
    socialGithub: string
    socialDribble: string

    ctaText: string
    ctaTitle: string

    policyButton: string
    copyrights: string
  }
}

const Footer = ({
  labels: {
    socialMail,
    socialLinkedin,
    socialGithub,
    socialDribble,

    ctaTitle,
    ctaText,

    policyButton,
    copyrights,
  }
}: FooterProps) => (
  <Box
    component="footer"
    sx={{
      backgroundColor: "primary.500",
    }}
  >
    <Typography
      component={Link}
      href="?contact"
      scroll={false}
      sx={{
        display: "flex",
        position: "relative",
        width: "750px",
        flexDirection: "column",
        paddingTop: 18,
        margin: "0 auto 240px",
        cursor: "pointer",
        color: "primary.50",
        whiteSpace: "pre",
        textDecoration: "none"
      }}
    >
      <Typography
        lineHeight={0.5}
        fontSize={36}
        fontFamily="anivers"
      >
        {ctaTitle}
      </Typography>
      <Typography
        lineHeight={1}
        fontSize={144}
        fontWeight={100}
        textTransform="uppercase"
      >
        {ctaText}
      </Typography>
      <Typography
        sx={{
          position: "absolute",
          left: "252px",
          bottom: "-144px",
        }}
      >
        <ArrowUpRight
          size={160}
          strokeWidth={1}
          strokeLinecap="butt"
          strokeLinejoin="miter"
        />
      </Typography>
    </Typography>

    <Box
      sx={{
        padding: 3,
        display: "flex",
        justifyContent: "space-between"
      }}
    >
      <Typography
        component={Link}
        href="/policy"
        sx={{
          flex: 1,
          textDecoration: "none",
          transition: transition("color"),
          color: "primary.700",
          "&:hover": {
            color: "primary.900"
          }
        }}
      >
        {policyButton}
      </Typography>

      <NavigationSocial
        labels={{
          socialMail,
          socialLinkedin,
          socialGithub,
          socialDribble
        }}
        secondary
      />

      <Typography
        sx={{
          flex: 1,
          fontFamily: "anivers",
          fontWeight: "bold",
          textAlign: "right",
          color: "primary.700"
        }}
      >
        {copyrights}
      </Typography>
    </Box>
  </Box>
)

export default Footer
