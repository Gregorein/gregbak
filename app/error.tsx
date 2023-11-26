"use client"

import { Button, Typography } from "@mui/joy"
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
  <div>
    <Typography>
      {JSON.stringify(error)}
    </Typography>
    <Button onClick={reset}>Try again</Button>
  </div>
)

export default Error
