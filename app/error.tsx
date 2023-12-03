"use client"

import { Box, Button, Typography } from "@mui/joy"
import { RefreshCw } from "lucide-react"
import type NextError from "next/error"

type ErrorProps = {
  error: NextError & {
    digest?: string
  }
  reset: () => void
}

const Error = ({
  error,
  reset
}: ErrorProps) => (
  <Box sx={{
    display: "flex",
    justifyContent: "center",
    alignItems: "center"
  }}
  >
    <Typography>
      {JSON.stringify(error)}
    </Typography>
    <Button onClick={reset}><RefreshCw /></Button>
  </Box>
)

export default Error
