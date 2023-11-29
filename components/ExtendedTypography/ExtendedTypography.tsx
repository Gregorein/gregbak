"use client"

import type { TypographyProps } from "@mui/joy"
import { Typography } from "@mui/joy"
import type { LinkProps } from "next/link"
import Link from "next/link"
import { transition } from "theme/utils"

type ExtendedTypography = {
  children: string
  boldProps?: TypographyProps
  italicProps?: TypographyProps
  linkProps?: TypographyProps | LinkProps
} & TypographyProps

const ExtendedTypography = ({
  children,
  boldProps = {},
  italicProps = {},
  linkProps = {},
  ...typographyProps
}: ExtendedTypography) => {
  const text = children
    .split(/(\*\*.*\*\*|\n|\[.*\))/g)
    .map((str, i) => {
      if (str === undefined || str.length == 0) {
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
        const parsedStr = str.replace(/(\*)/g, "")
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


      if (str.match(/\[.*\)/)) {
        const [, title, url] = str.match(/\[(.*)\]\((.*)\)/)
        const external = url.includes("https")

        return (
          <Typography
            component={Link}
            key={i}
            href={url}
            target={external ? "_blank" : "_self"}
            rel={external ? "noopener noreferrer" : ""}
            sx={{
              transition: transition("color"),
              color: "primary.500",
              "&:hover": {
                color: "primary.600"
              },
            }}
            {...linkProps}
          >
            {title}
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