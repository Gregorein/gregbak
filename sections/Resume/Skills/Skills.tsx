"use client"

import { Box, Typography } from "@mui/joy"
import ExtendedTypography from "components/ExtendedTypography/ExtendedTypography"
import type { RadarEntry } from "components/Radar/Radar"
import { Radar } from "components/Radar/Radar"
import SectionTitle from "components/SectionTitle/SectionTitle"
import SubSection from "components/SubSection/SubSection"
import { useState } from "react"
import mq from "theme/mediaQueries"

type SkillsProps = {
  skillsEntries: {
    title: string
    entries: RadarEntry[]
  }[]
  skillsSlug: string;
  skillsText: string;
  skillsTitle: string;
}

const style = {
  container: {
    display: "flex",
    gap: 6,
    alignItems: "center",

    [mq.under.laptop]: {
      flexDirection: "column",
      gap: 3
    }
  },
  description: {
    display: "flex",
    flexDirection: "column",
    gap: 1,
  },
  title: {
    fontSize: 36,
    fontWeight: 800,

    [mq.under.laptop]: {
      fontSize: 24
    },
    [mq.under.tablet]: {
      fontSize: 21
    }
  },
  level: {
    fontSize: 18,
    fontWeight: 100,
    textTransform: "lowercase",
    color: "primary.500",

    [mq.under.laptop]: {
      fontSize: 14
    },
    [mq.under.tablet]: {
      fontSize: 12
    }
  },
  text: {
    fontSize: 24,
    fontFamily: "anivers",

    [mq.under.laptop]: {
      fontSize: 18
    },
    [mq.under.tablet]: {
      fontSize: 16
    }
  },
}

const Skills = (
  {
    skillsEntries,
    skillsSlug,
    skillsText,
    skillsTitle
  }: SkillsProps) => {
  const [activeEntry, setActiveEntry] = useState<RadarEntry | undefined>(undefined)
  const handlePointClick = (entry: RadarEntry | undefined) => {
    setActiveEntry(entry)
  }

  return (
    <SubSection id={skillsSlug}>
      <SectionTitle textAlign="center">{skillsTitle}</SectionTitle>

      <Box sx={style.container}>
        <Radar
          data={skillsEntries}
          onPointClick={handlePointClick}
          activeEntry={activeEntry}
        />

        {activeEntry
          ? (
            <Box
              sx={style.description}
            >
              <Typography sx={style.title}>
                {activeEntry.title}
              </Typography>

              <Typography sx={style.level}>
                {activeEntry.level.text}
              </Typography>
              <Typography sx={style.text}>
                {activeEntry.text}
              </Typography>
            </Box>
          ) : (
            <ExtendedTypography sx={style.text}>
              {skillsText}
            </ExtendedTypography>
          )}
      </Box>
    </SubSection>
  )
}

export default Skills
