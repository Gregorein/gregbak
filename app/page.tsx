import { Sheet, Typography } from "@mui/joy"
import api from "lib/datocms"
import { Image as DatoImage } from "react-datocms/image"
import UI from "components/UI/UI"

const getData = () => api(`
  query MyQuery {
    home {
      background {
        responsiveImage(imgixParams: {}) {
        sizes
        src
        width
        height
        alt
        title
        base64
        }
      }
    }
  }
`)

const Page = async () => {
  const { data: { home } } = await getData()

  return (
    <Sheet sx={{
      display: "flex",
      flexDirection: "column",
      justifyContent: "space-between",
      height: "100%",
      zIndex: 1,
    }}>
      <UI />

      <Typography level="body-sm">gregbak 2013-{new Date().getFullYear()}</Typography>
      <Sheet sx={{
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        zIndex: -1,
        filter: "grayscale(1)",
        pointerEvents: "none"
      }}>
        <Sheet sx={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: "transparent linear-gradient(131deg, #FFFFFF 33%, #140F0F 100%) 0% 0% no-repeat padding-box",
          mixBlendMode: "screen",
          zIndex: 1
        }} />
        <DatoImage
          data={home.background.responsiveImage}
          layout="fill"
          objectFit="cover"
          fadeInDuration={3000}
        />
      </Sheet>
    </Sheet>
  )
}

export default Page
