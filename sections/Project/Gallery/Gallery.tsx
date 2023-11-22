import { Box } from "@mui/joy"
import { Image as DatoImage } from "react-datocms"
import VideoPlayer from "components/VideoPlayer/VideoPlayer"

type GalleryProps = {
  gallery: {
    mimeType: string
    responsiveImage: {
      [key: string]: string | number | boolean
      width: number
    }
    video: {
      muxPlaybackId: string
    }
    blurhash: string
    title: string
    alt: string
    height: number
    width: number
  }[];
}

const Gallery = ({ gallery }: GalleryProps) => gallery.length > 0 && (
  <Box
    sx={{
      display: "flex",
      flexWrap: "wrap",
      gap: 3,
      alignItems: "flex-start",
      justifyContent: "center",
    }}
  >
    {gallery.map(({
      mimeType, responsiveImage, video, blurhash, title, alt, height, width
    }, i) => (
      mimeType.includes("image") ? (
        <DatoImage
          key={i}
          data={responsiveImage}
        />
      ) : (
        <VideoPlayer
          key={i}
          video={video}
          blurhash={blurhash}
          title={title}
          alt={alt}
          height={height}
          width={width}
        />
      )
    ))}
  </Box>
)

export default Gallery