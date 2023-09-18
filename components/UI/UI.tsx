"use client"

import { Link, Sheet, Typography } from "@mui/joy"
import { motion } from "framer-motion"


const UI = () => (
  <>
    <Typography
      level="h2"
      sx={{
        fontSize: 24,
        m: 3,
      }}
      component={motion.h2}
      initial={{
        opacity: 0
      }}
      animate={{
        opacity: 1
      }}
      transition={{
        duration: 3
      }}
    >
      gregbak
    </Typography>

    <Sheet sx={{
      width: "50vw",
      margin: "0 auto",
      background: "none"
    }}>
      <Typography
        level="title-md"
        sx={{
          fontSize: 64,
          fontWeight: "bold",
        }}
        component={motion.h1}
        initial={{
          opacity: 0
        }}
        animate={{
          opacity: 1
        }}
        transition={{
          delay: 1,
          duration: 1
        }}
      >
        I'm Greg,
      </Typography>
      <Typography
        level="body-md"
        sx={{
          fontSize: 36,
          paddingLeft: 11,
        }}
        component={motion.p}
        initial={{
          opacity: 0,
          left: -100
        }}
        animate={{
          opacity: 1,
          left: 0
        }}
        transition={{
          delay: 2,
          duration: 1
        }}
      >
        my portfolio is under construction,<br />
        but the reveal is coming soon<br />
        <br />
        you'll catch me <Link href="https://www.linkedin.com/in/gregorein">here</Link>
      </Typography>
    </Sheet>
  </>
)

export default UI
