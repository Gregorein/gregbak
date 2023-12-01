"use client"

import { Box } from "@mui/joy"
import HeaderActions from "components/HeaderActions/HeaderActions"
import LogoLink from "components/LogoLink/LogoLink"
import NavigationDrawer from "components/NavigationDrawer/NavigationDrawer"
import NavigationMain from "components/NavigationMain/NavigationMain"
import NavigationSocial from "components/NavigationSocial/NavigationSocial"
import mq from "theme/mediaQueries"
import type Style from "types/style"
import useMediaQuery from "util/useMediaQuery"

type HeaderProps = {
  labels: {
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

    closeMenu: string
    menuNavigationTitle: string
    menuSocialTitle: string
    menuActionsTitle: string
  }
  locales: {
    code: string
    title: string
  }[]
}

const style: Style = {
  header: {
    display: "flex",
    padding: 3,
    gap: 6,
    position: "fixed",
    top: 0,
    left: 0,
    right: 0,
    zIndex: 1000,
    backdropFilter: "brightness( var(--palette-background-header) ) blur(50px)",

    [mq.under.laptop]: {
      gap: 3
    },
    [mq.under.tablet]: {
      justifyContent: "space-between"
    }
  }
}

const Header = ({
  labels,
  locales,
}: HeaderProps) => {
  const width = useMediaQuery()
  const {
    navResume,
    navPortfolio,

    socialMail,
    socialLinkedin,
    socialGithub,
    socialDribble,

    cookiesButton,
    codeButton,
    uiToggle,
    languagesMenu,
  } = labels

  return (
    <Box
      component="header"
      sx={style.header}
    >
      <LogoLink />

      {!width.under.tablet && (
        <NavigationMain
          labels={{
            navResume,
            navPortfolio
          }}
        />
      )}
      {width.over.tablet && (
        <NavigationSocial
          labels={{
            socialMail,
            socialLinkedin,
            socialGithub,
            socialDribble
          }}
        />
      )}

      {width.over.laptop && (
        <HeaderActions
          labels={{
            cookiesButton,
            codeButton,
            uiToggle,
            languagesMenu
          }}
          locales={locales}
        />
      )}

      {width.under.laptop && (
        <NavigationDrawer
          labels={labels}
          locales={locales}
        />
      )}
    </Box>
  )
}

export default Header