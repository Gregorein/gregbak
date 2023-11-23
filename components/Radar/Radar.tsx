"use client"

import { Typography } from "@mui/joy"
import { Box, Radio, radioClasses, RadioGroup, Tooltip } from "@mui/joy"
import * as d3 from "d3"
import { transition } from "theme/utils"
import type { ChangeEvent } from "react"
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
  "neutral",
  "primary",
  "secondary",
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
  const [activeLayer, setActiveLayer] = useState<number | undefined>(undefined)
  const [activeCoordinates, setCoordinates] = useState<[number, number]>(undefined)

  const handlePointClick = (entry: RadarEntry, coordinates: [number, number]) => {
    onPointClick(entry)
    setCoordinates(coordinates)
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
      const angle = xScales[l](i)
      const radius = yScale(value)

      const { x, y } = polarToCartesian(
        angle - Math.PI / 2,
        yScale(value)
      )

      const Point = (
        <Box
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
                stroke="transparent"
                opacity="0"
              />
            </Tooltip>
          )}
        </g>
      </svg>

      <RadioGroup
        orientation="horizontal"
        aria-label="chart legend"
        name="chart legend"
        value={undefined}
        variant="plain"
        onChange={(e: ChangeEvent<HTMLInputElement>) => handleToggleLayer(Number(e.target.value))}
      >
        {data.map((group, i) => (
          <Box
            key={i}
            sx={{
              position: "relative",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              height: "30px",
              [`&[data-first-child] .${radioClasses.action}`]: {
                borderTopLeftRadius: "calc(var(--radius-sm) - 1px)",
                borderBottomLeftRadius: "calc(var(--radius-sm) - 1px)",
              },
              [`&[data-last-child] .${radioClasses.action}`]: {
                borderTopRightRadius: "calc(var(--radius-sm) - 1px)",
                borderBottomRightRadius: "calc(var(--radius-sm) - 1px)",
              },
            }}
          >
            <Radio
              value={i}
              disableIcon
              color={variant[i]}
              label={
                <Typography
                  sx={{
                    padding: "10px"
                  }}
                >
                  {group.title}
                </Typography>
              }
              variant={activeLayer === i ? "solid" : "soft"}
              slotProps={{
                input: { "aria-label": group.title },
                action: {
                  sx: {
                    boxSizing: "content-box",
                    borderRadius: 0,
                    // transition: "none"
                  },
                },
                label: { sx: { lineHeight: "30px" } },
              }}
            />
          </Box>
        ))}
      </RadioGroup>
    </Box>
  )
}