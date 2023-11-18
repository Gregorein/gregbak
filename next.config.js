/** @type {import('next').NextConfig} */
const nextConfig = {
  // experimental: {
  //   serverActions: false
  // },
  webpack: config => {
    config.module.rules.push({
      // allow importing gpl as string
      test: /\.(gql|graphql)/,
      type: "asset/source"
    })

    return config
  }
}

module.exports = nextConfig
