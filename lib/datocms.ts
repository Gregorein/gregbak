// const graphqlQuery = {
//     "operationName": "fetchAuthor",
//     "query": "query fetchAuthor { author { id name } }",
//     "variables": {}
// }

const api = async (
  query="",
  variables={},
  includeDrafts = false
) => {
  if (query === "") {
    return null
  }

  const response = await fetch(
    "https://graphql.datocms.com", {
    method: "POST",
    headers: {
      "content-type": "application/json",
      "authorization": `Bearer ${process.env.NEXT_DATOCMS_API_TOKEN}`,
      ...(includeDrafts ? { "X-Include-Drafts": "true" } : {}),
    },
    body: JSON.stringify({
      query,
      variables
    })
  })

  const data = await response.json()

  if (!response.ok || data.errors?.length > 0) {
    throw new Error(`${response.status} ${response.statusText}: ${JSON.stringify(data)}`)
  }
  
  return data
}

export default api
