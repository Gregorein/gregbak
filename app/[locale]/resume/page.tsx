import { Box } from "@mui/joy"
import { Image as DatoImage } from "react-datocms"

import api from "util/datocms"

import Section from "components/Section/Section"

import config from "queries/Resume/config.gql"
import resume from "queries/Resume/resume.gql"
import ExtendedTypography from "components/ExtendedTypography/ExtendedTypography"
import SectionTitle from "components/SectionTitle/SectionTitle"
import SubSection from "components/SubSection/SubSection"
import TestimonialsDisplay from "components/TestimonialsDisplay/TestimonialsDisplay"
import Skills from "sections/Resume/Skills/Skills"
import AchievementList from "components/AchievementList/AchievementList"
import { transition } from "theme/utils"
import Experience from "sections/Resume/Experience/Experience"
import Tools from "sections/Resume/Tools/Tools"
import Projects from "sections/Resume/Projects/Projects"

import { unstable_setRequestLocale } from "next-intl/server"
import { locales, matchLocale } from "i18n"
import mq from "theme/mediaQueries"
import NavigationAside from "components/NavigationAside/NavigationAside"

export const generateStaticParams = async () => locales.map(locale => ({ locale }))

type ResumeProps = {
  params: {
    locale: string
  }
}

export const generateMetadata = async ({
  params: {
    locale
  }
}: ResumeProps) => {
  const {
    resume: {
      title
    }
  } = await api(config, {
    variables: {
      locale
    }
  })

  return {
    title
  }
}

const style = {
  container: {
    gap: 6,
    paddingTop: "calc(50vh - 350px)",
    paddingBottom: 12,

    [mq.under.tablet]: {
      paddingTop: 9,
      gap: 3
    }
  },

  about: {
    transition: transition("width"),
    border: "1px solid",
    borderColor: "primary.500",
    p: 3,
    width: 325,

    [mq.under.tablet]: {
      width: 250,
    }
  },
  aboutText: {
    fontSize: 21,
    paddingLeft: 3,
    paddingRight: 3,
    fontFamily: "anivers",

    [mq.under.tablet]: {
      fontSize: 18
    }
  },
  aboutTextBold: {
    fontSize: 36,
    fontFamily: "europa",
    color: "primary.500"
  }
}

const Resume = async ({
  params: {
    locale
  }
}: ResumeProps) => {
  unstable_setRequestLocale(matchLocale(locale))

  const {
    resume: {
      avatar,

      aboutText,
      aboutSlug,

      awardsTitle,
      awardsSlug,
      awardsEntries,

      contributionsTitle,
      contributionsSlug,
      contributionsEntries,

      projectsTitle,
      projectsSlug,
      projectsEntries,

      skillsTitle,
      skillsSlug,
      skillsText,
      skillsEntries,

      toolsTitle,
      toolsSlug,
      toolsEntries,

      experienceTitle,
      experienceSlug,
      experienceEntries,

      testimonialsTitle,
      testimonialsSlug,
      testimonialsRandomButton,
      testimonialsEntries,

      cvButton,
      cv: {
        url: cvUrl
      },
      navigationButton
    },
  } = await api(resume, {
    variables: {
      locale
    }
  })

  return (
    <Section
      centered
      sx={style.container}
    >
      <NavigationAside aboutSlug={aboutSlug}
        awardsSlug={awardsSlug}
        contributionsSlug={contributionsSlug}
        cvButton={cvButton}
        cvUrl={cvUrl}
        experienceSlug={experienceSlug}
        projectsSlug={projectsSlug}
        skillsSlug={skillsSlug}
        testimonialsSlug={testimonialsSlug}
        toolsSlug={toolsSlug}
        navigationButton={navigationButton}
      />

      <Box
        sx={style.about}
        id={aboutSlug}
      >
        <DatoImage data={avatar.responsiveImage} />
      </Box>

      <ExtendedTypography
        sx={style.aboutText}
        boldProps={{ sx: style.aboutTextBold }}
      >
        {aboutText}
      </ExtendedTypography>

      <SubSection id={awardsSlug}>
        <SectionTitle textAlign="center">{awardsTitle}</SectionTitle>

        <AchievementList
          entries={awardsEntries}
          locale={locale}
        />
      </SubSection>

      <SubSection id={contributionsSlug}>
        <SectionTitle textAlign="center">{contributionsTitle}</SectionTitle>

        <AchievementList
          entries={contributionsEntries}
          locale={locale}
        />
      </SubSection>

      <Projects
        projectsSlug={projectsSlug}
        projectsTitle={projectsTitle}
        projectsEntries={projectsEntries}
      />

      <Skills
        skillsSlug={skillsSlug}
        skillsTitle={skillsTitle}
        skillsText={skillsText}
        skillsEntries={skillsEntries}
      />

      <Tools
        toolsSlug={toolsSlug}
        toolsTitle={toolsTitle}
        toolsEntries={toolsEntries}
      />

      <SubSection
        id={testimonialsSlug}
        sx={{ maxWidth: 840 }}
      >
        <SectionTitle textAlign="center">{testimonialsTitle}</SectionTitle>

        <TestimonialsDisplay
          testimonials={testimonialsEntries}
          randomiseButton={testimonialsRandomButton}
        />
      </SubSection>

      <Experience
        experienceSlug={experienceSlug}
        experienceTitle={experienceTitle}
        experienceEntries={experienceEntries}
      />
    </Section>
  )
}

export default Resume
