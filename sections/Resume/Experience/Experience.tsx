import { Box, Typography } from "@mui/joy"
import SectionTitle from "components/SectionTitle/SectionTitle"
import SubSection from "components/SubSection/SubSection"
import { Fragment } from "react"
import mq from "theme/mediaQueries"
import ExperienceProjects from "./ExperienceProjects"

export type ProjectType = {
	title: string
	role: string
	text: string
	stack: {
		title: string
	}[]
	date: {
		end: string
		start: string
	}[]
	clients: {
		date: {
			end: string
			start: string
		}
		name: string
		url: string
	}[]
}

type ExperienceProps = {
	experienceSlug: string;
	experienceTitle: string;
	experienceEntries: {
		title: string
		projects: ProjectType[]
	}[];
}

const style = {
	container: {
		display: "flex",
		gap: 3,
		flexDirection: "column"
	},
	entries: {
		display: "grid",
		gridTemplateColumns: "repeat(4, 1fr)",
		gridTemplateRows: "auto",
		gridGap: 60,
		justifyContent: "space-between",

		[mq.under.laptop]: {
			gridTemplateColumns: "1fr 1fr",
			gridTemplateRows: "auto auto",
		},
		[mq.under.tablet]: {
			gridTemplateColumns: "unset",
			gridTemplateRows: "unset",
			display: "flex",
			flexDirection: "column-reverse"
		}
	},
	title: {
		width: "100%",
		padding: 3,
		fontSize: 36,
		fontWeight: 100,
		textAlign: "center"
	}
}

const getAnyOldestDate = (entry) => entry.date.at(-1).end || entry.date.at(-1).start

const Experience = ({ experienceEntries, experienceSlug, experienceTitle }: ExperienceProps) => (
	<SubSection id={experienceSlug}>
		<SectionTitle textAlign="center">{experienceTitle}</SectionTitle>

		<Box sx={style.container}>
			{experienceEntries.map(({ title, projects }, i) => {
				const sortedProjects = projects.sort((a: ProjectType, b: ProjectType) => {
					// const aDate = a.date.end || a.clients.find(client => client.date.end !== null).date
					// const bDate = b.date.end || b.clients.find(client => client.date.end !== null).date

					const aDate = a.date.length !== 0
						? getAnyOldestDate(a)
						: getAnyOldestDate(a.clients.find(client => getAnyOldestDate(client)))
					const bDate = b.date.length !== 0
						? getAnyOldestDate(b)
						: getAnyOldestDate(b.clients.find(client => getAnyOldestDate(client)))

					return aDate - bDate
				})

				return (
					<>
						<Typography sx={style.title}>
							{title}
						</Typography>

						<Box
							key={title}
							sx={style.entries}
						>
							<ExperienceProjects projects={sortedProjects} />
						</Box>
					</>
				)
			})}

		</Box>
	</SubSection>
)

export default Experience
