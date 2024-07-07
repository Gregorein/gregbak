import { Box, Typography } from "@mui/joy"
import Link from "next/link"
import mq from "theme/mediaQueries"
import { ProjectType } from "./Experience"

type ExperienceProjectProps = {
	projects: ProjectType[]
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

	date: {
		fontFamily: "europa",
		opacity: 0.67,
		fontSize: 14,

		[mq.under.laptop]: {
			fontSize: 12
		},
		[mq.under.tablet]: {
			fontSize: 12
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

const formatDate = (date: string) => {
	const [year, month] = date.split('-')

	return `${month}.${year}`
}

const ExperienceProject = ({ projects }: ExperienceProjectProps) => (
	<>
		{projects.map((project, i: number) => {
			const date = project.date.at(-1)

			return (
				<Box
					key={i}
					sx={style.container}
				>
					<Typography sx={style.title}>
						{project.title}
					</Typography>
					{date && (
						<Typography sx={style.date}>
							{formatDate(date.start)}{date.end !== null ? (" - " + formatDate(date.end)) : null}
						</Typography>
					)}

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

						{project.clients.map((client, j) => (
							<Typography
								key={j}
								component={Link}
								href={client.url}
								sx={style.clientLink}
							>
								@{client.name}
							</Typography>
						))}
					</Box>
				</Box>
			)
		}
		)}
	</>
)

export default ExperienceProject
