/** @type {import('next').NextConfig} */

module.exports = {
  webpack: config => {
    config.module.rules.push({
      // allow importing gpl as string
      test: /\.(gql|graphql)/,
      type: "asset/source"
    })
    return config
  },
  transpilePackages: [
    "three"
  ]
  /*
    disabled until Vercel fixes i18n on app router:
      https://github.com/vercel/next.js/issues/58583,
      https://github.com/vercel/next.js/issues/55313,
      https://github.com/vercel/next.js/issues/53724
    using next-intl till then.
  i18n: {
    locales: ["en", "pl"],
    defaultLocale: "en",
  }
  */
}
