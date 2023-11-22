type TooltipPlacement = "bottom-end"
| "bottom-start"
| "bottom"
| "left-end"
| "left-start"
| "left"
| "right-end"
| "right-start"
| "right"
| "top-end"
| "top-start"
| "top"

const getTooltipPlacement = (radians: number) => {
  const step = 30
  const angle = radians * 180 / Math.PI

  const placements: [number, TooltipPlacement][] = [
    [step / 2, "top"],
    [step, "top-start"],
    [step * 2, "right-end"],
    [step * 3, "right"],
    [step * 4, "right-start"],
    // [step * 5, "bottom-start"],
    // [step * 6, "bottom"],
    [step * 7, "bottom-end"],
    [step * 8, "left-start"],
    [step * 9, "left"],
    [step * 10, "left-end"],
    [step * 11, "top-end"],
    [step * 12, "top"]
  ]

  for (const placement of placements) {
    if (angle < placement[0]) {
      return placement[1]
    }
  }
}

export default getTooltipPlacement
