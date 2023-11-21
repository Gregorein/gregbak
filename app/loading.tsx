import Section from "components/Section/Section"

type LoadingProps = {}

const Loading = ({ ...loadingProps

}: LoadingProps) => {
  console.log({ loadingProps })

  return (
    <Section>
      Loading yo!
    </Section>
  )
}

export default Loading
