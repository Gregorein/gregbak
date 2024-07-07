"use client"

import { Badge, Box, Button, DialogContent, Drawer, IconButton, List, ListItem, ListSubheader, Typography, useColorScheme } from "@mui/joy"
import { PiggyBank, Twitter, Twitch, ChevronRight, Cookie, FileCode2, Github, Languages, Linkedin, MailIcon, Menu, Moon, MoreVertical, Settings, Share2, SunDim, X } from "lucide-react"
import DrawerLink from "components/DrawerLink/DrawerLink"
import type Style from "types/style"
import useMediaQuery from "util/useMediaQuery"
import { useState } from "react"
import { transition } from "theme/utils"
import { usePathname } from "next/navigation"
import Link from "next/link"
import useProjectCounter from "util/useProjectCounter"

type NavigationDrawerType = {
	labels: {
		closeMenu: string

		codeButton: string
		cookiesButton: string

		languagesMenu: string

		menuActionsTitle: string
		menuNavigationTitle: string
		menuSocialTitle: string

		navPortfolio: string
		navResume: string

		socialPatreon: string
		socialTwitter: string
		socialTwitch: string
		socialGithub: string
		socialLinkedin: string
		socialMail: string

		uiToggle: {
			text: string
		}[]
	}
	projectCount: number
	locales: {
		code: string
		title: string
	}[]
}

const style: Style = {
	mobileHeader: {
		display: "flex",
		padding: 2,
		justifyContent: "space-between",
		position: "fixed",
		top: 0,
		left: 0,
		right: 0,
		zIndex: 10,
		backdropFilter: "brightness( var(--palette-background-header) ) blur(50px)",
	},
	drawerHeader: {
		display: "flex",
		p: 3,
		justifyContent: "flex-end",
	},
	drawerContent: {
		display: "flex",
		p: 2
	},
	drawerMenu: {
		display: "flex",
		gap: 3
	},
	drawerSubMenu: {
		display: "flex",
		paddingTop: 1,
		paddingLeft: 1
	},
	drawerSubHeader: {
		display: "flex",
		gap: 1,
	},
	drawerButton: {
		display: "flex",
		gap: 1
	},
	themeToggle: {
		fontSize: 21,
		cursor: "pointer",
		display: "flex",
		alignItems: "center",
		gap: 1,
		transition: transition("color"),
		textDecoration: "none",
		color: "primary.500",
		"&:hover": {
			color: "primary.plainActiveBg"
		},
		"&:active": {
			color: "primary.plainActiveBg"
		},
	},
	languageLink: {
		fontSize: 21,
		transition: transition("color"),
		width: "100%",
		textDecoration: "none",
		color: "primary.500",
		"&:hover": {
			color: "primary.plainActiveBg"
		}
	}
}

