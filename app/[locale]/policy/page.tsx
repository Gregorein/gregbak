import ExtendedTypography from "components/ExtendedTypography/ExtendedTypography"
import Section from "components/Section/Section"
import SectionTitle from "components/SectionTitle/SectionTitle"
import { locales, matchLocale } from "i18n"

import { unstable_setRequestLocale } from "next-intl/server"

import config from "queries/Policy/config.gql"
import policy from "queries/Policy/policy.gql"
import api from "util/datocms"

export const generateStaticParams = async () => locales.map(locale => ({ locale }))

type PolicyProps = {
  params: {
    locale: string
  }
}

export const generateMetadata = async ({
  params: {
    locale
  }
}: PolicyProps) => {
  const {
    policy: {
      title
    }
  } = await api(config, {
    variables: {
      locale
    }
  })

  return {
    title
  }
}

const Policy = async ({
  params: {
    locale
  }
}: PolicyProps) => {
  unstable_setRequestLocale(matchLocale(locale))

  const {
    policy: {
      title,
      text,
    }
  } = await api(policy, {
    variables: {
      locale
    }
  })

  return (
    <Section height="calc(100vh - 30px)">
      <SectionTitle>{title}</SectionTitle>
      <ExtendedTypography>{text}</ExtendedTypography>
    </Section>
  )
}

export default Policy
