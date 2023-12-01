"use client"

import type { TypographyProps } from "@mui/joy"
import { Typography } from "@mui/joy"
import ExtendedTypography from "components/ExtendedTypography/ExtendedTypography"
import { ArrowDown } from "lucide-react"
import type { CSSProperties } from "react"
import mq from "theme/mediaQueries"
import { transition } from "theme/utils"
import type Style from "types/style"
import useMediaQuery from "util/useMediaQuery"

type CtaButtonProps = {
  title: string
  target: string
} & TypographyProps

const style: Style = {
  text: {
    cursor: "pointer",
    transition: transition("color"),
    display: "flex",
    gap: 2,
    alignItems: "center",
    fontSize: 36,
    fontWeight: 100,
    textTransform: "uppercase",
    color: "primary.500",
    "&:hover": {
      color: "primary.600"
    },

    [mq.under.tablet]: {
      fontSize: 28,
      gap: 1
    }
  },
  icon: {
    position: "relative",
    top: "3px"
  }
}

const CtaButton = ({ title, target, ...typographyProps }: CtaButtonProps) => {
  const width = useMediaQuery()

  const handleScrollTo = () => {
    const element = document.getElementById(target)

    element?.scrollIntoView({
      behavior: "smooth"
    })
  }
  return (
    <Typography
      sx={style.text}
      onClick={handleScrollTo}
      {...typographyProps}
    >
      <ExtendedTypography>
        {title}
      </ExtendedTypography>
      <ArrowDown
        size={width.under.tablet ? 30 : 36}
        strokeWidth={width.under.tablet ? 1.5 : 1}
        style={style.icon as CSSProperties}
      />
    </Typography>
  )
}

export default CtaButton