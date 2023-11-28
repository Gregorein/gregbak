import { Box, Typography } from "@mui/joy"

import CtaButton from "components/CtaButton/CtaButton"
import Section from "components/Section/Section"
import SectionTitle from "components/SectionTitle/SectionTitle"

import { SloganLeft, SloganRight } from "./Slogans"

type AboutProps = {
  labels: {
    aboutButton: string
    aboutTitle: string
    aboutText: string
    aboutSloganRight: {
      text: string
    }[]
    aboutSloganLeft: {
      text: string
    }[]
  }
  id: string
  target: string
}

const About = ({
  labels: {
    aboutButton,
    aboutTitle,
    aboutText,
    aboutSloganRight,
    aboutSloganLeft,
  },
  id,
  target
}: AboutProps) => {
  const [firstParagraph, ...restOfText] = aboutText.split("\n\n")

  return (
    <Section
      id={id}
      centered
      trim
    >
      <Box
        sx={{
          position: "relative",
          display: "flex",
          flexDirection: "column",
          gap: 3,
          width: "600px"
        }}
      >
        <SloganLeft words={aboutSloganLeft} />

        <SectionTitle>
          {aboutTitle}
        </SectionTitle>

        <Typography
          fontFamily="anivers"
          fontSize={18}
        >
          {firstParagraph}
          {restOfText.map(paragraph => (
            <>
              <br /><br />
              {paragraph}
            </>
          ))}
        </Typography>
        <CtaButton
          title={aboutButton}
          target={target}
        />

        <SloganRight words={aboutSloganRight} />
      </Box>
    </Section >
  )
}

export default About