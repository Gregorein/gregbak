"use client"

import { Box, Typography } from "@mui/joy"
import { ArrowUpRight } from "lucide-react"
import Link from "next/link"
import localiseDate from "util/localiseDate"

type AchievementListProps = {
  entries: {
    title: string
    text: string
    date: {
      end?: string
      start?: string
    }
    url?: string
  }[]
}

const AchievementList = ({
  entries,
}: AchievementListProps) => (
  <Box
    sx={{
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      gap: 2
    }}
  >
    {entries.map(entry => (
      <Box
        key={entry.title}
        sx={{
          display: "flex",
          width: "710px",
          flexDirection: "column",
          alignItems: "center"
        }}
      >
        <Typography
          component={entry.url ? Link : Typography}
          href={entry.url || undefined}
          fontSize={28}
          fontFamily="anivers"
          sx={{
            display: "flex",
            gap: 1,
            alignItems: "center",
            color: entry.url ? "primary.500" : "text.primary",
            textDecoration: "none"
          }}
        >
          {entry.title} {entry.url && <ArrowUpRight />}
        </Typography>
        <Typography
          textTransform="lowercase"
          sx={{
            color: "primary.500"
          }}
        >
          {localiseDate(entry.date[0].end || entry.date[0].start)}
        </Typography>
        <Typography>
          {entry.text}
        </Typography>
      </Box>
    ))}
  </Box>
)

export default AchievementList
