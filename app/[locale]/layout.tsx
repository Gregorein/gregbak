import type { ReactNode } from "react"
import { Analytics } from "@vercel/analytics/react"

import StyleProvider from "components/StyleProvider/StyleProvider"

import { unstable_setRequestLocale } from "next-intl/server"

import "normalize.css"
import "theme/global.css"
import Header from "components/Header/Header"
import Footer from "components/Footer/Footer"
import Main from "components/Main/Main"
import api from "util/datocms"
import type { Metadata, Viewport } from "next"

import seo from "queries/root/seo.gql"
import config from "queries/root/config.gql"
import ColorSchemeInit from "components/ColorSchemeInit/ColorSchemeInit"
import { locales, matchLocale } from "i18n"

export const generateStaticParams = async () => locales.map(locale => ({ locale }))

type RootLayoutProps = {
  children: ReactNode
  params: {
    locale: string
  }
}

export const generateMetadata = async ({
  params: {
    locale
  }
}: RootLayoutProps): Promise<Metadata> => {
  const {
    _site: {
      globalSeo: {
        fallbackSeo: {
          description,
          title,
          image: {
            url,
            width,
            height
          }
        },
        siteName
      }
    }
  } = await api(seo, {
    variables: {
      locale
    }
  })

  return {
    title: {
      default: title,
      template: `%s | ${title}`
    },
    description,
    applicationName: siteName,
    authors: {
      name: "Greg Bak",
      url: "gregbak.com"
    },
    publisher: "Greg Bak",

    creator: "Greg Bak",
    robots: "index, follow",
    openGraph: {
      type: "website",
      title,
      description,
      siteName,
      images: [
        {
          url,
          width,
          height
        }
      ]
    }
  }
}

export const viewport: Viewport = {
  themeColor: "#060506",
  colorScheme: "dark",
  initialScale: 1,
  width: "device-width",
  viewportFit: "cover"
}

const RootLayout = async ({
  children,
  params: {
    locale
  }
}: RootLayoutProps) => {
  unstable_setRequestLocale(matchLocale(locale))

  const {
    config: {
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
      copyrights,

      closeMenu,
      menuNavigationTitle,
      menuSocialTitle,
      menuActionsTitle
    },
    allLocales
  } = await api(config, {
    variables: {
      locale
    }
  })

  return (
    <html lang={locale}>
      <StyleProvider>
        <head>
          <ColorSchemeInit />
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

          <meta
            name="format-detection"
            content="telephone=no, date=no, email=no, address=no"
          />

          <link
            rel="stylesheet"
            href="https://use.typekit.net/vrv7gnc.css"
          />
        </head>
        <body>
          <Header
            labels={{
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
              closeMenu,
              menuNavigationTitle,
              menuSocialTitle,
              menuActionsTitle
            }}
            locales={allLocales}
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
          <Analytics />
        </body>
      </StyleProvider>
    </html>
  )
}

export default RootLayout
