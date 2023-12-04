import { Box } from "@mui/joy"

import CtaButton from "components/CtaButton/CtaButton"
import ExtendedTypography from "components/ExtendedTypography/ExtendedTypography"
import Section from "components/Section/Section"
import SectionTitle from "components/SectionTitle/SectionTitle"
import mq from "theme/mediaQueries"
import type Style from "types/style"

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

const style: Style = {
  container: {
    position: "relative",
    display: "flex",
    flexDirection: "column",
    gap: 3,
    width: "600px",

    [mq.under.laptop]: {
      padding: 3,
    },
    [mq.under.tablet]: {
      width: "unset"
    }
  }
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
}: AboutProps) => (
  <Section
    id={id}
    centered
    trim
  >
    <Box sx={style.container}>
      <SloganLeft words={aboutSloganLeft} />

      <SectionTitle>
        {aboutTitle}
      </SectionTitle>

      <ExtendedTypography
        fontFamily="anivers"
        fontSize={18}
      >
        {aboutText}
      </ExtendedTypography>
      <CtaButton
        title={aboutButton}
        target={target}
      />

      <SloganRight words={aboutSloganRight} />
    </Box>
  </Section >
)

export default About