export type BreakpointVariant = "mobile" | "tablet" | "laptop" | "desktop"

export const breakpoints: Record<BreakpointVariant, number> = {
  mobile: 0,
  tablet: 768,
  laptop: 1366,
  desktop: 1920,
}

const mq = (() => {
  const under = {}
  const over = {}

  for (const [breakpoint, value] of Object.entries(breakpoints)) {
    over[breakpoint] = `@media (min-width: ${value}px)`
    under[breakpoint] = `@media (max-width: ${value}px)`
  }

  return {
    over,
    under
  } as Record<"under"|"over", Record<BreakpointVariant, string>>
})()

export default mq
