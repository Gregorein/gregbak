import api from "lib/datocms"
import type { Metadata, ResolvingMetadata } from "next"
import About from "views/Home/About/About"
import Expertise from "views/Home/Expertise/Expertise"
import Splash from "views/Home/Splash/Splash"
import Testimonials from "views/Home/Testimonials/Testimonials"

const getConfig = () => api(`
  query Home {
    home {
      title
    }
  }
`)

export const generateMetadata = async (
  _: unknown,
  parent: ResolvingMetadata
): Promise<Metadata> => {
  const {
    data: {
      home: {
        title
      }
    }
  } = await getConfig()

  const metadata = await parent

  return {
    ...metadata,
    title: metadata.title.template.replace("%s", title)
  }
}

const pageIds = {
  ABOUT: "#about",
  TESTIMONIALS: "#testimonials",
  EXPERTISE: "#expertise"
}

const getData = () => api(`
  query Home {
    home {
      testimonialsTitle
      testimonialsRandomButton
      testimonialsButton
      testimonials {
        text
        name
        client {
          name
          url
        }
      }
      aboutButton
      aboutTitle
      aboutText
      aboutSloganRight {
        text
      }
      aboutSloganLeft {
        text
      }
      expertiseCtaButton
      expertiseTitle
      expertiseCtaTitle
      expertiseCtaText
      expertiseShowcase {
        title
        skills {
          title
        }
        primary
      }
      projectsButton
      resumeButton
      splashButton
      splashTitle
      splashProfessions {
        text
      }
      splashExperience {
        count
        subject
      }
    }
  } 
`)

const Home = async () => {
  const {
    data: {
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
    }
  } = await getData()

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
