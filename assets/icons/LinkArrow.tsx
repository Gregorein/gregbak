"use client"

import { ArrowUpRight } from "lucide-react"
import useMediaQuery from "util/useMediaQuery"

type LinkArrowType = {
  sx?: object
}

const LinkArrow = ({
  sx = {}
}: LinkArrowType) => {
  const width = useMediaQuery()

  return (
    <ArrowUpRight
      size={width.under.tablet ? 32 : 48}
      style={sx}
    />
  )
}

export default LinkArrow
