"use client"

import { Box, Button, ButtonGroup, Card, CardContent, IconButton, Typography } from "@mui/joy"
import ExtendedTypography from "components/ExtendedTypography/ExtendedTypography"
import { AnimatePresence, motion } from "framer-motion"
import { X } from "lucide-react"
import { HeartHandshake, Cookie, Hand } from "lucide-react"
import Link from "next/link"
import { useEffect } from "react"
import toast, { Toaster } from "react-hot-toast"
import useMounted from "util/useMounted"

type NotificationsType = {
  notifications: {
    id: string
    title: string
    text: string
    cookie: boolean
    variant: "primary" | "secondary" | "danger" | "neutral" | "success" | "warning"
    actions: {
      title: string
      url: string
    }[]
  }[]
}

const style = {
  content: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    position: "relative"
  },
  close: {
    position: "absolute",
    top: 10,
    right: 10,
    zIndex: 2,
  },
  description: {
    display: "flex",
    flexDirection: "column",
  },
  title: {
    display: "flex",
    gap: 0.5,
    paddingRight: 4,
    alignItems: "center",
    fontWeight: 800,
    fontSize: 21

  },
  text: {
    fontFamily: "anivers",
    opacity: 0.9,
    fontSize: 16,
    paddingRight: 1
  }
}

const Notifications = ({
  notifications
}: NotificationsType) => {
  const isMounted = useMounted()

  const handleCloseToast = (toastId: string, cookieKey?: string) => {
    toast.dismiss(toastId)

    if (cookieKey) {
      localStorage.setItem(`notification-${cookieKey}`, "true")
    }
  }

  useEffect(() => {
    if (!isMounted) {
      toast.remove()
    } else {
      notifications.forEach(({
        id,
        variant,
        title,
        text,
        cookie,
        actions
      }) => {
        if (cookie && localStorage.getItem(`notification-${id}`) === "true") {
          return
        }

        toast.custom((t) => (
          <AnimatePresence>
            {t.visible && (
              <Card
                key={id}
                component={motion.div}
                initial={{
                  opacity: 0
                }}
                animate={{
                  opacity: 1
                }}
                exit={{
                  opacity: 0,
                  left: "10%"
                }}
                variant="soft"
                color={variant}
                size="sm"
                invertedColors
              >
                <IconButton
                  onClick={() => handleCloseToast(t.id, cookie ? id : undefined)}
                  sx={style.close}
                  variant="plain"
                  size="sm"
                >
                  <X />
                </IconButton>

                <CardContent
                  sx={style.content}
                >
                  <Box
                    sx={{
                      width: 24,
                      height: "100%",
                      display: "flex",
                      alignItems: "center"
                    }}
                  >
                    {variant === "primary" && (
                      <HeartHandshake />
                    )}
                    {variant === "secondary" && (
                      <Cookie />
                    )}
                    {variant === "neutral" && (
                      <Hand />
                    )}
                  </Box>
                  <Box sx={style.description}>
                    <Typography sx={style.title}>
                      {title}
                    </Typography>
                    <ExtendedTypography sx={style.text}>
                      {text}
                    </ExtendedTypography>
                  </Box>
                </CardContent>
                {actions.length > 0 && (
                  <ButtonGroup
                    size="sm"
                    color={variant}
                    variant="soft"
                    buttonFlex={1}
                  >
                    {
                      actions.map((action) => (
                        <Button
                          key={action.title}
                          component={Link}
                          href={action.url}
                        >
                          {action.title}
                        </Button>
                      ))
                    }
                  </ButtonGroup >
                )}
              </Card >
            )}
          </AnimatePresence >
        ), {
          duration: cookie ? 7000 : Infinity,
        })
      })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isMounted])

  return (
    <Toaster
      position="bottom-right"
      gutter={15}
      containerStyle={{
        top: 100,
        zIndex: 10,
      }}
    />
  )
}

export default Notifications