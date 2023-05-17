const graphqlQuery = {
    "operationName": "fetchAuthor",
    "query": `query fetchAuthor { author { id name } }`,
    "variables": {}
};

const api = async (query: string, variables={}) => {
  const response = await fetch(
    "https://graphql.datocms.com", {
    method: "POST",
    headers: {
      "content-type": "application/json",
      "authorization": `Bearer ${process.env.NEXT_DATOCMS_API_TOKEN}`
    },
    body: JSON.stringify({
      query,
      variables
    })
  })

  if (!response.ok) {
    throw new Error("Failed to fetch data")
  }

  return response.json()
}

export default api
