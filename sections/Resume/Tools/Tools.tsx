import { Box, Tooltip, Typography } from "@mui/joy"
import SectionTitle from "components/SectionTitle/SectionTitle"
import SubSection from "components/SubSection/SubSection"

type ToolsProps = {
  toolsSlug: string;
  toolsTitle: string;
  toolsEntries: {
    title: string
    _allReferencingTools: {
      level: {
        title: string
        text: string
      }
      title: string
    }[]
  }[];
}

const Tools = ({ toolsEntries, toolsSlug, toolsTitle }: ToolsProps) => (
  <SubSection id={toolsSlug}>
    <SectionTitle textAlign="center">{toolsTitle}</SectionTitle>

    {toolsEntries.map(({ title, _allReferencingTools: tools }) => (
      <Box key={title}>
        <Typography
          fontFamily="anivers"
          fontSize={28}
          fontWeight={800}
          sx={{
            color: "primary.500"
          }}
          textTransform="lowercase"
        >
          {title}:
        </Typography>
        <Box
          sx={{
            display: "flex",
            flexWrap: "wrap",
            gap: 1,
            paddingLeft: 3
          }}
        >
          {tools.map((tool, i) => (
            <Tooltip
              key={tool.title}
              title={`${tool.level?.title} (${tool.level?.text})`}
              variant="solid"
              arrow
            >
              <Typography
                fontFamily="anivers"
                fontSize={24}
              >
                {tool.title}{i !== tools.length - 1 && ","}
              </Typography>

            </Tooltip>
          ))}
        </Box>
      </Box>
    ))}
  </SubSection>
)

export default Tools
