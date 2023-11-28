import { Box } from "@mui/system"
import mq from "theme/mediaQueries"
import type Style from "types/style"

const style: Style = {
  container: {
    margin: "0 -150px",
    gridArea: "head",
    border: "2px solid",
    borderColor: "primary.500",
    width: "850px",
    height: "850px",
    borderRadius: "50%",

    [mq.under.laptop]: {
      margin: "-150px auto",
      width: "650px",
      height: "650px",
    },
    [mq.under.tablet]: {
      // position: "absolute",
      // top: "50%",
      position: "relative",
      left: "50%",
      transform: "translate(-50%, 0)",
    }
  }
}

const Head = () => (
  <Box sx={style.container} />
)

export default Head