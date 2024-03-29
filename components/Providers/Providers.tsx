"use client"

import createCache from "@emotion/cache"
import { CacheProvider } from "@emotion/react"
import {
  CssBaseline,
  CssVarsProvider
} from "@mui/joy"
import { useServerInsertedHTML } from "next/navigation"

import type { ReactNode } from "react"
import { useState } from "react"
import theme from "theme/theme"
import useMounted from "util/useMounted"

export type ProvidersProps = {
  children: ReactNode
}

const Providers = ({ children }: ProvidersProps) => {
  const isMounted = useMounted()

  const [{ cache, flush }] = useState(() => {
    const cache = createCache({
      key: "joy"
    })
    cache.compat = true

    const prevInsert = cache.insert
    let inserted: string[] = []

    cache.insert = (...args) => {
      const serialised = args[1]

      if (cache.inserted[serialised.name] === undefined) {
        inserted.push(serialised.name)
      }

      return prevInsert(...args)
    }

    const flush = () => {
      const prevInserted = inserted
      inserted = []

      return prevInserted
    }

    return {
      cache,
      flush
    }
  })

  useServerInsertedHTML(() => {
    const names = flush()

    if (names.length === 0) {
      return null
    }

    let styles = ""

    for (const name of names) {
      styles += cache.inserted[name]
    }

    return (
      <style
        key={cache.key}
        data-emotion={`${cache.key} ${names.join(" ")}`}
        dangerouslySetInnerHTML={{
          __html: styles,
        }}
      />
    )
  })

  if (!isMounted) return null

  const defaultMode = window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light"

  return (
    <CacheProvider value={cache}>
      <CssVarsProvider
        theme={theme}
        defaultMode={defaultMode}
        modeStorageKey="appMode"
        disableTransitionOnChange
      >
        <CssBaseline />
        {children}
      </CssVarsProvider>
    </CacheProvider>
  )
}

export default Providers
