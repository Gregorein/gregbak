import { Typography } from "@mui/joy"
import Section from "components/Section/Section"
import { locales } from "i18n"
import notFound from "queries/root/notFound.gql"
import api from "util/datocms"

export const generateStaticParams = async () => locales.map(locale => ({ locale }))

type NotFoundProps = {
  params: {
    locale: string
  }
}

export const generateMetadata = async ({
  params: {
    locale
  }
}: NotFoundProps) => {
  const {
    config: {
      notFoundTitle
    }
  } = await api(notFound, {
    variables: {
      locale
    }
  })

  return {
    title: notFoundTitle
  }
}

const NotFound = async () => {
  const {
    config: {
      notFoundTitle,
      notFoundText
    }
  } = await api(notFound)

  return (
    <Section
      centered
      height="calc(100vh - 30px)"
    >
      <Typography sx={{
        fontSize: 96,
        fontFamily: "anivers",
        color: "danger.500"
      }}
      >
        {notFoundTitle}
      </Typography>
      <Typography>
        {notFoundText}
      </Typography>
    </Section>
  )
}

export default NotFound
