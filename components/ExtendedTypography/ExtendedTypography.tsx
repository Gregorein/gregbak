"use client"

import type { TypographyProps } from "@mui/joy"
import { Typography } from "@mui/joy"

type ExtendedTypography = {
  children: string
  boldProps?: TypographyProps
  italicProps?: TypographyProps
} & TypographyProps

const ExtendedTypography = ({
  children,
  boldProps = {},
  italicProps = {},
  ...typographyProps
}: ExtendedTypography) => {
  const text = children
    .split(/(\*\*.*\*\*|\n)/g)
    .map((str, i) => {
      if (str.length == 0) {
        return null
      }

      if (str.includes("\n")) {
        return <br key={i} />
      }

      if (str.match(/(\*\*.*\*\*)/)) { // bold
        const parsedStr = str.replace(/(\*\*)/g, "")
        return (
          <Typography
            key={i}
            fontWeight={800}
            {...boldProps}
          >
            {parsedStr}
          </Typography>
        )
      }

      if (str.match(/(\*.*\*)/)) { // italic
        const parsedStr = str.replace(/(\*\*)/g, "")
        return (
          <Typography
            key={i}
            fontStyle="italic"
            {...italicProps}
          >
            {parsedStr}
          </Typography>
        )
      }

      return str
    })

  return (
    <Typography {...typographyProps}>
      {text}
    </Typography>
  )
}

export default ExtendedTypography