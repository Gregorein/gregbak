import type { ReactNode } from "react"
import { Analytics } from "@vercel/analytics/react"
import ThemeProvider from "../components/ThemeProvider/ThemeProvider"

import "normalize.css"
import "theme/global.css"
import Header from "components/Header/Header"
import Footer from "components/Footer/Footer"
import ColorSchemeInit from "components/ColorSchemeInit/ColorSchemeInit"
import Main from "components/Main/Main"
import api from "util/datocms"
import type { Metadata } from "next"

import seo from "queries/root/seo.gql"
import config from "queries/root/config.gql"

export const generateMetadata = async (): Promise<Metadata> => {
  const {
    _site: {
      globalSeo: {
        //TODO: finish global seo
        fallbackSeo: {
          description,
          title,
          // image: {
          //   url
          // }
        },
        siteName
      }
    }
  } = await api(seo)

  return {
    title: {
      default: title,
      template: `%s | ${title}`
    },
    description,
    // TODO: finish openGraph
    // openGraph: {
    //   type: "website",
    //   title,
    //   description,
    //   siteName,
    //   images: [
    //     {
    //       url
    //     }
    //   ]
    // },
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

type RootLayoutProps = {
  children: ReactNode
}

const RootLayout = async ({
  children,
}: RootLayoutProps) => {
  const {
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
  } = await api(config)

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

        <link
          rel="stylesheet"
          href="https://use.typekit.net/vrv7gnc.css"
        />
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
          <Footer
            labels={{
              socialMail,
              socialLinkedin,
              socialGithub,
              socialDribble,

              ctaText,
              ctaTitle,

              policyButton,
              copyrights
            }}
          />
        </ThemeProvider>
        <Analytics />
      </body>
    </html>
  )
}

export default RootLayout
