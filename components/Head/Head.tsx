"use client"

// import { useColorScheme } from "@mui/joy"
import { Box } from "@mui/system"

const Head = () => {
  // const { mode } = useColorScheme()

  return (
    <Box
      sx={{
        gridArea: "head",
        border: "2px solid",
        borderColor: "primary.500",
        width: "850px",
        height: "850px",
        borderRadius: "50%",
      }}
    >

    </Box>
  )
}

export default Head