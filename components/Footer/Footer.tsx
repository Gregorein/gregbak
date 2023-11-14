import { Box, Typography } from "@mui/joy"
import NavigationSocial from "components/NavigationSocial/NavigationSocial"
import { ArrowUpRight } from "lucide-react"
import Link from "next/link"
import { transition } from "theme/utils"

const Footer = () => (
  <Box
    component="footer"
    sx={{
      backgroundColor: "primary.500",
    }}
  >
    <Typography
      sx={{
        display: "flex",
        position: "relative",
        width: "750px",
        flexDirection: "column",
        paddingTop: 18,
        margin: "0 auto 240px",
        cursor: "pointer",
        color: "primary.50",
        whiteSpace: "pre"
      }}
    >
      <Typography
        lineHeight={0.5}
        fontSize={36}
        fontFamily="anivers"
      >
        _ready to dive in?_
      </Typography>
      <Typography
        lineHeight={1}
        fontSize={144}
        fontWeight="100"
        textTransform="uppercase"
      >
        say hello!
      </Typography>
      <Typography
        sx={{
          position: "absolute",
          left: "calc(50% - 125px)",
          bottom: "-144px",
        }}
      >
        <ArrowUpRight
          size={170}
          strokeWidth={1}
          strokeLinecap="butt"
          strokeLinejoin="miter"
        />
      </Typography>
    </Typography>

    <Box
      sx={{
        padding: 3,
        display: "flex",
        justifyContent: "space-between"
      }}
    >
      <Typography
        component={Link}
        href="/policy"
        sx={{
          flex: 1,
          textDecoration: "none",
          transition: transition("color"),
          color: "primary.700",
          "&:hover": {
            color: "primary.900"
          }
        }}
      >
        __cookies & privacy policy__
      </Typography>


      <NavigationSocial secondary />

      <Typography
        sx={{
          flex: 1,
          fontFamily: "anivers",
          fontWeight: "bold",
          textAlign: "right",
          color: "primary.700"
        }}
      >
        &copy; 2013-2023 greg bak, all rights reserved.
      </Typography>
    </Box>
  </Box>
)
export default Footer
