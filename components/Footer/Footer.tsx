"use client"

import { Box, Typography } from "@mui/joy"
import NavigationSocial from "components/NavigationSocial/NavigationSocial"
import { ArrowUpRight } from "lucide-react"
import Link from "next/link"
import mq from "theme/mediaQueries"
import { transition } from "theme/utils"
import type Style from "types/style"
import useMediaQuery from "util/useMediaQuery"

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

const style: Style = {
  footer: {
    backgroundColor: "primary.500",
  },
  cta: {
    display: "flex",
    position: "relative",
    width: "750px",
    flexDirection: "column",
    paddingTop: 18,
    margin: "0 auto",
    marginBottom: 24,
    cursor: "pointer",
    color: "primary.50",
    whiteSpace: "pre",
    textDecoration: "none",

    [mq.under.tablet]: {
      width: "unset",
      alignItems: "center",

      paddingTop: 6,
      marginBottom: 0
    }
  },
  ctaTitle: {
    fontSize: 36,
    fontFamily: "anivers",
    lineHeight: 0.5,

    [mq.under.tablet]: {
      fontSize: 21
    }
  },
  ctaText: {
    fontSize: 144,
    fontWeight: 100,
    lineHeight: 1,
    textTransform: "uppercase",

    [mq.under.tablet]: {
      fontSize: 72
    }
  },
  ctaIcon: {
    position: "absolute",
    left: "252px",
    bottom: "-144px",
  },
  ctaIconMobile: {
    position: "relative",
    left: -22,
    bottom: "0"
  },
  nav: {
    padding: 3,
    display: "flex",
    justifyContent: "space-between",

    [mq.under.tablet]: {
      flexDirection: "column",
      gap: 3,
      alignItems: "center"
    }
  },
  link: {
    flex: 1,
    textDecoration: "none",
    transition: transition("color"),
    color: "primary.700",
    "&:hover": {
      color: "primary.900"
    },

    [mq.under.tablet]: {
      order: 1
    }
  },
  copyrights: {
    flex: 1,
    fontFamily: "anivers",
    fontWeight: "bold",
    textAlign: "right",
    color: "primary.700",

    [mq.under.tablet]: {
      order: 1
    }
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
}: FooterProps) => {
  const width = useMediaQuery()

  return (
    <Box
      component="footer"
      sx={style.footer}
    >
      <Typography
        component={Link}
        href="?contact"
        scroll={false}
        sx={style.cta}
      >
        <Typography sx={style.ctaTitle}>
          {ctaTitle}
        </Typography>
        <Typography sx={style.ctaText}>
          {ctaText}
        </Typography>
        <ArrowUpRight
          size={width.under.tablet ? 72 : 160}
          strokeWidth={width.under.tablet ? 1.2 : 1}
          strokeLinecap="butt"
          strokeLinejoin="miter"
          //@ts-expect-error // lucide icon has a weird type, using this for now
          style={width.under.tablet ? style.ctaIconMobile : style.ctaIcon}
        />
      </Typography>

      <Box
        component="nav"
        sx={style.nav}
      >
        <Typography
          component={Link}
          href="/policy"
          sx={style.link}
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

        <Typography sx={style.copyrights}>
          {copyrights}
        </Typography>
      </Box>
    </Box>
  )
}

export default Footer
