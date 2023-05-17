import api from "../lib/datocms"

const getData = () => api(`
  query MyQuery {
    home {
      title
    }
  }
`)

const Page = async () => {
  const {data: {home}} = await getData()

  console.log(home)

  return <h1>{home.title}</h1>;
}

export default Page
