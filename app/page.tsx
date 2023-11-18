import api from "util/datocms"
import type { Metadata, ResolvingMetadata } from "next"

import About from "sections/Home/About/About"
import Expertise from "sections/Home/Expertise/Expertise"
import Splash from "sections/Home/Splash/Splash"
import Testimonials from "sections/Home/Testimonials/Testimonials"

import config from "queries/Home/config.gql"
import home from "queries/Home/home.gql"

export const generateMetadata = async (
  _: unknown,
  parent: ResolvingMetadata
): Promise<Metadata> => {
  const {
    home: {
      title
    }
  } = await api(config)

  const metadata = await parent

  return {
    ...metadata,
    title: metadata.title.template.replace("%s", title)
    // had to hack it because titleTemplate doesn't work for a page using the same-level layout 
  }
}

const pageIds = {
  ABOUT: "#about",
  TESTIMONIALS: "#testimonials",
  EXPERTISE: "#expertise"
}

const Home = async () => {
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
  } = await api(home)

  return (
    <>
      <Splash
        labels={{
          splashButton,
          splashTitle,
          splashProfessions,
          splashExperience,
        }}
        target={pageIds.ABOUT}
      />
      <About
        labels={{
          aboutButton,
          aboutTitle,
          aboutText,
          aboutSloganRight,
          aboutSloganLeft,
        }}
        id={pageIds.ABOUT}
        target={pageIds.TESTIMONIALS}
      />

      <Testimonials
        labels={{
          testimonialsTitle,
          testimonialsRandomButton,
          testimonialsButton,
          testimonials
        }}
        id={pageIds.TESTIMONIALS}
        target={pageIds.EXPERTISE}
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
        id={pageIds.EXPERTISE}
      />
    </>
  )
}

export default Home
