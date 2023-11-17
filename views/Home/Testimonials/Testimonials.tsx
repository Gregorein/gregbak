import { Box, Typography } from "@mui/joy"
import CtaButton from "components/CtaButton/CtaButton"
import Section from "components/Section/Section"
import TestimonialsDisplay from "components/TestimonialsDisplay/TestimonialsDisplay"

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
  <Section id={id} centered>
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: 6,
        width: "840px"
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: 1,
        }}
      >
        <Typography
          sx={{
            color: "primary.500"
          }}
          fontSize={48}
          fontWeight={800}
        >
          {testimonialsTitle}
        </Typography>

        <TestimonialsDisplay
          testimonials={testimonials}
          randomiseButton={testimonialsRandomButton}
        />
      </Box>
      <CtaButton title={testimonialsButton} target={target} />
    </Box>
  </Section>
)

export default Testimonials
