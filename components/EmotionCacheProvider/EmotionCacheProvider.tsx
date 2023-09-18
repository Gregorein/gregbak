"use client"
import type { Options } from "@emotion/cache"
import type { EmotionCache } from "@emotion/react"
import type { ReactNode, JSX } from "react"
import { useState } from "react"
import { CacheProvider as DefaultCacheProvider } from "@emotion/react"
import createCache from "@emotion/cache"
import { useServerInsertedHTML } from "next/navigation"

type CacheProviderProps = {
  value: EmotionCache,
  children: ReactNode
}

export type EmotionCacheProviderProps = {
  children: ReactNode,
  CacheProvider?: (props: CacheProviderProps) => JSX.Element | null
  options: Omit<Options, "insertionPoint">
}

const EmotionCacheProvider = ({
  children,
  options,
  CacheProvider = DefaultCacheProvider,
}: EmotionCacheProviderProps) => {
  const [registry] = useState(() => {
    const cache = createCache(options)
    cache.compat = true

    const prevInsert = cache.insert
    let inserted: {
      name: string
      isGlobal: boolean
    }[] = []

    cache.insert = (...args) => {
      const [selector, serialized] = args

      if (cache.inserted[serialized.name] === undefined) {
        inserted.push({
          name: serialized.name,
          isGlobal: !selector
        })
      }

      return prevInsert(...args)
    }

    const flush = () => {
      const prevInserted = inserted
      inserted = []
      return prevInserted
    }

    return { cache, flush }
  })

  useServerInsertedHTML(() => {
    const inserted = registry.flush()

    if (inserted.length === 0) {
      return null
    }

    let styles = ""
    let dataEmotionAttribute = registry.cache.key

    const globals: {
      name: string
      style: string
    }[] = []

    inserted.forEach(({ name, isGlobal }) => {
      const style = registry.cache.inserted[name]

      if (typeof style !== "boolean") {
        if (isGlobal) {
          globals.push({ name, style })
        } else {
          styles += style
          dataEmotionAttribute += ` ${name}`
        }
      }
    })

    return (
      <>
        {globals.map(({ name, style }) => (
          <style
            key="name"
            data-emotion={`${registry.cache.key}-global ${name}`}
            dangerouslySetInnerHTML={{ __html: style }}
          />
        ))}
        {styles && (
          <style
            data-emotion={dataEmotionAttribute}
            dangerouslySetInnerHTML={{ __html: styles }}
          />
        )}
      </>
    )
  })

  return <CacheProvider value={registry.cache}>
    {children}
  </CacheProvider>
}

export default EmotionCacheProvider
