"use client"

import { Typography } from "@mui/joy"
import { Box } from "@mui/system"
import { Shuffle } from "lucide-react"
import Link from "next/link"
import { useState } from "react"
import mq from "theme/mediaQueries"
import { transition } from "theme/utils"

type TestimonialsDisplayProps = {
  testimonials: {
    text: string
    name: string
    client: {
      name: string
      url: string
    }
  }[]
  randomiseButton: string
}

const style = {
  container: {
    display: "flex",
    flexDirection: "column",
    gap: 3
  },
  text: {
    fontSize: 36,
    fontFamily: "anivers",

    [mq.under.tablet]: {
      fontSize: 21
    }
  },
  footer: {
    display: "flex",
    justifyContent: "space-between",

    [mq.under.tablet]: {
      flexDirection: "column",
      gap: 1,
    }
  },
  author: {
    display: "flex",
  },
  link: {
    transition: transition("color"),
    color: "text.tertiary",
    "&:hover": {
      color: "primary.600"
    },
    textDecoration: "none"
  },
  randomiseButton: {
    cursor: "pointer",
    transition: transition("color"),
    display: "flex",
    gap: 1,
    alignItems: "center",
    color: "primary.500",
    "&:hover": {
      color: "primary.600"
    }
  }
}

const TestimonialsDisplay = ({
  testimonials,
  randomiseButton
}: TestimonialsDisplayProps) => {
  const [index, setIndex] = useState(0)

  const handleShuffle = () => {
    setIndex(((index + 1) + testimonials.length) % testimonials.length)
  }

  return (
    <Box sx={style.container}>
      <Typography sx={style.text}>
        "{testimonials[index].text}"
      </Typography>

      <Box sx={style.footer}>
        <Box sx={style.author}>
          <Typography
            fontSize={24}
            textTransform="uppercase"
            fontWeight={800}
            sx={{
              color: "text.primary"
            }}
          >
            {testimonials[index].name}
            <Typography
              component={Link}
              href={testimonials[index].client.url}
              target="_blank"
              rel="noopener noreferrer"
              sx={style.link}
            >
              @{testimonials[index].client.name}
            </Typography>
          </Typography>
        </Box>

        <Typography
          sx={style.randomiseButton}
          fontSize={24}
          fontWeight={800}
          textTransform="uppercase"
          onClick={handleShuffle}
        >
          {randomiseButton}
          <Shuffle />
        </Typography>
      </Box>
    </Box>
  )
}

export default TestimonialsDisplay