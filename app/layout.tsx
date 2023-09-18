import type { ReactNode } from "react"
import { Analytics } from "@vercel/analytics/react"
import ThemeProvider from "../components/ThemeProvider/ThemeProvider"

import "normalize.css"
import "styles/global.css"

export const metadata = {
  title: "Greg Bak Portfolio | coming soon",
  description: "portfolio is under construction but the reveal is coming soon"
}

const RootLayout = ({
  children,
}: {
  children: ReactNode
}) => (
  <html lang="en">
    <head>
      <meta name="viewport" content="initial-scale=1, width=device-width" />
      <link rel="stylesheet" href="https://use.typekit.net/vrv7gnc.css" />
    </head>
    <body>
      <ThemeProvider>
        {children}
      </ThemeProvider>
      <Analytics />
    </body>
  </html>
)

export default RootLayout
