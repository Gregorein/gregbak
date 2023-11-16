import type { MetadataRoute } from "next"
 
const robots = (): MetadataRoute.Robots => {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
    },
    sitemap: "https://gregbak.com/sitemap.xml",
  }
}

export default robots
