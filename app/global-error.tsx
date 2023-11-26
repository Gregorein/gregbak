"use client"

import { Button, Typography } from "@mui/joy"
import Section from "components/Section/Section"

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
        <Button onClick={reset}>Try again</Button>
      </Section>
    </body>
  </html>
)

export default GlobalError
