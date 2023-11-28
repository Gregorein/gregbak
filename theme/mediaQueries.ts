export type BreakpointType = "mobile" | "tablet" | "laptop" | "desktop"

export const breakpoints: Record<BreakpointType, number> = {
  mobile: 0,
  tablet: 768,
  laptop: 1366,
  desktop: 1920,
}

export type MediaQueriesType = Record<"under"|"over", Record<BreakpointType, string>>

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
  } as MediaQueriesType
})()

export default mq
