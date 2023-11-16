import type { MetadataRoute } from "next"
 
const sitemap = (): MetadataRoute.Sitemap => {
  return [
    {
      url: "https://gregbak.com",
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 1,
    },
    {
      url: "https://gregbak.com/resume",
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.75,
    },
    {
      url: "https://gregbak.com/portfolio",
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.5,
    },
    // TODO: add dynamic pages from portfolio/projects
  ]
}

export default sitemap
