"use client"

import { Box, Typography, useColorScheme } from "@mui/joy"

type SlogansProps = {
  aboutSloganLeft: {
    text: string
  }[]
  aboutSloganRight: {
    text: string
  }[]
}

const sloganColors = [
  // [thin, bold][dark, light]
  ["neutral.300", "neutral.600"],
  ["neutral.900", "neutral.50"]
]


const Slogans = ({ aboutSloganLeft, aboutSloganRight }: SlogansProps) => {
  const { mode } = useColorScheme()

  const rightSlogan = aboutSloganRight.map(({ text }) => (
    <Typography
      key={text}
      sx={{
        color: sloganColors[Number(text.includes("**"))][Number(mode == "dark")]
      }}
      fontSize={144}
      fontWeight={text.includes("**") ? 800 : 100}
      textTransform="lowercase"
    >
      {text.split("**")}
    </Typography>
  ))
  const leftSlogan = aboutSloganLeft.map(({ text }) => (
    <Typography
      key={text}
      sx={{
        color: sloganColors[0][Number(mode == "dark")]
      }}
      fontSize={144}
      fontWeight={100}
      textTransform="lowercase"
    >
      {text}
    </Typography>
  ))

  return (
    <>
      <Box
        sx={{
          position: "absolute",
          left: -180,
          top: 10,
          display: "flex",
          gap: 3,
          flexDirection: "column",
          alignItems: "flex-end",
          transform: "translate(-100%, 0)",
          pointerEvents: "none"
        }}
      >
        {leftSlogan}
      </Box>
      <Box
        sx={{
          position: "absolute",
          right: -180,
          top: 10,
          display: "flex",
          gap: 3,
          flexDirection: "column",
          transform: "translate(100%, 0)",
          pointerEvents: "none"
        }}
      >
        {rightSlogan}
      </Box>
    </>
  )
}

export default Slogans