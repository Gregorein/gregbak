import { defaultLocale, locales } from "i18n"
import createMiddleware from "next-intl/middleware"

export const middleware = createMiddleware({
  locales,
  defaultLocale,
})

export const config = {
  matcher: [
    "/",
    "/((?!api|_next|_vercel|.*\\..*).*)",
  ],
}
