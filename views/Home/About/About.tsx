import { Box, Typography } from "@mui/joy"
import CtaButton from "components/CtaButton/CtaButton"
import Section from "components/Section/Section"
import Slogans from "./Slogans"

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
    <Section id={id} centered trim>
      <Box
        sx={{
          position: "relative",
          display: "flex",
          flexDirection: "column",
          gap: 3,
          width: "840px"
        }}
      >
        <Typography
          sx={{
            color: "primary.500"
          }}
          fontSize={48}
          fontWeight={800}
        >
          {aboutTitle}
        </Typography>
        <Typography
          fontFamily="anivers"
          fontSize={24}
        >
          {firstParagraph}
          {restOfText.map(paragraph => (
            <>
              <br /><br />
              {paragraph}
            </>
          ))}
        </Typography>
        <CtaButton title={aboutButton} target={target} />

        <Slogans aboutSloganLeft={aboutSloganLeft} aboutSloganRight={aboutSloganRight} />
      </Box>
    </Section >
  )
}

export default About