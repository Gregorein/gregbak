import api from "util/datocms"
import type { Metadata, ResolvingMetadata } from "next"

import { unstable_setRequestLocale } from "next-intl/server"

import About from "sections/Home/About/About"
import Expertise from "sections/Home/Expertise/Expertise"
import Splash from "sections/Home/Splash/Splash"
import Testimonials from "sections/Home/Testimonials/Testimonials"

import config from "queries/Home/config.gql"
import home from "queries/Home/home.gql"
import { locales, matchLocale } from "i18n"

export const generateStaticParams = async () => locales.map(locale => ({ locale }))

type HomeProps = {
  params: {
    locale: string
  }
}

export const generateMetadata = async (
  { params: {
    locale
  } }: HomeProps,
  parent: ResolvingMetadata
): Promise<Metadata> => {
  const {
    home: {
      title
    }
  } = await api(config, {
    variables: {
      locale
    }
  })

  const metadata = await parent

  return {
    ...metadata,
    title: metadata.title.template.replace("%s", title)
    // had to hack it because titleTemplate doesn't work for a page using the same-level layout 
  }
}

const Home = async ({ params: { locale } }: HomeProps) => {
  unstable_setRequestLocale(matchLocale(locale))

  const {
    home: {
      splashButton,
      splashTitle,
      splashProfessions,
      splashExperience,

      aboutButton,
      aboutTitle,
      aboutText,
      aboutSloganRight,
      aboutSloganLeft,

      testimonialsTitle,
      testimonialsRandomButton,
      testimonialsButton,
      testimonials,

      expertiseCtaButton,
      expertiseTitle,
      expertiseCtaTitle,
      expertiseCtaText,
      expertiseShowcase,
      projectsButton,
      resumeButton,
    }
  } = await api(home, {
    variables: {
      locale
    }
  })

  const id = (title: string) => `#${title}`

  return (
    <>
      <Splash
        labels={{
          splashButton,
          splashTitle,
          splashProfessions,
          splashExperience,
        }}
        target={id(aboutTitle)}
      />
      <About
        labels={{
          aboutButton,
          aboutTitle,
          aboutText,
          aboutSloganRight,
          aboutSloganLeft,
        }}
        id={id(aboutTitle)}
        target={id(testimonialsTitle)}
      />

      <Testimonials
        labels={{
          testimonialsTitle,
          testimonialsRandomButton,
          testimonialsButton,
          testimonials
        }}
        id={id(testimonialsTitle)}
        target={id(expertiseTitle)}
      />

      <Expertise
        labels={{
          expertiseCtaButton,
          expertiseTitle,
          expertiseCtaTitle,
          expertiseCtaText,
          expertiseShowcase,
          projectsButton,
          resumeButton,
        }}
        id={id(expertiseTitle)}
      />
    </>
  )
}

export default Home
