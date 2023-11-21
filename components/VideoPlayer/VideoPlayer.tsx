"use client"

import MuxPlayer from "@mux/mux-player-react"
import palette from "theme/palette"

type VideoPlayerType = {
  video: {
    muxPlaybackId: string
  }
  blurhash: string
  title?: string
  alt?: string
  height: number
  width: number
}

const VideoPlayer = ({
  video: {
    muxPlaybackId,
  },
  blurhash,
  title,
  alt,
  height,
  width
}: VideoPlayerType) => {

  return (
    <MuxPlayer
      style={{
        height,
        width
      }}
      streamType="on-demand"
      placeholder={blurhash}
      playbackId={muxPlaybackId}
      metadata={{
        video_title: title || alt || "",
      }}
      accentColor={palette.primary[500]}
    />
  )
}

export default VideoPlayer
