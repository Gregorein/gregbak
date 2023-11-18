import { Box, Tooltip, Typography } from "@mui/joy"
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

export const generateMetadata = async () => {
  const {
    resume: {
      title
    }
  } = await api(config)

  return {
    title
  }
}

const Resume = async () => {
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
  } = await api(resume)

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
            experienceSlug,
            testimonialsSlug
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

      <SubSection id={projectsSlug}>
        <SectionTitle textAlign="center">{projectsTitle}</SectionTitle>

        <Box
          sx={{
            display: "flex",
            flexWrap: "wrap"
          }}
        >
          {projectsEntries.map((project, i) => (
            <>
              <Typography
                sx={{
                  display: "inline-flex",
                  alignItems: "center"
                }}
              >
                <Typography
                  fontSize={72}
                  fontWeight={800}
                >
                  {project.count}
                </Typography>
                <Typography
                  fontSize={72}
                  fontFamily="anivers"
                  textTransform="uppercase"
                >
                  {project.subject}
                </Typography>
              </Typography>
              {i !== projectsEntries.length - 1 && (
                <Typography
                  fontSize={72}
                  fontWeight={100}
                  sx={{
                    paddingLeft: 3,
                    paddingRight: 3
                  }}
                >
                  /
                </Typography>
              )}
            </>
          ))}
        </Box>
      </SubSection>

      <Skills
        skillsEntries={skillsEntries}
        skillsSlug={skillsSlug}
        skillsText={skillsText}
        skillsTitle={skillsTitle}
      />

      <SubSection id={toolsSlug}>
        <SectionTitle textAlign="center">{toolsTitle}</SectionTitle>

        {toolsEntries.map(group => (
          <Box key={group.title}>
            <Typography
              fontFamily="anivers"
              fontSize={28}
              fontWeight={800}
              sx={{
                color: "primary.500"
              }}
              textTransform="lowercase"
            >
              {group.title}:
            </Typography>
            <Box
              sx={{
                display: "flex",
                flexWrap: "wrap",
                gap: 1,
                paddingLeft: 3
              }}
            >
              {group._allReferencingTools.map((tool, i) => (
                <Tooltip
                  key={tool.title}
                  title={`${tool.level?.title} (${tool.level?.text})`}
                  variant="solid"
                  arrow
                >
                  <Typography
                    fontFamily="anivers"
                    fontSize={24}
                  >
                    {tool.title}{i !== group._allReferencingTools.length - 1 && ","}
                  </Typography>

                </Tooltip>
              ))}
            </Box>
          </Box>
        ))}
      </SubSection>

      <SubSection id={experienceSlug}>
        <SectionTitle textAlign="center">{experienceTitle}</SectionTitle>

        <Box
          sx={{
            display: "flex",
            gap: 6,
            justifyContent: "space-between"
          }}
        >
          {experienceEntries.map(group => (
            <Box
              key={group.title}
              sx={{
                width: "325px",
                display: "flex",
                gap: 3,
                flexDirection: "column"
              }}
            >
              <Typography
                fontSize={24}
                fontWeight={100}
                textAlign="center"
              >
                {group.title}
              </Typography>

              {group.projects.map(project => (
                <Box
                  key={project.title}
                  sx={{
                    display: "flex",
                    flexDirection: "column"
                  }}
                >
                  <Typography
                    fontFamily="anivers"
                    fontSize={32}
                    fontWeight={800}
                  >
                    {project.title}
                  </Typography>

                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: "column"
                    }}
                  >
                    <Typography
                      fontFamily="anivers"
                      fontSize={21}
                    >
                      {project.role}
                    </Typography>

                    {project.clients.map(client => (
                      <Typography
                        component={Link}
                        key={client.name}
                        fontFamily="anivers"
                        fontSize={21}
                        href={client.url}
                        sx={{
                          textDecoration: "none",
                          color: "primary.500",
                          "&:hover": {
                            color: "primary.600"
                          }
                        }}
                      >
                        @{client.name}
                      </Typography>
                    ))}
                  </Box>
                </Box>
              ))}
            </Box>
          ))}
        </Box>
      </SubSection>

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
    </Section >
  )
}

export default Resume
