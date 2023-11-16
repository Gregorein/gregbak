import type { ReactNode } from "react"
import { Analytics } from "@vercel/analytics/react"
import ThemeProvider from "../components/ThemeProvider/ThemeProvider"

import "normalize.css"
import "theme/global.css"
import Header from "components/Header/Header"
import Footer from "components/Footer/Footer"
import ColorSchemeInit from "components/ColorSchemeInit/ColorSchemeInit"
import Main from "components/Main/Main"
import api from "lib/datocms"
import type { Metadata } from "next"

const getSEO = () => api(`
  query SEO {
    _site {
      globalSeo {
        fallbackSeo {
          description
          title
          image {
            url
          }
        }
        siteName
      }
    }
  }
`)
export const generateMetadata = async (): Promise<Metadata> => {
  const {
    data: {
      _site: {
        globalSeo: {
          fallbackSeo: {
            description,
            title,
            image: {
              url
            }
          },
          siteName
        }
      }
    }
  } = await getSEO()

  return {
    title: {
      default: title,
      template: `%s | ${title}`
    },
    description,
    openGraph: {
      type: "website",
      title,
      description,
      siteName,
      images: [
        {
          url
        }
      ]
    },
    applicationName: siteName,
    authors: {
      name: "Greg Bak",
      url: "gregbak.com"
    },
    themeColor: "#060506",
    colorScheme: "dark",
    viewport: "initial-scale=1, width=device-width",
    creator: "Greg Bak",
    robots: "index, follow"
  }
}

const getConfig = () => api(`
  query Config {
    config {
      maintenance
      navContact
      navResume
      navPortfolio
      socialMail
      socialLinkedin
      socialGithub
      socialDribble
      cookiesButton
      codeButton
      languagesMenu
      copyrights
      ctaText
      ctaTitle
      policyButton
      uiToggle {
        text
      }
    }
  }
`)

type RootLayoutProps = {
  children: ReactNode
}

const RootLayout = async ({
  children,
}: RootLayoutProps) => {
  const {
    data: {
      config: {
        maintenance,

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
        languagesMenu,

        ctaText,
        ctaTitle,

        policyButton,
        copyrights
      }
    }
  } = await getConfig()

  if (maintenance) {
    // TODO implement maintenance mode
  }

  return (
    <html lang="en">
      <head>
        <link
          rel="icon"
          type="image/ico"
          sizes="32x32"
          href="/favicon.ico"
        />
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="favicon/apple-touch-icon.png"
        />
        <link
          rel="manifest"
          href="favicon/site.webmanifest"
        />
        <link
          rel="mask-icon"
          href="favicon/safari-pinned-tab.svg"
          color="#C88941"
        />

        <meta
          name="msapplication-TileColor"
          content="#060506"
        />

        <link rel="stylesheet" href="https://use.typekit.net/vrv7gnc.css" />
        {/*<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Fira+Code:wght@500;700&display=optional" />*/}
      </head>
      <body>
        <ColorSchemeInit />
        <ThemeProvider>
          <Header
            labels={{
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
            }}
          />
          <Main>
            {children}
          </Main>
          <Footer labels={{
            socialMail,
            socialLinkedin,
            socialGithub,
            socialDribble,

            ctaText,
            ctaTitle,

            policyButton,
            copyrights
          }} />
        </ThemeProvider>
        <Analytics />
      </body>
    </html>
  )
}

export default RootLayout
