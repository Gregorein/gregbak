"use client"

import { Box, Typography } from "@mui/joy"
import mq from "theme/mediaQueries"
import type Style from "types/style"

type SloganProps = {
  words: {
    text: string
  }[]
}

const style: Style = {
  leftSloganContainer: {
    position: "absolute",
    left: -180,
    top: 30,
    bottom: 60,
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    alignItems: "flex-end",
    transform: "translate(-100%, 0)",
    pointerEvents: "none",

    [mq.under.laptop]: {
      position: "static",
      left: "unset",
      top: "unset",
      bottom: "unset",
      transform: "unset",
      alignItems: "flex-start"
    }
  },
  leftSlogan: {
    color: "background.level2",
    lineHeight: 1.25,
    fontSize: 144,

    [mq.under.laptop]: {
      fontSize: 96
    },
    [mq.under.tablet]: {
      fontSize: 56
    }
  },
  rightSloganContainer: {
    position: "absolute",
    right: -180,
    top: 30,
    bottom: 60,
    display: "flex",
    justifyContent: "space-between",
    flexDirection: "column",
    transform: "translate(100%, 0)",
    pointerEvents: "none",

    [mq.under.laptop]: {
      position: "static",
      right: "unset",
      top: "unset",
      bottom: "unset",
      transform: "unset",
      alignItems: "flex-end"
    }
  },
  rightSlogan: {
    fontSize: 144,
    lineHeight: 1.25,

    [mq.under.laptop]: {
      fontSize: 96
    },
    [mq.under.tablet]: {
      fontSize: 56
    }
  }
}

export const SloganLeft = ({ words }: SloganProps) => (
  <Box sx={style.leftSloganContainer}>
    {words.map(({ text }) => (
      <Typography
        key={text}
        sx={style.leftSlogan}
        fontWeight={100}
        textTransform="lowercase"
      >
        {text}
      </Typography>
    ))}
  </Box>
)

export const SloganRight = ({ words }: SloganProps) => (
  <Box sx={style.rightSloganContainer}>
    {words.map(({ text }) => {
      const isBold = Number(text.includes("**"))

      return (
        <Typography
          key={text}
          sx={{
            color: isBold ? "text.primary" : "background.level2",
            ...style.rightSlogan
          }}
          fontWeight={isBold ? 800 : 100}
          textTransform="lowercase"
        >
          {text.split("**")}
        </Typography>
      )
    })}
  </Box>
)
