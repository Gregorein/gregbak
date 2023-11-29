import type { MetadataRoute } from "next"
 
import sitemapConfig from "queries/root/sitemapConfig.gql"
import api from "util/datocms"
import {locales} from "i18n"

const generateSitemap = async () => {
  const {
    allProjects,
    home,
    resume,
    portfolio,
    policy,
  } = await api(sitemapConfig)

  const rootUrl = "https://gregbak.com"

  const defaultSitemap = [
    {
      url: "",
      lastModified: home.updatedAt,
      changeFrequency: "monthly",
      priority: 1,
    },
    {
      url: "/resume",
      lastModified: resume.updatedAt,
      changeFrequency: "monthly",
      priority: 0.75,
    },
    {
      url: "/portfolio",
      lastModified: portfolio.updatedAt,
      changeFrequency: "weekly",
      priority: 0.5,
    },
    {
      url: "/policy",
      lastModified: policy.updatedAt,
      changeFrequency: "monthly",
      priority: 0.25,
    },
    ...allProjects.map(({slug, updatedAt}) => ({
        url: `/portfolio/${slug}`,
        lastModified: updatedAt,
        changeFrequency: "monthly",
        priority: 0.5,
    }))
  ]

  const sitemap = defaultSitemap.map(
    entry => locales.map(
      locale => ({
        ...entry,
        url: `${rootUrl}/${locale}${entry.url}`
      })
    )
  ).flat()
  
  return sitemap as MetadataRoute.Sitemap
}

export default generateSitemap
