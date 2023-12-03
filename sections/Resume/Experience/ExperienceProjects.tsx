import { Box, Typography } from "@mui/joy"
import Link from "next/link"
import mq from "theme/mediaQueries"

type ExperienceProjectsProps = {
  projects: {
    title: string
    role: string
    text: string
    stack: {
      title: string
    }[]
    clients: {
      name: string
      url?: string
    }[]
  }[]
}

const style = {
  container: {
    display: "flex",
    flexDirection: "column",
    gap: 1,

    [mq.under.tablet]: {
      flexDirection: "column-reverse",
    }
  },

  title: {
    fontFamily: "anivers",
    fontSize: 32,
    fontWeight: 800,

    [mq.under.laptop]: {
      fontSize: 28
    },
    [mq.under.tablet]: {
      fontSize: 24
    }
  },
  content: {
    display: "flex",
    flexDirection: "column",
    gap: 1
  },
  role: {
    fontFamily: "anivers",
    fontSize: 21,

    [mq.under.laptop]: {
      fontSize: 18
    },
    [mq.under.tablet]: {
      fontSize: 16
    }
  },
  text: {
    fontFamily: "anivers",
    fontSize: 18
  },
  stack: {
    fontFamily: "europa",
    fontSize: 14,

    [mq.under.laptop]: {
      fontSize: 12
    },
    [mq.under.tablet]: {
      fontSize: 12
    }
  },
  clientLink: {
    fontFamily: "anivers",
    fontSize: 21,
    textDecoration: "none",
    color: "primary.500",
    "&:hover": {
      color: "primary.600"
    },

    [mq.under.laptop]: {
      fontSize: 18
    },
    [mq.under.tablet]: {
      fontSize: 16
    }
  }
}

const ExperienceProject = ({ projects }: ExperienceProjectsProps) => (
  <>
    {projects.map((project, i) => (
      <Box
        key={i}
        sx={style.container}
      >
        <Typography sx={style.title}>
          {project.title}
        </Typography>

        <Box
          sx={style.content}
        >
          <Typography sx={style.role}>
            {project.role}
          </Typography>
          <Typography sx={style.text}>
            {project.text}
          </Typography>

          <Typography sx={style.stack}>
            {project.stack.map(({ title }) => title).join(", ")}
          </Typography>

          {project.clients.map(client => (
            <Typography
              component={Link}
              key={client.name}
              href={client.url}
              sx={style.clientLink}
            >
              @{client.name}
            </Typography>
          ))}
        </Box>
      </Box>
    ))}
  </>
)

export default ExperienceProject
