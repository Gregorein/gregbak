import { Box } from "@mui/joy"
import Head from "components/Head/Head"
import Section from "components/Section/Section"

import Experience from "./Experience"
import Greeting from "./Greeting"
import MoreButton from "./MoreButton"
import Professions from "./Professions"

type SplashProps = {
  labels: {
    splashButton: string
    splashTitle: string
    splashProfessions: {
      text: string
    }[]
    splashExperience: {
      count: number
      subject: string
    }[]
  },
  target: string
}

const Splash = ({
  labels: {
    splashTitle,
    splashProfessions,
    splashExperience,
    splashButton,
  },
  target
}: SplashProps) => (
  <Section centered>
    <Box
      sx={{
        display: "grid",
        maxHeight: "850px",
        width: "100%",
        flex: 1,
        gridTemplateColumns: "1fr 850px 1fr",
        gridTemplateRows: "1fr 1fr",
        gridTemplateAreas:
          `"greeting head experience"
          "professions head cta"`,
      }}
    >
      <Greeting splashTitle={splashTitle} />
      <Professions splashProfessions={splashProfessions} />
      <Experience splashExperience={splashExperience} />
      <MoreButton splashButton={splashButton} target={target} />

      <Head />
    </Box>
  </Section>
)

export default Splash
