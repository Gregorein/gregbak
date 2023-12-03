"use client"

import { Button, Typography } from "@mui/joy"
import Section from "components/Section/Section"
import { RefreshCw } from "lucide-react"

type GlobalErrorProps = {
  error
  reset: () => void
}

const GlobalError = ({
  error,
  reset
}: GlobalErrorProps) => (
  <html>
    <body>
      <Section
        centered
      >
        <Typography>
          {JSON.stringify(error)}
        </Typography>
        <Button onClick={reset}><RefreshCw /></Button>
      </Section>
    </body>
  </html>
)

export default GlobalError
