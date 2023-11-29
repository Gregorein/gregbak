import { useLayoutEffect, useState } from "react"
import type { BreakpointVariant } from "theme/mediaQueries"
import { breakpoints } from "theme/mediaQueries"

const useMediaQuery = () => {
  const [width, setWidth] = useState(0)
  const updateWidth = () => {
    setWidth(window.innerWidth)
  }

  useLayoutEffect(() => {
    window.addEventListener("resize", updateWidth)
    updateWidth()

    return () => {
      window.removeEventListener("resize", updateWidth)
    }
  }, [])

  const under = {}
  const over = {}

  for (const [breakpoint, value] of Object.entries(breakpoints)) {
    over[breakpoint] = width >= value
    under[breakpoint] = width < value
  }

  return {
    over,
    under
  } as Record<"under" | "over", Record<BreakpointVariant, boolean>>
}

export default useMediaQuery