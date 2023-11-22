import ExtendedTypography from "components/ExtendedTypography/ExtendedTypography"
import Section from "components/Section/Section"
import SectionTitle from "components/SectionTitle/SectionTitle"

import config from "queries/Policy/config.gql"
import policy from "queries/Policy/policy.gql"
import api from "util/datocms"

export const generateMetadata = async () => {
  const {
    policy: {
      title
    }
  } = await api(config)

  return {
    title
  }
}
const Policy = async () => {
  const {
    policy: {
      title,
      text,
    }
  } = await api(policy)

  return (
    <Section height="calc(100vh - 30px)">
      <SectionTitle>{title}</SectionTitle>
      <ExtendedTypography>{text}</ExtendedTypography>
    </Section>
  )
}

export default Policy
