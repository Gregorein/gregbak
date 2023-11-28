import { Box } from "@mui/joy"
import CtaButton from "components/CtaButton/CtaButton"
import Section from "components/Section/Section"
import SectionTitle from "components/SectionTitle/SectionTitle"
import TestimonialsDisplay from "components/TestimonialsDisplay/TestimonialsDisplay"
import mq from "theme/mediaQueries"
import type Style from "types/style"

type TestimonialsProps = {
  labels: {
    testimonialsTitle: string
    testimonialsRandomButton: string
    testimonialsButton: string
    testimonials: {
      text: string
      name: string
      client: {
        name: string
        url: string
      }
    }[]
  }
  id,
  target
}

const style: Style = {
  container: {
    display: "flex",
    flexDirection: "column",
    gap: 6,
    width: 840,

    [mq.under.laptop]: {
      width: 768,
      p: 3
    },
    [mq.under.tablet]: {
      width: "unset"
    }
  },
  content: {
    display: "flex",
    flexDirection: "column",
    gap: 1,
  }
}

const Testimonials = ({
  labels: {
    testimonialsTitle,
    testimonialsRandomButton,
    testimonialsButton,
    testimonials
  },
  id,
  target
}: TestimonialsProps) => (
  <Section
    id={id}
    centered
  >
    <Box sx={style.container}>
      <Box sx={style.content}>
        <SectionTitle>
          {testimonialsTitle}
        </SectionTitle>

        <TestimonialsDisplay
          testimonials={testimonials}
          randomiseButton={testimonialsRandomButton}
        />
      </Box>
      <CtaButton
        title={testimonialsButton}
        target={target}
      />
    </Box>
  </Section >
)

export default Testimonials
