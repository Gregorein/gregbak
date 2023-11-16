"use client"

import { Box, Typography } from "@mui/joy"
import { ArrowDown } from "lucide-react"
import { transition } from "theme/utils"

type MoreButtonProps = {
  splashButton: string
  target: string
}

const MoreButton = ({ splashButton, target }: MoreButtonProps) => {
  const onClick = () => {
    const element = document.getElementById(target)

    element?.scrollIntoView({
      behavior: "smooth"
    })
  }

  return (
    <Box
      sx={{
        gridArea: "cta",
        display: "flex",
        alignItems: "flex-end",
        justifyContent: "flex-end",
      }}
    >
      <Typography
        sx={{
          cursor: "pointer",
          transition: transition("color"),
          display: "flex",
          gap: 2,
          alignItems: "center",
          color: "primary.500",
          "&:hover": {
            color: "primary.50"
          }
        }}
        fontSize={48}
        fontWeight={100}
        textTransform="uppercase"
        onClick={onClick}
      >
        {splashButton}
        <ArrowDown
          size={48}
          strokeWidth={1}
          style={{
            position: "relative",
            top: "3px"
          }} />
      </Typography>
    </Box>
  )
}

export default MoreButton