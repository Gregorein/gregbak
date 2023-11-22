"use client"

import type { Theme } from "@mui/joy"
import { Box, Typography } from "@mui/joy"

type SlogansProps = {
  aboutSloganLeft: {
    text: string
  }[]
  aboutSloganRight: {
    text: string
  }[]
}

const Slogans = ({ aboutSloganLeft, aboutSloganRight }: SlogansProps) => {
  const rightSlogan = aboutSloganRight.map(({ text }) => {
    const isBold = Number(text.includes("**"))

    return (
      <Typography
        key={text}
        sx={(theme: Theme) => ({
          color: isBold ? theme.palette.text.primary : theme.palette.background.level2
        })}
        fontSize={144}
        fontWeight={isBold ? 800 : 100}
        textTransform="lowercase"
      >
        {text.split("**")}
      </Typography>
    )
  })
  const leftSlogan = aboutSloganLeft.map(({ text }) => (
    <Typography
      key={text}
      sx={(theme: Theme) => ({
        color: theme.palette.background.level2
      })}
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