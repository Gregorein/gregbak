"use client"

import { Box, Typography } from "@mui/joy"
import LinkArrow from "assets/icons/LinkArrow"
import Link from "next/link"
import mq from "theme/mediaQueries"
import localiseDate from "util/localiseDate"

type AchievementListProps = {
  entries: {
    title: string
    text: string
    date: {
      end?: string
      start?: string
    }[]
    url?: string
  }[],
  locale: string
}

const style = {
  container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: 2,

    [mq.under.tablet]: {
      alignItems: "flex-start"
    }
  },
  entry: {
    display: "flex",
    width: "710px",
    flexDirection: "column",
    alignItems: "center",

    [mq.under.tablet]: {
      width: "unset",
      alignItems: "flex-start"
    }
  },
  link: {
    display: "flex",
    gap: 1,
    alignItems: "center",
    color: "primary.500",
    textDecoration: "none",
    fontSize: 28,
    fontFamily: "anivers",
    textAlign: "center",

    [mq.under.tablet]: {
      fontSize: 21,
      textAlign: "left"
    }
  },
  title: {
    display: "flex",
    gap: 1,
    alignItems: "center",
    color: "text.primary",
    fontSize: 28,
    fontFamily: "anivers",
    textAlign: "center",

    [mq.under.tablet]: {
      fontSize: 21,
      textAlign: "left"
    }
  },
  date: {
    textTransform: "lowercase",
    color: "primary.500",
    fontSize: 16,

    [mq.under.tablet]: {
      fontSize: 12,
      textAlign: "left"
    }
  },
  text: {
    fontSize: 18,

    [mq.under.tablet]: {
      fontSize: 14,
      textAlign: "left"
    }
  }
}

const AchievementList = ({
  entries,
  locale
}: AchievementListProps) => (
  <Box sx={style.container}>
    {entries.map(entry => (
      <Box
        key={entry.title}
        sx={style.entry}
      >
        <Typography
          component={entry.url ? Link : Typography}
          href={entry.url || undefined}
          sx={entry.url ? style.link : style.title}
        >
          {entry.title} {entry.url && <LinkArrow />}
        </Typography>
        {entry.date.length > 0 && (
          <Typography sx={style.date}>
            {localiseDate(entry.date[0].end || entry.date[0].start, locale)}
          </Typography>
        )}
        <Typography sx={style.text}>
          {entry.text}
        </Typography>
      </Box>
    ))}
  </Box>
)
export default AchievementList
