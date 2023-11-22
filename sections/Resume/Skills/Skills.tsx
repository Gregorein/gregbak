"use client"

import { Box, Typography } from "@mui/joy"
import ExtendedTypography from "components/ExtendedTypography/ExtendedTypography"
import type { RadarEntry } from "components/Radar/Radar"
import { Radar } from "components/Radar/Radar"
import SectionTitle from "components/SectionTitle/SectionTitle"
import SubSection from "components/SubSection/SubSection"
import { useState } from "react"

type SkillsProps = {
  skillsEntries: {
    title: string
    entries: RadarEntry[]
  }[]
  skillsSlug: string;
  skillsText: string;
  skillsTitle: string;
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

      <Box
        sx={{
          display: "flex",
          gap: 6,
          alignItems: "center"
        }}
      >
        <Radar
          data={skillsEntries}
          onPointClick={handlePointClick}
          activeEntry={activeEntry}
        />

        {activeEntry
          ? (
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                gap: 1,
              }}
            >
              <Typography
                fontSize={36}
                fontWeight={800}
              >
                {activeEntry.title}
              </Typography>

              <Typography
                fontSize={18}
                fontWeight={100}
                textTransform="lowercase"
                sx={{
                  color: "primary.500"
                }}
              >
                {activeEntry.level.text}
              </Typography>
              <Typography
                fontSize={24}
                fontFamily="anivers"
              >
                {activeEntry.text}
              </Typography>
            </Box>
          ) : (
            <ExtendedTypography
              fontSize={24}
              fontFamily="anivers"
            >
              {skillsText}
            </ExtendedTypography>
          )}
      </Box>
    </SubSection>
  )
}

export default Skills
