import { cache } from "react"

const cacheableFetch = cache(async (config) => {
  const response = await fetch(
    "https://graphql.datocms.com",
    config
  )

  const data = await response.json()

  if (!response.ok || data.errors?.length > 0) {
    throw new Error(`${response.status} ${response.statusText}: ${JSON.stringify(data)}`)
  }

  return data
})

type ApiOptions = {
  variables?: object
  includeDrafts?: boolean
  excludeInvalid?: boolean
  visualEditingBaseUrl?: string
  revalidate?: boolean
}

const api = async (
  query="",
  options: ApiOptions = {}
) => {
  if (query === "") {
    return null
  }

  const {
    variables={},
    includeDrafts = false,
    excludeInvalid = false,
    visualEditingBaseUrl,
    revalidate,
  } = options

  const {data} = await cacheableFetch({
    method: "POST",
    headers: {
      "content-type": "application/json",
      "authorization": `Bearer ${process.env.NEXT_DATOCMS_API_TOKEN}`,
      ...(includeDrafts ? { "X-Include-Drafts": "true" } : {}),
      ...(excludeInvalid ? { "X-Exclude-Invalid": "true" } : {}),
      ...(visualEditingBaseUrl ? {
        "X-Visual-Editing": "vercel-v1",
        "X-Base-Editing-Url": visualEditingBaseUrl
      } : {}),
      ...(process.env.NEXT_DATOCMS_ENVIRONMENT ? { "X-Environment": process.env.NEXT_DATOCMS_ENVIRONMENT } : {}),
    },
    body: JSON.stringify({
      query,
      variables,
      revalidate
    }),
    next: { revalidate }
  })
  
  return data
}

export default api
