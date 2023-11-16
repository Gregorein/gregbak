"use client"

import { Typography } from "@mui/joy"
import { ArrowDown } from "lucide-react"
import { transition } from "theme/utils"

type CtaButtonProps = {
  title: string
  target: string
}

const CtaButton = ({ title, target }: CtaButtonProps) => {
  const onClick = () => {
    const element = document.getElementById(target)

    console.log({ target, element })

    element?.scrollIntoView({
      behavior: "smooth"
    })
  }

  const label = title
    .split(/(\*\*.*\*\*)/g)
    .map(str => {
      if (str.length == 0) {
        return null
      }
      if (!str.includes("*")) {
        return str
      }

      const parsedStr = str.replace(/(\*\*)/g, "")
      return (
        <Typography
          key={parsedStr}
          fontWeight={800}
        >
          {parsedStr}
        </Typography>
      )
    })

  return (
    <Typography
      sx={{
        cursor: "pointer",
        transition: transition("color"),
        display: "flex",
        gap: 2,
        alignItems: "center",
        color: "primary.500",
        "&:hover": {
          color: "primary.600"
        }
      }}
      fontSize={48}
      fontWeight={100}
      textTransform="uppercase"
      onClick={onClick}
    >
      {label}
      <ArrowDown
        size={48}
        strokeWidth={1}
        style={{
          position: "relative",
          top: "3px"
        }} />
    </Typography>
  )
}

export default CtaButton