import { Box } from "@mui/system"
import mq from "theme/mediaQueries"
import { transition } from "theme/utils"

const style = {
  container: {
    pointerEvents: "none"
  },
  halo: {
    transition: transition("opacity", "width", "height"),
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: "850px",
    height: "850px",
    borderRadius: "50%",
    border: "2px solid",
    borderColor: "primary.500",
    opacity: 1,

    [mq.under.laptop]: {
      //   margin: "-150px auto",
      width: "650px",
      height: "650px",
    },
    [mq.under.tablet]: {
      opacity: 0
    }
  }
}

const Head = () => (
  <Box sx={style.container}>
    <Box sx={style.halo} />
  </Box>
)

export default Head