const NavigationDrawer = ({
	labels: {
		closeMenu,

		codeButton,
		cookiesButton,

		languagesMenu,

		menuActionsTitle,
		menuNavigationTitle,
		menuSocialTitle,

		navPortfolio,
		navResume,

		socialTwitter,
		socialTwitch,
		socialPatreon,
		socialGithub,
		socialLinkedin,
		socialMail,

		uiToggle
	},
	projectCount,
	locales
}: NavigationDrawerType) => {
	const { count } = useProjectCounter()

	const width = useMediaQuery()

	const [open, setOpen] = useState(false)
	const toggleDrawer = () => setOpen(!open)
	const hideDrawer = () => setOpen(false)

	const { mode, setMode } = useColorScheme()
	const isDark = mode === "dark"

	const path = usePathname()
	const parsedPath = path.match(/^\/(en|pl)/) ? path.slice(3) : path

	return (
		<>
			<IconButton onClick={toggleDrawer}>
				<MoreVertical />
			</IconButton>
			<Drawer
				open={open}
				onClose={hideDrawer}
				anchor="right"
			>
				<Box sx={style.drawerHeader}>
					<Button
						variant="soft"
						sx={style.drawerButton}
						onClick={hideDrawer}
					>
						{closeMenu}
						<X />
					</Button>
				</Box>
				<DialogContent sx={style.drawerContent}>
					<List sx={style.drawerMenu}>

						{width.under.tablet && (
							<ListItem nested>
								<ListSubheader sx={style.drawerSubHeader}>
									<Menu />{menuNavigationTitle}
								</ListSubheader>
								<List sx={style.drawerSubMenu}>
									<ListItem>
										<DrawerLink
											callback={hideDrawer}
											href="/resume"
											title={navResume}
											icon={<ChevronRight />}
										/>
									</ListItem>

									<ListItem>
										<Badge
											invisible={!count(projectCount)}
											badgeContent={count(projectCount)}
											color="neutral"
										>
											<DrawerLink
												callback={hideDrawer}
												href="/portfolio"
												title={navPortfolio}
												icon={<ChevronRight />}
											/>
										</Badge>
									</ListItem>
								</List>
							</ListItem>
						)}

						{width.under.tablet && (
							<ListItem nested>
								<ListSubheader sx={style.drawerSubHeader}>
									<Share2 />{menuSocialTitle}
								</ListSubheader>
								<List sx={style.drawerSubMenu}>
									<ListItem>
										<DrawerLink
											callback={hideDrawer}
											external
											href="mailto:contact@gregbak.com"
											title={socialMail}
											icon={<MailIcon />}
										/>
									</ListItem>
									<ListItem>
										<DrawerLink
											callback={hideDrawer}
											external
											href="https://github.com/Gregorein"
											title={socialGithub}
											icon={<Github />}
										/>
									</ListItem>
									<ListItem>
										<DrawerLink
											callback={hideDrawer}
											external
											href="https://www.twitch.tv/gregorein"
											title={socialTwitch}
											icon={<Twitch />}
										/>
									</ListItem>
									<ListItem>
										<DrawerLink
											callback={hideDrawer}
											external
											href="https://www.patreon.com/gregorein"
											title={socialPatreon}
											icon={<PiggyBank />}
										/>
									</ListItem>
									<ListItem>
										<DrawerLink
											callback={hideDrawer}
											external
											href="https://twitter.com/gregorein"
											title={socialTwitter}
											icon={<Twitter />}
										/>
									</ListItem>
									<ListItem>
										<DrawerLink
											callback={hideDrawer}
											external
											href="https://www.linkedin.com/in/gregorein/"
											title={socialLinkedin}
											icon={<Linkedin />}
										/>
									</ListItem>
								</List>
							</ListItem>
						)}

						<ListItem nested>
							<ListSubheader sx={style.drawerSubHeader}>
								<Settings />{menuActionsTitle}
							</ListSubheader>
							<List sx={style.drawerSubMenu}>
								<ListItem>
									<DrawerLink
										callback={hideDrawer}
										href="/policy"
										title={cookiesButton}
										icon={<Cookie />}
									/>
								</ListItem>
								<ListItem>
									<DrawerLink
										callback={hideDrawer}
										external
										href="https://github.com/Gregorein/gregbak"
										title={codeButton}
										icon={<FileCode2 />}
									/>
								</ListItem>
								<ListItem>
									<Typography
										onClick={() => setMode(isDark ? "light" : "dark")}
										sx={style.themeToggle}
									>
										{isDark
											? <><SunDim />{uiToggle[0].text}</>
											: <><Moon />{uiToggle[1].text}</>
										}
									</Typography>
								</ListItem>
							</List>
						</ListItem>

						<ListItem nested>
							<ListSubheader sx={style.drawerSubHeader}>
								<Languages />{languagesMenu}
							</ListSubheader>
							<List sx={style.drawerSubMenu}>
								{locales.map(({ title, code }) => (
									<ListItem key={code}>
										<Typography
											onClick={hideDrawer}
											component={Link}
											href={`/${code}${parsedPath}`}
											locale={code}
											sx={style.languageLink}
										>
											{title}
										</Typography>
									</ListItem>
								))}
							</List>
						</ListItem>
					</List>
				</DialogContent>
			</Drawer>
		</>
	)
}

export default NavigationDrawer
