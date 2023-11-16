"use client"

import { Typography, useColorScheme } from "@mui/joy"
import { Box } from "@mui/system"
import { Shuffle } from "lucide-react"
import Link from "next/link"
import { useState } from "react"
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

const TestimonialsDisplay = ({
  testimonials,
  randomiseButton
}: TestimonialsDisplayProps) => {
  const { mode } = useColorScheme()
  const [index, setIndex] = useState(0)

  const handleShuffle = () => {
    setIndex(((index + 1) + testimonials.length) % testimonials.length)
  }

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: 3
      }}
    >
      <Typography fontSize={56} fontFamily="anivers">
        "{testimonials[index].text}"
      </Typography>

      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between"
        }}
      >
        <Box
          sx={{
            display: "flex",
          }}
        >
          <Typography
            fontSize={24}
            textTransform="uppercase"
            fontWeight="bold"
            sx={{
              color: mode === "dark" ? "neutral.50" : "neutral.900"
            }}
          >
            {testimonials[index].name}
            <Typography
              component={Link}
              href={testimonials[index].client.url}
              sx={{
                color: mode === "dark" ? "neutral.300" : "neutral.600",
                textDecoration: "none"
              }}
            >
              @{testimonials[index].client.name}
            </Typography>
          </Typography>
        </Box>

        <Typography
          sx={{
            cursor: "pointer",
            transition: transition("color"),
            display: "flex",
            gap: 1,
            alignItems: "center",
            color: "primary.500",
            "&:hover": {
              color: "primary.600"
            }
          }}
          fontSize={24}
          fontWeight="bold"
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