import Section from "components/Section/Section"
import api from "lib/datocms"
import type { Metadata, ResolvingMetadata } from "next"
import Splash from "views/Home/Splash/Splash"

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
        testimonialsTitle,
        testimonialsRandomButton,
        testimonialsButton,
        testimonials,

        aboutButton,
        aboutTitle,
        aboutText,
        aboutSloganRight,
        aboutSloganLeft,

        expertiseCtaButton,
        expertiseTitle,
        expertiseCtaTitle,
        expertiseCtaText,
        expertiseShowcase,

        projectsButton,
        resumeButton,

        splashButton,
        splashTitle,
        splashProfessions,
        splashExperience,
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
      <Section id={pageIds.ABOUT}> target={pageIds.TESTIMONIALS}
        About
      </Section>
      <Section id={pageIds.TESTIMONIALS}> taget={pageIds.EXPERTISE}
        Testimonials
      </Section>
      <Section id={pageIds.EXPERTISE}>
        Expertise
      </Section>
    </>
  )
}

export default Home
