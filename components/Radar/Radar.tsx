"use client"

import type { Theme } from "@mui/joy"
import { Typography } from "@mui/joy"
import { Box, Radio, radioClasses, RadioGroup, Tooltip, useColorScheme } from "@mui/joy"
import palette from "theme/palette"
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

const layerColors = [
  palette.neutral[500],
  palette.primary[500],
  palette.secondary[500],
]

const buttonColors: ("neutral" | "primary" | "secondary")[] = [
  "neutral",
  "primary",
  "secondary"
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
  const { mode } = useColorScheme()
  const [activeLayer, setActiveLayer] = useState<number | undefined>(undefined)
  const [activeCoordinates, setCoordinates] = useState<[number, number]>(undefined)

  const handlePointClick = (entry: RadarEntry, coordinates: [number, number]) => {
    onPointClick(entry)
    setCoordinates(coordinates)
  }

  const handleToggleLayer = (layer: number | undefined) => {
    console.log({
      activeLayer,
      layer
    })

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
          fill={layerColors[l]}
          fillOpacity={activeLayer !== l ? 0.5 : 1}
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
          stroke={layerColors[l]}
          strokeWidth={4}
          fill={layerColors[l]}
          fillOpacity={0.5}
          opacity={activeLayer !== l ? 0.5 : 1}
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
            stroke={mode === "dark" ? palette.primary[900] : palette.neutral[100]}
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
            sx={(theme: Theme) => ({
              position: "relative",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              height: "30px",
              [`&[data-first-child] .${radioClasses.action}`]: {
                borderTopLeftRadius: `calc(${theme.vars.radius.sm} - 1px)`,
                borderBottomLeftRadius: `calc(${theme.vars.radius.sm} - 1px)`,
              },
              [`&[data-last-child] .${radioClasses.action}`]: {
                borderTopRightRadius: `calc(${theme.vars.radius.sm} - 1px)`,
                borderBottomRightRadius: `calc(${theme.vars.radius.sm} - 1px)`,
              },
            })}
          >
            <Radio
              value={i}
              disableIcon
              color={buttonColors[i]}
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