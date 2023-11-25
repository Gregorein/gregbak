"use client"

import { Button, ButtonGroup } from "@mui/joy"
import { Box, Tooltip } from "@mui/joy"
import * as d3 from "d3"
import { transition } from "theme/utils"
import { Fragment, useState } from "react"

const polarToCartesian = (angle: number, distance: number) => {
  const x = distance * Math.cos(angle)
  const y = distance * Math.sin(angle)
  return {
    x,
    y
  }
}

const variant: Array<"neutral" | "primary" | "secondary"> = [
  "primary",
  "secondary",
  "neutral",
]

export type RadarEntry = {
  title: string
  text: string
  level: {
    title: string
    text: string
    value: number
  }
}

type RadarProps = {
  onPointClick?: (entry: RadarEntry | undefined) => void
  activeEntry?: RadarEntry
  size?: number
  data: {
    title: string
    entries: RadarEntry[]
  }[]
}

export const Radar = ({
  size = 710,
  data,
  onPointClick,
  activeEntry
}: RadarProps) => {
  const [activeLayer, setActiveLayer] = useState<number>(undefined)
  const [activeCoordinates, setCoordinates] = useState<[number, number]>(undefined)

  const handlePointClick = (entry: RadarEntry, coordinates: [number, number]) => {
    if (activeEntry === entry) {
      onPointClick(undefined)
      setCoordinates(undefined)
    } else {
      onPointClick(entry)
      setCoordinates(coordinates)
    }
  }

  const handleToggleLayer = (layer: number | undefined) => {
    if (activeLayer === layer) {
      setActiveLayer(undefined)
    } else {
      setActiveLayer(layer)
    }
  }

  const RADIUS_INNER = (size / 2) / 5
  const RADIUS_OUTER = (size / 2) - 15
  const RING_SIZE = size / 8 + 7.5

  const values = data.map(layer => layer.entries.map(({ level: { value } }) => value)).flat()
  const domain = [Math.min.apply(null, values), Math.max.apply(null, values)]

  const xScales = data.map(layer => d3
    .scaleLinear()
    .domain([0, layer.entries.length])
    .range([0, 2 * Math.PI])
  )
  const yScale = d3
    .scaleRadial()
    .domain(domain)
    .range([RADIUS_INNER, RADIUS_OUTER])

  const d = d3
    .lineRadial()
    .curve(d3.curveCardinalClosed.tension(0.5))

  const paths = data.map((layer, l) => {
    const labels = []

    const coordinates = layer.entries.map((entry, i) => {
      const { level: { value }, title } = entry
      const angle = xScales[l](i) + (l * Math.PI / 12)
      const radius = yScale(value)

      const { x, y } = polarToCartesian(
        angle - (Math.PI / 2),
        yScale(value)
      )

      const Point = (
        <Box
          key={i}
          component="circle"
          cx={x}
          cy={y}
          r={activeEntry === entry ? 15 : 7.5}
          fill={`var(--palette-${variant[l]}-500)`}
          fillOpacity={activeLayer !== l ? 0.3 : 1}
          sx={{
            cursor: "pointer",
            transition: transition("r", "fillOpacity"),
            "&:hover": {
              r: activeEntry === entry ? 15 : 10
            }
          }}
          onClick={() => handlePointClick(entry, [x, y])}
        />
      )

      if (activeEntry === entry) {
        labels.push(Point)
      } else {
        labels.push(
          <Tooltip
            key={i}
            title={title}
            variant="plain"
            placement="top"
            arrow
          >
            {Point}
          </Tooltip>
        )
      }

      const coordinate: [number, number] = [angle, radius]
      return coordinate
    })

    return (
      <Fragment
        key={l}
      >
        <Box
          component="path"
          d={d(coordinates)}
          stroke={`var(--palette-${variant[l]}-500)`}
          strokeWidth={4}
          fill={`var(--palette-${variant[l]}-500)`}
          fillOpacity={0.3}
          opacity={activeLayer !== l ? 0.3 : 1}
          sx={{
            position: "relative",
            pointerEvents: "none",
            transition: transition("r", "opacity"),
          }}
        />

        {labels}
      </Fragment>
    )
  })

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: 1,
        alignItems: "center"
      }}
    >
      <svg
        height={size}
        width={size}
      >
        <g transform={`translate(${size / 2}, ${size / 2})`}>
          <circle
            cx={0}
            cy={0}
            r={RADIUS_OUTER - RING_SIZE / 2}
            stroke="var(--palette-background-radar)"
            strokeWidth={RING_SIZE}
            opacity={0.67}
            fill="none"
          />

          {paths}

          {activeCoordinates && (
            <Tooltip
              title={activeEntry.title}
              open
              arrow
              variant="plain"
              placement="top"
            >
              <circle
                cx={activeCoordinates[0]}
                cy={activeCoordinates[1]}
                r={7}
                style={{ pointerEvents: "none" }}
                stroke="transparent"
                opacity="0"
              />
            </Tooltip>
          )}
        </g>
      </svg>

      <ButtonGroup
        aria-label="chart selector"
        size="sm"
      >
        {data.map((group, i) => (
          <Button
            key={i}
            color={variant[i]}
            variant={activeLayer === i ? "solid" : "soft"}
            onClick={() => handleToggleLayer(i)}
          >
            {group.title}
          </Button>
        ))}
      </ButtonGroup>
    </Box>
  )
}