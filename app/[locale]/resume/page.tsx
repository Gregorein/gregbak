import { Box, Typography } from "@mui/joy"
import { Image as DatoImage } from "react-datocms"

import api from "util/datocms"

import Section from "components/Section/Section"

import config from "queries/Resume/config.gql"
import resume from "queries/Resume/resume.gql"
import ExtendedTypography from "components/ExtendedTypography/ExtendedTypography"
import SectionTitle from "components/SectionTitle/SectionTitle"
import SubSection from "components/SubSection/SubSection"
import Link from "next/link"
import TestimonialsDisplay from "components/TestimonialsDisplay/TestimonialsDisplay"
import Skills from "sections/Resume/Skills/Skills"
import NavigationSide from "components/NavigationSide/NavigationSide"
import AchievementList from "components/AchievementList/AchievementList"
import { FileBadge } from "lucide-react"
import { transition } from "theme/utils"
import Experience from "sections/Resume/Experience/Experience"
import Tools from "sections/Resume/Tools/Tools"
import Projects from "sections/Resume/Projects/Projects"

import { unstable_setRequestLocale } from "next-intl/server"
import { locales, matchLocale } from "i18n"

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
      }
    },
  } = await api(resume, {
    variables: {
      locale
    }
  })

  return (
    <Section
      centered
      maxWidth="1480px"
      sx={{
        gap: 6,
        paddingTop: "calc(50vh - 350px)",
        paddingBottom: 12
      }}
    >
      <Box
        component="aside"
        sx={{
          width: "325px",
          position: "fixed",
          top: "50%",
          left: "50%",
          transform: "translate(-1065px, -50%)",
          display: "flex",
          flexDirection: "column",
          gap: 3
        }}
      >
        <NavigationSide
          links={[
            aboutSlug,
            awardsSlug,
            contributionsSlug,
            projectsSlug,
            skillsSlug,
            toolsSlug,
            testimonialsSlug,
            experienceSlug,
          ]}
        />

        <Typography
          component={Link}
          href={cvUrl}
          fontSize={24}
          fontFamily="europa"
          sx={{
            cursor: "pointer",
            transition: transition("color"),
            display: "flex",
            gap: 2,
            alignItems: "center",
            color: "primary.500",
            "&:hover": {
              color: "primary.600"
            },
            textDecoration: "none"
          }}
        >
          {cvButton} <FileBadge />
        </Typography>
      </Box>

      <Box
        sx={{
          border: "1px solid",
          borderColor: "primary.500",
          padding: 3
        }}
        id={aboutSlug}
      >
        <DatoImage data={avatar.responsiveImage} />
      </Box>

      <ExtendedTypography
        fontSize={21}
        fontFamily="anivers"
        boldProps={{
          fontSize: 36,
          fontFamily: "europa",
          sx: {
            color: "primary.500"
          }
        }}
      >
        {aboutText}
      </ExtendedTypography>

      <SubSection id={awardsSlug}>
        <SectionTitle textAlign="center">{awardsTitle}</SectionTitle>

        <AchievementList entries={awardsEntries} />
      </SubSection>

      <SubSection id={contributionsSlug}>
        <SectionTitle textAlign="center">{contributionsTitle}</SectionTitle>

        <AchievementList entries={contributionsEntries} />
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
        sx={{ width: "710px" }}
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
    </Section >
  )
}

export default Resume
