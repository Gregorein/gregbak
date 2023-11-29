import { Box, Tooltip, Typography } from "@mui/joy"
import SectionTitle from "components/SectionTitle/SectionTitle"
import SubSection from "components/SubSection/SubSection"
import mq from "theme/mediaQueries"

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

const style = {
  group: {
    display: "flex",
    flexDirection: "column",
    gap: 1,
  },
  title: {
    fontFamily: "anivers",
    fontSize: 28,
    fontWeight: 800,
    color: "primary.500",
    textTransform: "lowercase",

    [mq.under.tablet]: {
      fontSize: 18
    }
  },
  tools: {
    display: "flex",
    flexWrap: "wrap",
    gap: 1,
    paddingLeft: 3,

  },
  tool: {
    fontFamily: "anivers",
    fontSize: 24,

    [mq.under.tablet]: {
      fontSize: 14
    }
  }
}

const Tools = ({ toolsEntries, toolsSlug, toolsTitle }: ToolsProps) => (
  <SubSection id={toolsSlug}>
    <SectionTitle textAlign="center">{toolsTitle}</SectionTitle>

    {toolsEntries.map(({ title, _allReferencingTools: tools }) => (
      <Box key={title}
        sx={style.group}
      >
        <Typography sx={style.title}>
          {title}:
        </Typography>
        <Box sx={style.tools}>
          {tools.map((tool, i) => (
            <Tooltip
              key={tool.title}
              title={`${tool.level?.title} (${tool.level?.text})`}
              variant="solid"
              arrow
            >
              <Typography sx={style.tool}>
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
