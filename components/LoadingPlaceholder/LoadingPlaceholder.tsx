"use client"

import { Box, CircularProgress } from "@mui/joy"
import LogoLink from "components/LogoLink/LogoLink"
import { AnimatePresence, motion } from "framer-motion"
import { useState } from "react"
import mq from "theme/mediaQueries"
import { useCountUp } from "use-count-up"
import useMounted from "util/useMounted"

const style = {
  container: {
    position: "fixed",
    inset: 0,
    zIndex: 9001,
    display: "flex",
    p: 3,

    ["@media (prefers-color-scheme: light)"]: {
      background: "white",
    },

    ["@media (prefers-color-scheme: dark)"]: {
      background: "black",
    }
  },
  spinner: {
    position: "absolute",
    top: "calc(50% + 45px)",
    left: "50%",
    transform: "translate(-50%, -50%) scale(-100%, -100%)",

    "--CircularProgress-trackColor": "transparent",
    "--CircularProgress-size": "850px",
    "--CircularProgress-trackThickness": "2px",
    "--CircularProgress-progressThickness": "2px",

    [mq.under.laptop]: {
      "--CircularProgress-size": "650px",
    },
    [mq.under.tablet]: {
      "--CircularProgress-size": "300px",
    },
  }
}

const LoadingPlaceholder = () => {
  const isMounted = useMounted()
  const [isReady, setReady] = useState(false)
  const { value } = useCountUp({
    isCounting: isMounted,
    duration: 1,
    start: 0,
    end: 100,
    onComplete: () => setReady(true)
  })

  return (
    <AnimatePresence>
      {!isReady && (
        <Box
          component={motion.div}
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          sx={style.container}
        >
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <LogoLink />
          </motion.div>

          <CircularProgress
            value={Number(value)}
            sx={style.spinner}
            determinate
          />
        </Box>
      )}
    </AnimatePresence>

  )
}

export default LoadingPlaceholder
