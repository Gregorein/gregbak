import {ReactNode} from "react"
import {Analytics} from "@vercel/analytics/react"

const RootLayout = ({
  children,
}: {
  children: ReactNode
}) => (
  <html lang="en">
    <body>
      {children}
      <Analytics />
    </body>
  </html>
)

export default RootLayout
