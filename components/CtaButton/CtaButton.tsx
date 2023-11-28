"use client"

import { Typography } from "@mui/joy"
import ExtendedTypography from "components/ExtendedTypography/ExtendedTypography"
import { ArrowDown } from "lucide-react"
import type { CSSProperties } from "react"
import { transition } from "theme/utils"
import type Style from "types/style"

type CtaButtonProps = {
  title: string
  target: string
}

const style: Style = {
  text: {
    cursor: "pointer",
    transition: transition("color"),
    display: "flex",
    gap: 2,
    alignItems: "center",
    color: "primary.500",
    "&:hover": {
      color: "primary.600"
    }
  },
  icon: {
    position: "relative",
    top: "3px"
  }
}

const CtaButton = ({ title, target }: CtaButtonProps) => {
  const handleScrollTo = () => {
    const element = document.getElementById(target)

    element?.scrollIntoView({
      behavior: "smooth"
    })
  }
  return (
    <Typography
      sx={style.text}
      fontSize={36}
      fontWeight={100}
      textTransform="uppercase"
      onClick={handleScrollTo}
    >
      <ExtendedTypography>
        {title}
      </ExtendedTypography>
      <ArrowDown
        size={36}
        strokeWidth={1}
        style={style.icon as CSSProperties}
      />
    </Typography>
  )
}

export default CtaButton