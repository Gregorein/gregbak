import { Box, Typography } from "@mui/joy"
import Link from "next/link"

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

const ExperienceProject = ({ projects }: ExperienceProjectsProps) => (
  <>
    {projects.map(project => (
      <Box
        key={project.title}
        sx={{
          display: "flex",
          flexDirection: "column"
        }}
      >
        <Typography
          fontFamily="anivers"
          fontSize={32}
          fontWeight={800}
        >
          {project.title}
        </Typography>

        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: 1
          }}
        >
          <Typography
            fontFamily="anivers"
            fontSize={21}
          >
            {project.role}
          </Typography>
          <Typography
            fontFamily="anivers"
            fontSize={18}
          >
            {project.text}
          </Typography>

          <Typography
            fontFamily="europa"
            fontSize={14}
          >
            {project.stack.map(({ title }) => title).join(", ")}
          </Typography>

          {project.clients.map(client => (
            <Typography
              component={Link}
              key={client.name}
              fontFamily="anivers"
              fontSize={21}
              href={client.url}
              sx={{
                textDecoration: "none",
                color: "primary.500",
                "&:hover": {
                  color: "primary.600"
                }
              }}
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
